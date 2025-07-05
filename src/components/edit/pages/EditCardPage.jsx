import { ButtonSmall } from "../../dashboard/ButtonSmall";

import { useRef } from "react";

export function EditCardPage({ page, onChange }) {
  const fileInputRef = useRef(null);

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...page, [name]: value };
    onChange(updated);
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
      onChange({ ...page, image: data.secure_url });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  }

  return (
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
      <div className="form-header">Slug (*)</div>
      <input
        type="text"
        name="slug"
        value={page.slug}
        onChange={handleChange}
        placeholder="Page Slug"
        className="form-input"
        required
      />
    </div>
  );
}
