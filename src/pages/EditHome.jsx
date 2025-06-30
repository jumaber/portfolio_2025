import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { EditCard } from "../components/edit/EditCard";
import WhiteLinkIcon from "../assets/link_white.svg";
import { LoadingAnimation } from "../components/other/LoadingAnimation";
import { EditHomeIntro } from "../components/edit/EditHomeIntro";
import { EditHomeAbout } from "../components/edit/EditHomeAbout";
import { EditHomeExperience } from "../components/edit/EditHomeExperience.jsx";


export function EditHome() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const editorRef = useRef(null);

  // Fetch the project from backend
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/pages/home`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error("Failed to fetch home page:", err));
  }, [slug]);

  function handleFormChange(updatedForm) {
    setPage((prev) => ({ ...prev, ...updatedForm }));
  }

  if (!page) return <LoadingAnimation />;

 
  // Save Project
  async function handleSave() {
    try {
      const { _id, __v, ...safePage } = page;

      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/pages/home`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(safePage),
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("✅ Project saved!", data);
        alert("Saved!");
      } else {
        console.error("❌ Save failed:", data.error);
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("❌ Save error:", err);
      alert("An error occurred while saving.");
    }
  }

  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      {/* Header*/}
      <div className="flex flex-col w-full pb-10">
        <div className="flex flex-row w-full justify-between items-center">
          <Link to="/dashboard">
            <div className="back-button">← Back to Dashboard</div>
          </Link>
          <div className="flex flex-row items-center gap-4">
            <ButtonSmall
              text={"Save"}
              bgColor="bg-[var(--color-yellow)]"
              textColor="text-[var(--color-blue)] "
              hoverColor="bg-[var(--color-pink)]"
              hoverTextColor="text-white"
              paddingX="px-4 lg:px-6"
              paddingY="py-2 lg:py-3"
              textSize="text-[14px] lg:text-[16px]"
              className="border border-[var(--color-blue)]"
              image={null}
              onClick={handleSave}
            />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4  pt-6">
          <div className="project-title">Home</div>
          <ButtonSmall
            text={"Visit"}
            to={`/`}
            className="bg-[var(--color-blue)] text-white hover:bg-[var(--color-pink)] hover:font-bold"
            newTab={true}
            image={WhiteLinkIcon}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-10">
        <div className="flex flex-row w-full lg:w-1/2">
          <div className="white-box  h-fit">
            <div className="text-h3 blue pb-4 ">Content</div>
            <div className="flex flex-col gap-4">
              <EditHomeIntro
                data={{
                  greet: page.greet,
                  title: page.title,
                  subtitle: page.subtitle,
                  description: page.description,
                  githubURL: page.githubURL,
                  linkedinURL: page.linkedinURL,
                }}
                onChange={handleFormChange}
                editorRef={editorRef}
              />
              <EditHomeAbout
                data={{
                  aboutTitle: page.aboutTitle,
                  aboutDescription: page.aboutDescription,
                  aboutPortrait: page.aboutPortrait,
                }}
                onChange={handleFormChange}
                editorRef={editorRef}
              />
              <EditHomeExperience
                form={page}
                setForm={setPage}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
