import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      hmrRefreshes: true,
      fullUrl: true,
    },
  },

//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "www.worms.de",
//         port: "",
//         pathname: "/neu-de-wAssets/**",
//       },
//       {
//         protocol: "https",
//         hostname: "www.worms.de",
//         port: "",
//         pathname: "/tiergarten-wAssets/**",
//       },
//     ],
//   },
};

export default withNextIntl(nextConfig);
