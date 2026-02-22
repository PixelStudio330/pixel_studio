import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⚡ ignore all ESLint errors on Vercel build
  },
};

export default nextConfig;