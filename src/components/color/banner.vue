<template>
    <ul class="flex h-full relative overflow-hidden"
        @mousemove="move"
        @mouseup="captureOff">
        <li v-for="(color, index) in localColors"
            :key="color"
            class="flex-grow smooth-transition">
            <div :class="[
                     'color',
                     isLight(color) ? 'color--light' : 'color--dark',
                     {
                         'z-50': captureToggle === color
                     }
                 ]"
                 :style="{
                     backgroundColor: `#${color}`,
                     left: captureToggle === color ? `${x}px` : ''
                 }">
                <div class="color__actions flex-center smooth-transition">
                    <span class="p-2">
                        <icon-delete v-show="localColors.length > 2"
                                     class="color__actions__icon smooth-transition"
                                     @click="deleteColor(color)"/>
                    </span>
                    <span class="p-2">
                        <icon-move class="color__actions__icon smooth-transition"
                                   @mousedown="captureOn($event, color)"/>
                    </span>
                    <span class="p-2">
                        <icon-copy class="color__actions__icon smooth-transition"
                                   @click="copyToClipboard(color)"/>
                    </span>
                </div>
                <code
                    class="color__code smooth-transition"
                    dir="ltr">
                    {{ color }}
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

import { isLight } from '~/scripts/utils/luminance';
import { HEXtoRGB, RGBtoHEX } from '~/scripts/utils/converter';
import ClipboardMixin from '~/scripts/mixins/clipboard';

export default {
    components: {
        IconDelete,
        IconCopy,
        IconMove,
        IconAdd,
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
            localColors: this.colors,
            captureToggle: null,
            x: 0,
        };
    },
    computed: {
        colorWidth() {
            return window ? window.outerWidth / this.localColors.length : 0;
        },
    },
    methods: {
        isLight,
        deleteColor(color) {
            this.localColors = this.localColors.filter(item => item !== color);
        },
        addColor(index) {
            const leftColor = HEXtoRGB(this.localColors[index - 1]);
            const rightColor = HEXtoRGB(this.localColors[index]);
            const newColor = leftColor.map((item, index) => {
                return Math.round((item + rightColor[index]) / 2);
            });
            this.localColors.splice(index, 0, RGBtoHEX(newColor));
        },
        move(evt) {
            if (this.captureToggle !== null) {
                const color = this.localColors.indexOf(this.captureToggle);
                const colorNo = this.localColors.length - color - 1;
                // move color with mouse
                this.x = evt.x - (colorNo * this.colorWidth) - (this.colorWidth / 2);

                // replace positions of color
                const distant = Math.round(this.x / this.colorWidth);
                if (Math.abs(distant) !== 0) {
                    [this.localColors[color], this.localColors[color - distant]] = [this.localColors[color - distant], this.localColors[color]];
                }
            }
        },
        captureOn(evt, color) {
            this.captureToggle = color;
            this.move(evt);
        },
        captureOff() {
            this.captureToggle = null;
            this.x = 0;
        },
    },
};
</script>
<style scoped>
.color {
    @apply relative block w-full h-full;
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
