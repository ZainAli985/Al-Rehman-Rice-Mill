import generalEntry from "../models/general_entries.js";

export const createGeneralEntry = async (req, res) => {
  try {
    const { desc, account, debit_amt, credit, comments } = req.body;

    if (!account || !debit_amt || !credit || credit.length === 0) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Verify debit = total credit before saving
    const totalCredit = credit.reduce((sum, c) => sum + Number(c.credit_amount), 0);
    if (Number(debit_amt) !== totalCredit) {
      return res.status(400).json({
        message: `Debit amount (${debit_amt}) must equal total credit (${totalCredit}).`,
      });
    }

    const newEntry = new generalEntry({
      desc,
      account,
      debit_amt,
      credit,
      comments,
    });

    const savedEntry = await newEntry.save();
    res.status(201).json({
      message: "General entry created successfully.",
      entry: savedEntry,
    });
  } catch (err) {
    console.error("Error creating general entry:", err);
    res.status(500).json({ message: "Server error creating entry." });
  }
};


export const getGeneralEntries = async (req, res) => {
  try {
    const entries = await generalEntry.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ entries, count: entries.length });
  } catch (err) {
    console.error("Error fetching general entries:", err);
    res.status(500).json({ message: "Server error fetching entries." });
  }
};
