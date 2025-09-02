"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Check your email for reset link 📩");
      } else {
        toast.error(data.error || "Something went wrong ❌");
      }
    } catch {
      toast.error("Server not reachable ⚠️");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="max-w-md w-full p-6 bg-white/10 rounded-xl shadow-lg">
        <h2 className="text-2xl text-white font-bold text-center mb-4">
          Forgot Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 rounded-lg text-white"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
