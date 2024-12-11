import { NextResponse, NextRequest } from "next/server";
import { globalStore } from "@/app/lib/globalStore";

type amendEvent = {
  date: string;
  invoiceId: string;
  itemId: string;
  cost: number;
  taxRate: number;
};

const amendments: amendEvent[] = [];

export async function PATCH(request: NextRequest) {
  const store = globalStore;

  try {
    const amendment: amendEvent = await request.json();
    console.log(`Amendment received: ${JSON.stringify(amendment)}`);
    let saleEvent = store.getTransactionByInvoiceId(amendment.invoiceId);

    // create new if saleevent does not exist
    if (!saleEvent) {
      console.warn(
        `Sale event not found for invoiceId: ${amendment.invoiceId}, creating sale event`
      );
      saleEvent = {
        eventType: "SALES",
        date: amendment.date,
        invoiceId: amendment.invoiceId,
        items: [],
      };

      store.addTransaction(saleEvent);
    }

    // does item exist?
    const itemIndex = saleEvent.items.findIndex(
      (item) => item.itemId === amendment.itemId
    );

    // if not, add to sale event
    if (itemIndex === -1) {
      console.warn(`Item not found, creating new item: ${amendment.itemId}`);
      saleEvent.items.push({
        itemId: amendment.itemId,
        cost: amendment.cost,
        taxRate: amendment.taxRate,
      });
    } else {
      //  update cost/taxrate
      console.log(`Updating item: ${amendment.itemId}`);
      saleEvent.items[itemIndex].cost = amendment.cost;
      saleEvent.items[itemIndex].taxRate = amendment.taxRate;
    }

    console.log(`Amendment processed for invoiceId: ${amendment.invoiceId}`);

    return NextResponse.json({}, { status: 202 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
