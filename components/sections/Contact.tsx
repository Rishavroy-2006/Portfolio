"use client";

import { useState } from "react";
import { personalInfo, socialLinks } from "@/lib/data";
import {
  Mail,
  Github,
  Linkedin,
  Instagram,
  Send,
  MapPin,
  ArrowUpRight,
  Check,
  Copy,
  AlertCircle,
  Loader2,
  Clock,
  Code2,
  Terminal,
} from "lucide-react";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          text: data.message || "Thank you! Your message has been received. I'll get back to you shortly.",
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to send message. Please feel free to email me directly.",
        });
      }
    } catch {
      setFeedback({
        type: "error",
        text: `Network error. Please email me directly at ${personalInfo.email}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const channels = [
    {
      name: "GitHub",
      href: socialLinks.github,
      handle: "@Rishavroy-2006",
      icon: Github,
    },
    {
      name: "LinkedIn",
      href: socialLinks.linkedin,
      handle: "in/rishav-roy2006",
      icon: Linkedin,
    },
    {
      name: "Instagram",
      href: socialLinks.instagram,
      handle: "@rishav.royy",
      icon: Instagram,
    },
    {
      name: "LeetCode",
      href: "https://leetcode.com/u/Rishavroy-2006/",
      handle: "Rishavroy-2006",
      icon: Code2,
    },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 relative max-w-full overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[400px] bg-sky-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mb-14 sm:mb-16 border-b border-white/[0.08] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-900/90 text-zinc-300 border border-zinc-800 mb-3">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
            <span>Direct Channels</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Initiate Contact
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Interested in building high-throughput systems, applied AI/ML architectures, or exploring summer internship opportunities? Reach out via direct email or the contact terminal below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Direct Info, Copy Email, Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Email Card */}
            <div className="rounded-2xl bg-zinc-950/75 border border-white/10 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                  Primary Mailbox
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Active Response
                </span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Direct Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-sky-300 transition-colors truncate block font-mono"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="p-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white transition-all shrink-0 cursor-pointer border border-white/[0.06]"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Timezone & Location Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-[10px] font-mono uppercase">Timezone</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-200 font-mono">
                    UTC +5:30 (IST)
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Kolkata, India</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                  <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span className="text-[10px] font-mono uppercase">Location</span>
                  </div>
                  <p className="text-xs font-semibold text-zinc-200">
                    Kolkata, WB
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">Open to Remote/Relo</p>
                </div>
              </div>
            </div>

            {/* Online Channels */}
            <div className="rounded-2xl bg-zinc-950/75 border border-white/10 p-6 shadow-xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-4">
                Verified Online Channels
              </h3>
              <div className="space-y-2">
                {channels.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <a
                      key={ch.name}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/[0.03] text-zinc-400 group-hover:text-white transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-white leading-tight">
                            {ch.name}
                          </p>
                          <p className="text-[11px] font-mono text-zinc-400 leading-tight mt-0.5">
                            {ch.handle}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Terminal Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-950/80 border border-white/10 p-6 sm:p-8 shadow-2xl relative">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <h3 className="text-sm font-mono font-semibold text-white">
                    Direct Dispatch Terminal
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">
                  Response SLA: &lt;24h
                </span>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                    feedback.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/25 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/25 text-rose-400"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <Check className="w-4 h-4 mt-0.5 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  )}
                  <span>{feedback.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-zinc-600 text-xs sm:text-sm focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    placeholder="elena@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-zinc-600 text-xs sm:text-sm focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Describe your project, systems collaboration, or role requirements..."
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder:text-zinc-600 text-xs sm:text-sm focus:border-sky-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-sky-500 text-zinc-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-sky-400 disabled:opacity-50 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-sky-500/20"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                      <span>Transmitting message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
