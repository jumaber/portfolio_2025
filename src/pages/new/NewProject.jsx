import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../../components/dashboard/ButtonSmall";
import { EditIntro } from "../../components/edit/project/EditIntro";
import { EditHero } from "../../components/edit/project/EditHero";
import { EditCard } from "../../components/edit/project/EditCard";
import { EditProcess } from "../../components/edit/project/EditProcess";
import { EditListField } from "../../components/edit/project/EditListField";
import { EditWireframes } from "../../components/edit/project/EditWireframes";
import { EditCustomHtml } from "../../components/edit/EditCustomHtml";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";

export function NewProject() {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { authenticatedFetch } = useAuth();

  const [project, setProject] = useState({
    title: "",
    subtitle: "",
    location: "",
    period: "",
    liveUrl: "",
    githubUrl: "",
    description: {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    },
    image: "",
    cardTitle: "",
    cardSubtitle: "",
    cardImage: "",
    roles: [],
    tech: [],
    hero: "",
    challenges: [],
    process: [],
    outcomes: [],
    learnings: [],
    wireframes: [],
    customHtml: "",
    slug: "",
  });

  function handleChange(updatedIntro) {
    setProject((prev) => ({ ...prev, ...updatedIntro }));
  }

  function handleFormChange(updatedForm) {
    setProject((prev) => ({ ...prev, ...updatedForm }));
  }

  async function handleSave() {
    if (!project.slug.trim()) {
      return toast.error("Slug is required.");
    }

    const toastId = toast.loading("Saving project…");

    try {
      const res = await authenticatedFetch(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          method: "POST",
          body: JSON.stringify(project),
        }
      );
      const data = await res.json();

      if (res.ok) {
        toast.success("Project created successfully!", { id: toastId });
        navigate("/dashboard");
      } else if (res.status === 409) {
        toast.error("A project with this slug already exists.", {
          id: toastId,
        });
      } else {
        toast.error(`Error: ${data.error || "Unknown error"}`, { id: toastId });
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error: could not save project.", { id: toastId });
    }
  }

  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-center p-4 md:p-8 lg:p-16 overflow-x-hidden">
      <div className="w-full lg:max-w-[1240px]">
        <div className="flex flex-col w-full pb-10">
          <div className="flex flex-row w-full justify-between items-center">
            <Link to="/dashboard">
              <div className="back-button">← Back to Dashboard</div>
            </Link>
            <div className="flex flex-row items-center gap-4">
              <ButtonSmall
                text={"Save"}
                bgColor="bg-[var(--color-blue)]"
                textColor="text-[var(--color-white)]"
                hoverColor="bg-[var(--color-pink)]"
                hoverTextColor="text-white"
                paddingX="px-4 lg:px-6"
                paddingY="py-2 lg:py-3"
                textSize="text-[14px] lg:text-[16px]"
                image={null}
                onClick={handleSave}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full pt-10">
            <div className="flex flex-row justify-between items-end w-full">
              <div className="project-title w-full pb-10">
                {project.title || "New Project"}
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row w-full justify-between gap-6">
            <div className="flex flex-row w-full lg:w-2/3">
              <div className="white-box h-fit">
                <div className="text-h3 blue pb-4">Content</div>
                <div className="flex flex-col gap-4">
                  <EditIntro
                    ref={editorRef}
                    data={project}
                    onChange={handleChange}
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
              <div className="text-h3 blue w-full h-fit lg:w-1/3 pb-4">
                Card
              </div>
              <EditCard
                form={project}
                setForm={setProject}
                onChange={handleFormChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
