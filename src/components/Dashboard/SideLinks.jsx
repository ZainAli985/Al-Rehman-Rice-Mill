import React from "react";
import styles from "./SideLinks.module.css";
import { Link } from "react-router-dom";

const SideLinks = () => {
  return (
    <div className={styles.dashboard}>
      <aside className={styles.sidebar}>
        <h2 className={styles.logo}>WELCOME ALI RAZA</h2>
        <nav className={styles.nav}>
          <ul>
            <li><Link to="/dashboard" className={styles.link}>CREATE ACCOUNTS</Link></li>
            <li><Link to="/general-entries" className={styles.link}>GENERAL ENTERIES</Link></li>
            <li><Link to="/ledger" className={styles.link}>LEDGER</Link></li>
            <li><Link to="#" className={styles.link}>SALES INVOICE</Link></li>
            <li><Link to="#" className={styles.link}>PURCHASE INVOICE</Link></li>
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default SideLinks;
