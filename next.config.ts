
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Portfolio1",
  assetPrefix: "/Portfolio1/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;