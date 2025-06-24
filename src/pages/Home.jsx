import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { NavBar } from "../components/other/NavBar";
import { Footer } from "../components/other/Footer";
import { Experience } from "../components/home/Experience";
import { Contact } from "../components/home/Contact";
import { CardGrid } from "../components/home/CardGrid";
import { HomeIntro } from "../components/home/HomeIntro";
import { ScrollTracker } from "../components/other/ScrollTracker";

import Github from "/src/assets/github.svg";
import Linkedin from "/src/assets/linkedin.svg";
import Julia from "/src/assets/julia.png";



export function Home() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    fetch("https://portfolio-2025-wyed.onrender.com/api/pages/home")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched page:", data);
        setPage(data);
      })
      .catch((err) => console.error("Failed to fetch page:", err));
  }, []);

  if (!page) return <div className="p-10">Loading...</div>;

  const {
    greet,
    title,
    subtitle,
    description,
    githubURL,
    linkedinURL
  } = page;
  console.log({ greet, title, subtitle, description, githubURL, linkedinURL });

  return (
    <>
      <NavBar />
      <ScrollTracker />

      <div className="h-full bg-[#FFF6F6] flex flex-col items-start px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
        <div className="w-full max-w-[800px] mx-auto">
          <HomeIntro
            greet={greet}
            title={title}
            subtitle={subtitle}
            description={description}
            githubURL={githubURL}
            linkedinURL={linkedinURL}
          />

          {/* Featured Projects */}
          <CardGrid />

          {/* About Me */}
          <section
            id="about"
            className="flex flex-col w-full py-4 md:py-10 lg:py-20"
          >
            <div className="text-h2 blue pb-4 md:pb-6">About Me</div>
            <div className="flex flex-col items-start w-full md:flex-row gap-10">
              <div className="paragraph">
                I'm a Senior Product Experience Designer with a strong track
                record of driving design consistency, improving user
                satisfaction, and contributing to business growth. <br />
                I believe that great product design requires a solid
                understanding of how things are built—especially when most
                resources go into development. This perspective helps me bridge
                the gap between design and engineering, contributing to
                solutions that are both thoughtful and scalable. <br />
                With a background in Fine Arts, entrepreneurial experience as
                the founder of Artconnect.com, and a career spanning both
                startups and larger companies, I bring a balance of creativity,
                structure, and systems thinking to every project.
              </div>
              <img
                src={Julia}
                alt="Julia Mari Bernaus"
                className="w-full md:max-w-2xs h-auto object-contain"
              />
            </div>
          </section>

          {/* Experience */}
          <section id="experience">
            <Experience />
          </section>

          {/* Contact */}
          <section id="contact">
            <Contact />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
