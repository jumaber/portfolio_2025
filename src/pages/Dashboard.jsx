import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ButtonSmall } from "../components/dashboard/ButtonSmall";
import { GAReport } from "../components/dashboard/GAReport";
import { ListItem } from "../components/dashboard/ListItem";
import { ExternalLink } from "lucide-react";


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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { SortableItem } from "../components/dashboard/SortableItem";



export function Dashboard() {
  const navigate = useNavigate();

  // Usestate for Projects & Pages
  const [projects, setProjects] = useState([]);
  const [pages, setPages] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;

  // Function to Log out
  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((error) => console.error("Logout failed:", error));
  };

  // Get data for Projects
  useEffect(() => {
    fetch(`${API}/api/projects/`)
      .then((res) => res.json())
      .then((data) =>
        setProjects([...data].sort((a, b) => (a.order || 0) - (b.order || 0)))
      )
      .catch((err) => console.error("Failed to fetch projects:", err));
  }, []);

  // Get data for Pages
  useEffect(() => {
    fetch(`${API}/api/pages/`)
      .then((res) => res.json())
      .then((data) =>
        setPages([...data].sort((a, b) => (a.order || 0) - (b.order || 0)))
      )
      .catch((err) => console.error("Failed to fetch pages:", err));
  }, []);


  // Variables for display at top of Dashboard
  const totalProjects = projects.length;
  const featuredProjects = projects.filter(
    (project) => project.featured
  ).length;
  const totalPages = pages.length;


  // Drag DND
  function handleDragEnd(event) {
    const { active, over } = event;

    // safety check
    if (!active?.id || !over?.id || active.id === over.id) return;

    const oldIndex = projects.findIndex((p) => p.slug === active.id);
    const newIndex = projects.findIndex((p) => p.slug === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      console.warn("⚠️ Invalid drag result. IDs not found in project list.", {
        active,
        over,
      });
      return;
    }

    const reordered = arrayMove(projects, oldIndex, newIndex);
    setProjects(reordered);

    reordered.forEach((project, index) => {
      if (!project.slug) {
        console.warn("❗️ Missing slug for project:", project);
        return;
      }

      console.log(`🔄 Updating ${project.slug} to order ${index + 1}`);

      fetch(
        `${API}/api/projects//${project.slug}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ order: index + 1 }),
        }
      ).catch((err) =>
        console.error(`Failed to update order for ${project.slug}:`, err)
      );
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
      <div className="flex flex-col w-full pb-10">
        <div className="flex flex-row w-full justify-between items-center mb-4">
          <Link to="/">
            <div className="dashboard-title hover:bg-[var(--color-yellow)] p-1 rounded-lg">
              🏠
            </div>
          </Link>
          <div
            className="flex flex-row justify-end text-h5 text-[var(--color-blue)] cursor-pointer gap-1 items-center hover:text-[var(--color-pink)]"
            onClick={handleLogout}
          >
            Log out
          </div>
        </div>
        <div className="dashboard-title">Welcome back, Júlia! </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-12 ">
        <div className="flex flex-col lg:w-3/5 gap-4 lg:gap-10">
          {/* Summary */}
          <div className="flex flex-row justify-between gap-1 lg:gap-4">
            <div className="white-box lg:max-h-[93px]">
              <h2 className="text-[var(--color-black)] text-center font-bold text-[24px] leading-none pb-2">
                {totalPages}
              </h2>
              <p className="text-[var(--color-black)] text-center font-normal text-[14px] leading-none">
                Pages
              </p>
            </div>
            <div className="white-box lg:max-h-[93px]">
              <h2 className="text-[var(--color-black)] text-center font-bold text-[24px] leading-none pb-2">
                {totalProjects}
              </h2>
              <p className="text-[var(--color-black)] text-center font-normal text-[14px] leading-none">
                Projects
              </p>
            </div>
            <div className="white-box lg:max-h-[93px]">
              <h2 className="text-[var(--color-black)] text-center font-bold text-[24px] leading-none pb-2">
                {featuredProjects}
              </h2>
              <p className="text-[var(--color-black)] text-center font-normal text-[14px] leading-none">
                Featured Projects
              </p>
            </div>
          </div>

          {/* Pages */}
          <div className="white-box">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="box-title">
                📜 Pages{" "}
                {/* <span className="text-h5">
                  ({totalPages})
                </span> */}
              </h2>
              <ButtonSmall
                image={null}
                text="+ New Page"
                className="add-button add-button:hover"
                to={`/new/page`}
              />
            </div>

            {pages.map((page, index) => (
              <ListItem
                showDrag={false}
                showSwitch={false}
                title={page.title}
                image={page.image}
                to={page.slug === "home" ? "/" : `/${page.slug}`}
                key={page.slug}
                showBorder={index !== pages.length - 1}
              />
            ))}
          </div>

          {/* Projects */}
          <div className="white-box">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="box-title">
                👩🏻‍💻 Projects{" "}
                {/* <span className="text-h5">
                  ({featuredProjects}
                  /{totalProjects})
                </span> */}
              </h2>
              <ButtonSmall
                image={null}
                text="+ New Project"
                className="add-button add-button:hover"
                to={`/new/project`}
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
                {projects.map((project, index) => (
                  <SortableItem
                    key={project.slug}
                    project={project}
                    setProjects={setProjects}
                    showBorder={index !== projects.length - 1}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>

        {/* Analytics */}
        <div className="flex flex-col w-full lg:w-2/5">
          <h2 className="lg:hidden mt-10 pb-4 text-h1">Analytics</h2>
          <div className="flex flex-col justify-between gap-4 lg:gap-10">
            {/* Analytics Summary */}

            {/* Hotjar */}
            <div className="flex flex-row justify-between gap-1 lg:gap-4">
              <div className="white-box-linked lg:max-h-[93px]">
                <a
                  href="https://insights.hotjar.com/sites/2301909/dashboard/TXb4wU8wuWGckmibW9Qg4a-Site-overview"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h2 className="text-[var(--color-black)] text-center font-bold text-[24px] leading-none pb-2">
                    🔥
                  </h2>
                  <p className="flex flex-row justify-center items-center gap-1 text-[var(--color-black)] font-normal text-[14px]">
                    <span className="text-[10px]">🔗</span>Hotjar
                  </p>
                </a>
              </div>

              <div className="white-box-linked lg:max-h-[93px] flex flex-col justify-between items-center">
                <a
                  href="https://analytics.google.com/analytics/web/#/p492466952/reports/intelligenthome?params=_u..nav%3Dmaui"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-red"
                >
                  <h2 className="text-[var(--color-black)] text-center font-bold text-[24px] leading-none pb-2">
                    📊
                  </h2>
                  <p className="flex flex-row justify-center items-center gap-1 text-[var(--color-black)] font-normal text-[14px]">
                    <span className="text-[10px]">🔗</span> GA
                  </p>
                </a>
              </div>
            </div>

            {/* Looker Studio */}
            <div className="white-box">
              <div className="flex flex-row justify-between items-center pb-4">
                <h2 className="box-title">📊 GA - Looker Studio</h2>
                <a
                  href="https://lookerstudio.google.com/reporting/642c28cd-a396-4f16-b5f4-c4001416b33c"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-9 h-9 p-2 cursor-pointer text-[var(--color-black)] hover:text-[var(--color-pink)]" />
                </a>
              </div>
              <GAReport />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
