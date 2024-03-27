<template>
    <div>
        <label class="label" :for="name">
            {{ label }}
        </label>
        <div class="relative">
            <input dir="ltr" v-model="inputVal" class="input" :name="name" :id="name"/>
            <div class="preview" :style="{background: inputVal}"/>
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
        label: {
            type: String,
            default: '',
        },
        name: {
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
                this.$emit('input', val.startsWith('#') ? val : '#' + val);
            },
        },
    },
};
</script>

<style lang="postcss" scoped>
    .label {
        @apply block text-base mb-2;
    }
    .preview {
        @apply absolute top-4 right-4 w-10 h-10 rounded-md pointer-events-none border border-gray-200 transition-colors;
    }
    .input {
        @apply block bg-white w-full rounded-lg border border-gray-200 font-mono text-base leading-4 font-bold px-4 pt-6 pb-7 transition-colors;
        &:active,
        &:focus {
            @apply border-gray-400;
            & + .preview {
                @apply border-gray-400;
            }
        }
    }
</style>
