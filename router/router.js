import express from 'express';
import { Router } from 'express';
import { registeradmin } from '../controllers/registeradmin.js';
import { loginadmin } from '../controllers/loginadmin.js';

const router = Router();

router.post('/register', registeradmin);
router.post('/login', loginadmin);

export default router;