import express from "express";
import cors from "cors";
import router from "../router/router.js";
import ConnectDB from "../config/dbconnect.js";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config(); // ✅ loads .env automatically

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
ConnectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/api", router);

//  Serve frontend only in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`✅ Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});
