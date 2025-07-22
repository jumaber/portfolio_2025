import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../other/DefaultImage";
import { useProjectClickTracker } from "../other/useProjectClickTracker";

export function Card({ slug, card: cardProp, project }) {
  const { track } = useProjectClickTracker();
  const [card, setCard] = useState(cardProp || project || null);

  const cloudinaryImage = (url, width) =>
    url?.includes("/upload/")
      ? url.replace("/upload/", `/upload/q_auto,f_auto,w_${width}/`)
      : url;

  const API = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

  useEffect(() => {
    if (!card && slug) {
      fetch(`${API}/api/projects/${slug}`)
        .then((res) => {
          if (!res.ok) throw new Error(`Status ${res.status}`);
          return res.json();
        })
        .then((data) => setCard(data))
        .catch((err) => console.error("❌ Failed to fetch card:", err));
    }
  }, [slug, card, API]);

  if (!card) return null;

  function handleClick() {
    track(card.slug, { title: card.title, subtitle: card.subtitle });
  }

  return (
    <Link
      to={`/project/${card.slug}`}
      onClick={handleClick}
      className="cursor-pointer"
    >
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
        <div className="mt-3">
          <h3 className="text-h3">{card.cardTitle}</h3>
          <p className="subparagraph">{card.cardSubtitle}</p>
          {card.tech && (
            <div className="flex flex-wrap gap-1 pt-3">
              {card.tech.map((item, i) => (
                <span key={i} className="tag pr-4 blue">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
