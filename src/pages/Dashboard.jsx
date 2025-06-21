import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { GAReport } from "../components/dashboard/GAReport";
import { ListItem } from "../components/dashboard/ListItem";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { SortableItem } from "../components/dashboard/SortableItem";



export function Dashboard() {
  const navigate = useNavigate();  

  const [projects, setProjects] = useState([]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout failed:", error));
  };

  useEffect(() => {
    fetch("https://portfolio-2025-wyed.onrender.com/api/projects/")
      .then((res) => res.json())
      .then((data) =>
        setProjects([...data].sort((a, b) => (a.order || 0) - (b.order || 0)))
      )
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  const totalProjects = projects.length;
  const featuredProjects = projects.filter(
    (project) => project.featured
  ).length;
  // const totalPages = pages.length;


  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.slug === active.id);
    const newIndex = projects.findIndex((p) => p.slug === over.id);

    const reordered = arrayMove(projects, oldIndex, newIndex);

    // Update local state
    setProjects(reordered);

    // Update order in backend
    reordered.forEach((project, index) => {
      fetch(
        `https://portfolio-2025-wyed.onrender.com/api/projects/${project.slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: index + 1 }), // assuming you want 1-based order
        }
      ).catch((err) =>
        console.error(`Failed to update order for ${project.slug}:`, err)
      );
      console.log(`Updating ${project.slug} to order ${index + 1}`);

    });
  }
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  return (
    <div className="bg-[#f5f5f5] flex flex-col h-screen w-screen items-start p-4 md:p-8 lg:p-16 overflow-x-hidden">
      <div className="flex flex-col-reverse md:flex-row w-full justify-between">
        <div className="flex flex-row gap-4 items-center">
          <Link to="/">
            <div className="dashboard-title">🏠</div>
          </Link>
          <div className="dashboard-title">Welcome back, Júlia! </div>
        </div>
        <div
          className="flex flex-row justify-end text-h5 blue hover:text-h3 cursor-pointer"
          onClick={handleLogout}
        >
          Log out
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full lg:gap-18">
        <div className="flex flex-col lg:w-3/5 gap-10">
          {/* Summary */}
          <div className="flex flex-row justify-between gap-4 pt-10">
            <div className="white-box">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                2 {/* {totalPages} */}
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Pages
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                {totalProjects}
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Projects
              </p>
            </div>
            <div className="white-box ">
              <h2 className="text-[var(--dark-grey,#333)] text-center font-bold text-[24px] leading-none pb-2">
                {featuredProjects}
              </h2>
              <p className="text-[var(--dark-grey,#333)] text-center font-normal text-[14px] leading-none font-sans">
                Featured Projects
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="white-box">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="box-title">📜 Pages</h2>
              <ButtonSmall
                image={null}
                text="+ Add Page"
                className="bg-[#FFA7A7] text-white"
              />
            </div>{" "}
            <ListItem
              showDrag={false}
              showSwitch={false}
              title="Home"
              image={
                "https://res.cloudinary.com/jumaber/image/upload/v1750400425/Screenshot_2025-06-20_at_08.19.54_wdejp0.png"
              }
              to={"/"}
            />
            <ListItem
              showDrag={false}
              showSwitch={false}
              title="Imprint"
              image={
                "https://res.cloudinary.com/jumaber/image/upload/v1750400425/Screenshot_2025-06-20_at_08.19.54_wdejp0.png"
              }
              to={"/imprint"}
            />
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={projects.map((project) => project.slug)}
                strategy={verticalListSortingStrategy}
              >
                {projects.map((project) => (
                  <SortableItem key={project.slug} project={project} />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Analytics */}
        <div className="flex flex-col w-full lg:w-2/5">
          <div className="flex flex-col justify-between gap-4 py-10">
            {/* Hotjar */}
            <div className="white-box">
              <div className="flex flex-row justify-between items-center">
                <h2 className="box-title">🔥 Hotjar</h2>
                <ButtonSmall
                  className={"bg-[#F5F5F5] text-[#656565]"}
                  to={
                    "https://insights.hotjar.com/sites/2301909/dashboard/TXb4wU8wuWGckmibW9Qg4a-Site-overview"
                  }
                />
              </div>
            </div>

            {/* Google Analytics */}
            <div className="white-box">
              <div className="flex flex-row justify-between items-center pb-4">
                <h2 className="box-title">📊 Google Analytics</h2>
                <ButtonSmall
                  className={"bg-[#F5F5F5] text-[#656565]"}
                  to={
                    "https://lookerstudio.google.com/reporting/642c28cd-a396-4f16-b5f4-c4001416b33c"
                  }
                />
              </div>
              <GAReport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
