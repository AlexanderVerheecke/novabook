"use client";
import React, { useState } from "react";
import styles from "./TaxPage.module.scss";

const TaxPage = () => {
  const [date, setDate] = useState("");
  const [taxPosition, setTaxPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<string>("");

  const handleButtonClick = async () => {
    if (!date) {
      alert("Please select a date first.");
      return;
    }

    try {
      const response = await fetch(
        `/api/tax-position?date=${encodeURIComponent(date)}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tax position");
      }

      const data = await response.json();
      setTaxPosition(data.taxPosition);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching tax position:", err);
      setError(err.message);
      setTaxPosition(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Ingest</h1>
        <p className={styles.instruction}>
          Send your sales and tax payments. Choose the type and input the
          requested information
        </p>{" "}
        <div className={styles.selectContainer}>
          <select
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            className={styles.transactionSelect}
          >
            <option value={""}>Select transaction type</option>
            <option value={"SALES"}>Sales</option>
            <option value={"TAX_PAYMENR"}>Tax Payment</option>
          </select>
        </div>
        {transactionType
          ? `Chosen transaction: ${transactionType}`
          : "No transaction selected"}
      </div>
      <div className={styles.centerSide}>
        <h1 className={styles.title}>Query Tax Position</h1>
        <p className={styles.instruction}>
          Enter the desired date from which you want the tax position
        </p>
        <div className={styles.datePickerContainer}>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.dateInput}
          />
          <div className={styles.dateDisplay}>
            {date ? `Date chosen: ${date}` : "No date selected"}
          </div>
        </div>
        <button
          disabled={!date}
          className={styles.calculateButton}
          onClick={handleButtonClick}
        >
          Calculate Tax Position
        </button>
        {taxPosition !== null && (
          <p>Tax Position: £{(taxPosition / 100).toFixed(2)}</p>
        )}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
      </div>
      <div className={styles.rightSide}>
        <h1 className={styles.title}>Amend Sale</h1>
      </div>
    </div>
  );
};

export default TaxPage;
