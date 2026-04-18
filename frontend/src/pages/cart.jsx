import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
function Cart() {
  const { cart, increaseQty, decreaseQty } = useContext(CartContext);
   const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const user = JSON.parse(localStorage.getItem("user"));

const checkout = async () => {
  try {
    await axios.post(
      "http://localhost:5000/api/orders",
      {
        items: cart,
        total,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    
    navigate("/dashboard");
    toast.success("Order Placed ✅");
    
    localStorage.removeItem("cart");
    window.location.reload();
    

  } catch (err) {
    toast.error("Checkout failed ❌");
  }
};

  return (
    <div className="p-6 mt-20 text-white max-w-4xl mx-auto">

      <h1 className="text-3xl mb-6">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="glass p-4 mb-3 flex justify-between items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={`http://localhost:5000${item.image}`}
                  className="h-20 w-20 rounded object-cover"
                />

                <div>
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  {item.status === "out-of-stock" && (
  <p className="text-red-500 text-sm">Out of Stock</p>
)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQty(item._id)}
                  className="bg-red-500 px-3 rounded"
                >
                  -
                </button>

                <span>{item.qty}</span>

                <button
                  onClick={() => increaseQty(item._id)}
                  className="bg-green-500 px-3 rounded"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          
          <div className="flex justify-between items-center mb-4">
  
       <h2 className="mt-4 text-xl font-bold">
            Total: ₹{total}
          </h2>       
  <button
    onClick={() => navigate("/menu")}
    className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 transition"
  >
    ➕ Add More Items
  </button>
</div>
          <button
  onClick={checkout}
  className="mt-4 w-full bg-green-500 py-3 rounded-lg text-lg"
>
  ✅ Place Order
</button>
        </>
        
      )}
    </div>
  );
}

export default Cart;