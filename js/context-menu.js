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
   const contextMenu = document.getElementById("contextMenu");
   const pointerX = parseFloat(document.getElementById("pageX").textContent);
   const pointerY = parseFloat(document.getElementById("pageY").textContent);

   contextMenu.classList.remove("hidden");
   contextMenu.classList.add("block");
   contextMenu.style.left = pointerX + "px";
   contextMenu.style.top = pointerY + "px";
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
