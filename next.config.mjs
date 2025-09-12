/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // ✅ Ignore ESLint errors during builds (Netlify/Vercel/etc.)
      ignoreDuringBuilds: true,
    },
    webpack: (config) => {
      config.resolve.fallback = {
        ...(config.resolve.fallback || {}),
        stackframe: false, // ⛔ tell Next.js to ignore "stackframe"
      };
      return config;
    },
  };
  
  export default nextConfig;
  