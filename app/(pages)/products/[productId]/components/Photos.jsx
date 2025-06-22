"use client";

import { useState } from "react";

export default function Photos({ imageList }) {
  const [selectedImage, setSelectedImage] = useState(imageList[0]);

  if (imageList?.length === 0) {
    return <></>;
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Main Image */}
      <div className="flex justify-center items-center w-full border rounded-xl bg-[#f9f9f9] p-4 shadow-sm">
        <img
          className="object-contain h-[300px] md:h-[400px] transition-transform duration-300 hover:scale-105"
          src={selectedImage}
          alt="Selected Product"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex flex-wrap justify-center items-center gap-3">
        {imageList?.map((item, index) => {
          const isActive = selectedImage === item;
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedImage(item);
              }}
              className={`w-[70px] h-[70px] md:w-[80px] md:h-[80px] cursor-pointer border rounded-lg p-1 transition-transform duration-200 
              ${isActive ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300 hover:border-blue-400 hover:scale-105"}`}
            >
              <img
                className="object-contain w-full h-full rounded-md"
                src={item}
                alt={`Thumbnail ${index + 1}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
