import { Link } from "react-router-dom"
import LinkIcon from "/src/assets/link_pink.svg";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Intro } from "../components/Intro";
import { Challenge } from "../components/Challenge";
import { Outcome } from "../components/Outcome";
import { Learnings } from "../components/Learnings";
import { Wireframes } from "../components/Wireframes";
import { NavBar } from "../components/NavBar";
import { Process } from "../components/Process";
import { HeroImage } from "../components/HeroImage"

  export function SinglePage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
  
    useEffect(() => {
      fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
        .then((res) => res.json())
        .then((data) => setProject(data))
        .catch((err) => console.error("Failed to fetch project:", err));
    }, [slug]);
  
    if (!project) return <div className="p-10">Loading...</div>;
  
    const {
      title,
      subtitle,
      location,
      period,
      link,
      description,
      introImage,
      hero,
      challenges,
      outcomes,
      learnings,
      wireframes,
    } = project;
  
  return (
    <>
      <NavBar />
      <div className="h-full bg-[#FFF6F6] flex flex-col items-start max-w-full overflow-x-hidden">
        {/* Intro Section */}
        <Intro
          title={title}
          subtitle={subtitle}
          location={location}
          period={period}
          link={link}
          description={description}
          introImage={introImage}
        />

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
        <Wireframes wireframes={wireframes} />
      </div>
    </>
  );
}
