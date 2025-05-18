/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Changed to false to avoid double-rendering in development
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
