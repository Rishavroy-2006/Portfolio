"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Github, Linkedin } from "lucide-react";
import { navItems, personalInfo, socialLinks } from "@/lib/data";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["home", ...navItems.map((item) => item.href.slice(1))];
      for (const section of [...sectionIds].reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 pointer-events-none ${
          isScrolled ? "pt-3 sm:pt-4" : "pt-4 sm:pt-6"
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="max-w-5xl mx-auto flex items-center justify-between gap-3 pointer-events-auto"
        >
          {/* Logo / Monogram Pill */}
          <a
            href="#home"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/[0.08] shadow-lg hover:border-sky-500/30 transition-all duration-200 group"
          >
            <span className="w-6 h-6 rounded-md bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 flex items-center justify-center font-mono text-[11px] font-bold text-sky-300 group-hover:scale-105 transition-transform">
              {personalInfo.initials}
            </span>
            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white leading-tight">
                {personalInfo.name}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline leading-none">
                AI/ML & Systems
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links Pill */}
          <div className="hidden lg:flex items-center gap-1 bg-zinc-950/85 backdrop-blur-md px-2 py-1.5 rounded-full border border-white/[0.08] shadow-xl">
            {navItems.map((item) => {
              const targetId = item.href.slice(1);
              const isActive = activeSection === targetId;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-white/[0.09] border border-white/[0.12] -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </div>

          {/* Status Beacon & Social Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Status Beacon */}
            <div className="hidden xl:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/[0.08] text-[11px] font-mono text-zinc-300 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Available for Roles</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-1 bg-zinc-950/85 backdrop-blur-md p-1 rounded-full border border-white/[0.08] shadow-lg">
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="GitHub"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/[0.08] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-all shadow-lg pointer-events-auto"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </nav>
      </header>

      {/* Mobile Drawer / Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-md lg:hidden"
            />

            {/* Mobile Content Card */}
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 inset-x-4 z-50 max-w-lg mx-auto bg-zinc-950/95 backdrop-blur-2xl rounded-2xl border border-white/10 p-5 shadow-2xl lg:hidden overflow-hidden"
            >
              {/* Status Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-medium">
                    Available for AI/ML & Systems roles
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Kolkata, IN</span>
              </div>

              {/* Navigation Links */}
              <ul className="flex flex-col gap-1 mb-4">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-zinc-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                    </a>
                  </li>
                ))}
              </ul>

              {/* Quick Contact & Socials Bar */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-xs font-mono text-sky-400 hover:text-sky-300 font-medium"
                >
                  {personalInfo.email}
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Profile"
                    className="p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="p-2 rounded-lg bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
