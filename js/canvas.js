import { fabric } from "fabric"
import portfolioJson from "../portfolio.json" assert { type: "json"};

/**
 * Initialize Fabric.js canvas with initial properties.
 * @return {fabric.Canvas} fabric.Canvas
 */
export function initializeCanvas() {
   console.log("initializeCanvas()");
   const canvas = new fabric.Canvas("canvas", {
      fireRightClick: true,
      preserveObjectStacking: true,
      width: 720,
      height: 2700
   });

   if (!portfolioJson.background)
      canvas.set("backgroundColor", "rgb(255, 255, 255)")

   canvas.loadFromJSON(portfolioJson)
   canvas.requestRenderAll();
   return canvas;
}

/**
 * Resize canvas base if the window width has reached the canvas's width.
 *
 * @param {fabric.Canvas} canvas
 * @param {number} windowWidth
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 */
let scale = 1;
export function resizeCanvas(canvas, windowWidth, canvasWidth, canvasHeight) {
   // canvas width with a 80px leeway, to have margin when resized
   const canvasWidthWithLeeway = canvasWidth + 80;

   if (windowWidth >= canvasWidthWithLeeway) {
      scale = 1;
      canvas.setZoom(1);
      canvas.setWidth(canvasWidth * 1);
      canvas.setHeight(canvasHeight * 1);
      return;
   }
   console.log(`resizeCanvas(${windowWidth}, ${canvasWidth}, ${canvasHeight})`);

   scale = windowWidth / canvasWidthWithLeeway;
   canvas.setZoom(scale);
   canvas.setWidth(canvasWidth * scale);
   canvas.setHeight(canvasHeight * scale);
}
