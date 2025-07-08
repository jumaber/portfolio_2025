import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../../dashboard/ButtonSmall";
import { EditorJSBlock } from "../EditorJSBlock";
import { LoadingAnimation } from "../../../other/LoadingAnimation";

export function EditHomeAbout({ data, onChange }) {
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  const [form, setForm] = useState({
    aboutTitle: "",
    aboutDescription: {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    },
    aboutPortrait: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // initialize from parent
  useEffect(() => {
    if (!data) return;

    // normalize description if it's a string
    const formatted = {
      ...data,
      aboutDescription:
        typeof data.aboutDescription === "string"
          ? {
              time: Date.now(),
              blocks: [
                {
                  type: "paragraph",
                  data: { text: data.aboutDescription },
                },
              ],
              version: "2.28.2",
            }
          : data.aboutDescription,
    };
    setForm(formatted);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange(updated);
  }

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "portfolio_upload");
    uploadData.append("folder", "home");
    
    setIsUploading(true);
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/jumaber/image/upload",
        { method: "POST", body: uploadData }
      );
      const result = await res.json();
      const updated = { ...form, aboutPortrait: result.secure_url };
      setForm(updated);
      onChange(updated);
    } catch (err) {
      console.error("Portrait upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="grey-box">
      {/* Accordion header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 leading-none">
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="component-title">About</span>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          {/* Section Title */}
          <div className="form-header">Section Title</div>
          <input
            type="text"
            name="aboutTitle"
            value={form.aboutTitle}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />

          {/* Description */}
          <div className="form-header">Description</div>
          <EditorJSBlock
            data={form.aboutDescription}
            onChange={(newContent) => {
              const updated = { ...form, aboutDescription: newContent };
              setForm(updated);
              onChange(updated);
            }}
          />

          {/* Image upload */}
          <div className="form-header flex justify-between items-center my-4">
            <span>Image</span>
            <ButtonSmall
              text="Upload Image"
              onClick={() => fileInputRef.current.click()}
              className="bg-[#0C0093] text-white"
              image={null}
            />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
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
            {!isUploading && !form.aboutPortrait && (
              <p className="tag text-[var(--color-gray)]">
                Upload an image to preview
              </p>
            )}

            {/* 2) Spinner overlay while uploading */}
            {isUploading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
                <LoadingAnimation
                  classNameImage="w-16"
                  classNameText="hidden"
                />
              </div>
            )}

            {/* 3) Show the uploaded portrait */}
            {!isUploading && form.aboutPortrait && (
              <img
                src={form.aboutPortrait}
                alt="Portrait preview"
                className="w-full h-auto rounded-md"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
