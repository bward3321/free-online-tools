// ---------- TYPES ----------

export interface ProcessedResult {
  blob: Blob;
  width: number;
  height: number;
  processingTime: number;
}

// ---------- HELPERS ----------

function canvasToBlob(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create blob"));
      },
      mimeType,
      quality
    );
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = src;
  });
}

function getMimeType(format: string): string {
  switch (format) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

export function getFormatFromMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  if (mime.includes("svg")) return "svg";
  return "jpg";
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ---------- MULTI-STEP DOWNSCALE (better quality than single-step) ----------

function drawImageToCanvas(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  method: "lanczos" | "bilinear" | "nearest" = "lanczos"
): HTMLCanvasElement {
  if (method === "nearest") {
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    return canvas;
  }

  // For lanczos/bilinear: multi-step downscale for quality
  if (method === "bilinear" || img.naturalWidth <= targetWidth * 2) {
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    return canvas;
  }

  // Lanczos-like: step down in halves
  let currentWidth = img.naturalWidth;
  let currentHeight = img.naturalHeight;
  let currentSource: HTMLCanvasElement | HTMLImageElement = img;

  while (currentWidth / 2 > targetWidth && currentHeight / 2 > targetHeight) {
    const stepWidth = Math.round(currentWidth / 2);
    const stepHeight = Math.round(currentHeight / 2);
    const stepCanvas = document.createElement("canvas");
    stepCanvas.width = stepWidth;
    stepCanvas.height = stepHeight;
    const ctx = stepCanvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(currentSource, 0, 0, stepWidth, stepHeight);
    currentSource = stepCanvas;
    currentWidth = stepWidth;
    currentHeight = stepHeight;
  }

  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = targetWidth;
  finalCanvas.height = targetHeight;
  const ctx = finalCanvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(currentSource, 0, 0, targetWidth, targetHeight);
  return finalCanvas;
}

// ---------- COMPRESS TO TARGET SIZE ----------

export async function compressToTargetSize(
  img: HTMLImageElement,
  targetBytes: number,
  outputFormat: string = "image/jpeg"
): Promise<ProcessedResult> {
  const start = performance.now();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  // PNG is lossless; we can't quality-compress it, so convert to JPEG
  const format =
    outputFormat === "image/png" ? "image/jpeg" : outputFormat;

  // Check if already small enough at max quality
  const maxBlob = await canvasToBlob(canvas, format, 1.0);
  if (maxBlob.size <= targetBytes) {
    return {
      blob: maxBlob,
      width: canvas.width,
      height: canvas.height,
      processingTime: performance.now() - start,
    };
  }

  // Check if even minimum quality is too large
  const minBlob = await canvasToBlob(canvas, format, 0.01);
  if (minBlob.size > targetBytes) {
    // Need to also resize down
    const scaleFactor = Math.sqrt(targetBytes / minBlob.size) * 0.9;
    const newWidth = Math.round(canvas.width * scaleFactor);
    const newHeight = Math.round(canvas.height * scaleFactor);
    const smallCanvas = drawImageToCanvas(img, newWidth, newHeight);
    return compressCanvasToTarget(smallCanvas, targetBytes, format, start);
  }

  return compressCanvasToTarget(canvas, targetBytes, format, start);
}

async function compressCanvasToTarget(
  canvas: HTMLCanvasElement,
  targetBytes: number,
  format: string,
  startTime: number
): Promise<ProcessedResult> {
  let low = 0.01;
  let high = 1.0;
  let bestBlob: Blob | null = null;
  let bestDiff = Infinity;

  for (let i = 0; i < 10; i++) {
    const mid = (low + high) / 2;
    const blob = await canvasToBlob(canvas, format, mid);
    const diff = Math.abs(blob.size - targetBytes);

    if (diff < bestDiff) {
      bestDiff = diff;
      bestBlob = blob;
    }

    if (blob.size > targetBytes) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return {
    blob: bestBlob!,
    width: canvas.width,
    height: canvas.height,
    processingTime: performance.now() - startTime,
  };
}

// ---------- COMPRESS WITH QUALITY ----------

export async function compressWithQuality(
  img: HTMLImageElement,
  quality: number,
  outputFormat: string = "image/jpeg"
): Promise<ProcessedResult> {
  const start = performance.now();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const blob = await canvasToBlob(canvas, outputFormat, quality / 100);
  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    processingTime: performance.now() - start,
  };
}

// ---------- RESIZE IMAGE ----------

export async function resizeImage(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  method: "lanczos" | "bilinear" | "nearest",
  outputFormat: string,
  quality: number = 0.85
): Promise<ProcessedResult> {
  const start = performance.now();
  const canvas = drawImageToCanvas(img, targetWidth, targetHeight, method);

  const isPng = outputFormat === "image/png";
  const blob = await canvasToBlob(
    canvas,
    outputFormat,
    isPng ? undefined : quality
  );

  return {
    blob,
    width: targetWidth,
    height: targetHeight,
    processingTime: performance.now() - start,
  };
}

// ---------- CONVERT IMAGE ----------

export async function convertImage(
  img: HTMLImageElement,
  outputFormat: string,
  quality: number = 0.85,
  reduceColors: boolean = false
): Promise<ProcessedResult> {
  const start = performance.now();
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d")!;

  // If converting to JPEG, fill background with white (no transparency)
  if (outputFormat === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.drawImage(img, 0, 0);

  if (reduceColors && outputFormat === "image/png") {
    // Simple color reduction by reducing precision
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.round(data[i] / 32) * 32;
      data[i + 1] = Math.round(data[i + 1] / 32) * 32;
      data[i + 2] = Math.round(data[i + 2] / 32) * 32;
    }
    ctx.putImageData(imageData, 0, 0);
  }

  const isPng = outputFormat === "image/png";
  const blob = await canvasToBlob(
    canvas,
    outputFormat,
    isPng ? undefined : quality / 100
  );

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    processingTime: performance.now() - start,
  };
}

// ---------- CROP IMAGE ----------

export async function cropImage(
  img: HTMLImageElement,
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number,
  rotation: number,
  flipH: boolean,
  flipV: boolean,
  outputFormat: string,
  quality: number = 0.92
): Promise<ProcessedResult> {
  const start = performance.now();
  const canvas = document.createElement("canvas");
  canvas.width = cropWidth;
  canvas.height = cropHeight;
  const ctx = canvas.getContext("2d")!;

  if (outputFormat === "image/jpeg") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  ctx.save();

  // Apply transforms
  if (rotation !== 0) {
    if (rotation === 90 || rotation === -270) {
      canvas.width = cropHeight;
      canvas.height = cropWidth;
      ctx.translate(canvas.width, 0);
      ctx.rotate((Math.PI / 180) * 90);
    } else if (rotation === 180 || rotation === -180) {
      ctx.translate(canvas.width, canvas.height);
      ctx.rotate(Math.PI);
    } else if (rotation === 270 || rotation === -90) {
      canvas.width = cropHeight;
      canvas.height = cropWidth;
      ctx.translate(0, canvas.height);
      ctx.rotate((Math.PI / 180) * -90);
    }
  }

  if (flipH) {
    ctx.translate(cropWidth, 0);
    ctx.scale(-1, 1);
  }
  if (flipV) {
    ctx.translate(0, cropHeight);
    ctx.scale(1, -1);
  }

  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  ctx.restore();

  const isPng = outputFormat === "image/png";
  const blob = await canvasToBlob(
    canvas,
    outputFormat,
    isPng ? undefined : quality
  );

  return {
    blob,
    width: canvas.width,
    height: canvas.height,
    processingTime: performance.now() - start,
  };
}

// ---------- CREATE ZIP ----------

export async function createZip(
  files: { name: string; blob: Blob }[]
): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();

  for (const file of files) {
    zip.file(file.name, file.blob);
  }

  return zip.generateAsync({ type: "blob" });
}

// ---------- GET OUTPUT FILENAME ----------

export function getOutputFilename(
  originalName: string,
  suffix: string,
  newFormat?: string
): string {
  const lastDot = originalName.lastIndexOf(".");
  const baseName = lastDot > 0 ? originalName.substring(0, lastDot) : originalName;
  const ext = newFormat || (lastDot > 0 ? originalName.substring(lastDot + 1) : "jpg");
  return `${baseName}-${suffix}.${ext}`;
}

// ---------- DETECT WEBP SUPPORT ----------

let webpSupported: boolean | null = null;

export async function isWebPSupported(): Promise<boolean> {
  if (webpSupported !== null) return webpSupported;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const blob = await canvasToBlob(canvas, "image/webp", 0.5);
    webpSupported = blob.type === "image/webp";
  } catch {
    webpSupported = false;
  }
  return webpSupported;
}

// ---------- GET OUTPUT MIME ----------

export function getOutputMime(
  format: "original" | "jpg" | "png" | "webp",
  originalMime: string
): string {
  if (format === "original") return originalMime === "image/gif" || originalMime === "image/svg+xml" ? "image/png" : originalMime;
  return getMimeType(format);
}

export function getExtFromMime(mime: string): string {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  return "jpg";
}
