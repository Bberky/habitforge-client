/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: [
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
};

module.exports = nextConfig;
