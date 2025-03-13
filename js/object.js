import { Rect, Circle, Line, IText } from "fabric"

/**
 * Generates a rectangle on the specified Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the
 * rectangle will be added.
 */
export function generateRectangle(canvas) {
   if (!canvas) return;
   console.log(`generateRectangle()`);
   const rect = new Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "rgba(0, 0, 0, 1)",
      strokeWidth: 2,
      strokeUniform: true
   });

   canvas.add(rect);
   canvas.setActiveObject(rect);
}

/**
 * Generates a circle on the specified Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the
 * circle will be added.
 */
export function generateCircle(canvas) {
   if (!canvas) return;
   console.log(`generateCircle()`);
   const circle = new Circle({
      radius: 20,
      left: 100,
      top: 100,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "rgba(0, 0, 0, 1)",
      strokeWidth: 2,
      strokeUniform: true
   })

   canvas.add(circle);
   canvas.setActiveObject(circle);
}

/**
 * Generates a line on the specified Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the line
 * will be added.
 */
export function generateLine(canvas) {
   if (!canvas) return;
   console.log(`generateLine()`);
   const line = new Line([10, 50, 100, 50], {
      stroke: "rgba(0, 0, 0, 1)",        // Line color
      strokeWidth: 2,       // Line width
   });

   canvas.add(line);
   canvas.setActiveObject(line);
}

/**
 * Generates a text object on the specified Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the text
 * will be added.
 */
export function generateTextBox(canvas) {
   if (!canvas) return;
   console.log(`generateText()`);
   const text = new IText("text", {
      left: 100,
      top: 100,
      fontSize: 30
   });

   canvas.add(text);
   canvas.setActiveObject(text);
}

/**
 * Deletes the currently selected objects from the Fabric.js canvas. If no
 * objects are selected, the function exits early. After deletion, the canvas is
 * re-rendered.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which the
 * selected objects will be deleted.
 */
export function deleteObject(canvas) {
   if (!canvas) return;
   const selectedObjects = canvas.getActiveObjects();
   if (selectedObjects.length == 0) return;
   console.log("deleteObject()");
   selectedObjects.forEach(obj => {
      canvas.remove(obj);
      console.log(`Deleted object - ${obj.type}`);
   });
   canvas.discardActiveObject();
   canvas.requestRenderAll();
}
