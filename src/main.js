// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue';

const META_TAGS = [
    {
        name: 'charset',
        content: 'utf-8',
    },
];

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);

    // Add html attributes
    head.htmlAttrs = {
        lang: 'fa',
        dir: 'rtl',
    };
    // Add meta tags
    META_TAGS.forEach(tag => {
        head.meta.push(tag);
    });
};
