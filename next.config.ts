import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dutyxpert.com',
      },
      {
        protocol: 'https',
        hostname: 'chaiwatsst.wordpress.com',
      }
    ],
  },
};

export default nextConfig;
