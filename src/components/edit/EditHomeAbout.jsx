import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { ButtonSmall } from "../dashboard/ButtonSmall";


export function EditHomeAbout({ data, onChange }) {

  const fileInputRef = useRef();
  
  const [form, setForm] = useState({
    aboutTitle: "",
    aboutDescription: "",
    aboutPortrait: "",
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
      const updatedForm = { ...form, aboutPortrait: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Hero image upload failed:", err);
    }
  }

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
          <div className="component-title">About</div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="form-header">Section Title</div>
          <input
            type="text"
            name="aboutTitle"
            value={form.aboutTitle}
            onChange={handleChange}
            placeholder="Title"
            className="form-input"
          />

          <div className="form-header">Description</div>
          <textarea
            name="aboutDescription"
            value={form.aboutDescription}
            onChange={handleChange}
            placeholder="Description"
            className="form-input"
          />

          <div className="flex flex-row items-center justify-between  my-4 ">
            <div className="form-header">Image</div>
            <ButtonSmall
              text="Upload Image"
              onClick={() => fileInputRef.current.click()}
              className="bg-[#0C0093] text-white"
              image={null}
            />
          </div>

          {form.aboutPortrait && (
            <img
              src={form.aboutPortrait}
              alt="Portrait"
              className="w-full h-auto rounded-md border border-neutral-200"
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
}
