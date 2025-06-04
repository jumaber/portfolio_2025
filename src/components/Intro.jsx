import { useState } from "react";
import { Link } from "react-router-dom";
import LinkIcon from "/src/assets/link_pink.svg";
import DefaultImage from "./DefaultImage";

export function Intro({
  title,
  subtitle,
  location,
  period,
  link,
  description,
  introImage,
  hero,
}) {
  const [heroError, setHeroError] = useState(false);
  const [introImageError, setIntroImageError] = useState(false);

  return (
    <>
      <div className="flex flex-col items-start w-full h-full py-20">
        {/* Title & Subtitle */}
        <div>
          <div className="text-h1">{title}</div>
          <div className="text-h2 blue pb-2">{subtitle}</div>
        </div>

        {/* Location & Period */}
        <div className="flex flex-row items-center gap-3">
          <div className="text-h5 gray">{location}</div>
          <div className="text-h5 gray">–</div>
          <div className="text-h5 gray">{period}</div>
          <Link to={link}>
            <img src={LinkIcon} alt="link icon" className="w-5 h-5" />
          </Link>
        </div>

        {/* Description & Image */}
        <div className="flex flex-col-reverse gap-4 md:flex-row lg:gap-10 mt-10">
          <div className="paragraph">{description}</div>
          {!introImageError && introImage ? (
            <img
              src={introImage}
              alt={title}
              className="md:min-w-[288px]"
              onError={() => setIntroImageError(true)}
            />
          ) : (
            <DefaultImage className="md:min-w-md h-64" />
          )}
        </div>
      </div>

      {/* Hero Image */}
      {!heroError && hero ? (
        <img
          src={hero}
          alt="hero"
          className="w-full h-auto sm:hidden md:flex"
          onError={() => setHeroError(true)}
        />
      ) : (
        <DefaultImage className="w-full h-96 sm:hidden md:flex" />
      )}
    </>
  );
}
