import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
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
