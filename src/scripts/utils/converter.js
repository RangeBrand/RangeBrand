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

export const HEXtoRGB = (hex) => {
    return hex.match(/.{1,2}/g).map(channel => parseInt(channel, 16));
};
