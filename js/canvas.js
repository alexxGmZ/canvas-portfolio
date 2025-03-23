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
      height: 1200
   });

   if (!portfolioJson.background)
      canvas.set("backgroundColor", "rgb(255, 255, 255)")

   canvas.loadFromJSON(portfolioJson)
   canvas.requestRenderAll();
   return canvas;
}

