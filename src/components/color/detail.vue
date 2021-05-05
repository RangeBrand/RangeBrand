<template>
    <table>
        <thead class="bg-rb-violet-100">
            <tr>
                <th>
                    رنگ
                </th>
                <th>
                    اطلاعات
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="color in colors"
                :key="color">
                <td>
                    <div class="w-20 h-20 rounded-lg shadow inline-block" :style="{backgroundColor: `#${color}`}"/>
                </td>
                <td>
                    <dl>
                        <dt>HEX</dt>
                        <dd>{{ color }}</dd>
                        <br>
                        <dt>RGB</dt>
                        <dd>{{ color | toRGB | toString }}</dd>
                    </dl>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import {
    HEXtoRGB,
} from '~/scripts/converter';

export default {
    filters: {
        toRGB(value) {
            return HEXtoRGB(value);
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
table {
    @apply text-right table-auto border-collapse w-full text-black text-opacity-80;
}
th, td {
    @apply py-2 px-4 uppercase;
}
dt::after {
    content: ':';
}
dt, dd {
    @apply inline-block ml-2;
}
dd {
    direction: ltr;
}
</style>
