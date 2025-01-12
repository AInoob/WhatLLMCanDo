/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable server-side features for static export
  experimental: {
    appDir: false,
  },
  // Ensure proper handling of client-side navigation
  trailingSlash: true,
  // Optimize for static hosting
  compress: true,
}

module.exports = nextConfig
