"use client";

import { personalInfo } from "@/lib/data";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] py-10 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>
          <p className="font-medium text-foreground">
            {personalInfo.name} • {personalInfo.tagline}
          </p>
          <p className="text-[11px] mt-0.5 opacity-80">
            Deployed on Cloudflare Workers with OpenNext & Next.js.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-mono text-[11px]">
            &copy; {new Date().getFullYear()} Rishav Roy
          </p>
          <button
            onClick={scrollToTop}
            type="button"
            className="p-2 rounded-lg surface-card text-muted-foreground hover:text-white transition-colors"
            aria-label="Back to top"
            title="Scroll to top of page"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
