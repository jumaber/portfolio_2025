import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonSmall } from "../../components/dashboard/ButtonSmall";
import { TextBlock } from "../../components/pages/TextBlock";
import { EditCardPage } from "../../components/edit/pages/EditCardPage";
import { EditTextBlock } from "../../components/edit/pages/EditTextBlock";

export function NewPage() {
  // 🧭 Navigation hook from React Router
  const navigate = useNavigate();

  // 📦 State: holds the full structure of a project
  const [page, setPage] = useState({
    customHTML: "",
    slug: "",
    image: "",
    title: "",
  });

  // 🔁 Generic update for other form fields
  function handleFormChange(updatedForm) {
    setPage((prev) => ({ ...prev, ...updatedForm }));
  }

  // 💾 Save project to MongoDB via backend POST
  async function handleSave() {
    if (!page.slug.trim()) {
      alert("Slug is required.");
      return;
    }

    try {
      const res = await fetch(
        "https://portfolio-2025-wyed.onrender.com/api/pages/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(page),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("✅ Project created successfully!");
        navigate("/dashboard");
      } else if (res.status === 409) {
        alert("❌ A project with this slug already exists.");
      } else {
        alert("❌ Error: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("❌ Network error: could not save project.");
      console.error(err);
    }
  }

  // 📐 Return: Editor UI layout with sections
  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      {/* 🧭 Header: Back button + Save button */}
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

        {/* ✏️ Page title */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 pt-10">
          <div className="project-title">{page.title || " New Page"}</div>
        </div>
      </div>

      {/* 📄 Main editor layout: Left = content blocks, Right = card preview */}
      <div className="flex flex-col lg:flex-row w-full justify-between gap-10">
        {/* 📦 Left: Content sections */}
        <div className="flex flex-row w-full lg:w-2/3">
          <div className="white-box h-fit">
            <div className="text-h3 blue pb-4">Content</div>
            <div className="flex flex-col gap-4">
              {/* 🧱 Block-based editable sections */}
              <EditTextBlock data={page} onChange={handleFormChange} />
            </div>
          </div>
        </div>

        {/* 🖼️ Right: Card preview and editor */}
        <div className="white-box h-fit">
          <div className="text-h3 blue w-full h-fit pb-4">
            Dashboard Preview
          </div>
          <EditCardPage page={page} onChange={handleFormChange} />
        </div>
      </div>
    </div>
  );
}

