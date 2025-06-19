import { Link } from "react-router-dom"
import LinkIcon from "/src/assets/link_pink.svg";
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

  export function SinglePage() {
    const { slug } = useParams();
    const [project, setProject] = useState(null);
  
    useEffect(() => {
      fetch(`https://portfolio-2025-wyed.onrender.com/api/projects/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched project:", data); // 
          setProject(data);
        })
        .catch((err) => console.error("Failed to fetch project:", err));
    }, [slug]);
    
  
    if (!project) return <div className="p-10">Loading...</div>;
  
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
      wireframes,
    } = project;
    console.log({ title, subtitle, description, image, githubUrl });

  
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
          liveUrl={liveUrl}
          githubUrl={githubUrl}
          description={description}
          image={image}
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
        <RelatedProjects key={slug} currentSlug={slug} />
      </div>
    </>
  );
}
