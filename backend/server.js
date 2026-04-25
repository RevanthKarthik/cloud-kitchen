import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { Server } from "socket.io";

dotenv.config();
connectDB();

const app = express();

// ✅ FIX __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ CORS (clean version)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FIX CORB (for images)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);

// ✅ STATIC FILES (uploads)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ SERVER
const server = app.listen(process.env.PORT || 5000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// ✅ SOCKET.IO
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});