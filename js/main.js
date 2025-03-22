import {
   initializeCanvas,
   saveCanvasToJson,
   canvasToJpeg,
   canvasToPng,
} from "./canvas.js"
import {
   generateRectangle,
   generateCircle,
   generateLine,
   generateTextBox,
   importImage,
   deleteObject,
   copyObjects,
   pasteObjects,
   adjustObjectLayer,
   changeObjectColor,
} from "./object.js"
import { showContextMenu, hideContextMenu } from "./context-menu.js"

var pageX = 0;
var pageY = 0;
document.addEventListener("mousedown", (event) => {
   pageX = event.pageX;
   pageY = event.pageY;
});

const canvas = initializeCanvas();
canvas.on("mouse:up", (event) => {
   const pointer = canvas.getPointer(event.e);
   const canvasX = parseFloat(pointer.x.toFixed(3));
   const canvasY = parseFloat(pointer.y.toFixed(3));

   document.getElementById("canvasX").textContent = canvasX;
   document.getElementById("canvasY").textContent = canvasY;

   if (event.button === 3) showContextMenu([pageX, pageY]);
});

//color picker
const colorPicker = document.getElementById("colorPicker");
colorPicker.addEventListener("click", (event) => {
   if (event.target.tagName === "LI") {
      const colorType = event.target.dataset.name;
      const colorValue = event.target.dataset.value;
      changeObjectColor(canvas, colorType, colorValue);
   }
});

// hide context menu on click event buttons
document.addEventListener("click", (event) => {
   if (!colorPicker.contains(event.target)) {
      hideContextMenu();
   }
});

document.addEventListener("keydown", function(event) {
   if (event.ctrlKey) {
      // ctrl + c
      if (event.key.toLowerCase() === "c") {
         event.preventDefault();
         copyObjects(canvas);
      }

      // ctrl + v
      if (event.key.toLowerCase() === "v") {
         event.preventDefault();
         pasteObjects(canvas);
      }

      // ctrl + s
      if (event.key.toLowerCase() === "s") {
         event.preventDefault();
         saveCanvasToJson(canvas);
      }
   }
   if (event.key === "Delete") {
      event.preventDefault();
      deleteObject(canvas);
   }
});

//
// tool bar buttons
//
const rectangleBtn = document.getElementById("generateRectangle");
const circleBtn = document.getElementById("generateCircle");
const lineBtn = document.getElementById("generateLine");
const textBoxBtn = document.getElementById("generateTextBox");
const importImageBtn = document.getElementById("importImage");
const deleteObjectBtn = document.getElementById("deleteObject");
const saveBtn = document.getElementById("saveCanvas");
const exportJpegBtn = document.getElementById("exportJPEG");
const exportPngBtn = document.getElementById("exportPNG");

rectangleBtn.addEventListener("click", () => {
   generateRectangle(canvas);
});
circleBtn.addEventListener("click", () => {
   generateCircle(canvas);
});
lineBtn.addEventListener("click", () => {
   generateLine(canvas);
});
textBoxBtn.addEventListener("click", () => {
   generateTextBox(canvas);
});
importImageBtn.addEventListener("click", () => {
   importImage(canvas);
});
deleteObjectBtn.addEventListener("click", () => {
   deleteObject(canvas);
});
saveBtn.addEventListener("click", () => {
   saveCanvasToJson(canvas);
});
exportJpegBtn.addEventListener("click", () => {
   canvasToJpeg(canvas);
});
exportPngBtn.addEventListener("click", () => {
   canvasToPng(canvas);
});

//
// context menu buttons
//
const contextMenuCopyBtn = document.getElementById("contextMenuCopyBtn");
const contextMenuPasteBtn = document.getElementById("contextMenuPasteBtn");
const contextMenuDeleteBtn = document.getElementById("contextMenuDeleteBtn");
const contextMenuBringToFrontBtn = document.getElementById("contextMenuBringToFront");
const contextMenuBringForwardBtn = document.getElementById("contextMenuBringForward");
const contextMenuSendBackwardBtn = document.getElementById("contextMenuSendBackward");
const contextMenuSendToBackBtn = document.getElementById("contextMenuSendToBack");

contextMenuCopyBtn.addEventListener("click", () => {
   copyObjects(canvas);
});
contextMenuPasteBtn.addEventListener("click", () => {
   const canvasX = document.getElementById("canvasX").textContent;
   const canvasY = document.getElementById("canvasY").textContent;
   pasteObjects(canvas, [canvasX, canvasY]);
});
contextMenuDeleteBtn.addEventListener("click", () => {
   deleteObject(canvas);
});
contextMenuBringToFrontBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringToFront");
});
contextMenuBringForwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "bringForward");
});
contextMenuSendBackwardBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendBackward");
});
contextMenuSendToBackBtn.addEventListener("click", () => {
   adjustObjectLayer(canvas, "sendToBack");
});
