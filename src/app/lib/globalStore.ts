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

declare global {
  var globalStore: GlobalStore | undefined;
}

class GlobalStore {
  private static instance: GlobalStore;
  private transactions: TransactionEvent[] = [];

  private constructor() {}

  public static getInstance(): GlobalStore {

    //use exisiting if exist, else new
    if (global.globalStore) {
      return global.globalStore;
    }

    if (!GlobalStore.instance) {
      GlobalStore.instance = new GlobalStore();
    }

    global.globalStore = GlobalStore.instance;
    return GlobalStore.instance;
  }

  public addTransaction(transaction: TransactionEvent): void {
    this.transactions.push(transaction);
  }

  public getTransactions(): TransactionEvent[] {
    return this.transactions;
  }

  public clearTransactions(): void {
    this.transactions = [];
  }
  public getTransactionByInvoiceId(invoiceId: string): SaleEvent | null {
    const saleEvent = this.transactions.find(
      (t): t is SaleEvent =>
        t.eventType === "SALES" && t.invoiceId === invoiceId
    );
    return saleEvent || null;
  }
}

export const globalStore = GlobalStore.getInstance();
