/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'encoding', 'punycode' /* add any other modules that might be causing the error */);
    return config;
  },
  images: {
    remotePatterns: [{
      hostname: 'pub-5c55b2125d664adeb65758deb38eb4cb.r2.dev'
    }],
  },
  reactStrictMode: false,
  exclude: ['contracts'],
};

export default nextConfig;
