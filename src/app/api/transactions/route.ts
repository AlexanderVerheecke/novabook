import { NextRequest, NextResponse } from "next/server";

export type SaleEvent = {
  eventType: "SALES";
  date: string;
  invoiceId: string;
  items: {
    itemId: string;
    cost: number;
    taxRate: number;
  }[];
};

export type TaxPaymentEvent = {
  eventType: "TAX_PAYMENT";
  date: string;
  amount: number;
};

export type TransactionEvent = SaleEvent | TaxPaymentEvent;

import { globalStore } from "@/app/lib/globalStore";
export async function POST(req: NextRequest) {
  const store = global.globalStore || globalStore;
  try {
    const event: TransactionEvent = await req.json();

    console.log(`Received event: ${JSON.stringify(event)}`);

    // Validate SALE
    if (event.eventType === "SALES") {
      const saleEvent = event as SaleEvent;

      console.log(`Validating SALE event: ${saleEvent.invoiceId}`);

      if (!saleEvent.date || !saleEvent.invoiceId || !saleEvent.items) {
        console.warn("Invalid SALE event: Missing required fields");

        return NextResponse.json(
          {
            error:
              "Invalid request body for SALE event. Missing required fields.",
          },
          { status: 400 }
        );
      }

      // Validate SALE items
      for (const item of saleEvent.items) {
        if (!item.itemId || !item.cost || !item.taxRate) {
          console.warn("Invalid item in SALE event: Missing required fields");

          return NextResponse.json(
            {
              error:
                "Each item in SALE event must have itemId, cost, and taxRate.",
            },
            { status: 400 }
          );
        }
        if (isNaN(item.cost) || item.cost <= 0) {
          console.warn(
            `Invalid item cost: ${item.cost}. Must be a positive number`
          );

          return NextResponse.json(
            { error: "Item cost must be a positive number." },
            { status: 400 }
          );
        }
        if (isNaN(item.taxRate) || item.taxRate <= 0) {
          console.warn(
            `Invalid item taxRate: ${item.taxRate}. Must be a positive number`
          );

          return NextResponse.json(
            { error: "Item tax rate must be a positive number." },
            { status: 400 }
          );
        }
      }
      console.log(`Adding SALE event to store: ${JSON.stringify(saleEvent)}`);
      store.addTransaction(saleEvent);
      return NextResponse.json({}, { status: 202 });
    }

    // Validate TAX_PAYMENT
    if (event.eventType === "TAX_PAYMENT") {
      const taxPaymentEvent = event as TaxPaymentEvent;
      console.log("Processing TAX_PAYMENT event");

      // validate tax payment details
      if (!taxPaymentEvent.date || !taxPaymentEvent.amount) {
        console.warn("Invalid TAX_PAYMENT event: Missing required fields");

        return NextResponse.json(
          {
            error:
              "Invalid request body for TAX_PAYMENT event. Missing required fields.",
          },
          { status: 400 }
        );
      }

      if (isNaN(taxPaymentEvent.amount) || taxPaymentEvent.amount <= 0) {
        console.warn(`Invalid TAX_PAYMENT amount: ${taxPaymentEvent.amount}`);

        return NextResponse.json(
          { error: "Amount for TAX_PAYMENT must be a positive number." },
          { status: 400 }
        );
      }
      console.log(
        `Adding TAX_PAYMENT event to store: ${JSON.stringify(taxPaymentEvent)}`
      );

      store.addTransaction(taxPaymentEvent);

      return NextResponse.json({}, { status: 202 });
    }
    return NextResponse.json({ error: "Invalid event type." }, { status: 400 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
