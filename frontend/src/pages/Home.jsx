import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">

      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold"
      >
        Discover Amazing Food 🍔
      </motion.h1>

      <p className="mt-4 text-gray-300">
        Order from our kitchen
      </p>

      <Link to="/menu">
        <button className="btn-primary mt-6">
          Explore Menu
        </button>
      </Link>

    </div>
  );
}