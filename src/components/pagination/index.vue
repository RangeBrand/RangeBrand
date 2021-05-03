<template>
    <div class="pagination" dir="ltr">
        <Pager :info="info"
               next-label="‹"
               first-label="»"
               prev-label="›"
               last-label="«"
               class="flex-center justify-center flex-row-reverse"
               link-class="link smooth-transition flex-center justify-center"/>
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
    .pagination {
        @apply py-4 -mx-2 mt-4 border-t border-gray-200
    }
    .link {
        @apply w-12 h-12 mx-2 rounded-full text-black text-opacity-80 border border-transparent;
        @apply hover:border-rb-violet-500;
    }
    .link.active {
        @apply bg-rb-violet-500 text-white;
    }
</style>
