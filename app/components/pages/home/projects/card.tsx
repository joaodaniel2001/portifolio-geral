import { motion } from "framer-motion";
import { TbCode } from "react-icons/tb";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
  <motion.div
    layout
    onClick={onClick}
    className="group cursor-pointer flex flex-col h-full rounded-[24px] border border-white/5 bg-[#0d0d0d]/40 overflow-hidden hover:border-[#49BEB0]/30 transition-all duration-500 shadow-2xl"
  >
    <div className="relative h-48 w-full bg-[#161616] overflow-hidden border-b border-white/5">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#49BEB0_1px,transparent_1px)] [background-size:16px_16px]" />
          <TbCode size={40} className="text-white/10" />
        </div>
      )}
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-white group-hover:text-[#49BEB0] transition-colors leading-tight">
          {project.title}
        </h3>
        <TbCode
          className="text-gray-600 group-hover:text-[#49BEB0]"
          size={20}
        />
      </div>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2">
        {project.description}
      </p>
      <div className="flex gap-2 flex-wrap mt-auto">
        {project.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-300 uppercase font-jetbrains"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);
