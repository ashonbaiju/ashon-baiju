"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiCode } from "react-icons/hi";
import { FaReact, FaNodeJs, FaGithub, FaAws } from "react-icons/fa";
import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFigma,
  SiGreensock,
  SiThreedotjs,
  SiJavascript,
  SiMaterialdesign,
} from "react-icons/si";
import { TbBrandFramerMotion } from "react-icons/tb";

const skills = [
  {
    name: "AWS",
    icon: <FaAws className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1",
  },
  {
    name: "React.js",
    icon: <FaReact className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "Express",
    icon: <SiExpress className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-2 sm:col-span-1 sm:row-span-2 row-span-1",
  },
  {
    name: "Node.js",
    icon: <FaNodeJs className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "GSAP",
    icon: <SiGreensock className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "Framer Motion",
    icon: <TbBrandFramerMotion className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "Three.js",
    icon: <SiThreedotjs className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-2 sm:col-span-1 md:col-span-2 row-span-1",
  },
  {
    name: "Figma",
    icon: <SiFigma className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
  {
    name: "Material UI",
    icon: <SiMaterialdesign className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
  },
];

const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

const SkillsShowcase = () => {
  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="show"
      className="w-full mt-12"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* 🔹 Big Tech Stack card with shine animation like original boxes */}
        <motion.div
          variants={itemAnimation}
          className="mb-8 sm:mb-10 max-w-4xl mx-auto"
        >
          <div
            className="
              group 
              relative 
              rounded-3xl 
              border border-white/20 
              bg-black/70 
              px-5 py-5 sm:px-7 sm:py-7 md:px-8 md:py-8 
              shadow-[0_10px_40px_rgba(0,0,0,0.8)] 
              overflow-hidden 
              backdrop-blur-md
            "
          >
            {/* ✅ SAME shiny sweep as skill boxes */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
            </div>

            {/* ✅ Gloss like the skill cards */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent rounded-3xl" />
            </div>

            {/* content */}
            <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* square SVG on the left */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-black/40 border border-white/15 flex-shrink-0 relative backdrop-blur-sm">
                <Image
                  src="/hero-bg.svg"  // ensure this file exists in /public
                  alt="Tech stack visual"
                  fill
                  className="object-contain opacity-95"
                  priority
                />
              </div>

              {/* text area on the right */}
              <div className="flex-1 space-y-3 md:space-y-4 text-left">
                <div className="inline-flex items-center space-x-2 bg-secondary/10 border-[1.2px] border-zinc-700/80 px-3 py-1.5 rounded-full text-primary backdrop-blur-sm">
                  <HiCode className="w-4 h-4 text-primary" />
                  <span className="text-xs sm:text-sm font-semibold text-primary">
                    Tech Stack
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl md:text-2xl font-semibold tracking-tight text-white">
                  Tech Stack
                </h2>
                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
                  I specialize in a variety of languages, frameworks, and tools
                  that allow me to build robust and scalable applications.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🔹 existing skills grid with the same shine animation */}
        <motion.div
          variants={containerAnimation}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 w-full"
          style={{
            gridAutoRows: "minmax(90px, auto)",
            gridAutoFlow: "row dense",
          }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={itemAnimation}
              className={`relative group ${skill.size}`}
            >
              <div
                className="
                  bg-black
                  border-white/30
                  border 
                  p-2.5 sm:p-4 md:p-6
                  rounded-lg sm:rounded-xl md:rounded-2xl
                  backdrop-blur-md 
                  cursor-default
                  relative overflow-hidden
                  h-full
                  w-full
                  min-h-[90px] sm:min-h-[120px]
                  flex flex-col items-center justify-center
                  box-border
                  shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_10px_rgba(255,255,255,0.05)]
                  transition-all duration-300
                  group-hover:border-white/60
                  group-hover:shadow-[0_4px_6px_rgba(0,0,0,0.5),0_0_20px_rgba(255,255,255,0.1)]
                "
                style={{ height: "100%" }}
              >
                {/* Shiny overlay effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shiny-sweep" />
                </div>

                {/* Glossy shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl" />
                </div>

                <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 w-full z-10">
                  {/* Icon container */}
                  <div className="relative">
                    <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl bg-black border border-white/30 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:border-white/60 group-hover:shadow-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                      <div className="text-white drop-shadow-lg transition-transform duration-300 group-hover:scale-110">
                        {skill.icon}
                      </div>
                    </div>
                  </div>

                  {/* Skill name */}
                  <div className="flex flex-col items-center gap-0.5 sm:gap-1 w-full px-0.5 sm:px-1">
                    <span className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-white text-center tracking-tight transition-all duration-300 group-hover:text-white/90 break-words leading-tight">
                      {skill.name}
                    </span>
                    <div className="w-5 sm:w-6 md:w-8 h-0.5 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent rounded-full transition-all duration-300 group-hover:via-white/60" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsShowcase;
