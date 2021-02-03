<template>
    <div>
        <ul>
            <brand-item v-for="brand in brands"
                        :key="brand.node.id"
                        :brand="brand"/>
        </ul>
        <slot/>
    </div>
</template>
<script>
import BrandItem from '~/components/brands/list/item';

export default {
    components: {
        BrandItem,
    },
    props: {
        brands: {
            type: Array,
            default: () => ([]),
            required: true,
        },
    },
};
</script>
