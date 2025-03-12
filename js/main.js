import { Canvas } from "fabric"
import { generateRectangle, generateCircle, generateLine, generateTextBox } from "./object.js"

const canvas = new Canvas("canvas", {
   fireRightClick: true,
   preserveObjectStacking: true,
});

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
