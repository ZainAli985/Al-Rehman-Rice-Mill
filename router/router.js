import express from 'express';
import { Router } from 'express';
import { registeradmin } from '../controllers/registeradmin.js';
import { loginadmin } from '../controllers/loginadmin.js';
import { createAccount, getAccounts } from '../controllers/accounts.js';
import { createGeneralEntry, getGeneralEntries } from '../controllers/generalEntriesController.js';
import { getLedger } from '../controllers/ledgerController.js';
import { createPurchaseInvoice, getPurchaseInvoices } from '../controllers/purchaseInvoiceController.js';
import { createSalesInvoice, getSalesInvoices } from '../controllers/salesInvoiceController.js';

const router = Router();

router.post('/register', registeradmin);
router.post('/login', loginadmin);
router.post('/createaccount', createAccount);
router.get('/getaccounts', getAccounts);
router.post("/general-entry", createGeneralEntry);
router.get("/general-entries", getGeneralEntries);
router.get("/get-ledger", getLedger);
router.post("/createpurchaseinvoice", createPurchaseInvoice);
router.get("/getpurchaseinvoices", getPurchaseInvoices);
router.post("/createsalesinvoice", createSalesInvoice);
router.get("/getsalesinvoices", getSalesInvoices);

export default router;