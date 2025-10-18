import express from "express";
import cors from "cors";
import router from "../router/router.js";
import ConnectDB from "../config/dbconnect.js";
import path from "path";
import { fileURLToPath } from "url";
import { Router } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
ConnectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API routes
app.use("/api", router);

// Serve frontend (Vite build)
app.use(express.static(path.join(__dirname, "../dist")));

// ✅ Express 5-compatible fallback
const routerFallback = Router();
routerFallback.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});
app.use(routerFallback);

app.listen(port, () => {
  console.log(`✅ SERVER RUNNING ON PORT ${port}`);
});
