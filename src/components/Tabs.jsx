// import { useState } from "react";

// export function Process({ process }) {
//   const [activePhase, setActivePhase] = useState(process[0]?.phase);
//   const activeContent = process.find((p) => p.phase === activePhase);

//   return (
//     <div className="py-4 md:py-10 lg:py-20">
//       <div className="text-h2 blue pb-4 md:pb-6">Process</div>

//       {/* Process Box */}
//       <div className="flex flex-col lg:flex-row gap-10">
//         {/* Left Col – Tabs */}
//         <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible">
//           {process.map(({ phase }) => (
//             <div
//               key={phase}
//               className={
//                 activePhase === phase
//                   ? "experience-nav-active text-h5"
//                   : "experience-nav text-h5"
//               }
//               onClick={() => setActivePhase(phase)}
//             >
//               {phase}
//             </div>
//           ))}
//         </div>

//         {/* Right Col – Highlights */}
//         <div className="flex flex-col gap-4 min-w-[75%]">
//           {/* Title (optional) */}
//           <div className="text-h3">{activeContent.phase}</div>
//           {/* Optional: location and period */}
//           {(activeContent.location || activeContent.period) && (
//             <div className="text-h5 gray">
//               {activeContent.location}{" "}
//               {activeContent.location && activeContent.period && "–"}{" "}
//               {activeContent.period}
//             </div>
//           )}

//           <div className="flex flex-col gap-4 p-4">
//             {activeContent.highlights.map((item, index) => (
//               <div key={index} className="paragraph">
//                 ✔️ {item}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
