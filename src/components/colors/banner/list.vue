<template>
    <ul :class="[
            'flex flex-grow justify-center relative overflow-hidden',
            {
                'separate': isSeparatedMode
            },
        ]"
        @mousemove="translateColor"
        @mouseup="captureOff">
        <li v-for="(color, index) in inputVal"
            :key="color.hex"
            :class="[
                'color__wrapper',
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
                <div v-show="!showSecondaryColors"
                     class="color__actions flex-center smooth-transition">
                    <span class="color__actions__icon smooth-transition"
                          v-show="inputVal.length > 2">
                        <icon-delete class="p-3 fill-current w-12 block"
                                     @click="deleteColor(index)"/>
                    </span>
                    <span class="color__actions__icon smooth-transition"
                          v-if="device.isDesktop"
                          v-show="inputVal.length && !colorSidebarIsOpen">
                        <icon-move class="p-3 fill-current w-12 block"
                                   @mousedown="captureOn($event, color.hex)"/>
                    </span>
                    <span class="color__actions__icon smooth-transition">
                        <icon-copy class="p-3 fill-current w-12 block"
                                   @click="$emit('copy', color.hex)"/>
                    </span>
                    <span class="color__actions__icon smooth-transition">
                        <component :is="favoriteColors.indexOf(color.hex) === -1 ? 'IconHeartEmpty' : 'IconHeartFilled'"
                                   class="p-3 fill-current w-12 block"
                                   @click="toggleFavoriteColor(color.hex)"/>
                    </span>
                </div>
                <code
                    class="color__code smooth-transition"
                    dir="ltr">
                    {{ color.hex }}
                </code>
                <div v-if="pageMode === 'palette'"
                     v-show="!isShadesVisible"
                     class="color__add smooth-transition">
                    <div class="flex-center h-full">
                        <span class="button" @click="addColor(index)">
                            <icon-add class="w-8 fill-current"/>
                        </span>
                    </div>
                </div>
            </div>
            <transition name="fade">
                <div v-show="showSecondaryColors" :class="[
                         'color--secondary smooth-transition',
                         isLight(secondaryColors[index]) ? 'color--light' : 'color--dark',
                     ]"
                     :style="{
                         backgroundColor: `#${secondaryColors[index]}`,
                     }">
                    <code
                        class="color__code smooth-transition"
                        dir="ltr">
                        {{ secondaryColors[index] }}
                    </code>
                </div>
            </transition>
            <transition name="fade">
                <ul v-if="!noShades"
                    v-show="isShadesVisible"
                    class="shade smooth-transition">
                    <li v-for="shade in shades[index]"
                        :key="shade.hex"
                        :class="[
                            'shade__color',
                            isLight(shade.hex) ? 'color--light' : 'color--dark',
                        ]"
                        :style="{
                            backgroundColor: `#${shade.hex}`,
                        }">
                        <div class="shade__actions flex-center smooth-transition">
                            <span class="color__actions__icon smooth-transition">
                                <icon-copy class="p-2 fill-current w-9 block"
                                           @click="$emit('copy', shade.hex)"/>
                            </span>
                            <span class="color__actions__icon smooth-transition">
                                <component :is="favoriteColors.indexOf(shade.hex) === -1 ? 'IconHeartEmpty' : 'IconHeartFilled'"
                                           class="p-2 fill-current w-9 block"
                                           @click="toggleFavoriteColor(shade.hex)"/>
                            </span>
                        </div>
                        <code v-if="device.isDesktop"
                              class="color__code smooth-transition"
                              dir="ltr">
                            {{ shade.hex }}
                        </code>
                    </li>
                    <li class="shade__color border-t-4 border-white"
                        :style="{
                            backgroundColor: `#${color.hex}`,
                        }"/>
                </ul>
            </transition>
        </li>
    </ul>
</template>
<script>
import IconDelete from '~/assets/icons/delete.svg';
import IconCopy from '~/assets/icons/copy.svg';
import IconMove from '~/assets/icons/move.svg';
import IconAdd from '~/assets/icons/add.svg';
import IconHeartEmpty from '~/assets/icons/heart-empty.svg';
import IconHeartFilled from '~/assets/icons/heart-filled.svg';

import { isLight } from '~/scripts/utils/luminance';
import { HEXtoRGB, RGBtoHEX, HEXtoHSL, HSLtoHEX } from '~/scripts/utils/converter';
import { manipulateHEX, updateLuminance } from '~/scripts/utils/manipulator';

import { mapState, mapActions } from 'vuex';

import uniqby from 'lodash.uniqby';
import blinder from 'color-blind';

export default {
    components: {
        IconDelete,
        IconCopy,
        IconMove,
        IconAdd,
        IconHeartEmpty,
        IconHeartFilled,
    },
    props: {
        value: {
            type: Array,
            default: () => ([]),
        },
        noShades: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        activeColor: null,
    }),
    computed: {
        ...mapState([
            'device',
            'favoriteColors',
            'colorSidebarIsOpen',
            'colorSidebarContent',
            'isSeparatedMode',
            'colorBlindnessType',
            'colorAdjustment',
            'isShadesVisible',
        ]),
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
        colorWidth() {
            return this.windowWidth / this.inputVal.length;
        },
        colorWidthPercents() {
            return 100 / this.inputVal.length;
        },
        windowWidth() {
            try {
                return window.outerWidth;
            } catch {
                return 0;
            };
        },
        pageMode() {
            if (this.$route.path.includes('/palette')) {
                return 'palette';
            }
            return 'brand';
        },
        showSecondaryColors() {
            const contentsWithSecondaryColor = ['colorBlindnessSim', 'adjustColor'];
            return this.colorSidebarIsOpen && contentsWithSecondaryColor.includes(this.colorSidebarContent);
        },
        secondaryColors() {
            if (this.colorSidebarContent === 'colorBlindnessSim' && this.colorBlindnessType !== 'normal') {
                return this.inputVal.map(color => blinder[this.colorBlindnessType](`#${color.hex}`).replace('#', ''));
            } else if (this.colorSidebarContent === 'adjustColor') {
                return this.inputVal.map(color => manipulateHEX(color.hex, this.colorAdjustment));
            } else {
                return this.inputVal.map(color => color.hex);
            }
        },
        shades() {
            return this.inputVal.map(color => {
                const SHADES_COUNT = 11;
                const hsl = HEXtoHSL(color.hex);

                const lighten = Array(Math.floor(SHADES_COUNT / 2))
                    .fill(hsl)
                    .map((_, index) => ({
                        hex: HSLtoHEX([
                            hsl[0],
                            hsl[1],
                            updateLuminance(hsl[2], ((100 - hsl[2]) / Math.ceil(SHADES_COUNT / 2)) * (index + 1)),
                        ]),
                    }))
                    .reverse();
                const darken = Array(Math.floor(SHADES_COUNT / 2))
                    .fill(hsl)
                    .map((_, index) => ({
                        hex: HSLtoHEX([
                            hsl[0],
                            hsl[1],
                            updateLuminance(hsl[2], (hsl[2] / Math.ceil(SHADES_COUNT / 2)) * -(index + 1)),
                        ]),
                    }));
                return uniqby([
                    ...lighten,
                    color,
                    ...darken,
                ], 'hex');
            });
        },
    },
    methods: {
        ...mapActions(['toggleFavoriteColor']),
        isLight,
        deleteColor(index) {
            this.inputVal.splice(index, 1);
        },
        addColor(index) {
            const leftColor = HEXtoRGB(this.inputVal[index - 1].hex);
            const rightColor = HEXtoRGB(this.inputVal[index].hex);
            const newColor = leftColor.map((item, index) => {
                return Math.round((item + rightColor[index]) / 2);
            });
            this.inputVal.splice(index, 0, {
                hex: RGBtoHEX(newColor),
                translate: 0,
            });
        },
        translateColor(evt) {
            if (this.activeColor !== null) {
                const currentIndex = this.inputVal.findIndex(color => color.hex === this.activeColor);
                const distant = Math.round(this.inputVal[currentIndex].translate / this.colorWidth);
                this.inputVal[currentIndex].translate = evt.x + (this.colorWidth / 2) - (this.colorWidth * (this.inputVal.length - currentIndex));
                if (distant !== 0 && this.inputVal[currentIndex - distant]) {
                    this.inputVal[currentIndex - distant].translate = this.colorWidth * Math.sign(distant) * -1;
                } else {
                    this.inputVal.forEach(color => {
                        if (color.hex !== this.inputVal[currentIndex].hex) {
                            color.translate = 0;
                        };
                    });
                }
            }
        },
        moveColor(from, to) {
            const el = { ...this.inputVal[from] };
            this.inputVal.splice(from, 1);
            this.inputVal.splice(to, 0, el);
        },
        captureOn(evt, color) {
            this.activeColor = color;
            this.translateColor(evt);
        },
        captureOff() {
            if (this.activeColor) {
                const currentIndex = this.inputVal.findIndex(color => color.hex === this.activeColor);
                const distant = Math.round(this.inputVal[currentIndex].translate / this.colorWidth);
                if (Math.abs(distant) !== 0) {
                    this.moveColor(currentIndex, currentIndex - distant);
                }
                this.inputVal.forEach(color => {
                    color.translate = 0;
                });
                this.activeColor = null;
            }
        },
    },
};
</script>
<style lang="postcss" scoped>
.color__wrapper {
    @apply absolute h-full;
}

.color {
    @apply relative block h-full;
}
.color--secondary {
    @apply absolute top-0 right-0 left-0 h-1/2;
}
.shade {
    @apply absolute top-0 right-0 left-0 h-full flex flex-col;
}
.shade__actions {
    @apply absolute top-0 right-0 w-full h-full justify-center gap-2 z-10 opacity-0;
}
.shade__color {
    @apply relative flex-grow flex-shrink;
    &:hover {
        .color__code {
            @apply opacity-0;
        }
        .shade__actions {
            @apply opacity-100;
        }
    }
    .color__code {
        @apply top-1/2 -translate-y-1/2 p-0 bottom-auto;
    }
}

.color__actions {
    @apply h-full pb-12 flex-col justify-center opacity-0;
}
.color:hover .color__actions {
    @apply opacity-100;
}

.color__actions__icon {
    @apply inline-block my-1 rounded-full cursor-pointer;
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
    @apply absolute bottom-0 right-0 left-0 text-center font-semibold uppercase select-none;
    @apply transform -rotate-90 -translate-y-8;
    @apply md:text-xl md:p-3 md:rotate-0 md:translate-y-0;
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

.separate {
    @apply mx-1;
}
.separate .color__wrapper,
.separate .shade {
    @apply px-1 py-2;
}
.separate .color,
.separate .color--secondary {
    @apply rounded-lg;
}
.separate .color--secondary {
    @apply top-2 right-1 left-1;
}
.separate .shade .shade__color {
    &:first-of-type {
        @apply rounded-t-lg;
    }
    &:last-of-type {
        @apply rounded-b-lg;
    }
}
</style>
