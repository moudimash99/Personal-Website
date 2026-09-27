/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizePackageImports: ['lucide-react', 'react-icons'] },
  async redirects() {
    return [{ source: '/projects', destination: '/career-ops', permanent: true }]
  },
};
export default nextConfig;
