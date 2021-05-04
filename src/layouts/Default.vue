<template>
    <div class="mt-20 font-sans bg-white">
        <custom-header/>
        <div class="relative z-10 mb-24 bg-white">
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
