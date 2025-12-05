"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    role: "Creative Director",
    company: "E-commerce Platform",
    period: "2024 — Present",
    description:
      "Leading visual direction and marketing creatives for a fast-moving e-commerce brand, focusing on clean, high-impact designs that connect with users.",
  },
  {
    role: "Web Developer",
    company: "Poster & Visual Design",
    period: "2023 — 2023",
    description:
    "Created modern web layouts and visuals, combining basic development skills with strong visual design for dark-theme websites.",
  }, 
  {
    role: "Graphic Designer",
    company: "Freelance / Early Work",
    period: "2022 — 2023",
    description:
    "Designed posters and visual content, working on layout, color and typography for both print and digital media.",
  },
    
];

const ExperienceSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <section className="w-full py-20 md:py-28 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            <span className="block text-zinc-100">My career &</span>
            <span className="block bg-gradient-to-r from-white via-white/80 to-white/60 bg-clip-text text-transparent">
              experience
            </span>
          </h2>
        </div>

        {/* TIMELINE CONTAINER */}
        <div
          ref={containerRef}
          className="
            relative
            grid grid-cols-1 md:grid-cols-[1fr_auto_1fr]
            gap-8 md:gap-0 items-start
            pl-10 md:pl-0   /* extra left space on mobile for the line */
          "
        >
          {/* 1. VERTICAL LINE (background)
                - On mobile: left side (left-4), no translate
                - On desktop: centered (left-1/2, -translate-x-1/2)
          */}
          <div
            className="
              absolute top-0 bottom-0 w-px
              bg-gradient-to-b from-transparent via-zinc-800 to-transparent
              left-4 translate-x-0
              md:left-1/2 md:-translate-x-1/2
            "
          />

          {/* 2. MOVING SCANNER (foreground) – visible on mobile & desktop */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="
              absolute top-0 w-[2px]
              bg-gradient-to-b from-transparent via-white to-transparent
              shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10
              left-[15px] translate-x-0
              md:left-1/2 md:-translate-x-1/2
            "
          >
            {/* Glowing dot at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[6px]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rounded-full" />
          </motion.div>

          {/* 3. EXPERIENCE ITEMS */}
          {experiences.map((exp, index) => (
            <React.Fragment key={index}>
              {/* LEFT SIDE (desktop): text block */}
              <div
                className={`md:text-right pr-0 md:pr-12 md:py-8 ${
                  index === 0 ? "pt-0" : ""
                }`}
              >
                <h3 className="text-2xl font-semibold text-zinc-100">
                  {exp.role}
                </h3>
                <p className="text-zinc-400 mt-1 text-sm">{exp.company}</p>
                <p className="text-xs text-zinc-500 uppercase tracking-widest mt-2 font-medium">
                  {exp.period}
                </p>
              </div>

              {/* CENTER DOT (only on desktop) */}
              <div className="hidden md:flex flex-col items-center justify-center py-10 relative">
                <div className="w-3 h-3 rounded-full border border-zinc-700 bg-zinc-900 z-20 relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-sm"></div>
                </div>
              </div>

              {/* RIGHT SIDE (desktop) / ONLY COLUMN (mobile): description */}
              <div
                className={`pl-0 md:pl-12 md:py-8 ${
                  index === 0 ? "pt-0" : ""
                }`}
              >
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                  {exp.description}
                </p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
