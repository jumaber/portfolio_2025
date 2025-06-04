import { useState } from "react";

export function Process({ process }) {
  const [activePhase, setActivePhase] = useState(process[0]?.phase);
  const activeContent = process.find((p) => p.phase === activePhase);

  return (
    <div className="w-full py-20 px-4 md:px-8 lg:px-16">
      <div className="text-h2 blue pb-8">Process</div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="flex flex-row justify-between md:justify-start md:flex-col md:min-w-[200px]">
          {process.map(({ phase }) => (
            <div key={phase} className="relative w-full">
              <button
                className={`text-h5 text-left w-full px-4 py-4 md:py-8 transition-all duration-300 ${
                  activePhase === phase
                    ? "bg-[#e5dcf9] text-[#0C0093] font-semibold"
                    : "text-[#656565] hover:text-black"
                }`}
                onClick={() => setActivePhase(phase)}
              >
                {phase}
              </button>

              {/* Decorative line */}
              <div
                className={`absolute bottom-0 left-0 w-full h-[2px] md:bottom-auto md:top-0 md:left-0 md:w-[4px] md:h-full transition-all duration-300 ease-in-out ${
                  activePhase === phase ? "bg-[#0C0093]" : "bg-[#656565]"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Highlights */}
        <ul
          key={activePhase}
          className="flex-1 space-y-4 animate-fade-slide list-none"
        >
          {activeContent?.highlights.map((item, index) => (
            <li
              key={index}
              className="paragraph relative md:ml-4 md:pl-4 before:absolute before:bg-[#0C0093] before:left-0 before:top-[0.9rem] before:w-1 before:h-1 before:rounded-full"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
