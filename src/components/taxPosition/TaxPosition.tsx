import React, { useState } from "react";
import styles from "./TaxPosition.module.scss";

const TaxPosition = () => {
  const [date, setDate] = useState("");
  const [taxPosition, setTaxPosition] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      {" "}
      <h1 className="title">Query Tax Position</h1>
      <p className="instruction">
        Enter the desired date from which you want the tax position
      </p>
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
      <button
        disabled={!date}
        className="calculateButton"
        onClick={handleButtonClick}
      >
        Calculate Tax Position
      </button>
      {taxPosition !== null && (
        <p>Tax Position: £{(taxPosition / 100).toFixed(2)}</p>
      )}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
};

export default TaxPosition;
