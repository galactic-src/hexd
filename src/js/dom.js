const domReferences = {
    "image": {
        "background": undefined,
        "backgroundCanvas": undefined,
        "output": undefined,
        "outputCanvas": undefined,
        "hiddenImage": undefined,
        "export": undefined,
        "exportCanvas": undefined,
        "preview": undefined,
        "previewCanvas": undefined
    },
    "control": {
        "xCentre": undefined,
        "yCentre": undefined,
        "edge": undefined,
        "outputWidth": undefined,
        "outputHeight": undefined,
        "sizeLocked": undefined,
        "fileSelector": undefined,
        "exportButton": undefined,
        "exportFileName": undefined,
    },
    "dropzone": undefined,
}

export const initDom = () => {
    const background = document.getElementById('background');
    domReferences.image.background = background;
    domReferences.image.backgroundCanvas = background.getContext("2d");

    const output = document.getElementById('output');
    domReferences.image.output = output;
    domReferences.image.outputCanvas = output.getContext("2d");

    const preview = document.getElementById('preview');
    domReferences.image.preview = preview;
    domReferences.image.previewCanvas = preview.getContext("2d");

    domReferences.control.xCentre = document.getElementById('x');
    domReferences.control.yCentre = document.getElementById('y');
    domReferences.control.edge = document.getElementById('edge');
    domReferences.control.outputWidth = document.getElementById('outputWidth');
    domReferences.control.outputHeight = document.getElementById('outputHeight');
    domReferences.control.fileSelector = document.getElementById('fileSelector');
    domReferences.control.exportButton = document.getElementById('export');
    domReferences.control.sizeLocked = document.getElementById('sizeLocked');
    domReferences.control.exportFileName = document.getElementById('exportFileName');

    domReferences.dropzone = document.getElementById('dropzone');

    const exportCanvas = document.createElement('canvas');
    domReferences.image.export = exportCanvas;
    domReferences.image.exportCanvas = exportCanvas.getContext('2d');
}

export const updateHiddenImageReference = () => {
    domReferences.image.hiddenImage = document.getElementById('hiddenImage');
}

export default domReferences;