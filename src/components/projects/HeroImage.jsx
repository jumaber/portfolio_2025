import { useState } from "react";
import DefaultImage from "../other/DefaultImage";

export function HeroImage({ hero }) {
  const [heroError, setHeroError] = useState(false);

  return (
    <div className="w-screen">
      {!heroError && hero ? (
        <img
          src={hero}
          alt="hero"
          className="w-full h-auto md:flex"
          onError={() => setHeroError(true)}
        />
      ) : (
        <DefaultImage className="w-full h-96 sm:hidden md:flex" />
      )}
    </div>
  );
}
