/* eslint-disable @typescript-eslint/no-var-requires */
const withPlugins = require('next-compose-plugins');
const bundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextTranslate = require('next-translate');

const nextConfig = {
  // Temporary set to `false` to disable mismatch `id` error caused by Radix UI
  reactStrictMode: false,
  webpack: (config) => {
    // Unset client-side javascript that only works server-side
    config.resolve.fallback = { fs: false, module: false };

    return config;
  },
};

module.exports = withPlugins([bundleAnalyzer], nextTranslate(nextConfig));
