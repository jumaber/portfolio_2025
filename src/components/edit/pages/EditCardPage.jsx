import { useState, useRef } from "react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export function EditCardPage({ page, onChange }) {
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    onChange({ ...page, [name]: value });
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const pageData = new FormData();
    pageData.append("file", file);
    pageData.append("upload_preset", "portfolio_upload");
    pageData.append("folder", "card-pages");


    setIsUploading(true);
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
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grey-box">
      {/* Upload button */}
      <div className="form-header flex justify-between items-center mt-4">
        <span>Image</span>
        <ButtonSmall
          text="Upload Image"
          onClick={() => fileInputRef.current.click()}
          className="bg-[#0C0093] text-white"
          image={null}
        />
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* 🔑 Preview box */}
      <div
        className="
          relative
          w-full my-4
          rounded-md border border-neutral-200
          bg-white
          min-h-[100px]
          flex items-center justify-center
        "
      >
        {/* 1) Placeholder */}
        {!isUploading && !page.image && (
          <p className="tag text-[var(--color-gray)]">
            Upload an image to preview
          </p>
        )}

        {/* 2) Spinner overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
            <LoadingAnimation classNameImage="w-16" classNameText="hidden" />
          </div>
        )}

        {/* 3) Uploaded image */}
        {!isUploading && page.image && (
          <img
            src={page.image}
            alt="Preview"
            className="w-full h-auto rounded-md"
          />
        )}
      </div>

      {/* Other fields */}
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
