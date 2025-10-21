import mongoose from "mongoose";

const salesInvoiceSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },

    vehicleNumber: { type: String },
    builtyNumber: { type: String },

    vendorName: { type: String },
    brokerName: { type: String },
    paddyType: { type: String },

    quantity: { type: Number },
    weight: { type: Number },
    bagWeight: { type: Number },
    netWeight: { type: Number },
    netWeight_40KG: { type: Number },

    ratePer40KG: { type: Number },
    amount: { type: Number },

    sutliSilaiRate: { type: Number },
    sutliSilaiAmount: { type: Number },
    totalAmount: { type: Number },

    brokeryRate: { type: Number },
    brokery: { type: Number },
    totalAmount2: { type: Number },

    // 🧾 Summary fields for analysis (averages & totals)
    summary: {
      totalSales: { type: Number, default: 0 },
      averagePhukar: { type: Number, default: 0 },
      averagePolish: { type: Number, default: 0 },
      averageRice: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("SalesInvoice", salesInvoiceSchema);
