import { getEdgeLength, setEdgeLength, getCanvasWidth, getCanvasHeight, setXOffset, getXOffset, setYOffset, getYOffset, getEdgeLocked } from './controls'
import dom from './dom'
import { redraw, drawHexOutline } from './draw'
import { SQRT3, adjustHexCentre, calcHexWidth, calcHexHeight } from './hex'
import state from './state'

export const setupCanvasUI = () => {
    dom.image.output.addEventListener('mousemove', ({ clientX, clientY }) => {
        const { left, top } = dom.image.output.getBoundingClientRect();
        const mouseX = clientX - left;
        const mouseY = clientY - top;

        redraw();
        drawHexOutline(dom.image.outputCanvas, mouseX, mouseY);
    });

    dom.image.output.addEventListener('click', ({ clientX, clientY }) => {
        const { left, top } = dom.image.output.getBoundingClientRect();
        const mouseX = clientX - left;
        const mouseY = clientY - top;

        state.scaleCentreX = mouseX;
        state.scaleCentreY = mouseY;

        const { x, y } = adjustHexCentre(mouseX, mouseY, getEdgeLength(), getCanvasWidth(), getCanvasHeight());

        setXOffset(x);
        setYOffset(y);

        redraw();
        drawHexOutline(dom.image.outputCanvas, mouseX, mouseY);
    });

    dom.image.output.addEventListener('mouseleave', () => {
        redraw();
    });

    dom.image.output.addEventListener('wheel', (e) => {
        e.preventDefault();

        if (getEdgeLocked()) {
            return;
        }

        let newEdgeLength = getEdgeLength() + e.deltaY * 0.5;
        if (newEdgeLength < 0) {
            newEdgeLength = 0;
        }

        setXOffset(state.scaleCentreX);
        onXChanged(state.scaleCentreX);
        setYOffset(state.scaleCentreY);
        onYChanged(state.scaleCentreY);
        setEdgeLength(newEdgeLength);
        onEdgeChanged(newEdgeLength);
    })
}

export const setupControls = () => {
    dom.control.xCentre.addEventListener('change', e => onXChanged(parseFloat(dom.control.xCentre.value)));
    dom.control.yCentre.addEventListener('change', e => onYChanged(parseFloat(dom.control.yCentre.value)));
    dom.control.edge.addEventListener('change', e => onEdgeChanged(parseFloat(dom.control.edge.value)));
}

const onXChanged = newXOffset => {
    const canvasWidth = getCanvasWidth();
    const edgeLength = getEdgeLength();
    const hexWidth = calcHexWidth(edgeLength);
    const edgeLocked = getEdgeLocked();

    console.log(newXOffset);
    console.log(canvasWidth);

    if (newXOffset < 2) {
        newXOffset = 2;
    } else if (newXOffset > canvasWidth - 2) {
        newXOffset = canvasWidth - 2;
    }

    console.log(newXOffset);

    state.scaleCentreX = newXOffset;
    const newHexLeft = newXOffset - hexWidth / 2;
    const newHexRight = newXOffset + hexWidth / 2;

    if (newHexLeft < 0) {
        if (edgeLocked) {
            setXOffset(hexWidth / 2);
        } else {
            setEdgeLength(newXOffset / (SQRT3 / 2));
        }
    } else if (newHexRight > canvasWidth) {
        if (edgeLocked) {
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
    const edgeLocked = getEdgeLocked();

    if (newYOffset < 2) {
        newYOffset = 2;
    } else if (newYOffset > canvasHeight - 2) {
        newYOffset = canvasHeight - 2;
    }

    state.scaleCentreY = newYOffset;
    const newHexTop = newYOffset - hexHeight / 2;
    const newHexBottom = newYOffset + hexHeight / 2;

    if (newHexTop < 0) {
        if (edgeLocked) {
            setYOffset(hexHeight / 2);
        } else {
            setEdgeLength(newYOffset);
        }
    } else if (newHexBottom > canvasHeight) {
        if (edgeLocked) {
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

    if (cappedEdge !== newEdge) {
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

    redraw();
}