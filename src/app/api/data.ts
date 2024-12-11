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
