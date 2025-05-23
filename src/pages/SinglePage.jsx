import { Link } from "react-router-dom"
import LinkIcon from "/src/assets/link_pink.svg";

export function SinglePage({
  title = "Redesigning the Lens Configuration Page",
  subtitle = "Mister Spex",
  location = "Berlin, Germany",
  period = "2022/2023",
  to = "/",
  description = "Mister Spex is one of Europe’s leading online opticians. As a digital-first company, delivering a smooth and cohesive online shopping experience is essential.",
  introImage = "/src/assets/GOP.png",
  hero = "src/assets/hero-gop.png",
    challenge1 = "How can we modernize the login & sign-up experience without creating ongoing development overhead?",
    challenge2 = "How can we design a flexible authentication flow that adapts to all user scenarios?",
    challenge3 = "How can we ensure a seamless user journey even when design trade-offs are made?",
  
}) {
  return (
    <>
      {/* Title Section */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full py-20">
        <div>
          <div className="text-h1">{title}</div>
          <div className="text-h2 blue pb-2">{subtitle}</div>
        </div>

        {/* Place & Period */}
        <div className="flex flex-row items-center gap-3">
          <div className="text-h5 gray">{location} </div>
          <div className="text-h5 gray"> – </div>
          <div className="text-h5 gray">{period}</div>
          <Link to={to}>
            <img src={LinkIcon} alt="link icon" className="w-5 h-5" />
          </Link>
        </div>

        {/* Intro */}
        <div className="flex flex-col md:flex-row lg:gap-10 mt-10">
          <div className="paragraph">{description}</div>
          <img src={introImage} alt={title} className="md:w-[50%]" />
        </div>
      </div>

      {/* Hero */}
      <img src={hero} className="w-full h-auto sm:hidden md:flex" />

      {/* Challenge */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full py-20 gap-6">
        <div className="text-h2 blue pb-2">Challenge</div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">01</div>
          <div className="paragraph">{challenge1}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">02</div>
          <div className="paragraph">{challenge2}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">03</div>
          <div className="paragraph">{challenge3}</div>
        </div>
      </div>

      {/* The Process */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full pt-10 pb-10 gap-6">
        <div className="text-h2 blue pb-2">Process</div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">01</div>
          <div className="paragraph">{challenge1}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">02</div>
          <div className="paragraph">{challenge2}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">03</div>
          <div className="paragraph">{challenge3}</div>
        </div>
      </div>

      {/* The Outcome */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full pt-10 pb-10 gap-6">
        <div className="text-h2 blue pb-2">Outcome</div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">👏</div>
          <div className="paragraph">{}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">👏</div>
          <div className="paragraph">{}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">👏</div>
          <div className="paragraph">{}</div>
        </div>
      </div>

      {/* The Learnings */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full pt-10 pb-10 gap-6">
        <div className="text-h2 blue pb-2">Learnings</div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">01</div>
          <div className="paragraph">{}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">02</div>
          <div className="paragraph">{}</div>
        </div>
        <div className="flex flex-row gap-4 lg:gap-10 items-center">
          <div className="text-h3 blue">03</div>
          <div className="paragraph">{}</div>
        </div>
      </div>

      {/* Wireframes */}
      <div className="flex flex-col items-start p-4 md:p-8 lg:p-16 w-screen h-full pt-10 pb-10 bg-[#f5f5f5] gap-6">
        <div className="text-h2 blue pb-2">Wireframes</div>
        <div className="flex flex-wrap w-full gap-4 lg:gap-10 items-center">
          <img src="/src/assets/image-1.png" className="w-full sm:w-[48%]" />
          <img src="/src/assets/image-2.png" className="w-full sm:w-[48%]" />
          <img src="/src/assets/image-8.png" className="w-full sm:w-[48%]" />
          <img src="/src/assets/image-9.png" className="w-full sm:w-[48%]" />
          <img src="/src/assets/image-3.png" className="w-full sm:w-[48%]" />
          <img src="/src/assets/image-4.png" className="w-full sm:w-[48%]" />
        </div>
      </div>
    </>
  );
}
