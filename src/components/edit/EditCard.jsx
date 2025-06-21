import { useRef } from "react";
import { ButtonSmall } from "../dashboard/ButtonSmall";
import { Switch } from "../dashboard/Switch";

export function EditCard({ form, setForm, onChange }) {
  const fileInputRef = useRef();

  async function handleHeroImageUpload(e) {
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
      const updatedForm = { ...form, hero: data.secure_url };
      setForm(updatedForm);
      onChange(updatedForm);
    } catch (err) {
      console.error("Hero image upload failed:", err);
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
      <div className="form-header flex justify-between items-center mt-4">
        <span>Image</span>
        <ButtonSmall
          text="Upload Image"
          onClick={() => fileInputRef.current.click()}
          className="bg-[#0C0093] text-white"
          image={null}
        />
      </div>

      {form.cardImage && (
        <img
          src={form.cardImage}
          alt="Hero"
          className="w-full h-auto my-4 rounded-md border border-neutral-200"
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleHeroImageUpload}
        className="hidden"
      />

      <div className="form-header">Card Title</div>
      <input
        type="text"
        name="cardTitle"
        value={form.cardTitle}
        onChange={handleChange}
        placeholder="Card Title"
        className="form-input"
      />

      <div className="form-header">Card Subtitle</div>
      <input
        type="text"
        name="cardSubtitle"
        value={form.cardSubtitle}
        onChange={handleChange}
        placeholder="Card Subtitle"
        className="form-input"
      />

      <div className="form-header">Tech Stack</div>

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
                const updatedTech = form.roles.filter((_, i) => i !== index);
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
  );
  
}
