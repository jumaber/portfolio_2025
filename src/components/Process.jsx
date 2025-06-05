import { useState } from "react";

export function Process({ process }) {
  const [activePhase, setActivePhase] = useState(process[0]?.phase);
  const activeContent = process.find((p) => p.phase === activePhase);

  return (
    <div className="py-4 md:py-10 lg:py-20 px-4 md:px-8 lg:px-48">
      <div className="text-h2 blue pb-4 md:pb-6">Process</div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Tabs */}
        <div className="flex flex-row overflow-x-auto lg:overflow-y-auto lg:flex-col lg:min-w-[200px] max-h-[300px] lg:max-h-[600px]">
          {process.map(({ phase }) => (
            <div key={phase} className="relative w-full min-w-[150px]">
              <button
                className={`text-h5 text-left w-full px-4 py-4 lg:py-8 transition-all duration-300 ${
                  activePhase === phase
                    ? "bg-[#e5dcf9] text-[#0C0093] font-semibold"
                    : "text-[#656565] hover:text-black"
                }`}
                onClick={() => setActivePhase(phase)}
              >
                {phase}
              </button>
              <div
                className={`absolute bottom-0 left-0 w-full h-[2px] lg:bottom-auto lg:top-0 lg:left-0 lg:w-[4px] lg:h-full transition-all duration-300 ease-in-out ${
                  activePhase === phase ? "bg-[#0C0093]" : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <ul
          key={activePhase}
          className="flex-1 space-y-4 animate-fade-slide list-none"
        >
          {activeContent?.highlights.map((item, index) => (
            <li
              key={index}
              className="paragraph relative md:ml-4 md:pl-4 before:absolute before:bg-[#333] before:left-0 before:top-[0.9rem] before:w-1 before:h-1 before:rounded-full"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
