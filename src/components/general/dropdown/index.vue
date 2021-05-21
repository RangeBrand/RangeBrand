<template>
    <div class="relative text-black text-opacity-80 text-sm">
        <div :class="[
                 'title smooth-transition',
                 `title--${type}`
             ]"
             @click="isDropdownVisible = !isDropdownVisible">
            <span class="select-none">
                <slot name="title">
                    {{ title }}
                </slot>
            </span>
            <div v-if="type === 'styled'" class="float-left mr-5 fill-current text-rb-violet-300">
                <icon-chevron :class="[
                    'w-3 h-3 mt-1 fast-transition transform',
                    isDropdownVisible ? '-rotate-90' : 'rotate-90',

                ]"/>
            </div>
        </div>
        <transition name="fade">
            <div :class="[
                     'content smooth-transition',
                     `content--${position}`
                 ]"
                 v-show="isDropdownVisible"
                 @click="isDropdownVisible = false">
                <slot/>
            </div>
        </transition>
    </div>
</template>
<script>
import IconChevron from '~/assets/icons/chevron.svg';

export default {
    components: {
        IconChevron,
    },
    props: {
        title: {
            type: String,
            default: '',
            require: true,
        },
        type: {
            type: String,
            default: 'styled',
        },
        position: {
            type: String,
            default: 'bottom',
        },
    },
    data: () => ({
        isDropdownVisible: false,
    }),
};
</script>
<style scoped>
.title {
    @apply px-4 py-2 rounded-full shadow-none cursor-pointer;
}
.title--styled {
    @apply bg-white border-rb-violet-200 border;
    @apply hover:border-rb-violet-500;
}
.title--simple {
    @apply hover:bg-white hover:text-rb-carnelian-500 hover:shadow;
}

.content {
    @apply absolute border right-0 min-w-full bg-white border-rb-violet-200 shadow rounded-lg overflow-y-auto max-h-48 z-50;
}
.content--top {
    @apply mb-2 bottom-full
}
.content--bottom {
    @apply mt-2 top-full
}
</style>
