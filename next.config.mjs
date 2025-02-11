/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwhegzvqxelemiiyokmw.supabase.co",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
