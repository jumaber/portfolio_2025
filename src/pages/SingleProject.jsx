import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Intro } from "../components/projects/Intro";
import { Challenge } from "../components/projects/Challenge";
import { Outcome } from "../components/projects/Outcome";
import { Learnings } from "../components/projects/Learnings";
import { Wireframes } from "../components/projects/Wireframes";
import { NavBar } from "../components/other/NavBar";
import { Process } from "../components/projects/Process";
import { HeroImage } from "../components/projects/HeroImage"
import { RelatedProjects } from "../components/projects/RelatedProjects";
import { CustomHtml } from "../components/projects/CustomHtml";
import { LoadingAnimation } from "../components/other/LoadingAnimation";
import { PageNotFound } from "./PageNotFound";


  export function SingleProject() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
    const [status, setStatus] = useState("loading");

  
    useEffect(() => {
      fetch(`/api/projects/${slug}`)
        .then((res) => {
          if (res.status === 404) {
            setStatus("notfound");
            return null;
          }
          if (!res.ok) {
            throw new Error("Network error");
          }
          return res.json();
        })
        .then((data) => {
          if (data) {
            setProject(data);
            setStatus("ok");
          }
        })
        .catch((err) => {
          console.error(err);
          setStatus("error");
        });
    }, [slug]);

    if (status === "loading") {
      return <p>Loading…</p>;
    }

    if (status === "notfound" || status === "error") {
      return <PageNotFound />;
    }
    
    if (!project) return <LoadingAnimation />;
  
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
    console.log({ title, subtitle, description, image, githubUrl });

  
  return (
    <>
      <NavBar />
      <div className="h-screen bg-[#FFF6F6] flex flex-col items-start max-w-full overflow-x-hidden">
        {/* Intro Section */}
        <div className="z-10 items-center w-full">

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
        </div>

        {/* Hero */}
        <HeroImage hero={hero} />

        {/* Challenge */}
        {challenges && <Challenge challenges={challenges} />}

        {/* The Process */}
        {project.process && <Process process={project.process} />}

        {/* Outcome */}
        {outcomes && <Outcome outcomes={outcomes} />}

        {/* Learnings */}
        {learnings && <Learnings learnings={learnings} />}

        {/* Wireframes */}
        <Wireframes
          wireframes={project.wireframes}
          title={project.wireframesTitle || "Wireframes"}
        />

        {/* Custom HTML */}
        {project.customHtml && <CustomHtml html={project.customHtml} />}

        {/* Related Projects */}
        <RelatedProjects key={slug} currentSlug={slug} />
      </div>
    </>
  );
}
