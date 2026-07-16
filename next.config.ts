/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // এই '**' দেওয়ার কারণে যেকোনো ওয়েবসাইটের https লিংক কাজ করবে
      },
      {
        protocol: 'http',
        hostname: '**', // কোনো ইমেজ যদি http লিংকের হয়, সেটির জন্যও অনুমতি দেওয়া হলো
      },
    ],
  },
};

module.exports = nextConfig; // অথবা আপনার ফাইলে export default nextConfig থাকলে সেটাই রাখুন