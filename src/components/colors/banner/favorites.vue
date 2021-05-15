<template>
    <div class="list">
        <ul class="h-full overflow-y-scroll p-4">
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
                <icon-delete class="list__item__icon fast-transition" @click="removeFavoriteColor(color)"/>
            </li>
            <li :class="[
                'list__item list__item--new',
                isLight(newFav) ? 'list__item--light' : 'list__item--dark',
            ]">
                <input v-model="newFav"
                       :style="validateHex(newFav) ? {
                           background: `#${newFav}`,
                           borderColor: 'transparent'
                       }: ''"
                       type="text"
                       placeholder="اضافه کردن"
                       class="list__item__input smooth-transition">
                <icon-check class="list__item__icon fast-transition"
                            @click="addColor"/>
            </li>
        </ul>
        <div v-if="!favoriteColors.length">
            <span class="text-black text-opacity-50 block text-center p-4">خالیه که!</span>
        </div>
        <div class="absolute h-18 bottom-0 right-0 left-0 text-center pb-4">
            <span class="button inline-block"
                  @click.prevent="goToPalette">
                مشاهده در پالت
            </span>
        </div>
    </div>
</template>
<script>
import IconDelete from '~/assets/icons/delete.svg';
import IconCheck from '~/assets/icons/check.svg';

import { mapState, mapActions } from 'vuex';

import { isLight } from '~/scripts/utils/luminance';
import { validateHex } from '~/scripts/utils/validator';

export default {
    components: {
        IconDelete,
        IconCheck,
    },
    data: () => ({
        newFav: '',
    }),
    computed: {
        ...mapState(['favoriteColors']),
    },
    watch: {
        newFav(value) {
            this.newFav = value.toUpperCase().replace('#', '');
        },
    },
    methods: {
        ...mapActions(['addFavoriteColor', 'removeFavoriteColor', 'closeSidebar']),
        isLight,
        validateHex,
        addColor() {
            if (validateHex(this.newFav)) {
                if (this.favoriteColors.indexOf(this.newFav) !== -1) {
                    this.$toasted.error('این رنگ تکراریه!');
                } else {
                    this.addFavoriteColor(this.newFav);
                    this.newFav = '';
                }
            } else {
                this.$toasted.error('این که نشد رنگ!');
            }
        },
        goToPalette() {
            this.closeSidebar();
            this.$router.push({
                path: '/palette',
                query: {
                    colors: this.favoriteColors.join('-'),
                },
            });
        },
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
.list__item--new {
    @apply p-0 shadow-none;
}

.list__item--light {
    @apply text-black text-opacity-80;
}

.list__item--dark {
    @apply text-white text-opacity-80;
}

.list__item__input {
    @apply block text-center w-full rounded p-4 cursor-pointer border-2 border-dashed;
}

.list__item__icon {
    @apply w-16 h-16 fill-current absolute top-0 left-0 p-4 cursor-pointer opacity-0;
}
.list__item:hover .list__item__icon {
    @apply opacity-60;
}
.list__item:hover .list__item__icon:hover {
    @apply opacity-80
}
</style>
