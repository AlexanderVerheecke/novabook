import styles from "./page.module.scss";
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
