import { ButtonDrag } from "../components/dashboard/ButtonDrag";
import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { GAReport } from "../components/dashboard/GAReport";
import { ListItem } from "../components/dashboard/ListItem";
import { Switch } from "../components/dashboard/Switch";
import { useEffect, useState } from "react";

export function Dashboard({ user = "Júlia" }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-2025-wyed.onrender.com/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      <div className="flex flex-row w-full justify-between">
        <div className="dashboard-title">Welcome back, {user}! </div>
        <div className="text-h5 blue">Log out</div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-18">
        <div className="flex flex-col lg:w-3/5 gap-10">
          {/* Summary */}
          <div className="flex flex-row justify-between gap-4 pt-10">
            <div className="white-box">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                9
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="white-box">
            <div className="flex flex-row justify-between items-center">
              <h2 className="box-title">📜 Pages</h2>
              <ButtonSmall
                image={null}
                text="+ Add Page"
                className="bg-[#FFA7A7] text-white"
              />
            </div>
            <div className="py-4">
              <div>item 1</div>
            </div>
          </div>

          {/* Projects */}
          <div className="white-box">
            <div className="flex flex-row justify-between items-center">
              <h2 className="box-title">👩🏻‍💻 Projects</h2>
              <ButtonSmall
                image={null}
                text="+ Add Project"
                className="bg-[#FFA7A7] text-white"
              />
            </div>
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={`py-2 ${
                  index !== projects.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <ListItem title={project.cardTitle} slug={project.slug} />
              </div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="flex flex-col w-full lg:w-2/5">
          <div className="flex flex-col justify-between gap-4 py-10">
            <div className="white-box">
              <div className="flex flex-row justify-between items-center pb-4">
                <h2 className="box-title">📊 Google Analytics</h2>
                <ButtonSmall />
              </div>
              <GAReport />
            </div>
            <div className="white-box">
              <div className="flex flex-row justify-between items-center">
                <h2 className="box-title">🔥 Hotjar</h2>
                <ButtonSmall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
