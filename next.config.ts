import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
    output: "export",
    images: { unoptimized: true },
    basePath: isProd ? "/resume-portfolio" : "",
    assetPrefix: isProd ? "/resume-portfolio/" : "",
    env: {
        NEXT_PUBLIC_BASE_PATH: isProd ? "/resume-portfolio" : "",
    },
};

export default nextConfig;
