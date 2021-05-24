import { HEXtoHSL, HSLtoHEX } from '~/scripts/utils/converter';

export const updateHue = (hue, amount) => {
    hue += amount;
    if (hue > 360) {
        hue -= 360;
    } else if (hue < 0) {
        hue += 360;
    }
    return hue;
};

export const updateSaturation = (sat, amount) => {
    sat += amount;
    if (sat > 100) {
        sat = 100;
    } else if (sat < 0) {
        sat = 0;
    }
    return sat;
};

export const updateLuminance = (lum, amount) => {
    lum += amount;
    if (lum > 100) {
        lum = 100;
    } else if (lum < 0) {
        lum = 0;
    }
    return lum;
};

export const manipulateHEX = (hex, adjustment) => {
    const hsl = HEXtoHSL(hex);
    const hue = updateHue(hsl[0], adjustment.hue);
    const sat = updateSaturation(hsl[1], adjustment.sat);
    const lum = updateLuminance(hsl[2], adjustment.lum);
    return HSLtoHEX([hue, sat, lum]);
};
