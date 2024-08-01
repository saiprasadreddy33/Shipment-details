/**  @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
      serverActions: true,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        child_process: false, 
        fs: false,
      };
      return config;
    },
  };
  
  module.exports = nextConfig;