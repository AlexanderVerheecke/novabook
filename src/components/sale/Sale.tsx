import React, { useState } from "react";
import styles from "./Sale.module.scss";

const Sale = () => {
  const [date, setDate] = useState("");

  return (
    <div>
      {" "}
      <h1 className="title">Amend Sale</h1>
      <p className="instruction">
        Enter the details fo the sale to be amended
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
    </div>
  );
};

export default Sale;
