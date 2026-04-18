import mongoose from "mongoose";
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: String,
  quantity: String,
  description: String,
  image: String,
  status: { type: String, default: "in-stock" }
});
export default mongoose.model("Food", foodSchema);