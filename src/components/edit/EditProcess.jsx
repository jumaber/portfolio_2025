import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { X } from "lucide-react";
import { ButtonSmall } from "../dashboard/ButtonSmall";


export function EditProcess({ form: initialForm, onChange }) {
  const [form, setForm] = useState({ process: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [newPhase, setNewPhase] = useState("");

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const handleFormUpdate = (updatedProcess) => {
    const updatedForm = { ...form, process: updatedProcess };
    setForm(updatedForm);
    onChange(updatedForm);
  };

  function handleAddPhase() {
    if (!newPhase.trim()) return;
    const updated = [
      ...form.process,
      { phase: newPhase.trim(), highlights: [] },
    ];
    handleFormUpdate(updated);
    setNewPhase("");
  }

  function handleRemovePhase(index) {
    const updated = form.process.filter((_, i) => i !== index);
    handleFormUpdate(updated);
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
          <div className="component-title">Process</div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-6">
          {/* Each phase */}
          {form.process.map((item, phaseIndex) => (
            <div key={phaseIndex} className="mb-6">
              {/* Phase title */}
              <div className="flex flex-row justify-between items-center pb-4">
                <div className="form-header-list">Phase</div>

                <ButtonSmall
                  onClick={() => handleRemovePhase(phaseIndex)}
                  className="bg-[#0C0093] text-white"
                  image={null}
                  text="Remove Phase"
                />
              </div>
              <div className="flex flex-row items-center gap-2 mb-4">
                <input
                  type="text"
                  value={item.phase}
                  onChange={(e) =>
                    handlePhaseChange(phaseIndex, e.target.value)
                  }
                  className="form-input-list w-full font-bold text-lg"
                  placeholder="Phase title"
                />
              </div>

              {/* Highlights */}
              <div className="form-header">Highlights</div>
              {item.highlights.map((highlight, highlightIndex) => (
                <div
                  key={highlightIndex}
                  className="flex justify-center items-center gap-2 mb-2 form-input-list"
                >
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) =>
                      handleHighlightChange(
                        phaseIndex,
                        highlightIndex,
                        e.target.value
                      )
                    }
                    className="w-full"
                    placeholder="Highlight"
                  />
                  <button
                    onClick={() =>
                      handleRemoveHighlight(phaseIndex, highlightIndex)
                    }
                    className="text-[#656565]"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Add highlight input */}
              <AddHighlightInput
                onAdd={(val) => handleAddHighlight(phaseIndex, val)}
              />
            </div>
          ))}

          {/* Add new phase */}
          <div>
            <div className="form-header mt-4">Add New Phase</div>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="text"
                value={newPhase}
                onChange={(e) => setNewPhase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddPhase()}
                placeholder="Phase title..."
                className="form-input-list w-full"
              />
              
              <button
                onClick={handleAddPhase}
                className="inline-flex items-center justify-center gap-1 rounded-3xl pl-3 pr-4 py-1 w-fit font-semibold text-[13px] bg-[#0C0093] text-white"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Input field and button for adding a new highlight
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

      <button
        onClick={submit}
        className={
          "inline-flex items-center justify-center gap-1 rounded-3xl pl-3 pr-4 py-1 min-w-fit h-fit font-semibold text-[13px] bg-[#FFA7A7] text-white"
        }
      >
        <Plus className="w-4 h-4" />
        Add
      </button>
    </div>
  );
}
