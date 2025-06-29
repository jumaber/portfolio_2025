import { useEffect, useState } from "react";

import { NavBar } from "../components/other/NavBar";
import { Footer } from "../components/other/Footer";
import { Experience } from "../components/home/Experience";
import { Contact } from "../components/home/Contact";
import { CardGrid } from "../components/home/CardGrid";
import { HomeIntro } from "../components/home/HomeIntro";
import { ScrollTracker } from "../components/other/ScrollTracker";
import { About } from "../components/home/About";



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
    linkedinURL,
    aboutTitle,
    aboutDescription,
    aboutPortrait,
    contactTitle,
    contactDescription,
    contactButton,
    contactButtonURL,
    experience,
  } = page;

  console.log({
    greet,
    title,
    subtitle,
    description,
    githubURL,
    linkedinURL,
    aboutTitle,
    aboutDescription,
    aboutPortrait,
    contactTitle,
    contactDescription,
    contactButton,
    contactButtonURL,
  });

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
          <section id="work">
            <CardGrid />
          </section>

          {/* About Me */}
          <section id="about">
            <About
              aboutTitle={aboutTitle}
              aboutDescription={aboutDescription}
              aboutPortrait={aboutPortrait}
            />
          </section>

          {/* Experience - TO DO DYNAMICALLY */}
          <section id="experience">
            <Experience
            experience={experience} />
          </section>

          {/* Contact - TO DO DYNAMICALLY */}
          <section id="contact">
            <Contact
              contactTitle={contactTitle}
              contactDescription={contactDescription}
              contactButton={contactButton}
              contactButtonURL={contactButtonURL}
            />
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
