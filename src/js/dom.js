const domReferences = {
    "image": {
        "background": undefined,
        "backgroundCanvas": undefined,
        "output": undefined,
        "outputCanvas": undefined,
        "hiddenImage": undefined
    },
    "control": {
        "xCentre": undefined,
        "yCentre": undefined,
        "edge": undefined,
        "edgeLocked": undefined,
        "fileSelector": undefined,
        "exportButton": undefined
    }
}

export const updateBackgroundReference = () => {
    const background = document.getElementById('background');
    domReferences.image.background = background;
    domReferences.image.backgroundCanvas = background.getContext("2d");
}

export const updateOutputReference = () => {
    const output = document.getElementById('output');
    domReferences.image.output = output;
    domReferences.image.outputCanvas = output.getContext("2d");
}

export const updatePositionReferences = () => {
    domReferences.control.xCentre = document.getElementById('x');
    domReferences.control.yCentre = document.getElementById('y');
}

export const updateEdgeReference = () => {
    domReferences.control.edge = document.getElementById('edge');
}

export const updateFileSelectorReference = () => {
    domReferences.control.fileSelector = document.getElementById('fileSelector');
}

export const updateExportButtonReference = () => {
    domReferences.control.exportButton = document.getElementById('export');
}

export const updateEdgeLockedReference = () => {
    domReferences.control.edgeLocked = document.getElementById('edgeLocked');
}

export const updateHiddenImageReference = () => {
    domReferences.image.hiddenImage = document.getElementById('hiddenImage');
}

export default domReferences;