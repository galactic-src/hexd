const domReferences = {
    "canvas": {
        "background": undefined,
        "backgroundCanvas": undefined
    }
}

export const updateBackgroundReference = () => {
    const background = document.getElementById('background');
    domReferences.canvas.background = background;
    domReferences.canvas.backgroundCanvas = background.getContext("2d");
}

export default domReferences;