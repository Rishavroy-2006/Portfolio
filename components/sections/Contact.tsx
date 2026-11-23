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
          text: data.message || "Thank you! Your message has been received.",
        });
        setFormState({ name: "", email: "", message: "" });
      } else {
        setFeedback({
          type: "error",
          text: data.error || "Failed to send message. Please email directly.",
        });
      }
    } catch (err) {
      setFeedback({
        type: "error",
        text: "Network error sending message. Please email me directly at " + personalInfo.email,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading - clean, no eyebrows or gradient underlines */}
        <div className="mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Contact
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl">
            Interested in working together or discussing a project? Send a message below or reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          {/* Direct channels & Quick Connect (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="surface-card rounded-2xl p-6 sm:p-7 border border-white/[0.08] space-y-5">
              <h3 className="text-base font-semibold text-white">
                Direct Contact
              </h3>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-medium text-white hover:text-primary transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  type="button"
                  className="p-2 rounded-lg surface-card text-muted-foreground hover:text-white transition-colors shrink-0"
                  aria-label="Copy email address"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">Location</p>
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="surface-card rounded-2xl p-6 sm:p-7 border border-white/[0.08]">
              <h3 className="text-base font-semibold text-white mb-4">
                Online Profiles
              </h3>
              <div className="space-y-2.5">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-foreground">
                    <Github className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    <span>GitHub Profile</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>

                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-foreground">
                    <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    <span>LinkedIn Network</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>

                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04] transition-all group"
                >
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-foreground">
                    <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                    <span>Instagram</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="surface-card rounded-2xl p-6 sm:p-8 border border-white/[0.08]">
              <h3 className="text-lg font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-muted-foreground mb-6">
                Fill in the details below. I typically respond within 24–48 hours.
              </p>

              {/* Inline Feedback Banner */}
              {feedback && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-xs sm:text-sm leading-relaxed ${
                    feedback.type === "success"
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      : "bg-rose-500/10 border border-rose-500/20 text-rose-400"
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
                  <label htmlFor="contact-name" className="block text-xs font-medium text-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    placeholder="Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-foreground mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    rows={5}
                    placeholder="Briefly describe what you'd like to discuss or collaborate on..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/[0.03] border border-white/10 text-white placeholder:text-muted-foreground text-xs sm:text-sm focus:border-primary focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 hover:brightness-110 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
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
