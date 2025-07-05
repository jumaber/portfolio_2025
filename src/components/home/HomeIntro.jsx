export function HomeIntro({
  greet,
  title,
  subtitle,
  description,
  githubURL,
  linkedinURL,
}) {
  const GithubImage =
    "https://res.cloudinary.com/jumaber/image/upload/v1751227206/github_qfexpj.svg";

  const LinkedinImage =
    "https://res.cloudinary.com/jumaber/image/upload/v1751227064/linkedin_e6cjxv.svg";

  return (
    <section
      id="home"
      className="flex flex-col w-full pt-20 gap-1 lg:max-w-[900px]"
    >
      <div className="text-h2 blue">{greet}</div>
      <div className="title pink">{title}</div>
      <div className="subtitle">{subtitle}</div>

      <div className="paragraph lg:max-w-[600px] pt-4">
        {description?.blocks?.map((block, index) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: block.data.text }}
                  className="paragraph pt-4"
                />
              );
            case "header":
              return (
                <h2 key={index} className="text-h2 pt-4">
                  {block.data.text}
                </h2>
              );
            default:
              return null;
          }
        })}
      </div>

      <div className="flex flex-row w-full items-start gap-4 pt-8 pb-12 z-10 relative">
        <a href={githubURL} target="_blank" rel="noopener noreferrer">
          <img
            src={GithubImage}
            alt="GitHub icon"
            className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 rounded-lg p-1 hover:bg-[var(--color-yellow)]"
          />
        </a>
        <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
          <img
            src={LinkedinImage}
            alt="LinkedIn icon"
            className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 rounded-lg p-1 hover:bg-[var(--color-yellow)]"
          />
        </a>
      </div>
    </section>
  );
}
