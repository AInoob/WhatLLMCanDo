/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  images: {
    loader: 'custom',
    loaderFile: './image-loader.js',
    unoptimized: true,
  },
}

module.exports = nextConfig
