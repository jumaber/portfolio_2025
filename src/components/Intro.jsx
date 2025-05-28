// src/components/Intro.jsx
import { Link } from "react-router-dom";
import LinkIcon from "/src/assets/link_pink.svg";

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
  return (
    <>
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full py-20">
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
        <div className="flex flex-col md:flex-row lg:gap-10 mt-10">
          <div className="paragraph">{description}</div>
          <img src={introImage} alt={title} className="md:w-[50%]" />
        </div>
      </div>

      {/* Hero Image */}
      <img src={hero} className="w-full h-auto sm:hidden md:flex" />
    </>
  );
}
