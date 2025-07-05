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
    try {
      await axios.post("http://localhost:3002/api/v1/sign-up", user);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form onSubmit={handleSignup} className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        <label className="block mb-2">Address</label>
        <textarea
          value={user.address}
          onChange={(e) => setUser({ ...user, address: e.target.value })}
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-6 resize-none"
          rows="3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
// This code defines a Signup component that allows users to register by providing their name, email, password, and address.
// It uses React's useState hook to manage form state and axios to send a POST request to the backend API for user registration.
// Upon successful signup, it alerts the user and redirects them to the login page.