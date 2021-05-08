export const validateHex = (color) => {
    const regex = /^[0-9A-F]{6}$/i;
    return regex.test(color.toUpperCase());
};
