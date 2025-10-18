import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "../router/router.js";
import ConnectDB from "../config/dbconnect.js";

const app = express();
const port = process.env.PORT || 3000; // ✅ Use Railway's dynamic port

// Connect to DB
ConnectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use("/api", router);

// Serve frontend (Vite build)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Make sure this is AFTER the API routes
app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`✅ SERVER IS RUNNING ON PORT: ${port}`);
});
