
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { Server } from "socket.io"; // ✅ ADD
dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: [
    "http://localhost:5173" // 👈 replace after deploy
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/orders", orderRoutes);

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ IMPORTANT: CREATE SERVER INSTANCE
const server = app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);

// ✅ SOCKET.IO SETUP
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
