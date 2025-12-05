"use client";

import React from "react";
import { motion } from "framer-motion";
import { HiCode } from "react-icons/hi";
import { FiMonitor, FiTool, FiPenTool } from "react-icons/fi";
import { TbBrandGithub } from "react-icons/tb";
import { PiPaintBrushBroadLight } from "react-icons/pi";

const container = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.18,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

// small helper for floating icons
const FloatingIcon = ({ children, delay = 0 }) => (
  <motion.div
    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
    animate={{ y: [0, -6, 0] }}
    transition={{
      duration: 3.2,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const CapabilitiesSection = () => {
  return (
    <section className="w-full pt-28 pb-20 md:pt-32 md:pb-24">
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* Heading */}
        <div className="text-center mb-14 space-y-4">
          <p className="text-[12px] tracking-[0.25em] text-zinc-500 uppercase">
            Capabilities
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            How I usually contribute
          </h2>
          <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            A balance of development and design skills, applied to create clean,
            modern digital experiences.
          </p>
        </div>

        {/* Two-column capability cards */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* Development card */}
          <motion.div
            custom={0}
            variants={cardVariant}
            className="group relative rounded-3xl border border-white/10
                       bg-black/60 px-8 py-10 sm:px-10 sm:py-12 backdrop-blur-md
                       shadow-[0_18px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* 🌈 Ambient moving light behind card */}
            <motion.div
              className="pointer-events-none absolute -inset-24 bg-gradient-to-br from-white/6 via-white/0 to-white/8 blur-3xl opacity-70"
              animate={{ x: [-20, 15, -10], y: [-10, 10, -15] }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_60%)]" />
            </div>

            {/* 🌟 Floating icons (dev side) */}
            <div className="pointer-events-none absolute right-6 top-6 flex flex-col gap-3 text-white/80">
              <FloatingIcon>
                <HiCode className="w-4 h-4" />
              </FloatingIcon>
              <FloatingIcon delay={0.25}>
                <FiMonitor className="w-4 h-4" />
              </FloatingIcon>
              <FloatingIcon delay={0.5}>
                <TbBrandGithub className="w-4 h-4" />
              </FloatingIcon>
            </div>

            {/* Content */}
            <div className="relative space-y-8 z-10">
              <div className="space-y-3">
                <p className="text-[12px] tracking-[0.22em] text-zinc-500 uppercase">
                  Capability
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Development
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Clean, structured, and maintainable code with a focus on
                  responsive layouts and performance.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm text-zinc-200">
                {/* Frontend */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Frontend
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>HTML, CSS, JavaScript</li>
                    <li>React basics / Next.js basics</li>
                    <li>Responsive layouts</li>
                  </ul>
                </div>

                {/* Backend */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Backend
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Node.js fundamentals</li>
                    <li>API integration</li>
                    <li>Basic MongoDB</li>
                  </ul>
                </div>

                {/* Tools */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Tools
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Git & GitHub</li>
                    <li>VS Code</li>
                    <li>Terminal workflow</li>
                  </ul>
                </div>

                {/* Focus Areas */}
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Focus Areas
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Dark UI implementation</li>
                    <li>Smooth animations</li>
                    <li>Component thinking</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Design card */}
          <motion.div
            custom={1}
            variants={cardVariant}
            className="group relative rounded-3xl border border-white/10
                       bg-black/60 px-8 py-10 sm:px-10 sm:py-12 backdrop-blur-md
                       shadow-[0_18px_60px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            {/* 🌈 Ambient moving light behind card */}
            <motion.div
              className="pointer-events-none absolute -inset-24 bg-gradient-to-bl from-white/6 via-white/0 to-white/8 blur-3xl opacity-70"
              animate={{ x: [15, -20, 10], y: [-15, 8, -12] }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute -inset-32 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_60%)]" />
            </div>

            {/* 🌟 Floating icons (design side) */}
            <div className="pointer-events-none absolute right-6 top-6 flex flex-col gap-3 text-white/80">
              <FloatingIcon>
                <PiPaintBrushBroadLight className="w-4 h-4" />
              </FloatingIcon>
              <FloatingIcon delay={0.25}>
                <FiPenTool className="w-4 h-4" />
              </FloatingIcon>
              <FloatingIcon delay={0.5}>
                <FiTool className="w-4 h-4" />
              </FloatingIcon>
            </div>

            <div className="relative space-y-8 z-10">
              <div className="space-y-3">
                <p className="text-[12px] tracking-[0.22em] text-zinc-500 uppercase">
                  Capability
                </p>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  Design & Branding
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-md">
                  Turning ideas into clean, bold visuals for marketing, branding
                  and product interfaces.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-sm text-zinc-200">
                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Visual Design
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Poster design</li>
                    <li>Social media creatives</li>
                    <li>Layout & composition</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Branding
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Logo concepts</li>
                    <li>Brand mood & identity</li>
                    <li>Minimalist branding</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Tools
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Photoshop</li>
                    <li>Figma</li>
                    <li>Canva</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500">
                    Focus Areas
                  </p>
                  <ul className="space-y-2 text-[13px] text-zinc-200">
                    <li>Bold typography</li>
                    <li>Dark-themed visuals</li>
                    <li>Ad creatives</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CapabilitiesSection;
