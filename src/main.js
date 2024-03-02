// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import Vuex from 'vuex';
import store from '~/store';

import DefaultLayout from '~/layouts/Default.vue';
import '~/assets/style/index.css';

import VuePrism from 'vue-prism';
import '~/assets/style/prism-vs.css';

const META_TAGS = [
    {
        name: 'charset',
        content: 'utf-8',
    },
];
const LINKS = [
    {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v27.2.0/dist/font-face.css',
    },
];
const SCRIPTS = [
    {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-19G4QQ6K4Z',
        body: true,
        async: true,
    },
    {
        innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-19G4QQ6K4Z');
        `,
        body: true,
    },
];

const HEAD = [
    {
        key: 'meta',
        items: META_TAGS,
    },
    {
        key: 'link',
        items: LINKS,
    },
    {
        key: 'script',
        items: SCRIPTS,
    },
];

export default function (Vue, { router, head, isClient, appOptions }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout);

    // Add html attributes
    head.htmlAttrs = {
        lang: 'fa',
        dir: 'rtl',
    };
    // Add tags to head
    HEAD.forEach(type => {
        type.items.forEach(tag => {
            head[type.key].push(tag);
        });
    });

    // Create Store
    Vue.use(Vuex);
    appOptions.store = new Vuex.Store(store);

    Vue.use(VuePrism);
};
