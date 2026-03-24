"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { config } from "@/config";
import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mt-24 border-t border-foreground/10 bg-background/70 backdrop-blur-xl relative overflow-hidden"
    >
      {/* Glowing top line */}
      <div className="absolute -top-px left-0 w-full h-px bg-foreground/10">
        <div className="w-32 h-full mx-auto bg-foreground/60 blur-md" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-10 relative z-10">

        {/* Two-column main footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-16">

          {/* LEFT — Identity + email */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              {config.developer.name}
            </h3>

            <p className="text-sm text-muted-foreground max-w-sm">
              Crafting modern, minimal and interactive digital experiences.
            </p>

            <a
              href="mailto:ashonbaiju123@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition"
            >
              <FiMail className="w-4 h-4" />
              <span>ashonbaiju123@gmail.com</span>
            </a>
          </div>

          {/* RIGHT — Social icons */}
          <div className="space-y-4 sm:text-right">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Social
            </p>

            <div className="flex sm:justify-end gap-4">
              <Link
                href="https://github.com/ashonbaiju"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <FiGithub className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.instagram.com/ashon_baiju/"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <FiInstagram className="w-5 h-5" />
              </Link>

              <Link
                href="https://www.linkedin.com/in/ashon-baiju-995640301/"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition"
              >
                <FiLinkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-foreground/10 pt-4">
          <p className="text-[11px] sm:text-xs text-muted-foreground text-center">
            © {year} {config.developer.name} · All rights reserved.
          </p>
        </div>
      </div>

      {/* Subtle glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="absolute -bottom-32 right-[-10%] w-80 h-80 rounded-full bg-foreground/5 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] w-72 h-72 rounded-full bg-foreground/5 blur-3xl" />
      </div>
    </motion.footer>
  );
};

export default Footer;
