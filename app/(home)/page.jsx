"use client";
import React from "react";
import HeroSection from "./components/HeroSection";
import GithubProjects from "./components/GithubProjects";
import ExperienceSection from "./components/ExperienceSection";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import ProjectsTeaserSection from "./components/ProjectsTeaserSection";
import SkillsShowcase from "./components/SkillsShowcase"; // ✔ Tech Stack
import CapabilitiesSection from "./components/CapabilitiesSection";

const Home = () => {
  return (
    <div>
      {/* 1. Hero */}
      <HeroSection />
      <CapabilitiesSection />
      {/* 2. Tech Stack */}
      <SkillsShowcase />

      {/* 3. Work Experience */}
      <ExperienceSection />

      <ProjectsTeaserSection />

      {/* 4. Open Source */}
      <GithubProjects />

      {/* 5. Selected Work & Experiments */}
      

      {/* 6. Get in Touch Button */}
      <section className="py-10 pb-6">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white text-sm font-medium transition-all duration-300 backdrop-blur-sm"
              >
                <span>Get In Touch</span>
                <HiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
