<template>
    <Layout>
        <div class="container mx-auto mt-20 px-4">
            <div class="-mx-2 py-8">
                <div class="relative">
                    <input type="text"
                           v-model="searchTerm"
                           class="block w-full white border border-rb-violet-200 focus:border-rb-violet-500 rounded-full pl-8 pr-14 py-2 outline-none">
                    <span class="inline-block text-3xl transform -rotate-45 absolute top-0 right-0">
                        <div class="px-5 py-1 text-rb-violet-500 select-none">
                            &#9906;
                        </div>
                    </span>
                </div>
            </div>
            <brands-list v-show="searchResults.length > 0"
                         :brands="searchResults"/>
            <brands-list v-show="searchResults.length === 0"
                         :brands="$page.brands.edges">
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
