import React, { useEffect, useState } from "react";
import styles from "./Ledger.module.css";
import API_BASE_URL from "../../../config/API_BASE_URL";

const Ledger = () => {
  const [ledgerData, setLedgerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/get-ledger`);
        const data = await res.json();
        if (res.ok && data.ledger) {
          setLedgerData(data.ledger);
        }
      } catch (err) {
        console.error("Error fetching ledger:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLedger();
  }, []);

  if (loading) return <p>Loading ledger...</p>;

  return (
    <div className={styles.container}>
      <h2>Ledger</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th>Sum of Debit</th>
            <th>Sum of Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {ledgerData.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.empty}>No entries yet.</td>
            </tr>
          ) : (
            ledgerData.map((row, index) => (
              <tr key={index}>
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>{row.account}</td>
                <td>{row.description}</td>
                <td>{row.debitSum.toFixed(2)}</td>
                <td>{row.creditSum.toFixed(2)}</td>
                <td
                  className={
                    row.balance >= 0 ? styles.positive : styles.negative
                  }
                >
                  {row.balance.toFixed(2)}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ledger;
