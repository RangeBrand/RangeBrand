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
                            <g-link :to="link.to"
                                    class="item link smooth-transition"
                                    active-class="item--active">
                                {{ link.title }}
                            </g-link>
                        </li>
                    </ul>
                </nav>
            </div>
            <!-- <div class="absolute top-0 left-0 bottom-0">
                <icon-burger class="h-16 w-16 p-5 block link fill-current"
                             @click="toggleSidebar"/>
            </div> -->
        </div>
    </header>
</template>
<script>
import { mapActions } from 'vuex';

// import IconBurger from '~/assets/icons/burger.svg';

export default {
    // components: {
    //     IconBurger,
    // },
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
                name: 'about',
                to: '/about/',
                title: 'درباره‌ ما',
            },
        ],
    }),
    methods: {
        ...mapActions(['toggleSidebar']),
    },
};
</script>

<style scoped>
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
</style>
