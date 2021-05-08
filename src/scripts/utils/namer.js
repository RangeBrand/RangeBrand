import { HEXtoHSL } from '~/scripts/utils/converter';

export const nameColorGroup = (hex) => {
    const hsl = HEXtoHSL(hex);
    if (hsl[1] <= 15) {
        if (hsl[2] <= 20) {
            return {
                name: 'black',
                name_fa: 'مشکی',
            };
        } else if (hsl[2] >= 70) {
            return {
                name: 'white',
                name_fa: 'سفید',
            };
        }
        return {
            name: 'gray',
            name_fa: 'خاکستری',
        };
    } else {
        const mainColors = {
            0: {
                name: 'red',
                name_fa: 'قرمز',
            },
            30: {
                name: 'orange',
                name_fa: 'نارنجی',
            },
            60: {
                name: 'yellow',
                name_fa: 'زرد',
            },
            120: {
                name: 'green',
                name_fa: 'سبز',
            },
            180: {
                name: 'cyan',
                name_fa: 'سبزآبی',
            },
            210: {
                name: 'azure',
                name_fa: 'نیلی',
            },
            240: {
                name: 'blue',
                name_fa: 'آبی',
            },
            270: {
                name: 'purple',
                name_fa: 'بنفش',
            },
            300: {
                name: 'magenta',
                name_fa: 'سرخابی',
            },
            360: {
                name: 'red',
                name_fa: 'قرمز',
            },
        };
        const closestDegree = Object.keys(mainColors)
            .map(deg => parseInt(deg))
            .reduce((prev, curr) => {
                return (Math.abs(curr - hsl[0]) < Math.abs(prev - hsl[0]) ? curr : prev);
            });
        return mainColors[closestDegree];
    }
};
