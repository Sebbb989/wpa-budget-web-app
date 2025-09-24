import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = withPWA({
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  // server: {
  //   port: 80,
  //   host: "0.0.0.0",
  // }
});

export default nextConfig;
