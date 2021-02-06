<template>
    <li>
        <g-link :to="brand.node.path" rel="bookmark">
            <strong>
                {{ brand.node.title }}
            </strong>
        </g-link>
        <ul>
            <li v-for="color in brand.node.colors" :key="color">
                <code dir="ltr" :style="{backgroundColor: `#${color}`}">
                    #{{ color }}
                </code>
            </li>
        </ul>
    </li>
</template>
<script>
export default {
    props: {
        brand: {
            type: Object,
            default: () => ({}),
            require: true,
        },
    },
};
</script>
