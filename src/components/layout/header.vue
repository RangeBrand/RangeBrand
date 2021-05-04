<template>
    <header>
        <div class="container mx-auto">
            <div class="flex-center">
                <div>
                    <g-link to="/" class="p-2 block">
                        <g-image src="~/favicon.png" class="w-12 block"/>
                    </g-link>
                </div>
                <nav>
                    <ul class="flex mx-4">
                        <li v-for="link in links" :key="link.name">
                            <g-link :to="link.to"
                                    class="link smooth-transition"
                                    active-class="link--active">
                                {{ link.title }}
                            </g-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>
<script>
export default {
    data: () => ({
        links: [
            {
                name: 'brands',
                to: '/brands/',
                title: 'برندها',
            },
            {
                name: 'about',
                to: '/about/',
                title: 'درباره‌ ما',
            },
        ],
    }),
};
</script>

<style scoped>
    header {
        @apply fixed z-50 top-0 right-0 left-0 bg-rb-violet-100 border-b border-gray-200;
    }
    .link {
        @apply px-4 py-5 block relative;
    }
    .link--active {
        @apply text-rb-violet-500;
    }
    .link--active:after {
        content: '';
        @apply absolute bottom-0 right-0 w-full h-1 bg-current rounded-full;
    }
</style>
