<template>
    <div class="mt-20 font-sans">
        <custom-header/>
        <slot/>
    </div>
</template>
<script>
import CustomHeader from '~/components/layout/header';

export default {
    components: {
        CustomHeader,
    },
};
</script>
