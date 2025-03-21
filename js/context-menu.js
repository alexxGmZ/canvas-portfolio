/**
 * Displays the context menu at the current pointer location
 *
 */
export function showContextMenu() {
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
