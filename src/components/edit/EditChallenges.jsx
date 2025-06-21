import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Plus } from "lucide-react";

export function EditChallenges({ form: initialForm, onChange }) {
  const [form, setForm] = useState({
    challenges: [],
  });

  const [newChallenge, setNewChallenge] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);
  
  function handleAddChallenge() {
    if (!newChallenge.trim()) return;
    const updatedChallenges = [...form.challenges, newChallenge.trim()];
    const updatedForm = { ...form, challenges: updatedChallenges };
    setForm(updatedForm);
    onChange(updatedForm);
    setNewChallenge("");
  }

  function handleRemove(index) {
    const updatedChallenges = form.challenges.filter((_, i) => i !== index);
    const updatedForm = { ...form, challenges: updatedChallenges };
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
          <div className="component-title">Challenges</div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4">
          {/* Existing challenges */}
          <div className="flex flex-wrap">
            {form.challenges.map((item, index) => (
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

          {/* Input for new challenge */}
          <div className="form-header mt-4">Add New Challenge</div>
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={newChallenge}
              onChange={(e) => setNewChallenge(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddChallenge();
              }}
              placeholder="Here your new challenge..."
              className="form-input-list "
            />
            <button
              onClick={handleAddChallenge}
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
