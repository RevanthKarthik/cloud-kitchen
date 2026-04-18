import express from "express";
import {
  getFoods,
  createFood,
  deleteFood,
  updateFood,
} from "../controllers/foodController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getFoods);
router.post("/", protect, upload.single("image"), createFood);
router.put("/:id", protect, upload.single("image"), updateFood);
router.delete("/:id", protect, deleteFood);

export default router;