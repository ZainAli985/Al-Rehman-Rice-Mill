import React, { useEffect, useState } from "react";
import styles from "./SalesInvoice.module.css";
import axios from "axios";
import SideLinks from "../Dashboard/SideLinks";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:3000/api";

const SalesInvoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [summary, setSummary] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    vehicleNumber: "",
    builtyNumber: "",
    vendorName: "",
    brokerName: "",
    paddyType: "",
    quantity: "",
    weight: "",
    bagWeight: "",
    netWeight: "",
    netWeight_40KG: "",
    ratePer40KG: "",
    amount: "",
    sutliSilaiRate: "",
    sutliSilaiAmount: "",
    totalAmount: "",
    brokeryRate: "",
    brokery: "",
    totalAmount2: "",
  });

  // 📦 Fetch invoices
  const fetchInvoices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/getsalesinvoices`);
      if (res.data.success) {
        setInvoices(res.data.invoices);
        setSummary(res.data.summary);
      }
    } catch (error) {
      console.error("Error fetching sales invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 🧾 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/createsalesinvoice`, formData);
      alert("Sales Invoice Created Successfully!");
      setFormData({});
      fetchInvoices();
    } catch (error) {
      console.error("Error creating sales invoice:", error);
      alert("Error while creating invoice!");
    }
  };

  // 🧩 Input change
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={styles.dashboard}>
      <SideLinks />

      <div className={styles.mainContent}>
        <h2 className={styles.pageTitle}>🧾 Sales Invoice</h2>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className={styles.invoiceForm}>
          <div className={styles.grid}>
            {Object.keys(formData).map((key) => (
              <div key={key} className={styles.field}>
                <label>{key.replace(/([A-Z])/g, " $1")}</label>
                <input
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.replace(/([A-Z])/g, " $1")}
                />
              </div>
            ))}
          </div>

          <button type="submit" className={styles.submitButton}>
            Save Invoice
          </button>
        </form>

        {/* Table Section */}
        <div className={styles.tableSection}>
          <h3>📋 Saved Sales Invoices</h3>
          <table className={styles.invoiceTable}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Vehicle No.</th>
                <th>Vendor</th>
                <th>Paddy Type</th>
                <th>Net Weight</th>
                <th>Rate/40Kg</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length > 0 ? (
                invoices.map((inv, i) => (
                  <tr key={inv._id}>
                    <td>{i + 1}</td>
                    <td>{new Date(inv.date).toLocaleDateString()}</td>
                    <td>{inv.vehicleNumber}</td>
                    <td>{inv.vendorName}</td>
                    <td>{inv.paddyType}</td>
                    <td>{inv.netWeight}</td>
                    <td>{inv.ratePer40KG}</td>
                    <td>{inv.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className={styles.noData}>
                    No Sales Invoices Yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        {summary && (
          <div className={styles.summaryBox}>
            <h3>📊 Sales Summary</h3>
            <p><strong>Total Net Weight:</strong> {summary.totalNetWeight}</p>
            <p><strong>Total Net Weight (40KG):</strong> {summary.totalNetWeight40KG}</p>
            <p><strong>Total Sales:</strong> Rs. {summary.totalSales}</p>
            <p><strong>Avg Phukar:</strong> {summary.averagePhukar}</p>
            <p><strong>Avg Polish:</strong> {summary.averagePolish}</p>
            <p><strong>Avg Rice:</strong> {summary.averageRice}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesInvoice;
