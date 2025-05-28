import { useState } from "react";

export function Process({ process }) {
  const [activePhase, setActivePhase] = useState(process[0]?.phase);

  const activeContent = process.find((p) => p.phase === activePhase);

  return (
    <div className="flex flex-col p-4 md:p-8 lg:p-16 w-full h-full py-20 gap-6 bg-[#fef9f8]">
      <div className="text-h2 blue pb-2">Process</div>

      {/* Phase Tabs */}
      <div className="flex flex-col md:flex-row gap-4">
        {process.map(({ phase }) => (
          <button
            key={phase}
            className={`text-h5 px-4 py-2 rounded-md ${
              activePhase === phase
                ? "bg-[#e5dcf9] text-blue font-semibold"
                : "text-gray"
            }`}
            onClick={() => setActivePhase(phase)}
          >
            {phase}
          </button>
        ))}
      </div>

      {/* Highlights */}
      <div className="mt-4 space-y-4">
        {activeContent?.highlights.map((item, index) => (
          <div key={index} className="paragraph list-disc ml-4">
            • {item}
          </div>
        ))}
      </div>
    </div>
  );
}
