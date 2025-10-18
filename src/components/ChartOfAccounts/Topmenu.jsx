import React from "react";
import { Link } from "react-router-dom";
import styles from "./Topmenu.module.css";

const TopMenu = ({ setActiveTab }) => {
  return (
    <div className={styles.topmenu}>
      <button className={styles.link} onClick={() => setActiveTab("create")}>
        CREATE ACCOUNT
      </button>
      <button className={styles.link} onClick={() => setActiveTab("accounts")}>
        ACCOUNTS
      </button>
    </div>
  );
};

export default TopMenu;
