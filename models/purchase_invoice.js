import mongoose from "mongoose";

const purchaseInvoiceSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },

    ledgerReference: { type: String },
    vehicleNumber: { type: String },
    builtyNumber: { type: String },

    vendorName: { type: String },
    brokerName: { type: String },
    paddyType: { type: String },

    quantity: { type: Number },
    emptyVehicleWeight: { type: Number },
    filledVehicleWeight: { type: Number },
    subtractWeight: { type: Number },
    bagWeight: { type: Number },
    finalWeight: { type: Number },

    moisturePercent: { type: Number },
    moistureAdjCal: { type: Number },
    moistureAdjustment: { type: Number },

    netWeightCal: { type: Number },
    netWeight: { type: Number },
    netWeight_40KG: { type: Number },
    weight_KG: { type: Number },

    ratePer40KG: { type: Number },
    amountCal: { type: Number },
    amount: { type: Number },
    difference: { type: Number },
    rentAdjustment: { type: Number, default: 0 },

    totals: {
      totalNetWeight: { type: Number, default: 0 },
      totalNetWeight40KG: { type: Number, default: 0 },
      averageRate40KG: { type: Number, default: 0 },
      totalPurchaseAmount: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

export default mongoose.model("PurchaseInvoice", purchaseInvoiceSchema);
