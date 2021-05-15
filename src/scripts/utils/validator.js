export const validateHex = (color) => {
    const regex = /^[0-9A-F]{6}$/i;
    try {
        return regex.test(color.toUpperCase());
    } catch {
        return false;
    }
};
