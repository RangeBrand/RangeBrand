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

export default {
    components: {
        ColorBanner,
    },
    computed: {
        colors() {
            try {
                return this.$route.params.id.split('-').filter((item, index, array) => {
                    return validateHex(item) && array.indexOf(item) === index;
                });
            } catch {
                return [];
            }
        },
    },
    methods: {
        updateQuery(value) {
            const newColors = value.join('-');
            if (newColors !== this.$route.params.id) {
                this.$router.replace({
                    name: '__colors_id',
                    params: {
                        id: value.join('-'),
                    },
                });
            }
        },
    },
};
</script>
