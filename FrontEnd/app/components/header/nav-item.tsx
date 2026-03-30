"use client";

import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = {
  label: string;
  href: string;
  number: number;
};

export const NavItem = ({ label, href, number }: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-gray-400 flex items-center gap-2 font-medium transition ease-in-out hover:scale-[1.05]",
        isActive && "text-gray-50",
      )}
    >
      <span
        className={cn(
          "text-[#379186] font-jetbrains font-bold hidden lg:block",
          isActive && "text-[#49BEB0]",
        )}
      >
        0{number}.
      </span>
      {label}
    </Link>
  );
};
