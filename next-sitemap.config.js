/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://workout-buddy-gray.vercel.app', // change if needed
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
