"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Smooth springs for cursor reactivity
  const springX = useSpring(0, { stiffness: 45, damping: 25 });
  const springY = useSpring(0, { stiffness: 45, damping: 25 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 40;
      springX.set(x);
      springY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-background"
      aria-hidden="true"
    >
      {/* Subtle architectural grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 40%, black 30%, transparent 75%)",
        }}
      />

      {/* Primary ambient light bloom */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(14, 165, 233, 0.1) 50%, transparent 80%)",
          x: springX,
          y: springY,
        }}
      />

      {/* Secondary depth glow */}
      <motion.div
        className="absolute top-1/3 left-1/3 w-[500px] h-[400px] rounded-full blur-[160px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
          x: springX,
          y: springY,
        }}
      />

      {/* Soft gradient fade into page content */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent" />
    </div>
  );
}
