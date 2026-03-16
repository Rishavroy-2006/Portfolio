"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Mail, GraduationCap, Sparkles } from "lucide-react";
import { personalInfo, education } from "@/lib/data";
import Image from "next/image";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-3">
              Get to know me
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Photo/Visual */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-square max-w-xs sm:max-w-md mx-auto">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-accent to-primary animate-spin-slow opacity-30" />
                <div className="absolute inset-1 rounded-2xl bg-background" />
                
                {/* Profile image with glass overlay */}
                <div className="absolute inset-3 sm:inset-4 rounded-xl overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt="Rishav Roy"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Subtle glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                </div>

                {/* Floating elements — hidden on very small screens to avoid clipping */}
                <motion.div
                  className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 p-2 sm:p-3 glass rounded-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <GraduationCap className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 p-2 sm:p-3 glass rounded-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {personalInfo.bio}
              </p>

              {/* Info cards */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Location</span>
                  </div>
                  <p className="font-medium">{personalInfo.location}</p>
                </div>

                <div className="glass p-4 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <Mail className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">Email</span>
                  </div>
                  <p className="font-medium text-xs sm:text-sm break-all">{personalInfo.email}</p>
                </div>

                <div className="glass p-4 rounded-xl sm:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/20 rounded-lg">
                      <GraduationCap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm text-muted-foreground">Education</span>
                  </div>
                  <p className="font-medium">{education[0].degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {education[0].specialization}
                  </p>
                  <p className="text-xs text-primary mt-1">
                    {education[0].status}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300"
                >
                  Get in Touch
                </a>
                <a
                  href="#projects"
                  className="px-6 py-3 glass rounded-lg font-medium hover:bg-white/10 transition-all duration-300"
                >
                  View Work
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
