<template>
    <div class="relative text-black text-opacity-80 text-sm">
        <div class="title smooth-transition"
             @click="isDropdownVisible = !isDropdownVisible">
            <span class="select-none">{{ title }}</span>
            <div class="float-left mr-5 fill-current text-rb-violet-300">
                <icon-chevron :class="[
                    'w-3 h-3 mt-1 fast-transition transform',
                    isDropdownVisible ? '-rotate-90' : 'rotate-90',
                ]"/>
            </div>
        </div>
        <transition name="fade">
            <div class="content"
                 v-show="isDropdownVisible" @click="isDropdownVisible = false">
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
    },
    data: () => ({
        isDropdownVisible: false,
    }),
};
</script>
<style scoped>
.title {
    @apply px-4 py-2 bg-white rounded-full border cursor-pointer border-rb-violet-200;
    @apply hover:border-rb-violet-500;
}

.content {
    @apply absolute border top-full mt-2 right-0 left-0 bg-white border-rb-violet-200 shadow rounded-lg overflow-y-auto max-h-48 z-50;
}
</style>
