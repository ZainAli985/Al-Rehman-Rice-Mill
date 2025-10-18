import mongoose from "mongoose";

const generalEntriesSchema = mongoose.Schema({
  createdAt: { type: Date, default: Date.now },
  desc: { type: String },
  account: { type: String, required: true },
  debit_amt: { type: Number, required: true },
  credit: [
    {
      credit_account: { type: String, required: true },
      credit_amount: { type: Number, required: true },
    },
  ],
  comments: { type: String, required: true },
});

const generalEntry = mongoose.model("General_Entries", generalEntriesSchema);
export default generalEntry;
