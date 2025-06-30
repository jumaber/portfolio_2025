import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { ButtonSmall } from "../dashboard/ButtonSmall";
import { X } from "lucide-react";


export function EditListField({
  title = "List",
  values = [],
  onChange,
  placeholder = "New item...",
}) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setItems(values || []);
  }, [values]);

  function handleAdd() {
    if (!newItem.trim()) return;
    const updated = [...items, newItem.trim()];
    setItems(updated);
    onChange(updated);
    setNewItem("");
  }

  function handleRemove(index) {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
    onChange(updated);
  }

  function handleEdit(index, value) {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
    onChange(updated);
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
          <div className="component-title">{title}</div>
        </div>
      </div>

      {/* Content */}
      {isOpen && (
        <div className="mt-4">
          {/* Existing items */}
          <div className="flex flex-col gap-2 mb-4">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleEdit(index, e.target.value)}
                  className="w-full form-input-list"
                  placeholder={placeholder}
                />
                <button
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-4 h-4 hover:text-[var(--color-pink)]" />
                </button>
              </div>
            ))}
          </div>

          {/* Input for new item */}
          <div className="form-header mt-4">Add New {title.slice(0, -1)}</div>
          <div className="flex items-center gap-4 w-full">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAdd();
              }}
              placeholder={placeholder}
              className="w-full form-input-list"
            />
            <ButtonSmall onClick={handleAdd} text="Add" paddingX="px-4" />
          </div>
        </div>
      )}
    </div>
  );
}
