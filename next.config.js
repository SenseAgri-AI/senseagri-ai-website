/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // `allowedDevOrigins` was added in Next 15; this project is on 14.2.3 where
  // it isn't recognised and emits an invalid-config warning.
  async redirects() {
    return [
      // Old flier URL — kept in case anyone grabbed the link before the SEO-friendly slug landed
      {
        source: "/flier",
        destination: "/automate-your-poultry-operation",
        permanent: true
      },
      {
        source: "/flier/:path*",
        destination: "/automate-your-poultry-operation",
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
