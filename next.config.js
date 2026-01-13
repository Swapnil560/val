/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/src/app',
      },
      {
        source: '/((?!api|_next|static|favicon.ico).*)',
        destination: '/src/app/$1',
      },
    ];
  },
}

module.exports = nextConfig