import { useState } from "react";

const experiences = [
  {
    company: "Mister Spex",
    title: "Senior Product Experience Designer",
    location: "Berlin, Germany",
    period: "Apr 2021 - Oct 2024",
    highlights: [
      "Redesigned the Lens Configuration Page to eliminate legacy constraints and reduce maintenance risk. Despite the complexity and impact of the changes, CVR remained stable post-launch—an encouraging sign of product-market fit and a strong foundation for future optimization.",
      "Led up to 3 user research cycles per month using a mix of qualitative and quantitative methods to drive iterative design and support A/B testing. Informed product decisions for the Lens Configurator and other core journeys.",
      "Streamlined the login and registration experience by rearchitecting flows with Auth0, simplifying edge cases, and improving usability. Resulted in a 20% increase in sign-ups while lowering engineering overhead and security risks.",
      "Defined the early design direction for the Premium Private Lenses Label in close collaboration with developers, category managers, and brand teams—delivering launch-ready assets within two months and aligning digital and in-store touchpoints.",
      "Overhauled all company marketing and transactional emails by auditing existing communications and building a scalable, responsive design system in Emarsys. Enabled a reduced Marketing team and external partners to deliver consistent, high-quality campaigns to millions of users.",
    ],
  },
  {
    company: "CareerFoundry",
    title: "UX Mentor",
    location: "Remote",
    period: "2020 - 2021",
    highlights: [
      "Mentored over 20 aspiring UX designers through CareerFoundry’s intensive program.",
      "Gave detailed feedback on design projects and portfolio work, helping students land jobs in the industry.",
    ],
  },
  {
    company: "Freelancing",
    title: "UX/UI Designer",
    location: "Berlin, Germany",
    period: "2018 - 2020",
    highlights: [
      "Designed and built websites and apps for startups in health, e-commerce, and education.",
      "Balanced branding, usability, and performance in fast-paced MVP delivery.",
    ],
  },
  {
    company: "Artconnect",
    title: "Founder & CEO",
    location: "Berlin, Germany",
    period: "2012 - 2018",
    highlights: [
      "Founded and grew Artconnect into a thriving creative community platform with over 25,000 users.",
      "Managed product, partnerships, community, and design while building a small team from scratch.",
    ],
  },
];

export function Experience() {
  const [activeCompany, setActiveCompany] = useState(experiences[0].company);
  const activeContent = experiences.find(
    (exp) => exp.company === activeCompany
  );

  return (
    <div className="w-full py-20">
      <div className="text-h2 blue pb-8">Working Experience</div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs */}
        <div className="flex flex-row overflow-x-auto lg:overflow-y-auto lg:flex-col lg:min-w-[200px] max-h-[300px] lg:max-h-[600px]">
          {experiences.map(({ company }) => (
            <div key={company} className="relative w-full min-w-[150px]">
              <button
                className={`text-h5 text-left w-full px-4 py-4 lg:py-8 transition-all duration-300 ${
                  activeCompany === company
                    ? "bg-[#e5dcf9] text-[#0C0093] font-semibold"
                    : "text-[#333] hover:bg-[#f0eaff] hover:text-[#0C0093]"
                }`}
                onClick={() => setActiveCompany(company)}
              >
                {company}
              </button>
              <div
                className={`absolute bottom-0 left-0 w-full h-[2px] lg:bottom-auto lg:top-0 lg:left-0 lg:w-[4px] lg:h-full transition-all duration-300 ease-in-out ${
                  activeCompany === company ? "bg-[#0C0093]" : "bg-transparent"
                }`}
              />
            </div>
          ))}
        </div>

        {/* Content */}
        <div key={activeCompany} className="flex-1 animate-fade-slide">
          <div className="flex flex-col mb-6">
            <div className="text-h3">
              {activeContent.title}
              <span className="blue"> @ {activeContent.company}</span>
            </div>
            <div className="text-h5 gray">
              {activeContent.location} – {activeContent.period}
            </div>
          </div>

          <ul className="space-y-4 list-none">
            {activeContent.highlights.map((item, index) => (
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
