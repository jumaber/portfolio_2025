import Github from "/src/assets/github.svg";
import Linkedin from "/src/assets/linkedin.svg";
import { Button } from "/src/components/Button"

export function Contact() {
  return (
    <>
      <div className="py-4 md:py-10 lg:py-20">
        <div className="text-h2 blue pb-4 md:pb-6">Contact</div>

        <div className="paragraph pb-10">
          I'm looking for part-time job (max. 32h/week) on a project where I can
          keep on growing professionally and can work in cross-functional teams.{" "}
          <br />
          I’ve already proven that I can match full-time results with fewer
          hours — and I’m ready to do it again 💪.
        </div>

        <div className="flex flex-row items-start gap-4 pb-10">
          <a
            href="https://github.com/jumaber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Github} alt="GitHub icon" className="w-6 h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/juliamaribernaus"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={Linkedin} alt="LinkedIn icon" className="w-6 h-6" />
          </a>
        </div>

        <Button />
      </div>
    </>
  );
}
