<template>
    <Layout>
        <div class="container mx-auto px-4">
            <searchbar v-model="searchTerm"/>
            <brands-list :brands="brands">
                <Pager :info="$page.brands.pageInfo"/>
            </brands-list>
        </div>
    </Layout>
</template>
<page-query>
query Brands ($page: Int) {
  brands: allBrand (sortBy: "title", order: DESC, perPage: 100, page: $page) @paginate {
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
import searchbar from '~/components/search';
import BrandsList from '~/components/brands/list';
import { Pager } from 'gridsome';

import Search from 'gridsome-plugin-flexsearch/SearchMixin';

export default {
    components: {
        BrandsList,
        searchbar,
        Pager,
    },
    mixins: [
        Search,
    ],
    computed: {
        brands() {
            if (this.searchTerm.length > 2) {
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
