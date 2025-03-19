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

//
// tool bar buttons
//
const rectangleBtn = document.getElementById("generateRectangle");
const circleBtn = document.getElementById("generateCircle");
const lineBtn = document.getElementById("generateLine");
const textBoxBtn = document.getElementById("generateTextBox");
const importImageBtn = document.getElementById("importImage");
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
contextMenuPasteBtn.addEventListener("click", (event) => {
   pasteObjects(canvas, [event.pageX, event.pageY]);
});
contextMenuDeleteBtn.addEventListener("click", () => {
   deleteObject(canvas);
});

// hide context menu on click event buttons
document.addEventListener("click", () => {
   hideContextMenu();
});

document.addEventListener("mousedown", (event) => {
   console.log(event.clientX, event.clientY);
   document.getElementById("pointerX").textContent = event.pageX;
   document.getElementById("pointerY").textContent = event.pageY;
});

document.addEventListener("keydown", function(event){
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
