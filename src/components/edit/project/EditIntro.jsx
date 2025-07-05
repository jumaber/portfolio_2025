import {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useImperativeHandle,
} from "react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";
import { EditorJSBlock } from "../pages/EditorJSBlock";

export const EditIntro = forwardRef(({ data, onChange }, ref) => {
  const fileInputRef = useRef(null);
  const editorRef = useRef();

  // expose save() through ref passed from EditHome
  useImperativeHandle(ref, () => ({
    async save() {
      if (editorRef.current?.save) {
        const content = await editorRef.current.save();
        setForm((prev) => ({
          ...prev,
          description: content,
        }));
        onChange({
          ...form,
          description: content,
        }); // ✅ send full updated form back to parent
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

  useEffect(() => {
    console.log("Received data:", data);
    if (data) setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  const handleDescriptionChange = useCallback((newContent) => {
    setForm((prev) => ({
      ...prev,
      description: newContent,
    }));
  }, []);

  // upload to Cloudinary
  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

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
      console.log("Cloudinary response:", data);

      const updatedForm = { ...form, image: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  }

  return (
    <div className="grey-box">
      <div
        className="flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 leading-none">
          <div className="">
            {isOpen ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </div>
          <div className="component-title">Intro</div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="form-header">Title</div>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />

          <div className="form-header">Subtitle</div>
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Subtitle"
            className="form-input"
          />

          <div className="form-header">Location</div>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
            className="form-input"
          />

          <div className="form-header">Working Period</div>
          <input
            type="text"
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

          <div className="form-header flex justify-between items-center">
            <span>Image</span>
            <ButtonSmall
              text="Upload Image"
              onClick={() => fileInputRef.current.click()}
              image={null}
              to=""
            />
          </div>

          {form.image && (
            <img
              src={form.image}
              alt="Intro"
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

          <div className="form-header">Description</div>
          <div className="min-h-fit">
            <EditorJSBlock
              ref={editorRef}
              data={form.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="form-header">Tools</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {form.tech?.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-white text-[#0C0093] hover:bg-red-100 px-2 py-1 rounded-full text-sm mono"
              >
                {item}
                <button
                  onClick={() => {
                    const updatedTech = form.tech.filter((_, i) => i !== index);
                    const updatedForm = { ...form, tech: updatedTech };
                    setForm(updatedForm);
                    onChange(updatedForm);
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
                const value = e.target.value.trim();
                if (value && !form.tech?.includes(value)) {
                  const updatedTech = [...(form.tech || []), value];
                  const updatedForm = { ...form, tech: updatedTech };
                  setForm(updatedForm);
                  onChange(updatedForm);
                  e.target.value = "";
                }
              }
            }}
            className="form-input"
          />

          <div className="form-header">Roles</div>

          <div className="flex flex-wrap gap-2 mb-4">
            {form.roles?.map((item, index) => (
              <span
                key={index}
                className="flex items-center gap-1 bg-white text-[#0C0093] hover:bg-red-100 px-2 py-1 rounded-full text-sm mono"
              >
                {item}
                <button
                  onClick={() => {
                    const updatedTech = form.roles.filter(
                      (_, i) => i !== index
                    );
                    const updatedForm = { ...form, roles: updatedTech };
                    setForm(updatedForm);
                    onChange(updatedForm);
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
                const value = e.target.value.trim();
                if (value && !form.roles?.includes(value)) {
                  const updatedTech = [...(form.roles || []), value];
                  const updatedForm = { ...form, roles: updatedTech };
                  setForm(updatedForm);
                  onChange(updatedForm);
                  e.target.value = "";
                }
              }
            }}
            className="form-input"
          />
        </div>
      )}
    </div>
  );
}
)
