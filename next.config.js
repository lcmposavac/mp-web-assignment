/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_ENDPOINT: process.env.API_ENDPOINT || "http://localhost:8000/",
    NODE_ENV: process.env.NODE_ENV || "development",
    USE_TEXT_QUERY: process.env.USE_TEXT_QUERY || "false",
    FORCE_HOST: process.env.FORCE_HOST || null,
    USE_REMOTE_SERVER_FOR_DEV:
      process.env.USE_REMOTE_SERVER_FOR_DEV === "true" || false,
  },
  experimental: {
    largePageDataBytes: 1024 * 1000,
  },
};

module.exports = nextConfig;
