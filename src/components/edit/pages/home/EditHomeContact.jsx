import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function EditHomeContact({ data, onChange }) {
  
  const [form, setForm] = useState({
    contactTitle: "",
    contactDescription: "",
    contactButton: "",
    contactButtonURL: "",
    githubURL: "",
    linkedinURL: "",
    githubImage: "",
    linkedinImage:"",
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
          <div className="component-title">Contact</div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="form-header">Section Tite</div>
          <input
            type="text"
            name="contactTitle"
            value={form.contactTitle}
            onChange={handleChange}
            placeholder="Section Title"
            className="form-input"
          />

          <div className="form-header">Description</div>
          <textarea
            name="contactDescription"
            value={form.contactDescription}
            onChange={handleChange}
            placeholder="Description"
            className="form-input"
          />

          <div className="form-header">Button Content</div>
          <input
            type="text"
            name="contactButton"
            value={form.contactButton}
            onChange={handleChange}
            placeholder="Button Content"
            className="form-input"
          />

          <div className="form-header">Button URL</div>
          <input
            type="text"
            name="contactButtonURL"
            value={form.contactButtonURL}
            onChange={handleChange}
            placeholder="Button URL"
            className="form-input"
          />

          <div className="form-header">
            👆 Change Github & Linkedin in Intro Section
          </div>
        </div>
        
      )}
    </div>
  );
}
