<template>
    <div class="list">
        <ul class="h-full overflow-y-scroll p-4">
            <li class="list__item">
                <span class="text-lg">
                    Hue
                </span>
                <input-number v-model="adjustment.hue"
                              :min="-180"
                              :max="180"/>
            </li>
            <li class="list__item">
                <span class="text-lg">
                    Saturation
                </span>
                <input-number v-model="adjustment.sat"
                              :min="-100"
                              :max="100"/>
            </li>
            <li class="list__item">
                <span class="text-lg">
                    Brightness
                </span>
                <input-number v-model="adjustment.lum"
                              :min="-100"
                              :max="100"/>
            </li>
        </ul>
        <div class="absolute h-18 bottom-0 right-0 left-0 text-center pb-4">
            <button class="button inline-block mx-1"
                    @click="applyColors">
                اعمال
            </button>
            <button class="link inline- p-2 mx-1"
                    @click="closeColorSidebar">
                بیخیال
            </button>
        </div>
    </div>
</template>
<script>
import InputNumber from '~/components/general/input/number';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        InputNumber,
    },
    data: () => ({
        adjustment: {
            hue: 0,
        },
    }),
    computed: {
        ...mapState(['colorAdjustment']),
    },
    watch: {
        adjustment: {
            handler(value) {
                this.setColorAdjustment(value);
            },
            deep: true,
        },
    },
    beforeMount() {
        this.adjustment = { ...this.colorAdjustment };
    },
    methods: {
        ...mapActions(['closeColorSidebar']),
        ...mapMutations(['setColorAdjustment']),
        applyColors() {
            this.$emit('change');
        },
    },
};
</script>
<style scoped>
.list {
    @apply pb-20 px-2 h-full relative;
}
.list__item {
    @apply text-black text-opacity-80 border-b justify-center p-4 text-center;
}
.list__item:last-of-type {
    @apply border-none
}
</style>
