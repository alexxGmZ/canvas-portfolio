import { Canvas } from "fabric"
import {
   generateRectangle,
   generateCircle,
   generateLine,
   generateTextBox,
   deleteObject,
} from "./object.js"
import { canvasToJpeg, canvasToPng } from "./canvas.js"

const canvas = new Canvas("canvas", {
   fireRightClick: true,
   preserveObjectStacking: true,
});
canvas.set("backgroundColor", "rgb(255, 255, 255)").requestRenderAll();

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
