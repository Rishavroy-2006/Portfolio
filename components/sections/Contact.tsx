"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { personalInfo, socialLinks } from "@/lib/data";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  MapPin,
  ArrowUpRight,
  Heart,
} from "lucide-react";

const socialItems = [
  {
    name: "Instagram",
    href: socialLinks.instagram,
    icon: Instagram,
    color: "#E4405F",
    gradient: "from-[#f09433] via-[#e6683c] to-[#bc1888]",
  },
  {
    name: "LinkedIn",
    href: socialLinks.linkedin,
    icon: Linkedin,
    color: "#0077B5",
    gradient: "from-[#0077B5] to-[#00a0dc]",
  },
  {
    name: "GitHub",
    href: socialLinks.github,
    icon: Github,
    color: "#6e5494",
    gradient: "from-[#6e5494] to-[#a78bfa]",
  },
  {
    name: "Email",
    href: `mailto:${personalInfo.email}`,
    icon: Mail,
    color: "#22d3ee",
    gradient: "from-primary to-accent",
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
        
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <p className="text-primary text-sm uppercase tracking-widest mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Let&apos;s <span className="text-gradient">Connect</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
            <p className="text-muted-foreground max-w-md mx-auto">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info & Social Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Info Card */}
              <div className="glass-strong p-8 rounded-2xl">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="flex items-center gap-4 p-4 glass rounded-xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="p-3 bg-primary/20 rounded-xl group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{personalInfo.email}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>

                  <div className="flex items-center gap-4 p-4 glass rounded-xl">
                    <div className="p-3 bg-accent/20 rounded-xl">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{personalInfo.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Find me on</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialItems.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative flex items-center gap-3 p-4 glass rounded-xl border border-white/10 transition-all duration-300 overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                        style={{ backgroundColor: social.color, opacity: 0 }}
                      />
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: social.color }}
                      />
                      
                      {/* Icon with glow */}
                      <div 
                        className="relative z-10 p-2 rounded-lg transition-all duration-300 group-hover:shadow-lg"
                        style={{ 
                          boxShadow: `0 0 0 rgba(0,0,0,0)`,
                        }}
                      >
                        <social.icon 
                          className="w-5 h-5 transition-all duration-300"
                          style={{ 
                            filter: 'drop-shadow(0 0 0 transparent)',
                          }}
                        />
                        {/* Animated glow ring */}
                        <div 
                          className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"
                          style={{ 
                            boxShadow: `0 0 20px ${social.color}, 0 0 40px ${social.color}40`,
                          }}
                        />
                      </div>
                      
                      <span className="relative z-10 font-medium group-hover:text-white transition-colors duration-300">
                        {social.name}
                      </span>
                      
                      {/* Arrow indicator */}
                      <ArrowUpRight className="relative z-10 w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-strong p-8 rounded-2xl relative overflow-hidden">
                {/* Success overlay */}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <Heart className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-xl font-semibold">Thank you!</p>
                      <p className="text-muted-foreground">I&apos;ll get back to you soon.</p>
                    </div>
                  </motion.div>
                )}

                <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                      className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-4 py-3 glass rounded-xl bg-transparent border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Your message..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
