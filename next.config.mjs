/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
// output: 'export',

  // Uncomment and set basePath if deploying to GitHub Pages under a repo subpath
  // basePath: '/your-repo-name',
}

export default nextConfig
