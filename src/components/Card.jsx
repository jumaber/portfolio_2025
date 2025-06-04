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

  if (!card) return null; 

  return (
    <Link to={`/project/${card.slug}`}>
      <div className="card-hover flex flex-col justify-between h-full bg-white p-4 rounded-sm shadow-soft">
        <div>
          <img src={card.image} alt={card.title} className="w-full" />
        </div>
        <div>
          <div className="text-h3">{card.title}</div>
          {/* <div className="subparagraph">{card.subtitle}</div> */}
          {card.roles && (
            <div className="flex flex-wrap gap-0.5 pt-3">
              {card.roles.map((role, i) => (
                <div key={i} className="tag blue pr-4 ">
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
      </div>
    </Link>
  );
}
