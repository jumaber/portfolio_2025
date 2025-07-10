import { useParams, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Intro } from "../components/projects/Intro";
import { Challenge } from "../components/projects/Challenge";
import { Outcome } from "../components/projects/Outcome";
import { Learnings } from "../components/projects/Learnings";
import { Wireframes } from "../components/projects/Wireframes";
import { NavBar } from "../components/other/NavBar";
import { Process } from "../components/projects/Process";
import { HeroImage } from "../components/projects/HeroImage";
import { RelatedProjects } from "../components/projects/RelatedProjects";
import { CustomHtml } from "../components/projects/CustomHtml";
import { LoadingScreen } from "../components/other/LoadingScreen";
import { ScrollTracker } from "../components/other/ScrollTracker";

export function SingleProject() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
      .then((res) => {
        if (res.status === 404) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        // if backend returns empty object for non-existent slugs
        if (Object.keys(data).length === 0) {
          setNotFound(true);
        } else {
          setProject(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        setNotFound(true);
      });
  }, [slug]);

  if (notFound) {
    return <Navigate to="/404" replace />;
  }

  if (!project) {
    return <LoadingScreen />;
  }

  const {
    title,
    subtitle,
    location,
    period,
    liveUrl,
    githubUrl,
    description,
    image,
    hero,
    challenges,
    outcomes,
    learnings,
  } = project;

  return (
    <>
      <NavBar />
      <ScrollTracker
        sectionIds={[
          "intro",
          "hero",
          "challenge",
          "process",
          "outcome",
          "learnings",
          "wireframes",
          "customHtml",
          "relatedProjects",
        ]}
      />
      <div className="h-screen bg-[#FFF6F6] flex flex-col items-start max-w-full overflow-x-hidden">
        {/* Intro Section */}
        <section id="intro" className="z-10 w-full">
          <Intro
            title={title}
            subtitle={subtitle}
            location={location}
            period={period}
            liveUrl={liveUrl}
            githubUrl={githubUrl}
            description={description}
            image={image}
            tech={project.tech}
            roles={project.roles}
          />
        </section>

        {/* Hero */}
        <section id="hero">
          <HeroImage hero={hero} />
        </section>

        {/* Challenge */}
        <section id="challenge">
          {challenges && <Challenge challenges={challenges} />}
        </section>

        {/* The Process */}
        <section id="process">
          {project.process && <Process process={project.process} />}
        </section>

        {/* Outcome */}
        <section id="outcome">
          {outcomes && <Outcome outcomes={outcomes} />}
        </section>

        {/* Learnings */}
        <section id="learnings">
          {learnings && <Learnings learnings={learnings} />}
        </section>

        {/* Wireframes */}
        <section id="wireframes">
          <Wireframes
            wireframes={project.wireframes}
            title={project.wireframesTitle || "Wireframes"}
          />
        </section>

        {/* Custom HTML */}
        {project.customHtml && (
          <section id="customHtml">
            <CustomHtml html={project.customHtml} />
          </section>
        )}

        {/* Related Projects */}
        <section id="relatedProjects">
          <RelatedProjects key={slug} currentSlug={slug} />
        </section>
      </div>
    </>
  );
}
