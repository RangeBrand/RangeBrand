<template>
    <Layout>
        <div class="color-banner hidden md:block">
            <color-banner :colors="brand.colors"/>
        </div>
        <main class="wrapper text-black text-opacity-80 py-8">
            <h1 class="text-3xl font-bold mt-8 mb-4">
                پالت رنگ‌های رسمی {{ brand.title }} به همراه کدهای RGB و HEX
            </h1>
            <p v-if="brand.description" class="mb-2">
                {{ brand.description }}
            </p>
            <p class="mb-2">
                در جدول زیر رنگ‌های رسمی برند {{ brand.title }} را مشاهده می‌کنید. برای اطمینان از این که متریال تبلیغاتی شما با برند {{ brand.title }} هماهنگ باشد، در کارهای خود از این رنگ‌ها استفاده کنید:
            </p>
            <div class="color-detail">
                <color-detail :colors="brand.colors"/>
            </div>
        </main>
    </Layout>
</template>

<page-query>
query Brand ($path: String!) {
  brand: brand (path: $path) {
    title
    colors
    description
  }
}
</page-query>
<script>
import ColorBanner from '~/components/color/banner';
import ColorDetail from '~/components/color/detail';

export default {
    components: {
        ColorBanner,
        ColorDetail,
    },
    metaInfo() {
        return {
            title: `رنگ‌های ${this.$page.brand.title}`,
        };
    },
    computed: {
        brand() {
            return this.$page.brand || {};
        },
    },
};
</script>
<style scoped>
.color-banner {
    height: 55vh;
    @apply -mt-4;
}
.color-detail {
    @apply my-8 mx-auto;
    max-width: 45rem
}
</style>
