import { setEdgeLength, setXOffset, setYOffset, setOutputHeight, setOutputWidth } from './controls'
import dom, { updateHiddenImageReference } from './dom'
import { resetCtx, redraw } from './draw'
import { SQRT3, calcHexHeight, calcHexWidth } from './hex'
import state from './state'

const onFileDropped = selectedFile => loadImage(selectedFile);

export const onFileSelected = selectedFile => {
    if (selectedFile === undefined) {
        return;
    }

    loadImage(selectedFile);
}

const loadImage = file => {
    if (dom.image.hiddenImage !== undefined) {
        document.body.removeChild(dom.image.hiddenImage);
    }

    const img = document.createElement('img');
    img.id = 'hiddenImage';
    img.origin = 'anonymous';
    img.src = URL.createObjectURL(file);
    img.style = "position:absolute; top: -9999px; left: -9999px;";
    img.onload = function() {
        updateHiddenImageReference();
        dom.image.output.width = dom.image.background.width = this.naturalWidth;
        dom.image.output.height = dom.image.background.height = this.naturalHeight;

        resetCtx(dom.image.backgroundCanvas);
        dom.image.backgroundCanvas.globalAlpha = 0.3;
        dom.image.backgroundCanvas.drawImage(dom.image.hiddenImage, 0, 0);

        setDefaultHex(dom.image.outputCanvas);

        redraw();
    };

    document.body.appendChild(img);
}

const setDefaultHex = ctx => {
    const lengthFromWidth = dom.image.output.width / SQRT3;
    const lengthFromHeight = dom.image.output.height / 2;
    const edge = Math.min(lengthFromWidth, lengthFromHeight, 80);

    const xOffset = dom.image.output.width / 2;
    const yOffset = dom.image.output.height / 2;
    state.scaleCentreX = xOffset;
    state.scaleCentreY = yOffset;

    setEdgeLength(edge);
    setOutputHeight(calcHexHeight(edge));
    setOutputWidth(calcHexWidth(edge));

    setXOffset(xOffset);
    setYOffset(yOffset);
}

const validFile = () => true;

export const setupImport = () => {
    window.addEventListener('dragenter', function(e) {
        dom.dropzone.style.visibility = "visible";
    });

    dom.dropzone.addEventListener('dragleave', (e) => {
        dom.dropzone.style.visibility = "hidden";
    });

    dom.dropzone.addEventListener('dragenter', (e) => {
        if (validFile()) {
            e.dataTransfer.dropEffect = 'move';
            e.preventDefault();
        }
    })

    dom.dropzone.addEventListener('dragover', (e) => {
        if (validFile()) {
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

    dom.control.fileSelector.addEventListener('change', e => onFileSelected(e.target.files[0]));
}