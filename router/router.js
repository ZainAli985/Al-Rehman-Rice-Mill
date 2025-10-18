import express from 'express';
import { Router } from 'express';
import { registeradmin } from '../controllers/registeradmin.js';
import { loginadmin } from '../controllers/loginadmin.js';
import { createAccount, getAccounts } from '../controllers/accounts.js';

const router = Router();

router.post('/register', registeradmin);
router.post('/login', loginadmin);
router.post('/createaccount', createAccount);
router.get('/getaccounts', getAccounts);

export default router;