import React, { use, useEffect, useState } from "react";
import styles from "./Sale.module.scss";

const Sale = () => {
  const [date, setDate] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [itemId, setItemId] = useState("");
  const [cost, setCost] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [isFormValid, setIsFormValid] = useState<Boolean>(false);

  const validateAmendmend = () => {
    let validationError = null;

    if (!invoiceId) {
      validationError = "Invoice ID is required.";
    }

    if (!itemId) {
      validationError = "Item ID is required.";
    }
    if (!cost) {
      validationError = "Cost is required.";
    }

    if (!taxRate) {
      validationError = "Tax Rate is required.";
    }

    setIsFormValid(validationError === null);

    return validationError;
  };

  useEffect(() => {
    validateAmendmend();
  }, [invoiceId, itemId, cost, taxRate]);

  const handleSubmit = async () => {
    // validate, don't proceed if error there
    const validationError = validateAmendmend();
    if (validationError) {
      alert(validationError);
      return;
    }

    // get data
    const transactionData = {
      date,
      invoiceId,
      itemId,
      cost,
      taxRate,
    };

    // send to transactions api
    try {
      const response = await fetch("/api/sale", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transactionData),
      });

      const result = await response.json();
      alert(result.message || "Sale amendment sent successfully!");
    } catch (error) {
      alert("Error sending sale amendmenr data");
    }
  };

  return (
    <div className={styles.saleContainer}>
      <h1 className="title">Amend Sale</h1>
      <p className="instruction">
        Choose the date and then input the required information
      </p>{" "}
      <div className="datePickerContainer">
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="dateInput"
        />
        <div className="dateDisplay">
          {date ? `Date chosen: ${date}` : "No date selected"}
        </div>
      </div>
      {date && (
        <div className={styles.inputGroup}>
          <div className={styles.individualInput}>
            <label>Invoice ID</label>
            <input
              type="text"
              value={invoiceId}
              onChange={(e) => setInvoiceId(e.target.value)}
              className={styles.inputField}
              placeholder="Enter invoice ID"
            />
          </div>
          <div className={styles.individualInput}>
            <label>Item ID</label>
            <input
              type="text"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className={styles.inputField}
              placeholder="Item ID"
            />
          </div>{" "}
          <div className={styles.individualInput}>
            <label>Cost</label>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              className={styles.inputField}
              placeholder="Cost (in pennies)"
            />
          </div>{" "}
          <div className={styles.individualInput}>
            <label>Tax Rate</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(e.target.value)}
              className={styles.inputField}
              placeholder="Tax Rate (e.g., 0.2)"
            />
          </div>
        </div>
      )}
      {date && (
        <button
          className="calculateButton"
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          Submit Amendmend
        </button>
      )}
    </div>
  );
};

export default Sale;
