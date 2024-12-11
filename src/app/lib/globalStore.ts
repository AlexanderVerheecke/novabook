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


// Extend the global interface to include our custom property
declare global {
  var globalStore: GlobalStore | undefined;
}

class GlobalStore {
  private static instance: GlobalStore;
  private transactions: TransactionEvent[] = [];

  private constructor() {}

  public static getInstance(): GlobalStore {
    // Use global variable if it exists, otherwise create new instance
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
    console.log("Transaction added:", this.transactions);
  }

  public getTransactions(): TransactionEvent[] {
    return this.transactions;
  }

  public clearTransactions(): void {
    this.transactions = [];
  }
}

export const globalStore = GlobalStore.getInstance();
