/**
 * Save canvas to JSON format
 *
 * @param {fabric.Canvas} canvas
 */
export function saveCanvasToJson(canvas) {
   if (!canvas) return;
   console.log("saveCanvasToJson()");

   const canvasObjects = canvas.toObject();
   const jsonedCanvasObjects = JSON.stringify(canvasObjects, null, 2);
   const blob = new Blob([jsonedCanvasObjects], { type: "application/json" });
   const url = URL.createObjectURL(blob);
   const a = document.createElement("a");

   a.href = url;
   a.download = "canvas.json";
   a.click();
   URL.revokeObjectURL(url);
}

/**
 * Exports the current Fabric.js canvas to a JPEG format.
 *
 * @param {fabric.Canvas} canvas
 */
export function canvasToJpeg(canvas) {
   if (!canvas) return;
   console.log("canvasToJpeg()");

   const imgSrc = canvas.toDataURL({ format: "jpeg" });
   const a = document.createElement("a");

   a.href = imgSrc;
   a.download = "image.jpeg";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
}

/**
 * Exports the current Fabric.js canvas to a PNG format.
 *
 * @param {fabric.Canvas} canvas
 */
export function canvasToPng(canvas) {
   if (!canvas) return;
   console.log("canvasToPng()");

   const imgSrc = canvas.toDataURL({ format: "png" });
   const a = document.createElement("a");

   a.href = imgSrc;
   a.download = "image.png";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
}
