import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 78] },
};

export default config;
