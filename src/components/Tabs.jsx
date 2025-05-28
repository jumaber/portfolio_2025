import { useState } from "react";

export function TabbedSection({ title, tabs }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full py-10 bg-[var(--color-cream)] text-black">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16">
        {title && <h2 className="text-h2 mb-6 blue">{title}</h2>}

        <div className="flex flex-col md:flex-row gap-4 md:gap-10">
          {/* Tabs */}
          <div className="flex md:flex-col md:w-1/4">
            {tabs.map((tab, i) => {
              const isActive = i === activeIndex;
              let tabClasses = "text-left text-h5 px-4 py-3 border-l-4 ";

              tabClasses += isActive
                ? "bg-[#E7DDEC] border-[var(--color-blue)] text-[var(--color-blue)]"
                : "border-[var(--color-gray)] text-[var(--color-gray)] hover:text-black";

              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={tabClasses}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            <ul className="flex flex-col gap-4 list-disc list-inside">
              {tabs[activeIndex].content.map((item, i) => (
                <li key={i} className="paragraph">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
