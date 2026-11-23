"use client";

import { skillCategories, activeFocusAreas } from "@/lib/data";
import { Terminal, Globe, Cpu, Wrench, Sparkles, ArrowRight } from "lucide-react";

const categoryIcons = {
  languages: Terminal,
  web: Globe,
  aiml: Cpu,
  tools: Wrench,
};

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - clean, no eyebrows or gradient underlines */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Practical competencies grouped by domain, with context on where and how I apply them.
          </p>
        </div>

        {/* 4 Categorized Domain Grids */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          {skillCategories.map((category) => {
            const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || Terminal;
            return (
              <div
                key={category.id}
                className="surface-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-white/[0.05] border border-white/10 text-primary">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-5">
                    {category.description}
                  </p>

                  {/* Skills tags with context */}
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 transition-colors"
                      >
                        <p className="text-xs font-medium text-white font-mono">
                          {skill.name}
                        </p>
                        {skill.context && (
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                            {skill.context}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Focus Areas (Replaces fake percentage progress bars) */}
        <div className="surface-elevated rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-2 text-primary">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Active Focus & Ongoing Exploration
            </h3>
          </div>
          <p className="text-xs text-muted-foreground mb-6">
            Key areas I am currently dedicating study hours and experimental projects to.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {activeFocusAreas.map((area, idx) => (
              <div
                key={area.title}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono text-primary font-semibold">0{idx + 1}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/[0.05] text-muted-foreground">Active</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{area.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{area.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
