import dom from './dom'
import { rounded } from './hex'


export const getEdgeLength = () => parseFloat(dom.control.edge.value);
export const setEdgeLength = edgeLength => dom.control.edge.value = rounded(edgeLength);
export const getOutputHeight = () => parseFloat(dom.control.outputHeight);
export const setOutputHeight = height => dom.control.outputHeight.value = rounded(height);
export const getOutputWidth = () => parseFloat(dom.control.outputWidth);
export const setOutputWidth = width => dom.control.outputWidth.value = rounded(width);
export const getXOffset = () => parseFloat(dom.control.xCentre.value);
export const setXOffset = xOffset => dom.control.xCentre.value = rounded(xOffset);
export const getYOffset = () => parseFloat(dom.control.yCentre.value);
export const setYOffset = yOffset => dom.control.yCentre.value = rounded(yOffset);
export const getSizeLocked = () => dom.control.sizeLocked.checked;

export const getCanvasHeight = () => parseFloat(dom.image.output.height);
export const getCanvasWidth = () => parseFloat(dom.image.output.width);