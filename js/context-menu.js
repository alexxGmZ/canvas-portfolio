
/**
 * Get the canvas pointer's x and y coordinates.
 * @param {fabric.Canvas} canvas
 * @returns {Array<number>} x, y coordinates
 */
export function getPointerCoordinates(canvas) {
   console.log("getPointerCoordinates()");
   canvas.on("mouse:move", (options) => {
      const pointer = canvas.getPointer(options.e);
      const pointerX = parseFloat(pointer.x.toFixed(3));
      const pointerY = parseFloat(pointer.y.toFixed(3));

      document.getElementById("pointerX").textContent = pointerX;
      document.getElementById("pointerY").textContent = pointerY;
   });
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
      if (event.button === 3) showContextMenu();
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
 */
function showContextMenu() {
   console.log("showContextMenu()");
   const pointerX = parseFloat(document.getElementById("pointerX").textContent);
   const pointerY = parseFloat(document.getElementById("pointerY").textContent);
   const browserZoomScale = Math.round(window.devicePixelRatio * 100) * 0.01;

   console.log(pointerX, pointerY, browserZoomScale);

   const ctxMenuElement = document.getElementById("contextMenu");

   ctxMenuElement.style.display = "block";
   ctxMenuElement.style.left = (pointerX + 60 * browserZoomScale) + "px";
   ctxMenuElement.style.top = (pointerY + 70 * browserZoomScale) + "px";
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
