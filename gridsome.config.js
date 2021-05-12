// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    chainWebpack: config => {
        const svgRule = config.module.rule('svg');
        svgRule.uses.clear();
        svgRule
            .use('vue-svg-loader')
            .loader('vue-svg-loader');
    },
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
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Colors',
                path: 'data/colors/*.json',
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
        {
            use: 'gridsome-plugin-device-detector-js',
        },
    ],
    templates: {
        Brand: '/brands/:path',
    },
    siteUrl: 'https://rangebrand.ir',
};
