<template>
    <div>
        <ul>
            <li v-for="color in colors"
                :key="color.id">
                <color-item :color="color"/>
            </li>
        </ul>
        <slot/>
    </div>
</template>
<script>
import ColorItem from '~/components/colors/list/item';

export default {
    components: {
        ColorItem,
    },
    props: {
        colors: {
            type: Array,
            default: () => ([]),
            required: true,
        },
    },
};
</script>
<style scoped>
    ul {
        @apply flex flex-wrap -mx-2;
        @apply sm:-mx-2;
        @apply md:-mx-4;
        @apply lg:-mx-1;
        @apply xl:-mx-4;
    }
    li {
        @apply my-2 px-2 pt-4 w-full;
        @apply sm:my-2 sm:px-2 sm:w-1/2;
        @apply md:my-4 md:px-4 md:w-1/2;
        @apply lg:my-1 lg:px-1 lg:w-1/3;
        @apply xl:my-2 xl:px-2 xl:w-1/5;
    }
</style>
