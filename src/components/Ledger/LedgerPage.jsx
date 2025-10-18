import SideLinks from "../Dashboard/SideLinks";
import styles from "./LedgerPage.module.css";
import Ledger from "./Ledger";

const LedgerPage = () => (
  <div className={styles.layout}>
    <SideLinks />
    <main className={styles.main}>
      <Ledger />
    </main>
  </div>
);

export default LedgerPage;
