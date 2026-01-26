// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',          // ← add this exact domain from your API
        port: '',
        pathname: '/images/**',           // optional: restrict to /images path
      },
      // Add any other domains your images come from (e.g. Cloudinary, AWS S3, etc.)
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',   // example if you use Cloudinary
      },
      // If your images come from your own backend
      {
        protocol: 'https',
        hostname: 'whorkaz.hordun.tech',
      },
    ],
  },
};

export default nextConfig;