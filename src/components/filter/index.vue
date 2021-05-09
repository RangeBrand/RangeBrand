<template>
    <div class="flex-center">
        <div v-for="filter in filters"
             :key="`filter_${filter}`"
             class="mx-1 flex-grow">
            <dropdown :title="`فیلتر بر اساس ${value[filter].label} ${getOptionLabel(value[filter])}`">
                <div v-for="option in value[filter].options"
                     :key="option.value"
                     class="px-4 py-2 cursor-pointer bg-white hover:bg-rb-violet-100 smooth-transition"
                     @click="inputVal[filter].value = option.value">
                    <span v-if="option.color"
                          class="h-4 w-4 rounded-lg inline-block ml-1 mt-1 -mb-1 -mr-1 border border-black border-opacity-20"
                          :style="{background: `#${option.color}`}"/>
                    {{ option.label }}
                </div>
            </dropdown>
        </div>
    </div>
</template>
<script>
import Dropdown from '~/components/search/dropdown';

export default {
    components: {
        Dropdown,
    },
    props: {
        value: {
            type: Object,
            default: () => ({}),
            require: true,
        },
    },
    computed: {
        filters() {
            return Object.keys(this.value);
        },
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            },
        },
    },
    methods: {
        getOptionLabel(filter) {
            const selectedOption = filter.options.find(item => item.value === filter.value);
            if (selectedOption) {
                return selectedOption.value ? selectedOption.label : '';
            }
            return '';
        },
    },
};
</script>
