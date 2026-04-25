import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/menu";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Login from "./pages/login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Layout from "./components/Layout";
import { useContext } from "react";
import { CartContext } from "./context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function FloatingCart() {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) return null;

  return (
    <motion.div
      onClick={() => navigate("/cart")}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 px-5 py-3 rounded-full cursor-pointer
           bg-gradient-to-r from-pink-500/80 to-orange-500/80
           shadow-[0_0_20px_rgba(255,100,100,0.5)]
           text-white flex items-center gap-2"
    >
      <span className="text-lg">🛒</span>
      <span className="font-medium">{cart.length} items</span>
    </motion.div>
  );
}
function App() {
  return (
    <BrowserRouter>
      <Navbar />

      {/* ✅ ONLY ONE LAYOUT */}
      <Layout>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
           <Route path="/orders" element={  <ProtectedRoute><Orders /> </ProtectedRoute>  } />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Admin />
              </AdminRoute>
            }
          />
        </Routes>
      </Layout>

      {/* Floating Cart */}
      <FloatingCart />
    </BrowserRouter>
  );
}

export default App;
