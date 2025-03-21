/**
 * Displays the context menu at the current pointer location
 *
   * @param {Array<number>} pageCoordinates - Page's (x, y) coordinates.
 */
export function showContextMenu(pageCoordinates) {
   console.log(`showContextMenu([${pageCoordinates}])`);
   const contextMenu = document.getElementById("contextMenu");

   contextMenu.classList.remove("hidden");
   contextMenu.classList.add("block");
   contextMenu.style.left = pageCoordinates[0] + "px";
   contextMenu.style.top = pageCoordinates[1] + "px";
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
