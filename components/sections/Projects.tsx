"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, Project } from "@/lib/data";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Server,
  Video,
  ShieldAlert,
  Plane,
  Layers,
} from "lucide-react";

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "AI & Machine Learning",
    "Systems & Edge",
    "Personal Safety & Mobile",
    "Web Platform",
    "Civic Tech",
  ];

  const flagshipProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  // Map demoType to the tab keys in InteractiveLab
  const demoTabKeyMap: Record<string, string> = {
    clipit: "virality",
    airfare: "airfare",
    calculator: "calculator",
    terminal: "terminal",
  };

  const flagshipIconMap: Record<string, React.ElementType> = {
    clipit: Video,
    airfare: Plane,
    calculator: ShieldAlert,
    terminal: Server,
  };

  const handleLaunchDemo = (demoType?: string) => {
    if (!demoType) return;
    const targetTab = demoTabKeyMap[demoType] || demoType;
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("switch-demo-tab", { detail: targetTab })
      );
      const labEl = document.getElementById("interactive-lab");
      if (labEl) {
        labEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const matchesCategory = (project: Project, cat: string) => {
    if (cat === "All") return true;
    const pCat = project.category.toLowerCase();
    const target = cat.toLowerCase();

    if (target.includes("ai")) {
      return pCat.includes("ai") || pCat.includes("machine learning");
    }
    if (target.includes("systems") || target.includes("edge")) {
      return pCat.includes("systems") || pCat.includes("edge") || pCat.includes("cloud");
    }
    if (target.includes("safety") || target.includes("mobile")) {
      return pCat.includes("safety") || pCat.includes("mobile");
    }
    if (target.includes("web")) {
      return pCat.includes("web") || pCat.includes("platform") || pCat.includes("application");
    }
    if (target.includes("civic")) {
      return pCat.includes("civic") || pCat.includes("analytics");
    }
    return pCat === target;
  };

  const filteredOtherProjects = otherProjects.filter((p) =>
    matchesCategory(p, activeCategory)
  );

  return (
    <section id="projects" className="py-24 sm:py-32 relative max-w-full overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-3">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Flagships & Repositories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Selected Engineering Works
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Curated production systems, machine learning pipelines, edge clouds, and civic tools. Zero mockups—each project is backed by source code and live verification.
            </p>
          </div>

          <a
            href="https://github.com/Rishavroy-2006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all shrink-0"
          >
            <Github className="w-4 h-4" />
            <span>All Repositories</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
          </a>
        </div>

        {/* Flagship Projects Spotlight (Top 4) */}
        <div className="mb-20 space-y-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Flagship Implementations
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {flagshipProjects.map((project) => {
              const Icon =
                (project.demoType && flagshipIconMap[project.demoType]) || Sparkles;

              return (
                <div
                  key={project.id}
                  className="group relative rounded-2xl bg-zinc-950/75 border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-sky-500/40 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl overflow-hidden"
                >
                  {/* Subtle corner highlight */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/[0.04] rounded-bl-full pointer-events-none group-hover:bg-sky-500/[0.08] transition-colors" />

                  <div>
                    {/* Header: Category + Stats Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-xs font-mono text-sky-300">
                        <Icon className="w-3.5 h-3.5 text-sky-400" />
                        <span>{project.category}</span>
                      </div>
                      {project.stats && (
                        <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.04] px-2.5 py-0.5 rounded-md border border-white/[0.06]">
                          {project.stats}
                        </span>
                      )}
                    </div>

                    {/* Title & Tagline */}
                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm font-medium text-zinc-300 mb-3 leading-snug">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Highlights Bullet List */}
                    {project.highlights && project.highlights.length > 0 && (
                      <div className="space-y-1.5 mb-6 pt-3 border-t border-white/[0.06]">
                        {project.highlights.slice(0, 3).map((hl, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                            <span className="text-sky-400 mt-1 shrink-0">•</span>
                            <span className="leading-snug">{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] text-zinc-300 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                    {/* Launch Interactive Demo Connector */}
                    {project.demoType && project.demoType !== "none" ? (
                      <button
                        onClick={() => handleLaunchDemo(project.demoType)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500/25 text-xs font-mono font-medium transition-colors cursor-pointer"
                        title={`Test interactive demo for ${project.title}`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                        <span>Test Interactive Demo</span>
                      </button>
                    ) : (
                      <span />
                    )}

                    {/* Source and Live Link */}
                    <div className="flex items-center gap-2 ml-auto">
                      {project.link && project.link !== project.github && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                          title="Open Live Deployment"
                        >
                          <span>Live Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.06] transition-colors"
                        title="View GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Categorized Bento Grid (Remaining 6 Projects) */}
        <div>
          {/* Bento Header & Category Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Categorized Engineering Arsenal
              </h3>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === cat
                      ? "bg-white/[0.12] text-white font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Render */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredOtherProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-5 sm:p-6 flex flex-col justify-between hover:border-white/20 hover:bg-zinc-900/60 transition-all duration-200"
                >
                  <div>
                    {/* Header: Category + Links */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono text-sky-400 font-medium">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} on GitHub`}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${project.title} live link`}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <h4 className="text-lg font-bold text-white mb-1.5 group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs font-medium text-zinc-400 mb-2.5">
                      {project.tagline}
                    </p>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Stats pill if present */}
                    {project.stats && (
                      <div className="mb-4">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-zinc-300">
                          {project.stats}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tech stack tags */}
                  <div className="pt-3 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05] text-zinc-400 font-mono"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
