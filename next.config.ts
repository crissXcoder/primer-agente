import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/_diseno",
        destination: "/diseno",
      },
    ];
  },
};

export default nextConfig;
