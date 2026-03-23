import React, { useState } from "react";
import Input from "./Input";

function Dashboard() {

  const [photos, setPhotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setPhotos((prevPhotos) => [...prevPhotos, ...newFiles]);
  };

  const nextImage = () => {
    if (currentIndex < photos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="p-10">

      {/* hidden input */}
      <input
        type="file"
        multiple
        id="fileUpload"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* custom button */}
      <label
        htmlFor="fileUpload"
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
      >
        Upload Photos
      </label>
    <Input
        handleFileChange={handleFileChange}
        photos={photos}
      />
      {photos.length > 0 && (
        <div className="flex items-center gap-6 mt-6">

          <button
            onClick={prevImage}
            className="bg-gray-300 px-3 py-2 rounded"
          >
            ◀
          </button>

          <div className="border p-2 rounded-lg">

            <div className="h-[400px] rounded-lg overflow-hidden">

              <img
                src={URL.createObjectURL(photos[currentIndex])}
                alt="preview"
                className="w-full h-full object-cover"
              />

            </div>

          </div>

          <button
            onClick={nextImage}
            className="bg-gray-300 px-3 py-2 rounded"
          >
            ▶
          </button>

        </div>
      )}

    </div>
  );
}

export default Dashboard;