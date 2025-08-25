"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful 🎉");
        window.location.href = "/";
      } else {
        toast.error(data.error || "Login failed ❌");
      }
    } catch {
      toast.error("Server not reachable ⚠️");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 glass-shimmer">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 rounded-xl bg-white/10 text-white border border-white/20"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
        <p className="text-gray-400 text-sm text-center mt-2">
          <Link
            href="/forgot-password"
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  );
}
