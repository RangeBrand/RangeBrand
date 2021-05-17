<template>
    <div class="export" dir="rtl">
        <div class="export__header">
            <span v-show="step === 'main'">
                خروجی از این پالت رنگی
            </span>
            <span v-show="step === 'css'">
                این پالت رنگی به فرمت CSS
            </span>
            <span v-show="step === 'code'">
                Codeهای این پالت رنگی
            </span>
            <span v-show="step !== 'main'"
                  @click="step = 'main'"
                  class="link absolute top-0 left-0 p-5">
                <icon-arrow class="w-5 transform rotate-180 fill-current"/>
            </span>
        </div>
        <ul v-show="step === 'main'" class="export__body flex-center">
            <li class="export__body_item">
                <div class="item smooth-transition"
                     @click="copyUrlToClipboard">
                    <div class="item__icon_wrapper">
                        <icon-link class="item__icon"/>
                    </div>
                    <span class="block">
                        کپی URL
                    </span>
                </div>
            </li>
            <!-- <li class="export__body_item">
                <div class="item smooth-transition"
                     @click="step = 'css'">
                    <div class="item__icon_wrapper">
                        <icon-link class="item__icon"/>
                    </div>
                    <span class="block">
                        نمایش CSS
                    </span>
                </div>
            </li> -->
            <li class="export__body_item">
                <div class="item smooth-transition"
                     @click="step = 'code'">
                    <div class="item__icon_wrapper">
                        <icon-code class="item__icon"/>
                    </div>
                    <span class="block">
                        نمایش Code
                    </span>
                </div>
            </li>
        </ul>
        <div v-show="step === 'code'" class="export__body flex-center">
            <div class="w-full p-4 mt-4">
                <pre class="language-js"><code>{{ code }}</code></pre>
            </div>
        </div>
    </div>
</template>
<script>
import IconArrow from '~/assets/icons/arrow.svg';
import IconLink from '~/assets/icons/link.svg';
import IconCode from '~/assets/icons/code.svg';

import ClipboardMixin from '~/scripts/mixins/clipboard';

import {
    HEXtoRGB,
    HEXtoHSL,
} from '~/scripts/utils/converter';

export default {
    components: {
        IconArrow,
        IconLink,
        IconCode,
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
        step: 'main',
    }),
    computed: {
        code() {
            const csv = `// CSV\n${this.colors.map(color => `#${color.hex}`).join(', ')}`;
            const array = `// Array\n[${this.colors.map(color => `"#${color.hex}"`).join(', ')}]`;
            const extArray = `// Extended Array\n[\n${this.colors.map(color => {
                const hex = `\t"hex": "#${color.hex}",`;
                const rgb = `\t"rgb": "rgb(${HEXtoRGB(color.hex)})",`;
                const hsl = `\t"hsl": "hsl(${HEXtoHSL(color.hex)})"`;
                return `\t{\n\t${hex}\n\t${rgb}\n\t${hsl}\n\t}`;
            }).join(',\n')}\n]`;
            return `${csv}\n\n${array}\n\n${extArray}`;
        },
    },
};
</script>
<style scoped>
.export {
    @apply h-full bg-white;
}
.export__header {
    @apply relative bg-white block text-lg font-bold p-4 text-center text-rb-violet-900 border-b;
}
.export__body {
    @apply h-full -mt-14 pt-14 justify-center p-2 text-center overflow-y-auto;
}
.export__body_item {
    @apply p-2 text-black text-opacity-80 font-bold;
}

.item {
    @apply py-3 px-4 rounded-lg cursor-pointer;
    @apply hover:bg-rb-violet-100;
}
.item__icon {
    @apply w-7 fill-current;
}
.item__icon_wrapper {
    @apply bg-gray-200 inline-block p-3 rounded-full;
}

pre {
    @apply m-0 rounded-lg;
}
</style>
