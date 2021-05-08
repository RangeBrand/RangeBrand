export const sRGBtoLin = (channel) => {
    if (channel <= 0.04045) {
        return channel / 12.92;
    } else {
        return Math.pow(((channel + 0.055) / 1.055), 2.4);
    }
};

export const RGBtosRGB = (rgb) => {
    return rgb.map(channel => channel / 255);
};

export const RGBtoHEX = (rgb) => {
    return rgb.reduce((acc, curr) => {
        const hex = curr.toString(16);
        return acc + (hex.length === 1 ? '0' : '') + hex;
    }, '');
};

const hslMex = {};
export const RGBtoHSL = (rgb) => {
    let h, s, l;

    const r = rgb[0] / 255;
    const g = rgb[1] / 255;
    const b = rgb[2] / 255;

    const maxChannel = Math.max(r, g, b);
    const minChannel = Math.min(r, g, b);
    const delta = maxChannel - minChannel;

    h = s = l = (maxChannel + minChannel) / 2;

    if (delta === 0) {
        h = s = 0; // achromatic
    } else {
        // s = l > 0.5 ? delta / (2 - maxChannel - minChannel) : delta / (maxChannel + minChannel);
        // Calc Hue
        switch (maxChannel) {
        case r:
            h = ((g - b) / delta) % 6;
            break;
        case g:
            h = (b - r) / delta + 2;
            break;
        case b:
            h = (r - g) / delta + 4;
            break;
        }
        h = Math.round(h * 60);
        if (h < 0) { h += 360; }

        // Calc Lightness
        l = (maxChannel + minChannel) / 2;

        // clac Saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
    }
    return [h, s, l];
};

const hexHslMem = {};
export const HEXtoHSL = (hex) => {
    if (!hexHslMem[hex]) {
        const rgb = HEXtoRGB(hex);
        hexHslMem[hex] = RGBtoHSL(rgb);
    }
    return hexHslMem[hex];
};

const hexRgbMem = {};
export const HEXtoRGB = (hex) => {
    try {
        if (!hexRgbMem[hex]) {
            const rgb = hex.match(/.{1,2}/g).map(channel => parseInt(channel, 16));
            hexRgbMem[hex] = rgb;
        }
        return hexRgbMem[hex];
    } catch {
        return [];
    }
};
