
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const navBtn =
    "px-4 py-2 rounded-lg hover:bg-white/20 transition cursor-pointer";

  return (
    <div className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-bold text-white">
          🍔 CloudKitchen
        </h1>

        <div className="flex gap-4 items-center text-white">

          <Link to="/" className={navBtn}>Home</Link>

          {user && <Link to="/menu" className={navBtn}>Menu</Link>}

          {/* 🔥 IMPORTANT CHANGE HERE */}
          {user && (
            <Link to="/cart" className={navBtn}>
              <span id="cart-icon">🛒 Cart</span>
            </Link>
          )}

          {user && <Link to="/dashboard" className={navBtn}>Dashboard</Link>}
          {user?.isAdmin && <Link to="/admin" className={navBtn}>Admin</Link>}
          {user?.isAdmin && <Link to="/orders" className={navBtn}>Orders</Link>}

          {user ? (
            <>
              <span className="text-green-400">
                👤 {user.name}
              </span>

              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </div>
  );
}