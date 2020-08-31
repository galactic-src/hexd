export const resetCtx = (ctx) => {
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#FFFFFF";
}