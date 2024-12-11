"use client";
import React, { useState, useEffect } from "react";
import styles from "./TaxPage.module.scss";
import TaxPosition from "./taxPosition/TaxPosition";
import Sale from "./sale/Sale";
import Ingest from "./ingest/Ingest";

const TaxPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <Ingest />
      </div>
      <div className={styles.centerSide}>
        <TaxPosition />
      </div>
      <div className={styles.rightSide}>
        {" "}
        <Sale />
      </div>
    </div>
  );
};

export default TaxPage;
