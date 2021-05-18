import { isLight } from '~/scripts/utils/luminance';

const canvasSize = 512;
const bannerHeight = 60;
const colorFontSize = 20;
const logoSize = 40;
const codeFonts = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

export const generatePalette = (colors, subtitle) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const colorWidth = canvasSize / colors.length;
    // Create BG
    context.canvas.width = canvasSize;
    context.canvas.height = canvasSize;
    context.fillStyle = '#fcf8ff';
    context.fillRect(0, 0, canvasSize, canvasSize);

    // Add Colors
    colors.forEach((color, index) => {
        context.save();
        const startPoint = colorWidth * index;
        // Color Item
        context.fillStyle = `#${color}`;
        context.fillRect(
            startPoint,
            0,
            colorWidth,
            canvasSize - bannerHeight
        );

        // Color Code
        context.font = `bold ${colorFontSize}px ${codeFonts}`;

        const metrics = context.measureText(color.toUpperCase());

        context.textAlign = 'center';
        context.translate(colorFontSize / 2, metrics.width / 2);
        context.rotate(Math.PI / -2);

        context.fillStyle = isLight(color) ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
        context.fillText(
            color.toUpperCase(),
            (metrics.width * 1.5) + bannerHeight - canvasSize, // space from bottom
            startPoint + (colorWidth * 0.5) - (colorFontSize / 2) // center of item
        );
        context.restore();
    });

    // Add Logo
    const logo = document.getElementById('logo');
    context.drawImage(
        logo,
        10,
        canvasSize - logoSize - 10,
        logoSize,
        logoSize,
    );
    context.font = `${colorFontSize}px ${codeFonts}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillText(
        'RangeBrand.ir',
        logoSize + 30,
        canvasSize - logoSize - 10 + (colorFontSize / 1.25),
    );
    const subTitleShouldBeSmall = subtitle.length > 45;
    context.font = `${subTitleShouldBeSmall ? colorFontSize * 0.5 : colorFontSize * 0.75}px ${codeFonts}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillText(
        subtitle,
        logoSize + 30,
        canvasSize - logoSize - 10 + (colorFontSize * 1.75),
    );

    const dataUrl = canvas.toDataURL('image/png');
    canvas.remove();
    return dataUrl;
};
