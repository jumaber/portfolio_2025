import { useRef, useState } from "react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export function EditCard({ form, setForm, onChange }) {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");
    const { slug } = form;
    if (!slug) {
      return alert("Please enter a slug before uploading an image.");
    }
    formData.append("folder", `pages/${slug}`);


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
    } finally {
      setIsUploading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  return (
    <div className="grey-box">
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

      {/* Image preview + uploading overlay */}
      <div className="relative w-full my-4 rounded-md border border-neutral-200">
        {isUploading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
            <LoadingAnimation classNameImage="w-16" classNameText="tag" />
          </div>
        )}

        {form.cardImage && (
          <img
            src={form.cardImage}
            alt="Card preview"
            className="w-full h-auto rounded-md"
          />
        )}
      </div>

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

      {/* Slug */}
      <div className="form-header">Slug</div>
      <input
        type="text"
        name="slug"
        value={form.slug}
        onChange={handleChange}
        placeholder="Project Slug"
        className="form-input"
        required
      />
    </div>
  );
}
