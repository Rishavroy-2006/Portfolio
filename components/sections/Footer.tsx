"use client";

import { personalInfo } from "@/lib/data";
import { ArrowUp, Cloud } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] bg-zinc-950/80 py-12 relative max-w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-400">
        {/* Attribution & Tech Stack */}
        <div className="space-y-1.5 text-center md:text-left">
          <p className="font-semibold text-white tracking-tight text-sm">
            {personalInfo.name} • {personalInfo.tagline}
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-[11px] font-mono text-zinc-500">
            <span className="inline-flex items-center gap-1 text-sky-400/90">
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloudflare Workers + OpenNext</span>
            </span>
            <span>•</span>
            <span>Next.js 16 (Turbopack)</span>
            <span>•</span>
            <span>Tailwind CSS v4</span>
          </div>
        </div>

        {/* Copyright & Back to Top */}
        <div className="flex items-center gap-4">
          <p className="font-mono text-[11px] text-zinc-500">
            &copy; {new Date().getFullYear()} Rishav Roy. All systems operational.
          </p>
          <button
            onClick={scrollToTop}
            type="button"
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] text-zinc-400 hover:text-white transition-all cursor-pointer shadow-sm"
            aria-label="Back to top"
            title="Scroll to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
