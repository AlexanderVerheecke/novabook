import React, { useState, useEffect } from "react";
import styles from "./Ingest.module.scss";

type Item = {
  itemId: string;
  cost: string;
  taxRate: string;
};

const Ingest = () => {
  const [date, setDate] = useState("");

  const [transactionType, setTransactionType] = useState<string>("");

  const [invoiceId, setInvoiceId] = useState("");
  const [items, setItems] = useState<Item[]>([
    { itemId: "", cost: "", taxRate: "" },
  ]);
  const [amount, setAmount] = useState("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // whenever something in form is changed, check if all valid
  useEffect(() => {
    validateIngest();
  }, [transactionType, date, invoiceId, items, amount]);

  const validateIngest = () => {
    let validationError = null;

    if (!date) {
      validationError = "Date is required.";
    }

    if (transactionType === "TAX_PAYMENT") {
      if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
        validationError =
          "Invalid amount for Tax Payment. Please enter a valid amount.";
      }
    } else if (transactionType === "SALES") {
      if (!invoiceId) {
        validationError = "Invoice ID is required.";
      }

      if (items.length === 0) {
        validationError =
          "At least one item is required for a Sales transaction.";
      }

      for (const item of items) {
        if (!item.itemId || !item.cost || !item.taxRate) {
          validationError =
            "Each item must have an Item ID, Cost, and Tax Rate.";
        }

        if (isNaN(Number(item.cost)) || Number(item.cost) <= 0) {
          validationError = "Item cost must be a positive number.";
        }

        if (isNaN(Number(item.taxRate)) || Number(item.taxRate) <= 0) {
          validationError = "Item tax rate must be a positive number.";
        }
      }
    }

    setIsFormValid(validationError === null);

    return validationError;
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { itemId: "", cost: "", taxRate: "" }]);
  };

  const handleRemoveItem = (index: any) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    // validate, don't proceed if error there
    const validationError = validateIngest();
    if (validationError) {
      alert(validationError);
      return;
    }

    // get data
    const transactionData = {
      eventType: transactionType,
      date,
      ...(transactionType === "SALES" ? { invoiceId, items } : { amount }),
    };

    // send to transactions api
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const result = await response.json();
      alert(result.message || "Transaction sent successfully!");
    } catch (error) {
      alert("Error sending transaction data");
    }
  };

  return (
    <div>
      <h1 className="title">Ingest</h1>
      <p className="instruction">
        Send your sales and tax payments. Choose the type and then input the
        requested information
      </p>

      <div className={styles.selectContainer}>
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
          className={styles.transactionSelect}
        >
          <option value={""}>Select transaction type</option>
          <option value={"SALES"}>Sales</option>
          <option value={"TAX_PAYMENT"}>Tax Payment</option>
        </select>
      </div>
      {transactionType
        ? `Chosen transaction: ${transactionType}`
        : "No transaction selected"}

      {transactionType ? (
        <div>
          <div className={styles.inputGroup}>
            <label>Date</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.inputField}
            />
          </div>
          {transactionType === "SALES" ? (
            <div className={styles.salesForm}>
              <div className={styles.inputGroup}>
                <label>Invoice ID</label>
                <input
                  type="text"
                  value={invoiceId}
                  onChange={(e) => setInvoiceId(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter invoice ID"
                />
              </div>

              <div className={styles.itemsSection}>
                <h3>Items</h3>
                {items.map((item, index) => (
                  <div key={index} className={styles.itemRow}>
                    <input
                      type="text"
                      value={item.itemId}
                      onChange={(e) =>
                        handleItemChange(index, "itemId", e.target.value)
                      }
                      className={styles.inputField}
                      placeholder="Item ID"
                    />
                    <input
                      type="number"
                      value={item.cost}
                      onChange={(e) =>
                        handleItemChange(index, "cost", e.target.value)
                      }
                      className={styles.inputField}
                      placeholder="Cost (in pennies)"
                    />
                    <input
                      type="number"
                      value={item.taxRate}
                      onChange={(e) =>
                        handleItemChange(index, "taxRate", e.target.value)
                      }
                      className={styles.inputField}
                      placeholder="Tax Rate (e.g., 0.2)"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(index)}
                      className={styles.removeItemButton}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddItem}
                  className={styles.addItemButton}
                >
                  Add Item
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.taxPaymentForm}>
              <div className={styles.inputGroup}>
                <label>Amount (in pennies)</label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={styles.inputField}
                  placeholder="Enter amount"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {transactionType ? (
        <button
          className="calculateButton"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Submit Transaction
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default Ingest;
