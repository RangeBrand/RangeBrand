<template>
    <Layout>
        <h1>رنگ‌های {{ $page.brand.title }}</h1>
        <ul>
            <li v-for="color in $page.brand.colors" :key="color">
                <code dir="ltr" :style="{backgroundColor: `#${color}`}">
                    #{{ color }}
                </code>
            </li>
        </ul>
    </Layout>
</template>

<page-query>
query Brand ($path: String!) {
  brand: brand (path: $path) {
    title
    colors
  }
}
</page-query>
<script>
  export default {
  metaInfo() {
    return {
      title: this.$page.brand.title
    }
  }
}
</script>