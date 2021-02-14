<template>
    <li class="my-2 px-2 pt-4 w-full item
               sm:my-2 sm:px-2 sm:w-1/2
               md:my-4 md:px-4 md:w-1/2
               lg:my-1 lg:px-1 lg:w-1/3
               xl:my-2 xl:px-2 xl:w-1/5">
        <div class="px-4 pt-4 rounded-lg h-full bg-rb-violet-100 border border-rb-violet-200">
            <ul class="flex -mt-8 overflow-hidden rounded-lg shadow-lg">
                <li v-for="color in brand.node.colors"
                    :key="color"
                    :style="{backgroundColor: `#${color}`}"
                    class="item-color flex-1 flex-grow h-40">
                    <code dir="ltr"
                          class="h-full justify-center items-center hidden text-lg px-4">
                        {{ color.toUpperCase() }}
                    </code>
                </li>
            </ul>
            <div class="px-5 py-3">
                <!-- <g-link :to="brand.node.path"
                        rel="bookmark"
                        class="text-rb-violet-900 hover:text-rb-carnelian-500">
                    <strong>
                        {{ brand.node.title }}
                    </strong>
                </g-link> -->
                <span class="text-rb-violet-900">
                    <strong>
                        {{ brand.node.title }}
                    </strong>
                </span>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props: {
        brand: {
            type: Object,
            default: () => ({}),
            require: true,
        },
    },
};
</script>
<style scoped>
.item-color:hover code {
    display: flex;
}
</style>
