import { NextRequest, NextResponse } from "next/server";

import { globalStore } from "@/app/lib/globalStore";
export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const store = global.globalStore || globalStore;

  console.log(`Received tax position request with date: ${date}`);

  if (!date) {
    console.warn("Missing 'date' query parameter");
    return NextResponse.json(
      { error: "Missing 'date' query parameter" },
      { status: 400 }
    );
  }
  const queryDate = new Date(date as string);
  let sumSalesTax = 0;
  let sumTaxPayments = 0;

  // get the data from transactions, then check if SALES or TAX_PAYMENT, and do calculations base on that
  const transactions = store.getTransactions();

  for (const event of transactions) {
    const eventDate = new Date(event.date);

    // we only want transaction history for before or on querydate, disregard future dates

    if (eventDate <= queryDate) {
      if (event.eventType === "SALES") {
        for (const item of event.items) {
          sumSalesTax += item.cost * item.taxRate;
        }
      } else if (event.eventType === "TAX_PAYMENT") {
        sumTaxPayments += event.amount;
      }
    }
  }

  const taxPos = sumSalesTax - sumTaxPayments;

  console.log(
    `Calculated tax position: ${taxPos} (Sales Tax: ${sumSalesTax}, Tax Payments: ${sumTaxPayments})`
  );

  return NextResponse.json({
    date: queryDate.toISOString(),
    taxPosition: taxPos,
  });
}
