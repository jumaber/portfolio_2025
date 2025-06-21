import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";

export function EditOutcomes({ form: initialForm, onChange }) {
  const [form, setForm] = useState({
    outcomes: [],
  });

  const [newOutcome, setNewOutcome] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  function handleAddOutcome() {
    if (!newOutcome.trim()) return;
    const updatedOutcomes = [...form.outcomes, newOutcome.trim()];
    const updatedForm = { ...form, outcomes: updatedOutcomes };
    setForm(updatedForm);
    onChange(updatedForm);
    setNewOutcome("");
  }

  function handleRemove(index) {
    const updatedOutcomes = form.outcomes.filter((_, i) => i !== index);
    const updatedForm = { ...form, outcomes: updatedOutcomes };
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
          <div className="component-title">Outcomes</div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4">
          {/* Existing outcomes */}
          <div className="flex flex-wrap">
            {form.outcomes.map((item, index) => (
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

          {/* Input for new Outcome */}
          <div className="form-header mt-4">Add New Outcome</div>
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={newOutcome}
              onChange={(e) => setNewOutcome(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddOutcome();
              }}
              placeholder="Here your new outcome..."
              className="form-input-list "
            />
            <button
              onClick={handleAddOutcome}
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
