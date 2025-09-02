"use client";

import { useState } from "react";
import { User, updateProfile } from "@/services/user";

interface Props {
  user: User;
  onComplete: (user: User) => void;
}

export default function CompleteProfile({ user, onComplete }: Props) {
  const [fullName, setFullName] = useState(user.fullName || "");
  const [walletAddress, setWalletAddress] = useState(user.walletAddress || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!fullName || !walletAddress) return alert("All fields are required");
    setLoading(true);
    try {
      const updated = await updateProfile({
        fullName,
        walletAddress,
        id: "",
      });
      alert("Profile completed successfully!");
      onComplete(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl animate-fadeIn">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {loading ? "Saving..." : "Complete Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}
