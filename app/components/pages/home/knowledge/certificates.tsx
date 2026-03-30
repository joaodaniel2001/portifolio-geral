import { cn } from "@/app/lib/utils";
import { getRelativeTimeString } from "@/app/utils/get-relative-time";
import { ReactNode } from "react";

type KnownTechProps = {
  tech: {
    icon: ReactNode;
    name: string;
    startDate: string;
    to: string;
  };
};

export const KnownTech = ({ tech }: KnownTechProps) => {
  const relativeTime = getRelativeTimeString(new Date(tech.startDate), "en-US");

  return (
    <div
      className={cn(
        "h-full w-full p-6 rounded-xl border border-white/5 bg-white/[0.02]",
        "flex flex-col justify-between transition-all duration-300",
        "hover:bg-[#49BEB0]/10 hover:border-[#49BEB0]/30 group",
      )}
    >
      <a href={tech.to} target="_blank" >
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium text-gray-200 group-hover:text-[#49BEB0] transition-colors leading-snug">
            {tech.name}
          </p>
          <div className="text-gray-500 group-hover:text-[#49BEB0] shrink-0 ml-2">
            {tech.icon}
          </div>
        </div>

        <div className="flex flex-col text-xs sm:text-sm mt-auto">
          <span className="text-gray-500">Started in: {tech.startDate}</span>
          <span className="text-[#49BEB0]/80 font-mono mt-1">
            {relativeTime}
          </span>
        </div>
      </a>
    </div>
  );
};
