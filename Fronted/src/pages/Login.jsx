import React, { useState } from "react";
import axios from "axios";
import {authActions} from "../store/auth"; // Corrected import path
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux"; // Corrected import from 'react-redux' to 'useDispatch'
export default function Login() {
  const [name, setName] = useState(""); // ✅ Fixed here
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3002/api/v1/sign-in", {
        name,
        password,
      });
      dispatch(authActions.login({
        token: res.data.token,  
        id: res.data.id,
        name: res.data.name,
      }));
      dispatch(authActions.changeRole(response.data.role)) ;// Dispatching login action with user data
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.id);
        navigate("/profile"); // Redirect to profile page after successful login
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <label className="block mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // ✅ Fixed setter
          className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4"
          required
        />

        <label className="block mb-2">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white mb-4 pr-12"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-2 right-2 text-sm text-blue-400 hover:underline focus:outline-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Login
        </button>

        {/* ✅ Added missing closing tag */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}
// This code defines a Login component that allows users to log in by providing their name and password.
// It uses React's useState hook to manage form state and axios to send a POST request  to the backend API for user authentication.
// Upon successful login, it stores the token and user ID in localStorage and redirects the user to the home page.
// If the login fails, it alerts the user with an error message.