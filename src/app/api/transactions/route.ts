import { NextRequest, NextResponse } from "next/server";

type SaleEvent = {
  eventType: "SALES";
  date: string;
  invoiceId: string;
  items: {
    itemId: string;
    cost: number;
    taxRate: number;
  }[];
};

type TaxPaymentEvent = {
  eventType: "TAX_PAYMENT";
  date: string;
  amount: number;
};

type TransactionEvent = SaleEvent | TaxPaymentEvent;

// Ideally I would want this to be in a DB but for simplicity an array will act as db to be pused on
let transactions: TransactionEvent[] = [];

export async function POST(req: NextRequest) {
  try {
    const event: TransactionEvent = await req.json();

    // Validate SALE
    if (event.eventType === "SALES") {
      const saleEvent = event as SaleEvent;

      if (!saleEvent.date || !saleEvent.invoiceId || !saleEvent.items) {
        return NextResponse.json(
          {
            error:
              "Invalid request body for SALE event. Missing required fields.",
          },
          { status: 400 }
        );
      }

      // Validate each item in SALE
      for (const item of saleEvent.items) {
        if (!item.itemId || !item.cost || !item.taxRate) {
          return NextResponse.json(
            {
              error:
                "Each item in SALE event must have itemId, cost, and taxRate.",
            },
            { status: 400 }
          );
        }
        if (isNaN(item.cost) || item.cost <= 0) {
          return NextResponse.json(
            { error: "Item cost must be a positive number." },
            { status: 400 }
          );
        }
        if (isNaN(item.taxRate) || item.taxRate <= 0) {
          return NextResponse.json(
            { error: "Item tax rate must be a positive number." },
            { status: 400 }
          );
        }
      }

      transactions.push(saleEvent);
      return NextResponse.json({}, { status: 202 });
    }

    // Validate TAX_PAYMENT
    if (event.eventType === "TAX_PAYMENT") {
      const taxPaymentEvent = event as TaxPaymentEvent;

      if (!taxPaymentEvent.date || !taxPaymentEvent.amount) {
        return NextResponse.json(
          {
            error:
              "Invalid request body for TAX_PAYMENT event. Missing required fields.",
          },
          { status: 400 }
        );
      }

      if (isNaN(taxPaymentEvent.amount) || taxPaymentEvent.amount <= 0) {
        return NextResponse.json(
          { error: "Amount for TAX_PAYMENT must be a positive number." },
          { status: 400 }
        );
      }

      transactions.push(taxPaymentEvent);
      return NextResponse.json({}, { status: 202 });
    }

    return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
