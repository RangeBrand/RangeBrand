<template>
    <Layout>
        <div class="color-banner">
            <color-banner :colors="brand.colors"/>
        </div>
        <main class="wrapper text-black text-opacity-80 py-8">
            <h1 class="text-3xl font-bold mt-8 mb-4">
                پالت رنگ‌های رسمی {{ brand.title }} به همراه کدهای RGB و HEX
            </h1>
            <p v-if="brand.description" class="mb-2">
                {{ brand.description }}
            </p>
            <brand-groups class="mb-2" :colors="brand.colors" :brand-name="brand.title"/>
            <p class="mb-2">
                در جدول زیر رنگ‌های رسمی برند {{ brand.title }} را مشاهده می‌کنید. برای اطمینان از این که متریال تبلیغاتی شما با برند {{ brand.title }} هماهنگ باشد، در کارهای خود از این رنگ‌ها استفاده کنید:
            </p>
            <div class="color-detail">
                <brand-detail :colors="brand.colors"/>
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
import ColorBanner from '~/components/colors/banner';
import BrandDetail from '~/components/brands/profile/detail';
import BrandGroups from '~/components/brands/profile/groups';

export default {
    components: {
        ColorBanner,
        BrandDetail,
        BrandGroups,
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
