/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://workout-buddy-gray.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [], // Leave empty to include all routes
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};

export default config;
