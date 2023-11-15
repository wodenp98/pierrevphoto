/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com", "lh3.googleusercontent.com"],
  },
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
// });
// module.exports = withBundleAnalyzer(nextConfig);
