"use client";

import { useState } from "react";
import projectsData from "@/app/data/projects.json";
import { AnimatePresence } from "framer-motion";
import { ProjectFilters } from "./filters";
import { ProjectCard } from "./card";
import { ProjectModal } from "./modal";

export const ProjectsPage = () => {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const categories = [
    { id: "all", label: "All" },
    { id: "web", label: "Web" },
    { id: "security", label: "Security" },
  ];

  const filteredProjects = projectsData.filter((project) =>
    filter === "all" ? true : project.category === filter,
  );

  return (
    <section id="projects">
      <div className="mt-20 max-w-6xl mx-auto px-4 font-sans">
        {/* Título */}
        <div className="mb-10">
          <p className="font-jetbrains text-[#49BEB0]">./projects</p>
          <h1 className="text-4xl font-bold text-white mb-6">
            A selection of my best work.
          </h1>
        </div>

        {/* Filtros */}
        {/*<ProjectFilters
          categories={categories}
          activeFilter={filter}
          onFilterChange={setFilter}
        />*/}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProjects.map((project, i) => (
            <ProjectCard
              key={i}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </AnimatePresence>
      </div>
    </section>
  );
};
