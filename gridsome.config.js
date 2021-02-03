// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'RangeBrand',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'data/brands/*.json',
        typeName: 'Brand',
      }
    },
    {
      use: "gridsome-plugin-tailwindcss",
    },
  ],
  templates: {
    Brand: '/brands/:path',
  },
}
