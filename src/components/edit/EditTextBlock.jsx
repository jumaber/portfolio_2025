import { useEffect, useState } from "react";

export function EditTextBlock({ data, onChange }) {
    const [form, setForm] = useState({
      customHTML:"",
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
    <div className="grey-box">
      <div className="form-header mb-4">Text Editor</div>
      <textarea
        name="customHTML"
        value={form.customHTML}
        onChange={handleChange}
        placeholder="Write here..."
        className="form-input"
      />
    </div>
    
  );
}
