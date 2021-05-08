<template>
    <div class="h-full flex flex-col relative">
        <ul class="flex flex-grow justify-center relative overflow-hidden"
            @mousemove="translateColor"
            @mouseup="captureOff">
            <li v-for="(color, index) in localColors"
                :key="color.hex"
                :class="[
                    'absolute h-full',
                    {
                        'z-50': activeColor === color.hex,
                        'smooth-transition': activeColor !== color.hex,
                    }
                ]"
                :style="{
                    transform: `translateX(${color.translate}px)`,
                    right: `${colorWidthPercents * index}%`,
                    width: `${colorWidthPercents}%`,
                }">
                <div :class="[
                         'color',
                         isLight(color.hex) ? 'color--light' : 'color--dark',
                     ]"
                     :style="{
                         backgroundColor: `#${color.hex}`,
                     }">
                    <div class="color__actions flex-center smooth-transition">
                        <span class="p-2">
                            <icon-delete v-show="localColors.length > 2"
                                         class="color__actions__icon smooth-transition"
                                         @click="deleteColor(index)"/>
                        </span>
                        <span class="p-2">
                            <icon-move class="color__actions__icon smooth-transition"
                                       @mousedown="captureOn($event, color.hex)"/>
                        </span>
                        <span class="p-2">
                            <icon-copy class="color__actions__icon smooth-transition"
                                       @click="copyColorToClipboard(color.hex)"/>
                        </span>
                    </div>
                    <code
                        class="color__code smooth-transition"
                        dir="ltr">
                        {{ color.hex }}
                    </code>
                    <div class="color__add smooth-transition">
                        <div class="flex-center h-full">
                            <span class="button" @click="addColor(index)">
                                <icon-add class="w-8 fill-current"/>
                            </span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <transition name="fade">
            <banner-gradient v-show="gradIsVisible"
                             :colors="localColors"
                             @copy="copyToClipboard"/>
        </transition>
        <banner-footer v-model="gradIsVisible"/>
    </div>
</template>
<script>
import IconDelete from '~/assets/icons/delete.svg';
import IconCopy from '~/assets/icons/copy.svg';
import IconMove from '~/assets/icons/move.svg';
import IconAdd from '~/assets/icons/add.svg';

import BannerGradient from '~/components/color/banner/gradient';
import BannerFooter from '~/components/color/banner/footer';

import { isLight } from '~/scripts/utils/luminance';
import { HEXtoRGB, RGBtoHEX } from '~/scripts/utils/converter';
import ClipboardMixin from '~/scripts/mixins/clipboard';

export default {
    components: {
        IconDelete,
        IconCopy,
        IconMove,
        IconAdd,
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
    data() {
        return {
            localColors: this.colors.map(color => {
                return {
                    hex: color,
                    translate: 0,
                };
            }),
            activeColor: null,
            gradIsVisible: false,
        };
    },
    computed: {
        colorWidth() {
            return this.windowWidth / this.localColors.length;
        },
        colorWidthPercents() {
            return 100 / this.localColors.length;
        },
        windowWidth() {
            try {
                return window.outerWidth;
            } catch {
                return 0;
            };
        },
    },
    methods: {
        isLight,
        deleteColor(index) {
            this.localColors.splice(index, 1);
        },
        addColor(index) {
            const leftColor = HEXtoRGB(this.localColors[index - 1].hex);
            const rightColor = HEXtoRGB(this.localColors[index].hex);
            const newColor = leftColor.map((item, index) => {
                return Math.round((item + rightColor[index]) / 2);
            });
            this.localColors.splice(index, 0, {
                hex: RGBtoHEX(newColor),
                translate: 0,
            });
        },
        translateColor(evt) {
            if (this.activeColor !== null) {
                const currentIndex = this.localColors.findIndex(color => color.hex === this.activeColor);
                const distant = Math.round(this.localColors[currentIndex].translate / this.colorWidth);
                this.localColors[currentIndex].translate = evt.x + (this.colorWidth / 2) - (this.colorWidth * (this.localColors.length - currentIndex));
                if (distant !== 0 && this.localColors[currentIndex - distant]) {
                    this.localColors[currentIndex - distant].translate = this.colorWidth * Math.sign(distant) * -1;
                } else {
                    this.localColors.forEach(color => {
                        if (color.hex !== this.localColors[currentIndex].hex) {
                            color.translate = 0;
                        };
                    });
                }
            }
        },
        moveColor(from, to) {
            const el = { ...this.localColors[from] };
            this.localColors.splice(from, 1);
            this.localColors.splice(to, 0, el);
        },
        captureOn(evt, color) {
            this.activeColor = color;
            this.translateColor(evt);
        },
        captureOff() {
            if (this.activeColor) {
                const currentIndex = this.localColors.findIndex(color => color.hex === this.activeColor);
                const distant = Math.round(this.localColors[currentIndex].translate / this.colorWidth);
                if (Math.abs(distant) !== 0) {
                    this.moveColor(currentIndex, currentIndex - distant);
                }
                this.localColors.forEach(color => {
                    color.translate = 0;
                });
                this.activeColor = null;
            }
        },
    },
};
</script>
<style scoped>
.color {
    @apply relative block h-full;
}

.color__actions {
    @apply h-full pb-12 flex-col justify-center opacity-0;
}
.color:hover .color__actions {
    @apply opacity-100;
}

.color__actions__icon {
    @apply w-12 p-3 rounded-full fill-current cursor-pointer;
}

.color--dark .color__code {
    @apply text-white text-opacity-80;
}
.color--dark .color__actions__icon {
    @apply text-white bg-white bg-opacity-20;
    @apply hover:bg-opacity-50
}
.color--light .color__code {
    @apply text-black text-opacity-80;
}
.color--light .color__actions__icon {
    @apply text-black bg-black bg-opacity-10;
    @apply hover:bg-opacity-50
}
.color__code {
    @apply absolute bottom-0 right-0 left-0 text-center text-xl p-3 font-semibold uppercase select-none;
}

li:first-of-type .color__add {
    display: none;
}
.color__add {
    @apply absolute top-0 right-0 h-full opacity-0;
    @apply hover:opacity-100;
    transform: translate(50%);
}
.color__add .button {
    @apply p-2;
}
</style>
