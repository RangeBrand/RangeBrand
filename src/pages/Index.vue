<template>
    <Layout>
        <div class="h-screen relative z-50 bg-rb-violet-100">
            <div class="text-rb-violet-900 container relative mx-auto flex h-full
                        pb-16 px-4">
                <g-image src="~/assets/images/aare.svg"
                         style="
                        height: 140%;
                        right: 20%;
                        transform: scaleX(-1);
                    "
                         class="
                            absolute
                            bottom-20
                            max-w-none
                            w-auto
                            z-0
                        "/>
                <div class="w-1/3 flex flex-wrap content-end z-10">
                    <div>
                        <h1 class="block text-9xl py-4 font-black">
                            رنگـ‌برند
                        </h1>
                        <p class="text-2xl leading-9 py-4">
                            لورم اپیسوم متن از پیش تعریف شده که نمیدونم باهاش کجا میخوام برم. فقط میدونم که همینطوری ادامه داره و ایشالا میره
                            <g-link to="/about/" class="text-rb-red-500 hover:text-rb-carnelian-500">
                                تو خط بعدی
                            </g-link>
                        </p>
                        <div class="flex items-center text-md py-4">
                            <g-link to="/brands/"
                                    class="block bg-rb-violet-500 hover:bg-rb-violet-600 text-white py-4 px-10">
                                مشاهده برندها
                            </g-link>
                            <a href="https://github.com/"
                               class="mx-4 block"
                               target="_blank"
                               rel="help">
                                یا شاید بخوایید توی گیتهاب<br>بهمون کمک کنین
                            </a>
                        </div>
                    </div>
                </div>
                <div class="absolute right-0 top-20 z-10">
                    <g-image src="~/favicon.png" class="w-12 mx-4 block"/>
                    <ul class="no-list py-4">
                        <li class="block">
                            <g-link to="/brands/" class="inline-block px-4 py-1 hover:text-rb-carnelian-500">
                                برندها
                            </g-link>
                        </li>
                        <li class="block">
                            <g-link to="/about/" class="inline-block px-4 py-1 hover:text-rb-carnelian-500">
                                درباره ما
                            </g-link>
                        </li>
                    </ul>
                </div>
            <!-- <div class="w-2/3 flex relative flex-wrap content-end"> -->
            <!-- </div> -->
            </div>
        </div>
        <div class="container mx-auto">
            <div class="py-20 px-4" style="height: 150vh">
                here
            </div>
        </div>
    </Layout>
</template>
