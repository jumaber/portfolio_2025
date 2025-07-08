import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { EditorJSBlock } from "../pages/EditorJSBlock";
import { LoadingAnimation } from "../../other/LoadingAnimation";

export const EditIntro = forwardRef(({ data, onChange }, ref) => {
  const fileInputRef = useRef(null);
  const editorRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  // expose save() through parent ref
  useImperativeHandle(ref, () => ({
    async save() {
      if (editorRef.current?.save) {
        const content = await editorRef.current.save();
        setForm((prev) => {
          const updatedForm = { ...prev, description: content };
          onChange(updatedForm);
          return updatedForm;
        });
        return content;
      }
    },
  }));

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    location: "",
    period: "",
    liveUrl: "",
    githubUrl: "",
    description: {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    },
    image: "",
    tech: [],
    roles: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  // initialize from parent
  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  const handleDescriptionChange = useCallback(
    (newContent) => {
      const updated = { ...form, description: newContent };
      setForm(updated);
      onChange(updated);
    },
    [form, onChange]
  );

  async function handleImageUpload(e) {
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
      const updatedForm = { ...form, image: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Image upload failed:", err);
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
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="component-title">Intro</span>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          {/* text fields... */}
          <div className="form-header">Title</div>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />

          <div className="form-header">Subtitle</div>
          <input
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="form-input"
          />

          <div className="form-header">Location</div>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="form-input"
          />

          <div className="form-header">Working Period</div>
          <input
            name="period"
            value={form.period}
            onChange={handleChange}
            placeholder="Time"
            className="form-input"
          />

          <div className="form-header">Live URL</div>
          <input
            type="url"
            name="liveUrl"
            value={form.liveUrl}
            onChange={handleChange}
            placeholder="Live URL"
            className="form-input"
          />

          <div className="form-header">Github URL</div>
          <input
            type="url"
            name="githubUrl"
            value={form.githubUrl}
            onChange={handleChange}
            placeholder="GitHub URL"
            className="form-input"
          />

          {/* Image upload header */}
          <div className="form-header flex justify-between items-center">
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

          {/* 🔑 Single relative wrapper */}
          <div
            className="
    relative
    w-full
    my-4
    rounded-md
    border border-neutral-200
    bg-white
    min-h-[100px]
    flex items-center justify-center
  "
          >
            {/* Placeholder when empty */}
            {!isUploading && !form.image && (
              <p className="tag text-[var(--color-gray)]">
                Upload an image to preview
              </p>
            )}

            {/* Spinner overlay while uploading */}
            {isUploading && (
              <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center rounded-md z-10">
                <LoadingAnimation classNameImage="w-16" classNameText="hidden" />
              </div>
            )}

            {/* ③ Show the uploaded image in normal flow */}
            {!isUploading && form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="w-full h-auto rounded-md" // <- no absolute here
              />
            )}
          </div>

          {/* Rich-text editor */}
          <div className="form-header">Description</div>
          <div className="min-h-fit">
            <EditorJSBlock
              ref={editorRef}
              data={form.description}
              onChange={handleDescriptionChange}
            />
          </div>

          {/* tech tags */}
          <div className="form-header">Tools</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {form.tech.map((t, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-white text-[#0C0093] px-2 py-1 rounded-full text-sm mono"
              >
                {t}
                <button
                  onClick={() => {
                    const updated = form.tech.filter((_, idx) => idx !== i);
                    const newForm = { ...form, tech: updated };
                    setForm(newForm);
                    onChange(newForm);
                  }}
                  className="text-[#656565]"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a tool (e.g. Figma)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = e.currentTarget.value.trim();
                if (val && !form.tech.includes(val)) {
                  const updated = [...form.tech, val];
                  const newForm = { ...form, tech: updated };
                  setForm(newForm);
                  onChange(newForm);
                  e.currentTarget.value = "";
                }
              }
            }}
            className="form-input"
          />

          {/* role tags */}
          <div className="form-header">Roles</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {form.roles.map((r, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-white text-[#0C0093] px-2 py-1 rounded-full text-sm mono"
              >
                {r}
                <button
                  onClick={() => {
                    const updated = form.roles.filter((_, idx) => idx !== i);
                    const newForm = { ...form, roles: updated };
                    setForm(newForm);
                    onChange(newForm);
                  }}
                  className="text-[#656565]"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add a role (e.g. UX Designer)"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = e.currentTarget.value.trim();
                if (val && !form.roles.includes(val)) {
                  const updated = [...form.roles, val];
                  const newForm = { ...form, roles: updated };
                  setForm(newForm);
                  onChange(newForm);
                  e.currentTarget.value = "";
                }
              }
            }}
            className="form-input"
          />
        </div>
      )}
    </div>
  );
});
