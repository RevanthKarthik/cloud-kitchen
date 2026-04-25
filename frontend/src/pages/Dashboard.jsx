import { useEffect, useState } from "react";
import axios from "axios";
import { BASE } from "../config";
import { API } from "../config";
export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // 🔥 FETCH USER ORDERS (ONLY LOGGED USER)
  useEffect(() => {
    axios.get(`${API}/orders/my`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 🔥 STATUS COLOR FUNCTION
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

  // 🔥 GROUP ORDERS (TODAY / YESTERDAY / OLDER)
  const groupOrders = () => {
    const today = [];
    const yesterday = [];
    const older = [];

    const now = new Date();

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);

      const diffTime = now - orderDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) {
        today.push(order);
      } else if (diffDays === 1) {
        yesterday.push(order);
      } else {
        older.push(order);
      }
    });

    return { today, yesterday, older };
  };

  const { today, yesterday, older } = groupOrders();

  // 🔥 REUSABLE ORDER CARD
  const renderOrder = (order) => (
    <div
      key={order._id}
      className="glass p-4 mb-4 rounded-xl border border-white/10"
    >

      {/* HEADER */}
      <div className="flex justify-between items-center mb-3">
        <div>
          <p className="text-lg font-bold">₹{order.total}</p>
          <p className="text-sm text-gray-400">
            Order ID: {order._id.slice(-6)}
          </p>
        </div>
      </div>

      {/* 🔥 CENTERED STATUS */}
      <div className="flex justify-center my-3">
        <span
          className={`px-6 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* ITEMS */}
      <div className="space-y-2">
        {order.items.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white/5 p-2 rounded"
          >
            <img
              src={`${BASE}${item.image}`}
              className="h-14 w-14 rounded object-cover"
            />

            <div className="flex-1">
              <p>{item.name}</p>
              <p className="text-sm text-gray-400">
                ₹{item.price} × {item.qty}
              </p>
            </div>

            <p className="font-bold">
              ₹{item.price * item.qty}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 mt-20 text-white max-w-5xl mx-auto">

      <h1 className="text-3xl mb-6">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <>
          {/* 📅 TODAY */}
          {today.length > 0 && (
            <>
              <h2 className="text-xl mt-6 mb-3 text-yellow-400">
                📅 Today
              </h2>
              {today.map(renderOrder)}
            </>
          )}

          {/* 📅 YESTERDAY */}
          {yesterday.length > 0 && (
            <>
              <h2 className="text-xl mt-6 mb-3 text-blue-400">
                📅 Yesterday
              </h2>
              {yesterday.map(renderOrder)}
            </>
          )}

          {/* 📅 OLDER */}
          {older.length > 0 && (
            <>
              <h2 className="text-xl mt-6 mb-3 text-gray-400">
                📅 Older
              </h2>
              {older.map(renderOrder)}
            </>
          )}
        </>
      )}
    </div>
  );
}