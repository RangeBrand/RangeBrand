<template>
    <Layout>
        <input type="text" v-model="searchTerm" class="bg-red-500">
        {{ searchResults }}
        <hr>
        <ul>
            <li v-for="brand in $page.brands.edges" :key="brand.node.id">
                <g-link :to="brand.node.path" rel="bookmark">
                    <strong>
                        {{ brand.node.title }}
                    </strong>
                    <ul>
                        <li v-for="color in brand.node.colors" :key="color">
                            <code dir="ltr" :style="{backgroundColor: `#${color}`}">
                                #{{ color }}
                            </code>
                        </li>
                    </ul>
                </g-link>
            </li>
        </ul>
        <template v-if="$page.brands.pageInfo.totalPages > 1">
            Pagination
            <Pager :info="$page.brands.pageInfo"/>
        </template>
    </Layout>
</template>
<page-query>
query Brands ($page: Int) {
  brands: allBrand (sortBy: "title", order: DESC, perPage: 10, page: $page) @paginate {
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
import { Pager } from 'gridsome';

import Search from 'gridsome-plugin-flexsearch/SearchMixin';

export default {
  mixins: [
    Search,
  ],
  components: {
    Pager
  },
  metaInfo: {
    title: 'Brands'
  },
};
</script>