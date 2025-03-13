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
   deleteObject,
} from "./object.js"

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

const saveBtn = document.getElementById("saveCanvas");
saveBtn.addEventListener("click", () => {
   saveCanvasToJson(canvas);
});

const exportJpegBtn = document.getElementById("exportJPEG");
exportJpegBtn.addEventListener("click", () => {
   canvasToJpeg(canvas);
})

const exportPngBtn = document.getElementById("exportPNG");
exportPngBtn.addEventListener("click", () => {
   canvasToPng(canvas);
})

document.addEventListener("keydown", function(event){
   if (event.key === "Delete") {
      event.preventDefault();
      deleteObject(canvas);
   }
})
