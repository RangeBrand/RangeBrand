<template>
    <div class="detail" dir="ltr">
        <div class="detail_header">
            <div class="w-1/3">
                رنگ
            </div>
            <div class="w-2/3">
                مقادیر
            </div>
        </div>
        <ul class="m-0 px-0 py-2">
            <li v-for="color in colors"
                :key="color"
                class="detail_row flex-center">
                <div class="w-1/3">
                    <g-link class="w-20 h-20 rounded-lg shadow block"
                            target="_blank"
                            :style="{backgroundColor: `#${color}`}"
                            :to="{
                                path: '/palette',
                                query: {
                                    colors: color
                                }
                            }"/>
                </div>
                <div class="w-2/3">
                    <dl>
                        <dt>HEX</dt>
                        <dd>{{ color }}</dd>
                        <dt>RGB</dt>
                        <dd>{{ color | toRGB | toString }}</dd>
                        <dt>HSL</dt>
                        <dd>{{ color | toHSL | toString }}</dd>
                    </dl>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import {
    HEXtoRGB,
    HEXtoHSL,
} from '~/scripts/utils/converter';

export default {
    filters: {
        toRGB(value) {
            return HEXtoRGB(value);
        },
        toHSL(color) {
            return HEXtoHSL(color);
        },
        toString(value) {
            return value.join(', ');
        },
    },
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
    },
};
</script>
<style scoped>
.detail_header {
    @apply bg-rb-violet-100 flex rounded-lg font-bold
}
.detail_header > * {
    @apply py-2 px-3;
}

.detail_row {
    @apply flex rounded-lg
}
.detail_row > * {
    @apply py-2;
}

dt {
    @apply float-left mr-2;
}
dt::after {
    content: ':';
}
dd {
    @apply uppercase
}
</style>
