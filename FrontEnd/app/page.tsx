import HeroSection from "@/app/components/pages/home/hero-section/hero";
import { KnowledgePage } from "./components/pages/home/knowledge";
import { ProjectsPage } from "./components/pages/home/projects";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col justify-center py-10 relative pt-32">
      <div className="container px-4 mx-auto">
        <HeroSection />
        <KnowledgePage />
        <ProjectsPage />
      </div>  
    </main>
  );
}
