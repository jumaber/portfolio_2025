import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";

export function EditLearnings({ form: initialForm, onChange }) {
  const [form, setForm] = useState({
    challenges: [],
  });

  const [newLearning, setNewLearning] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  function handleAddLearning() {
    if (!newLearning.trim()) return;
    const updatedLearnings = [...form.learnings, newLearning.trim()];
    const updatedForm = { ...form, learnings: updatedLearnings };
    setForm(updatedForm);
    onChange(updatedForm);
    setNewLearning("");
  }

  function handleRemove(index) {
    const updatedLearnings = form.learnings.filter((_, i) => i !== index);
    const updatedForm = { ...form, learnings: updatedLearnings };
    setForm(updatedForm);
    onChange(updatedForm);
  }

  return (
    <div className="grey-box">
      {/* Header */}
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
          <div className="component-title">Learnings</div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4">
          {/* Existing learnings */}
          <div className="flex flex-wrap">
            {form.learnings.map((item, index) => (
              <span
                key={index}
                className="form-input-list flex flex-row justify-between"
              >
                {item}
                <button
                  onClick={() => handleRemove(index)}
                  className="text-[#656565]"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>

          {/* Input for new learning */}
          <div className="form-header mt-4">Add New Learning</div>
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={newLearning}
              onChange={(e) => setNewLearning(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddLearning();
              }}
              placeholder="Here your new learning..."
              className="form-input-list "
            />
            <button
              onClick={handleAddLearning}
              className={
                "inline-flex items-center justify-center gap-1 rounded-3xl pl-3 pr-4 py-1 w-fit h-fit font-semibold text-[13px] bg-[#0C0093] text-white"
              }
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
