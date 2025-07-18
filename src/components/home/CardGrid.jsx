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
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");
  ;

  useEffect(() => {
    console.log("→ API base:", API);
    console.log("→ Fetching:", `${API}/api/projects`);

    fetch(`${API}/api/projects`)
      .then((res) => {
        console.log("→ HTTP status:", res.status);
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data) => {
        console.log("→ Raw data from API:", data);
        const featured = Object.values(data)
          .filter((p) => p.featured === true && p.slug)
          .sort((a, b) => a.order - b.order);
        setFeaturedProjects(featured);
      })
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, [API]);

  const rows = chunkArray(featuredProjects, 2);

  return (
    <section id="work" className="flex flex-col gap-5">
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
