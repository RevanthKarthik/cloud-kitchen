import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({});

  const submit = async () => {
    try {
      await axios.post("/auth/register", form);
      alert("Registered successfully");
      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl mb-4">Register</h1>

      <input
        placeholder="Name"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        placeholder="Email"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        className="block mb-2 p-2 text-black"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={submit} className="btn-primary">
        Register
      </button>

      <p className="mt-4">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}