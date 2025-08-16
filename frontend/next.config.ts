import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true, // Disables all image optimizations globally
  },
};

export default nextConfig;
