/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cwhegzvqxelemiiyokmw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
