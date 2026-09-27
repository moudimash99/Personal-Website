/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizePackageImports: ['lucide-react', 'react-icons'] },
  async redirects() {
    return [
      { source: '/projects', destination: '/experience', permanent: true },
      { source: '/career-ops', destination: '/experience', permanent: true },
    ]
  },
};
export default nextConfig;
