// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'رنگ برند',
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Brand',
                path: 'data/brands/*.json',
            },
        },
        {
            use: 'gridsome-plugin-tailwindcss',
        },
        {
            use: 'gridsome-plugin-flexsearch',
            options: {
                searchFields: [
                    'title',
                ],
                collections: [{
                    typeName: 'Brand',
                    fields: [
                        'id',
                        'title',
                        'colors',
                        'path',
                    ],
                }],
                flexsearch: {
                    encode: false,
                    rtl: true,
                    split: /\s+/,
                    tokenize: 'forward',
                },
            },
        },
        {
            use: 'gridsome-plugin-vue-toasted',
            options: {
                position: 'bottom-right',
                duration: 2000,
            },
        },
    ],
    templates: {
        Brand: '/brands/:path',
    },
    siteUrl: 'https://rangebrand.ir',
};
