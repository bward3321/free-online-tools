"use client";

import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  compressToTargetSize,
  compressWithQuality,
  resizeImage,
  convertImage,
  cropImage,
  createZip,
  formatFileSize,
  getOutputFilename,
  getOutputMime,
  getExtFromMime,
  isWebPSupported,
} from "../image-processing";

// ---------- TYPES ----------

type TabType = "compress" | "resize" | "convert" | "crop";
type CompressMode = "target" | "quality";
type ResizeMode = "dimensions" | "percentage" | "presets";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  originalMime: string;
  processedBlob?: Blob;
  processedUrl?: string;
  processedSize?: number;
  processedWidth?: number;
  processedHeight?: number;
  status: "loading" | "ready" | "processing" | "done" | "error" | "skipped";
  error?: string;
  processingTime?: number;
}

interface ToolkitProps {
  defaultTab?: TabType;
  defaultTargetKB?: number;
  title: string;
  subtitle: string;
}

// ---------- CONSTANTS ----------

const SIZE_PRESETS = [
  { kb: 50, label: "50 KB", desc: "ID photos" },
  { kb: 100, label: "100 KB", desc: "Passport / Visa" },
  { kb: 200, label: "200 KB", desc: "Job applications" },
  { kb: 500, label: "500 KB", desc: "Email friendly" },
  { kb: 1024, label: "1 MB", desc: "Website upload" },
];

const SOCIAL_PRESETS = [
  { label: "Instagram Post", w: 1080, h: 1080 },
  { label: "Instagram Story", w: 1080, h: 1920 },
  { label: "Facebook Cover", w: 820, h: 312 },
  { label: "Twitter/X Header", w: 1500, h: 500 },
  { label: "LinkedIn Banner", w: 1584, h: 396 },
  { label: "YouTube Thumbnail", w: 1280, h: 720 },
  { label: "Passport Photo", w: 600, h: 600 },
];

const ASPECT_RATIOS = [
  { label: "Free", value: "free" },
  { label: "1:1", value: "1:1" },
  { label: "4:3", value: "4:3" },
  { label: "16:9", value: "16:9" },
  { label: "3:2", value: "3:2" },
  { label: "2:3", value: "2:3" },
  { label: "Passport", value: "35:45" },
] as const;

// ---------- DARK MODE TOGGLE ----------

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg"
      style={{ color: "var(--text-muted)" }}
      aria-label="Toggle dark mode"
    >
      {dark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
}

// ---------- PRIVACY BADGE ----------

function PrivacyBadge() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          backgroundColor: "var(--color-accent)" + "12",
          color: "var(--color-accent)",
        }}
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        aria-label="Privacy information"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        100% Private &mdash; Images never leave your browser
      </button>
      {expanded && (
        <div
          className="absolute top-full left-0 mt-2 p-4 rounded-xl text-sm leading-relaxed max-w-sm z-50 shadow-lg border"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text-muted)",
          }}
        >
          All processing uses your browser&apos;s built-in Canvas API. Your files never leave your device, are never stored anywhere, and are never seen by anyone. Close this tab and they&apos;re gone.
        </div>
      )}
    </div>
  );
}

// ---------- UPLOAD ZONE ----------

function UploadZone({
  onFiles,
  imageCount,
  totalSize,
  compact,
}: {
  onFiles: (files: FileList | File[]) => void;
  imageCount: number;
  totalSize: number;
  compact: boolean;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
    },
    [onFiles]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) onFiles(e.target.files);
      e.target.value = "";
    },
    [onFiles]
  );

  if (compact) {
    return (
      <div className="mb-6">
        <div
          className="flex items-center justify-between p-4 rounded-xl border-2 border-dashed cursor-pointer hover:opacity-80"
          style={{
            borderColor: dragOver ? "var(--color-accent)" : "var(--border)",
            backgroundColor: dragOver ? "var(--color-accent)" + "08" : "var(--surface-alt)",
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}>
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              Add more images
            </span>
          </div>
          <span className="text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
            {imageCount} image{imageCount !== 1 ? "s" : ""} &bull; {formatFileSize(totalSize)} total
          </span>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div
        className="relative rounded-2xl border-2 border-dashed p-12 md:p-16 text-center cursor-pointer"
        style={{
          borderColor: dragOver ? "var(--color-accent)" : "var(--border)",
          backgroundColor: dragOver ? "var(--color-accent)" + "08" : "var(--surface)",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "var(--color-accent)" + "12" }}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ color: "var(--color-accent)" }}>
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-semibold mb-1" style={{ color: "var(--text)" }}>
              Drop images here or click to browse
            </p>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Supports JPG, PNG, WebP, GIF, SVG &bull; Up to 50 images &bull; No size limit
            </p>
          </div>
          <button
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ backgroundColor: "var(--color-accent)" }}
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current?.click();
            }}
          >
            Browse Files
          </button>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
        capture={undefined}
      />
    </div>
  );
}

// ---------- SPLIT VIEW COMPARISON ----------

function SplitView({
  originalUrl,
  processedUrl,
  originalSize,
  processedSize,
  width,
  height,
}: {
  originalUrl: string;
  processedUrl: string;
  originalSize: number;
  processedSize: number;
  width: number;
  height: number;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateSlider(clientX);
    };
    const handleUp = () => {
      draggingRef.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [updateSlider]);

  const aspect = width && height ? width / height : 16 / 9;
  const maxH = 500;

  return (
    <div
      className="rounded-2xl border overflow-hidden mb-6"
      style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="text-sm font-medium" style={{ color: "var(--text)" }}>Before / After Comparison</span>
        <div className="flex gap-4 text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
          <span>Original: {formatFileSize(originalSize)}</span>
          <span>Compressed: {formatFileSize(processedSize)}</span>
        </div>
      </div>
      <div
        ref={containerRef}
        className="relative select-none overflow-hidden"
        style={{ maxHeight: maxH, aspectRatio: aspect }}
        onMouseDown={(e) => {
          draggingRef.current = true;
          updateSlider(e.clientX);
        }}
        onTouchStart={(e) => {
          draggingRef.current = true;
          updateSlider(e.touches[0].clientX);
        }}
      >
        {/* Original image (full) */}
        <img
          src={originalUrl}
          alt="Original"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
          style={{ backgroundColor: "var(--surface-alt)" }}
        />
        {/* Processed image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={processedUrl}
            alt="Processed"
            className="w-full h-full object-contain"
            draggable={false}
            style={{
              width: containerRef.current ? containerRef.current.offsetWidth : "100%",
              maxWidth: "none",
              backgroundColor: "var(--surface-alt)",
            }}
          />
        </div>
        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 z-10"
          style={{ left: `${sliderPos}%`, backgroundColor: "white", boxShadow: "0 0 4px rgba(0,0,0,0.5)" }}
        />
        {/* Slider handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-20 cursor-ew-resize"
          style={{
            left: `${sliderPos}%`,
            backgroundColor: "white",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
            <polyline points="8 4 4 12 8 20" /><polyline points="16 4 20 12 16 20" />
          </svg>
        </div>
        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded font-semibold text-sm z-10" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "white" }}>
          Processed
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded font-semibold text-sm z-10" style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "white" }}>
          Original
        </div>
      </div>
    </div>
  );
}

// ---------- CROP EDITOR ----------

function CropEditor({
  image,
  onCrop,
}: {
  image: ImageFile;
  onCrop: (x: number, y: number, w: number, h: number, rotation: number, flipH: boolean, flipV: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [aspectRatio, setAspectRatio] = useState("free");
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);

  // Crop rect in image coordinates
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
    w: image.originalWidth,
    h: image.originalHeight,
  });

  // Display scale
  const [displayScale, setDisplayScale] = useState(1);
  const dragging = useRef<null | "move" | "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w">(null);
  const dragStart = useRef({ mx: 0, my: 0, crop: { x: 0, y: 0, w: 0, h: 0 } });

  // Reset crop when image changes
  useEffect(() => {
    setCrop({ x: 0, y: 0, w: image.originalWidth, h: image.originalHeight });
    setRotation(0);
    setFlipH(false);
    setFlipV(false);
  }, [image.id, image.originalWidth, image.originalHeight]);

  // Calculate display scale
  useEffect(() => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const maxH = 500;
    const scaleW = containerWidth / image.originalWidth;
    const scaleH = maxH / image.originalHeight;
    setDisplayScale(Math.min(scaleW, scaleH, 1));
  }, [image.originalWidth, image.originalHeight]);

  const applyAspectRatio = useCallback(
    (ratio: string) => {
      setAspectRatio(ratio);
      if (ratio === "free") return;

      let rw = 1, rh = 1;
      if (ratio === "1:1") { rw = 1; rh = 1; }
      else if (ratio === "4:3") { rw = 4; rh = 3; }
      else if (ratio === "16:9") { rw = 16; rh = 9; }
      else if (ratio === "3:2") { rw = 3; rh = 2; }
      else if (ratio === "2:3") { rw = 2; rh = 3; }
      else if (ratio === "35:45") { rw = 35; rh = 45; }

      const imgW = image.originalWidth;
      const imgH = image.originalHeight;
      let newW = imgW;
      let newH = Math.round(imgW * rh / rw);
      if (newH > imgH) {
        newH = imgH;
        newW = Math.round(imgH * rw / rh);
      }
      const newX = Math.round((imgW - newW) / 2);
      const newY = Math.round((imgH - newH) / 2);
      setCrop({ x: newX, y: newY, w: newW, h: newH });
    },
    [image.originalWidth, image.originalHeight]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: typeof dragging.current) => {
      e.preventDefault();
      e.stopPropagation();
      dragging.current = handle;
      dragStart.current = { mx: e.clientX, my: e.clientY, crop: { ...crop } };
    },
    [crop]
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      const dx = (e.clientX - dragStart.current.mx) / displayScale;
      const dy = (e.clientY - dragStart.current.my) / displayScale;
      const orig = dragStart.current.crop;
      const imgW = image.originalWidth;
      const imgH = image.originalHeight;

      if (dragging.current === "move") {
        let nx = Math.round(orig.x + dx);
        let ny = Math.round(orig.y + dy);
        nx = Math.max(0, Math.min(imgW - orig.w, nx));
        ny = Math.max(0, Math.min(imgH - orig.h, ny));
        setCrop({ ...orig, x: nx, y: ny });
      } else {
        let { x, y, w, h } = orig;
        const d = dragging.current;

        if (d.includes("w")) { x = orig.x + dx; w = orig.w - dx; }
        if (d.includes("e")) { w = orig.w + dx; }
        if (d.includes("n")) { y = orig.y + dy; h = orig.h - dy; }
        if (d.includes("s")) { h = orig.h + dy; }

        // Constrain
        if (w < 20) { w = 20; if (d.includes("w")) x = orig.x + orig.w - 20; }
        if (h < 20) { h = 20; if (d.includes("n")) y = orig.y + orig.h - 20; }
        x = Math.max(0, Math.round(x));
        y = Math.max(0, Math.round(y));
        w = Math.min(Math.round(w), imgW - x);
        h = Math.min(Math.round(h), imgH - y);

        setCrop({ x, y, w, h });
      }
    };
    const handleMouseUp = () => { dragging.current = null; };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [displayScale, image.originalWidth, image.originalHeight]);

  const handleApplyCrop = () => {
    onCrop(crop.x, crop.y, crop.w, crop.h, rotation, flipH, flipV);
  };

  const dispW = image.originalWidth * displayScale;
  const dispH = image.originalHeight * displayScale;

  return (
    <div>
      {/* Crop canvas */}
      <div
        className="rounded-2xl border overflow-hidden mb-4"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div
          ref={containerRef}
          className="relative mx-auto select-none"
          style={{ width: dispW, height: dispH }}
        >
          <img
            src={image.originalUrl}
            alt="Crop preview"
            className="absolute inset-0"
            style={{
              width: dispW,
              height: dispH,
              transform: `${flipH ? "scaleX(-1)" : ""} ${flipV ? "scaleY(-1)" : ""} rotate(${rotation}deg)`,
            }}
            draggable={false}
          />
          {/* Dark overlay - top */}
          <div
            className="absolute left-0 right-0 top-0"
            style={{ height: crop.y * displayScale, backgroundColor: "rgba(0,0,0,0.5)" }}
          />
          {/* Dark overlay - bottom */}
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ top: (crop.y + crop.h) * displayScale, backgroundColor: "rgba(0,0,0,0.5)" }}
          />
          {/* Dark overlay - left */}
          <div
            className="absolute left-0"
            style={{
              top: crop.y * displayScale,
              height: crop.h * displayScale,
              width: crop.x * displayScale,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
          {/* Dark overlay - right */}
          <div
            className="absolute right-0"
            style={{
              top: crop.y * displayScale,
              height: crop.h * displayScale,
              left: (crop.x + crop.w) * displayScale,
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          />
          {/* Crop area border */}
          <div
            className="absolute border-2 border-white cursor-move"
            style={{
              left: crop.x * displayScale,
              top: crop.y * displayScale,
              width: crop.w * displayScale,
              height: crop.h * displayScale,
              boxShadow: "0 0 0 9999px transparent",
            }}
            onMouseDown={(e) => handleMouseDown(e, "move")}
          >
            {/* Rule of thirds lines */}
            <div className="absolute left-1/3 top-0 bottom-0 w-px opacity-40" style={{ backgroundColor: "white" }} />
            <div className="absolute left-2/3 top-0 bottom-0 w-px opacity-40" style={{ backgroundColor: "white" }} />
            <div className="absolute top-1/3 left-0 right-0 h-px opacity-40" style={{ backgroundColor: "white" }} />
            <div className="absolute top-2/3 left-0 right-0 h-px opacity-40" style={{ backgroundColor: "white" }} />

            {/* Corner handles */}
            {(["nw", "ne", "sw", "se"] as const).map((corner) => (
              <div
                key={corner}
                className="absolute w-5 h-5 bg-white rounded-sm cursor-pointer z-10"
                style={{
                  ...(corner.includes("n") ? { top: -4 } : { bottom: -4 }),
                  ...(corner.includes("w") ? { left: -4 } : { right: -4 }),
                  cursor:
                    corner === "nw" || corner === "se"
                      ? "nwse-resize"
                      : "nesw-resize",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
                onMouseDown={(e) => handleMouseDown(e, corner)}
              />
            ))}
            {/* Edge handles */}
            {(["n", "s", "e", "w"] as const).map((edge) => (
              <div
                key={edge}
                className="absolute bg-white rounded-sm z-10"
                style={{
                  ...(edge === "n" || edge === "s"
                    ? { left: "50%", transform: "translateX(-50%)", width: 30, height: 5, cursor: "ns-resize" }
                    : { top: "50%", transform: "translateY(-50%)", width: 5, height: 30, cursor: "ew-resize" }),
                  ...(edge === "n" ? { top: -3 } : {}),
                  ...(edge === "s" ? { bottom: -3 } : {}),
                  ...(edge === "w" ? { left: -3 } : {}),
                  ...(edge === "e" ? { right: -3 } : {}),
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
                onMouseDown={(e) => handleMouseDown(e, edge)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Crop controls */}
      <div
        className="rounded-2xl border p-6 space-y-5"
        style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
      >
        {/* Aspect ratio presets */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>Aspect Ratio</label>
          <div className="flex flex-wrap gap-2">
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.value}
                onClick={() => applyAspectRatio(ar.value)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: aspectRatio === ar.value ? "var(--color-accent)" : "var(--surface-alt)",
                  color: aspectRatio === ar.value ? "white" : "var(--text-muted)",
                }}
              >
                {ar.label}
              </button>
            ))}
          </div>
        </div>

        {/* Crop dimensions */}
        <div className="flex items-center gap-4 text-sm" style={{ color: "var(--text-muted)" }}>
          <span>Selection: <strong style={{ color: "var(--text)" }}>{crop.w} &times; {crop.h} px</strong></span>
          <span>{Math.round((crop.w * crop.h) / (image.originalWidth * image.originalHeight) * 100)}% of original area</span>
        </div>

        {/* Transform controls */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
            Rotate Left
          </button>
          <button
            onClick={() => setRotation((r) => (r + 90) % 360)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "scaleX(-1)" }}><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg>
            Rotate Right
          </button>
          <button
            onClick={() => setFlipH((f) => !f)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border"
            style={{
              borderColor: flipH ? "var(--color-accent)" : "var(--border)",
              color: flipH ? "var(--color-accent)" : "var(--text)",
              backgroundColor: flipH ? "var(--color-accent)" + "12" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h3" /><path d="M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3" /><line x1="12" y1="1" x2="12" y2="23" strokeDasharray="2 2" /></svg>
            Flip H
          </button>
          <button
            onClick={() => setFlipV((f) => !f)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border"
            style={{
              borderColor: flipV ? "var(--color-accent)" : "var(--border)",
              color: flipV ? "var(--color-accent)" : "var(--text)",
              backgroundColor: flipV ? "var(--color-accent)" + "12" : "transparent",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: "rotate(90deg)" }}><path d="M8 3H5a2 2 0 00-2 2v14c0 1.1.9 2 2 2h3" /><path d="M16 3h3a2 2 0 012 2v14a2 2 0 01-2 2h-3" /><line x1="12" y1="1" x2="12" y2="23" strokeDasharray="2 2" /></svg>
            Flip V
          </button>
        </div>

        <button
          onClick={handleApplyCrop}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Apply Crop
        </button>
      </div>
    </div>
  );
}

// ---------- IMAGE CARD ----------

function ImageCard({
  image,
  isSelected,
  onSelect,
  onRemove,
  onDownload,
}: {
  image: ImageFile;
  isSelected: boolean;
  onSelect: () => void;
  onRemove: () => void;
  onDownload: () => void;
}) {
  const savings = image.processedSize
    ? Math.round((1 - image.processedSize / image.originalSize) * 100)
    : 0;

  return (
    <div
      className="rounded-xl border overflow-hidden cursor-pointer group"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: isSelected ? "var(--color-accent)" : "var(--border)",
        borderWidth: isSelected ? 2 : 1,
      }}
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="relative aspect-square overflow-hidden" style={{ backgroundColor: "var(--surface-alt)" }}>
        <img
          src={image.processedUrl || image.originalUrl}
          alt={image.name}
          className="w-full h-full object-cover"
        />
        {/* Status overlay */}
        {image.status === "processing" && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {image.status === "done" && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#22c55e" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg>
          </div>
        )}
        {image.status === "skipped" && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#f59e0b" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="0.5" fill="white" /></svg>
          </div>
        )}
        {image.status === "error" && (
          <div className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ef4444" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </div>
        )}
        {/* Remove button */}
        <button
          className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label="Remove image"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
      </div>
      {/* Info */}
      <div className="p-3">
        <p className="font-medium text-sm truncate mb-1" style={{ color: "var(--text)" }}>
          {image.name}
        </p>
        <div className="flex items-center justify-between text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
          <span>{formatFileSize(image.originalSize)}</span>
          {image.status === "done" && image.processedSize != null && (
            <span className="flex items-center gap-1">
              <span>&rarr; {formatFileSize(image.processedSize)}</span>
              {savings > 0 && (
                <span className="font-semibold" style={{ color: "#22c55e" }}>
                  &darr;{savings}%
                </span>
              )}
            </span>
          )}
          {image.status === "skipped" && (
            <span style={{ color: "#f59e0b" }}>Already small</span>
          )}
        </div>
        {image.status === "done" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="mt-2 w-full py-1.5 rounded-lg font-medium text-sm border hover:opacity-80"
            style={{
              borderColor: "var(--color-accent)",
              color: "var(--color-accent)",
            }}
          >
            Download
          </button>
        )}
      </div>
    </div>
  );
}

// ---------- SAVINGS COUNTER ----------

function SavingsCounter({ totalOriginal, totalProcessed }: { totalOriginal: number; totalProcessed: number }) {
  const [displaySaved, setDisplaySaved] = useState(0);
  const saved = totalOriginal - totalProcessed;
  const pct = totalOriginal > 0 ? Math.round((saved / totalOriginal) * 100) : 0;

  useEffect(() => {
    if (saved <= 0) { setDisplaySaved(0); return; }
    const duration = 1000;
    const steps = 30;
    const increment = saved / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        setDisplaySaved(saved);
        clearInterval(timer);
      } else {
        setDisplaySaved(Math.round(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [saved]);

  if (saved <= 0) return null;

  return (
    <div
      className="text-center py-4 px-6 rounded-xl mb-6"
      style={{ backgroundColor: "var(--color-accent)" + "12" }}
    >
      <span className="text-lg font-bold" style={{ color: "var(--color-accent)" }}>
        You saved {formatFileSize(displaySaved)} &mdash; that&apos;s {pct}% smaller!
      </span>
    </div>
  );
}

// ---------- PRO TIPS ----------

function getProTips(tab: TabType): string[] {
  switch (tab) {
    case "compress":
      return [
        "For web images, 80% JPEG quality is usually indistinguishable from 100% but 3-5x smaller.",
        "Stripping EXIF data can reduce file size by 50-100KB and removes location/camera info for privacy.",
        "WebP format produces files 25-35% smaller than JPEG at the same visual quality.",
        "Most government portals and job applications require photos under 100-200KB. Use our Target Size mode to hit the exact requirement.",
      ];
    case "resize":
      return [
        "For web use, images wider than 1920px are rarely necessary. Resize to 1200-1600px for fast loading.",
        "Instagram posts look best at 1080\u00d71080. Stories should be 1080\u00d71920.",
        "Always resize DOWN, not up. Enlarging images reduces quality.",
        "Use the Lanczos method for highest quality downsizing. It\u2019s slower but produces sharper results.",
      ];
    case "convert":
      return [
        "Use JPG for photographs, PNG for graphics/screenshots with transparency, WebP for everything on modern websites.",
        "Converting PNG to JPG can reduce file size by 80%+ but you\u2019ll lose transparency.",
        "WebP is supported by 97%+ of browsers and is the recommended format for web use in 2026.",
        "PNG is lossless \u2014 converting JPG to PNG won\u2019t improve quality, it will just increase file size.",
      ];
    case "crop":
      return [
        "Standard passport photos are 35mm \u00d7 45mm (roughly 7:9 ratio).",
        "Use 16:9 for YouTube thumbnails and video covers.",
        "Cropping removes pixels permanently \u2014 work with a copy if you want to keep the original.",
        "Use the rule-of-thirds grid lines to compose your crop for more visually appealing results.",
      ];
  }
}

// ---------- MAIN COMPONENT ----------

export default function ImageToolkit({
  defaultTab = "compress",
  defaultTargetKB,
  title,
  subtitle,
}: ToolkitProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);

  // Compress settings
  const [compressMode, setCompressMode] = useState<CompressMode>("target");
  const [targetSizeKB, setTargetSizeKB] = useState(defaultTargetKB || 0);
  const [quality, setQuality] = useState(80);
  const [keepExif] = useState(false);
  const [outputFormat, setOutputFormat] = useState<"original" | "jpg" | "png" | "webp">("original");

  // Resize settings
  const [resizeMode, setResizeMode] = useState<ResizeMode>("dimensions");
  const [resizeWidth, setResizeWidth] = useState(0);
  const [resizeHeight, setResizeHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resizePct, setResizePct] = useState(50);
  const [resizeMethod, setResizeMethod] = useState<"lanczos" | "bilinear" | "nearest">("lanczos");

  // Convert settings
  const [convertFormat, setConvertFormat] = useState<"jpg" | "png" | "webp">("webp");
  const [convertQuality, setConvertQuality] = useState(85);
  const [reduceColors, setReduceColors] = useState(false);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [webpOk, setWebpOk] = useState(true);

  useEffect(() => {
    isWebPSupported().then(setWebpOk);
  }, []);

  const selectedImage = useMemo(
    () => images.find((img) => img.id === selectedImageId) || images[0] || null,
    [images, selectedImageId]
  );

  // ---------- FILE HANDLING ----------

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(
      (f) => f.type.startsWith("image/") || f.name.toLowerCase().endsWith(".heic")
    );
    if (files.length === 0) return;

    const newImages: ImageFile[] = [];

    for (const file of files) {
      const id = crypto.randomUUID();
      const url = URL.createObjectURL(file);

      const imgFile: ImageFile = {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        originalUrl: url,
        originalWidth: 0,
        originalHeight: 0,
        originalMime: file.type || "image/jpeg",
        status: "loading",
      };
      newImages.push(imgFile);
    }

    setImages((prev) => [...prev, ...newImages]);

    // Load image dimensions
    for (const imgFile of newImages) {
      try {
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => {
            setImages((prev) =>
              prev.map((f) =>
                f.id === imgFile.id
                  ? { ...f, originalWidth: img.naturalWidth, originalHeight: img.naturalHeight, status: "ready" as const }
                  : f
              )
            );
            resolve();
          };
          img.onerror = () => reject(new Error("Failed to load"));
          img.src = imgFile.originalUrl;
        });
      } catch {
        setImages((prev) =>
          prev.map((f) =>
            f.id === imgFile.id ? { ...f, status: "error" as const, error: "Failed to load image" } : f
          )
        );
      }
    }

    // Select first if none selected
    if (!selectedImageId && newImages.length > 0) {
      setSelectedImageId(newImages[0].id);
    }
  }, [selectedImageId]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => {
      const img = prev.find((f) => f.id === id);
      if (img) {
        URL.revokeObjectURL(img.originalUrl);
        if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
      }
      return prev.filter((f) => f.id !== id);
    });
    if (selectedImageId === id) {
      setSelectedImageId(null);
    }
  }, [selectedImageId]);

  const clearAll = useCallback(() => {
    images.forEach((img) => {
      URL.revokeObjectURL(img.originalUrl);
      if (img.processedUrl) URL.revokeObjectURL(img.processedUrl);
    });
    setImages([]);
    setSelectedImageId(null);
  }, [images]);

  // ---------- PROCESSING ----------

  const processImages = useCallback(async () => {
    const readyImages = images.filter((img) => img.status === "ready" || img.status === "done" || img.status === "skipped");
    if (readyImages.length === 0) return;
    setIsProcessing(true);

    // Mark all as processing
    setImages((prev) =>
      prev.map((img) =>
        img.status === "ready" || img.status === "done" || img.status === "skipped"
          ? { ...img, status: "processing" as const, processedBlob: undefined, processedUrl: img.processedUrl ? (URL.revokeObjectURL(img.processedUrl), undefined) : undefined, processedSize: undefined }
          : img
      )
    );

    const concurrency = 3;
    let idx = 0;

    const processOne = async (imgFile: ImageFile) => {
      try {
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Load failed"));
          img.src = imgFile.originalUrl;
        });

        let result;
        const outMime = getOutputMime(outputFormat, imgFile.originalMime);

        if (activeTab === "compress") {
          if (compressMode === "target" && targetSizeKB > 0) {
            const targetBytes = targetSizeKB * 1024;
            // Check if already under target
            if (imgFile.originalSize <= targetBytes) {
              setImages((prev) =>
                prev.map((f) =>
                  f.id === imgFile.id
                    ? { ...f, status: "skipped" as const, processedSize: imgFile.originalSize }
                    : f
                )
              );
              return;
            }
            result = await compressToTargetSize(img, targetBytes, outMime);
          } else {
            result = await compressWithQuality(img, quality, outMime);
          }
        } else if (activeTab === "resize") {
          let w = 0, h = 0;
          if (resizeMode === "dimensions") {
            w = resizeWidth || img.naturalWidth;
            h = resizeHeight || img.naturalHeight;
          } else if (resizeMode === "percentage") {
            w = Math.round(img.naturalWidth * resizePct / 100);
            h = Math.round(img.naturalHeight * resizePct / 100);
          } else {
            w = resizeWidth || img.naturalWidth;
            h = resizeHeight || img.naturalHeight;
          }
          if (w <= 0 || h <= 0) {
            w = img.naturalWidth;
            h = img.naturalHeight;
          }
          result = await resizeImage(img, w, h, resizeMethod, outMime);
        } else if (activeTab === "convert") {
          const convMime = getOutputMime(convertFormat, imgFile.originalMime);
          result = await convertImage(img, convMime, convertQuality, reduceColors);
        } else {
          // Crop is handled individually via CropEditor
          return;
        }

        if (result) {
          const url = URL.createObjectURL(result.blob);
          setImages((prev) =>
            prev.map((f) =>
              f.id === imgFile.id
                ? {
                    ...f,
                    status: "done" as const,
                    processedBlob: result.blob,
                    processedUrl: url,
                    processedSize: result.blob.size,
                    processedWidth: result.width,
                    processedHeight: result.height,
                    processingTime: result.processingTime,
                  }
                : f
            )
          );
        }
      } catch (err) {
        setImages((prev) =>
          prev.map((f) =>
            f.id === imgFile.id
              ? { ...f, status: "error" as const, error: String(err) }
              : f
          )
        );
      }
    };

    // Process in parallel batches
    const workers: Promise<void>[] = [];
    const queue = [...readyImages];

    for (let i = 0; i < Math.min(concurrency, queue.length); i++) {
      workers.push(
        (async () => {
          while (idx < queue.length) {
            const current = idx++;
            if (current < queue.length) {
              await processOne(queue[current]);
            }
          }
        })()
      );
    }

    await Promise.all(workers);
    setIsProcessing(false);
  }, [images, activeTab, compressMode, targetSizeKB, quality, outputFormat, resizeMode, resizeWidth, resizeHeight, resizePct, resizeMethod, convertFormat, convertQuality, reduceColors]);

  // Auto-process for compress tab with target size
  const processTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (activeTab === "compress" && compressMode === "target" && targetSizeKB > 0 && images.some((img) => img.status === "ready")) {
      if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
      processTimeoutRef.current = setTimeout(() => {
        processImages();
      }, 300);
    }
    return () => {
      if (processTimeoutRef.current) clearTimeout(processTimeoutRef.current);
    };
  }, [targetSizeKB, activeTab, compressMode]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---------- CROP HANDLING ----------

  const handleCrop = useCallback(
    async (x: number, y: number, w: number, h: number, rotation: number, flipH: boolean, flipV: boolean) => {
      if (!selectedImage) return;
      setIsProcessing(true);

      try {
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject(new Error("Load failed"));
          img.src = selectedImage.originalUrl;
        });

        const outMime = getOutputMime("original", selectedImage.originalMime);
        const result = await cropImage(img, x, y, w, h, rotation, flipH, flipV, outMime);
        const url = URL.createObjectURL(result.blob);

        setImages((prev) =>
          prev.map((f) =>
            f.id === selectedImage.id
              ? {
                  ...f,
                  status: "done" as const,
                  processedBlob: result.blob,
                  processedUrl: url,
                  processedSize: result.blob.size,
                  processedWidth: result.width,
                  processedHeight: result.height,
                  processingTime: result.processingTime,
                }
              : f
          )
        );
      } catch (err) {
        setImages((prev) =>
          prev.map((f) =>
            f.id === selectedImage.id
              ? { ...f, status: "error" as const, error: String(err) }
              : f
          )
        );
      }

      setIsProcessing(false);
    },
    [selectedImage]
  );

  // ---------- DOWNLOADS ----------

  const downloadOne = useCallback((image: ImageFile) => {
    if (!image.processedBlob) return;
    const ext = getExtFromMime(image.processedBlob.type);
    const suffix = activeTab === "crop" ? "cropped" : activeTab === "resize" ? "resized" : activeTab === "convert" ? "converted" : "compressed";
    const filename = getOutputFilename(image.name, suffix, ext);
    const url = URL.createObjectURL(image.processedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }, [activeTab]);

  const downloadAll = useCallback(async () => {
    const doneImages = images.filter((img) => img.status === "done" && img.processedBlob);
    if (doneImages.length === 0) return;

    if (doneImages.length === 1) {
      downloadOne(doneImages[0]);
      return;
    }

    const suffix = activeTab === "crop" ? "cropped" : activeTab === "resize" ? "resized" : activeTab === "convert" ? "converted" : "compressed";
    const files = doneImages.map((img) => {
      const ext = getExtFromMime(img.processedBlob!.type);
      return { name: getOutputFilename(img.name, suffix, ext), blob: img.processedBlob! };
    });

    const zipBlob = await createZip(files);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `images-${suffix}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [images, activeTab, downloadOne]);

  // ---------- RESIZE ASPECT RATIO LOCK ----------

  const handleResizeWidthChange = useCallback(
    (w: number) => {
      setResizeWidth(w);
      if (lockAspect && selectedImage && selectedImage.originalWidth > 0) {
        const ratio = selectedImage.originalHeight / selectedImage.originalWidth;
        setResizeHeight(Math.round(w * ratio));
      }
    },
    [lockAspect, selectedImage]
  );

  const handleResizeHeightChange = useCallback(
    (h: number) => {
      setResizeHeight(h);
      if (lockAspect && selectedImage && selectedImage.originalHeight > 0) {
        const ratio = selectedImage.originalWidth / selectedImage.originalHeight;
        setResizeWidth(Math.round(h * ratio));
      }
    },
    [lockAspect, selectedImage]
  );

  // Set initial resize dimensions from first image
  useEffect(() => {
    if (selectedImage && resizeWidth === 0 && resizeHeight === 0) {
      setResizeWidth(selectedImage.originalWidth);
      setResizeHeight(selectedImage.originalHeight);
    }
  }, [selectedImage, resizeWidth, resizeHeight]);

  // ---------- COMPUTED ----------

  const totalOriginalSize = images.reduce((sum, img) => sum + img.originalSize, 0);
  const doneImages = images.filter((img) => img.status === "done");
  const totalProcessedSize = doneImages.reduce((sum, img) => sum + (img.processedSize || 0), 0);
  const hasImages = images.length > 0;
  const tips = getProTips(activeTab);

  const tabs: { id: TabType; label: string }[] = [
    { id: "compress", label: "Compress" },
    { id: "resize", label: "Resize" },
    { id: "convert", label: "Convert" },
    { id: "crop", label: "Crop" },
  ];

  // ---------- RENDER ----------

  return (
    <div className="min-h-screen" style={{ "--color-accent": "#2563EB", "--color-accent-hover": "#1d4ed8", backgroundColor: "var(--bg)" } as React.CSSProperties}>
      <div className="max-w-[1100px] mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: "var(--text)" }}>
              {title}
            </h1>
            <p className="text-base md:text-lg mb-4" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
            <PrivacyBadge />
          </div>
          <DarkModeToggle />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl mb-8 mt-8" style={{ backgroundColor: "var(--surface-alt)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: activeTab === tab.id ? "var(--surface)" : "transparent",
                color: activeTab === tab.id ? "var(--color-accent)" : "var(--text-muted)",
                boxShadow: activeTab === tab.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Upload Zone */}
        <UploadZone
          onFiles={addFiles}
          imageCount={images.length}
          totalSize={totalOriginalSize}
          compact={hasImages}
        />

        {/* Main workspace */}
        {hasImages && (
          <>
            {/* Controls Panel */}
            <div
              className="rounded-2xl border p-6 mb-6"
              style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
            >
              {/* COMPRESS TAB */}
              {activeTab === "compress" && (
                <div className="space-y-6">
                  {/* Mode switcher */}
                  <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--surface-alt)" }}>
                    <button
                      onClick={() => setCompressMode("target")}
                      className="flex-1 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: compressMode === "target" ? "var(--surface)" : "transparent",
                        color: compressMode === "target" ? "var(--text)" : "var(--text-muted)",
                        boxShadow: compressMode === "target" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      Target Size
                      {compressMode === "target" && (
                        <span className="ml-1.5 text-sm px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: "var(--color-accent)" }}>
                          Recommended
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => setCompressMode("quality")}
                      className="flex-1 py-2 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: compressMode === "quality" ? "var(--surface)" : "transparent",
                        color: compressMode === "quality" ? "var(--text)" : "var(--text-muted)",
                        boxShadow: compressMode === "quality" ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      Quality Slider
                    </button>
                  </div>

                  {compressMode === "target" ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                          Compress each image to:
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            inputMode="decimal"
                            value={targetSizeKB || ""}
                            onChange={(e) => setTargetSizeKB(parseInt(e.target.value) || 0)}
                            placeholder="Enter target size"
                            className="flex-1 max-w-[200px] px-4 py-3 rounded-xl border text-base outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30 focus:border-[var(--color-accent)]"
                            style={{
                              backgroundColor: "var(--surface-alt)",
                              borderColor: "var(--border)",
                              color: "var(--text)",
                            }}
                          />
                          <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>KB</span>
                        </div>
                      </div>
                      {/* Presets */}
                      <div className="flex flex-wrap gap-2">
                        {SIZE_PRESETS.map((preset) => (
                          <button
                            key={preset.kb}
                            onClick={() => setTargetSizeKB(preset.kb)}
                            className="px-3 py-2 rounded-lg text-sm font-medium"
                            style={{
                              backgroundColor: targetSizeKB === preset.kb ? "var(--color-accent)" : "var(--surface-alt)",
                              color: targetSizeKB === preset.kb ? "white" : "var(--text)",
                            }}
                          >
                            <span>{preset.label}</span>
                            <span className="block text-sm opacity-70">{preset.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
                            Quality: {quality}%
                          </label>
                          <span style={{ color: "var(--text-muted)" }}>
                            {quality <= 20 ? "Low" : quality <= 50 ? "Medium" : quality <= 80 ? "High" : "Maximum"}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="100"
                          value={quality}
                          onChange={(e) => setQuality(parseInt(e.target.value))}
                          className="w-full accent-[var(--color-accent)]"
                        />
                        <div className="flex justify-between text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                          <span>Low</span>
                          <span>Medium</span>
                          <span>High</span>
                          <span>Max</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Output format */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>Output Format</label>
                    <div className="flex flex-wrap gap-2">
                      {(["original", "jpg", "png", "webp"] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setOutputFormat(fmt)}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{
                            backgroundColor: outputFormat === fmt ? "var(--color-accent)" : "var(--surface-alt)",
                            color: outputFormat === fmt ? "white" : "var(--text-muted)",
                          }}
                          disabled={fmt === "webp" && !webpOk}
                        >
                          {fmt === "original" ? "Same as original" : fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                    {outputFormat === "jpg" && (
                      <p style={{ color: "#f59e0b" }}>
                        Converting PNG to JPG will remove transparency.
                      </p>
                    )}
                  </div>

                  {/* Process button (quality mode) */}
                  {compressMode === "quality" && (
                    <button
                      onClick={processImages}
                      disabled={isProcessing}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      {isProcessing ? "Processing..." : "Compress Images"}
                    </button>
                  )}

                  {/* Process button (target mode if not auto) */}
                  {compressMode === "target" && targetSizeKB > 0 && (
                    <button
                      onClick={processImages}
                      disabled={isProcessing}
                      className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      {isProcessing ? "Processing..." : "Compress to " + (targetSizeKB >= 1024 ? (targetSizeKB / 1024).toFixed(0) + " MB" : targetSizeKB + " KB")}
                    </button>
                  )}
                </div>
              )}

              {/* RESIZE TAB */}
              {activeTab === "resize" && (
                <div className="space-y-6">
                  {/* Mode switcher */}
                  <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--surface-alt)" }}>
                    {(["dimensions", "percentage", "presets"] as const).map((mode) => (
                      <button
                        key={mode}
                        onClick={() => setResizeMode(mode)}
                        className="flex-1 py-2 rounded-lg text-sm font-medium capitalize"
                        style={{
                          backgroundColor: resizeMode === mode ? "var(--surface)" : "transparent",
                          color: resizeMode === mode ? "var(--text)" : "var(--text-muted)",
                          boxShadow: resizeMode === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                        }}
                      >
                        {mode === "presets" ? "Social Media" : mode === "dimensions" ? "By Dimensions" : "By Percentage"}
                      </button>
                    ))}
                  </div>

                  {resizeMode === "dimensions" && (
                    <div className="space-y-4">
                      {selectedImage && (
                        <p style={{ color: "var(--text-muted)" }}>
                          Original size: {selectedImage.originalWidth} &times; {selectedImage.originalHeight} px
                        </p>
                      )}
                      <div className="flex items-end gap-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Width</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              inputMode="decimal"
                              value={resizeWidth || ""}
                              onChange={(e) => handleResizeWidthChange(parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2.5 rounded-xl border text-base outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                              style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}
                            />
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>px</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setLockAspect(!lockAspect)}
                          className="p-2.5 rounded-xl border mb-0.5"
                          style={{
                            borderColor: lockAspect ? "var(--color-accent)" : "var(--border)",
                            color: lockAspect ? "var(--color-accent)" : "var(--text-muted)",
                            backgroundColor: lockAspect ? "var(--color-accent)" + "12" : "transparent",
                          }}
                          aria-label="Lock aspect ratio"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {lockAspect ? (
                              <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></>
                            ) : (
                              <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 019.9-1" /></>
                            )}
                          </svg>
                        </button>
                        <div className="flex-1">
                          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Height</label>
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              inputMode="decimal"
                              value={resizeHeight || ""}
                              onChange={(e) => handleResizeHeightChange(parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2.5 rounded-xl border text-base outline-none focus:ring-2 focus:ring-[var(--color-accent)]/30"
                              style={{ backgroundColor: "var(--surface-alt)", borderColor: "var(--border)", color: "var(--text)" }}
                            />
                            <span className="text-sm" style={{ color: "var(--text-muted)" }}>px</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {resizeMode === "percentage" && (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium" style={{ color: "var(--text)" }}>Scale: {resizePct}%</label>
                          {selectedImage && (
                            <span className="tabular-nums" style={{ color: "var(--text-muted)" }}>
                              Result: {Math.round(selectedImage.originalWidth * resizePct / 100)} &times; {Math.round(selectedImage.originalHeight * resizePct / 100)} px
                            </span>
                          )}
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="200"
                          value={resizePct}
                          onChange={(e) => setResizePct(parseInt(e.target.value))}
                          className="w-full accent-[var(--color-accent)]"
                        />
                        <div className="flex justify-between text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                          <span>10%</span>
                          <span>50%</span>
                          <span>100%</span>
                          <span>200%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {resizeMode === "presets" && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SOCIAL_PRESETS.map((preset) => (
                        <button
                          key={preset.label}
                          onClick={() => {
                            setResizeWidth(preset.w);
                            setResizeHeight(preset.h);
                            setLockAspect(false);
                            setResizeMode("dimensions");
                          }}
                          className="p-3 rounded-xl border text-left"
                          style={{
                            backgroundColor: "var(--surface-alt)",
                            borderColor: "var(--border)",
                          }}
                        >
                          <span className="block text-sm font-medium" style={{ color: "var(--text)" }}>{preset.label}</span>
                          <span className="block text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>{preset.w} &times; {preset.h}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Resize method */}
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-muted)" }}>Resize Method</label>
                    <div className="flex gap-2">
                      {(["lanczos", "bilinear", "nearest"] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setResizeMethod(m)}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium capitalize"
                          style={{
                            backgroundColor: resizeMethod === m ? "var(--color-accent)" : "var(--surface-alt)",
                            color: resizeMethod === m ? "white" : "var(--text-muted)",
                          }}
                        >
                          {m === "lanczos" ? "Lanczos (Best)" : m === "bilinear" ? "Bilinear (Fast)" : "Nearest (Pixel Art)"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={processImages}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {isProcessing ? "Resizing..." : "Resize Images"}
                  </button>
                </div>
              )}

              {/* CONVERT TAB */}
              {activeTab === "convert" && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-3" style={{ color: "var(--text)" }}>Convert to:</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {([
                        { fmt: "jpg" as const, label: "JPG", desc: "Best for photos. Smallest file size. No transparency." },
                        { fmt: "png" as const, label: "PNG", desc: "Best for graphics, logos, screenshots. Supports transparency. Larger files." },
                        { fmt: "webp" as const, label: "WebP", desc: "Modern format. Smallest files with best quality. Supported by all modern browsers." },
                      ]).map(({ fmt, label, desc }) => (
                        <button
                          key={fmt}
                          onClick={() => setConvertFormat(fmt)}
                          className="p-4 rounded-xl border text-left"
                          style={{
                            borderColor: convertFormat === fmt ? "var(--color-accent)" : "var(--border)",
                            backgroundColor: convertFormat === fmt ? "var(--color-accent)" + "08" : "var(--surface-alt)",
                            borderWidth: convertFormat === fmt ? 2 : 1,
                          }}
                          disabled={fmt === "webp" && !webpOk}
                        >
                          <span className="block text-sm font-semibold mb-1" style={{ color: convertFormat === fmt ? "var(--color-accent)" : "var(--text)" }}>
                            {label}
                          </span>
                          <span className="block text-sm" style={{ color: "var(--text-muted)" }}>{desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {convertFormat !== "png" && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium" style={{ color: "var(--text)" }}>Quality: {convertQuality}%</label>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={convertQuality}
                        onChange={(e) => setConvertQuality(parseInt(e.target.value))}
                        className="w-full accent-[var(--color-accent)]"
                      />
                    </div>
                  )}

                  {convertFormat === "png" && (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setReduceColors(!reduceColors)}
                        className="relative inline-flex h-6 w-11 items-center rounded-full"
                        style={{ backgroundColor: reduceColors ? "var(--color-accent)" : "var(--border)" }}
                        role="switch"
                        aria-checked={reduceColors}
                      >
                        <span
                          className="inline-block h-4 w-4 rounded-full bg-white"
                          style={{ transform: reduceColors ? "translateX(24px)" : "translateX(4px)" }}
                        />
                      </button>
                      <span className="text-sm" style={{ color: "var(--text)" }}>Reduce colors (8-bit) &mdash; smaller files for simple graphics</span>
                    </div>
                  )}

                  <button
                    onClick={processImages}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white disabled:opacity-50"
                    style={{ backgroundColor: "var(--color-accent)" }}
                  >
                    {isProcessing ? "Converting..." : `Convert to ${convertFormat.toUpperCase()}`}
                  </button>
                </div>
              )}

              {/* CROP TAB */}
              {activeTab === "crop" && selectedImage && selectedImage.originalWidth > 0 && (
                <div>
                  <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
                    Select an image below and use the crop handles to adjust. Crop works on one image at a time.
                  </p>
                </div>
              )}
            </div>

            {/* Crop Editor (shown below controls for crop tab) */}
            {activeTab === "crop" && selectedImage && selectedImage.originalWidth > 0 && (
              <div className="mb-6">
                <CropEditor image={selectedImage} onCrop={handleCrop} />
              </div>
            )}

            {/* Split View */}
            {selectedImage &&
              selectedImage.status === "done" &&
              selectedImage.processedUrl &&
              activeTab !== "crop" && (
                <SplitView
                  originalUrl={selectedImage.originalUrl}
                  processedUrl={selectedImage.processedUrl}
                  originalSize={selectedImage.originalSize}
                  processedSize={selectedImage.processedSize || 0}
                  width={selectedImage.processedWidth || selectedImage.originalWidth}
                  height={selectedImage.processedHeight || selectedImage.originalHeight}
                />
              )}

            {/* Savings Counter */}
            {doneImages.length > 0 && activeTab === "compress" && (
              <SavingsCounter totalOriginal={totalOriginalSize} totalProcessed={totalProcessedSize} />
            )}

            {/* Batch Controls */}
            {images.length > 0 && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm tabular-nums" style={{ color: "var(--text-muted)" }}>
                  {images.length} image{images.length !== 1 ? "s" : ""}
                  {doneImages.length > 0 && ` \u2022 ${doneImages.length} processed`}
                </span>
                <div className="flex gap-2">
                  {doneImages.length > 0 && (
                    <button
                      onClick={downloadAll}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download {doneImages.length > 1 ? `All (ZIP)` : ""}
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="px-4 py-2 rounded-xl text-sm font-medium border"
                    style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Image Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-12">
              {images.map((img) => (
                <ImageCard
                  key={img.id}
                  image={img}
                  isSelected={selectedImageId === img.id}
                  onSelect={() => setSelectedImageId(img.id)}
                  onRemove={() => removeImage(img.id)}
                  onDownload={() => downloadOne(img)}
                />
              ))}
            </div>
          </>
        )}

        {/* Pro Tips */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Pro Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 p-4 rounded-xl border"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-sm" style={{ color: "var(--text)" }}>{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Tools */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold mb-4" style={{ color: "var(--text)" }}>Related Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "Image Compressor", desc: "Compress images to exact file sizes", href: "/image-tools/image-compressor", icon: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" },
              { name: "Image Resizer", desc: "Resize photos to any dimensions", href: "/image-tools/resize-image", icon: "M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" },
              { name: "Image Converter", desc: "Convert between JPG, PNG, and WebP", href: "/image-tools/convert-image", icon: "M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" },
              { name: "Image Cropper", desc: "Crop photos with aspect ratio presets", href: "/image-tools/crop-image", icon: "M6.13 1L6 16a2 2 0 002 2h15" },
              { name: "Compress to 100KB", desc: "Compress images to exactly 100KB", href: "/image-tools/compress-image-to-100kb", icon: "M12 3v18M3 12h18" },
              { name: "Compress to 200KB", desc: "Compress images to exactly 200KB", href: "/image-tools/compress-image-to-200kb", icon: "M12 3v18M3 12h18" },
            ].map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className="flex items-start gap-3 p-4 rounded-xl border hover:shadow-md"
                style={{ backgroundColor: "var(--surface)", borderColor: "var(--border)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="flex-shrink-0 mt-0.5" style={{ color: "var(--color-accent)" }}>
                  <path d={tool.icon} />
                </svg>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text)" }}>{tool.name}</div>
                  <div style={{ color: "var(--text-muted)" }}>{tool.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t pt-8 pb-4 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}>
          <p>Free Online Tools &mdash; Free calculators and tools for everyone.</p>
          <p className="mt-1">No signup required. No ads. No tracking.</p>
        </footer>
      </div>
    </div>
  );
}
