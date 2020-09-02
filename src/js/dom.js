const domReferences = {
    "canvas": {
        "background": undefined,
        "backgroundCanvas": undefined,
        "output": undefined,
        "outputCanvas": undefined
    },
    "control": {
        "xCentre": undefined,
        "yCentre": undefined,
        "edge": undefined,
        "fileSelector": undefined,
        "exportButton": undefined
    }
}

export const updateBackgroundReference = () => {
    const background = document.getElementById('background');
    domReferences.canvas.background = background;
    domReferences.canvas.backgroundCanvas = background.getContext("2d");
}

export const updateOutputReference = () => {
    const output = document.getElementById('output');
    domReferences.canvas.output = output;
    domReferences.canvas.outputCanvas = output.getContext("2d");
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

export default domReferences;