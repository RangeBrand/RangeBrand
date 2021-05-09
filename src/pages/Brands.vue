<template>
    <Layout>
        <div class="wrapper">
            <div class="flex-center mx-2 py-8">
                <search class="flex-grow sm:ml-1" v-model="searchTerm"/>
                <filters class="-ml-1 -mr-1 mt-2 sm:mt-0 sm:mr-0" v-model="filters"/>
            </div>
            <brands-list :brands="brands">
                <pagination v-show="!hasSearch" :info="$page.brands.pageInfo"/>
            </brands-list>
            <div v-show="brands.length === 0" class="text-center py-4 text-black text-opacity-50">
                <g-image src="~/assets/images/undraw_void_3ggu.svg" alt="No Results" class="h-48 my-3 block mx-auto"/>
                <span>نتیجه‌ای یافت نشد</span>
            </div>
        </div>
    </Layout>
</template>
<page-query>
query Brands ($page: Int) {
  brands: allBrand (
      sortBy: "title",
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
import Filters from '~/components/filter';
import BrandsList from '~/components/brands/list';
import Pagination from '~/components/pagination';

import SearchMixin from 'gridsome-plugin-flexsearch/SearchMixin';

import {
    nameColorGroup,
    mainColors,
} from '~/scripts/utils/namer';

const COLOR_OPTIONS = [
    {
        label: 'هیچکدام',
        value: '',
    },
    ...Object.entries(mainColors).map(color => {
        return {
            color: color[1].hex,
            label: color[1].name_fa,
            value: color[1].name,
        };
    }),
];

export default {
    components: {
        BrandsList,
        Search,
        Filters,
        Pagination,
    },
    mixins: [
        SearchMixin,
    ],
    data: () => ({
        filters: {
            color: {
                value: '',
                label: 'رنگ',
                options: COLOR_OPTIONS,
            },
        },
    }),
    computed: {
        hasSearch() {
            return this.searchTerm.length > 2;
        },
        brands() {
            const brands = this.hasSearch
                ? this.searchResults.map(e => e.node)
                : this.$page.brands.edges.map(e => e.node);
            return brands.map(node => {
                return {
                    ...node,
                    isActive: this.filters.color.value
                        ? node.colors.some(color => {
                            return nameColorGroup(color).name === this.filters.color.value;
                        })
                        : true,
                };
            });
        },
    },
    metaInfo: {
        title: 'برندها',
    },
};
</script>
