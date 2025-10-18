import React from "react";
import SideLinks from "../Dashboard/SideLinks";
import GeneralEntryForm from "./GeneralEntryForm";
import styles from "./GeneralEntriesPage.module.css";

const GeneralEntriesPage = () => {
  return (
    <div className={styles.layout}>
      <SideLinks />
      <main className={styles.main}>
        <GeneralEntryForm/>
      </main>
    </div>
  );
};

export default GeneralEntriesPage;
