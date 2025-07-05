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
import { ButtonSmall } from "../../../dashboard/ButtonSmall";
import { EditorJSBlock } from "../EditorJSBlock";


export const EditHomeIntro = forwardRef(({ data, onChange }, ref) => {
  const fileInputRef = useRef();
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
    greet: "",
    introTitle: "",
    subtitle: "",
    description: {
      time: Date.now(),
      blocks: [],
      version: "2.28.2",
    },
    githubURL: "",
    linkedinURL: "",
    githubImage: "", //https://res.cloudinary.com/jumaber/image/upload/v1751227206/github_qfexpj.svg"
    linkedinImage: "", // https://res.cloudinary.com/jumaber/image/upload/v1751227064/linkedin_e6cjxv.svg
  });

  const [isOpen, setIsOpen] = useState(false);
  console.log("👀 form state:", form);

  useEffect(() => {
    console.log("Received data:", data);
    if (data) setForm(data);
  }, [data]);

  useEffect(() => {
    if (!data) return;

    const formatted = {
      ...data,
      description:
        typeof data.description === "string"
          ? {
              time: Date.now(),
              blocks: [
                {
                  type: "paragraph",
                  data: { text: data.description },
                },
              ],
              version: "2.28.2",
            }
          : data.description,
    };

    setForm(formatted);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  const [imageTarget, setImageTarget] = useState(null);

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
      const updatedForm = { ...form, [imageTarget]: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Hero image upload failed:", err);
    }
  }

  const handleDescriptionChange = useCallback((newContent) => {
    setForm((prev) => ({
      ...prev,
      description: newContent,
    }));
  }, []);

  return (
    <div className="grey-box">
      <div
        className="flex flex-row justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 leading-none">
          <div>
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
          <div className="form-header">Greeting - Line 1</div>
          <input
            type="text"
            name="greet"
            value={form.greet}
            onChange={handleChange}
            placeholder="Greet"
            className="form-input"
          />

          <div className="form-header">Greeting - Line 2</div>
          <input
            type="text"
            name="title"
            value={form.introTitle}
            onChange={handleChange}
            placeholder="Greeting"
            className="form-input"
          />

          <div className="form-header">Tagline</div>
          <input
            type="text"
            name="subtitle"
            value={form.subtitle}
            onChange={handleChange}
            placeholder="Tagline"
            className="form-input"
          />

          <div className="form-header">Description</div>
          <EditorJSBlock
            ref={editorRef}
            data={form.description}
            onChange={handleDescriptionChange}
          />

          <div className="form-header">Github URL</div>
          <input
            type="text"
            name="githubURL"
            value={form.githubURL}
            onChange={handleChange}
            placeholder="Github URL"
            className="form-input"
          />

          <div className="flex flex-row items-center justify-between  my-4 ">
            <div className="form-header">Github Icon</div>
            <ButtonSmall
              text="Upload Github Icon"
              onClick={() => {
                setImageTarget("githubImage");
                fileInputRef.current.click();
              }}
              className="bg-[#0C0093] text-white"
              image={null}
            />
          </div>

          {form.githubImage && (
            <img
              src={form.githubImage}
              alt="Portrait"
              className="w-16 h-auto rounded-md border border-neutral-200 p-2 mb-6"
            />
          )}

          <div className="form-header">LinkedIn URL</div>
          <input
            type="text"
            name="linkedinURL"
            value={form.linkedinURL}
            onChange={handleChange}
            placeholder="LinkedIn URL"
            className="form-input"
          />

          <div className="flex flex-row items-center justify-between my-4 ">
            <div className="form-header">LinkedIn Icon</div>
            <ButtonSmall
              text="Upload LinkedIn Icon"
              onClick={() => {
                setImageTarget("linkedinImage");
                fileInputRef.current.click();
              }}
              className="bg-[#0C0093] text-white"
              image={null}
            />
          </div>

          {form.linkedinImage && (
            <img
              src={form.linkedinImage}
              alt="Linkedin Icon"
              className="w-16 h-auto rounded-md border border-neutral-200 p-2 mb-6"
            />
          )}

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
});
