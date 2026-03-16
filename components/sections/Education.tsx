"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { education, beyondCode } from "@/lib/data";
import { GraduationCap, Calendar, MapPin, Sparkles, Gamepad2, FlaskConical, Globe, Palette } from "lucide-react";

const beyondIcons = [Gamepad2, FlaskConical, Globe, Palette];

export function Education() {
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
      id="education"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-3">
              Academic Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Education</span> & More
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Education Timeline */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Education</h3>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-transparent" />

                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    variants={itemVariants}
                    className="relative pl-12 pb-8"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0 w-8 h-8 rounded-full glass flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
                    </div>

                    {/* Content card */}
                    <div className="glass-strong p-4 sm:p-6 rounded-xl">
                      {/* Status badge */}
                      <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full mb-3">
                        {edu.status}
                      </span>

                      <h4 className="text-lg font-semibold mb-2">{edu.degree}</h4>
                      <p className="text-accent text-sm mb-3">
                        {edu.specialization}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs">{edu.institution}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span className="text-xs">{edu.period}</span>
                        </div>
                      </div>

                      {/* Show CGPA if available */}
                      {edu.cgpa && (
                        <div className="mb-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                          <p className="text-sm"><span className="font-semibold">CGPA:</span> {edu.cgpa}</p>
                        </div>
                      )}

                      {/* Show coursework if available */}
                      {edu.coursework && edu.coursework.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Relevant Coursework</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {edu.coursework.map((course) => (
                              <div key={course} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                {course}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Beyond Code Section */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Sparkles className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-semibold">Beyond Coding</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6 pl-1">When I'm not coding:</p>

              <div className="space-y-4">
                {beyondCode.map((item, index) => {
                  const Icon = beyondIcons[index % beyondIcons.length];
                  return (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      whileHover={{ x: 8 }}
                      className="glass p-5 rounded-xl flex items-center gap-4 group cursor-default"
                    >
                      <div className="p-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="font-medium">{item}</span>
                    </motion.div>
                  );
                })}
              </div>

              {/* Fun fact card */}
              <motion.div
                variants={itemVariants}
                className="mt-8 glass-strong p-6 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-2xl" />
                <div className="relative">
                  <p className="text-sm text-muted-foreground mb-2">Fun Fact</p>
                  <p className="text-lg font-medium">
                    I believe the best code is written when curiosity meets determination.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
