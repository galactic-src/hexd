const domReferences = {
    "image": {
        "background": undefined,
        "backgroundCanvas": undefined,
        "output": undefined,
        "outputCanvas": undefined,
        "hiddenImage": undefined,
        "export": undefined,
        "exportCanvas": undefined
    },
    "control": {
        "xCentre": undefined,
        "yCentre": undefined,
        "edge": undefined,
        "edgeLocked": undefined,
        "fileSelector": undefined,
        "exportButton": undefined
    },
    "dropzone": undefined
}

export const initDom = () => {
    const background = document.getElementById('background');
    domReferences.image.background = background;
    domReferences.image.backgroundCanvas = background.getContext("2d");

    const output = document.getElementById('output');
    domReferences.image.output = output;
    domReferences.image.outputCanvas = output.getContext("2d");

    domReferences.control.xCentre = document.getElementById('x');
    domReferences.control.yCentre = document.getElementById('y');
    domReferences.control.edge = document.getElementById('edge');
    domReferences.control.fileSelector = document.getElementById('fileSelector');
    domReferences.control.exportButton = document.getElementById('export');
    domReferences.control.edgeLocked = document.getElementById('edgeLocked');
    domReferences.dropzone = document.getElementById('dropzone');

    const exportCanvas = document.createElement('canvas');
    domReferences.image.export = exportCanvas;
    domReferences.image.exportCanvas = exportCanvas.getContext('2d');
}

export const updateHiddenImageReference = () => {
    domReferences.image.hiddenImage = document.getElementById('hiddenImage');
}

export default domReferences;