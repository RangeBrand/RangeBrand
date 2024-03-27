<template>
    <Layout>
        <div class="wrapper">
            <div class="row mb-8">
                <div class="col w-full sm:w-1/2">
                    <ColorInput v-model="color.background" label="رنگ زمینه" name="background-color"/>
                </div>
                <div class="col w-full sm:w-1/2">
                    <ColorInput v-model="color.text" label="رنگ متن" name="text-color"/>
                </div>
            </div>
            <div class="preview-card">
                <div class="preview-card--color" :style="{ backgroundColor: color.background, color: color.text}">
                    <h1 class="text-2xl font-bold mb-4">محاسبه‌ی کنتراست رنگ‌ها</h1>
                    <p class="mb-4">ابزار محاسبه کننده‌ی کنتراست رنگ‌های رنگ برند، از قوانین دسترسی‌پذیری محتوای وب (WCAG) که مجموعه‌ای از پیشنهادات برای تبدیل وب به مکانی با دسترسی‌پذیری بیشتر است پیروی می‌کند.</p>
                    <p class="mb-4">
                        بنابر WCAG، دو استاندارد برای سطح کنتراست بین رنگ‌ها تعریف شده است: AA (حداقل کنتراست) و AAA ( کنتراست بهبودیافته).
                        <br>
                        سطح AA به نسبت کنتراست حداقل 4.5:1 برای نوشته‌های معمولی و 3:1 برای نوشته‌های بزرگ و یا توپر نیاز دارد.
                        <br>
                        سطح AAA نیز به نسبت کنتراسل حداقل 7:1 برای نوشته‌های معمولی و 4.5:1 برای نوشته‌های بزرگ و یا توپر نیاز دارد.
                    </p>
                    <p class="editable" contenteditable="true">شما می‌توانید با کلیک کردن بر روی این نوشته، متن را ویرایش کنید.</p>
                </div>
            </div>
            <div class="row mt-8">
                <div v-for="result in results" :key="result.id" class="col w-full sm:w-1/3" :title="result.standard">
                    <div class="result">
                        <div class="result-title">
                            {{ result.label }}
                        </div>
                        <div dir="ltr" class="result-stars">
                            <icon-star v-for="i in 3" :key="i" :class="['star', i <= result.stars ? 'opacity-60' : 'opacity-10']"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script>
import ColorInput from '~/components/colors/input';
import IconStar from '~/assets/icons/star.svg';
import { getContrastValue, getContrastStandard } from '~/scripts/utils/contrast.js';
import { validateHex } from '~/scripts/utils/validator';

export default {
    metaInfo: {
        title: 'محاسبه کنتراست رنگ‌ها',
    },
    components: {
        ColorInput,
        IconStar,
    },
    data() {
        const [txtColor, bgColor] = this.$route.query?.colors?.split('-') || ['FFFFFF', '9529FF'];
        return {
            color: {
                text: `#${txtColor}`,
                background: `#${bgColor}`,
            },
        };
    },
    computed: {
        txtColor() {
            return this.color.text.replace('#', '');
        },
        bgColor() {
            return this.color.background.replace('#', '');
        },
        contrast() {
            return getContrastValue(this.bgColor, this.txtColor);
        },
        results() {
            const standardToStars = {
                Poor: 1,
                AA: 2,
                AAA: 3,
            };
            return [
                {
                    id: 'small-text',
                    label: 'نوشته‌های معمولی',
                },
                {
                    id: 'large-text',
                    label: 'نوشته‌های بزرگ',
                },
                {
                    id: 'ui-component',
                    label: 'کامپوننت‌های UI',
                },
            ].map(item => {
                const standard = getContrastStandard(this.contrast, item.id);
                return {
                    ...item,
                    standard,
                    stars: standardToStars[standard],
                };
            });
        },
    },
    watch: {
        txtColor(value) {
            if (validateHex(value)) {
                this.$router.push({
                    path: '/contrast-checker',
                    query: {
                        colors: [value, this.bgColor].join('-'),
                    },
                });
            }
        },
        bgColor(value) {
            if (validateHex(value)) {
                this.$router.push({
                    path: '/contrast-checker',
                    query: {
                        colors: [this.txtColor, value].join('-'),
                    },
                });
            }
        },
    },
};
</script>

<style lang="postcss" scoped>
    .wrapper {
        @apply py-8 text-black text-opacity-80;
    }
    .preview-card {
        @apply bg-rb-violet-100 rounded-lg px-4 py-4;
    }
    .preview-card--color {
        @apply rounded-lg -mt-8 p-8 transition-colors cursor-default;
    }
    .result {
        @apply bg-rb-violet-100 rounded-lg py-2 px-3;
    }
    .result-title {
        @apply text-base text-black text-opacity-80 font-semibold;
    }
    .result-stars {
        @apply flex gap-2 p-2 justify-center;
    }
    .star {
        @apply w-4 h-4;
    }
    .editable {
        @apply cursor-text;
    }
</style>
