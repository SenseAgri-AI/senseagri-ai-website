const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      [path.resolve(__dirname, "node_modules/@ignite-agent/agent/dist/operator/prose.js")]:
        path.resolve(__dirname, "lib/igniteProse.tsx")
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/flier",
        destination: "/automate-your-poultry-operation",
        permanent: true
      },
      {
        source: "/flier/:path*",
        destination: "/automate-your-poultry-operation",
        permanent: true
      },
      {
        source: "/w",
        destination: "/wiki",
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
