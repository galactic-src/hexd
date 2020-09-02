import dom from './dom'
import { getEdgeLength, getXOffset, getYOffset } from './controls'
import { calcHexWidth, calcHexHeight } from './hex'

export const setupExport = () => {
    dom.control.exportButton.addEventListener('click', e => handleDownload());
}

const handleDownload = () => {
    const edge = getEdgeLength();

    if (edge === 0) {
        alert('hex too small');
        return;
    }

    const hexWidth = calcHexWidth(edge);
    const hexHeight = calcHexHeight(edge);

    dom.image.export.width = hexWidth;
    dom.image.export.height = hexHeight;

    const xOffset = getXOffset();
    const yOffset = getYOffset();

    const x = xOffset - hexWidth / 2;
    const y = yOffset - hexHeight / 2;
    dom.image.exportCanvas
        .drawImage(dom.image.output, x, y, hexWidth, hexHeight, 0, 0, hexWidth, hexHeight);

    dom.control.exportButton.href = dom.image.export.toDataURL('image/png');
}