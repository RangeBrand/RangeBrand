<template>
    <div :class="[
        'h-full flex flex-col relative smooth-transition',
        {
            'ml-72': sidebarIsOpen && !device.isMobile,
        },
    ]">
        <banner-list v-model="localColors" @copy="copyColorToClipboard"/>
        <transition name="fade">
            <banner-gradient v-show="gradIsVisible"
                             :colors="localColors"
                             @copy="copyToClipboard"/>
        </transition>
        <banner-footer v-model="gradIsVisible"/>
    </div>
</template>
<script>

import BannerList from '~/components/colors/banner/list';
import BannerGradient from '~/components/colors/banner/gradient';
import BannerFooter from '~/components/colors/banner/footer';

import ClipboardMixin from '~/scripts/mixins/clipboard';

import { mapState } from 'vuex';

export default {
    components: {
        BannerList,
        BannerGradient,
        BannerFooter,
    },
    mixins: [
        ClipboardMixin,
    ],
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        localColors: [],
        gradIsVisible: false,
    }),
    computed: {
        ...mapState(['device', 'sidebarIsOpen']),
    },
    watch: {
        localColors(value) {
            this.$emit('update', value.map(color => color.hex));
        },
        colors: {
            handler(value) {
                this.localColors = value.map(color => {
                    return {
                        hex: color,
                        translate: 0,
                    };
                });
            },
            immediate: true,
        },
    },
};
</script>
