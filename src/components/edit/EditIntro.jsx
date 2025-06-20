import { useState, useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ButtonSmall } from "../dashboard/ButtonSmall";


export function EditIntro({ data, onChange }) {

  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    location: "",
    period: "",
    liveUrl: "",
    githubUrl: "",
    description: "",
    image: "",
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    onChange(updatedForm);
  }

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
              className="bg-[#0C0093] text-white"
            />
          </div>

          {form.image && (
            <img
              src={form.image}
              alt="Intro"
              className="max-w-[800px] h-auto my-4 rounded-md border border-neutral-200"
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
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="form-input min-h-fit"
          />
        </div>
      )}
    </div>
  );  
}
