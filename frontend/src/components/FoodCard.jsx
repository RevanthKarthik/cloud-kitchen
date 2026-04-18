import { motion } from "framer-motion";

export default function FoodCard({ food, addToCart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="glass p-4 rounded-xl shadow-lg"
    >
      <img
        src={food.image || "https://via.placeholder.com/300"}
        className="rounded-lg h-40 w-full object-cover"
      />

      <h2 className="mt-2">{food.name}</h2>
      <p className="text-gray-300">₹{food.price}</p>

      <button
        onClick={() => addToCart(food)}
        className="btn-primary mt-2 w-full"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}