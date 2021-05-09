<template>
    <div class="relative">
        <input type="text"
               v-model="inputVal"
               placeholder="جستجو"
               class="smooth-transition">
        <icon-search class="icon--search"/>
    </div>
</template>
<script>
import IconSearch from '~/assets/icons/search.svg';

export default {
    components: {
        IconSearch,
    },
    props: {
        value: {
            type: String,
            default: '',
        },
    },
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
};
</script>
<style scoped>
input {
    @apply block w-full text-sm bg-white border border-rb-violet-200 rounded-full pl-8 pr-14 py-2 outline-none;
    @apply hover:border-rb-violet-500 focus:border-rb-violet-500;
}
.icon--search {
    @apply absolute top-0 right-0 w-9 h-9 p-2 mr-2 fill-current text-rb-violet-500;
}
</style>
