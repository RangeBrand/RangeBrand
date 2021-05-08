<template>
    <div class="gradient flex-center"
         :style="{
             background: gradient
         }">
        <div dir="ltr" class="gradient__code smooth-transition" @click="copyToClipboard(`background: ${gradient};`)">
            <code>background: {{ gradient }};</code>
        </div>
        <ul class="gradient__dir flex-center smooth-transition">
            <li v-for="(dir, index) in directions"
                :key="index"
                @click="gradDirection = dir.name"
                class="p-1">
                <icon-chevron :class="[
                    'gradient__icon smooth-transition transform',
                    `rotate-${dir.degree}`,
                    {
                        'border border-white': dir.name === gradDirection
                    }
                ]"/>
            </li>
        </ul>
    </div>
</template>
<script>
import IconChevron from '~/assets/icons/chevron.svg';

export default {
    components: {
        IconChevron,
    },
    props: {
        colors: {
            type: Array,
            default: () => ([]),
        },
    },
    data: () => ({
        gradDirection: 'left',
        directions: [
            {
                name: 'right',
                degree: 0,
            },
            {
                name: 'right top',
                degree: 315,
            },
            {
                name: 'top',
                degree: 270,
            },
            {
                name: 'left top',
                degree: 225,
            },
            {
                name: 'left',
                degree: 180,
            },
            {
                name: 'left bottom',
                degree: 135,
            },
            {
                name: 'bottom',
                degree: 90,
            },
            {
                name: 'right bottom',
                degree: 45,
            },
        ],
    }),
    computed: {
        gradient() {
            const value = this.colors.reduce((acc, curr, index) => {
                return `${acc}, #${curr.hex}`;
            }, this.gradDirection);
            return `linear-gradient(to ${value})`;
        },
    },
};
</script>
<style scoped>
.gradient {
    @apply justify-center absolute top-0 right-0 w-full text-black text-opacity-80;
    bottom: 3rem;
}
.gradient:hover .gradient__code,
.gradient:hover .gradient__dir {
    @apply opacity-100;
}

.gradient__code {
    @apply text-left px-8 py-6 opacity-0 select-none rounded-lg cursor-pointer bg-white bg-opacity-20;
    @apply hover:bg-opacity-50;
}

.gradient__dir {
    @apply absolute bottom-0 right-0 left-0 justify-center p-4 opacity-0;
}

.gradient__icon {
    @apply w-8 p-2 select-none rounded-full cursor-pointer bg-white bg-opacity-20;
    @apply hover:bg-opacity-50;
}
</style>
