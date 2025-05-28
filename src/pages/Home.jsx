import { NavBar } from "../components/NavBar";
import { Card } from "../components/Card";
import { Footer } from "../components/Footer";
import { Experience } from "../components/Experience";

import Github from "/src/assets/github.svg";
import Linkedin from "/src/assets/linkedin.svg";
import Julia from "/src/assets/julia.png";
import { Button } from "../components/button";
import { SinglePage } from "./SinglePage";

export function Home() {
  return (
    <>
      <NavBar />

      <div className="flex flex-col items-center p-4 md:p-8 lg:p-16 h-full">
        <div className="lg:max-w-[1192px]">
          {/* Intro */}
          <div className="flex flex-col gap-1 lg:max-w-[900px]">
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
            <div className="flex flex-row items-start gap-4 py-12">
              <img src={Github} alt="GitHub icon" className="w-6 h-6" />
              <img src={Linkedin} alt="LinkedIn icon" className="w-6 h-6" />
            </div>
          </div>

          {/* Featured Projects */}
          <div className="py-4 md:py-10 lg:py-20">
            <div className="text-h2 blue pb-4 md:pb-6">Featured Projects</div>
            <div className="flex flex-row w-full gap-10 pb-10">
              <Card />
              <Card />
            </div>
            <div className="flex flex-row w-full gap-10">
              <Card />
              <Card />
              <Card />
            </div>
          </div>

          {/* Other Noteworthy Projects */}
          <div className="py-4 md:py-10 lg:py-20">
            <div className="text-h2 blue pb-4 md:pb-6">
              Other Noteworthy Projects
            </div>
            <div className="flex flex-row  w-full gap-10 pb-10">
              <Card />
              <Card />
              <Card />
            </div>
            <div className="flex flex-row  w-full  gap-10">
              <Card />
              <Card />
              <Card />
            </div>
          </div>

          {/* About Me */}
          <div className="py-4 md:py-10 lg:py-20">
            <div className="text-h2 blue pb-4 md:pb-6">About Me</div>
            <div className="flex flex-col md:flex-row gap-10">
              <div className="paragraph md:min-w-xxs">
                I'm a Senior Product Experience Designer with a strong track
                record of driving design consistency, improving user
                satisfaction, and contributing to business growth. At Mister
                Spex, one of Europe’s leading health e-commerce companies, I led
                high-impact projects spanning user research, prototyping, and
                close collaboration with cross-functional teams. I believe that
                great product design requires a solid understanding of how
                things are built—especially when most resources go into
                development. This perspective helps me bridge the gap between
                design and engineering, contributing to solutions that are both
                thoughtful and scalable. With a background in Fine Arts,
                entrepreneurial experience as the founder of Artconnect.com, and
                a career spanning both startups and larger companies, I bring a
                balance of creativity, structure, and systems thinking to every
                project.
              </div>
              <img
                src={Julia}
                alt="Julia Mari Bernaus"
                className="w-full h-fit"
              />
            </div>
          </div>

          {/* <Experience /> */}

          {/* Contact */}
          <div className="py-4 md:py-10 lg:py-20">
            <div className="text-h2 blue pb-4 md:pb-6">Contact</div>
            <div className="paragraph pb-10">
              I am currently looking for new experiences - get in touch if you
              want to get to know me!
            </div>
            <Button />
          </div>
        </div>
      </div>
      <Footer />
      <SinglePage />
    </>
  );
}
