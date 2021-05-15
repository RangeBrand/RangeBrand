<template>
    <div class="bg-rb-violet-100">
        <div class="wrapper">
            <div class="flex-center h-12">
                <div class="flex-grow text-right text-black text-opacity-60">
                    <slot name="right"/>
                </div>
                <div class="flex-grow text-left text-black text-opacity-60">
                    <slot name="left"/>
                </div>
            </div>
        </div>
    </div>
</template>
