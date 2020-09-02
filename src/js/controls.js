import dom from './dom'

const rounded = (scalar) => Math.round(scalar * 100) / 100;

export const getEdgeLength = () => parseFloat(dom.control.edge.value);
export const setEdgeLength = edgeLength => dom.control.edge.value = rounded(edgeLength);
export const getXOffset = () => parseFloat(dom.control.xCentre.value);
export const setXOffset = xOffset => dom.control.xCentre.value = rounded(xOffset);
export const getYOffset = () => parseFloat(dom.control.yCentre.value);
export const setYOffset = yOffset => dom.control.yCentre.value = rounded(yOffset);
export const getEdgeLocked = () => document.getElementById('edgeLocked').checked;