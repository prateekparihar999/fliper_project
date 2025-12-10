import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropUtils.js";

// Define available aspect ratios
const ASPECT_RATIOS = [
  { label: "Free", value: null },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "Custom", value: "custom" },
];

const ImageCropper = ({ imageSrc, onCropDone, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(4 / 3);
  const [customAspect, setCustomAspect] = useState({ w: 1, h: 1 });

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    const usedAspect = aspect === "custom" ? customAspect.w / customAspect.h : aspect;
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, usedAspect);
    onCropDone(croppedImage);
  };

  // Handle aspect ratio change
  const handleAspectChange = (e) => {
    const val = e.target.value;
    if (val === "custom") {
      setAspect("custom");
    } else if (val === "null") {
      setAspect(null);
    } else {
      setAspect(Number(val));
    }
  };

  // Handle custom aspect input
  const handleCustomAspect = (e) => {
    setCustomAspect({ ...customAspect, [e.target.name]: Number(e.target.value) });
  };

  const usedAspect = aspect === "custom" ? customAspect.w / customAspect.h : aspect || undefined;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90vw] max-w-lg flex flex-col items-center">
        {/* Aspect Ratio Selection */}
        <div className="mb-4 flex flex-wrap gap-3 items-center w-full">
          <label className="text-gray-700 font-semibold mr-2">Aspect Ratio:</label>
          <select
            className="border rounded px-2 py-1"
            value={aspect === "custom" ? "custom" : aspect === null ? "null" : aspect}
            onChange={handleAspectChange}
          >
            {ASPECT_RATIOS.map(opt => (
              <option key={opt.label} value={opt.value === null ? "null" : opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {aspect === "custom" && (
            <span className="flex items-center gap-1 ml-2">
              <input
                type="number"
                min={1}
                value={customAspect.w}
                name="w"
                onChange={handleCustomAspect}
                className="w-12 border rounded px-1 py-0.5"
              />
              <span className="mx-1">:</span>
              <input
                type="number"
                min={1}
                value={customAspect.h}
                name="h"
                onChange={handleCustomAspect}
                className="w-12 border rounded px-1 py-0.5"
              />
            </span>
          )}
        </div>
        {/* Cropper */}
        <div className="relative w-full h-72 bg-gray-100 rounded">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={usedAspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        {/* Native Slider */}
        <div className="w-full mt-4 flex items-center gap-4">
          <label htmlFor="zoom-range" className="text-gray-600 text-sm">Zoom</label>
          <input
            id="zoom-range"
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <span className="text-gray-500 text-xs">{(zoom * 100).toFixed(0)}%</span>
        </div>
        <div className="flex justify-end gap-4 mt-4 w-full">
          <button
            onClick={onCancel}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Crop & Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
