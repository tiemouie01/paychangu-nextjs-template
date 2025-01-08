import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    CHECKOUT_URL: process.env.CHECKOUT_URL,
  },
};

export default nextConfig;
