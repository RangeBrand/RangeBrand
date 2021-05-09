import { HEXtoHSL } from '~/scripts/utils/converter';

export const mainColors = {
    red: {
        hex: 'ff0000',
        name: 'red',
        name_fa: 'قرمز',
    },
    orange: {
        hex: 'ffa500',
        name: 'orange',
        name_fa: 'نارنجی',
    },
    yellow: {
        hex: 'ffff00',
        name: 'yellow',
        name_fa: 'زرد',
    },
    green: {
        hex: '008000',
        name: 'green',
        name_fa: 'سبز',
    },
    cyan: {
        hex: '00ffff',
        name: 'cyan',
        name_fa: 'سبزآبی',
    },
    azure: {
        hex: '007fff',
        name: 'azure',
        name_fa: 'نیلی',
    },
    blue: {
        hex: '0000ff',
        name: 'blue',
        name_fa: 'آبی',
    },
    purple: {
        hex: '800080',
        name: 'purple',
        name_fa: 'بنفش',
    },
    magenta: {
        hex: 'ff00ff',
        name: 'magenta',
        name_fa: 'سرخابی',
    },
    white: {
        hex: 'ffffff',
        name: 'white',
        name_fa: 'سفید',
    },
    grey: {
        hex: '808080',
        name: 'grey',
        name_fa: 'خاکستری',
    },
    black: {
        hex: '000000',
        name: 'black',
        name_fa: 'مشکی',
    },
};

export const nameColorGroup = (hex) => {
    const hsl = HEXtoHSL(hex);
    if (hsl[1] <= 15) {
        if (hsl[2] <= 20) {
            return mainColors.black;
        } else if (hsl[2] >= 70) {
            return mainColors.white;
        }
        return mainColors.grey;
    } else {
        const colors = {
            0: mainColors.red,
            30: mainColors.orange,
            60: mainColors.yellow,
            120: mainColors.green,
            180: mainColors.cyan,
            210: mainColors.azure,
            240: mainColors.blue,
            270: mainColors.purple,
            300: mainColors.magenta,
            360: mainColors.red,
        };
        const closestDegree = Object.keys(colors)
            .map(deg => parseInt(deg))
            .reduce((prev, curr) => {
                return (Math.abs(curr - hsl[0]) < Math.abs(prev - hsl[0]) ? curr : prev);
            });
        return colors[closestDegree];
    }
};
