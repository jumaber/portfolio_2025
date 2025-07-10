import { useState } from "react";
import DefaultImage from "../other/DefaultImage";

export function Wireframes({ wireframes = [], title = "Wireframes" }) {
  const [errorIndexes, setErrorIndexes] = useState([]);
  if (!wireframes.length) return null;

  const handleImageError = (index) => {
    setErrorIndexes((prev) => [...prev, index]);
  };
  
  return (
    <div className="flex flex-col items-center w-screen h-full py-20 px-4 md:px-8 bg-[#333]">
      <div className="max-w-[800px]">
        <div className="text-h2 text-amber-200 white pb-2 lg:pb-6">{title}</div>
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
    </div>
  );
}
