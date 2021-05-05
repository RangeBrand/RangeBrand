<template>
    <Layout>
        <div class="container mx-auto px-4">
            <Search v-model="searchTerm"/>
            <brands-list :brands="brands">
                <pagination v-show="!hasSearch" :info="$page.brands.pageInfo"/>
            </brands-list>
            <div v-show="brands.length === 0" class="text-center py-4 text-black text-opacity-50">
                <g-image src="~/assets/images/undraw_void_3ggu.svg" class="h-48 my-3 block mx-auto"/>
                <span>نتیجه‌ای یافت نشد</span>
            </div>
        </div>
    </Layout>
</template>
<page-query>
query Brands ($page: Int) {
  brands: allBrand (sortBy: "title", order: ASC, perPage: 100, page: $page) @paginate {
    totalCount
    pageInfo {
      totalPages
      currentPage
    }
    edges {
      node {
        id
        title
        colors
        path
      }
    }
  }
}
</page-query>
<script>
import Search from '~/components/search';
import BrandsList from '~/components/brands/list';
import Pagination from '~/components/pagination';

import SearchMixin from 'gridsome-plugin-flexsearch/SearchMixin';

export default {
    components: {
        BrandsList,
        Search,
        Pagination,
    },
    mixins: [
        SearchMixin,
    ],
    computed: {
        hasSearch() {
            return this.searchTerm.length > 2;
        },
        brands() {
            if (this.hasSearch) {
                return this.searchResults;
            } else {
                return this.$page.brands.edges;
            }
        },
    },
    metaInfo: {
        title: 'برندها',
    },
};
</script>
