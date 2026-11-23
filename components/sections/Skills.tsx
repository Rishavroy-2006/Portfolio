"use client";

import {
  Brain,
  Cpu,
  Layers,
  Shield,
  Terminal,
  Sparkles,
} from "lucide-react";
import { activeFocusAreas } from "@/lib/data";

interface DomainSkillGroup {
  id: string;
  domain: string;
  icon: React.ElementType;
  description: string;
  projectTag: string;
  skills: {
    name: string;
    detail: string;
    tag?: string;
  }[];
}

export function Skills() {
  const technicalArsenal: DomainSkillGroup[] = [
    {
      id: "aiml",
      domain: "AI & Deep Learning",
      icon: Brain,
      description: "Autonomous LLM agents, time-series econometric forecasting, and media ML pipelines",
      projectTag: "ClipIt • Udaan Metrics • CartWise",
      skills: [
        { name: "LLM Agents (Groq & Gemini)", detail: "Multi-agent tool calling, structured JSON output, multimodal vision", tag: "CartWise" },
        { name: "FFmpeg Media Pipeline", detail: "Hardware acceleration (NVENC/Metal), audio Z-scores, kinetic subtitles", tag: "ClipIt" },
        { name: "Prophet & Time-Series", detail: "Macroeconomic inflation modeling, seasonal airfare trends", tag: "Udaan" },
        { name: "SeleniumBase UC", detail: "Stealth scraping, undetected browser profiles, self-healing DOM selectors", tag: "Udaan" },
        { name: "NumPy & Pandas", detail: "Vectorized computations, statistical IQR outlier detection & cleaning", tag: "Data" },
        { name: "PyTorch & Whisper", detail: "Large-v3 speech-to-text inference with word-level timestamp generation", tag: "ClipIt" },
      ],
    },
    {
      id: "edge",
      domain: "Edge Systems & Hardware",
      icon: Cpu,
      description: "Low-power hardware repurposing, edge computing, and embedded data engines",
      projectTag: "PhoneCloud • OpenNext",
      skills: [
        { name: "Linux / Termux Runtimes", detail: "CLI navigation, bash automation, Android kernel hardware bypass", tag: "PhoneCloud" },
        { name: "Cloudflare Workers", detail: "Edge serverless compute, OpenNext adapter, global CDN routing", tag: "Production" },
        { name: "SQLite (WAL Mode)", detail: "Embedded relational transactions, zero-latency local caching", tag: "CartWise" },
        { name: "WebSockets & Event Streams", detail: "Bidirectional state syncing and live streaming telemetry", tag: "PhoneCloud" },
        { name: "Hardware Power Bypass", detail: "Continuous AC bypass logic to run 24/7 on battery-less Android nodes", tag: "Hardware" },
      ],
    },
    {
      id: "fullstack",
      domain: "Full-Stack Architecture",
      icon: Layers,
      description: "Production web frameworks, type-safe API backends, and responsive design systems",
      projectTag: "Next.js 16 • React 19 • FastAPI",
      skills: [
        { name: "Next.js 16 (App Router)", detail: "Server components, streaming SSR, Turbopack bundling", tag: "Portfolio" },
        { name: "React 19 / 18", detail: "Concurrent features, custom hooks, atomic state management", tag: "AquaNest" },
        { name: "FastAPI / Python", detail: "Asynchronous REST endpoints, Pydantic validation, worker queues", tag: "Udaan" },
        { name: "Tailwind CSS v4", detail: "Utility architecture, fluid typography, dark mode token systems", tag: "Design" },
        { name: "Framer Motion", detail: "Physics-based spring layouts, tactile transitions, kinetic animations", tag: "UX" },
      ],
    },
    {
      id: "safety",
      domain: "Personal Safety & Native",
      icon: Shield,
      description: "Covert mobile disguise systems, hardware telemetry, and native mobile bridges",
      projectTag: "Stealth Calculator • NeuroSync",
      skills: [
        { name: "Capacitor Mobile Bridge", detail: "Packaging web applications into native Android/iOS container runtimes", tag: "SoS App" },
        { name: "Geolocation & Background Telemetry", detail: "Real-time coordinate streaming and geofence tracking", tag: "SoS App" },
        { name: "Web Audio API Synthetics", detail: "Real-time waveform analysis, dBFS calculation, coherence tone generation", tag: "NeuroSync" },
        { name: "Covert Stealth Paradigms", detail: "Disguised PIN triggers, silent dead-man timer fail-safes", tag: "Security" },
      ],
    },
    {
      id: "runtimes",
      domain: "Engineering Tools & Runtimes",
      icon: Terminal,
      description: "Core languages, compiler environments, and continuous delivery pipelines",
      projectTag: "Python • TypeScript • C++ • C",
      skills: [
        { name: "Python 3.12+", detail: "Primary language for data science, backend servers, and machine learning", tag: "Core" },
        { name: "TypeScript 5+", detail: "Strict type checking, interface contracts, enterprise safety", tag: "Core" },
        { name: "C++ & C", detail: "Object-oriented programming, data structures, low-level memory control", tag: "Academic" },
        { name: "Git & GitHub CI/CD", detail: "Trunk-based development, semantic versioning, automated workflows", tag: "DevOps" },
        { name: "Vercel & Cloudflare", detail: "Edge deployment, environment secret management, CDN tuning", tag: "Infra" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 sm:py-32 relative max-w-full overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-16 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-3">
            <Terminal className="w-3.5 h-3.5 text-sky-400" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Engineering Competencies
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Organized strictly by problem domains with verifiable project application context. No arbitrary percentage bars—each competency is grounded in built software.
          </p>
        </div>

        {/* 5 Domain Modules */}
        <div className="space-y-8 mb-16">
          {technicalArsenal.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.id}
                className="rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-6 sm:p-8 hover:border-white/15 transition-all shadow-xl"
              >
                {/* Domain Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {group.domain}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-400 bg-white/[0.03] px-3 py-1 rounded-full border border-white/[0.06] shrink-0 self-start sm:self-auto">
                    {group.projectTag}
                  </span>
                </div>

                {/* Skills Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-sky-500/30 hover:bg-white/[0.04] transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-xs font-semibold text-zinc-200 font-mono">
                            {skill.name}
                          </span>
                          {skill.tag && (
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 shrink-0">
                              {skill.tag}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {skill.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Focus & Ongoing Exploration Strip */}
        <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-2 text-sky-400">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Active Focus & Ongoing Exploration
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6 max-w-xl">
            Emerging technologies and research directions currently driving weekend experiments and coursework deep dives:
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeFocusAreas.map((area, idx) => (
              <div
                key={area.title}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-sky-400 font-bold">0{idx + 1}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 leading-snug">
                    {area.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {area.focus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
