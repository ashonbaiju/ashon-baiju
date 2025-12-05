"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { HiExternalLink } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { config } from "@/config";

// 👇 EDIT THIS ARRAY WITH YOUR OWN OPEN SOURCE PROJECTS
const openSourceProjects = [
  // ⭐ NEW PROJECTS YOU REQUESTED
  {
    id: 101,
    name: "Julebi Platform",
    description:
      "A modern marketplace where users can browse products, services, and offers with a clean UI and seamless experience.",
    html_url: "https://julebi.com",
    language: "TypeScript",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["marketplace", "ecommerce", "platform"],
  },
  {
    id: 102,
    name: "Julebi Delivery Boy App",
    description:
      "A delivery-side mobile application handling orders, tracking, and dispatching for the Julebi ecosystem.",
    html_url: "https://julebi.com/delivery",
    language: "Flutter",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["delivery-app", "logistics", "flutter"],
  },
  {
    id: 103,
    name: "OldSyllabus Provider Platform",
    description:
      "A contributor portal where tutors and students upload and share academic syllabi, notes, and materials.",
    html_url: "https://oldsllabus.com",
    language: "Next.js",
    stargazers_count: 0,
    forks_count: 0,
    topics: ["education", "notes", "provider-platform"],
  },

  // ⭐ YOUR EXISTING PROJECTS FROM BEFORE
  {
    id: 1,
    name: "Image Hex Converter",
    description:
      "A simple tool that converts images into hexadecimal representation for developers and designers.",
    html_url: "https://github.com/your-username/image-hex-converter",
    language: "JavaScript",
    stargazers_count: 12,
    forks_count: 3,
    topics: ["tool", "image", "converter"],
  },
  {
    id: 2,
    name: "OldSyllabus Platform",
    description:
      "Platform for sharing and discovering previous year syllabi and notes with a clean UI.",
    html_url: "https://github.com/your-username/oldsyllabus",
    language: "TypeScript",
    stargazers_count: 8,
    forks_count: 1,
    topics: ["nextjs", "education", "platform"],
  },
  {
    id: 3,
    name: "AdFlow Concept",
    description:
      "Concept prototype for an ad-based reward system with revenue sharing for users.",
    html_url: "https://github.com/your-username/adflow-concept",
    language: "JavaScript",
    stargazers_count: 5,
    forks_count: 0,
    topics: ["concept", "ux", "prototype"],
  },
];


const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#2b7489",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Java: "#b07219",
  "C#": "#178600",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Go: "#00ADD8",
  Swift: "#ffac45",
  Kotlin: "#F18E33",
  Rust: "#dea584",
};

const getProjectSize = (index) => {
  const sizes = [
    "col-span-2 sm:col-span-1 md:col-span-2 row-span-1", // First project - wide
    "col-span-1 sm:row-span-2 row-span-1",               // Second project - tall
    "col-span-1 row-span-1",                             // Others
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ];
  return sizes[index % sizes.length];
};

const ProjectCard = ({ project, size }) => {
  const topics = project.topics || [];

  return (
    <motion.a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemAnimation}
      className={`relative group ${size}`}
    >
      <div
        className="
          bg-black
          border-white/30
          border 
          p-3 sm:p-4 md:p-5
          rounded-xl sm:rounded-2xl
          backdrop-blur-md 
          cursor-pointer
          relative overflow-hidden
          h-full
          w-full
          min-h-[120px] sm:min-h-[140px]
          flex flex-col
          shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)]
          transition-all duration-300
          group-hover:border-white/60
          group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]
        "
      >
        {/* shiny overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
        </div>

        {/* glossy top shine */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
        </div>

        <div className="relative flex flex-col gap-2 sm:gap-3 w-full z-10 h-full justify-between">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center space-x-1.5 sm:space-x-2 flex-1 min-w-0">
                <FaGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white flex-shrink-0" />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <h3 className="font-bold text-white text-[10px] sm:text-xs md:text-sm truncate">
                        {project.name}
                      </h3>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{project.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <HiExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
            </div>

            <p className="text-[10px] sm:text-xs text-white/70 line-clamp-2 sm:line-clamp-3 leading-relaxed">
              {project.description || "No description provided"}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
            {topics.length > 0 && (
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {topics
                  .slice(0, size.includes("row-span-2") ? 3 : 2)
                  .map((topic) => (
                    <span
                      key={topic}
                      className="text-[9px] sm:text-[10px] md:text-xs bg-white/10 text-white px-1 sm:px-1.5 md:px-2 py-0.5 rounded-full border border-white/20"
                    >
                      {topic}
                    </span>
                  ))}
                {topics.length > (size.includes("row-span-2") ? 3 : 2) && (
                  <span className="text-[9px] sm:text-[10px] text-white/50">
                    +{topics.length - (size.includes("row-span-2") ? 3 : 2)}
                  </span>
                )}
              </div>
            )}

            <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 flex-wrap">
              {project.language && (
                <div className="flex items-center space-x-0.5 sm:space-x-1">
                  <div
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        languageColors[project.language] || "#ccc",
                    }}
                  />
                  <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">
                    {project.language}
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                <FaStar className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" />
                <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">
                  {project.stargazers_count}
                </span>
              </div>
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                <FaCodeBranch className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-white/70" />
                <span className="text-[9px] sm:text-[10px] md:text-xs text-white/70">
                  {project.forks_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

const GithubProjects = () => {
  // assign size to each card
  const projectsWithSize = openSourceProjects.map((p, index) => ({
    ...p,
    size: getProjectSize(index),
  }));

  return (
    <section className="py-20 relative">
      <div className="w-full">
        <div className="container mx-auto px-4 sm:px-6 md:px-8">
          <div className="space-y-8 sm:space-y-12">
            <div className="space-y-3 sm:space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.8px] border-zinc-900/70 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-primary backdrop-blur-sm shadow-lg"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-xs sm:text-sm font-semibold">
                  Latest Open Source Work
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary px-4"
              >
                Open Source Projects
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-muted-foreground px-4"
              >
                A selection of my public projects and experiments available on
                GitHub.
              </motion.p>
            </div>

            <motion.div
              variants={containerAnimation}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 auto-rows-fr gap-3 sm:gap-4 w-full max-w-6xl mx-auto"
            >
              {projectsWithSize.map((project) => (
                <ProjectCard
                  key={project.id || project.html_url}
                  project={project}
                  size={project.size}
                />
              ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-0">
              <Button
                variant="expandIcon"
                Icon={FaGithub}
                iconPlacement="right"
                className="rounded-full px-5 py-5 sm:px-6 sm:py-6 text-sm sm:text-base w-full sm:w-auto"
                asChild
              >
                <a
                  href={`https://github.com/${config.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View More on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubProjects;
