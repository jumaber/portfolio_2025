import { useState } from "react";

export function Switch({ checked = false, onChange }) {
  const [enabled, setEnabled] = useState(checked);

  const toggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div className="flex flex-row justify-between gap-1 items-center">
      <div className="font-semibold text-[#656565] text-[13px]">Featured</div>
      <button
        type="button"
        onClick={toggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${
          enabled ? "bg-[#57E9A9]" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ${
            enabled ? "translate-x-[22px]" : "translate-x-[2px]"
          }`}
        />
      </button>
    </div>
  );
}
