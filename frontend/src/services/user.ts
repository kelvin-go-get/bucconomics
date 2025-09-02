"use client";

export interface User {
  id: string;
  fullName: string;
  email: string;
  walletAddress?: string;
  isProfileComplete?: boolean;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

// Helper function to safely get token
const getToken = (): string => {
  if (typeof window === "undefined") {
    throw new Error("No auth token - running on server");
  }

  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token");
  return token;
};

export const getProfile = async (id: string): Promise<User> => {
  const token = getToken();

  const res = await fetch(`${API_URL}/profile/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const updateProfile = async (data: {
  id: string;
  fullName: string;
  walletAddress: string;
}): Promise<User> => {
  const token = getToken();

  const res = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};
