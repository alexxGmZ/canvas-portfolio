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

const rectangleBtn = document.getElementById("generateRectangle");
rectangleBtn.addEventListener("click", () => {
   generateRectangle(canvas);
});

const circleBtn = document.getElementById("generateCircle");
circleBtn.addEventListener("click", () => {
   generateCircle(canvas);
});

const lineBtn = document.getElementById("generateLine");
lineBtn.addEventListener("click", () => {
   generateLine(canvas);
});

const textBoxBtn = document.getElementById("generateTextBox");
textBoxBtn.addEventListener("click", () => {
   generateTextBox(canvas);
});

const importImageBtn = document.getElementById("importImage");
importImageBtn.addEventListener("click", () => {
   importImage(canvas);
});

const saveBtn = document.getElementById("saveCanvas");
saveBtn.addEventListener("click", () => {
   saveCanvasToJson(canvas);
});

const exportJpegBtn = document.getElementById("exportJPEG");
exportJpegBtn.addEventListener("click", () => {
   canvasToJpeg(canvas);
});

const exportPngBtn = document.getElementById("exportPNG");
exportPngBtn.addEventListener("click", () => {
   canvasToPng(canvas);
});

// hide context menu on click event buttons
document.addEventListener("click", () => {
   hideContextMenu();
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
