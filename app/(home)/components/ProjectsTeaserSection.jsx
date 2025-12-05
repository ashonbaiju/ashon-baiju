"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Julebi Seller App",
    type: "Mobile App · E-commerce",
    description:
      "A multi-seller marketplace experience focused on sellers managing products, orders and offers in a clean, mobile interface.",
    tech: ["Flutter", "REST API", "Firebase"],
  },
  {
    title: "OldSyllabus Platform",
    type: "Web App · Service Listing",
    description:
      "A local services platform where people can list and discover skills, tuition and services with a focus on simplicity and clarity.",
    tech: ["Next.js", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "AdFlow Concept",
    type: "Product Idea · UX Concept",
    description:
      "Concept application where users can earn small rewards by watching ads, with a clean UI and revenue-sharing model.",
    tech: ["Product Design", "Wireframing", "UI Exploration"],
  },
];

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const ProjectsTeaserSection = () => {
  return (
    <section className="w-full py-8 md:py-10">

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.div
          variants={item}
          className="mb-10 md:mb-12 space-y-3 text-center md:text-left"
        >
          <p className="text-[11px] tracking-[0.25em] text-zinc-500 uppercase">
            Projects
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white">
                Selected work & experiments
              </h2>
              <p className="text-sm md:text-base text-zinc-400 max-w-xl md:max-w-2xl leading-relaxed">
                A small preview of the apps, platforms and concepts I’ve worked
                on. You can explore more details in the full projects page.
              </p>
            </div>

            {/* View all (top-right on desktop, bottom on mobile) */}
            <div className="flex md:justify-end">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs sm:text-sm font-medium text-white tracking-wide backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  <span>View all projects</span>
                  <span className="text-[16px] leading-none">↗</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Project cards */}
        <motion.div
          variants={container}
          className="grid gap-6 md:gap-8 md:grid-cols-3"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={item}
              className="group relative h-full rounded-2xl border border-white/10 bg-black/60 px-5 py-6 sm:px-6 sm:py-7 shadow-[0_18px_50px_rgba(0,0,0,0.75)] backdrop-blur-md overflow-hidden flex flex-col"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute -inset-20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_55%)]" />
              </div>

              <div className="relative flex flex-col gap-3">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {project.type}
                </p>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* tech tags */}
              <div className="relative mt-4 pt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-zinc-200 tracking-wide"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* optional subtle bottom link style */}
              <div className="relative mt-4 pt-2">
                <span className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  Preview in projects page
                  <span className="text-[13px]">↗</span>
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all button centered on mobile (optional duplicate if you want stronger CTA) */}
        <motion.div
          variants={item}
          className="mt-8 flex justify-center md:hidden"
        >
          <Link href="/projects">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white tracking-wide backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all">
              <span>View all projects</span>
              <span className="text-[16px] leading-none">↗</span>
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProjectsTeaserSection;
