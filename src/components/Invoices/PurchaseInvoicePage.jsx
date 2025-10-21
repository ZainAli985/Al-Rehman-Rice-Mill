import React, { useEffect, useState } from "react";
import styles from "./PurchaseInvoicePage.module.css";
import SideLinks from "../Dashboard/SideLinks";
import API_BASE_URL from "../../../config/API_BASE_URL";

const PurchaseInvoicePage = () => {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getpurchaseinvoices`);
        const data = await res.json();

        if (res.ok) {
          setInvoices(data.invoices || []);
          setSummary(data.summary || null);
        }
      } catch (err) {
        console.error("Error fetching invoices:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SideLinks />

      <div className={styles.main}>
        <h2>📑 Purchase Invoices</h2>

        {loading ? (
          <p>Loading invoices...</p>
        ) : invoices.length === 0 ? (
          <p>No purchase invoices found.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Ledger Ref.</th>
                  <th>Vehicle No</th>
                  <th>Vendor</th>
                  <th>Broker</th>
                  <th>Paddy Type</th>
                  <th>Qty</th>
                  <th>Net Weight (40KG)</th>
                  <th>Rate / 40KG</th>
                  <th>Amount (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => (
                  <tr key={idx}>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                    <td>{inv.ledgerReference}</td>
                    <td>{inv.vehicleNumber}</td>
                    <td>{inv.vendorName}</td>
                    <td>{inv.brokerName}</td>
                    <td>{inv.paddyType}</td>
                    <td>{inv.quantity}</td>
                    <td>{inv.netWeight_40KG}</td>
                    <td>{inv.ratePer40KG}</td>
                    <td>{inv.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {summary && (
          <div className={styles.summary}>
            <h3>📊 Purchase Summary</h3>
            <p>
              Total Net Weight: <strong>{summary.totalNetWeight}</strong>
            </p>
            <p>
              Total Net Weight (40KG):{" "}
              <strong>{summary.totalNetWeight40KG}</strong>
            </p>
            <p>
              Average Rate/40KG:{" "}
              <strong>{summary.averageRate40KG}</strong>
            </p>
            <p>
              Total Purchase Amount:{" "}
              <strong>{summary.totalPurchaseAmount}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseInvoicePage;
