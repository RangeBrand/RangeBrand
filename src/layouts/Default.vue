<template>
    <div class="font-sans bg-white">
        <custom-header/>
        <div class="relative min-h-screen pt-20 z-10 mb-24 bg-white border-b border-gray-200">
            <!-- <custom-sidebar/> -->
            <slot/>
        </div>
        <custom-footer/>
    </div>
</template>
<script>
import CustomHeader from '~/components/layout/header';
import CustomFooter from '~/components/layout/footer';
// import CustomSidebar from '~/components/layout/sidebar';

export default {
    components: {
        CustomHeader,
        CustomFooter,
        // CustomSidebar,
    },
    mounted() {
        this.$store.dispatch('checkDevice');
    },
};
</script>
