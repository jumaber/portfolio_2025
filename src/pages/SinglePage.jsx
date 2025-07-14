import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../components/other/NavBar";
import { TextBlock } from "../components/pages/TextBlock";
import { LoadingScreen } from "../components/other/LoadingScreen";
import { ScrollTracker } from "../components/other/ScrollTracker";
import { PageNotFound } from "./PageNotFound";


export function SinglePage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const API = import.meta.env.VITE_API_BASE_URL;


  useEffect(() => {
    fetch(`${API}/api/pages/${slug}`)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) {
            setNotFound(true);
          }
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setPage(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [slug]);

  if (notFound) return <PageNotFound />; // ← show your 404 page :contentReference[oaicite:1]{index=1}
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
