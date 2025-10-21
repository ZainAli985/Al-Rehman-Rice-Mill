import React, { useState, useEffect } from "react";
import styles from "./PurchaseInvoiceForm.module.css";
import API_BASE_URL from "../../../config/API_BASE_URL";
import SideLinks from "../Dashboard/SideLinks";

const PurchaseInvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    ledgerReference: "",
    vehicleNumber: "",
    builtyNumber: "",
    vendorName: "",
    brokerName: "",
    paddyType: "",
    quantity: "",
    emptyVehicleWeight: "",
    filledVehicleWeight: "",
    subtractWeight: "",
    bagWeight: "",
    finalWeight: "",
    moisture: "",
    moistureAdjCal: "",
    moistureAdjustment: "",
    netWeightCal: "",
    netWeight: "",
    netWeight_40KG: "",
    weight_KG: "",
    ratePer40KG: "",
    amountCal: "",
    amount: "",
    difference: "",
    rentAdjustment: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [summary, setSummary] = useState(null);

  // 🧮 Handle field changes
  const handleChange = (field, value) => {
    setInvoice((prev) => ({ ...prev, [field]: value }));
  };

  // ⚙️ Auto calculations for net weights and amount
  useEffect(() => {
    const {
      filledVehicleWeight,
      emptyVehicleWeight,
      subtractWeight,
      bagWeight,
      ratePer40KG,
    } = invoice;

    const gross = Number(filledVehicleWeight) - Number(emptyVehicleWeight);
    const finalWeight = gross - Number(subtractWeight || 0);
    const netWeight = finalWeight - Number(bagWeight || 0);
    const netWeight_40KG = netWeight / 40;
    const amount = netWeight_40KG * Number(ratePer40KG || 0);

    setInvoice((prev) => ({
      ...prev,
      finalWeight: isNaN(finalWeight) ? "" : finalWeight,
      netWeight: isNaN(netWeight) ? "" : netWeight,
      netWeight_40KG: isNaN(netWeight_40KG) ? "" : netWeight_40KG.toFixed(2),
      amount: isNaN(amount) ? "" : amount.toFixed(2),
    }));
  }, [
    invoice.filledVehicleWeight,
    invoice.emptyVehicleWeight,
    invoice.subtractWeight,
    invoice.bagWeight,
    invoice.ratePer40KG,
  ]);

  // 🚀 Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${API_BASE_URL}/createpurchaseinvoice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invoice),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Purchase invoice saved successfully!");
        setInvoice({});
      } else {
        setError(data.message || "Failed to save purchase invoice.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error while saving invoice.");
    }
  };

  // 🧾 Fetch summary (for dashboard/ledger view)
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/getpurchaseinvoices`);
        const data = await res.json();
        if (res.ok) setSummary(data.summary);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSummary();
    console.log('PRUCHASE INVOICE')
  }, []);
return (
  <div className={styles.wrapper}>
    <SideLinks />

    <div className={styles.main}>
      <h2>Purchase Invoice Entry</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.grid}>
          {Object.keys(invoice).map((field) => (
            <div key={field} className={styles.field}>
              <label>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type="text"
                value={invoice[field] || ""}
                onChange={(e) => handleChange(field, e.target.value)}
              />
            </div>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}

        <button type="submit" className={styles.submitBtn}>
          Save Invoice
        </button>
      </form>

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
            Average Rate/40KG: <strong>{summary.averageRate40KG}</strong>
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

export default PurchaseInvoiceForm;
