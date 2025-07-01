import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { LoadingAnimation } from "../components/other/LoadingAnimation";
import { EditImprintContent } from "../components/edit/EditImprintContent.jsx";
import { Trash2, ExternalLink } from "lucide-react";

export function EditImprint() {
  const navigate = useNavigate();

  const [imprint, setPage] = useState(null);
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  // Fetch the  Imprint Page from backend
  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/pages/imprint`)
      .then((res) => res.json())
      .then((data) => setPage(data))
      .catch((err) => console.error("Failed to fetch imprint page:", err));
  }, []);

  function handleFormChange(updatedForm) {
    setPage((prev) => ({ ...prev, ...updatedForm }));
  }

  if (!imprint) return <LoadingAnimation />;

  // Save  Imprint Page
  async function handleSave() {
    try {
      const { _id, __v, ...safePage } = imprint;

      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/pages/imprint`,
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
        console.log("✅ Imprint Page saved!", data);
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

    const imprintData = new FormData();
    imprintData.append("file", file);
    imprintData.append("upload_preset", "portfolio_upload");
    imprintData.append("folder", "portfolio");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/jumaber/image/upload",
        {
          method: "POST",
          body: imprintData,
        }
      );
      const data = await res.json();
      const updatedForm = { ...imprint, image: data.secure_url };
      setPage(updatedForm);
      handleFormChange(updatedForm);
      console.log("✅ Image uploaded:", data.secure_url);
    } catch (err) {
      console.error("Card image upload failed:", err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...imprint, [name]: value };
    setPage(updatedForm);
    handleFormChange(updatedForm);
  }

  // ❌ Delete the Imprint Page (DELETE)
  async function handleDelete() {
    try {
      const res = await fetch(
        `https://portfolio-2025-wyed.onrender.com/api/pages/imprint`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Imprint deleted!");
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
        <div className="flex flex-col lg:flex-row lg:items-center gap-4  pt-6">
          {/* 🔸  Imprint Page title + icons */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full pt-10">
            <div className="flex flex-row justify-between items-end w-full">
              <div className="project-title w-full">
                {imprint.title || "Home"}
              </div>

              {/* 🗑️ Trash + 🔗 Preview Link */}
              <div className="flex flex-row gap-2 bg-white rounded-sm border border-gray-200">
                <Trash2
                  className="w-9 h-9 p-2 cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete this  Imprint Page? This cannot be undone."
                    );
                    if (confirmDelete) {
                      handleDelete();
                    }
                  }}
                />
                <a
                  href={`/${imprint.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-9 h-9 p-2" />
                </a>
              </div>
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
              <EditImprintContent
                data={{
                  imprintResponsible: imprint.imprintResponsible,
                  imprintContactEmail: imprint.imprintContactEmail,
                  imprintDisclaimer: imprint.imprintDisclaimer,
                  imprintDisclaimerEU: imprint.imprintDisclaimerEU,
                  imprintDisclaimerFreelance:
                    imprint.imprintDisclaimerFreelance,
                  imprintStreet: imprint.imprintStreet,
                  imprintPostCode: imprint.imprintPostCode,
                  imprintCity: imprint.imprintCity,
                  imprintCountry: imprint.imprintCountry,
                }}
                onChange={handleFormChange}
                editorRef={editorRef}
              />
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

            {imprint.image && (
              <img
                src={imprint.image}
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
              value={imprint.title}
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
