<template>
    <div class="mx-2 py-8">
        <div class="relative">
            <input type="text"
                   v-model="inputVal"
                   placeholder="جستجو"
                   class="block w-full white border border-rb-violet-200 focus:border-rb-violet-500 rounded-full pl-8 pr-14 py-2 outline-none">
            <span class="inline-block text-3xl transform -rotate-45 absolute top-0 right-0">
                <div class="px-5 py-1 text-rb-violet-500 select-none">
                    &#9906;
                </div>
            </span>
        </div>
    </div>
</template>
<script>
export default {
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
