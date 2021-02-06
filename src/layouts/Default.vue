<template>
    <div class="overflow-x-hidden font-sans">
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
