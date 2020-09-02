import { SQRT3, calcHexHeight, calcHexWidth, adjustHexCentre } from './hex'
import { getEdgeLength, setEdgeLength, getXOffset, setXOffset, getYOffset, setYOffset, getEdgeLocked, getCanvasHeight, getCanvasWidth } from './controls'
import { onFileDropped, onFileSelected } from './import'
import state from './state'
import dom, {
    updateBackgroundReference,
    updateOutputReference,
    updatePositionReferences,
    updateEdgeReference,
    updateFileSelectorReference,
    updateExportButtonReference,
    updateEdgeLockedReference,
    updateHiddenImageReference,
    updateDropzoneReference,
    setupExportCanvas
} from './dom'
import { drawHexOutline, redraw } from './draw'

window.onload = () => {
    updateBackgroundReference();
    updateOutputReference();
    updatePositionReferences();
    updateEdgeReference();
    updateFileSelectorReference();
    updateExportButtonReference();
    updateEdgeLockedReference();
    updateDropzoneReference();
    setupExportCanvas();

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

    window.addEventListener('dragenter', function(e) {
        dom.dropzone.style.visibility = "visible";
    });

    const validFile = () => true;

    // display appropriate mouse style
    dom.dropzone.addEventListener('dragenter', (e) => {
        if (validFile()) { // Test that the item being dragged is a valid one
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
        }
    })

    // display appropriate mouse style
    dom.dropzone.addEventListener('dragover', (e) => {
        if (validFile()) { // Test that the item being dragged is a valid one
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
        }
    })

    dom.dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dom.dropzone.style.visibility = "hidden";
        onFileDropped(e.dataTransfer.files[0]);
    });

    dom.dropzone.addEventListener('dragleave', (e) => {
        dom.dropzone.style.visibility = "hidden";
    });

    dom.control.xCentre.addEventListener('change', e => onXChanged(parseFloat(dom.control.xCentre.value)));
    dom.control.yCentre.addEventListener('change', e => onYChanged(parseFloat(dom.control.yCentre.value)));
    dom.control.edge.addEventListener('change', e => onEdgeChanged(parseFloat(dom.control.edge.value)));
    dom.control.fileSelector.addEventListener('change', e => onFileSelected(e.target.files[0]));
    dom.control.exportButton.addEventListener('click', e => handleDownload(dom.control.exportButton));
}

function onXChanged(newXOffset) {
    const canvasWidth = getCanvasWidth();
    const edgeLength = getEdgeLength();
    const hexWidth = calcHexWidth(edgeLength);
    const edgeLocked = getEdgeLocked();

    if (newXOffset < 0) {
        newXOffset = 0;
    } else if (newXOffset > canvasWidth) {
        newXOffset = canvasWidth;
    }

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

function onYChanged(newYOffset) {
    const canvasHeight = getCanvasHeight();
    const edgeLength = getEdgeLength();
    const hexHeight = calcHexHeight(edgeLength);
    const edgeLocked = getEdgeLocked();

    if (newYOffset < 0) {
        newYOffset = 0;
    } else if (newYOffset > canvasHeight) {
        newYOffset = canvasHeight;
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

function onEdgeChanged(newEdge) {
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

function handleDownload(exporter) {
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

    exporter.href = dom.image.export.toDataURL('image/png');
}