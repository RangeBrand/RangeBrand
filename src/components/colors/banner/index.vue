<template>
    <div :class="[
        'h-full flex flex-col relative smooth-transition',
        {
            'ml-72': sidebarIsOpen && !device.isMobile,
        },
    ]">
        <banner-list v-model="localColors"
                     @copy="copyColorToClipboard"/>
        <transition name="fade">
            <banner-gradient v-show="gradIsVisible"
                             :colors="localColors"
                             @copy="copyToClipboard"/>
        </transition>
        <banner-footer>
            <template slot="right">
                <div class="flex-center">
                    <dropdown type="simple"
                              position="top">
                        <template slot="title">
                            <icon-setting class="w-4 inline-block"/>
                            <span class="mr-2 inline-block fill-current">
                                تنظیمات
                            </span>
                        </template>
                        <div class="dropdown__item smooth-transition w-48"
                             @click="toggleSeparatedMode">
                            <div v-show="!isSeparatedMode">
                                جدا کردن رنگ‌ها
                            </div>
                            <div v-show="isSeparatedMode">
                                پیوسته کردن رنگ‌ها
                            </div>
                        </div>
                        <div class="dropdown__item smooth-transition w-48"
                             @click="gradIsVisible = !gradIsVisible">
                            <div v-show="!gradIsVisible">
                                نمایش گرادیانت
                            </div>
                            <div v-show="gradIsVisible">
                                مخفی کردن گرادیانت
                            </div>
                        </div>
                    </dropdown>
                </div>
            </template>
        </banner-footer>
    </div>
</template>
<script>

import BannerList from '~/components/colors/banner/list';
import BannerGradient from '~/components/colors/banner/gradient';
import BannerFooter from '~/components/colors/banner/footer';
import Dropdown from '~/components/general/dropdown';
import IconSetting from '~/assets/icons/setting.svg';

import ClipboardMixin from '~/scripts/mixins/clipboard';

import { mapActions, mapState } from 'vuex';

export default {
    components: {
        BannerList,
        BannerGradient,
        BannerFooter,
        Dropdown,
        IconSetting,
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
        colorsAreSeparated: false,
    }),
    computed: {
        ...mapState(['device', 'sidebarIsOpen', 'isSeparatedMode']),
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
    methods: {
        ...mapActions(['toggleSeparatedMode']),
    },
};
</script>
<style scoped>
.dropdown__item {
    @apply px-4 py-2 cursor-pointer bg-white hover:bg-rb-violet-100;
}
</style>
