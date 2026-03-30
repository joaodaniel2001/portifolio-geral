import { cn } from "@/app/lib/utils";

type TechBadgeProps = {
  name: string;
  type: string;
};

export const TechBadge = ({ name, type }: TechBadgeProps) => {
  const backend = type === "backend";
  const database = type === "database";
  const frontend = type === "frontend";

  return (
    <span
      className={cn(
        "text-center min-w-20 px-4 py-2  text-sm flex-wrap hover:scale-[1.05] rounded border transition ease-in-out shadow  bg-opacity-10 cursor-pointer",
        backend && "bg-[#34D399]/10  border-[#34D399]/20 text-[#34D399] hover:shadow-[#34d39973]",
        frontend && "bg-[#22D3EE]/10 border-[#22D3EE]/20 text-[#22D3EE] hover:shadow-[#22d3ee88]",
        database && "bg-[#818CF8]/10 border-[#818CF8]/20 text-[#818CF8] hover:shadow-[#818df886]",
      )}
    >
      {name}
    </span>
  );
};
