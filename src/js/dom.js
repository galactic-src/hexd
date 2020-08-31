const domReferences = {
    "canvas": {
        "background": undefined,
        "backgroundCanvas": undefined,
        "output": undefined,
        "outputCanvas": undefined
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

export default domReferences;