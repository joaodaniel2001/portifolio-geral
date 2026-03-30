import { NavItem } from "./nav-item";

const NAV_ITENS = [
  { label: "About", href: "#" },
  { label: "Experiences", href: "#experiences" },
  { label: "Projects", href: "#projects" },
];

export const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 h-24 flex items-center justify-center bg-black/20 backdrop-blur-md border-b border-white/5">
      <div className="container px-4 sm:px-8 flex items-center justify-center">
        {/* Navegação */}
        <nav className="flex items-center sm:gap-10 gap-4">
          {NAV_ITENS.map((item, i) => (
            <NavItem {...item} key={item.label} number={i + 1} />
          ))}
        </nav>
      </div>
    </header>
  );
};