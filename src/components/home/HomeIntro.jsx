
export function HomeIntro({
  greet,
  title,
  subtitle,
  description,
  githubURL,
  linkedinURL,
}) {
  const GithubImage =
    "https://res.cloudinary.com/jumaber/image/upload/v1751224205/github_qfexpj.png";
    const LinkedinImage =
      "https://res.cloudinary.com/jumaber/image/upload/v1751224205/linkedin_e6cjxv.png";
  
      return (
        <section
          id="home"
          className="flex flex-col w-full pt-20 gap-1 lg:max-w-[900px]"
        >
          <div className="text-h2 blue ">{greet}</div>
          <div className="title pink">{title}</div>
          <div className="subtitle">{subtitle}</div>
          <div className="paragraph lg:max-w-[600px] pt-4">{description}</div>
          <div className="flex flex-row w-full items-start gap-4 pt-8 pb-12 z-10 relative">
            <a href={githubURL} target="_blank" rel="noopener noreferrer">
              <img
                src={GithubImage}
                alt="GitHub icon"
                className="w-8 h-8 cursor-pointer"
              />
            </a>
            <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
              <img
                src={LinkedinImage}
                alt="LinkedIn icon"
                className="w-8 h-8 cursor-pointer"
              />
            </a>
          </div>
        </section>
      );
}
