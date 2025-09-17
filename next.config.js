/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for GitHub Pages static hosting
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig
