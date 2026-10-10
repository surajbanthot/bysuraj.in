"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";
import Reveal from "@/components/Reveal";
import { SITE, socials } from "@/lib/portfolioData";

type Status = "idle" | "loading" | "success" | "error";
type Intent = "hire" | "commission";

const intents: { id: Intent; label: string; project: string; placeholder: string }[] = [
  {
    id: "commission",
    label: "Commission a project",
    project: "Commission",
    placeholder: "What are we making? Motion, Rive, an AI build, a shoot…",
  },
  {
    id: "hire",
    label: "Hiring for a role",
    project: "Full-time role",
    placeholder: "Tell me about the team, the role and what you're building.",
  },
];

const emptyForm = { name: "", email: "", project: "Commission", budget: "", message: "" };

export default function ContactSection() {
  const [intent, setIntent] = useState<Intent>("commission");
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const active = intents.find((i) => i.id === intent)!;

  const chooseIntent = (next: (typeof intents)[number]) => {
    setIntent(next.id);
    setForm((f) => ({ ...f, project: next.project }));
  };

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
        track("contact_enquiry", { intent });
        setForm({ ...emptyForm, project: active.project });
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
    <section id="contact" className="relative overflow-hidden border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 sm:py-36">
        <Reveal>
          <span className="label text-accent">10 — Contact</span>
          <h2 className="display mt-6 text-[15vw] leading-[0.85] text-ink lg:text-[11rem]">
            Let&apos;s make <em className="text-accent">something.</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <a
              href={`mailto:${SITE.email}`}
              className="link-underline font-mono text-base text-ink"
            >
              {SITE.email} <span aria-hidden="true">↗</span>
            </a>
            <ul className="mt-10 border-t border-border">
              {socials.map((s) => (
                <li key={s.label} className="border-b border-border">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-baseline justify-between py-3"
                  >
                    <span className="font-mono text-sm uppercase tracking-wider text-ink transition-colors group-hover:text-accent">
                      {s.label} <span aria-hidden="true">↗</span>
                    </span>
                    <span className="label">{s.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="md:col-span-7 md:col-start-6" delay={120}>
            <div aria-live="polite">
              {status === "success" ? (
                <div className="flex flex-col items-start gap-3 border border-border bg-paper-raised p-10">
                  <span className="label text-accent">Sent</span>
                  <p className="display text-4xl text-ink">Message received.</p>
                  <p className="text-lg text-muted">Thanks. I&apos;ll reply within a couple of days.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-x-6 gap-y-7">
                  <fieldset className="col-span-2">
                    <legend className="label mb-3">I&apos;m…</legend>
                    <div className="flex flex-wrap gap-2">
                      {intents.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          aria-pressed={intent === option.id}
                          onClick={() => chooseIntent(option)}
                          className={`rounded-full px-5 py-2.5 font-mono text-sm uppercase tracking-wider transition-colors ${
                            intent === option.id
                              ? "bg-accent text-paper"
                              : "border border-border text-muted hover:border-accent hover:text-ink"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="name" className="label">Name *</label>
                    <input
                      id="name"
                      required
                      maxLength={100}
                      autoComplete="name"
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
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@example.com"
                      className={field}
                    />
                  </div>
                  {intent === "commission" && (
                    <div className="col-span-2">
                      <label htmlFor="budget" className="label">Budget (optional)</label>
                      <input
                        id="budget"
                        value={form.budget}
                        maxLength={100}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        placeholder="₹ / $ — a rough range is fine"
                        className={field}
                      />
                    </div>
                  )}
                  <div className="col-span-2">
                    <label htmlFor="message" className="label">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder={active.placeholder}
                      className={`${field} resize-none`}
                    />
                  </div>

                  <div className="col-span-2 flex flex-wrap items-center gap-5">
                    <button
                      type="submit"
                      disabled={status === "loading" || !form.name || !form.email}
                      className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-3.5 font-mono text-sm uppercase tracking-wider text-paper transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink"
                    >
                      {status === "loading" ? "Sending…" : "Send"}
                      <span aria-hidden="true">↗</span>
                    </button>
                    {status === "error" && (
                      <span className="font-mono text-sm text-accent">
                        Your message didn&apos;t send. Please email me directly instead.
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
