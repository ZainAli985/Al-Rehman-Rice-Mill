import PurchaseInvoice from "../models/purchase_invoice.js";

// 🧾 Create new Purchase Invoice
export const createPurchaseInvoice = async (req, res) => {
  try {
    const data = req.body;

    // Calculate derived fields before saving
    const {
      emptyVehicleWeight,
      filledVehicleWeight,
      subtractWeight,
      bagWeight,
      finalWeight,
      netWeight,
      netWeight_40KG,
      ratePer40KG,
      amount,
    } = data;

    // Basic validation
    if (!netWeight || !netWeight_40KG || !ratePer40KG || !amount) {
      return res.status(400).json({ message: "Missing required numeric values." });
    }

    // Create a new invoice
    const newInvoice = new PurchaseInvoice({
      ...data,
      totals: {
        totalNetWeight: netWeight,
        totalNetWeight40KG: netWeight_40KG,
        averageRate40KG: ratePer40KG,
        totalPurchaseAmount: amount,
      },
    });

    await newInvoice.save();

    res.status(201).json({
      success: true,
      message: "Purchase invoice created successfully!",
      invoice: newInvoice,
    });
  } catch (err) {
    console.error("Error creating purchase invoice:", err);
    res.status(500).json({ message: "Server error while creating invoice." });
  }
};

// 📊 Get all Purchase Invoices with summary
export const getPurchaseInvoices = async (req, res) => {
  try {
    const invoices = await PurchaseInvoice.find().sort({ createdAt: -1 });

    if (!invoices.length) {
      return res.status(200).json({ message: "No purchase invoices found", invoices: [] });
    }

    // Compute totals dynamically (can be used for dashboard)
    const totalNetWeight = invoices.reduce((sum, inv) => sum + (inv.netWeight || 0), 0);
    const totalNetWeight40KG = invoices.reduce((sum, inv) => sum + (inv.netWeight_40KG || 0), 0);
    const totalPurchaseAmount = invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);

    // Weighted average rate (based on weight 40KG)
    const averageRate40KG =
      invoices.reduce((sum, inv) => sum + (inv.ratePer40KG * (inv.netWeight_40KG || 0)), 0) /
      (totalNetWeight40KG || 1);

    res.status(200).json({
      success: true,
      invoices,
      summary: {
        totalNetWeight,
        totalNetWeight40KG,
        averageRate40KG: Number(averageRate40KG.toFixed(2)),
        totalPurchaseAmount,
      },
    });
  } catch (err) {
    console.error("Error fetching invoices:", err);
    res.status(500).json({ message: "Server error while fetching invoices." });
  }
};
