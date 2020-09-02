export const SQRT3 = Math.sqrt(3);

export const calcHexHeight = (edgeLength) => edgeLength * 2;
export const calcHexWidth = (edgeLength) => edgeLength * SQRT3;

export const adjustHexCentre = (x, y, edge, canvasWidth, canvasHeight) => {
    return {
        x: adjustX(x, edge, canvasWidth),
        y: adjustY(y, edge, canvasHeight)
    }
}

const adjustX = (x, edge, canvasWidth) => {
    const hexWidth = calcHexWidth(edge);

    if (x + hexWidth / 2 > canvasWidth) {
        return canvasWidth - hexWidth / 2;
    } else if (x - hexWidth / 2 < 0) {
        return hexWidth / 2;
    } else {
        return x;
    }
}

const adjustY = (y, edge, canvasHeight) => {
    const hexHeight = calcHexHeight(edge);

    if (y + hexHeight / 2 > canvasHeight) {
        return canvasHeight - hexHeight / 2;
    } else if (y - hexHeight / 2 < 0) {
        return hexHeight / 2;
    } else {
        return y
    }
}