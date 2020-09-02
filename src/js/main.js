import { setupCanvasUI, setupControls } from './canvasUI'
import { initDom } from './dom'
import { setupImport } from './import'
import { setupExport } from './export'

window.onload = () => {
    initDom();
    setupCanvasUI();
    setupControls();
    setupImport();
    setupExport();
}