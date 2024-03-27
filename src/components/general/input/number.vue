<template>
    <div class="flex flex-center" dir="ltr">
        <button @mousedown="start(1)"
                @touchstart="start(1)"
                @mouseleave="stop"
                @touchend="stop"
                @mouseup="stop"
                @touchcancel="stop"
                class="rounded-l-full">
            +
        </button>
        <input v-model.number="inputVal"
               type="number"
               :min="min"
               :max="max">
        <button @mousedown="start(-1)"
                @touchstart="start(-1)"
                @mouseleave="stop"
                @touchend="stop"
                @mouseup="stop"
                @touchcancel="stop"
                class="rounded-r-full">
            -
        </button>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 0,
        },
        min: {
            type: Number,
            default: 0,
        },
    },
    data: () => ({
        interval: false,
        count: 0,
    }),
    computed: {
        inputVal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val || 0);
            },
        },
    },
    methods: {
        start(amount) {
            if (!this.interval) {
                this.interval = setInterval(() => this.updateVal(amount), 100);
            }
        },
        stop() {
            clearInterval(this.interval);
            this.interval = false;
        },
        updateVal(amount) {
            if ((amount > 0 && this.inputVal < this.max) || (amount < 0 && this.inputVal > this.min)) {
                this.inputVal += amount;
            }
        },
    },
};
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type=number] {
  -moz-appearance: textfield;
}
input {
    @apply flex-grow p-2 text-center bg-white text-black border border-gray-200;
}
button {
    @apply flex-grow p-2 text-black bg-gray-200 border border-gray-200;
    @apply hover:bg-gray-300;
}
</style>
