const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Vazir', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                rb: {
                    indigo: {
                        500: '#421196',
                    },
                    violet: {
                        100: '#FCF8FF',
                        200: '#EBD6FF',
                        500: '#9529FF',
                        600: '#850AFF',
                        900: '#463C74',
                    },
                    yellow: {
                        500: '#FFC719',
                    },
                    red: {
                        500: '#FF193B',
                    },
                    carnelian: {
                        500: '#B8001C',
                    },
                },
            },
        },
    },
};
