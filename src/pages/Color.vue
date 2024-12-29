<template>
    <Layout class="relative overflow-x-hidden">
        <main :style="{ background: `#${hex}`, color: textColor }">
            <div dir="ltr">
                <div class="hex">
                    #{{ hex }}
                </div>
                <div class="input-wrapper">
                    <div class="input">
                        <label for="red">Red</label>
                        <input v-model="red" type="number" name="red" min="0" max="255">
                    </div>
                    <div class="input">
                        <label for="green">Green</label>
                        <input v-model="green" type="number" name="green" min="0" max="255">
                    </div>
                    <div class="input">
                        <label for="blue">Blue</label>
                        <input v-model="blue" type="number" name="blue" min="0" max="255">
                    </div>
                </div>
            </div>
        </main>
    </Layout>
</template>
<script>
import { RGBtoHEX } from '~/scripts/utils/converter';
import { isLight } from '~/scripts/utils/luminance';

export default {
    data: () => ({
        red: 0,
        green: 0,
        blue: 0,
    }),
    computed: {
        hex() {
            return RGBtoHEX([+this.red, +this.green, +this.blue]);
        },
        textColor() {
            return isLight(this.hex) ? 'black' : 'white';
        },
    },
};
</script>

<style lang="postcss" scoped>
main {
  @apply absolute inset-0 h-screen w-screen flex items-center justify-center;
}

.input-wrapper {
  @apply flex gap-3;
}

.input label {
  @apply block font-bold text-lg;
}

.input input {
  @apply font-mono w-64 p-4 rounded-xl text-black;
}

.hex {
  @apply py-8 text-center font-bold font-mono text-6xl transition-all opacity-30 hover:opacity-90;
}
</style>
