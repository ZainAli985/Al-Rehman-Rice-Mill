import React, { useEffect, useState } from "react";
import styles from "./AccountsList.module.css";
import API_BASE_URL from "../../../config/API_BASE_URL";

const AccountsList = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accountcount, setaccountcount] = useState('');

  // Fetch all accounts when the component loads
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getaccounts`);
        const data = await response.json();
        setAccounts(data.accounts || []);
        setaccountcount(data.account_count); 
        // assuming your backend returns {accounts: [...]}
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading accounts...</p>;
  }

  if (accounts.length === 0) {
    return <p className={styles.empty}>No accounts found.</p>;
  }

  return (
    <>
    <h1>Open Accounts ({accountcount})</h1>
    <div className={styles.container}>
      {accounts.map((acc, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.name}>{acc.account_name}</h3>
          <p className={styles.type}>
            <strong>Type:</strong> {acc.account_type}
          </p>
          <p className={styles.subType}>
            <strong>Sub Type:</strong> {acc.sub_type}
          </p>
          <p className={styles.createdBy}>
            <strong>Created By:</strong> {acc.created_by}
          </p>
          <p className={styles.date}>
            <strong>Date:</strong> {new Date(acc.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  </>
  );
};

export default AccountsList;
