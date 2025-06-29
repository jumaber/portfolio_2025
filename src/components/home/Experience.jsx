import { useState } from "react";

export function Experience({ experience = [] }) {
 
  const [activeCompany, setActiveCompany] = useState(() =>
    experience.length ? experience[0].experienceCompany : null
  );
  

  const activeContent = experience.find(
    (exp) => exp.experienceCompany === activeCompany
  );

  if (!experience.length || !activeContent) return null;

  return (
    <div className="w-full py-20">
      <div className="text-h2 blue pb-8">Working Experience</div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="flex flex-row overflow-x-auto lg:overflow-y-auto lg:flex-col lg:min-w-[200px] max-h-[300px] lg:max-h-[600px]">
          {experience.map(({ experienceCompany }) => (
            <div
              key={experienceCompany}
              className="relative w-full min-w-[150px]"
            >
              <button
                className={`text-h5 text-left w-full px-4 py-4 lg:py-8 transition-all duration-300 ${
                  activeCompany === experienceCompany
                    ? "bg-[#e5dcf9] text-[#0C0093] font-semibold"
                    : "text-[#333] hover:bg-[#f0eaff] hover:text-[#0C0093] cursor-pointer"
                }`}
                onClick={() => setActiveCompany(experienceCompany)}
              >
                {experienceCompany}
              </button>
              <div
                className={`absolute bottom-0 left-0 w-full h-[2px] lg:bottom-auto lg:top-0 lg:left-0 lg:w-[4px] lg:h-full transition-all duration-300 ease-in-out ${
                  activeCompany === experienceCompany
                    ? "bg-[#0C0093]"
                    : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div key={activeCompany} className="flex-1 animate-fade-slide">
          <div className="flex flex-col mb-6">
            <div className="text-h3">
              {activeContent.experienceTitle}
              <span className="blue"> @ {activeContent.experienceCompany}</span>
            </div>
            <div className="text-h5 gray">
              {activeContent.experienceLocation} –{" "}
              {activeContent.experiencePeriod}
            </div>
          </div>

          <ul className="space-y-4 list-none">
            {activeContent.experienceHighlights?.map((item, index) => (
              <li
                key={index}
                className="paragraph black relative md:ml-4 md:pl-4 before:absolute before:bg-[#333] before:left-0 before:top-[0.9rem] before:w-1 before:h-1 before:rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
