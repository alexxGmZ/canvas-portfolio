import { Canvas } from "fabric"

/**
 * Initialize Fabric.js canvas with initial properties.
 * @return {fabric.Canvas} fabric.Canvas
 */
export function initializeCanvas() {
   console.log("initializeCanvas()");
   const canvas = new Canvas("canvas", {
      fireRightClick: true,
      preserveObjectStacking: true,
   });
   canvas.set("backgroundColor", "rgb(255, 255, 255)").requestRenderAll();
   return canvas;
}

/**
 * Exports the current Fabric.js canvas to a JPEG format.
 *
 * @param {fabric.Canvas} canvas
 */
export function canvasToJpeg(canvas) {
   if (!canvas) return;
   console.log("canvasToJpeg()");

   const imgSrc = canvas.toDataURL({ format: "jpeg" });
   const a = document.createElement("a");

   a.href = imgSrc;
   a.download = "image.jpeg";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
}

/**
 * Exports the current Fabric.js canvas to a PNG format.
 *
 * @param {fabric.Canvas} canvas
 */
export function canvasToPng(canvas) {
   if (!canvas) return;
   console.log("canvasToPng()");

   const imgSrc = canvas.toDataURL({ format: "png" });
   const a = document.createElement("a");

   a.href = imgSrc;
   a.download = "image.png";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
}
