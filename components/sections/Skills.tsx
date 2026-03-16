"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills, currentlyLearning } from "@/lib/data";
import { Code, Globe, Wrench, Brain, BookOpen, TrendingUp } from "lucide-react";

const categoryIcons: Record<string, typeof Code> = {
  language: Code,
  web: Globe,
  tool: Wrench,
  specialty: Brain,
};

const categoryColors: Record<string, string> = {
  language: "from-blue-500 to-cyan-400",
  web: "from-emerald-500 to-teal-400",
  tool: "from-amber-500 to-orange-400",
  specialty: "from-purple-500 to-pink-400",
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <section
      id="skills"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-3">
              Technical Expertise
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
            {skills.map((skill, index) => {
              const Icon = categoryIcons[skill.category] || Code;
              const gradient = categoryColors[skill.category] || "from-primary to-accent";
              
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group glass p-5 rounded-xl cursor-default relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient}`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <h3 className="font-semibold mb-3">{skill.name}</h3>
                    
                    {/* Progress bar */}
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05 }}
                        className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Currently Learning Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-center gap-3 mb-8">
              <BookOpen className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Currently Learning</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {currentlyLearning.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={itemVariants}
                  className="glass p-4 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-sm">{item.name}</span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${item.progress}%` } : { width: 0 }}
                      transition={{ duration: 1.2, delay: 0.5 + index * 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-accent to-primary"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
