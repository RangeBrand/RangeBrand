<template>
    <div class="mx-2 py-8">
        <div class="relative">
            <input type="text"
                   v-model="inputVal"
                   placeholder="جستجو"
                   class="block w-full white border border-rb-violet-200 focus:border-rb-violet-500 rounded-full pl-8 pr-14 py-2 outline-none">
            <icon-search class="icon--search"/>
        </div>
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
.icon--search {
    @apply absolute top-0 right-0 w-10 h-10 p-3 mr-2 fill-current text-rb-violet-500;
}
</style>
