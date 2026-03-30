// filters.tsx
import { cn } from "@/app/lib/utils";

interface Category {
  id: string;
  label: string;
}

interface ProjectFiltersProps {
  categories: Category[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
}

export const ProjectFilters = ({ categories, activeFilter, onFilterChange }: ProjectFiltersProps) => (
  <div className="flex gap-4 mb-10 overflow-x-auto pb-2 hide-scrollbar">
    {categories.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onFilterChange(cat.id)}
        className={cn(
          "relative w-23 h-10 rounded-full border transition-all duration-300 text-sm whitespace-nowrap flex items-center justify-center cursor-pointer",
          activeFilter === cat.id
            ? "bg-[#49BEB0] border-[#49BEB0] text-[#0a0a0a] font-bold"
            : "border-white/10 text-gray-400 hover:border-[#49BEB0]/50"
        )}
      >
        {cat.label}
      </button>
    ))}
  </div>
);