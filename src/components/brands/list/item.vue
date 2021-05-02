<template>
    <li class="my-2 px-2 pt-4 w-full item
               sm:my-2 sm:px-2 sm:w-1/2
               md:my-4 md:px-4 md:w-1/2
               lg:my-1 lg:px-1 lg:w-1/3
               xl:my-2 xl:px-2 xl:w-1/5">
        <div class="px-4 pt-4 rounded-lg h-full bg-rb-violet-100">
            <ul class="flex -mt-8 overflow-hidden rounded-lg shadow-lg">
                <li v-for="color in brand.node.colors"
                    :key="`${brand.node.path.replace(/\//g, '_')}${color}`"
                    :style="{backgroundColor: `#${color}`}"
                    class="item-color flex-grow h-40 w-1 transition-all duration-300 ease-in-out hover:w-20 overflow-hidden">
                    <code dir="ltr"
                          :class="isLight(color) ? 'text-black' : 'text-white'"
                          class="h-full justify-center items-center text-lg font-bold px-4 cursor-pointer select-none hidden opacity-0 text-opacity-80 uppercase hover:opacity-100 transition duration-500 ease-in-out"
                          @click="copyToClipboard(color)">
                        {{ color }}
                    </code>
                </li>
            </ul>
            <div class="px-3 py-3">
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
import { isLight } from '~/scripts/luminance';

export default {
    props: {
        brand: {
            type: Object,
            default: () => ({}),
            require: true,
        },
    },
    methods: {
        isLight,
        copyToClipboard(color) {
            navigator.clipboard.writeText(`#${color.toUpperCase()}`).then(() => {
                this.$toasted.show('کپی شد!');
            }, (err) => {
                console.error('Could not copy text: ', err);
            });
        },
    },
};
</script>
<style scoped>
.item-color:hover code {
    display: flex;
}
</style>
