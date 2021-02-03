<template>
    <Layout>
        <input type="text" v-model="searchTerm" class="bg-red-500">
        <hr>
        <brands-list v-show="searchResults.length > 0"
                     :brands="searchResults"/>
        <brands-list v-show="searchResults.length === 0"
                     :brands="$page.brands.edges">
            <Pager :info="$page.brands.pageInfo"/>
        </brands-list>
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
import BrandsList from '~/components/brands/list';
import { Pager } from 'gridsome';

import Search from 'gridsome-plugin-flexsearch/SearchMixin';

export default {
    components: {
        BrandsList,
        Pager,
    },
    mixins: [
        Search,
    ],
    metaInfo: {
        title: 'Brands',
    },
};
</script>
