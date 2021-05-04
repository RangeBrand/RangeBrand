<template>
    <footer class="bg-rb-violet-100 fixed right-0 bottom-0 w-full z-0">
        <div class="flex-center justify-center flex-col h-24">
            <ul class="flex-center text-sm w-100">
                <li v-for="(link, index) in socialLinks" :key="index">
                    <a :href="link.url"
                       :title="`رنگ برند در ${link.title}`"
                       class="link p-2 mx-1"
                       target="_blank"
                       rel="noreferrer noopener">
                        {{ link.title }}
                    </a>
                </li>
            </ul>
            <div class="text-black text-opacity-70 mt-2 text-lg font-bold">
                رنگ برند
            </div>
        </div>
    </footer>
</template>
<script>
export default {
    data: () => ({
        socialLinks: [
            {
                title: 'توییتر',
                url: 'https://twitter.com/RangeBrand',
            },
            {
                title: 'گیتهاب',
                url: 'https://github.com/RangeBrand',
            },
        ],
    }),
};
</script>
