import { NextRequest, NextResponse } from "next/server";

// Allows a user to query their tax position at any given point in time. This should calculate the tax position from ingested events and any further user interaction

// Method: GET
// Request path: /tax-position
// Request query parameters:
// date: Date and time ISO 8601
// Mandatory
// Example: 2024-02-22T17:29:39Z
// No Request body

// Successful response
// Status code: 200
// Response JSON body:
// {
//   “date”: Date and time ISO 8601
//   “taxPosition”: number
// }

// Example body:
// {
//   “date”: “2024-02-22T17:29:39Z”,
//   “taxPosition”: 49 // £0.49
// }

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
const transactions: TransactionEvent[] = [];

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json(
      { error: "Missing 'date' query parameter" },
      { status: 400 }
    );
  }
  // add validation, is date in correct format?
  const queryDate = new Date(date as string);
  let sumSalesTax = 0;
  let sumTaxPayments = 0;

 // get the data from transactions, then check if SALES or TAX_PAYMENT, and do calculations base on that

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

  return NextResponse.json({
    date: queryDate.toISOString(),
    taxPosition: taxPos,
  });

}
