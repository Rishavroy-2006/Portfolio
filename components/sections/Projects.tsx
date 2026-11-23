"use client";

import { projects, Project } from "@/lib/data";
import { ExternalLink, Github, ArrowUpRight, Server, Layers } from "lucide-react";

export function Projects() {
  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const standardProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - clean, no eyebrows or gradient underlines */}
        <div className="mb-14 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Projects
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
              Systems, utilities, and web applications I have engineered and deployed.
            </p>
          </div>
          <a
            href="https://github.com/Rishavroy-2006"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-white transition-colors"
          >
            <span>View all repositories on GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Featured Project Spotlight: PhoneCloud */}
        {featuredProject && (
          <div className="mb-12 surface-elevated rounded-2xl p-6 sm:p-9 border border-white/10 hover:border-sky-500/30 transition-all">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-mono text-sky-400">
                <Server className="w-3.5 h-3.5" />
                <span>Featured Project • {featuredProject.category}</span>
              </div>
              {featuredProject.stats && (
                <span className="text-xs font-mono text-muted-foreground">
                  {featuredProject.stats}
                </span>
              )}
            </div>

            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {featuredProject.title}
                </h3>
                <p className="text-sm font-medium text-primary mb-4">
                  {featuredProject.tagline}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {featuredProject.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {featuredProject.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-muted-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Column */}
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:brightness-110 transition-all"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={featuredProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg surface-card text-foreground font-medium text-xs hover:border-white/20 transition-all"
                >
                  <Github className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>View Source Code</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {standardProjects.map((project) => (
            <div
              key={project.title}
              className="surface-card rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} source code on GitHub`}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.title} live deployment`}
                      className="p-1.5 rounded-md text-muted-foreground hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs font-medium text-muted-foreground mb-3">
                  {project.tagline}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.06]">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded bg-white/[0.03] text-muted-foreground font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
