const SQRT3 = Math.sqrt(3);
const rounded = (scalar) => Math.round(scalar*100)/100;

const calcHexHeight = (edgeLength) => edgeLength * 2;
const calcHexWidth = (edgeLength) => edgeLength * SQRT3;

const getBackgroundCanvasContext = () => document.getElementById('background').getContext("2d");
const getEdgeLength = () => parseFloat(document.getElementById('edge').value);
const setEdgeLength = (edgeLength) => document.getElementById('edge').value = rounded(edgeLength);
const getCanvasContext = () => document.getElementById('output').getContext("2d");
const getCanvasHeight = () => parseFloat(document.getElementById('output').height);
const getCanvasWidth = () => parseFloat(document.getElementById('output').width);
const getXOffset = () => parseFloat(document.getElementById('x').value);
const setXOffset = (xOffset) => document.getElementById('x').value = rounded(xOffset);
const getYOffset = () => parseFloat(document.getElementById('y').value);
const setYOffset = (yOffset) => document.getElementById('y').value = rounded(yOffset);
const getImage = () => document.getElementById('hiddenImage');
const getEdgeLocked = () => document.getElementById('edgeLocked').checked;

let scaleCentreX = 0;
let scaleCentreY = 0;

window.onload = () => {
  const outputCanvas = document.getElementById('output');
  outputCanvas.addEventListener('mousemove', ({clientX, clientY}) => {
    const {left, top} = outputCanvas.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;
    
    redraw();
    drawHexOutline(getCanvasContext(), mouseX, mouseY);
  });
  
  outputCanvas.addEventListener('click', ({clientX, clientY}) => {
    const {left, top} = outputCanvas.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;

    scaleCentreX = mouseX;
    scaleCentreY = mouseY;

    const {x, y} = adjustHexCentre(mouseX, mouseY, getEdgeLength(), getCanvasWidth(), getCanvasHeight());

    setXOffset(x);
    setYOffset(y);
    
    redraw();
    drawHexOutline(getCanvasContext(), mouseX, mouseY);
  });

  outputCanvas.addEventListener('mouseleave', () => {
    redraw();
  });

  outputCanvas.addEventListener('wheel', (e) => {
    e.preventDefault();

    if (getEdgeLocked()) {
      return;
    }

    let newEdgeLength = getEdgeLength() + e.deltaY * 0.5;
    if (newEdgeLength < 0) {
      newEdgeLength = 0;
    }

    setXOffset(scaleCentreX);
    onXChanged(scaleCentreX);
    setYOffset(scaleCentreY);
    onYChanged(scaleCentreY);
    setEdgeLength(newEdgeLength);
    onEdgeChanged(newEdgeLength);
  })

  const dropzone = document.getElementById('dropzone');

  window.addEventListener('dragenter', function(e) {
    dropzone.style.visibility = "visible";
  });

  const validFile = () => true;

  // display appropriate mouse style
  dropzone.addEventListener('dragenter', (e) => {
    if (validFile()) {  // Test that the item being dragged is a valid one
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    }
  })

  // display appropriate mouse style
  dropzone.addEventListener('dragover', (e) => {
    if (validFile()) {  // Test that the item being dragged is a valid one
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
    }
  })

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropzone.style.visibility = "hidden";
    loadImage(e.dataTransfer.files[0]);
  });

  dropzone.addEventListener('dragleave', (e) => {
    dropzone.style.visibility = "hidden";
  });

  const xInput = document.getElementById('x');
  xInput.addEventListener('change', e => onXChanged(parseFloat(xInput.value)));
  const yInput = document.getElementById('y');
  yInput.addEventListener('change', e => onYChanged(parseFloat(yInput.value)));
  const edgeInput = document.getElementById('edge');
  edgeInput.addEventListener('change', e => onEdgeChanged(parseFloat(edgeInput.value)));

  const fileSelector = document.getElementById('fileSelector');
  fileSelector.addEventListener('change', e => onFileSelected(e.target.files[0]));

  const exporter = document.getElementById('export');
  exporter.addEventListener('click', e => handleDownload(exporter));
}

function onXChanged(newXOffset) {
  const canvasWidth = getCanvasWidth();
  const edgeLength = getEdgeLength();
  const hexWidth = calcHexWidth(edgeLength);
  const edgeLocked = getEdgeLocked();

  if (newXOffset < 0) {
    newXOffset = 0;
  } else if (newXOffset > canvasWidth) {
    newXOffset = canvasWidth;
  }

  scaleCentreX = newXOffset;
  const newHexLeft = newXOffset - hexWidth / 2;
  const newHexRight = newXOffset + hexWidth / 2; 

  if (newHexLeft < 0) {
    if (edgeLocked) {
      setXOffset(hexWidth/2);
    } else {
      setEdgeLength(newXOffset / (SQRT3/2));
    }
  } else if (newHexRight > canvasWidth) {
    if (edgeLocked) {
      setXOffset(canvasWidth - hexWidth / 2);
    } else {
      setEdgeLength((canvasWidth - newXOffset) / (SQRT3/2));
    }
  }

  redraw();
}

function onYChanged(newYOffset) {
  const canvasHeight = getCanvasHeight();
  const edgeLength = getEdgeLength();
  const hexHeight = calcHexHeight(edgeLength);
  const edgeLocked = getEdgeLocked();
  
  if (newYOffset < 0) {
    newYOffset = 0;
  } else if (newYOffset > canvasHeight) {
    newYOffset = canvasHeight;
  }

  scaleCentreY = newYOffset;
  const newHexTop = newYOffset - hexHeight / 2;
  const newHexBottom = newYOffset + hexHeight / 2;

  if (newHexTop < 0) {
    if (edgeLocked) {
      setYOffset(hexHeight / 2);
    } else {
      setEdgeLength(newYOffset);
    }
  } else if (newHexBottom > canvasHeight) {
    if (edgeLocked) {
      setYOffset(canvasHeight - hexHeight / 2)
    } else {
      setEdgeLength(canvasHeight - newYOffset);
    }
  }

  redraw();

  scaleCentreY = getYOffset();
}

function onEdgeChanged(newEdge) {
  const canvasHeight = getCanvasHeight();
  const canvasWidth = getCanvasWidth();

  let cappedEdge = newEdge;
  if (calcHexHeight(newEdge) > canvasHeight) {
    cappedEdge = canvasHeight/2;
  }

  if (calcHexWidth(cappedEdge) > canvasWidth) {
    cappedEdge = canvasWidth/SQRT3;
  }

  if (cappedEdge !== newEdge) {
    setEdgeLength(cappedEdge);
  }

  const xOffset = getXOffset();
  const hexWidth = calcHexWidth(cappedEdge);
  if (xOffset + hexWidth / 2 > canvasWidth) {
    setXOffset(canvasWidth - hexWidth / 2);
  } else if (xOffset - hexWidth / 2 < 0) {
    setXOffset(hexWidth / 2);
  }

  const yOffset = getYOffset();
  const hexHeight = calcHexHeight(cappedEdge);
  if (yOffset + hexHeight / 2 > canvasHeight) {
    setYOffset(canvasHeight - hexHeight / 2);
  } else if (yOffset - hexHeight / 2 < 0) {
    setYOffset(hexHeight / 2)
  }

  redraw();
}

function redraw() {
  const ctx = getCanvasContext();
  if (getEdgeLength() === 0) {
    clear(ctx);
  } else {
    copyImageToCanvas(ctx);
    cropHex(ctx);
  }
}

function clear(ctx) {
  resetCtx(ctx);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function onFileSelected(selectedFile) {
  if (selectedFile === undefined) {
    return;
  }

  loadImage(selectedFile);
}

function loadImage(file) {
  
  const oldImg = getImage();
  if (oldImg !== null) {
    document.body.removeChild(oldImg);
  }

  const img = document.createElement('img');
  img.id = 'hiddenImage';
  img.origin = 'anonymous';
  img.src = URL.createObjectURL(file);
  img.style = "position:absolute; top: -9999px; left: -9999px;";
  img.onload = function() {
    const ctx = getCanvasContext();
    const ctx2 = getBackgroundCanvasContext();
    ctx.canvas.width = ctx2.canvas.width = this.naturalWidth;
    ctx.canvas.height = ctx2.canvas.height = this.naturalHeight;
    resetCtx(ctx2);
    ctx2.globalAlpha = 0.3;
    ctx2.drawImage(getImage(), 0, 0);

    setDefaultHex(ctx);

		redraw();
  };

  document.body.appendChild(img);
}

function copyImageToCanvas(ctx) {
  resetCtx(ctx);
  ctx.drawImage(getImage(), 0, 0);
}

function setDefaultHex(ctx) {
  const lengthFromWidth = ctx.canvas.width / SQRT3;
  const lengthFromHeight = ctx.canvas.height / 2;
  const edge = Math.min(lengthFromWidth, lengthFromHeight, 80);

  const xOffset = ctx.canvas.width / 2;
  const yOffset = ctx.canvas.height / 2;
  scaleCentreX = xOffset;
  scaleCentreY = yOffset;

  setEdgeLength(edge);
  setXOffset(xOffset);
  setYOffset(yOffset);
}

const adjustHexCentre = (x, y, edge, canvasWidth, canvasHeight) => {
  return {
    x: adjustX(x, edge, canvasWidth),
    y: adjustY(y, edge, canvasHeight)
  }
}

const adjustX = (x, edge, canvasWidth) => {
  const hexWidth = calcHexWidth(edge);

  if (x + hexWidth / 2 > canvasWidth) {
    return canvasWidth - hexWidth / 2;
  } else if (x - hexWidth / 2 < 0) {
    return hexWidth / 2;
  } else {
    return x;
  }
}

const adjustY = (y, edge, canvasHeight) => {
  const hexHeight = calcHexHeight(edge);

  if (y + hexHeight / 2 > canvasHeight) {
    return canvasHeight - hexHeight / 2;
  } else if (y - hexHeight / 2 < 0) {
    return hexHeight / 2;
  } else {
    return y
  }
}

function drawHexOutline(ctx, mouseX, mouseY) {
  const edge = getEdgeLength();
  const canvasHeight = getCanvasHeight();
  const canvasWidth = getCanvasWidth();

  const halfHexWidth = calcHexWidth(edge) / 2;
  const halfHexHeight = calcHexHeight(edge) / 2;
  const quarterHexHeight = halfHexHeight / 2;

  const {x, y} = adjustHexCentre(mouseX, mouseY, edge, canvasWidth, canvasHeight);

  resetCtx(ctx);
  ctx.beginPath();
	ctx.moveTo(x - halfHexWidth, y - quarterHexHeight);
	ctx.lineTo(x - halfHexWidth, y + quarterHexHeight);
	ctx.lineTo(x, y + halfHexHeight);
	ctx.lineTo(x + halfHexWidth, y + quarterHexHeight);
	ctx.lineTo(x + halfHexWidth, y - quarterHexHeight);
	ctx.lineTo(x, y - halfHexHeight);
	ctx.closePath();
	ctx.stroke();
}

function cropHex(ctx) {
  const edge = getEdgeLength();
  const hexCentreX = getXOffset();
  const hexCentreY = getYOffset();

  const hexWidth = calcHexWidth(edge);
  const hexHeight = calcHexHeight(edge);

  const hexTop = hexCentreY - hexHeight / 2;
  const hexBottom = hexCentreY + hexHeight / 2; 
	const hexRight = hexCentreX + hexWidth / 2;
  const hexLeft = hexCentreX - hexWidth/2;

	resetCtx(ctx);
  ctx.globalCompositeOperation = 'destination-out';

  const clipTop = Math.max(hexTop-1, 0);
  const clipBottom = Math.min(hexBottom+1, ctx.canvas.height);
  const clipHeight = clipBottom - clipTop;
  const clipLeft = Math.max(hexLeft-1, 0);
  const clipRight = Math.min(hexRight+1, ctx.canvas.width);

  if (hexTop > 0) {
    ctx.fillRect(0, 0, ctx.canvas.width, hexTop);
  }
  if (hexBottom < ctx.canvas.height) {
    ctx.fillRect(0, hexBottom, ctx.canvas.width, ctx.canvas.height - hexBottom);
  }
  if (hexLeft > 0) {
    ctx.fillRect(0, clipTop, hexLeft, clipHeight);
  }
  if (hexRight < ctx.canvas.width) {
    ctx.fillRect(hexRight, clipTop, ctx.canvas.width - hexRight, clipHeight);
  }

  ctx.beginPath();
  ctx.moveTo(clipLeft, clipTop);
	ctx.lineTo(clipLeft, hexTop + edge * 0.5 + 1);
	ctx.lineTo(hexLeft, hexTop + edge * 0.5);
	ctx.lineTo(hexCentreX, hexTop);
	ctx.lineTo(hexRight, hexTop + edge * 0.5);
	ctx.lineTo(clipRight, hexTop + edge * 0.5 + 1);
  ctx.lineTo(clipRight, clipTop);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(clipLeft, clipBottom);
	ctx.lineTo(clipLeft, hexBottom - edge * 0.5 - 1);
	ctx.lineTo(hexLeft, hexBottom - edge * 0.5);
	ctx.lineTo(hexCentreX, hexBottom);
	ctx.lineTo(hexRight, hexBottom - edge * 0.5);
	ctx.lineTo(clipRight, hexBottom - edge * 0.5 - 1);
  ctx.lineTo(clipRight, clipBottom);
  ctx.closePath();
  ctx.fill();
}

function resetCtx(ctx) {
  ctx.globalAlpha = 1.0;
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#FFFFFF";
}

function handleDownload(exporter) {
  const edge = getEdgeLength();

  if (edge === 0) {
    alert('hex too small');
    return;
  }  

  const hexWidth = calcHexWidth(edge);
  const hexHeight = calcHexHeight(edge);

  const canvas = document.createElement('canvas');
  canvas.width  = hexWidth;
  canvas.height = hexHeight;
  
  const xOffset = getXOffset();
  const yOffset = getYOffset();

  const x = xOffset - hexWidth / 2;
  const y = yOffset - hexHeight / 2;
  canvas.getContext('2d')
    .drawImage(document.getElementById('output'), x, y, hexWidth, hexHeight, 0, 0, hexWidth, hexHeight);

  exporter.href = canvas.toDataURL('image/png');
}