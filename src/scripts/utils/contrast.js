import { validateHex } from '~/scripts/utils/validator';
import { getLuminance } from '~/scripts/utils/luminance';

export const getContrastValue = (bg, txt) => {
    if (validateHex(bg) && validateHex(txt)) {
        const lum1 = getLuminance(bg);
        const lum2 = getLuminance(txt);

        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);

        const contrast = (brightest + 0.05) / (darkest + 0.05);

        return Math.round(contrast * 100) / 100;
    }
    return 0;
};

export const getContrastStandard = (value, groupName) => {
    const groupsLimits = {
        'small-text': {
            min: 4.5,
            max: 7,
        },
        'large-text': {
            min: 3,
            max: 4.5,
        },
        'ui-component': {
            min: 3,
            max: 3,
        },
    };
    const selectedGroupLimits = groupsLimits[groupName];

    if (!selectedGroupLimits) return 'Unknown';

    if (value < selectedGroupLimits.min) {
        return 'Poor';
    } else if (value < selectedGroupLimits.max) {
        return 'AA';
    } else {
        return 'AAA';
    };
};
