export function Experience() {

  return (
    <div className="py-4 md:py-10 lg:py-20">
      <div className="text-h2 blue pb-4 md:pb-6">Working Experience</div>

      {/* Experience Box */}
      <div className="flex md:flex-row gap-10">
        {/* Left Col */}
        <div className="flex flex-row md:flex-col">
          <div className="experience-nav-active text-h5">Mister Spex</div>
          <div className="experience-nav text-h5  ">CareerFoundry</div>
          <div className="experience-nav text-h5 ">Freelancing</div>
          <div className="experience-nav text-h5">Artconnect</div>
        </div>

        {/* Right Col */}
        <div className="flex flex-col gap-2 min-w-[75%]">
          {/* Title */}
          <div className="flex flex-col">
            <div className="text-h3">
              Senior Product Experience Designer
              <span className="blue"> @ MisterSpex</span>
            </div>
            <div className="text-h5 gray">
              Berlin, Germany – Apr 2021 - Oct 2024
            </div>
          </div>
          <div className="flex flex-col gap-4 p-4">
            <div className="paragraph">
              ✔️ <strong>Redesigned the Lens Configuration Page</strong> to
              eliminate legacy constraints and reduce maintenance risk. Aligned
              cross-functional stakeholders around a shared vision, delivered an
              optimized MVP, and improved consistency across the 6-step
              flow—resulting in a 2% increase in CVR.
            </div>
            <div className="paragraph">
              ✔️ <strong>Led up to 3 user research cycles per month</strong>{" "}
              using a mix of qualitative and quantitative methods to drive
              iterative design and support A/B testing. Informed product
              decisions for the Lens Configurator and other core journeys.
            </div>
            <div className="paragraph">
              ✔️{" "}
              <strong>Streamlined the login and registration experience</strong>{" "}
              by rearchitecting flows with Auth0, simplifying edge cases, and
              improving usability. Resulted in a 20% increase in sign-ups while
              lowering engineering overhead and security risks.
            </div>
            <div className="paragraph">
              ✔️{" "}
              <strong>
                Defined the early design direction for the Premium Private
                Lenses Label
              </strong>{" "}
              in close collaboration with developers, category managers, and
              brand teams—delivering launch-ready assets within two months and
              aligning digital and in-store touchpoints.
            </div>
            <div className="paragraph">
              ✔️{" "}
              <strong>
                Overhauled all company marketing and transactional emails
              </strong>{" "}
              by auditing existing communications and building a scalable,
              responsive design system in Emarsys. Enabled a reduced Marketing
              team and external partners to deliver consistent, high-quality
              campaigns to millions of users.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
