<template>
    <div class="font-sans bg-white">
        <custom-header/>
        <div class="relative min-h-screen pt-20 z-10 mb-24 bg-white border-b border-gray-200">
            <slot/>
        </div>
        <custom-footer/>
    </div>
</template>
<script>
import CustomHeader from '~/components/layout/header';
import CustomFooter from '~/components/layout/footer';

export default {
    components: {
        CustomHeader,
        CustomFooter,
    },
};
</script>
