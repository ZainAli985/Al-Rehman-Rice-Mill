import express from 'express';
import cors from 'cors';
import router from '../router/router.js'
import ConnectDB from '../config/dbconnect.js';
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
ConnectDB();

app.use('/api', router);
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON http://127.0.0.1:${port}`);
});
