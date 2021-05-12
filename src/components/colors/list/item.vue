<template>
    <div class="item__wrapper">
        <ul class="item__color__wrapper">
            <li v-for="hex in color.colors"
                :key="hex"
                :style="{backgroundColor: `#${hex}`}"
                class="item__color smooth-transition">
                <code dir="ltr"
                      :class="isLight(hex) ? 'text-black' : 'text-white'"
                      class="item__color__code smooth-transition"
                      @click="onColorClick(hex)">
                    {{ hex }}
                </code>
            </li>
        </ul>
        <div class="px-3 py-3">
            <g-link :to="palettePath"
                    rel="bookmark"
                    class="link">
                <strong>
                    مشاهده
                </strong>
            </g-link>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { isLight } from '~/scripts/utils/luminance';
import ClipboardMixin from '~/scripts/mixins/clipboard';

export default {
    mixins: [
        ClipboardMixin,
    ],
    props: {
        color: {
            type: Object,
            default: () => ({}),
            require: true,
        },
    },
    computed: {
        ...mapState(['device']),
        palettePath() {
            return {
                path: '/palette/',
                query: {
                    colors: this.color.colors.join('-'),
                },
            };
        },
    },
    methods: {
        isLight,
        onColorClick(color) {
            if (this.device.isDesktop) {
                this.copyColorToClipboard(color);
            }
        },
    },
};
</script>
<style scoped>
.item__wrapper {
    @apply px-4 pt-4 rounded-lg h-full bg-rb-violet-100;
}
.item__color__wrapper {
    @apply flex -mt-8 overflow-hidden rounded-lg shadow-lg;
}
.item__color {
    @apply flex-grow h-40 w-1 hover:w-20 overflow-hidden;
}
.item__color__code {
    @apply h-full justify-center items-center text-lg font-bold uppercase px-4 cursor-pointer select-none hidden opacity-0 text-opacity-80;
    @apply hover:opacity-100;
}
.item__color:hover .item__color__code {
    display: flex;
}
</style>
