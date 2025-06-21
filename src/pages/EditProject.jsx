import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { EditIntro } from "../components/edit/EditIntro";
import { EditHero } from "../components/edit/EditHero";
import { EditCard } from "../components/edit/EditCard";
import { EditChallenges } from "../components/edit/EditChallenges.jsx";
import { EditLearnings } from "../components/edit/EditLearnings.jsx";
import { EditOutcomes } from "../components/edit/EditOutcomes.jsx";
import { EditProcess } from "../components/edit/EditProcess.jsx";


import WhiteLinkIcon from "../assets/link_white.svg"


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

  if (!project) return <div className="p-10">Loading...</div>;


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
          <div className="flex flex-row gap-2">
            <ButtonSmall
              text={"Visit"}
              to={`/project/${project.slug}`}
              className={"bg-[#0C0093] text-white"}
              newTab={true}
              image={WhiteLinkIcon}
            />
            <ButtonSmall
              text={"Save"}
              className={"bg-[#FFA7A7] text-white"}
              image={null}
              onClick={handleSave}
            />
          </div>
        </div>
        <div>
          <div className="project-title pt-6">
            {project.cardTitle || "Untitled Project"}
          </div>
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
                }}
                onChange={handleIntroChange}
                editorRef={editorRef}
              />
              <EditHero
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditChallenges
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditProcess
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditOutcomes
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
              <EditLearnings
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
