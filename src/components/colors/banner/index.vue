<template>
    <div :class="[
        'h-full flex flex-col relative smooth-transition',
        {
            'ml-72': colorSidebarIsOpen && !device.isMobile,
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
                            <icon-setting class="w-5 inline-block fill-current"/>
                            <span class="mr-2 inline-block">
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
                        <div class="dropdown__item smooth-transition w-48"
                             @click="toggleColorSidebar('favorites')">
                            <div v-show="(colorSidebarContent !== 'favorites') || !colorSidebarIsOpen">
                                نمایش رنگ‌های مورد علاقه
                            </div>
                            <div v-show="(colorSidebarContent === 'favorites') && colorSidebarIsOpen">
                                مخفی کردن رنگ‌های مورد علاقه
                            </div>
                        </div>
                    </dropdown>
                    <button class="button--simple"
                            @click="$modal.show('exportModal')">
                        <icon-share class="w-5 inline-block fill-current"/>
                        <span class="mr-2 inline-block">
                            خروجی
                        </span>
                    </button>
                </div>
            </template>
            <template slot="left">
                <div class="flex-center justify-end">
                    <button class="button--simple"
                            @click="toggleColorSidebar('colorBlindnessSim')"
                            title="شبیه‌ساز کوررنگی">
                        <span class="ml-2 inline-block">
                            شبیه‌ساز کوررنگی
                        </span>
                        <icon-glasses class="w-5 inline-block fill-current"/>
                    </button>
                    <button class="button--simple"
                            @click="toggleColorSidebar('adjustColor')"
                            title="تنظیم رنگ‌ها">
                        <span class="ml-2 inline-block">
                            تنظیم رنگ‌ها
                        </span>
                        <icon-brightness class="w-5 inline-block fill-current"/>
                    </button>
                </div>
            </template>
        </banner-footer>
        <banner-sidebar @change="updateColors"/>
        <modal name="exportModal"
               dir="ltr"
               :adaptive="true">
            <banner-export :colors="localColors"
                           :original-colors="colors"
                           @close="$modal.hide('exportModal')"/>
        </modal>
    </div>
</template>
<script>
import BannerSidebar from '~/components/colors/banner/sidebar';
import BannerList from '~/components/colors/banner/list';
import BannerGradient from '~/components/colors/banner/gradient';
import BannerFooter from '~/components/colors/banner/footer';
import BannerExport from '~/components/colors/banner/export';
import Dropdown from '~/components/general/dropdown';
import IconSetting from '~/assets/icons/setting.svg';
import IconShare from '~/assets/icons/share.svg';
import IconGlasses from '~/assets/icons/glasses.svg';
import IconBrightness from '~/assets/icons/brightness.svg';

import ClipboardMixin from '~/scripts/mixins/clipboard';

import { mapActions, mapState } from 'vuex';
import { manipulateHEX } from '~/scripts/utils/manipulator';

import blinder from 'color-blind';

export default {
    components: {
        BannerSidebar,
        BannerList,
        BannerGradient,
        BannerFooter,
        BannerExport,
        Dropdown,
        IconSetting,
        IconShare,
        IconGlasses,
        IconBrightness,
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
        ...mapState([
            'device',
            'colorSidebarIsOpen',
            'colorSidebarContent',
            'isSeparatedMode',
            'colorBlindnessType',
            'colorAdjustment',
        ]),
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
        ...mapActions(['toggleSeparatedMode', 'toggleColorSidebar', 'closeColorSidebar']),
        updateColors(change) {
            if (change === 'blindness') {
                this.$router.push({
                    path: '/palette',
                    query: {
                        colors: this.localColors.map(color => blinder[this.colorBlindnessType](`#${color.hex}`).replace('#', '')).join('-'),
                    },
                });
            } else if (change === 'adjustment') {
                this.$router.push({
                    path: '/palette',
                    query: {
                        colors: this.localColors.map(color => manipulateHEX(color.hex, this.colorAdjustment)).join('-'),
                    },
                });
            }
            this.closeColorSidebar();
        },
    },
};
</script>
<style scoped>
.dropdown__item {
    @apply px-4 py-2 cursor-pointer bg-white hover:bg-rb-violet-100;
}
</style>
