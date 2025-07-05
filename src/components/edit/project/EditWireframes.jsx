import { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";

export function EditWireframes({ form, setForm, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef();

  async function handleImagesUpload(e) {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "portfolio_upload");
      formData.append("folder", "portfolio");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/jumaber/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    }

    const updatedWireframes = [...(form.wireframes || []), ...uploadedUrls];
    const updatedForm = { ...form, wireframes: updatedWireframes };
    setForm(updatedForm);
    onChange(updatedForm);
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

          {/* Upload */}
          <ButtonSmall
            text="Upload Image(s)"
            onClick={() => fileInputRef.current.click()}
            className="bg-[#0C0093] text-white"
            image={null}
          />
          <input
            type="file"
            accept="image/*"
            multiple
            ref={fileInputRef}
            onChange={handleImagesUpload}
            className="hidden"
          />

          {/* Display preview */}
          <div className="grid grid-cols-2 gap-4 mt-4">
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
