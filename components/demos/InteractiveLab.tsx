"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  Terminal,
  Video,
  Plane,
  Sparkles,
  ExternalLink,
  Github,
} from "lucide-react";
import { StealthCalculator } from "./StealthCalculator";
import { EdgeTerminal } from "./EdgeTerminal";
import { ViralityRadar } from "./ViralityRadar";
import { AirfareInspector } from "./AirfareInspector";

export type DemoTabKey = "calculator" | "terminal" | "virality" | "airfare";

interface DemoMeta {
  key: DemoTabKey;
  label: string;
  shortLabel: string;
  project: string;
  icon: React.ElementType;
  tagline: string;
  githubUrl: string;
  liveUrl?: string;
  tech: string[];
}

export function InteractiveLab() {
  const [activeTab, setActiveTab] = useState<DemoTabKey>("calculator");

  useEffect(() => {
    const handleSwitch = (e: Event) => {
      const customEvent = e as CustomEvent<DemoTabKey>;
      if (customEvent.detail) {
        setActiveTab(customEvent.detail);
      }
    };
    window.addEventListener("switch-demo-tab", handleSwitch);
    return () => window.removeEventListener("switch-demo-tab", handleSwitch);
  }, []);

  const demoMetas: DemoMeta[] = [
    {
      key: "calculator",
      label: "Stealth Calculator",
      shortLabel: "Calculator SOS",
      project: "SoS-Mobile-App",
      icon: ShieldAlert,
      tagline: "Personal safety system disguised as a real calculator. Secret PIN 9119= triggers covert SOS command center.",
      githubUrl: "https://github.com/Rishavroy-2006/SoS-Mobile-App",
      tech: ["React 18", "Capacitor", "GPS Telemetry", "Audio Buffering", "Framer Motion"],
    },
    {
      key: "terminal",
      label: "Edge Server Terminal",
      shortLabel: "PhoneCloud Shell",
      project: "PhoneCloud",
      icon: Terminal,
      tagline: "Android smartphone repurposed into 24/7 edge server via Termux, Cloudflare Tunnels, and hardware battery bypass.",
      githubUrl: "https://github.com/Rishavroy-2006",
      tech: ["Android 13 / Termux", "Qualcomm NPU", "Cloudflare Tunnels", "FastAPI", "SQLite WAL"],
    },
    {
      key: "virality",
      label: "Virality Radar & Studio",
      shortLabel: "ClipIt Studio",
      project: "ClipIt",
      icon: Video,
      tagline: "Autonomous AI video clipping engine with 2.4σ audio excitement detection and 3-way layout adaptation.",
      githubUrl: "https://github.com/Rishavroy-2006/ClipIt",
      tech: ["Python / FastAPI", "FFmpeg NVENC/Metal", "Whisper Large-v3", "Z-Score Audio", "React"],
    },
    {
      key: "airfare",
      label: "Airfare Anomaly Inspector",
      shortLabel: "Udaan Airfare",
      project: "Udaan-Metrics",
      icon: Plane,
      tagline: "Real-time airfare index tracking domestic corridors and filtering predatory surge pricing via statistical IQR anomaly detection.",
      githubUrl: "https://github.com/Rishavroy-2006/Udaan-Metrics",
      liveUrl: "https://udaan-metrics.vercel.app",
      tech: ["FastAPI", "IQR Anomaly Filter", "Prophet ML", "Price Index Engine", "React / Vite"],
    },
  ];

  const currentMeta = demoMetas.find((d) => d.key === activeTab) || demoMetas[0];

  return (
    <section id="interactive-lab" className="w-full py-16 sm:py-24 relative overflow-hidden scroll-mt-20">
      <div id="demos" className="absolute -top-24 pointer-events-none" />
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive Engineering Lab</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400 font-semibold">Live in Browser</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Experience the Code in Action.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Real engineering shouldn&apos;t be trapped in static bullet points. Interact directly with live simulations of my featured systems: stealth safety triggers, edge terminal commands, video virality detection, and airfare anomaly filtering.
          </p>
        </div>

        {/* Tab Switcher Bar */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md max-w-full overflow-x-auto scrollbar-none gap-1">
            {demoMetas.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`relative flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? "text-white shadow-lg"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeDemoTab"
                      className="absolute inset-0 rounded-xl bg-zinc-800 border border-zinc-700/60"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Icon className={`w-4 h-4 ${isSelected ? "text-sky-400" : "text-zinc-500"}`} />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden">{item.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Demo Meta Details Strip */}
        <div className="mb-6 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white text-sm">
                {currentMeta.project}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-medium">
                {currentMeta.tagline}
              </span>
            </div>
            {/* Tech badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2">
              {currentMeta.tech.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-zinc-800/70 text-zinc-400 font-mono text-[10px] border border-zinc-700/40"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {currentMeta.liveUrl && (
              <a
                href={currentMeta.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all font-mono"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <a
              href={currentMeta.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 border border-zinc-700 hover:text-white hover:bg-zinc-700 transition-all font-mono"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        {/* Dynamic Demo Container */}
        <div className="relative min-h-[520px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="w-full"
            >
              {activeTab === "calculator" && <StealthCalculator />}
              {activeTab === "terminal" && <EdgeTerminal />}
              {activeTab === "virality" && <ViralityRadar />}
              {activeTab === "airfare" && <AirfareInspector />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
