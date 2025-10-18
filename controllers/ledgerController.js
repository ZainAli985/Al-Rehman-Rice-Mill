import GeneralEntry from "../models/general_entries.js";

export const getLedger = async (req, res) => {
  try {
    const entries = await GeneralEntry.find();

    // Map structure for summarizing per account
    const ledgerMap = new Map();

    entries.forEach((entry) => {
      // Debit side
      if (!ledgerMap.has(entry.account)) {
        ledgerMap.set(entry.account, {
          account: entry.account,
          description: entry.desc,
          debitSum: 0,
          creditSum: 0,
          balance: 0,
          date: entry.createdAt,
        });
      }

      const accData = ledgerMap.get(entry.account);
      accData.debitSum += entry.debit_amt;
      accData.balance += entry.debit_amt;

      // Credit side (each line in credit array)
      entry.credit.forEach((c) => {
        if (!ledgerMap.has(c.credit_account)) {
          ledgerMap.set(c.credit_account, {
            account: c.credit_account,
            description: entry.desc,
            debitSum: 0,
            creditSum: 0,
            balance: 0,
            date: entry.createdAt,
          });
        }

        const creditData = ledgerMap.get(c.credit_account);
        creditData.creditSum += c.credit_amount;
        creditData.balance -= c.credit_amount;
      });
    });

    const ledger = Array.from(ledgerMap.values());

    res.status(200).json({ ledger });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
