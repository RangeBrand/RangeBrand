<template>
    <ul class="flex h-full">
        <li v-for="color in colors"
            :key="color"
            class="flex-grow">
            <div class="brand__color"
                 :class="isLight(color) ? 'brand__color--light' : 'brand__color--dark'"
                 :style="{backgroundColor: `#${color}`}">
                <code
                    class="brand__color__code smooth-transition"
                    dir="ltr">
                    {{ color }}
                </code>
            </div>
        </li>
    </ul>
</template>
<script>
import { isLight } from '~/scripts/luminance';

export default {
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
    },
    methods: {
        isLight,
    },
};
</script>
<style scoped>
.brand__color {
    @apply relative block w-full h-full;
}
.brand__color--dark .brand__color__code {
    @apply text-white text-opacity-80;
}
.brand__color--light .brand__color__code {
    @apply text-black text-opacity-80;
}
.brand__color__code {
    @apply absolute bottom-0 right-0 left-0 text-center p-3 font-semibold uppercase;
}
</style>
