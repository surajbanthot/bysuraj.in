"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { SITE, socials } from "@/lib/portfolioData";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        track("contact_enquiry");
        setForm({ name: "", email: "", project: "", budget: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const field =
    "w-full border-b border-border bg-transparent py-3 text-lg text-ink placeholder:text-faint focus:border-accent focus:outline-none transition-colors";

  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading no="07" title="Contact" kicker="Let's make something" />

      <div className="mt-12 grid gap-12 md:grid-cols-12">
        {/* Left: pitch + socials */}
        <Reveal className="md:col-span-5">
          <p className="font-display text-2xl leading-snug text-ink sm:text-3xl">
            Have a project, a frame, or a role in mind?
          </p>
          <a
            href={`mailto:${SITE.email}`}
            className="link-underline mt-6 inline-block font-mono text-base text-ink"
          >
            {SITE.email}
          </a>
          <ul className="mt-8 space-y-3">
            {socials.map((s) => (
              <li key={s.label} className="flex items-baseline justify-between border-b border-border py-2">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm uppercase tracking-widest text-ink transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </a>
                <span className="label">{s.handle}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Right: form */}
        <Reveal className="md:col-span-7" delay={120}>
          <div aria-live="polite">
          {status === "success" ? (
            <div className="flex h-full flex-col items-start justify-center gap-3 border border-border bg-paper-raised p-10">
              <span className="label text-accent">Sent</span>
              <p className="font-display text-3xl text-ink">Message received.</p>
              <p className="text-lg text-muted">I&apos;ll get back to you shortly. Thank you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-6">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="name" className="label">Name *</label>
                <input
                  id="name"
                  required
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className={field}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="email" className="label">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  maxLength={160}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className={field}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="project" className="label">Project type</label>
                <input
                  id="project"
                  value={form.project}
                  maxLength={100}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  placeholder="Web · Motion · Film · AI"
                  className={field}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="budget" className="label">Budget (optional)</label>
                <input
                  id="budget"
                  value={form.budget}
                  maxLength={100}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="₹ —"
                  className={field}
                />
              </div>
              <div className="col-span-2">
                <label htmlFor="message" className="label">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  maxLength={2000}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about it…"
                  className={`${field} resize-none`}
                />
              </div>

              <div className="col-span-2 flex items-center gap-5">
                <button
                  type="submit"
                  disabled={status === "loading" || !form.name || !form.email}
                  className="bg-ink px-7 py-3 font-mono text-sm uppercase tracking-widest text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === "loading" ? "Sending…" : "Send enquiry"}
                </button>
                {status === "error" && (
                  <span className="font-mono text-sm text-accent">
                    Something went wrong — try email instead.
                  </span>
                )}
              </div>
            </form>
          )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
