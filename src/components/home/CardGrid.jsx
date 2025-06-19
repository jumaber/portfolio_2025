import { useEffect, useState } from "react";
import { Card } from "./Card";

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export function CardGrid() {
  const [error, setError] = useState(null);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-2025-wyed.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        const featured = Object.values(data)
          .filter((p) => p.featured === true && p.slug)
          .sort((a, b) => a.order - b.order);
        setFeaturedProjects(featured);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
      setError("Loading work projects is currently troubleshooting. Please check back soon or try refreshing the page. Thank you.");
  }, []);

  const rows = chunkArray(featuredProjects, 2);

  return (
    <section id="work" className="flex flex-col gap-5">
      {error && <div className="white-box text-red-500 font-semibold py-4">{error}</div>}
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-col md:flex-row gap-5">
          {row.map((proj) => (
            <div key={proj.slug} className="w-full md:w-1/2">
              <Card slug={proj.slug} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
