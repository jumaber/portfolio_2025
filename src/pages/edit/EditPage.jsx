// 📦 Imports: hooks, components, icons
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ButtonSmall } from "../../components/dashboard/ButtonSmall";
import { LoadingScreen } from "../../components/other/LoadingScreen";
import { Trash2, ExternalLink } from "lucide-react";
import { EditTextBlock } from "../../components/edit/pages/EditTextBlock";
import { EditCardPage } from "../../components/edit/pages/EditCardPage";
import toast from "react-hot-toast";

// 🧩 Component: EditProject
// This screen loads a project from the backend and lets you update or delete it.
// It shares the same visual structure as NewProject, but with editing logic.
export function EditPage() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const { authenticatedFetch } = useAuth();

  // 🛰️ Fetch project data from backend when component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/pages/${slug}`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error("Failed to fetch page:", err));
  }, [slug]);


  // 🔁 Generic handler for form field updates
  function handleFormChange(updatedForm) {
    setPage((prev) => ({ ...prev, ...updatedForm }));
  }

  // 🌀 Show loading animation while data loads
  if (!page) return <LoadingScreen />;

  // 💾 Save project updates (PATCH)
  async function handleSave() {
    const toastId = toast.loading("Saving page…");
    try {
      const { _id, __v, ...safePage } = page; // Remove MongoDB metadata

      const res = await authenticatedFetch(
        `${import.meta.env.VITE_API_URL}/pages/${slug}`,
        {
          method: "PATCH",
          body: JSON.stringify(safePage),
        }
      );

      const data = await res.json();

      if (res.ok) {
                toast.success("Page saved!", { id: toastId });
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
  async function handleDeletePage() {
    const toastId = toast.loading("Deleting page…");
    try {
      const res = await authenticatedFetch(
        `${import.meta.env.VITE_API_URL}/pages/${slug}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
                toast.success("Page deleted!", { id: toastId });
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
                {page.title || "Untitled Page"}
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
                      handleDeletePage();
                    }
                  }}
                />
                <a href={`/${slug}`} target="_blank" rel="noopener noreferrer">
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
                <EditTextBlock
                  data={page.blocks}
                  onChange={(updatedBlocks) =>
                    handleFormChange({ blocks: updatedBlocks })
                  }
                />
              </div>
            </div>
          </div>

          {/* 🖼️ Right column: editable card fields */}

          <div className="white-box h-fit">
            <div className="text-h3 blue w-full h-fit lg:w-1/3 pb-4">Card</div>
            <EditCardPage page={page} onChange={handleFormChange} />
          </div>
        </div>
      </div>
    </div>
  );
}

