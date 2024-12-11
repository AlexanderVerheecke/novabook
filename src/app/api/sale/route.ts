import { NextResponse } from "next/server";


type amendEvent = {
  date: string;
  invoiceId: string;
  itemId: string;
  cost: number;
  taxRate: number;
};

const amendments: amendEvent[] = [];
export async function PATCH(request: NextResponse, response: NextResponse) {
  try {
    const amendment: amendEvent = await request.json();
    amendments.push(amendment);
    console.log("Amendment received");

    return NextResponse.json({}, { status: 202 });
  } catch (error) {
    console.error("Error processing reqyests: ", { error });
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
