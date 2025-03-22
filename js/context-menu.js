/**
 * Displays the context menu at the current pointer location
 *
 * @param {fabric.Canvas} canvas
 * @param {Array<number>} pageCoordinates - [x, y]
 */
export function showContextMenu(canvas, pageCoordinates) {
   console.log(`showContextMenu([${pageCoordinates}])`);
   const activeObjects = canvas.getActiveObjects();
   const contextMenu = document.getElementById("contextMenu");

   const divider1 = document.getElementById("hr1");
   const objectLayerControls = document.getElementById("objectLayerControls");
   const divider2 = document.getElementById("hr2");
   const colorPicker = document.getElementById("colorPicker");

   contextMenu.classList.remove("hidden");
   contextMenu.classList.add("block");
   contextMenu.style.left = pageCoordinates[0] + "px";
   contextMenu.style.top = pageCoordinates[1] + "px";

   divider1.classList.add("hidden");
   objectLayerControls.classList.add("hidden");
   divider2.classList.add("hidden");
   colorPicker.classList.add("hidden");

   if (activeObjects.length > 0) {
      divider1.classList.remove("hidden");
      objectLayerControls.classList.remove("hidden");
      divider2.classList.remove("hidden");
      colorPicker.classList.remove("hidden");
   }
}

/**
 * Hides the context menu by setting its display style to "none".
 */
export function hideContextMenu() {
   const contextMenu = document.getElementById("contextMenu");
   if (contextMenu.classList.contains("hidden")) return;

   console.log("hideContextMenu()");
   contextMenu.classList.remove("block");
   contextMenu.classList.add("hidden");
}
