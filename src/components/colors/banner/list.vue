<template>
    <ul :class="[
            'flex flex-grow justify-center relative overflow-hidden',
            {
                'separat': isSeparatedMode
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
                <div class="color__actions flex-center smooth-transition">
                    <span class="color__actions__icon smooth-transition"
                          v-show="inputVal.length > 2">
                        <icon-delete class="p-3 fill-current w-12 block"
                                     @click="deleteColor(index)"/>
                    </span>
                    <span class="color__actions__icon smooth-transition"
                          v-if="device.isDesktop"
                          v-show="inputVal.length && !sidebarIsOpen">
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
</template>
<script>
import IconDelete from '~/assets/icons/delete.svg';
import IconCopy from '~/assets/icons/copy.svg';
import IconMove from '~/assets/icons/move.svg';
import IconAdd from '~/assets/icons/add.svg';
import IconHeartEmpty from '~/assets/icons/heart-empty.svg';
import IconHeartFilled from '~/assets/icons/heart-filled.svg';

import { isLight } from '~/scripts/utils/luminance';
import { HEXtoRGB, RGBtoHEX } from '~/scripts/utils/converter';

import { mapState, mapActions } from 'vuex';

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
    },
    data: () => ({
        activeColor: null,
    }),
    computed: {
        ...mapState(['device', 'favoriteColors', 'sidebarIsOpen', 'isSeparatedMode']),
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
<style scoped>
.color__wrapper {
    @apply absolute h-full;
}

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

.separat {
    @apply mx-1;
}
.separat .color__wrapper {
    @apply px-1 py-2;
}
.separat .color {
    @apply rounded-lg;
}
</style>
