import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/signup",
        permanent: true,
      },
      {
        source: "/checkout",
        destination: "/cart",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
