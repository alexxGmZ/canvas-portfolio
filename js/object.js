import { fabric } from "fabric"
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
   const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 50,
      height: 50,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "#0C0A09",
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
   const circle = new fabric.Circle({
      radius: 20,
      left: 100,
      top: 100,
      fill: "rgba(255, 255, 255, 0)",
      stroke: "#0C0A09",
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
   const line = new fabric.Line([10, 50, 100, 50], {
      stroke: "#0C0A09",        // Line color
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
   const text = new fabric.IText("text", {
      left: 100,
      top: 100,
      fontSize: 30
   });

   canvas.add(text);
   canvas.setActiveObject(text);
}

let importImageEventListener;
/**
 * Imports an image from the user's file system and adds it to the Fabric.js
 * canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the
 * imported image will be added.
 */
export function importImage(canvas) {
   if (!canvas) return;
   console.log("importImage()");

   const inputElement = document.getElementById("importImageInput");

   if (importImageEventListener)
      inputElement.removeEventListener("change", importImageEventListener);

   importImageEventListener = function(event) {
      console.log("importImage().uploadImageEventListener()");

      const file = event.target.files[0];
      const fileType = file.type;
      const url = URL.createObjectURL(file);

      if (fileType === "image/png" || fileType === "image/jpeg") {
         fabric.Image.fromURL(url, (img) => {
            img.set({ left: 10, top: 10 });
            canvas.add(img);
         });
      }
      else if (fileType === "image/svg+xml") {
         fabric.loadSVGFromURL(url, (objects, options) => {
            const svg = fabric.util.groupSVGElements(objects, options);
            svg.scaleToWidth(180);
            svg.scaleToHeight(180);
            canvas.add(svg);
         });
      }
   }

   inputElement.click();
   inputElement.addEventListener("change", importImageEventListener);
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
   canvas.getActiveObject().clone((cloned) => {
      _clipboard = cloned;
   });
}

/**
 * Pastes the objects from the clipboard onto the Fabric.js canvas.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance where the
 * objects will be pasted.
 * @param {Array<number>} pointerCoords - x, y pointer coordinates.
 */
export function pasteObjects(canvas, pointerCoords) {
   if (!canvas || !_clipboard) return;
   console.log(`pasteObjects(${pointerCoords})`);

   _clipboard.clone(function(clonedObj) {
      canvas.discardActiveObject();

      if (pointerCoords) {
         clonedObj.set({
            left: parseInt(pointerCoords[0]),
            top: parseInt(pointerCoords[1]),
            evented: true,
         });
      }
      else {
         clonedObj.set({
            left: clonedObj.left + 10,
            top: clonedObj.top + 10,
            evented: true,
         });
      }

      if (clonedObj.type === "activeSelection") {
         // active selection needs a reference to the canvas.
         clonedObj.canvas = canvas;
         clonedObj.forEachObject((obj) => {
            return canvas.add(obj);
         });
         // this should solve the unselectability
         clonedObj.setCoords();
      }
      else canvas.add(clonedObj);

      _clipboard.top += 10;
      _clipboard.left += 10;
      canvas.setActiveObject(clonedObj);
      canvas.requestRenderAll();
   });
}

/**
 * Adjusts the layer position of the selected objects on the canvas based on the
 * specified action.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance containing the
 * objects.
 * @param {string} action - The action to perform on the selected objects. Valid
 * actions are "bringToFront", "bringForward", "sendBackward", and "sendToBack".
 */
export function adjustObjectLayer(canvas, action) {
   console.log(`adjustObjectLayer(${action})`);
   const selectedObjects = canvas.getActiveObjects();
   const actions = {
      bringToFront: canvas.bringToFront,
      bringForward: canvas.bringForward,
      sendBackward: canvas.sendBackwards,
      sendToBack: canvas.sendToBack
   };

   selectedObjects.forEach((object) => {
      const objectAction = actions[action];
      if (objectAction) objectAction.call(canvas, object);
   });

   canvas.requestRenderAll();
}

/**
 * Change active object's fill or stroke color.
 *
 * @param {fabric.Canvas} canvas
 * @param {String} colorType - "stroke" or "fill"
 * @param {String} colorValue
 */
export function changeObjectColor(canvas, colorType, colorValue) {
   if (!canvas) return;
   console.log(`changeObjectColor(${colorType}, ${colorValue})`);

   const activeObject = canvas.getActiveObjects();
   activeObject.forEach((object) => {
      object.set({ [colorType]: colorValue });
   });
   canvas.renderAll();
}
