<template>
    <nav v-if="device.isMobile"
         :class="[
             'smooth-transition',
             menuSidebarIsOpen ? 'left-0' : '-left-72'
         ]">
        <ul>
            <li v-for="link in links" :key="link.name">
                <g-link :to="link.to"
                        class="item link smooth-transition"
                        active-class="item--active">
                    {{ link.title }}
                </g-link>
            </li>
        </ul>
    </nav>
</template>
<script>
import { mapState } from 'vuex';

export default {
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
    computed: {
        ...mapState([
            'device',
            'menuSidebarIsOpen',
        ]),
    },
};
</script>
<style scoped>
nav {
    @apply fixed top-0 pt-20 w-72 h-screen z-50 bg-rb-violet-100 border-r shadow-xl border-gray-200;
}
.item {
    @apply px-4 py-5 block relative;
}
.item--active {
    @apply text-rb-violet-500;
}
.item--active:after {
    content: '';
    @apply absolute top-0 right-0 h-full w-1 bg-current rounded-full;
}
</style>
