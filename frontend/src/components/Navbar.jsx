import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  const navBtn =
    "px-4 py-2 rounded-lg hover:bg-white/20 transition cursor-pointer";

  return (
    <div className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50">
      
      {/* Top Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold text-white">
          🍔 CloudKitchen
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-4 items-center text-white">

          <Link to="/" className={navBtn}>Home</Link>

          {user && <Link to="/menu" className={navBtn}>Menu</Link>}

          {user && (
            <Link to="/cart" className={navBtn}>
              🛒 Cart
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

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-4 text-white bg-black/90">

          <Link to="/" className={navBtn} onClick={() => setOpen(false)}>Home</Link>

          {user && <Link to="/menu" className={navBtn} onClick={() => setOpen(false)}>Menu</Link>}

          {user && (
            <Link to="/cart" className={navBtn} onClick={() => setOpen(false)}>
              🛒 Cart
            </Link>
          )}

          {user && <Link to="/dashboard" className={navBtn} onClick={() => setOpen(false)}>Dashboard</Link>}
          {user?.isAdmin && <Link to="/admin" className={navBtn} onClick={() => setOpen(false)}>Admin</Link>}
          {user?.isAdmin && <Link to="/orders" className={navBtn} onClick={() => setOpen(false)}>Orders</Link>}

          {user ? (
            <>
              <span className="text-green-400">
                👤 {user.name}
              </span>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setOpen(false)}
            >
              Login
            </Link>
          )}

        </div>
      )}
    </div>
  );
}
