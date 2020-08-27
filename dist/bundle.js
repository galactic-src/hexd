!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=Math.sqrt(3),o=e=>Math.round(100*e)/100,a=e=>2*e,i=e=>e*n,l=()=>parseFloat(document.getElementById("edge").value),d=e=>document.getElementById("edge").value=o(e),c=()=>document.getElementById("output").getContext("2d"),r=()=>parseFloat(document.getElementById("output").height),s=()=>parseFloat(document.getElementById("output").width),u=()=>parseFloat(document.getElementById("x").value),m=e=>document.getElementById("x").value=o(e),g=()=>parseFloat(document.getElementById("y").value),v=e=>document.getElementById("y").value=o(e),f=()=>document.getElementById("hiddenImage"),h=()=>document.getElementById("edgeLocked").checked;let p=0,y=0;function E(e){const t=s(),o=l(),a=i(o),c=h();e<0?e=0:e>t&&(e=t),p=e;const r=e+a/2;e-a/2<0?c?m(a/2):d(e/(n/2)):r>t&&(c?m(t-a/2):d((t-e)/(n/2))),T()}function b(e){const t=r(),n=l(),o=a(n),i=h();e<0?e=0:e>t&&(e=t),y=e;const c=e+o/2;e-o/2<0?i?v(o/2):d(e):c>t&&(i?v(t-o/2):d(t-e)),T(),y=g()}function I(e){const t=r(),o=s();let l=e;a(e)>t&&(l=t/2),i(l)>o&&(l=o/n),l!==e&&d(l);const c=u(),f=i(l);c+f/2>o?m(o-f/2):c-f/2<0&&m(f/2);const h=g(),p=a(l);h+p/2>t?v(t-p/2):h-p/2<0&&v(p/2),T()}function T(){const e=c();0===l()?function(e){P(e),e.globalCompositeOperation="destination-out",e.clearRect(0,0,e.canvas.width,e.canvas.height)}(e):(function(e){P(e),e.drawImage(f(),0,0)}(e),function(e){const t=l(),n=u(),o=g(),d=i(t),c=a(t),r=o-c/2,s=o+c/2,m=n+d/2,v=n-d/2;P(e),e.globalCompositeOperation="destination-out";const f=Math.max(r-1,0),h=Math.min(s+1,e.canvas.height),p=h-f,y=Math.max(v-1,0),E=Math.min(m+1,e.canvas.width);r>0&&e.fillRect(0,0,e.canvas.width,r);s<e.canvas.height&&e.fillRect(0,s,e.canvas.width,e.canvas.height-s);v>0&&e.fillRect(0,f,v,p);m<e.canvas.width&&e.fillRect(m,f,e.canvas.width-m,p);e.beginPath(),e.moveTo(y,f),e.lineTo(y,r+.5*t+1),e.lineTo(v,r+.5*t),e.lineTo(n,r),e.lineTo(m,r+.5*t),e.lineTo(E,r+.5*t+1),e.lineTo(E,f),e.closePath(),e.fill(),e.beginPath(),e.moveTo(y,h),e.lineTo(y,s-.5*t-1),e.lineTo(v,s-.5*t),e.lineTo(n,s),e.lineTo(m,s-.5*t),e.lineTo(E,s-.5*t-1),e.lineTo(E,h),e.closePath(),e.fill()}(e))}function B(e){const t=f();null!==t&&document.body.removeChild(t);const o=document.createElement("img");o.id="hiddenImage",o.origin="anonymous",o.src=URL.createObjectURL(e),o.style="position:absolute; top: -9999px; left: -9999px;",o.onload=function(){const e=c(),t=document.getElementById("background").getContext("2d");e.canvas.width=t.canvas.width=this.naturalWidth,e.canvas.height=t.canvas.height=this.naturalHeight,P(t),t.globalAlpha=.3,t.drawImage(f(),0,0),function(e){const t=e.canvas.width/n,o=e.canvas.height/2,a=Math.min(t,o,80),i=e.canvas.width/2,l=e.canvas.height/2;p=i,y=l,d(a),m(i),v(l)}(e),T()},document.body.appendChild(o)}window.onload=()=>{const e=document.getElementById("output");e.addEventListener("mousemove",({clientX:t,clientY:n})=>{const{left:o,top:a}=e.getBoundingClientRect(),i=t-o,l=n-a;T(),F(c(),i,l)}),e.addEventListener("click",({clientX:t,clientY:n})=>{const{left:o,top:a}=e.getBoundingClientRect(),i=t-o,d=n-a;p=i,y=d;const{x:u,y:g}=w(i,d,l(),s(),r());m(u),v(g),T(),F(c(),i,d)}),e.addEventListener("mouseleave",()=>{T()}),e.addEventListener("wheel",e=>{if(e.preventDefault(),h())return;let t=l()+.5*e.deltaY;t<0&&(t=0),m(p),E(p),v(y),b(y),d(t),I(t)});const t=document.getElementById("dropzone");window.addEventListener("dragenter",(function(e){t.style.visibility="visible"}));t.addEventListener("dragenter",e=>{e.dataTransfer.dropEffect="move",e.preventDefault()}),t.addEventListener("dragover",e=>{e.dataTransfer.dropEffect="move",e.preventDefault()}),t.addEventListener("drop",e=>{e.preventDefault(),e.stopPropagation(),t.style.visibility="hidden",B(e.dataTransfer.files[0])}),t.addEventListener("dragleave",e=>{t.style.visibility="hidden"});const n=document.getElementById("x");n.addEventListener("change",e=>E(parseFloat(n.value)));const o=document.getElementById("y");o.addEventListener("change",e=>b(parseFloat(o.value)));const f=document.getElementById("edge");f.addEventListener("change",e=>I(parseFloat(f.value)));document.getElementById("fileSelector").addEventListener("change",e=>function(e){if(void 0===e)return;B(e)}(e.target.files[0]));const x=document.getElementById("export");x.addEventListener("click",e=>function(e){const t=l();if(0===t)return void alert("hex too small");const n=i(t),o=a(t),d=document.createElement("canvas");d.width=n,d.height=o;const c=u(),r=g(),s=c-n/2,m=r-o/2;d.getContext("2d").drawImage(document.getElementById("output"),s,m,n,o,0,0,n,o),e.href=d.toDataURL("image/png")}(x))};const w=(e,t,n,o,a)=>({x:x(e,n,o),y:L(t,n,a)}),x=(e,t,n)=>{const o=i(t);return e+o/2>n?n-o/2:e-o/2<0?o/2:e},L=(e,t,n)=>{const o=a(t);return e+o/2>n?n-o/2:e-o/2<0?o/2:e};function F(e,t,n){const o=l(),d=r(),c=s(),u=i(o)/2,m=a(o)/2,g=m/2,{x:v,y:f}=w(t,n,o,c,d);P(e),e.beginPath(),e.moveTo(v-u,f-g),e.lineTo(v-u,f+g),e.lineTo(v,f+m),e.lineTo(v+u,f+g),e.lineTo(v+u,f-g),e.lineTo(v,f-m),e.closePath(),e.stroke()}function P(e){e.globalAlpha=1,e.globalCompositeOperation="source-over",e.lineWidth=3,e.strokeStyle="#FFFFFF"}}]);