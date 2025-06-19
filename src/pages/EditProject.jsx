import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { EditIntro } from "../components/edit/EditIntro";


export function EditProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);

  // Fetch the project from backend
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Failed to fetch project:", err));
  }, [slug]);

  function handleChange(updatedIntro) {
    setProject((prev) => ({ ...prev, ...updatedIntro }));
  }

  if (!project) return <div className="p-10">Loading...</div>;
  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      {/* Header*/}
      <div className="flex flex-col w-full pb-10">
        <div className="flex flex-row w-full justify-between items-center">
          <Link to="/dashboard">
            <div className="back-button">← Back to Dashboard</div>
          </Link>
          <div className="flex flex-row gap-2">
            <ButtonSmall text={"Visit"} className={"bg-[#0C0093] text-white"} />
            <ButtonSmall
              text={"Save"}
              className={"bg-[#FFA7A7] text-white"}
              image={null}
            />
          </div>
        </div>
        <div>
          <div className="project-title pt-6">Project Name</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-10">
        <div className="flex flex-row w-full lg:w-2/3">
          <div className="white-box">
            <div className="text-h3 blue pb-4">Content</div>
            <EditIntro
              data={{
                title: project.title,
                subtitle: project.subtitle,
                location: project.location,
                period: project.period,
                liveUrl: project.liveUrl,
                githubUrl: project.githubUrl,
                description: project.description,
              }}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="white-box">
          <div className="text-h3 blue w-full lg:w-1/3">Components</div>
          <div>Project Components</div>
        </div>
      </div>
    </div>
  );
}
