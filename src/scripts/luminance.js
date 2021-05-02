// https://stackoverflow.com/a/56678483

const sRGBtoLin = (channel) => {
    if (channel <= 0.04045) {
        return channel / 12.92;
    } else {
        return Math.pow(((channel + 0.055) / 1.055), 2.4);
    }
};

const getPerceivedLightness = (luminance) => {
    if (luminance <= (216 / 24389)) { // The CIE standard states 0.008856 but 216/24389 is the intent for 0.008856451679036
        return luminance * (24389 / 27); // The CIE standard states 903.3, but 24389/27 is the intent, making 903.296296296296296
    } else {
        return Math.pow(luminance, (1 / 3)) * 116 - 16;
    }
};

export const isLight = (color) => {
    const [vR, vG, vB] = color.match(/.{1,2}/g).map(channel => parseInt(channel, 16) / 255);
    const luminance = (sRGBtoLin(vR) * 0.2126) +
                      (sRGBtoLin(vG) * 0.7152) +
                      (sRGBtoLin(vB) * 0.0722);
    return getPerceivedLightness(luminance) > 60;
};
