import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE } from "../config";
import { API } from "../config";
export default function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchOrders = () => {
    axios.get(`${API}/orders/all`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(res => setOrders(res.data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 UPDATE STATUS
  const getStatusColor = (status) => {
  switch (status) {
    case "Cancelled":
      return "bg-red-400 text-black shadow-red-300/50";
    case "preparing":
      return "bg-blue-500 text-white shadow-blue-400/50";
    case "dispatched":
      return "bg-purple-500 text-white shadow-purple-400/50";
    case "delivered":
      return "bg-green-500 text-white shadow-green-400/50";
    default:
      return "bg-gray-500 text-white shadow-yellow-400/50";
  }
};

  const updateStatus = async (id, status) => {
  try {
    await axios.put(`${API}/orders/${id}`, 
      { status },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    toast.success(`Updated to ${status}`);
    fetchOrders();

  } catch (err) {
    console.error(err.response?.data || err.message); // 👈 DEBUG
    toast.error("Update failed ❌");
  }
};

  return (
    <div className="p-6 mt-20 text-white max-w-5xl mx-auto">

      <h1 className="text-3xl mb-6">📦 Manage Orders</h1>

      {orders.map(order => (
        <div key={order._id} className="glass p-4 mb-4 rounded-xl">

          {/* HEADER */}
          <div className="flex justify-between mb-3">
        
            <div>
                
              <p>User: {order.user?.name}</p>
              
              <p className="font-bold">₹{order.total}</p>
            </div>
<div className="flex justify-center my-3">
  <span
    className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide shadow-md ${getStatusColor(order.status)}`}
  >
    {order.status.toUpperCase()}
  </span>
</div>
          </div>

          {/* ITEMS */}
          {order.items.map((item, i) => (
            <div key={i} className="flex gap-3 mb-2">
              <img
src={`${BASE}${item.image}`}
                className="h-12 w-12 rounded"
              />
              <p>{item.name} x {item.qty}</p>
            </div>
          ))}

          {/* 🔥 STATUS BUTTONS */}
          <div className="flex gap-2 mt-3">

  <button
    onClick={() => updateStatus(order._id, "preparing")}
    className={`px-3 py-1 rounded transition ${
      order.status === "preparing"
        ? "bg-blue-700"
        : "bg-blue-500 hover:bg-blue-600"
    }`}
  >
   👨‍🍳 PREPARING
  </button>

  <button
    onClick={() => updateStatus(order._id, "dispatched")}
    className={`px-3 py-1 rounded transition ${
      order.status === "dispatched"
        ? "bg-purple-700"
        : "bg-purple-500 hover:bg-purple-600"
    }`}
  >
   🚚 DISPATCHED
  </button>

  <button
    onClick={() => updateStatus(order._id, "delivered")}
    className={`px-3 py-1 rounded transition ${
      order.status === "delivered"
        ? "bg-green-700"
        : "bg-green-500 hover:bg-green-600"
    }`}
  >
    ✅ DELIVERED
  </button>
  <button
    onClick={() => updateStatus(order._id, "Cancelled")}
    className={`px-3 py-1 rounded transition ${
      order.status === "Cancelled"
        ? "bg-red-700"
        : "bg-red-500 hover:bg-red-600"
    }`}
  >
    Cancel
  </button>

</div>

        </div>
      ))}

    </div>
  );
}