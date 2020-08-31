const rounded = (scalar) => Math.round(scalar * 100) / 100;

export const getEdgeLength = () => parseFloat(document.getElementById('edge').value);
export const setEdgeLength = (edgeLength) => document.getElementById('edge').value = rounded(edgeLength);
export const getXOffset = () => parseFloat(document.getElementById('x').value);
export const setXOffset = (xOffset) => document.getElementById('x').value = rounded(xOffset);
export const getYOffset = () => parseFloat(document.getElementById('y').value);
export const setYOffset = (yOffset) => document.getElementById('y').value = rounded(yOffset);
export const getEdgeLocked = () => document.getElementById('edgeLocked').checked;