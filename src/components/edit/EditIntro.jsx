import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

export function EditIntro({ data, onChange }) {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    location: "",
    period: "",
    liveUrl: "",
    githubUrl: "",
    description: "",
  });

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
    <>
      <div className="grey-box">
        <div className="flex flex-row justify-between items-center pb-4">
          <div className="component-title ">Intro</div>
          <div className="bg-white px-2 py-2 rounded-md">
            <Trash2 className={"w-4 h-4"} />
          </div>
        </div>
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

        <div className="form-header">Description</div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={8}
          placeholder="Description"
          className="form-input"
        />
      </div>
    </>
  );
}
