import { useState } from "react";
import { Link } from "react-router-dom";
import LinkIcon from "/src/assets/link_pink.svg";
import Github from "/src/assets/github.svg";
import DefaultImage from "../DefaultImage";

export function Intro({
  title,
  subtitle,
  location,
  period,
  liveUrl,
  githubUrl,
  description,
  image,
}) {
  const [introImageError, setIntroImageError] = useState(false);

  return (
    <>
      <div className="flex flex-col items-center w-full h-full py-20 px-4 md:px-8">
        <div className="max-w-[800px]">
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
            {githubUrl && (
              <Link to={githubUrl} target="_blank" rel="noopener noreferrer">
                <img src={Github} alt="github icon" className="w-5 h-5" />
              </Link>
            )}
            {liveUrl && (
              <Link to={liveUrl} target="_blank" rel="noopener noreferrer">
                <img src={LinkIcon} alt="link icon" className="w-5 h-5" />
              </Link>
            )}
          </div>

          {/* Description & Image */}
          <div className="flex flex-col-reverse gap-4 lg:gap-10 mt-10">
            <div
              className="paragraph"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {!introImageError && image ? (
              <img
                src={image}
                alt={title}
                className="lg:min-w-[40%] h-fit rounded-sm"
                onError={() => setIntroImageError(true)}
              />
            ) : (
              <DefaultImage className="md:min-w-md h-64" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
