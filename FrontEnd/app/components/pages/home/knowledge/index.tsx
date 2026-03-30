import {
  TbCode,
  TbShieldLock,
  TbScale,
  TbChartDonut,
  TbCloudDataConnection,
  TbFlame,
} from "react-icons/tb";
import certificatesData from "@/app/data/certificates.json";
import { KnownTech } from "./certificates";
import { cn } from "@/app/lib/utils";

const iconMap = {
  code: <TbCode size={26} />,
  shield: <TbShieldLock size={26} />,
  scale: <TbScale size={26} />,
  chart: <TbChartDonut size={26} />,
  cloud: <TbCloudDataConnection size={26} />,
  brick: <TbFlame size={26} />,
};

export const KnowledgePage = () => {
  return (
    <section id="experiences">
      <div className="mt-20 max-w-6xl mx-auto px-4">
        <div>
          <p className="font-jetbrains text-[#49BEB0]">./academic-background</p>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 text-left min-h-[1.2em] mb-10">
            Some of my experiences throughout my life.
          </h1>
        </div>

        <div
          className={cn(
            "flex overflow-x-auto gap-4 pb-8 snap-x snap-mandatory hide-scrollbar",
            "sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-x-visible sm:pb-0",
            "[mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] sm:[mask-image:none] cursor-pointer",
          )}
        >
          {certificatesData.map((cert) => (
            <div
              key={cert.name}
              className="min-w-[300px] sm:min-w-full snap-center flex-shrink-0 flex"
            >
              <KnownTech
                tech={{
                  name: cert.name,
                  startDate: cert.startDate,
                  icon: iconMap[cert.iconName as keyof typeof iconMap] || (
                    <TbCode />
                  ),
                  to: cert.to
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
