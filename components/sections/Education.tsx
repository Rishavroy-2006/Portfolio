"use client";

import { beyondCode } from "@/lib/data";
import {
  GraduationCap,
  Calendar,
  MapPin,
  BookOpen,
  Award,
  Sparkles,
  Trophy,
  Brain,
  Code2,
} from "lucide-react";

export function Education() {
  const coreCourseworkList = [
    "Data Structures & Algorithms",
    "Operating Systems & Architecture",
    "Computer Networks & Protocols",
    "Neural Networks & Deep Learning",
    "Database Management Systems (DBMS)",
    "Object-Oriented Programming (C++/Java)",
    "Probability & Applied Statistics",
    "Discrete Mathematics",
  ];

  const honorsAndActivities = [
    {
      title: "Smart India Hackathon (SIH 2024)",
      detail: "Finalist & Winner: Engineered Udaan Metrics real-time airfare CPI inflation tracking and automated scraping engine for national price indices.",
      icon: Trophy,
      badge: "National Finalist / Winner",
    },
    {
      title: "Competitive Programming & Problem Solving",
      detail: "Active on LeetCode and CodeChef, focusing on graph algorithms, dynamic programming, and data structure optimizations.",
      icon: Code2,
      badge: "Algorithmic Focus",
    },
    {
      title: "AI & Systems Applied Research",
      detail: "Hands-on implementation of local-first LLM inference engines, audio excitement detection algorithms, and low-power hardware repurposing.",
      icon: Brain,
      badge: "Applied R&D",
    },
  ];

  return (
    <section id="education" className="py-24 sm:py-32 relative max-w-full overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-16 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>Academic Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Education & Honors
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Formal computer science training at Narula Institute of Technology, core theoretical coursework, and competitive engineering achievements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Main Degree Card (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl bg-zinc-950/75 border border-white/10 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Highlight ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 font-semibold">
                  2nd Year Undergraduate
                </span>
                <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                  <span>2024 — 2028</span>
                </div>
              </div>

              {/* Degree Title & College */}
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1.5 tracking-tight">
                B.Tech in Computer Science & Engineering
              </h3>
              <p className="text-sm font-semibold text-sky-400 mb-4">
                Specialization in Artificial Intelligence & Machine Learning
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 mb-6">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-medium">Narula Institute of Technology, Kolkata</span>
                </div>
                <span className="text-zinc-600">•</span>
                <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>CGPA: 8.2 / 10.0</span>
                </div>
              </div>

              {/* Core Coursework Grid */}
              <div className="pt-6 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 mb-3 text-zinc-300">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                    Core Coursework
                  </h4>
                </div>
                <div className="grid sm:grid-cols-2 gap-2">
                  {coreCourseworkList.map((course) => (
                    <div
                      key={course}
                      className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.05] text-xs text-zinc-300 font-mono"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />
                      <span className="truncate">{course}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* School Education Card */}
            <div className="rounded-2xl bg-zinc-950/50 border border-white/[0.06] p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-zinc-400">
                  ICSE & ISC Completed
                </span>
                <span className="text-xs font-mono text-zinc-500">2009 — 2024</span>
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                Adamas International School, Kolkata
              </h4>
              <p className="text-xs text-zinc-400">
                Science Stream: Mathematics, Physics, Chemistry, Computer Science
              </p>
            </div>
          </div>

          {/* Honors, Extracurriculars & Beyond Code (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Honors & Extracurriculars
              </h3>
            </div>

            <div className="space-y-4">
              {honorsAndActivities.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-5 hover:border-sky-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {item.badge}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Beyond Code Snapshot */}
            <div className="rounded-2xl bg-zinc-950/60 border border-white/[0.08] p-5">
              <div className="flex items-center gap-2 mb-3 text-sky-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-medium">
                  Beyond Classroom Hours
                </span>
              </div>
              <div className="space-y-2.5">
                {beyondCode.map((item) => (
                  <div key={item.title} className="text-xs">
                    <span className="font-semibold text-zinc-200">{item.title}: </span>
                    <span className="text-zinc-400 leading-relaxed">{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
