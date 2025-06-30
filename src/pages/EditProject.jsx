import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { EditIntro } from "../components/edit/EditIntro";
import { EditHero } from "../components/edit/EditHero";
import { EditCard } from "../components/edit/EditCard";
import { EditProcess } from "../components/edit/EditProcess.jsx";
import WhiteLinkIcon from "../assets/link_white.svg"
import { EditListField } from "../components/edit/EditListField.jsx";
import { EditWireframes } from "../components/edit/EditWireframes.jsx";
import { EditCustomHtml } from "../components/edit/EditCustomHtml.jsx";
import { LoadingAnimation } from "../components/other/LoadingAnimation";



export function EditProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const editorRef = useRef(null);

  
  // Fetch the project from backend
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Failed to fetch project:", err));
  }, [slug]);

  function handleIntroChange(updatedIntro) {
    setProject((prev) => ({ ...prev, ...updatedIntro }));
  }

  if (!project) return <LoadingAnimation />;


  function handleFormChange(updatedForm) {
    setProject((prev) => ({ ...prev, ...updatedForm }));
  }
  
  // Save Project
  async function handleSave() {
    try {
      const { _id, __v, ...safeProject } = project;

      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(safeProject),
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
          <div className="project-title">
            {project.cardTitle || "Untitled Project"}
          </div>
          <ButtonSmall
            text={"Visit"}
            to={`/project/${project.slug}`}
            className="bg-[var(--color-blue)] text-white hover:bg-[var(--color-pink)] hover:font-bold"
            newTab={true}
            image={WhiteLinkIcon}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-10">
        <div className="flex flex-row w-full lg:w-2/3">
          <div className="white-box  h-fit">
            <div className="text-h3 blue pb-4 ">Content</div>
            <div className="flex flex-col gap-4">
              <EditIntro
                data={{
                  title: project.title,
                  subtitle: project.subtitle,
                  location: project.location,
                  period: project.period,
                  liveUrl: project.liveUrl,
                  githubUrl: project.githubUrl,
                  description: project.description,
                  image: project.image,
                  roles: project.roles,
                  tech: project.tech,
                }}
                onChange={handleIntroChange}
                editorRef={editorRef}
              />
              <EditHero
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditListField
                title="Challenges"
                values={project.challenges}
                onChange={(updated) =>
                  setProject((prev) => ({ ...prev, challenges: updated }))
                }
              />

              <EditProcess
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditListField
                title="Outcomes"
                values={project.outcomes}
                onChange={(updated) =>
                  setProject((prev) => ({ ...prev, outcomes: updated }))
                }
              />

              <EditListField
                title="Learnings"
                values={project.learnings}
                onChange={(updated) =>
                  setProject((prev) => ({ ...prev, learnings: updated }))
                }
              />
              <EditWireframes
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditCustomHtml
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
        <div className="white-box h-fit">
          <div className="text-h3 blue w-full h-fit lg:w-1/3 pb-4">Card</div>
          <EditCard
            form={project}
            setForm={setProject}
            onChange={handleFormChange}
          />
        </div>
      </div>
    </div>
  );
}
