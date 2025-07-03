import { NavBar } from "../components/other/NavBar";

export function SinglePage() {

  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched pages:", data); //
        setPage(data);
      })
      .catch((err) => console.error("Failed to fetch page:", err));
  }, [slug]);

  if (!page) return <LoadingAnimation />;

  const {
    title,
    customHTML,
    image,
  } = page;
  console.log({ title, customHTML, image });


  return (
    <>
      <NavBar />
      <div className="h-full bg-[#FFF6F6] flex flex-col items-start max-w-full overflow-x-hidden">
        {/* Intro Section */}
        <Intro
          title={title}
          subtitle={subtitle}
          location={location}
          period={period}
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          description={description}
          image={image}
          tech={project.tech}
          roles={project.roles}
        />

      </div>
    </>
  );
}
