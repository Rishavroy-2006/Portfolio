"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  duration: number;
  delay: number;
  type: "octagon" | "hexagon" | "triangle" | "ring";
}

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      color: Math.random() > 0.5 ? "#4fd1c5" : "#63b3ed",
    }))
  );

  const [shapes] = useState<FloatingShape[]>(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 60 + 40,
      rotation: Math.random() * 360,
      duration: Math.random() * 15 + 20,
      delay: Math.random() * 3,
      type: (["octagon", "hexagon", "triangle", "ring"] as const)[i % 4],
    }))
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
          y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden bg-background">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Radial gradient glow */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(79, 209, 197, 0.3) 0%, transparent 70%)",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          x: mouse.x * 50,
          y: mouse.y * 50,
          scale: [1, 1.05, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 30 },
          y: { type: "spring", stiffness: 50, damping: 30 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Secondary glow */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(99, 179, 237, 0.4) 0%, transparent 70%)",
          left: "30%",
          top: "60%",
        }}
        animate={{
          x: mouse.x * -30,
          y: mouse.y * -30,
          scale: [1, 1.1, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 40, damping: 25 },
          y: { type: "spring", stiffness: 40, damping: 25 },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 },
        }}
      />

      {/* Floating geometric shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [shape.rotation, shape.rotation + 360],
            x: mouse.x * (10 + shape.id * 3),
          }}
          transition={{
            y: { duration: shape.duration, repeat: Infinity, ease: "easeInOut", delay: shape.delay },
            rotate: { duration: shape.duration * 2, repeat: Infinity, ease: "linear" },
            x: { type: "spring", stiffness: 30, damping: 20 },
          }}
        >
          {shape.type === "octagon" && (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <polygon
                points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
                fill="none"
                stroke="#4fd1c5"
                strokeWidth="1"
              />
            </svg>
          )}
          {shape.type === "hexagon" && (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
              <polygon
                points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
                fill="none"
                stroke="#63b3ed"
                strokeWidth="1"
              />
            </svg>
          )}
          {shape.type === "triangle" && (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-25">
              <polygon
                points="50,10 90,90 10,90"
                fill="none"
                stroke="#4fd1c5"
                strokeWidth="1"
              />
            </svg>
          )}
          {shape.type === "ring" && (
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-15">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#63b3ed" strokeWidth="1" />
            </svg>
          )}
        </motion.div>
      ))}

      {/* Animated torus knot representation using CSS */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{
          x: mouse.x * 40,
          y: mouse.y * 30,
          rotate: [0, 360],
        }}
        transition={{
          x: { type: "spring", stiffness: 50, damping: 20 },
          y: { type: "spring", stiffness: 50, damping: 20 },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="relative w-64 h-64">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          {/* Inner ring */}
          <motion.div
            className="absolute inset-8 rounded-full border border-accent/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
          {/* Core */}
          <motion.div
            className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Glow */}
          <div 
            className="absolute inset-12 rounded-full opacity-50 blur-xl"
            style={{ background: "radial-gradient(circle, rgba(79, 209, 197, 0.5) 0%, transparent 70%)" }}
          />
        </div>
      </motion.div>

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(79, 209, 197, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(79, 209, 197, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
