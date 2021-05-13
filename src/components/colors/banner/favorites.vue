<template>
    <div class="list">
        <ul v-show="favoriteColors.length">
            <li v-for="color in favoriteColors"
                :key="color"
                class="list__item"
                :style="{
                    background: `#${color}`
                }">
                <code dir="ltr">{{ color }}</code>
            </li>
        </ul>
        <div v-if="!favoriteColors.lenght">
            <span class="text-black text-opacity-50 block text-center p-4">خالیه که!</span>
            <!-- <div class="list__item list__item--empty">
                add
            </div> -->
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapState(['favoriteColors']),
    },
};
</script>
<style scoped>
.list {
    @apply p-4;
}
.list__item {
    @apply justify-center p-4 mb-2 rounded shadow font-semibold text-lg uppercase;
}
</style>
