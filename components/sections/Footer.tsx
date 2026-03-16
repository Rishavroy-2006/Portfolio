"use client";

import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { personalInfo } from "@/lib/data";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground flex items-center gap-1"
          >
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by{" "}
            <span className="text-gradient font-medium">{personalInfo.name}</span>
          </motion.p>

          {/* Year */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} All rights reserved.
          </motion.p>

          {/* Scroll to top */}
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onClick={scrollToTop}
            className="p-2 glass rounded-lg hover:bg-white/10 transition-colors group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:text-primary transition-colors" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
