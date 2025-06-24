import Github from "/src/assets/github.svg";
import Linkedin from "/src/assets/linkedin.svg";

export function HomeIntro(
  {greet,
  title,
  subtitle,
  description,
  githubURL,
  linkedinURL}
) {
  return (
      <section
        id="home"
        className="flex flex-col w-full pt-20 gap-1 lg:max-w-[900px]"
      >
        <div className="text-h2 blue ">{greet}</div>
        <div className="title pink">{title}</div>
        <div className="subtitle">{subtitle}</div>
        <div className="paragraph lg:max-w-[600px] pt-4">{description}</div>
        <div className="flex flex-row w-full items-start gap-4 pt-8 pb-12">
          <a href={githubURL} target="_blank" rel="noopener noreferrer">
            <img src={Github} alt="GitHub icon" className="w-6 h-6" />
          </a>
          <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
            <img src={Linkedin} alt="LinkedIn icon" className="w-6 h-6" />
          </a>
        </div>
      </section>
  );
}
