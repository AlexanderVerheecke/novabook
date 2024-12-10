import React from "react";
import styles from "./TaxPage.module.scss";

const TaxPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <h1 className={styles.title}>Query Tax Position</h1>
      </div>
      <div className={styles.rightSide}>
        <h1 className={styles.title}>Right Page</h1>
      </div>
    </div>
  );
};

export default TaxPage;
