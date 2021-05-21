<template>
    <div class="list">
        <ul class="h-full overflow-y-scroll p-4">
            <li v-for="blindness in colorBlindnessTypes"
                :key="blindness.type"
                class="list__item"
                @click="setColorBlindnessType(blindness.type)">
                <span>{{ blindness.name }}</span>
                <icon-check :class="[
                    'list__item__icon smooth-transition',
                    (colorBlindnessType === blindness.type) ? 'opacity-100' : 'opacity-0'
                ]"/>
            </li>
        </ul>
        <div class="absolute h-18 bottom-0 right-0 left-0 text-center pb-4">
            <button class="button inline-block mx-1"
                    @click="applyColors">
                اعمال
            </button>
            <button class="link inline- p-2 mx-1"
                    @click="closeColorSidebar">
                بیخیال
            </button>
        </div>
    </div>
</template>
<script>
import IconCheck from '~/assets/icons/check.svg';

import { mapState, mapActions, mapMutations } from 'vuex';

export default {
    components: {
        IconCheck,
    },
    data: () => ({
        colorBlindnessTypes: [
            {
                name: 'نرمال',
                type: 'normal',
                description: '',
            },
            {
                name: 'سرخ‌کوری',
                type: 'protanopia',
                description: 'اختلالی در تشخیص رنگ که در آن فرد مبتلا توانایی تشخیص رنگ سرخ را از زرد و سبز ندارد. در این صورت فرد رنگ سرخ را تیره و مایل به سبز می‌بیند.',
            },
            {
                name: 'سبزکوری',
                type: 'deuteranopia',
                description: 'اختلالی در تشخیص رنگ که در آن فرد مبتلا توانایی تشخیص رنگ سبز را از سرخ و زرد ندارد. شایع‌ترین نوع کوررنگی است.',
            },
            {
                name: 'آبی‌کوری',
                type: 'tritanopia',
                description: 'اختلال نادری در تشخیص رنگ که در آن شخص مبتلا، به نور آبی حساس نیست و آبی و سبز را با هم اشتباه می‌کند.',
            },
            {
                name: 'سرخ‌دشواربینی',
                type: 'protanomaly',
                description: 'یکی از این حالات است که حساسیت گیرنده‌های رنگ قرمز تغییر می‌یابد و تشخیص دو رنگ قرمز و سبز (زیرا طول موج‌هایشان به هم نزدیک‌تر است) را برای فرد دشوار می‌کند.',
            },
            {
                name: 'سبزدشواربینی',
                type: 'deuteranomaly',
                description: 'نوع بسیار شایعی از کوررنگی است که در آن تشخیص دو رنگ قرمز و سبز به علت کاهش حساسیت گیرنده‌های رنگ سبز دشوار می‌شود.',
            },
            {
                name: 'آبی‌دشواربینی',
                type: 'tritanomaly',
                description: 'نوع نادری است که در آن حساسیت سلول‌های مخروطی فرد نسبت به رنگ آبی کاهش می‌یابد و فرد در تشخیص رنگ‌های زرد و آبی دچار مشکل می‌شود.',
            },
            {
                name: 'تک‌رنگ‌بینی',
                type: 'achromatomaly',
                description: 'یا کوررنگی تقریبی نوع نادری از این اختلال است که در آن تقریبا هیچ‌یک از انواع سلول‌های مخروطی فعال نیستند و فرد قادر به تشخیص تقریبا هیچ رنگی نیست.',
            },
            {
                name: 'تک‌رنگ‌بینی کامل',
                type: 'achromatopsia',
                description: 'یا کوررنگی کامل نوع نادری از این اختلال است که در آن هیچ‌یک از انواع سلول‌های مخروطی فعال نیستند و فرد قادر به تشخیص هیچ رنگی نیست.',
            },
        ],
    }),
    computed: {
        ...mapState(['colorBlindnessType']),
    },
    methods: {
        ...mapActions(['closeColorSidebar']),
        ...mapMutations(['setColorBlindnessType']),
        applyColors() {
            if (this.colorBlindnessType !== 'normal') {
                this.$emit('change');
            } else {
                this.closeColorSidebar();
            }
        },
    },
};
</script>
<style scoped>
.list {
    @apply pb-20 h-full relative;
}
.list__item {
    @apply bg-rb-violet-100 text-black text-opacity-80 justify-center p-4 mb-2 text-center rounded border relative cursor-pointer;
    @apply hover:bg-gray-100;
}

.list__item__icon {
    @apply w-14 h-14 absolute top-0 right-0 p-4 fill-current;
}
</style>
