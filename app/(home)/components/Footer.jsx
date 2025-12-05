"use client";

import React from "react";
import Link from "next/link";
import { FiGithub, FiInstagram, FiLinkedin, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-24 w-full border-t border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="relative">
        {/* subtle glow line */}
        <div className="absolute -top-px left-0 w-full h-px bg-white/10">
          <div className="w-28 h-full mx-auto bg-white/60 blur-sm" />
        </div>

        <div className="container mx-auto px-6 pt-10 pb-6">
          {/* Top grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {/* Identity */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">Ashon Baiju</h3>
              <p className="text-white/55 text-sm max-w-xs">
                Crafting modern, fast & visually rich web experiences.
              </p>

              <a
                href="mailto:ashonbaiju123@gmail.com"
                className="inline-flex items-center gap-2 text-white/65 hover:text-white transition-colors text-sm"
              >
                <FiMail className="w-4 h-4" />
                <span>ashonbaiju123@gmail.com</span>
              </a>
            </div>

            {/* Navigation */}
            <div className="space-y-3">
              <h4 className="text-white/70 text-sm font-medium uppercase tracking-wide">
                Navigation
              </h4>
              <div className="flex flex-col space-y-2 text-sm">
                <Link href="/" className="text-white/55 hover:text-white transition">
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="text-white/55 hover:text-white transition"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="text-white/55 hover:text-white transition"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Socials */}
            <div className="space-y-3">
              <h4 className="text-white/70 text-sm font-medium uppercase tracking-wide">
                Socials
              </h4>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com/ashonbaiju"
                  target="_blank"
                  className="text-white/60 hover:text-white transition"
                >
                  <FiGithub className="w-5 h-5" />
                </Link>
                <Link
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  className="text-white/60 hover:text-white transition"
                >
                  <FiInstagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  className="text-white/60 hover:text-white transition"
                >
                  <FiLinkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Get in touch button – attached to footer, not floating alone */}
          <div className="mt-10 flex justify-center">
            <Link href="/contact">
              <button
                className="inline-flex items-center gap-2 rounded-full border border-white/20
                           bg-white/10 px-6 py-3 text-sm font-medium text-white 
                           backdrop-blur-md hover:bg-white/20 hover:border-white/40 
                           transition-all duration-300"
              >
                <span>Get In Touch</span>
                <span className="text-lg leading-none">↗</span>
              </button>
            </Link>
          </div>

          {/* Single bottom line */}
          <div className="mt-8 pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-white/40 tracking-wide">
              © {new Date().getFullYear()} Ashon Baiju · All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
