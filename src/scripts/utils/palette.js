import { isLight } from '~/scripts/utils/luminance';

const config = {
    canvas: {
        height: 512,
        width: 1024,
    },
    logo: {
        size: 40,
        margin: 10,
        background: '#fcf8ff',
    },
    colorFontSize: 20,
    font: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
};

const drawColumn = ({ context = null, color = '', colorWidth = 0, index = 0 }) => {
    context.save();
    const startPoint = colorWidth * index;
    // Color Item
    context.fillStyle = `#${color}`;
    context.fillRect(
        startPoint,
        0,
        colorWidth,
        config.canvas.height - (config.logo.size + (config.logo.margin * 2))
    );

    // Color Code
    context.font = `bold ${config.colorFontSize}px ${config.font}`;

    const textMetrics = context.measureText(color.toUpperCase());

    context.textAlign = 'center';
    context.translate(config.colorFontSize / 2, textMetrics.width / 2);
    context.rotate(Math.PI / -2);

    context.fillStyle = isLight(color) ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
    context.fillText(
        color.toUpperCase(),
        (textMetrics.width * 1.5) + (config.logo.size + (config.logo.margin * 2)) - config.canvas.height, // space from bottom
        startPoint + (colorWidth * 0.5) - (config.colorFontSize / 2) // center of item
    );
    context.restore();
};

const drawLogo = ({ context, subtitle }) => {
    const logoFromTop = config.canvas.height - config.logo.size - config.logo.margin;
    const textFromLeft = config.logo.size + (config.logo.margin * 2);

    // Add Logo
    const logoImg = document.getElementById('logo');
    context.drawImage(
        logoImg,
        config.logo.margin,
        logoFromTop,
        config.logo.size,
        config.logo.size,
    );

    // Add Text
    context.font = `${config.colorFontSize}px ${config.font}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.8)';
    context.fillText(
        'RangeBrand.ir',
        textFromLeft,
        logoFromTop + (config.colorFontSize / 1.25),
    );
    context.font = `${config.colorFontSize * 0.75}px ${config.font}`;
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fillText(
        subtitle,
        textFromLeft,
        logoFromTop + (config.colorFontSize * 1.75),
    );
};

export const generatePalette = (colors, subtitle) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const colorWidth = config.canvas.width / colors.length;
    // Create BG
    context.canvas.width = config.canvas.width;
    context.canvas.height = config.canvas.height;
    context.fillStyle = config.logo.background;
    context.fillRect(0, 0, config.canvas.width, config.canvas.height);

    // Add Colors
    colors.reverse().forEach((color, index) => {
        drawColumn({ context, color, colorWidth, index });
    });
    // Add Logo
    drawLogo({ context, subtitle });

    const dataUrl = canvas.toDataURL('image/png');
    canvas.remove();
    return dataUrl;
};
