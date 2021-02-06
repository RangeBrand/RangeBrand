<template>
    <header class="fixed z-50 top-0 right-0 left-0 bg-rb-violet-100">
        <div class="container mx-auto">
            <div class="flex items-center">
                <div>
                    <g-link to="/" class="p-2 block">
                        <g-image src="~/favicon.png" class="w-12 block"/>
                    </g-link>
                </div>
                <nav>
                    <ul class="flex mx-4">
                        <li>
                            <g-link to="/brands/" class="p-4 block hover:text-rb-carnelian-500">
                                برندها
                            </g-link>
                        </li>
                        <li>
                            <g-link to="/about/" class="p-4 block hover:text-rb-carnelian-500">
                                درباره ما
                            </g-link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
</template>
