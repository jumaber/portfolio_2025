import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../DefaultImage";

export function Card({ slug }) {
  const [card, setCard] = useState(null);

  const cloudinaryImage = (url, width) =>
    url?.includes("/upload/")
      ? url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`)
      : url;

      
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((err) => console.error("❌ Failed to fetch card:", err));
  }, [slug]);

  if (!card) return null;

  function handleClick() {
    if (window.gtag && card) {
      window.gtag("event", "project_click", {
        project_title: card.title,
        project_subtitle: card.subtitle,
        project_slug: card.slug,
      });
    }
  }

  return (
    <Link to={`/project/${card.slug}`} onClick={handleClick}>
      <div className="group flex flex-col h-full bg-white p-4 rounded-sm shadow-soft transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
        <div className="overflow-hidden rounded-sm">
          <img
            src={cloudinaryImage(card.cardImage, 800) || DefaultImage}
            srcSet={`
    ${cloudinaryImage(card.cardImage, 400)} 400w,
    ${cloudinaryImage(card.cardImage, 800)} 800w,
    ${cloudinaryImage(card.cardImage, 1200)} 1200w
  `}
            sizes="(max-width: 640px) 400px, (max-width: 1024px) 800px, 1200px"
            alt={card.cardTitle}
            loading="lazy"
            className="w-full aspect-[4/3] h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div>
          <div className="text-h3">{card.cardTitle}</div>
          <div className="subparagraph">{card.cardSubtitle}</div>
          {card.tech && (
            <div className="flex flex-wrap gap-0.5 pt-3">
              {card.tech.map((item, i) => (
                <div key={i} className="tag blue pr-4">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
