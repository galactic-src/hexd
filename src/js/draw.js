import { getEdgeLength, getXOffset, getYOffset, getCanvasHeight, getCanvasWidth } from './controls'
import { calcHexWidth, calcHexHeight, adjustHexCentre } from './hex'
import dom from './dom'

export const resetCtx = (ctx) => {
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FFFFFF";
}

export const redraw = () => {
    const ctx = dom.image.outputCanvas;
    if (getEdgeLength() === 0) {
        clear(ctx);
    } else {
        copyImageToCanvas(ctx);
        cropHex(ctx);
    }
}

const copyImageToCanvas = ctx => {
    resetCtx(ctx);
    ctx.drawImage(dom.image.hiddenImage, 0, 0);
}

const clear = ctx => {
    resetCtx(ctx);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

const cropHex = ctx => {
    const edge = getEdgeLength();
    const hexCentreX = getXOffset();
    const hexCentreY = getYOffset();

    const hexWidth = calcHexWidth(edge);
    const hexHeight = calcHexHeight(edge);

    const hexTop = hexCentreY - hexHeight / 2;
    const hexBottom = hexCentreY + hexHeight / 2;
    const hexRight = hexCentreX + hexWidth / 2;
    const hexLeft = hexCentreX - hexWidth / 2;

    resetCtx(ctx);
    ctx.globalCompositeOperation = 'destination-out';

    const clipTop = Math.max(hexTop - 1, 0);
    const clipBottom = Math.min(hexBottom + 1, ctx.canvas.height);
    const clipHeight = clipBottom - clipTop;
    const clipLeft = Math.max(hexLeft - 1, 0);
    const clipRight = Math.min(hexRight + 1, ctx.canvas.width);

    if (hexTop > 0) {
        ctx.fillRect(0, 0, ctx.canvas.width, hexTop);
    }
    if (hexBottom < ctx.canvas.height) {
        ctx.fillRect(0, hexBottom, ctx.canvas.width, ctx.canvas.height - hexBottom);
    }
    if (hexLeft > 0) {
        ctx.fillRect(0, clipTop, hexLeft, clipHeight);
    }
    if (hexRight < ctx.canvas.width) {
        ctx.fillRect(hexRight, clipTop, ctx.canvas.width - hexRight, clipHeight);
    }

    ctx.beginPath();
    ctx.moveTo(clipLeft, clipTop);
    ctx.lineTo(clipLeft, hexTop + edge * 0.5 + 1);
    ctx.lineTo(hexLeft, hexTop + edge * 0.5);
    ctx.lineTo(hexCentreX, hexTop);
    ctx.lineTo(hexRight, hexTop + edge * 0.5);
    ctx.lineTo(clipRight, hexTop + edge * 0.5 + 1);
    ctx.lineTo(clipRight, clipTop);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(clipLeft, clipBottom);
    ctx.lineTo(clipLeft, hexBottom - edge * 0.5 - 1);
    ctx.lineTo(hexLeft, hexBottom - edge * 0.5);
    ctx.lineTo(hexCentreX, hexBottom);
    ctx.lineTo(hexRight, hexBottom - edge * 0.5);
    ctx.lineTo(clipRight, hexBottom - edge * 0.5 - 1);
    ctx.lineTo(clipRight, clipBottom);
    ctx.closePath();
    ctx.fill();
}

export const drawHexOutline = (ctx, initialX, initialY) => {
    const edge = getEdgeLength();
    const canvasHeight = getCanvasHeight();
    const canvasWidth = getCanvasWidth();

    const halfHexWidth = calcHexWidth(edge) / 2;
    const halfHexHeight = calcHexHeight(edge) / 2;
    const quarterHexHeight = halfHexHeight / 2;

    const { x, y } = adjustHexCentre(initialX, initialY, edge, canvasWidth, canvasHeight);

    resetCtx(ctx);
    ctx.beginPath();
    ctx.moveTo(x - halfHexWidth, y - quarterHexHeight);
    ctx.lineTo(x - halfHexWidth, y + quarterHexHeight);
    ctx.lineTo(x, y + halfHexHeight);
    ctx.lineTo(x + halfHexWidth, y + quarterHexHeight);
    ctx.lineTo(x + halfHexWidth, y - quarterHexHeight);
    ctx.lineTo(x, y - halfHexHeight);
    ctx.closePath();
    ctx.stroke();
}