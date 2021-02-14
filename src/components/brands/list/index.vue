<template>
    <div>
        <ul class="flex flex-wrap -mx-2
                   sm:-mx-2
                   md:-mx-4
                   lg:-mx-1
                   xl:-mx-4">
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
