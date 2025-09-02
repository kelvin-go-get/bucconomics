"use client";

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/auth";

export const signup = async (data: SignupData) => {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
    }),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Signup failed");

  localStorage.setItem("token", result.token);
  localStorage.setItem("user", JSON.stringify(result.user)); // store user
  return result;
};

export const login = async (data: LoginData) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (!res.ok) throw new Error(result.message || "Login failed");

  localStorage.setItem("token", result.token);
  localStorage.setItem("user", JSON.stringify(result.user)); // store user
  return result;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

export const getUser = (): User | null => {
  const user = localStorage.getItem("user");
  console.log("user from localStorage:", user);
  return user ? JSON.parse(user) : null;
};
