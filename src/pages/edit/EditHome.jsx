import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../../components/dashboard/ButtonSmall.jsx";
import { LoadingAnimation } from "../../components/other/LoadingAnimation.jsx";
import { EditHomeIntro } from "../../components/edit/pages/home/EditHomeIntro.jsx";
import { EditHomeAbout } from "../../components/edit/pages/home/EditHomeAbout.jsx";
import { EditHomeExperience } from "../../components/edit/pages/home/EditHomeExperience.jsx";
import { EditHomeContact } from "../../components/edit/pages/home/EditHomeContact.jsx";
import { Trash2, ExternalLink } from "lucide-react";


export function EditHome() {
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch the page from backend
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/pages/home`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error("Failed to fetch home page:", err));
  }, []);

  function handleFormChange(updatedForm) {
    setPage((prev) => ({ ...prev, ...updatedForm }));
  }

  if (!page) return <LoadingAnimation />;

  // Save Home
  
  async function handleSave() {
    if (editorRef.current?.save) {
      const updatedDescription = await editorRef.current.save();
      page.description = updatedDescription;
    }
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
        console.log("✅ Home Page saved!", data);
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

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const pageData = new FormData();
    pageData.append("file", file);
    pageData.append("upload_preset", "portfolio_upload");
    pageData.append("folder", "portfolio");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/jumaber/image/upload",
        {
          method: "POST",
          body: pageData,
        }
      );
      const data = await res.json();
      const updatedForm = { ...page, image: data.secure_url };
      setPage(updatedForm);
      handleFormChange(updatedForm);
      console.log("✅ Image uploaded:", data.secure_url);
    } catch (err) {
      console.error("Card image upload failed:", err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...page, [name]: value };
    setPage(updatedForm);
    handleFormChange(updatedForm);
  }

  // ❌ Delete the Home Page (DELETE)
  async function handleDelete() {
    try {
      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/pages/home}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Home Page deleted!");
        navigate("/dashboard");
      } else {
        console.error("❌ Delete failed:", data.error);
        alert("Error: " + data.error);
      }
    } catch (err) {
      console.error("❌ Delete error:", err);
      alert("An error occurred while deleting.");
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
        </div>

        {/* 🔸 Edit Home title + icons */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full pt-10">
          <div className="flex flex-row justify-between items-end w-full">
            <div className="project-title w-full">{page.title || "Home"}</div>

            {/* 🗑️ Trash + 🔗 Preview Link */}
            <div className="flex flex-row gap-2 bg-white rounded-sm border border-gray-200">
              <Trash2
                className="w-9 h-9 p-2 cursor-pointer hover:text-red-500"
                onClick={(e) => {
                  e.stopPropagation();
                  const confirmDelete = window.confirm(
                    "Are you sure you want to delete this page? This cannot be undone."
                  );
                  if (confirmDelete) {
                    handleDelete();
                  }
                }}
              />
              <a href={`/`} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-9 h-9 p-2" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-10">
        <div className="flex flex-row w-full lg:w-2/3">
          <div className="white-box  h-fit">
            <div className="text-h3 blue pb-4 ">Content</div>
            <div className="flex flex-col gap-4">
              <EditHomeIntro
                ref={editorRef}
                data={{
                  greet: page.greet,
                  introTitle: page.introTitle,
                  subtitle: page.subtitle,
                  description: page.description,
                  githubURL: page.githubURL,
                  linkedinURL: page.linkedinURL,
                  githubImage: page.githubImage,
                  linkedinImage: page.linkedinImage,
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
              <EditHomeExperience form={page} onChange={handleFormChange} />

              <EditHomeContact data={page} onChange={handleFormChange} />
            </div>
          </div>
        </div>
        <div className="white-box h-fit">
          <div className="text-h3 blue w-full h-fit pb-4">
            Dashboard Preview
          </div>
          <div className="grey-box">
            <div className="form-header flex justify-between items-center mt-4">
              <span>Image</span>
              <ButtonSmall
                text="Upload Image"
                onClick={() => fileInputRef.current.click()}
                className="bg-[#0C0093] text-white"
                image={null}
              />
            </div>

            {page.image && (
              <img
                src={page.image}
                alt="Hero"
                className="w-full h-auto my-4 rounded-md border border-neutral-200"
              />
            )}

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />

            <div className="form-header">Dashboard List Title</div>
            <input
              type="text"
              name="title"
              value={page.title}
              onChange={handleChange}
              placeholder="Title"
              className="form-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
