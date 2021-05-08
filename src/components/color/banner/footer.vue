<template>
    <div class="bg-rb-violet-100">
        <div class="wrapper">
            <div class="flex-center h-12">
                <div class="flex-grow text-left text-black text-opacity-60">
                    <span class="p-2 inline-block link select-none"
                          @click="$emit('input', !value)">
                        <template v-if="value">
                            مخفی کردن
                        </template>
                        <template v-else>
                            نمایش به صورت
                        </template>
                        گرادیانت
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
