import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    define: {
      "@/": "/src",
    },
  }
};

export default nextConfig;
