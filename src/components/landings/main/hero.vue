<template>
    <div class="overflow-x-hidden h-screen -mt-20 relative z-50 bg-rb-violet-100">
        <div class="text-rb-violet-900 container relative mx-auto flex h-full pb-16 px-6">
            <g-image src="~/assets/images/aare.svg"
                     class="absolute bottom-20 max-w-none w-auto z-0 banner"/>
            <div class="w-1/3 flex flex-wrap content-end z-10">
                <div>
                    <h1 class="block text-9xl py-4 font-black">
                        رنگـ‌برند
                    </h1>
                    <p class="text-2xl leading-9 py-4">
                        لیستی از رنگ‌هایی که دور و بر خودمون توی ایران میبینیم. شاید این رنگ‌ها بتونن کمکمون کنن تا برای برندمون
                        <span>
                            رنگ بهتری انتخاب کنیم
                        </span>
                        <!-- <g-link to="/create/" class="text-rb-red-500 hover:text-rb-carnelian-500">
                            رنگ بهتری انتخاب کنیم
                        </g-link> -->
                    </p>
                    <div class="flex items-center text-md py-4">
                        <g-link to="/brands/"
                                class="block button">
                            <span class="hidden md:inline">دیدن</span>
                            برندها
                        </g-link>
                        <a href="https://github.com/"
                           class="link mx-4 block"
                           target="_blank"
                           rel="help">
                            <span class="hidden md:block">
                                یا شاید دوست داشته باشید
                            </span>
                            توی گیتهاب بهمون کمک کنین
                        </a>
                    </div>
                </div>
            </div>
            <div class="absolute right-0 top-20 z-10 mx-6">
                <g-image src="~/favicon.png" class="w-12 block"/>
                <ul class="no-list py-4">
                    <li class="block">
                        <g-link to="/brands/" class=" link inline-block p-1">
                            برندها
                        </g-link>
                    </li>
                    <li class="block">
                        <g-link to="/about/" class=" link inline-block p-1">
                            درباره ما
                        </g-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .banner {
        height: 140%;
        right: 20%;
        transform: scaleX(-1);
    }
</style>
