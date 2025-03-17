
/**
 * Get the canvas pointer's x and y coordinates.
 * @param {fabric.Canvas} canvas
 * @returns {Array<number>} x, y coordinates
 */
function getPointerCoordinates(canvas) {
   console.log("getPointerCoordinates()");
   const pointer = canvas.getPointer();
   let x = parseFloat(pointer.x.toFixed(3));;
   let y = parseFloat(pointer.y.toFixed(3));;

   return [x, y];
}

/**
 * Toggles the context menu visibility on canvas mouse events.
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to monitor for
 * mouse events.
 */
export function pointerContextMenu(canvas) {
   if (!canvas) return;
   console.log("pointerContextMenu()");

   canvas.on("mouse:up", (event) => {
      // if the canvas or canvas objects are right clicked
      if (event.button === 3) showContextMenu(canvas);
   });

   canvas.on("mouse:down", () => {
      console.log("canvas mouse:down event");
      // hide context menu when the mouse is pressed down
      hideContextMenu();
   });
}

/**
 * Displays the context menu at the current pointer location
 *
 * @param {fabric.Canvas} canvas - The Fabric.js canvas instance to use for
 * displaying the context menu
 */
function showContextMenu(canvas) {
   console.log("showContextMenu()");
   const [pointerX, pointerY] = getPointerCoordinates(canvas);
   const browserZoomScale = Math.round(window.devicePixelRatio * 100) * 0.01;

   console.log(pointerX, pointerY, browserZoomScale);

   const ctxMenuElement = document.getElementById("contextMenu");

   ctxMenuElement.style.display = "block";
   contextMenu.style.left = (pointerX + 60) + "px";
   contextMenu.style.top = (pointerY + 70) + "px";
}

/**
 * Hides the context menu by setting its display style to "none".
 */
export function hideContextMenu() {
   const contextMenu = document.getElementById("contextMenu");
   if (contextMenu.style.display === "none") return;

   console.log("hideContextMenu()");
   contextMenu.style.display = "none";
}
