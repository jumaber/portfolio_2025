// 📦 Imports: hooks, components, icons
import { useEffect, useState, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../../components/dashboard/ButtonSmall.jsx";
import { EditIntro } from "../../components/edit/project/EditIntro.jsx";
import { EditHero } from "../../components/edit/project/EditHero.jsx";
import { EditCard } from "../../components/edit/project/EditCard.jsx";
import { EditProcess } from "../../components/edit/project/EditProcess.jsx";
import { EditListField } from "../../components/edit/project/EditListField.jsx";
import { EditWireframes } from "../../components/edit/project/EditWireframes.jsx";
import { EditCustomHtml } from "../../components/edit/EditCustomHtml.jsx";
import { LoadingScreen } from "../../components/other/LoadingScreen.jsx";
import { Trash2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";

// 🧩 Component: EditProject
// This screen loads a project from the backend and lets you update or delete it.
// It shares the same visual structure as NewProject, but with editing logic.
export function EditProject() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const editorRef = useRef(null);
  const [project, setProject] = useState(null);

  // 🛰️ Fetch project data from backend when component mounts
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Failed to fetch project:", err));
  }, [slug]);

  // 🔁 Update top-level intro fields
  function handleIntroChange(updatedIntro) {
    setProject((prev) => ({ ...prev, ...updatedIntro }));
  }

  // 🔁 Generic handler for form field updates
  function handleFormChange(updatedForm) {
    setProject((prev) => ({ ...prev, ...updatedForm }));
  }

  // 🌀 Show loading animation while data loads
  if (!project) return <LoadingScreen />;

  // 💾 Save project updates (PATCH)
  async function handleSave() {
    const toastId = toast.loading("Saving project…");
    try {
      // 1. First, pull the latest from your EditorJSBlock
      let newDescription = project.description;
      if (editorRef.current?.save) {
        newDescription = await editorRef.current.save();
        // merge it into your local state so UI stays in sync
        setProject((prev) => ({ ...prev, description: newDescription }));
      }

      // 2. Remove Mongo internals and build your PATCH payload
      const { _id, __v, ...rest } = project;
      const safeProject = { ...rest, description: newDescription };

      // 3. Fire off your PATCH
      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(safeProject),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Project saved!", { id: toastId });
      } else {
        console.error("Save failed:", data.error);
        toast.error("Error: " + data.error, { id: toastId });
      }
    } catch (err) {
      console.error("Save error:", err);
      toast.error("An error occurred while saving.", { id: toastId });
    }
  }

  // ❌ Delete the project (DELETE)
  async function handleDeleteProject() {
    const toastId = toast.loading("Deleting project…");
    try {
      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Project deleted!", { id: toastId });
        navigate("/dashboard");
      } else {
        console.error("Delete failed:", data.error);
        toast.error("Error: " + data.error, { id: toastId });
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while deleting.", { id: toastId });
    }
  }

  // 🖥️ UI Layout
  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-center p-4 md:p-8 lg:p-16 overflow-x-hidden">
      <div className="w-full lg:max-w-[1240px]">
        {/* 🔹 Header: Back button, Save button, Delete + View icons */}
        <div className="flex flex-col w-full pb-10">
          <div className="flex flex-row w-full justify-between items-center">
            <Link to="/dashboard">
              <div className="back-button">← Back to Dashboard</div>
            </Link>
            <ButtonSmall
              text={"Save"}
              bgColor="bg-[var(--color-blue)]"
              textColor="text-[var(--color-white)] "
              hoverColor="bg-[var(--color-pink)]"
              hoverTextColor="text-white"
              paddingX="px-4 lg:px-6"
              paddingY="py-2 lg:py-3"
              textSize="text-[14px] lg:text-[16px]"
              image={null}
              onClick={handleSave}
            />
          </div>

          {/* 🔸 Project title + icons */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full pt-10">
            <div className="flex flex-row justify-between items-end w-full">
              <div className="project-title w-full">
                {project.cardTitle || "Untitled Project"}
              </div>

              {/* 🗑️ Trash + 🔗 Preview Link */}
              <div className="flex flex-row gap-2 bg-white rounded-sm border border-gray-200">
                <Trash2
                  className="w-9 h-9 p-2 cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this project? This cannot be undone."
                    );
                    if (confirmDelete) {
                      handleDeleteProject();
                    }
                  }}
                />
                <a
                  href={`/project/${slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-9 h-9 p-2" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 📄 Main content area */}
        <div className="flex flex-col lg:flex-row w-full justify-between gap-6">
          {/* 🧱 Left column: editable project content blocks */}
          <div className="flex flex-row w-full lg:w-2/3">
            <div className="white-box h-fit">
              <div className="text-h3 blue pb-4 ">Content</div>
              <div className="flex flex-col gap-4">
                <EditIntro
                  ref={editorRef}
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
                    slug: project.slug, // ← ensure slug is passed down for uploads
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

          {/* 🖼️ Right column: editable card fields */}
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
    </div>
  );
}
