<template>
    <div>
        {{ brandName }} به طور کلی از
        <template v-if="uniqueNames.length > 1">
            رنگ‌های
        </template>
        <template v-else>
            رنگ
        </template>
        {{ colorNames }} در هویت سازمانی خود استفاده می‌کند.
    </div>
</template>
<script>
import {
    nameColorGroup,
} from '~/scripts/utils/namer';

export default {
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
        brandName: {
            type: String,
            default: 'این برند',
        },
    },
    computed: {
        uniqueNames() {
            return this.colors.map(color => nameColorGroup(color).name_fa).filter((color, index, array) => array.indexOf(color) === index);
        },
        colorNames() {
            const listFormatter = 'ListFormat' in Intl ? new Intl.ListFormat('fa') : null;
            if (listFormatter) {
                return listFormatter.format(this.uniqueNames);
            } else {
                return this.uniqueNames.join(this.uniqueNames.length > 1 ? '، ' : '');
            }
        },
    },
    methods: {
        nameColorGroup,
    },
};
</script>
