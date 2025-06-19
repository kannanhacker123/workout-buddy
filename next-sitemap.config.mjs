/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: 'https://workout-buddy-gray.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: [],

  // Forces known paths to be included manually
  additionalPaths: async () => {
    return [
      { loc: '/' },
      { loc: '/dashboard' },
      { loc: '/files' },
      { loc: '/forbidden' },
      { loc: '/gcp-ai' },
      { loc: '/goals' },
      { loc: '/settings' },
      { loc: '/workout-and-nutrition-information' },
      { loc: '/workout-buddy' },
      { loc: '/workouts' },
      // Optional: add one dynamic example
      { loc: '/workouts/1' },
    ].map((route) => ({
      ...route,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },

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
