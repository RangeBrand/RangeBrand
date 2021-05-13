<template>
    <div class="list">
        <ul v-show="favoriteColors.length" class="h-full overflow-y-scroll p-4">
            <li v-for="color in favoriteColors"
                :key="color"
                :class="[
                    'list__item',
                    isLight(color) ? 'list__item--light' : 'list__item--dark',
                ]"
                :style="{
                    background: `#${color}`
                }">
                <code dir="ltr">{{ color }}</code>
                <icon-delete class="list__item__delete fast-transition" @click="toggleFavoriteColor(color)"/>
            </li>
        </ul>
        <div v-if="!favoriteColors.length">
            <span class="text-black text-opacity-50 block text-center p-4">خالیه که!</span>
            <!-- <div class="list__item list__item--empty">
                add
            </div> -->
        </div>
        <div class="absolute h-18 bottom-0 right-0 left-0 text-center pb-4">
            <g-link class="button inline-block"
                    :to="paletteLink">
                مشاهده در پالت
            </g-link>
        </div>
    </div>
</template>
<script>
import IconDelete from '~/assets/icons/delete.svg';

import { mapState, mapActions } from 'vuex';

import { isLight } from '~/scripts/utils/luminance';

export default {
    components: {
        IconDelete,
    },
    computed: {
        ...mapState(['favoriteColors']),
        paletteLink() {
            return {
                path: '/palette',
                query: {
                    colors: this.favoriteColors.join('-'),
                },
            };
        },
    },
    methods: {
        ...mapActions(['toggleFavoriteColor']),
        isLight,
    },
};
</script>
<style scoped>
.list {
    @apply pb-20 h-full relative;
}
.list__item {
    @apply justify-center p-4 mb-2 text-center rounded shadow font-semibold text-lg uppercase relative;
}

.list__item--light {
    @apply text-black text-opacity-80;
}

.list__item--dark {
    @apply text-white text-opacity-80;
}

.list__item__delete {
    @apply w-16 h-16 fill-current absolute top-0 left-0 p-4 cursor-pointer opacity-0;
}
.list__item:hover .list__item__delete {
    @apply opacity-60;
}
.list__item:hover .list__item__delete:hover {
    @apply opacity-80
}
</style>
