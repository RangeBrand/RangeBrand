<template>
    <ul>
        <li v-for="brand in brands" :key="brand.node.id">
            <g-link :to="brand.node.path" rel="bookmark">
                <strong>
                    {{ brand.node.title }}
                </strong>
                <ul>
                    <li v-for="color in brand.node.colors" :key="color">
                        <code dir="ltr" :style="{backgroundColor: `#${color}`}">
                            #{{ color }}
                        </code>
                    </li>
                </ul>
            </g-link>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        brands: {
            type: Array,
            default: () => ([]),
            required: true,
        },
    },
};
</script>
