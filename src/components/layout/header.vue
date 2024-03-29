<template>
    <header>
        <div class="wrapper relative">
            <div class="flex-center">
                <div>
                    <g-link to="/" class="p-2 block">
                        <g-image id="logo" src="~/favicon.png" alt="RangerBrand" class="w-12 block rounded-full"/>
                    </g-link>
                </div>
                <nav class="hidden md:block">
                    <ul class="flex mx-4">
                        <li v-for="link in links" :key="link.name">
                            <g-link v-if="link.to"
                                    :to="link.to"
                                    :title="`مشاهده‌ی ${link.title}`"
                                    class="item link smooth-transition"
                                    active-class="item--active">
                                {{ link.title }}
                            </g-link>
                            <div v-else-if="link.children">
                                <dropdown type="unstyled" position="bottom">
                                    <template slot="title">
                                        <div class="item link smooth-transition">
                                            {{ link.title }}
                                        </div>
                                    </template>
                                    <ul>
                                        <li v-for="child in link.children" :key="child.name">
                                            <g-link v-if="!child.disabled"
                                                    :to="child.to"
                                                    :title="`مشاهده‌ی ${child.title}`"
                                                    class="item__child link smooth-transition">
                                                {{ child.title }}
                                            </g-link>
                                            <span v-else class="item__child disabled" :disabled="true">
                                                {{ child.title }}
                                            </span>
                                        </li>
                                    </ul>
                                </dropdown>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            <div v-if="device.isMobile" class="absolute top-0 left-0 bottom-0">
                <icon-burger class="h-16 w-16 p-5 block link fill-current"
                             @click="toggleMenuSidebar"/>
            </div>
        </div>
    </header>
</template>
<script>
import Dropdown from '~/components/general/dropdown';
import IconBurger from '~/assets/icons/burger.svg';

import { mapActions } from 'vuex';

export default {
    components: {
        Dropdown,
        IconBurger,
    },
    data: () => ({
        links: [
            {
                name: 'brands',
                to: '/brands/',
                title: 'برندها',
            },
            {
                name: 'colors',
                to: '/colors/',
                title: 'رنگ‌ها',
            },
            {
                name: 'brands',
                title: 'ابزارها',
                children: [
                    {
                        name: 'contrast-checker',
                        to: '/contrast-checker',
                        title: 'محاسبه‌ی کنتراست',
                    },
                    {
                        name: 'color-extractor',
                        to: '/color-extractor/',
                        title: 'استخراج رنگ از عکس',
                        disabled: true,
                    },
                ],
            },
            {
                name: 'about',
                to: '/about/',
                title: 'درباره‌ ما',
            },
        ],
    }),
    methods: {
        ...mapActions(['device', 'toggleMenuSidebar']),
    },
};
</script>

<style lang="postcss" scoped>
    header {
        @apply fixed z-50 top-0 right-0 left-0 bg-rb-violet-100 border-b border-gray-200;
    }
    .item {
        @apply px-4 py-5 block relative;
    }
    .item--active {
        @apply text-rb-violet-500;
    }
    .item--active:after {
        content: '';
        @apply absolute bottom-0 right-0 w-full h-1 bg-current rounded-full;
    }
    .item__child {
        @apply block px-4 py-2 cursor-pointer bg-white hover:bg-rb-violet-100 w-48;
    }
    .item__child.disabled {
        @apply opacity-50 cursor-not-allowed;
    }
</style>
