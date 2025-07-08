import { useState, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export function EditHero({ form, setForm, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef();

  async function handleHeroImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "portfolio_upload");
    formData.append("folder", "portfolio");

    setIsUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/jumaber/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      const updatedForm = { ...form, hero: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Hero image upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grey-box">
      {/* Accordion header */}
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
          <div className="component-title">Hero</div>
        </div>
      </div>

      {isOpen && (
        <>
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
            onChange={handleHeroImageUpload}
            className="hidden"
          />

          {/* Preview box */}
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
            {/* 1) Placeholder when empty */}
            {!isUploading && !form.hero && (
              <p className="tag text-[var(--color-gray)]">
                Upload an image to preview
              </p>
            )}

            {/* 2) Spinner overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
                <LoadingAnimation
                  classNameImage="w-16"
                  classNameText="hidden"
                />
              </div>
            )}

            {/* 3) Uploaded image */}
            {!isUploading && form.hero && (
              <img
                src={form.hero}
                alt="Hero preview"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
