import Order from "../models/order.js";
import Food from "../models/Food.js";
import { io } from "../server.js";

export const createOrder = async (req, res) => {
  try {
    const { items, total } = req.body;

    // 🚫 CHECK STOCK
    for (let item of items) {
      const food = await Food.findById(item._id);

      if (!food || food.status === "out-of-stock") {
        return res.status(400).json({
          message: `${item.name} is out of stock`,
        });
      }
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      total,
    });

    // 🔥 SOCKET EVENT
    io.emit("newOrder", order);

    res.json(order);

  } catch (err) {
    res.status(500).json({ message: "Order failed" });
  }
};

// ✅ USER ORDERS
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .sort({ createdAt: -1 }); // 🔥 IMPORTANT

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// ✅ ADMIN ALL ORDERS
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .sort({ createdAt: -1 }); // 🔥 IMPORTANT

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    console.log("Updating:", req.params.id, status); // DEBUG

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    await order.save();

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Update failed" });
  }
};