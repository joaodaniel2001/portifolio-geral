import { motion } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  to: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-[#0d0d0d] shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 p-2 bg-black/40 rounded-full text-white/50 hover:text-white border border-white/10"
        >
          <X size={20} />
        </button>
        <div className="relative h-64 w-full bg-[#161616] p-4">
          <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center px-6">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
            ) : (
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#49BEB0_1px,transparent_1px)] [background-size:20px_20px]" />
            )}
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-2 uppercase font-jetbrains">
                {project.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] text-white font-bold font-jetbrains uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4 font-jetbrains">
            Project Details
          </h2>
          <p className="text-gray-400 text-[15px] leading-relaxed mb-8">
            {project.description}
          </p>
          <a
            href={project.to}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#49BEB0] text-[#0a0a0a] font-bold rounded-xl hover:bg-[#3da89b] w-full sm:w-auto transition-all"
          >
            <ArrowUpRight size={18} /> View Project
          </a>
        </div>
      </motion.div>
    </div>
  );
};
