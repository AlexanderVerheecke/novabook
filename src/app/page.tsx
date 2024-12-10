import styles from "./page.module.css";
import TaxPage from "@/components/TaxPage";

export default function Home() {
  return (
    <div className={styles.page}>
      <main>
        <TaxPage />
      </main>
    </div>
  );
}
