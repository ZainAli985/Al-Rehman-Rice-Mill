import React, { useState, useEffect } from "react";
import styles from "./GeneralEntryForm.module.css";
import API_BASE_URL from "../../../config/API_BASE_URL";

const GeneralEntryForm = () => {
  const [desc, setDesc] = useState("");
  const [account, setAccount] = useState("");
  const [debit_amt, setDebitAmt] = useState("");
  const [comments, setComments] = useState("");
  const [credits, setCredits] = useState([{ credit_account: "", credit_amount: "" }]);
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🧩 Fetch all accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getaccounts`);
        const data = await res.json();
        if (res.ok && data.accounts) {
          setAccounts(data.accounts);
        } else {
          console.error("Failed to load accounts:", data.message);
        }
      } catch (err) {
        console.error("Error fetching accounts:", err);
      }
    };
    fetchAccounts();
  }, []);

  // ➕ Add a new credit line
  const addCreditLine = () => {
    setCredits([...credits, { credit_account: "", credit_amount: "" }]);
  };

  // 📝 Handle credit line changes
  const handleCreditChange = (index, field, value) => {
    const updated = [...credits];
    updated[index][field] = value;
    setCredits(updated);
  };

  // 💰 Calculate total credit
  const totalCredit = credits.reduce(
    (sum, c) => sum + Number(c.credit_amount || 0),
    0
  );

  // 🚀 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (Number(debit_amt) !== totalCredit) {
      setError("Total credit must equal debit amount before submission!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/general-entry`, {  // ✅ updated endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          desc,
          account,
          debit_amt: Number(debit_amt),
          credit: credits.map(c => ({
            credit_account: c.credit_account,
            credit_amount: Number(c.credit_amount)
          })), // ✅ ensures numeric type
          comments,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || "Entry recorded successfully!");
        setDesc("");
        setAccount("");
        setDebitAmt("");
        setCredits([{ credit_account: "", credit_amount: "" }]);
        setComments("");
      } else {
        setError(data.message || "Server error while creating entry.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error while sending data.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>General Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <label>Description</label>
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Entry description..."
        />

        <label>Debit Account</label>
        <select
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
        >
          <option value="">Select Debit Account</option>
          {accounts.map((acc) => (
            <option key={acc._id} value={acc.account_name}>
              {acc.account_name} ({acc.account_type})
            </option>
          ))}
        </select>

        <label>Debit Amount</label>
        <input
          type="number"
          value={debit_amt}
          onChange={(e) => setDebitAmt(e.target.value)}
          placeholder="Debit amount..."
          required
        />

        <div className={styles.creditSection}>
          <h3>Credit Breakdown</h3>
          {credits.map((credit, index) => (
            <div key={index} className={styles.creditLine}>
              <select
                value={credit.credit_account}
                onChange={(e) =>
                  handleCreditChange(index, "credit_account", e.target.value)
                }
                required
              >
                <option value="">Select Credit Account</option>
                {accounts.map((acc) => (
                  <option key={acc._id} value={acc.account_name}>
                    {acc.account_name} ({acc.account_type})
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Credit Amount"
                value={credit.credit_amount}
                onChange={(e) =>
                  handleCreditChange(index, "credit_amount", e.target.value)
                }
                required
              />
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={addCreditLine}>
            + Add Credit Line
          </button>
        </div>

        <p className={styles.total}>
          Total Credit: <strong>{totalCredit}</strong>
        </p>

        <label>Comments</label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          placeholder="Optional comments..."
        ></textarea>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.submitBtn}>
          Submit Entry
        </button>
      </form>
    </div>
  );
};

export default GeneralEntryForm;
