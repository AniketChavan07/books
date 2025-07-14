import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Optional client-side validation
    if (user.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      console.log("Sending user data:", user); // Debug log
      const res = await axios.post("https://bookclub-3msp.onrender.com/api/v1/sign-up", user);

      if (res.status === 200 || res.status === 201) {
        alert("Signup successful. Please login.");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form onSubmit={handleSignup} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Name Field */}
        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        {/* Email Field */}
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        {/* Password Field */}
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        {/* Address Field */}
        <label className="block mb-2">Address</label>
        <textarea
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-6 resize-none"
          rows="3"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Sign Up
        </button>

        {/* Redirect to login */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
