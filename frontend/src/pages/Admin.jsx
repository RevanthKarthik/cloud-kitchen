import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE } from "../config";
import { io } from "socket.io-client";
import toast from "react-hot-toast";
import { API } from "../config";
import { useRef } from "react";
export default function Admin() {
  const [foods, setFoods] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: "",
    status: "in-stock",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const audioRef = useRef(null);
  // ✅ FETCH FOODS
  const fetchFoods = () => {
    axios.get(`${API}/food`)
      .then((res) => setFoods(res.data))
      .catch(() => toast.error("Failed to load foods ❌"));
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // ✅ CLEAN OBJECT URL (ADVANCED FIX)
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  useEffect(() => {
  
axios.get(`${API}/orders/all`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  }).then(res => setOrders(res.data));
}, []);
  useEffect(() => {
  const socket = io(BASE);

  socket.on("newOrder", (order) => {
    toast.success("🔥 New Order Received!");

    // 🔊 PLAY SOUND
    if (audioRef.current) {
      audioRef.current.play();
    }

    setOrders((prev) => [order, ...prev]);
  });

  return () => socket.disconnect();
}, []);
  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD FOOD
  const addFood = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      formData.append("image", imageFile);

      await axios.post(`${API}/food`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      toast.success("Food Added 🍔");

      resetForm();
      fetchFoods();
    } catch (err) {
      toast.error("Error adding food ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ UPDATE FOOD
  const updateFood = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios.put(
        `${API}/food/${editingId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      toast.success("Updated Successfully ✨");

      resetForm();
      fetchFoods();
    } catch (err) {
      toast.error("Update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ DELETE FOOD
  const deleteFood = async (id) => {
    try {
      await axios.delete(`${API}/food/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      toast.error("Deleted 🗑️");

      fetchFoods();
    } catch (err) {
      toast.error("Delete failed ❌");
    }
  };

  // ✅ EDIT CLICK
  const handleEdit = (food) => {
    setEditingId(food._id);
    setForm(food);
setPreview(`${BASE}${food.image}`)
  };

  // ✅ RESET FORM
  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      category: "",
      quantity: "",
      description: "",
      status: "in-stock",
    });
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  return (
    <div className="p-6 mt-20 text-white max-w-5xl mx-auto">
      <h1 className="text-3xl mb-6">👨‍🍳 Admin Panel</h1>
       
      {/* 🔥 FORM */}
      <div className="glass p-6 rounded-xl grid grid-cols-2 gap-4 mb-8">
        <input
          name="name"
          value={form.name || ""}
          onChange={handleChange}
          placeholder="Name"
          className="p-2 text-black"
        />

        <input
          name="price"
          value={form.price || ""}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 text-black"
        />

        <input
          name="category"
          value={form.category || ""}
          onChange={handleChange}
          placeholder="Category"
          className="p-2 text-black"
        />

        <input
          name="quantity"
          value={form.quantity || ""}
          onChange={handleChange}
          placeholder="Quantity"
          className="p-2 text-black"
        />

        <input
          name="description"
          value={form.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 text-black"
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 text-black"
        >
          <option value="in-stock">In Stock</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>

        {/* ✅ IMAGE PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="col-span-2 h-32 rounded-lg object-cover"
          />
        )}

        {/* ✅ FILE INPUT */}
        <input
          type="file"
          className="col-span-2 text-black"
          onChange={(e) => {
            const file = e.target.files[0];
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        {/* ✅ BUTTON */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={editingId ? updateFood : addFood}
          className="btn-primary col-span-2"
        >
          {loading
            ? "Processing..."
            : editingId
            ? "✏️ Update Food"
            : "➕ Add Food"}
        </motion.button>
      </div>
       <audio ref={audioRef} src="/notification.mp3" preload="auto" />
      {/* 🔥 FOOD LIST */}
      {foods.map((food) => (
        <motion.div
          key={food._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass p-4 mb-4 rounded flex justify-between items-center"
        >
          <div className="flex gap-4 items-center">
            <img
              src={`${BASE}${food.image}`}
              alt={food.name}
              className="h-16 w-16 object-cover rounded transition-transform duration-300 hover:scale-110"
            />

            <div>
              <h3>{food.name}</h3>
              <p>₹{food.price}</p>
            </div>
          </div>

          <div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleEdit(food)}
              className="bg-yellow-500 px-3 mr-2 rounded"
            >
              Edit
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => deleteFood(food._id)}
              className="bg-red-500 px-3 rounded"
            >
              Delete
            </motion.button>
          </div>
        </motion.div>
      ))}
   
    </div>
  );
}