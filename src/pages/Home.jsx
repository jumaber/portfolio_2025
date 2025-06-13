import { NavBar } from "../components/NavBar";
import { Card } from "../components/home/Card";
import { Footer } from "../components/Footer";
import { Experience } from "../components/home/Experience";
import { Contact } from "../components/home/contact";

import Github from "/src/assets/github.svg";
import Linkedin from "/src/assets/linkedin.svg";
import Julia from "/src/assets/julia.png";
import { Link } from "react-router-dom";
import { ScrollTracker } from "../components/ScrollTracker";


export function Home() {

  return (
    <>
      <NavBar />
      <ScrollTracker />
      <div className="h-full bg-[#FFF6F6] flex flex-col items-start px-4 md:px-8 lg:px-48 max-w-full overflow-x-hidden">
        <div className="w-full max-w-[800px] mx-auto">
          {/* Intro */}

          <section
            id="home"
            className="flex flex-col w-full pt-20 gap-1 lg:max-w-[900px]"
          >
            <div className="text-h2 blue ">Hi,</div>
            <div className="title pink">I am Júlia</div>
            <div className="subtitle">
              I bridge the gap between research, design & front-end development.
            </div>
            <div className="paragraph lg:max-w-[600px] pt-4">
              As a Product Experience Designer with a frontend mindset, I turn
              user insights into thoughtful, feasible solutions that feel good
              to use—and realistic to build.
            </div>
            <div className="flex flex-row w-full items-start gap-4 py-12">
              <Link to="https://github.com/jumaber/" target="_blank">
                <img src={Github} alt="GitHub icon" className="w-6 h-6" />
              </Link>
              <Link
                to="https://www.linkedin.com/in/juliamaribernaus/"
                target="_blank"
              >
                <img src={Linkedin} alt="LinkedIn icon" className="w-6 h-6" />
              </Link>
            </div>
          </section>

          {/* Featured Projects */}
          <section
            id="work"
            className="flex flex-col flex-wrap w-full py-4 md:py-10 lg:py-20"
          >
            <div className="flex flex-col md:flex-row gap-5 pb-5">
              <div className="md:w-1/2">
                <Card slug="lens-config" />
              </div>
              <div className="md:w-1/2">
                <Card slug="email-templates" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 pb-5">
              <div className="md:w-1/2">
                <Card slug="login-redesign" />
              </div>
              <div className="md:w-1/2">
                <Card slug="setting" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 pb-5">
              <div className="md:w-1/2">
                <Card slug="plant-pal" />
              </div>
              <div className="md:w-1/2">
                <Card slug="happy-cat" />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5 pb-5">
              <div className="md:w-1/2">
                <Card slug="linsenpate" />
              </div>
              <div className="md:w-1/2">
                <Card slug="recipe-book" />
              </div>
              {/* <div className="md:w-1/3">
                <Card slug="julia-css-animation" />
              </div> */}
            </div>
          </section>

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
