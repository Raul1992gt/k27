/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// Only apply basePath/assetPrefix when explicitly provided (e.g., GitHub Pages)
const repoBasePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

const nextConfig = {
  // Required for GitHub Pages static hosting
  output: 'export',
  trailingSlash: true,
  basePath: repoBasePath || undefined,
  assetPrefix: repoBasePath ? `${repoBasePath}/` : undefined,
  images: {
    // GitHub Pages has no Image Optimization server. Use static images.
    unoptimized: true,
    domains: ['localhost'],
  },
}

module.exports = nextConfig
