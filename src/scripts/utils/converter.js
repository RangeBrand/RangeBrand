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
    }
    // multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return [h, s, l];
};
export const HSLtoRGB = (hsl) => {
    const h = hsl[0];
    let s = hsl[1];
    let l = hsl[2];
    s /= 100;
    l /= 100;
    const C = (1 - Math.abs(2 * l - 1)) * s;
    const hue = h / 60;
    const X = C * (1 - Math.abs(hue % 2 - 1));
    let r = 0;
    let g = 0;
    let b = 0;
    if (hue >= 0 && hue < 1) {
        r = C;
        g = X;
    } else if (hue >= 1 && hue < 2) {
        r = X;
        g = C;
    } else if (hue >= 2 && hue < 3) {
        g = C;
        b = X;
    } else if (hue >= 3 && hue < 4) {
        g = X;
        b = C;
    } else if (hue >= 4 && hue < 5) {
        r = X;
        b = C;
    } else {
        r = C;
        b = X;
    }
    const m = l - C / 2;
    r += m;
    g += m;
    b += m;
    r *= 255.0;
    g *= 255.0;
    b *= 255.0;
    return [Math.round(r), Math.round(g), Math.round(b)];
};

const hexHslMem = {};
export const HEXtoHSL = (hex) => {
    if (!hexHslMem[hex]) {
        const rgb = HEXtoRGB(hex);
        hexHslMem[hex] = RGBtoHSL(rgb);
    }
    return hexHslMem[hex];
};

export const HSLtoHEX = (hsl) => {
    const rgb = HSLtoRGB(hsl);
    return RGBtoHEX(rgb);
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
