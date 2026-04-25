import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AuthContext);
  const submit = async () => {
    try {
      const { data } = await axios.post("/auth/login", {
        email,
        password
      });
      console.log(import.meta.env.VITE_API_URL);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);

      window.location.href = "/menu";
    } catch (err) {
    console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl mb-4">Login</h1>

      <input
        placeholder="Email"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setPassword(e.target.value)}
      />
       
      <button onClick={submit} className="btn-primary">
        Login
      </button>

      <p className="mt-4">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}