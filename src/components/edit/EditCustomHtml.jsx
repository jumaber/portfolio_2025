import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

export function EditCustomHtml({ form, setForm, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleChange(e) {
    const updatedForm = { ...form, customHtml: e.target.value };
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
          {isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <div className="component-title">Custom HTML</div>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="form-header mt-4">HTML Block</div>
          <textarea
            name="customHtml"
            value={form.customHtml || ""}
            onChange={handleChange}
            placeholder="<p>Write your custom HTML here</p>"
            className="form-input min-h-[160px]"
          />
        </>
      )}
    </div>
  );
}
