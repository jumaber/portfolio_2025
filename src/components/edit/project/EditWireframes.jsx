import React, { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export function EditWireframes({ form, setForm, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  async function handleImagesUpload(e) {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];
    setIsUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "portfolio_upload");
      formData.append("folder", `project/${form.slug}`);

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/jumaber/image/upload",
          { method: "POST", body: formData }
        );
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error("Wireframes upload failed:", err);
      }
    }

    const updatedWireframes = [...(form.wireframes || []), ...uploadedUrls];
    const updatedForm = { ...form, wireframes: updatedWireframes };
    setForm(updatedForm);
    onChange(updatedForm);
    setIsUploading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  return (
    <div className="grey-box">
      {/* Header toggle */}
      <div
        className="flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 leading-none">
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <div className="component-title">Wireframes</div>
        </div>
      </div>

      {isOpen && (
        <>
          {/* Title Input */}
          <div className="form-header mt-4">Section Title</div>
          <input
            type="text"
            name="wireframesTitle"
            value={form.wireframesTitle || ""}
            onChange={handleChange}
            placeholder="e.g. Wireflows, IA Sketches, etc."
            className="form-input mb-4"
          />

          {/* Upload button + hidden input */}
          <ButtonSmall
            text="Upload Image(s)"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImagesUpload}
            className="hidden"
          />

          {/* Preview grid with upload overlay */}
          <div className="grid grid-cols-2 gap-4 mt-4 w-full">
            {isUploading && (
              <div className="flex flex-col bg-opacity-70 w-full items-center justify-center z-10 h-18 ">
                <LoadingAnimation
                  classNameImage="w-16"
                  classNameText="hidden"
                />
                <p className="tag">Uploading..</p>
              </div>
            )}

            {form.wireframes.map((url, i) => (
              <div key={i} className="relative w-full">
                <button
                  type="button"
                  onClick={() => {
                    const updated = form.wireframes.filter(
                      (_, idx) => idx !== i
                    );
                    const updatedForm = { ...form, wireframes: updated };
                    setForm(updatedForm);
                    onChange(updatedForm);
                  }}
                  className="absolute top-2 right-2 z-10 bg-white text-gray-600 rounded-full w-6 h-6 text-sm flex items-center justify-center hover:bg-red-100"
                  title="Remove image"
                >
                  ✕
                </button>
                <img
                  src={url}
                  alt={`Wireframe ${i + 1}`}
                  className="w-full h-auto rounded-md border border-neutral-200"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
