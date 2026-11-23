"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ArrowRight, ArrowDown, Mail, MapPin } from "lucide-react";
import { personalInfo, socialLinks } from "@/lib/data";
import HeroBackground from "@/components/3d/HeroBackground";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-4xl mx-auto w-full text-center">
        {/* Availability / Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full surface-card text-xs text-muted-foreground mb-8 border border-white/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>B.Tech CSE (AI & ML) • 2nd Year Student</span>
        </motion.div>

        {/* Primary Name Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-6"
        >
          {personalInfo.name}
        </motion.h1>

        {/* Subhead / Value Proposition */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 font-normal"
        >
          Computer Science undergraduate at Narula Institute of Technology, Kolkata.
          Passionate about AI/ML systems, hardware-repurposed servers, and building robust web applications.
        </motion.p>

        {/* Location & Quick Context Meta */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground mb-10"
        >
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>Kolkata, India</span>
          </div>
          <span className="text-white/20">•</span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span>Open for Summer 2025/2026 Internships</span>
          </div>
        </motion.div>

        {/* Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 shadow-lg shadow-sky-500/15 transition-all duration-200"
          >
            Explore Projects
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg surface-card text-foreground font-medium text-sm hover:bg-white/[0.08] hover:border-white/20 transition-all duration-200"
          >
            <Mail className="w-4 h-4 text-muted-foreground" />
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex items-center justify-center gap-3"
        >
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-lg surface-card text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-lg surface-card text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="p-2.5 rounded-lg surface-card text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
          >
            <Instagram className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground text-xs transition-colors"
      >
        <a href="#about" aria-label="Scroll down to About section" className="flex flex-col items-center gap-1 group">
          <span className="text-[11px] font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">SCROLL</span>
          <ArrowDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
        </a>
      </motion.div>
    </section>
  );
}
