<template>
    <Layout>
        <div class="h-screen -mt-20 pt-16">
            <color-banner :colors="colors" @update="updateQuery"/>
        </div>
    </Layout>
</template>
<script>
import ColorBanner from '~/components/colors/banner';

import { validateHex } from '~/scripts/utils/validator';
import RandomColorMixin from '~/scripts/mixins/randomColor';

export default {
    components: {
        ColorBanner,
    },
    mixins: [
        RandomColorMixin,
    ],
    computed: {
        colors() {
            try {
                return this.$route.query.colors.split('-').filter((item, index, array) => {
                    return validateHex(item) && array.indexOf(item) === index;
                });
            } catch {
                return [];
            }
        },
    },
    methods: {
        async updateQuery(value) {
            if (!value.length) {
                value = await this.getRandomColor();
            }
            const newColors = value.join('-');
            if (newColors !== this.$route.query.colors) {
                this.$router.push({
                    path: '/palette',
                    query: {
                        colors: value.join('-'),
                    },
                });
            }
        },
    },
};
</script>
