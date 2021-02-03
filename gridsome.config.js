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
    ],
    templates: {
        Brand: '/brands/:path',
    },
};
