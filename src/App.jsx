import React, { useState } from "react";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [convertedURL, setConvertedURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setConvertedURL(null); // Reset previous result
    }
  };

  const convertToWebP = async () => {
    if (!selectedImage) return;

    const imageBitmap = await createImageBitmap(selectedImage);
    const canvas = document.createElement("canvas");
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageBitmap, 0, 0);

    canvas.toBlob(
      (blob) => {
        const url = URL.createObjectURL(blob);
        setConvertedURL(url);
      },
      "image/webp",
      0.9 // Quality: 0 to 1
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full space-y-4">
        <h1 className="text-2xl font-bold text-center">Image to WebP Converter</h1>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            className="w-full max-h-64 object-contain border rounded"
          />
        )}

        <button
          onClick={convertToWebP}
          disabled={!selectedImage}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Convert to WebP
        </button>

        {convertedURL && (
          <a
            href={convertedURL}
            download="converted.webp"
            className="text-blue-600 underline text-center block"
          >
            Download WebP Image
          </a>
        )}
      </div>
    </div>
  );
}

