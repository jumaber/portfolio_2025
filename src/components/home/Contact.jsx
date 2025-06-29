import { Button } from "../other/Button"

export function Contact({
  contactTitle,
  contactDescription,
  contactButton,
  contactButtonURL
}) {

  const GithubImage =
    "https://res.cloudinary.com/jumaber/image/upload/v1751227206/github_qfexpj.svg";

  const LinkedinImage =
    "https://res.cloudinary.com/jumaber/image/upload/v1751227064/linkedin_e6cjxv.svg";

  return (
    <>
      <div className="py-4 md:pt-20">
        <div className="text-h2 blue pb-4 md:pb-6">{contactTitle}</div>

        <div
          className="paragraph pb-10"
          dangerouslySetInnerHTML={{ __html: contactDescription }}
        ></div>

        <div className="flex flex-row items-start gap-4 pb-10">
          <a
            href="https://github.com/jumaber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={GithubImage}
              alt="GitHub icon"
              className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 rounded-lg p-1 hover:bg-[var(--color-yellow)]"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/juliamaribernaus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={LinkedinImage}
              alt="LinkedIn icon"
              className="w-8 h-8 cursor-pointer transition-transform duration-200 hover:scale-105 rounded-lg p-1 hover:bg-[var(--color-yellow)]"
            />
          </a>
        </div>

        <Button text={contactButton} to={contactButtonURL} />
      </div>
    </>
  );
}
