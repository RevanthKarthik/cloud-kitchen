
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      name: String,
      price: Number,
      qty: Number,
      image: String,
    },
  ],
  total: Number,
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);