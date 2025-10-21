import SalesInvoice from "../models/sale_invoice.js";

// 🧾 CREATE Sales Invoice
export const createSalesInvoice = async (req, res) => {
  try {
    const invoiceData = req.body;
    const newInvoice = new SalesInvoice(invoiceData);
    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: "Sales invoice created successfully!",
      invoice: newInvoice,
    });
  } catch (err) {
    console.error("Error creating sales invoice:", err);
    res.status(500).json({
      success: false,
      message: "Failed to create sales invoice.",
      error: err.message,
    });
  }
};

// 📊 GET ALL Sales Invoices + Summary
export const getSalesInvoices = async (req, res) => {
  try {
    const invoices = await SalesInvoice.find();

    // Compute summary if invoices exist
    let summary = null;
    if (invoices.length > 0) {
      const totalNetWeight = invoices.reduce((sum, i) => sum + (i.netWeight || 0), 0);
      const totalNetWeight40KG = invoices.reduce((sum, i) => sum + (i.netWeight_40KG || 0), 0);
      const totalSales = invoices.reduce((sum, i) => sum + (i.amount || 0), 0);

      const averagePhukar = invoices.reduce((sum, i) => sum + (i.summary?.averagePhukar || 0), 0) / invoices.length;
      const averagePolish = invoices.reduce((sum, i) => sum + (i.summary?.averagePolish || 0), 0) / invoices.length;
      const averageRice = invoices.reduce((sum, i) => sum + (i.summary?.averageRice || 0), 0) / invoices.length;

      summary = {
        totalNetWeight,
        totalNetWeight40KG,
        totalSales,
        averagePhukar: isNaN(averagePhukar) ? 0 : averagePhukar.toFixed(2),
        averagePolish: isNaN(averagePolish) ? 0 : averagePolish.toFixed(2),
        averageRice: isNaN(averageRice) ? 0 : averageRice.toFixed(2),
      };
    }

    res.status(200).json({
      success: true,
      invoices,
      summary,
    });
  } catch (err) {
    console.error("Error fetching sales invoices:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales invoices.",
      error: err.message,
    });
  }
};
