!function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";o.r(t);const n={image:{background:void 0,backgroundCanvas:void 0,output:void 0,outputCanvas:void 0,hiddenImage:void 0,export:void 0,exportCanvas:void 0},control:{xCentre:void 0,yCentre:void 0,edge:void 0,outputWidth:void 0,outputHeight:void 0,sizeLocked:void 0,fileSelector:void 0,exportButton:void 0,exportFileName:void 0},dropzone:void 0};var a=n;const r=Math.sqrt(3),i=e=>2*e,d=e=>e*r,u=e=>Math.round(100*e)/100,l=(e,t,o,n,a)=>({x:c(e,o,n),y:s(t,o,a)}),c=(e,t,o)=>{const n=d(t);return e+n/2>o?o-n/2:e-n/2<0?n/2:e},s=(e,t,o)=>{const n=i(t);return e+n/2>o?o-n/2:e-n/2<0?n/2:e},g=()=>parseFloat(a.control.edge.value),p=e=>a.control.edge.value=u(e),m=()=>parseFloat(a.control.xCentre.value),v=e=>a.control.xCentre.value=u(e),h=()=>parseFloat(a.control.yCentre.value),f=e=>a.control.yCentre.value=u(e),C=()=>a.control.sizeLocked.checked,y=()=>parseFloat(a.image.output.height),b=()=>parseFloat(a.image.output.width),x=e=>{e.globalAlpha=1,e.globalCompositeOperation="source-over",e.lineWidth=3,e.strokeStyle="#FFFFFF"},E=()=>{const e=a.image.outputCanvas;0===g()?T(e):(L(e),I(e))},L=e=>{x(e),e.drawImage(a.image.hiddenImage,0,0)},T=e=>{x(e),e.globalCompositeOperation="destination-out",e.clearRect(0,0,e.canvas.width,e.canvas.height)},I=e=>{const t=g(),o=m(),n=h(),a=d(t),r=i(t),u=n-r/2,l=n+r/2,c=o+a/2,s=o-a/2;x(e),e.globalCompositeOperation="destination-out";const p=Math.max(u-1,0),v=Math.min(l+1,e.canvas.height),f=v-p,C=Math.max(s-1,0),y=Math.min(c+1,e.canvas.width);u>0&&e.fillRect(0,0,e.canvas.width,u),l<e.canvas.height&&e.fillRect(0,l,e.canvas.width,e.canvas.height-l),s>0&&e.fillRect(0,p,s,f),c<e.canvas.width&&e.fillRect(c,p,e.canvas.width-c,f),e.beginPath(),e.moveTo(C,p),e.lineTo(C,u+.5*t+1),e.lineTo(s,u+.5*t),e.lineTo(o,u),e.lineTo(c,u+.5*t),e.lineTo(y,u+.5*t+1),e.lineTo(y,p),e.closePath(),e.fill(),e.beginPath(),e.moveTo(C,v),e.lineTo(C,l-.5*t-1),e.lineTo(s,l-.5*t),e.lineTo(o,l),e.lineTo(c,l-.5*t),e.lineTo(y,l-.5*t-1),e.lineTo(y,v),e.closePath(),e.fill()},w=(e,t,o)=>{const n=g(),a=y(),r=b(),u=d(n)/2,c=i(n)/2,s=c/2,{x:p,y:m}=l(t,o,n,r,a);x(e),e.beginPath(),e.moveTo(p-u,m-s),e.lineTo(p-u,m+s),e.lineTo(p,m+c),e.lineTo(p+u,m+s),e.lineTo(p+u,m-s),e.lineTo(p,m-c),e.closePath(),e.stroke()};var F={scaleCentreX:0,scaleCentreY:0,outputDrag:!1,currMouseX:0,currMouseY:0};const k=({clientX:e,clientY:t},o)=>{const{left:n,top:r}=a.image.output.getBoundingClientRect();if(F.currMouseX=e-n,F.currMouseY=t-r,o){F.scaleCentreX=F.currMouseX,F.scaleCentreY=F.currMouseY;const{x:e,y:t}=l(F.scaleCentreX,F.scaleCentreY,g(),b(),y());v(e),f(t)}E(),w(a.image.outputCanvas,F.currMouseX,F.currMouseY)},B=e=>{const t=b(),o=g(),n=d(o),a=C();e<2?e=2:e>t-2&&(e=t-2),F.scaleCentreX=e;const i=e+n/2;e-n/2<0?a?v(n/2):p(e/(r/2)):i>t&&(a?v(t-n/2):p((t-e)/(r/2))),E()},M=e=>{const t=y(),o=g(),n=i(o),a=C();e<2?e=2:e>t-2&&(e=t-2),F.scaleCentreY=e;const r=e+n/2;e-n/2<0?a?f(n/2):p(e):r>t&&(a?f(t-n/2):p(t-e)),E(),F.scaleCentreY=h()},Y=e=>{const t=y(),o=b();let n=e;i(e)>t&&(n=t/2),d(n)>o&&(n=o/r),n!==a.control.edge&&p(n);const l=m(),c=d(n);l+c/2>o?v(o-c/2):l-c/2<0&&v(c/2);const s=h(),g=i(n);s+g/2>t?f(t-g/2):s-g/2<0&&f(g/2),a.control.outputHeight.value=u(g),a.control.outputWidth.value=u(c),a.image.output.style.cursor=0===n?"crosshair":"none",E()},z=e=>{Y(e/2)},X=e=>{Y(e/r)},P=e=>{void 0!==a.image.hiddenImage&&document.body.removeChild(a.image.hiddenImage);const t=document.createElement("img");t.id="hiddenImage",t.origin="anonymous",t.src=URL.createObjectURL(e),t.style="position:absolute; top: -9999px; left: -9999px;",t.onload=function(){n.image.hiddenImage=document.getElementById("hiddenImage"),a.image.output.width=a.image.background.width=this.naturalWidth,a.image.output.height=a.image.background.height=this.naturalHeight,x(a.image.backgroundCanvas),a.image.backgroundCanvas.globalAlpha=.3,a.image.backgroundCanvas.drawImage(a.image.hiddenImage,0,0),O(a.image.outputCanvas),E()},document.body.appendChild(t)},O=e=>{const t=a.image.output.width/r,o=a.image.output.height/2,n=Math.min(t,o,80),l=a.image.output.width/2,c=a.image.output.height/2;var s,g;F.scaleCentreX=l,F.scaleCentreY=c,p(n),s=i(n),a.control.outputHeight.value=u(s),g=d(n),a.control.outputWidth.value=u(g),v(l),f(c)},D=()=>{window.addEventListener("dragenter",(function(e){a.dropzone.style.visibility="visible"})),a.dropzone.addEventListener("dragleave",e=>{a.dropzone.style.visibility="hidden"}),a.dropzone.addEventListener("dragenter",e=>{e.dataTransfer.dropEffect="move",e.preventDefault()}),a.dropzone.addEventListener("dragover",e=>{e.dataTransfer.dropEffect="move",e.preventDefault()}),a.dropzone.addEventListener("drop",e=>{var t;e.preventDefault(),e.stopPropagation(),a.dropzone.style.visibility="hidden",t=e.dataTransfer.files[0],P(t)}),a.control.fileSelector.addEventListener("change",e=>{var t;void 0!==(t=e.target.files[0])&&P(t)})},S=()=>{const e=g();if(0===e)return void alert("hex too small");const t=d(e),o=i(e);a.image.export.width=t,a.image.export.height=o;const n=m()-t/2,r=h()-o/2;a.image.exportCanvas.drawImage(a.image.output,n,r,t,o,0,0,t,o),a.control.exportButton.href=a.image.export.toDataURL("image/png")};window.onload=()=>{(()=>{const e=document.getElementById("background");n.image.background=e,n.image.backgroundCanvas=e.getContext("2d");const t=document.getElementById("output");n.image.output=t,n.image.outputCanvas=t.getContext("2d"),n.control.xCentre=document.getElementById("x"),n.control.yCentre=document.getElementById("y"),n.control.edge=document.getElementById("edge"),n.control.outputWidth=document.getElementById("outputWidth"),n.control.outputHeight=document.getElementById("outputHeight"),n.control.fileSelector=document.getElementById("fileSelector"),n.control.exportButton=document.getElementById("export"),n.control.sizeLocked=document.getElementById("sizeLocked"),n.control.exportFileName=document.getElementById("exportFileName"),n.dropzone=document.getElementById("dropzone");const o=document.createElement("canvas");n.image.export=o,n.image.exportCanvas=o.getContext("2d")})(),document.body.addEventListener("mouseup",e=>F.outputDrag=!1),document.body.addEventListener("mouseleave",e=>F.outputDrag=!1),a.image.output.addEventListener("mousedown",e=>F.outputDrag=!0),a.image.output.addEventListener("mousemove",e=>k(e,F.outputDrag)),a.image.output.addEventListener("click",e=>k(e,!0)),a.image.output.addEventListener("mouseleave",()=>{E()}),a.image.output.addEventListener("wheel",e=>{if(e.preventDefault(),C())return;let t=g()+.5*e.deltaY;t<0&&(t=0),v(F.scaleCentreX),B(F.scaleCentreX),f(F.scaleCentreY),M(F.scaleCentreY),p(t),Y(t),w(a.image.outputCanvas,F.scaleCentreX,F.scaleCentreY)}),(()=>{const{xCentre:e,yCentre:t,edge:o,outputHeight:n,outputWidth:r,exportFileName:i}=a.control;e.addEventListener("change",t=>B(parseFloat(e.value))),t.addEventListener("change",e=>M(parseFloat(t.value))),o.addEventListener("change",e=>Y(parseFloat(o.value))),n.addEventListener("change",e=>z(parseFloat(n.value))),r.addEventListener("change",e=>X(parseFloat(r.value))),i.addEventListener("change",e=>{let t=i.value||"hexport.png";t.endsWith(".png")||(t+=".png"),a.control.exportButton.download=t})})(),D(),a.control.exportButton.addEventListener("click",e=>S())}}]);
//# sourceMappingURL=bundle.js.map