/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push('pino-pretty', 'encoding' /* add any other modules that might be causing the error */);
        return config;
    },
};

export default nextConfig;
