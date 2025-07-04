import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
     domains: ['d2l1qb2xg9gi7w.cloudfront.net'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/redirectRoute",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
