import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { X } from "lucide-react";
import { ButtonSmall } from "../dashboard/ButtonSmall";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import { EyeOff } from "lucide-react";



export function EditHomeExperience({ form: initialForm, onChange }) {
  const [form, setForm] = useState({ experience: [] });
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [newEntry, setNewEntry] = useState({
    experienceTitle: "",
    experienceCompany: "",
    experienceLocation: "",
    experiencePeriod: "",
    experienceHighlights: [],
  });

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const handleFormUpdate = (updatedExperience) => {
    const updatedForm = { ...form, experience: updatedExperience };
    setForm(updatedForm);
    onChange(updatedForm);
  };

  function handleAddEntry() {
    if (!newEntry.experienceTitle.trim()) return;
    const updated = [...form.experience, { ...newEntry }];
    handleFormUpdate(updated);
    setNewEntry({
      experienceTitle: "",
      experienceCompany: "",
      experienceLocation: "",
      experiencePeriod: "",
      experienceHighlights: [],
    });
  }

  function handleRemoveEntry(index) {
    const updated = form.experience.filter((_, i) => i !== index);
    handleFormUpdate(updated);
  }

  function handleFieldChange(index, field, value) {
    const updated = [...form.experience];
    updated[index][field] = value;
    handleFormUpdate(updated);
  }

  function handleHighlightChange(index, hIndex, value) {
    const updated = [...form.experience];
    updated[index].experienceHighlights[hIndex] = value;
    handleFormUpdate(updated);
  }

  function handleAddHighlight(index, value) {
    if (!value.trim()) return;
    const updated = [...form.experience];
    updated[index].experienceHighlights.push(value.trim());
    handleFormUpdate(updated);
  }

  function handleRemoveHighlight(index, hIndex) {
    const updated = [...form.experience];
    updated[index].experienceHighlights.splice(hIndex, 1);
    handleFormUpdate(updated);
  }

  function toggleExpanded(index) {
    setExpandedIndex(expandedIndex === index ? null : index);
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
          <div className="component-title w-full">Working Experience</div>
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 flex flex-col gap-6">
          {form.experience.map((item, index) => (
            <div key={index} className=" border border-gray-200">
              <div
                className="flex justify-between items-center p-3 gap-2 bg-white rounded-md cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="text-h5 font-semibold text-[var(--color-blue)]">
                  {item.experienceTitle} @ {item.experienceCompany}
                </div>
                <div className="flex flex-row gap-2 bg-[var(--color-lightgray)] rounded-sm">
                  <Trash2
                    className="w-8 h-8 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      const confirmDelete = window.confirm(
                        "Are you sure you want to delete this experience? This cannot be undone."
                      );
                      if (confirmDelete) {
                        handleRemoveEntry(index);
                      }
                    }}
                  />
                  <Pencil
                    className="w-8 h-8 p-2 "
                    onClick={() => toggleExpanded(index)}
                  />
                  
                </div>
              </div>

              {expandedIndex === index && (
                <div className="p-4 flex flex-col gap-2">
                  <div className="form-header">Work Title</div>
                  <input
                    type="text"
                    value={item.experienceTitle}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "experienceTitle",
                        e.target.value
                      )
                    }
                    className="form-input-list"
                    placeholder="Job Title"
                  />

                  <div className="form-header">Company</div>
                  <input
                    type="text"
                    value={item.experienceCompany}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "experienceCompany",
                        e.target.value
                      )
                    }
                    className="form-input-list"
                    placeholder="Company"
                  />

                  <div className="form-header">Location</div>
                  <input
                    type="text"
                    value={item.experienceLocation}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "experienceLocation",
                        e.target.value
                      )
                    }
                    className="form-input-list"
                    placeholder="Location"
                  />

                  <div className="form-header">Period</div>
                  <input
                    type="text"
                    value={item.experiencePeriod}
                    onChange={(e) =>
                      handleFieldChange(
                        index,
                        "experiencePeriod",
                        e.target.value
                      )
                    }
                    className="form-input-list"
                    placeholder="Starting Date - Ending Date"
                  />

                  <div className="form-header pt-2">Highlights</div>
                  {item.experienceHighlights.map((highlight, hIndex) => (
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
            <div className="form-header mt-4">Add New Experience</div>
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="text"
                value={newEntry.experienceTitle}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, experienceTitle: e.target.value })
                }
                placeholder="Job Title"
                className="form-input-list"
              />
              <input
                type="text"
                value={newEntry.experienceCompany}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    experienceCompany: e.target.value,
                  })
                }
                placeholder="Company"
                className="form-input-list"
              />
              <input
                type="text"
                value={newEntry.experienceLocation}
                onChange={(e) =>
                  setNewEntry({
                    ...newEntry,
                    experienceLocation: e.target.value,
                  })
                }
                placeholder="Location"
                className="form-input-list"
              />
              <input
                type="text"
                value={newEntry.experiencePeriod}
                onChange={(e) =>
                  setNewEntry({ ...newEntry, experiencePeriod: e.target.value })
                }
                placeholder="Period"
                className="form-input-list"
              />
              <ButtonSmall
                text="Add New Experience"
                onClick={handleAddEntry}
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

