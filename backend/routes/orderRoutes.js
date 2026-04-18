import express from "express";
import {
  createOrder,
  getUserOrders,updateOrderStatus,
  getAllOrders,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getUserOrders);
router.get("/all", protect, getAllOrders); // ✅ ADMIN

router.put("/:id", protect, updateOrderStatus);
export default router;