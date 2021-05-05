<template>
    <div class="brand__wrapper">
        <ul class="brand__color__wrapper">
            <li v-for="color in brand.node.colors"
                :key="`${brand.node.path.replace(/\//g, '_')}${color}`"
                :style="{backgroundColor: `#${color}`}"
                class="brand__color smooth-transition">
                <code dir="ltr"
                      :class="isLight(color) ? 'text-black' : 'text-white'"
                      class="brand__color__code smooth-transition"
                      @click="copyToClipboard(color)">
                    {{ color }}
                </code>
            </li>
        </ul>
        <div class="px-3 py-3">
            <g-link :to="brand.node.path"
                    rel="bookmark"
                    class="link">
                <strong>
                    {{ brand.node.title }}
                </strong>
            </g-link>
        </div>
    </div>
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
.brand__wrapper {
    @apply px-4 pt-4 rounded-lg h-full bg-rb-violet-100;
}
.brand__color__wrapper {
    @apply flex -mt-8 overflow-hidden rounded-lg shadow-lg;
}
.brand__color {
    @apply flex-grow h-40 w-1 hover:w-20 overflow-hidden;
}
.brand__color__code {
    @apply h-full justify-center items-center text-lg font-bold uppercase px-4 cursor-pointer select-none hidden opacity-0 text-opacity-80;
    @apply hover:opacity-100;
}
.brand__color:hover .brand__color__code {
    display: flex;
}
</style>
