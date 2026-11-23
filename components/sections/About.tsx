"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, GraduationCap, Code2, Cpu, ArrowUpRight } from "lucide-react";
import { personalInfo, education } from "@/lib/data";

export function About() {
  const currentDegree = education[0];

  return (
    <section id="about" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - clean, no eyebrows or gradient underlines */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            About
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            A look into my background, technical interests, and academic foundation.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Profile Photo Column */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02] shadow-2xl">
              <Image
                src="/images/profile.jpg"
                alt="Rishav Roy"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl surface-card backdrop-blur-md border border-white/10">
                <p className="text-xs font-mono text-primary uppercase tracking-wider mb-0.5">Status</p>
                <p className="text-xs font-medium text-foreground">
                  Undergraduate • Narula Institute of Technology
                </p>
              </div>
            </div>
          </div>

          {/* Bio & Details Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>
                I am a second-year B.Tech student in Computer Science & Engineering with a specialization in Artificial Intelligence & Machine Learning at Narula Institute of Technology, Kolkata.
              </p>
              <p>
                My focus spans foundational software development and applied machine learning. I enjoy projects that bridge the physical and virtual—such as repurposing an old Android smartphone into <strong className="text-white font-medium">PhoneCloud</strong>, a 24/7 private network cloud server featuring real-time WebSockets and on-device AI document chat.
              </p>
              <p>
                I am continuously refining my core computer science knowledge in data structures and algorithms while exploring production-grade modern web architectures, edge runtimes, and Cloudflare Workers.
              </p>
            </div>

            {/* Quick Fact Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-1.5 text-primary">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Education</span>
                </div>
                <p className="text-sm font-semibold text-white">{currentDegree.degree}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{currentDegree.institution}</p>
                <p className="text-xs text-emerald-400 mt-1 font-mono">CGPA: {currentDegree.cgpa}</p>
              </div>

              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-1.5 text-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Location</span>
                </div>
                <p className="text-sm font-semibold text-white">{personalInfo.location}</p>
                <p className="text-xs text-muted-foreground mt-0.5">West Bengal, India</p>
                <p className="text-xs text-muted-foreground mt-1 font-mono">IST (UTC +5:30)</p>
              </div>

              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-1.5 text-primary">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Focus</span>
                </div>
                <p className="text-sm font-semibold text-white">AI & Machine Learning</p>
                <p className="text-xs text-muted-foreground mt-0.5">Algorithms, Data Analysis, Systems</p>
              </div>

              <div className="surface-card p-4 rounded-xl">
                <div className="flex items-center gap-2.5 mb-1.5 text-primary">
                  <Code2 className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Stack</span>
                </div>
                <p className="text-sm font-semibold text-white">Python, C/C++, Web</p>
                <p className="text-xs text-muted-foreground mt-0.5">Next.js, Flask, Tailwind CSS</p>
              </div>
            </div>

            {/* In-page action */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#education"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <span>View academic coursework</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-white/20">•</span>
              <a
                href="#skills"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <span>Browse technical skills</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
