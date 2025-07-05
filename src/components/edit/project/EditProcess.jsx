import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Plus,
  Trash2,
  Pencil,
  EyeOff,
} from "lucide-react";
import { X } from "lucide-react";
import { ButtonSmall } from "../../dashboard/ButtonSmall";

export function EditProcess({ form: initialForm, onChange }) {
  const [form, setForm] = useState({ process: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [newPhase, setNewPhase] = useState({
    phase: "",
    highlights: [],
    hidden: false,
  });

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const handleFormUpdate = (updatedProcess) => {
    const updatedForm = { ...form, process: updatedProcess };
    setForm(updatedForm);
    onChange(updatedForm);
  };

  function handleAddPhase() {
    if (!newPhase.phase.trim()) return;
    const updated = [...form.process, { ...newPhase }];
    handleFormUpdate(updated);
    setNewPhase({ phase: "", highlights: [], hidden: false });
  }

  function handleRemovePhase(index) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this phase? This cannot be undone."
    );
    if (!confirmDelete) return;
    const updated = form.process.filter((_, i) => i !== index);
    handleFormUpdate(updated);
  }

  function toggleExpanded(index) {
    setExpandedIndex(expandedIndex === index ? null : index);
  }

  function handlePhaseChange(index, value) {
    const updated = [...form.process];
    updated[index].phase = value;
    handleFormUpdate(updated);
  }

  function handleHighlightChange(phaseIndex, highlightIndex, value) {
    const updated = [...form.process];
    updated[phaseIndex].highlights[highlightIndex] = value;
    handleFormUpdate(updated);
  }

  function handleAddHighlight(phaseIndex, value) {
    if (!value.trim()) return;
    const updated = [...form.process];
    updated[phaseIndex].highlights.push(value.trim());
    handleFormUpdate(updated);
  }

  function handleRemoveHighlight(phaseIndex, highlightIndex) {
    const updated = [...form.process];
    updated[phaseIndex].highlights.splice(highlightIndex, 1);
    handleFormUpdate(updated);
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
          <div className="component-title w-full">Process</div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-6">
          {form.process.map((item, index) => (
            <div key={index} className="border border-gray-200">
              <div
                className="flex justify-between items-center p-3 gap-2 bg-white rounded-md cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="text-h5 font-semibold text-[var(--color-blue)]">
                  {item.phase}{" "}
                  {item.hidden && (
                    <span className="text-sm text-gray-500 italic ml-2">
                      (hidden)
                    </span>
                  )}
                </div>
                <div className="flex flex-row gap-2 bg-[var(--color-lightgray)] rounded-sm">
                  <Trash2
                    className="w-8 h-8 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemovePhase(index);
                    }}
                  />
                  <Pencil
                    className="w-8 h-8 p-2"
                    onClick={() => toggleExpanded(index)}
                  />
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-4 flex flex-col gap-2">
                  <div className="form-header">Phase Title</div>
                  <input
                    type="text"
                    value={item.phase}
                    onChange={(e) => handlePhaseChange(index, e.target.value)}
                    className="form-input-list"
                    placeholder="Phase title"
                  />

                  <div className="form-header pt-2">Highlights</div>
                  {item.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        value={highlight}
                        onChange={(e) =>
                          handleHighlightChange(index, hIndex, e.target.value)
                        }
                        className="w-full form-input-list"
                        placeholder="Highlight"
                      />
                      <button
                        onClick={() => handleRemoveHighlight(index, hIndex)}
                        className="text-[#656565]"
                      >
                        <X className="w-4 h-4 hover:text-[var(--color-pink)]" />
                      </button>
                    </div>
                  ))}
                  <AddHighlightInput
                    onAdd={(val) => handleAddHighlight(index, val)}
                  />
                </div>
              )}
            </div>
          ))}

          <div>
            <div className="form-header mt-4">Add New Phase</div>
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="text"
                value={newPhase.phase}
                onChange={(e) =>
                  setNewPhase({ ...newPhase, phase: e.target.value })
                }
                placeholder="Phase Title"
                className="form-input-list"
              />
              <ButtonSmall
                text="Add New Phase"
                onClick={handleAddPhase}
                image={null}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddHighlightInput({ onAdd }) {
  const [value, setValue] = useState("");
  const submit = () => {
    onAdd(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 mt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        placeholder="Add new highlight..."
        className="form-input-list w-full"
      />
      <ButtonSmall
        text="Add"
        onClick={submit}
        bgColor="bg-[#FFA7A7]"
        paddingX="px-4"
        image={null}
      />
    </div>
  );
}
