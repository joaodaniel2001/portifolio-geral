"use client";

import { Button } from "@/app/components/button";
import { TechBadge } from "@/app/components/tech-badge";
import TypingText from "@/app/components/ui/typing-text";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
} from "react-icons/tb";

const MOC_HEROLIST = [
  { name: "Python", type: "backend" },
  { name: "C", type: "backend" },
  { name: "C++", type: "backend" },
  { name: "Java", type: "backend" },
  { name: "MySql", type: "database" },
  { name: "PostgreSQL", type: "database" },
  { name: "JavaScript", type: "frontend" },
  { name: "Next.js", type: "frontend" },
  { name: "React.js", type: "frontend" },
];

const MOCK_CONTACTS = [
  {
    url: "https://github.com/joaodaniel2001",
    icons: <TbBrandGithub size={25} />,
  },
  {
    url: "https://www.linkedin.com/in/joão-daniel-a57734330/",
    icons: <TbBrandLinkedin size={25} />,
  },
  {
    url: "https://instagram.com/joaodaniel1al",
    icons: <TbBrandInstagram size={25} />,
  },
];

export default function HeroSection() {
  const [showName, setShowName] = useState(false);

  return (
    <section id="about">
      <div>
        <div
          className={cn(
            "max-w-6xl p-6 md:p-10 rounded-3xl mx-auto",
            "bg-white/[0.01] border border-white/10 backdrop-blur-2xl shadow-2xl",
            "flex flex-col lg:flex-row items-center gap-8 lg:gap-16",
          )}
        >
          <div className="w-full lg:flex-1 flex flex-col">
            <div className="order-1">
              <p className="font-jetbrains text-[#49BEB0] text-lg mb-2 text-left">
                <TypingText
                  as="span"
                  text="Hi, my name is"
                  typingSpeed={60}
                  loop={false}
                  showCursor={!showName}
                  onSentenceComplete={() => setShowName(true)}
                />
              </p>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 text-left min-h-[1.2em]">
                {showName && (
                  <TypingText
                    as="span"
                    text={["João Daniel", "lauvrador", "joaodaniel2001"]}
                    typingSpeed={80}
                    initialDelay={100}
                    cursorCharacter="_"
                    cursorClassName="text-[#49BEB0]"
                  />
                )}
              </h2>
            </div>

            <div className="order-3 space-y-4 text-gray-400 text-base md:text-lg leading-relaxed text-left">
              <p>
                I am a developer driven by logic, complex systems, and the
                challenge of building scalable server-side architectures. My
                core focus lies in{" "}
                <span className="text-gray-200 font-semibold">
                  Backend engineering
                </span>{" "}
                and{" "}
                <span className="text-gray-200 font-semibold">
                  Data Management
                </span>
                .
              </p>
              <p>
                I thrive when designing efficient{" "}
                <span className="text-gray-200 font-semibold">
                  Database schemas
                </span>{" "}
                and robust{" "}
                <span className="text-gray-200 font-semibold">Node.js</span>{" "}
                environments. While I am a backend-first developer, I enjoy
                crafting minimalist frontends with{" "}
                <span className="text-gray-200 font-semibold">React</span> and{" "}
                <span className="text-gray-200 font-semibold">Tailwind</span>.
              </p>

              <div className="my-10 flex flex-wrap gap-3 justify-start">
                {MOC_HEROLIST.map((item, i) => (
                  <TechBadge key={i} name={item.name} type={item.type} />
                ))}
              </div>

              <div className="flex sm:items-center sm:gap-5 sm:flex-row flex-col">
                <a href="mailto:joaodaniel1al@gmail.com">
                  <Button className="shadow-button">
                    Contact me
                    <HiArrowNarrowRight size={18} />
                  </Button>
                </a>
                <div className="text-2xl text-gray-600 flex items-center h-20 gap-3">
                  {MOCK_CONTACTS.map((item, i) => (
                    <a
                      href={item.url}
                      key={`contact-${i}`}
                      target="_blank"
                      className="text-gray-500 hover:text-gray-200 transition-colors"
                    >
                      {item.icons}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative w-80 h-80 lg:w-96 lg:h-96 shrink-0">
            <div className="absolute inset-0 bg-[#49BEB0]/20 blur-[80px] rounded-full" />
            <Image
              src="/download.png"
              alt="João Daniel"
              fill
              sizes="384px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
