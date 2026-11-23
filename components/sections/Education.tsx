"use client";

import { education, beyondCode } from "@/lib/data";
import { GraduationCap, Calendar, MapPin, BookOpen, Terminal, Sparkles } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - clean, no eyebrows or gradient underlines */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Education & Background
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Formal academic training, completed coursework, and personal technical pursuits.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Education Timeline (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <GraduationCap className="w-4 h-4" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Academic Degrees
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.degree}
                  className="surface-card rounded-2xl p-6 sm:p-7 relative border border-white/[0.08]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {edu.status}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium text-primary mb-3">
                    {edu.specialization}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{edu.institution}</span>
                    </div>
                    {edu.cgpa && (
                      <div className="flex items-center gap-1.5 text-emerald-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>CGPA: {edu.cgpa}</span>
                      </div>
                    )}
                  </div>

                  {edu.coursework && (
                    <div className="pt-4 border-t border-white/[0.06]">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-primary" />
                        <span>Core Coursework</span>
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.coursework.map((course) => (
                          <span
                            key={course}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-muted-foreground font-mono"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Code / Curiosity Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Terminal className="w-4 h-4" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                Beyond the Classroom
              </h3>
            </div>

            <div className="space-y-4">
              {beyondCode.map((item) => (
                <div
                  key={item.title}
                  className="surface-card rounded-xl p-5 border border-white/[0.06]"
                >
                  <h4 className="text-sm font-semibold text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick summary card */}
            <div className="surface-elevated rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-wider text-white font-medium">
                  Continuous Learning
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Actively solving algorithmic challenges on LeetCode/CodeChef and experimenting with edge deployment architectures on Cloudflare and Vercel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
