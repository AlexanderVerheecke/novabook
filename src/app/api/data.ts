// global variable so apis can make use of it

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

export let transactions: TransactionEvent[] = [];

export function addTransaction(transaction: any) {
  transactions.push(transaction);
}

export function getTransactions() {
  console.log("TRSNACTION:", transactions);
  return transactions;
}

// // Function to find a specific transaction by invoiceId
// export function getTransactionByInvoiceId(invoiceId: string) {
//   return transactions.find((t) => t.invoiceId === invoiceId);
// }
