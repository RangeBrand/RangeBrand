<template>
    <header class="fixed z-50 top-0 right-0 left-0 bg-rb-violet-100 border-b border-grey-300">
        <div class="container mx-auto">
            <div class="flex items-center">
                <div>
                    <g-link to="/" class="p-2 block">
                        <g-image src="~/favicon.png" class="w-12 block"/>
                    </g-link>
                </div>
                <nav>
                    <ul class="flex mx-4">
                        <li v-for="link in links" :key="link.name">
                            <g-link :to="link.to"
                                    class="p-4 block border-b-4 border-rb-violet-100 -mb-1 transition-all duration-300 ease-in-out hover:text-rb-carnelian-500 hover:border-rb-carnelian-500"
                                    active-class="text-rb-violet-500 border-rb-violet-500">
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
