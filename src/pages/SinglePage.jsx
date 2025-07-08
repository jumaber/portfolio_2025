import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/other/NavBar";
import { TextBlock } from "../components/pages/TextBlock";
import { LoadingScreen } from "../components/other/LoadingScreen";
import { ScrollTracker } from "../components/other/ScrollTracker";


export function SinglePage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error("Failed to fetch page:", err));
  }, [slug]);

  if (!page) return <LoadingScreen />;

  return (
    <>
      <NavBar />
      <ScrollTracker />
      <div className="h-screen bg-[#FFF6F6] flex flex-col items-start w-screen overflow-x-hidden">
        <TextBlock data={page.blocks} />
      </div>
    </>
  );
}
