import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Card({ slug }) {
  const [card, setCard] = useState(null);

  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/cards/slug/${slug}`)
      .then((res) => res.json())
      .then((data) => setCard(data))
      .catch((err) => console.error("❌ Failed to fetch card:", err));
  }, [slug]);

  if (!card) return null; // or show a skeleton/loader

  return (
    <Link to={`/project/${card.slug}`}>
      <div className="bg-white p-4 rounded-sm shadow-soft hover:shadow-md transition-all">
        <img src={card.image} alt={card.title} />
        <div className="text-h3">{card.title}</div>
        <div className="subparagraph">{card.subtitle}</div>

        {card.roles && (
          <div className="flex flex-wrap gap-3 pt-2">
            {card.roles.map((role, i) => (
              <div key={i} className="tag blue">
                {role}
              </div>
            ))}
          </div>
        )}

        {/* {card.tech && (
          <div className="flex flex-wrap gap-3 pt-2">
            {card.tech.map((item, i) => (
              <div key={i} className="tag blue">
                {item}
              </div>
            ))}
          </div>
        )} */}
      </div>
    </Link>
  );
}
