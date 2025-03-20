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
} from "./object.js"
import { hideContextMenu } from "./context-menu.js"

const canvas = initializeCanvas();
canvas.on("mouse:up", (options) => {
   const pointer = canvas.getPointer(options.e);
   const canvasX = parseFloat(pointer.x.toFixed(3));
   const canvasY = parseFloat(pointer.y.toFixed(3));

   document.getElementById("canvasX").textContent = canvasX;
   document.getElementById("canvasY").textContent = canvasY;
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

// hide context menu on click event buttons
document.addEventListener("click", () => {
   hideContextMenu();
});

document.addEventListener("mousedown", (event) => {
   document.getElementById("pageX").textContent = event.pageX;
   document.getElementById("pageY").textContent = event.pageY;
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
