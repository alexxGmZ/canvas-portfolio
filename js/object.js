import { Rect, Circle, Line, IText } from "fabric"
let _clipboard;

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
   });

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

/**
 * Copies the currently selected objects on the Fabric.js canvas to the
 * clipboard.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance from which
 * objects are copied.
 */
export function copyObjects(canvas) {
   if (!canvas) return;
   console.log("copyObjects()");
   canvas.getActiveObject().clone().then((cloned) => {
      _clipboard = cloned;
   });
}

/**
 * Pastes the objects from the clipboard onto the Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the
 * objects will be pasted.
 */
export async function pasteObjects(canvas) {
   if (!canvas) return;
   console.log("pasteObjects()");

   const clonedObj = await _clipboard.clone();
   canvas.discardActiveObject();
   clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true
   });

   if (clonedObj.type === "activeSelection") {
      clonedObj.canvas = canvas;
      clonedObj.forEachObject((object) => {
         canvas.add(object);
      });
      clonedObj.setCoords();
   }
   else {
      canvas.add(clonedObj);
   }

   _clipboard.top += 10;
   _clipboard.left += 10;
   canvas.setActiveObject(clonedObj);
   canvas.requestRenderAll();
}
