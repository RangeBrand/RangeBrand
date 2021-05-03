<template>
    <div class="py-4 -mx-2 mt-4 border-t border-grey-300" dir="ltr">
        <Pager :info="info"
               next-label="‹"
               first-label="»"
               prev-label="›"
               last-label="«"
               class="flex-center flex-row-reverse"
               link-class="link"/>
    </div>
</template>
<script>
import { Pager } from 'gridsome';

export default {
    components: {
        Pager,
    },
    props: {
        info: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>
<style scoped>
    .flex-center {
        @apply flex flex-wrap justify-center items-center;
    }

    .link {
        @apply w-12 h-12 mx-2 flex-center rounded-full text-black text-opacity-80 border border-transparent;
        @apply hover:border-rb-violet-500;
        @apply transition duration-500 ease-in-out;
    }
    .link.active {
        @apply bg-rb-violet-500 text-white;
    }
</style>
