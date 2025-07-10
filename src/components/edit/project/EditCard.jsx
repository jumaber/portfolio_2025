import { useRef, useState } from "react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export function EditCard({ form, setForm, onChange }) {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!form.slug?.trim()) {
      return alert("Please enter a slug before uploading an image.");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");
    formData.append("folder", `project/${form.slug}`);

    setIsUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/jumaber/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      const updatedForm = { ...form, cardImage: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Card image upload failed:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grey-box">
      {/* Slug */}
      <div className="form-header">
        Slug <span className="text-red-500">*</span>
      </div>
      <input
        type="text"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Project Slug"
        className="form-input"
      />

      {/* Card Title */}
      <div className="form-header">Card Title</div>
      <input
        type="text"
        name="cardTitle"
        value={form.cardTitle}
        onChange={handleChange}
        placeholder="Card Title"
        className="form-input"
      />

      {/* Card Subtitle */}
      <div className="form-header">Card Subtitle</div>
      <input
        type="text"
        name="cardSubtitle"
        value={form.cardSubtitle}
        onChange={handleChange}
        placeholder="Card Subtitle"
        className="form-input"
      />

      {/* Header with upload button */}
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

      {/* Image preview + placeholder + uploading overlay */}
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
        {/* Placeholder */}
        {!isUploading && !form.cardImage && (
          <p className="tag text-[var(--color-gray)]">
            Upload an image to preview
          </p>
        )}

        {/* Spinner overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
            <LoadingAnimation classNameImage="w-16" classNameText="hidden" />
          </div>
        )}

        {/* Uploaded image */}
        {!isUploading && form.cardImage && (
          <img
            src={form.cardImage}
            alt="Card preview"
            className="w-full h-auto rounded-md"
          />
        )}
      </div>
    </div>
  );
}
