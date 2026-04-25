
import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import { CartContext } from "../context/CartContext";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE } from "../config";
import { API } from "../config";
export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState(null);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔥 FETCH DATA
  useEffect(() => {
    axios.get("/food")
      .then((res) => {
        setFoods(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => {
        setFoods([]);
        setLoading(false);
      });
  }, []);

  // 🔥 FLY TO CART FUNCTION
  const flyToCart = (img) => {
    const cart = document.getElementById("cart-icon");
    if (!cart || !img) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const clone = img.cloneNode(true);

    clone.style.position = "fixed";
    clone.style.left = imgRect.left + "px";
    clone.style.top = imgRect.top + "px";
    clone.style.width = imgRect.width + "px";
    clone.style.height = imgRect.height + "px";
    clone.style.transition = "all 0.7s ease-in-out";
    clone.style.zIndex = 1000;

    document.body.appendChild(clone);

    setTimeout(() => {
      clone.style.left = cartRect.left + "px";
      clone.style.top = cartRect.top + "px";
      clone.style.width = "30px";
      clone.style.height = "30px";
      clone.style.opacity = "0.5";
    }, 50);

    setTimeout(() => clone.remove(), 800);
  };

  // 🔥 FILTER
  const filtered = foods.filter((f) =>
    f?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-6">

      {/* SEARCH */}
      <input
        placeholder="Search food..."
        className="w-full p-3 mb-6 rounded-lg glass"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* LOADING */}
      {loading ? (
        <p className="text-center text-gray-400">Loading menu...</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-400">No food items found</p>
      ) : (

        <div className="grid md:grid-cols-3 gap-6">
          {filtered.map((food) => (
            <div
              key={food._id}
              className={`relative rounded-xl p-4 transition ${
                food.status === "out-of-stock"
                  ? "opacity-70 pointer-events-none"
                  : "glass hover:scale-105"
              }`}
            >

              {/* IMAGE */}
              <div className="relative">
                <img
  id={`img-${food._id}`}   // ✅ SAFE
  src={`${BASE}${food.image}`}
  className="h-56 w-full object-cover rounded-lg"
/>
                

                {food.status === "out-of-stock" && (
                  <div className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* DETAILS */}
              <h2 className="mt-3 text-lg font-bold">{food.name}</h2>
              <p className="text-gray-300">₹{food.price}</p>

              {/* BUTTON */}
              <motion.button
                whileTap={{ scale: 0.85 }}
                whileHover={food.status !== "out-of-stock" ? { scale: 1.05 } : {}}
                disabled={food.status === "out-of-stock"}
                onClick={() => {
  const img = document.getElementById(`img-${food._id}`);

  addToCart(food); // ✅ clean object
  setAddedId(food._id);

  flyToCart(img);  // ✅ animation only

  toast.success("Added to cart 🛒");

  setTimeout(() => setAddedId(null), 1000);
}}
                className={`mt-3 w-full py-2 rounded-lg font-semibold transition ${
                  food.status === "out-of-stock"
                    ? "bg-gray-600 cursor-not-allowed"
                    : addedId === food._id
                    ? "bg-green-700 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                }`}
              >
                {food.status === "out-of-stock"
                  ? "Unavailable"
                  : addedId === food._id
                  ? "Added ✓"
                  : "Add to Cart"}
              </motion.button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}