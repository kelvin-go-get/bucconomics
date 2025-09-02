import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.dicebear.com", "ui-avatars.com"], // Allow DiceBear avatars
  },
};

export default nextConfig;
