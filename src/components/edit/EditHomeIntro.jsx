import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { ChevronRight } from "lucide-react";

export function EditHomeIntro({data, onChange}) {

  const [form, setForm] = useState({
    greet: "",
    title: "",
    subtitle: "",
    description: "",
    githubURL: "",
    linkedinURL: "",
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
            <div className="component-title">Intro</div>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4">
            <div className="form-header">Greet</div>
            <input
              type="text"
              name="greet"
              value={form.greet}
              onChange={handleChange}
              placeholder="Greet"
              className="form-input"
            />

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

            <div className="form-header">Description</div>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="form-input"
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

            <div className="form-header">LinkedIn URL</div>
            <input
              type="text"
              name="linkedinURL"
              value={form.linkedinURL}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="form-input"
            />
          </div>
        )}
      </div>
    );    
}
