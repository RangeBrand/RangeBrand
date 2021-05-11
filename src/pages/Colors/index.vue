<template>
    <Layout>
        <div class="wrapper">
            <colors-list :colors="colors">
                <pagination :info="$page.colors.pageInfo"/>
            </colors-list>
        </div>
    </Layout>
</template>
<page-query>
query Colors ($page: Int) {
  colors: allColors (
      order: ASC,
      perPage: 100,
      page: $page,
    ) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        colors
      }
    }
  }
}
</page-query>
<script>
import ColorsList from '~/components/colors/list';
import Pagination from '~/components/pagination';

import SearchMixin from 'gridsome-plugin-flexsearch/SearchMixin';

export default {
    components: {
        ColorsList,
        Pagination,
    },
    mixins: [
        SearchMixin,
    ],
    computed: {
        colors() {
            return this.$page.colors.edges.map(e => e.node);
        },
    },
    metaInfo: {
        title: 'رنگ‌ها',
    },
};
</script>
