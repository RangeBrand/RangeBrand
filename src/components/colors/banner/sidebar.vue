<template>
    <div :class="[
        'sidebar smooth-transition',
        colorSidebarIsOpen ? 'left-0' : '-left-72'
    ]">
        <div v-show="colorSidebarContent === 'favorites'" class="h-full">
            <div class="text-center">
                <span class="text-bold text-rb-violet-500 border-b-2 border-current p-3 inline-block">
                    رنگ‌های مورد علاقه من
                </span>
            </div>
            <div class="h-full pb-12">
                <favorite-colors/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import FavoriteColors from '~/components/colors/banner/favorites';

export default {
    components: {
        FavoriteColors,
    },
    computed: {
        ...mapState(['colorSidebarIsOpen', 'colorSidebarContent']),
    },
};
</script>
<style scoped>
.sidebar {
    @apply fixed top-0 pt-20 w-72 h-screen z-50 bg-rb-violet-100 border-r shadow-xl border-gray-200;
}
</style>
