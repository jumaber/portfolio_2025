import { useEffect, useState } from "react";
import { Card } from "/src/components/home/Card";

export function RelatedProjects({ currentSlug }) {
  const [slugs, setSlugs] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-2025-wyed.onrender.com/api/cards")
      .then((res) => res.json())
      .then((data) => {
        const featured = data.filter(
          (card) => card.slug !== currentSlug && card.featured
        );

        // Shuffle the array
        const shuffled = featured.sort(() => 0.5 - Math.random());

        // Take first 4 slugs
        const selected = shuffled.slice(0, 4).map((card) => card.slug);
        setSlugs(selected);
      })
      .catch((err) => console.error("❌ Failed to fetch related cards:", err));
  }, [currentSlug]);

  return (
    <div className="py-16 px-4 md:px-16 lg:px-32 bg-[#FFF6F6]">
      <div className="text-h2 blue pb-8">Other Featured Projects</div>
      <div className="flex flex-col md:flex-row flex-wrap gap-6">
        {slugs.map((slug) => (
          <div key={slug} className="md:w-[48%] lg:w-[23%]">
            <Card slug={slug} />
          </div>
        ))}
      </div>
    </div>
  );
}


