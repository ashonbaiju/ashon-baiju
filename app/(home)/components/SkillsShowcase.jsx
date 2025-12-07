"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiCode, HiColorSwatch } from "react-icons/hi";
import { FaReact, FaNodeJs, FaGithub, FaPython } from "react-icons/fa";
import {
  SiFlutter,
  SiCplusplus,
  SiFirebase,
  SiTailwindcss,
  SiAdobecreativecloud,
  SiMysql,
  SiFigma,
  SiAdobepremierepro,
} from "react-icons/si";

// 🔹 CONFIGURATION: Your Specific Stack
// Organized by importance (High Department) and Visual Weight
const skills = [
  // 1. MOBILE DEVELOPMENT (The Big Star - 2x2)
  {
    name: "Flutter & Mobile",
    icon: <SiFlutter className="w-8 h-8 sm:w-10 sm:h-10" />,
    size: "col-span-2 row-span-2", 
    color: "text-cyan-400",
    description: "Cross-platform Development",
  },
  // 2. WEB FRONTEND (The Wide Foundation - 2x1)
  {
    name: "React.js",
    icon: <FaReact className="w-6 h-6 sm:w-8 sm:h-8 animate-spin-slow" />,
    size: "col-span-2 row-span-1",
    color: "text-blue-400",
    description: "Modern UI Engineering",
  },
  // 3. BACKEND (The Tall Pillar - 1x2)
  {
    name: "Node.js",
    icon: <FaNodeJs className="w-6 h-6 sm:w-7 sm:h-7" />,
    size: "col-span-1 row-span-2",
    color: "text-green-500",
    description: "Server Logic",
  },
  // 4. CREATIVE SUITE (The Creative Pillar - 1x2)
  // Merging Premiere/Ps/Ai into one "Creative" entry for impact
  {
    name: "Adobe Suite",
    icon: <SiAdobecreativecloud className="w-6 h-6 sm:w-7 sm:h-7" />,
    size: "col-span-1 row-span-2",
    color: "text-purple-500",
    description: "Video & Graphics",
  },
  // 5. CORE PROGRAMMING (Standard Box)
  {
    name: "C++ / C",
    icon: <SiCplusplus className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-blue-600",
  },
  // 6. CLOUD / DB (Standard Box)
  {
    name: "Firebase",
    icon: <SiFirebase className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-yellow-400",
  },
  // 7. SCRIPTING / AI (Standard Box)
  {
    name: "Python",
    icon: <FaPython className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-yellow-300",
  },
  // 8. UI STYLING (Standard Box)
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-cyan-300",
  },
  // 9. DATABASE (Standard Box)
  {
    name: "MySQL",
    icon: <SiMysql className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-blue-300",
  },
  // 10. PROTOTYPING (Standard Box)
  {
    name: "Figma",
    icon: <SiFigma className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-pink-400",
  },
  // 11. VERSION CONTROL (Standard Box)
  {
    name: "GitHub",
    icon: <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
    size: "col-span-1 row-span-1",
    color: "text-white",
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
        
        {/* 🔹 HEADER CARD (Tech Stack Summary) */}
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
              bg-zinc-900/60
              px-5 py-5 sm:px-7 sm:py-7 md:px-8 md:py-8 
              shadow-[0_10px_40px_rgba(0,0,0,0.8)] 
              overflow-hidden 
              backdrop-blur-md
            "
          >
            {/* Shine Animation */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent shiny-sweep" />
            </div>

            <div className="relative flex flex-col md:flex-row gap-6 items-center md:items-start">
              {/* Image Box */}
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden bg-black/40 border border-white/15 flex-shrink-0 relative backdrop-blur-sm shadow-inner">
                <Image
                  src="/hero-bg.svg" // Make sure this path is correct
                  alt="Tech stack visual"
                  fill
                  className="object-contain opacity-80"
                  priority
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 space-y-3 md:space-y-4 text-left">
                <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <HiCode className="w-4 h-4 text-blue-400" />
                  <span className="text-xs sm:text-sm font-semibold text-blue-100">
                    High-Level Overview
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">
                  My Tech Arsenal
                </h2>
                <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                  A powerful combination of <span className="text-blue-400">Web</span>, <span className="text-cyan-400">Mobile</span>, and <span className="text-purple-400">Creative Design</span> technologies. I utilize industry-standard tools to build full-stack solutions with premium visuals.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 🔹 SKILLS BENTO GRID */}
        <motion.div
          variants={containerAnimation}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-5xl mx-auto"
          style={{
            gridAutoRows: "minmax(110px, auto)",
            gridAutoFlow: "dense", // Tightly packs the boxes
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
                  bg-black/40
                  border-white/20
                  border 
                  p-4
                  rounded-2xl
                  backdrop-blur-md 
                  cursor-default
                  relative overflow-hidden
                  h-full
                  w-full
                  flex flex-col items-center justify-center
                  box-border
                  shadow-lg
                  transition-all duration-300
                  group-hover:border-white/50
                  group-hover:bg-zinc-900/80
                  group-hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]
                "
              >
                {/* Gloss Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                   <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-2xl" />
                </div>

                <div className="relative flex flex-col items-center gap-3 z-10 text-center">
                  
                  {/* Icon Container */}
                  <div className={`
                    p-3 rounded-xl 
                    bg-white/5 border border-white/10 
                    shadow-inner
                    transition-transform duration-300
                    group-hover:scale-110
                  `}>
                    <div className={`${skill.color} drop-shadow-md`}>
                      {skill.icon}
                    </div>
                  </div>

                  {/* Skill Text */}
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-sm sm:text-base font-semibold text-zinc-300 group-hover:text-white transition-colors duration-300">
                      {skill.name}
                    </span>
                    {/* Optional Description for larger boxes */}
                    {skill.description && (
                      <span className="text-[10px] sm:text-xs text-zinc-500 hidden sm:block">
                        {skill.description}
                      </span>
                    )}
                  </div>
                  
                  {/* Decorative underline */}
                  <div className={`w-8 h-0.5 rounded-full mt-1 bg-gradient-to-r from-transparent via-zinc-600 to-transparent group-hover:via-${skill.color.split('-')[1]}-500/50 transition-all`} />

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
