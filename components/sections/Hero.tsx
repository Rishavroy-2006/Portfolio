"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  Copy,
  Check,
  Server,
  Trophy,
  Clock,
  Sparkles,
  Code2,
} from "lucide-react";
import { personalInfo } from "@/lib/data";
import HeroBackground from "@/components/3d/HeroBackground";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [kolkataTime, setKolkataTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Asia/Kolkata timezone (UTC+5:30)
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);
      setKolkataTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="home"
      className="relative min-h-[95vh] sm:min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden max-w-full"
    >
      {/* Dynamic 3D / Shader Background */}
      <HeroBackground />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Availability & Sub-Role Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-xs text-zinc-300 mb-6 shadow-sm hover:border-sky-500/30 transition-colors"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] sm:text-xs">
            B.Tech CSE (AI & ML) • 2nd Year • Narula Institute of Technology
          </span>
        </motion.div>

        {/* Primary Name Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mb-4"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
            Rishav Roy
          </h1>
          <p className="mt-3 text-lg sm:text-2xl md:text-3xl font-semibold tracking-tight text-zinc-300">
            AI/ML Engineer <span className="text-sky-400">&</span> Systems Builder
          </p>
        </motion.div>

        {/* Value Proposition Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8 font-normal"
        >
          Engineering local-first AI video pipelines, 24/7 edge cloud servers from repurposed mobile hardware, and stealth personal safety tools. Passionate about multi-agent systems and real-time data architectures.
        </motion.p>

        {/* Live Telemetry Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mb-10 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-2xl bg-zinc-950/70 border border-white/[0.08] backdrop-blur-md shadow-2xl">
            {/* Kolkata Live Clock */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Kolkata, IN
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-white tabular-nums ml-auto">
                {kolkataTime || "12:00:00"} <span className="text-[10px] text-zinc-500">IST</span>
              </span>
            </div>

            {/* PhoneCloud Edge Server Status */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2">
                <Server className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  PhoneCloud Node
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-medium text-emerald-300">
                  184d Uptime
                </span>
              </div>
            </div>

            {/* Smart India Hackathon Badge */}
            <div className="flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2">
                <Trophy className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  SIH 2024
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-amber-300 ml-auto">
                Winner / Finalist
              </span>
            </div>
          </div>
        </motion.div>

        {/* Primary CTAs & Instant Email Action */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8"
        >
          {/* Launch Interactive Lab */}
          <a
            href="#interactive-lab"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500 text-zinc-950 font-semibold text-sm hover:bg-sky-400 shadow-lg shadow-sky-500/20 active:scale-[0.98] transition-all duration-150"
          >
            <Sparkles className="w-4 h-4 text-zinc-950" />
            <span>Launch Interactive Lab</span>
          </a>

          {/* View Selected Works */}
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900/90 text-zinc-100 font-medium text-sm border border-white/10 hover:border-white/25 hover:bg-zinc-800/90 active:scale-[0.98] transition-all duration-150"
          >
            <Code2 className="w-4 h-4 text-zinc-400" />
            <span>View Selected Works</span>
          </a>

          {/* Instant Copy Email Button */}
          <button
            onClick={handleCopyEmail}
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950/80 text-zinc-300 font-medium text-sm border border-white/10 hover:border-white/20 hover:text-white active:scale-[0.98] transition-all duration-150 cursor-pointer"
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-mono text-xs">Email Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-zinc-400" />
                <span className="font-mono text-xs">{personalInfo.email}</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center"
        >
          <a
            href="#interactive-lab"
            aria-label="Scroll down to Interactive Lab"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-500 hover:text-zinc-300 transition-colors py-2"
          >
            <span>SCROLL TO LAB</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
