/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // ✅ Ignore ESLint errors during builds
      ignoreDuringBuilds: true,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        stackframe: false, // ⛔ ignore "stackframe" if some dependency requires it
      };
      return config;
    },
    experimental: {
      esmExternals: false, // ⚡ Prevents issues with complex JS modules and regex during SSR
    },
  };
  
  export default nextConfig;
  