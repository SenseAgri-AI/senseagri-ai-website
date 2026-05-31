/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `allowedDevOrigins` was added in Next 15; this project is on 14.2.3 where
  // it isn't recognised and emits an invalid-config warning.
};

module.exports = nextConfig;
