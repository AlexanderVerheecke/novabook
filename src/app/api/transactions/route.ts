// src/app/api/transactions/route.ts
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

    // Type guard as else error invoiceId not part of type TaxPaymentWEvent
    if (event.eventType === "SALES") {
      const saleEvent = event as SaleEvent;
      if (
        !saleEvent.eventType ||
        !saleEvent.date ||
        !saleEvent.invoiceId ||
        !saleEvent.items
      ) {
        return NextResponse.json(
          { error: "Invalid request body for SALE event" },
          { status: 400 }
        );
      }
      transactions.push(saleEvent);
      return NextResponse.json(
        { message: "Sale event processed successfully" },
        { status: 200 }
      );
    }
    transactions.push(event);
    console.log("Transaction ingested:", event);

    return NextResponse.json(null, { status: 202 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
