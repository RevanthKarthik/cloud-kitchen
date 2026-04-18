import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "../api/axios";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const placeOrder = async () => {
    await axios.post(
      "/orders",
      { items: cart, total },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );

    alert("Order Placed!");
  };

  return (
    <div className="p-6">
      <h1>Checkout</h1>
      <h2>Total: ₹{total}</h2>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}