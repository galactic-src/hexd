import { getEdgeLength, setEdgeLength, getCanvasWidth, getCanvasHeight, setXOffset, getXOffset, setYOffset, getYOffset, getSizeLocked } from './controls'
import dom from './dom'
import { redraw, drawHexOutline } from './draw'
import { SQRT3, adjustHexCentre, calcHexWidth, calcHexHeight, rounded } from './hex'
import state from './state'

const WHEEL_SCROLL_SCALE = 0.5

export const setupCanvasUI = () => {
    document.body.addEventListener('mouseup', e => state.outputDrag = false);
    document.body.addEventListener('mouseleave', e => state.outputDrag = false);
    dom.image.output.addEventListener('mousedown', e => state.outputDrag = true);

    dom.image.output.addEventListener('mousemove', e => handleMouseInteraction(e, state.outputDrag));
    dom.image.output.addEventListener('click', e => handleMouseInteraction(e, true));

    dom.image.output.addEventListener('mouseleave', () => {
        redraw();
    });

    dom.image.output.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (getSizeLocked()) {
            return;
        }

        let newEdgeLength = getEdgeLength() + e.deltaY * WHEEL_SCROLL_SCALE;
        if (newEdgeLength < 0) {
            newEdgeLength = 0;
        }

        setXOffset(state.scaleCentreX);
        onXChanged(state.scaleCentreX);
        setYOffset(state.scaleCentreY);
        onYChanged(state.scaleCentreY);
        setEdgeLength(newEdgeLength);
        onEdgeChanged(newEdgeLength);

        drawHexOutline(dom.image.outputCanvas, state.scaleCentreX, state.scaleCentreY);
    })
}

const handleMouseInteraction = ({ clientX, clientY }, reposition) => {
    const { left, top } = dom.image.output.getBoundingClientRect();
    state.currMouseX = clientX - left;
    state.currMouseY = clientY - top;

    if (reposition) {
        state.scaleCentreX = state.currMouseX;
        state.scaleCentreY = state.currMouseY;

        const { x, y } = adjustHexCentre(state.scaleCentreX, state.scaleCentreY, getEdgeLength(), getCanvasWidth(), getCanvasHeight());

        setXOffset(x);
        setYOffset(y);
    }

    redraw();
    drawHexOutline(dom.image.outputCanvas, state.currMouseX, state.currMouseY);
}

export const setupControls = () => {
    const { xCentre, yCentre, edge, outputHeight, outputWidth, exportFileName } = dom.control;
    xCentre.addEventListener('change', e => onXChanged(parseFloat(xCentre.value)));
    yCentre.addEventListener('change', e => onYChanged(parseFloat(yCentre.value)));
    edge.addEventListener('change', e => onEdgeChanged(parseFloat(edge.value)));
    outputHeight.addEventListener('change', e => onOutputHeightChanged(parseFloat(outputHeight.value)));
    outputWidth.addEventListener('change', e => onOutputWidthChanged(parseFloat(outputWidth.value)));
    exportFileName.addEventListener('change', e => {
        let enteredName = exportFileName.value || 'hexport.png';
        if (!enteredName.endsWith('.png')) {
            enteredName += '.png';
        }
        dom.control.exportButton.download = enteredName;
    });
}

const onXChanged = newXOffset => {
    const canvasWidth = getCanvasWidth();
    const edgeLength = getEdgeLength();
    const hexWidth = calcHexWidth(edgeLength);
    const sizeLocked = getSizeLocked();

    if (newXOffset < 2) {
        newXOffset = 2;
    } else if (newXOffset > canvasWidth - 2) {
        newXOffset = canvasWidth - 2;
    }

    state.scaleCentreX = newXOffset;
    const newHexLeft = newXOffset - hexWidth / 2;
    const newHexRight = newXOffset + hexWidth / 2;

    if (newHexLeft < 0) {
        if (sizeLocked) {
            setXOffset(hexWidth / 2);
        } else {
            setEdgeLength(newXOffset / (SQRT3 / 2));
        }
    } else if (newHexRight > canvasWidth) {
        if (sizeLocked) {
            setXOffset(canvasWidth - hexWidth / 2);
        } else {
            setEdgeLength((canvasWidth - newXOffset) / (SQRT3 / 2));
        }
    }

    redraw();
}

const onYChanged = newYOffset => {
    const canvasHeight = getCanvasHeight();
    const edgeLength = getEdgeLength();
    const hexHeight = calcHexHeight(edgeLength);
    const sizeLocked = getSizeLocked();

    if (newYOffset < 2) {
        newYOffset = 2;
    } else if (newYOffset > canvasHeight - 2) {
        newYOffset = canvasHeight - 2;
    }

    state.scaleCentreY = newYOffset;
    const newHexTop = newYOffset - hexHeight / 2;
    const newHexBottom = newYOffset + hexHeight / 2;

    if (newHexTop < 0) {
        if (sizeLocked) {
            setYOffset(hexHeight / 2);
        } else {
            setEdgeLength(newYOffset);
        }
    } else if (newHexBottom > canvasHeight) {
        if (sizeLocked) {
            setYOffset(canvasHeight - hexHeight / 2)
        } else {
            setEdgeLength(canvasHeight - newYOffset);
        }
    }

    redraw();

    state.scaleCentreY = getYOffset();
}

const onEdgeChanged = newEdge => {
    const canvasHeight = getCanvasHeight();
    const canvasWidth = getCanvasWidth();

    let cappedEdge = newEdge;
    if (calcHexHeight(newEdge) > canvasHeight) {
        cappedEdge = canvasHeight / 2;
    }

    if (calcHexWidth(cappedEdge) > canvasWidth) {
        cappedEdge = canvasWidth / SQRT3;
    }

    if (cappedEdge !== dom.control.edge) {
        setEdgeLength(cappedEdge);
    }

    const xOffset = getXOffset();
    const hexWidth = calcHexWidth(cappedEdge);
    if (xOffset + hexWidth / 2 > canvasWidth) {
        setXOffset(canvasWidth - hexWidth / 2);
    } else if (xOffset - hexWidth / 2 < 0) {
        setXOffset(hexWidth / 2);
    }

    const yOffset = getYOffset();
    const hexHeight = calcHexHeight(cappedEdge);
    if (yOffset + hexHeight / 2 > canvasHeight) {
        setYOffset(canvasHeight - hexHeight / 2);
    } else if (yOffset - hexHeight / 2 < 0) {
        setYOffset(hexHeight / 2)
    }

    dom.control.outputHeight.value = rounded(hexHeight);
    dom.control.outputWidth.value = rounded(hexWidth);

    if (cappedEdge === 0) {
        dom.image.output.style.cursor = 'crosshair';
    } else {
        dom.image.output.style.cursor = 'none';
    }

    redraw();
}

const onOutputHeightChanged = newHeight => {
    const newEdge = newHeight / 2;
    onEdgeChanged(newEdge);
}

const onOutputWidthChanged = newHeight => {
    const newEdge = newHeight / SQRT3;
    onEdgeChanged(newEdge);
}