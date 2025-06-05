import { useState } from "react";
import DefaultImage from "./DefaultImage";

export function Wireframes({ wireframes = [] }) {
  if (!wireframes.length) return null;

  const [errorIndexes, setErrorIndexes] = useState([]);

  const handleImageError = (index) => {
    setErrorIndexes((prev) => [...prev, index]);
  };

  return (
    <div className="flex flex-col items-start w-full h-full py-20 px-4 md:px-8 lg:px-48 gap-6 bg-[#333]">
      <div className="text-h2 text-amber-200 white pb-2">Wireframes</div>
      <div className="flex flex-wrap w-full gap-4 lg:gap-10 items-center">
        {wireframes.map((src, index) =>
          !errorIndexes.includes(index) && src ? (
            <img
              key={index}
              src={src}
              alt={`Wireframe ${index + 1}`}
              className="w-full"
              onError={() => handleImageError(index)}
            />
          ) : (
            <DefaultImage
              key={index}
              className="w-full h-64"
              text={`Wireframe ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
}
