import { useEffect, useState, type ReactNode } from "react";
import { motion, MotionConfig } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import heroImg from "@/assets/hero.jpg";
import introImg from "@/assets/intro.jpg";
import communityImg from "@/assets/community.jpg";
import {
  LINKEDIN_URL, services, pillars, steps, reasons, audiences, mentors, stories, outcomes, faqs,
} from "./data";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

function PrimaryCta({ children = "Start Your Journey", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <a
      href={LINKEDIN_URL}
      target="_blank"
      rel="noreferrer"
      className={`group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-float ${className}`}
    >
      {children}
      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function GhostCta({ href, children, dark = true }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full border px-7 py-4 text-sm font-bold uppercase tracking-wider transition-colors ${
        dark ? "border-navy-foreground/25 text-navy-foreground hover:border-navy-foreground" : "border-navy/25 text-navy hover:border-navy"
      }`}
    >
      {children}
    </a>
  );
}

/* ---------------- NAV ---------------- */
const navLinks = [
  { label: "About", href: "#about" },
  { label: "What We Do", href: "#what-we-do" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Us", href: "#why-us" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "border-b border-navy-foreground/10 bg-navy/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" className="text-sm font-extrabold uppercase tracking-[0.18em] text-navy-foreground">
          Lead Learn <span className="text-primary">&</span> Inspire
        </a>
        <nav className="hidden items-center gap-9 lg:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-navy-muted transition-colors hover:text-navy-foreground">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="group hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground sm:inline-flex"
          >
            Start Your Journey <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="rounded-full border border-navy-foreground/20 p-2.5 text-navy-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 px-5 pb-6 lg:hidden">
          {[...navLinks, { label: "FAQ", href: "#faq" }].map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="border-b border-navy-foreground/10 py-4 text-2xl font-bold text-navy-foreground">
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ---------------- 01 HERO ---------------- */
function Hero() {
  const line = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } };
  return (
    <section id="top" className="relative overflow-hidden bg-navy pt-28 pb-16 text-navy-foreground lg:min-h-[820px] lg:pt-32">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[600px] rounded-full bg-primary/20 blur-[140px]" />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-16">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.12 }}>
          <motion.p variants={line} transition={{ duration: 0.8, ease }} className="eyebrow text-primary">
            Lead <span className="text-lime">•</span> Learn <span className="text-lime">•</span> Inspire
          </motion.p>
          <h1 className="display mt-6 text-[2.75rem] sm:text-6xl lg:text-[5.5rem]">
            <motion.span variants={line} transition={{ duration: 0.9, ease }} className="block">Build your future.</motion.span>
            <motion.span variants={line} transition={{ duration: 0.9, ease }} className="block text-primary">Become more.</motion.span>
          </h1>
          <motion.p variants={line} transition={{ duration: 0.8, ease }} className="mt-8 max-w-xl text-lg leading-relaxed text-navy-muted md:text-xl">
            Develop your leadership, strengthen your mindset, expand your network and discover new possibilities with a community built around growth.
          </motion.p>
          <motion.div variants={line} transition={{ duration: 0.8, ease }} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PrimaryCta />
            <GhostCta href="#about">Explore Lead Learn & Inspire</GhostCta>
          </motion.div>
          <motion.ul variants={line} transition={{ duration: 0.8, ease }} className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-navy-muted">
            {["Leadership", "Mentorship", "Entrepreneurship", "Community"].map((t, i) => (
              <li key={t} className="flex items-center gap-4">
                {i > 0 && <span className="size-1 rounded-full bg-primary" />}
                {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative">
          <motion.div
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.3, delay: 0.2, ease }}
            className="overflow-hidden rounded-[28px]"
          >
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, delay: 0.2, ease }}
              src={heroImg}
              width={1024}
              height={1280}
              alt="Diverse group of professionals in an authentic mentoring conversation in a Sydney workspace"
              className="h-[460px] w-full object-cover sm:h-[560px] lg:h-[700px]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease }}
            className="absolute -left-2 bottom-24 sm:-left-8 lg:-left-12"
          >
            <div className="animate-floaty rounded-2xl bg-surface p-5 text-navy shadow-float">
              <p className="eyebrow text-primary">Leadership</p>
              <p className="mt-2 text-lg font-bold">Develop confidence to lead.</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="absolute -right-2 top-10 sm:-right-6"
          >
            <div className="animate-floaty rounded-2xl bg-surface p-5 text-navy shadow-float [animation-delay:1.5s]">
              <p className="eyebrow flex items-center gap-2 text-primary">
                <span className="size-1.5 rounded-full bg-lime" /> Growth
              </p>
              <p className="mt-2 text-lg font-bold">Build what's next.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 02 MARQUEE ---------------- */
function Marquee() {
  const words = ["Lead", "Learn", "Inspire", "Grow", "Connect", "Build"];
  const row = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-navy-foreground/10 bg-navy py-8 text-navy-foreground">
      <div className="animate-marquee flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {row.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className={`display px-8 text-5xl md:text-7xl ${i % 3 === 1 ? "text-primary" : i % 2 ? "text-outline" : ""}`}>{w}</span>
                <span className="size-3 rounded-full bg-lime/80" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 03 INTRO ---------------- */
function Intro() {
  return (
    <section id="about" className="bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow text-primary">Your next chapter</p>
            <h2 className="display mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Your career is only one part of your <span className="text-primary">future.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Where you go next isn't only about your job title. It's about the skills you build, the people you surround yourself with, the confidence you develop and the possibilities you create.
            </p>
          </Reveal>
          <div className="mt-14 divide-y divide-border border-y border-border">
            {["Build Confidence", "Develop Skills", "Create Opportunity"].map((s, i) => (
              <Reveal key={s} delay={i * 0.1}>
                <div className="flex items-baseline gap-6 py-6">
                  <span className="text-sm font-bold text-primary">{pad(i + 1)}</span>
                  <span className="text-2xl font-extrabold uppercase tracking-tight md:text-4xl">{s}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.15} className="relative">
          <div className="overflow-hidden rounded-[24px]">
            <img src={introImg} width={1024} height={1280} loading="lazy" alt="Confident young professional walking through a Melbourne city laneway" className="h-[560px] w-full object-cover transition-transform duration-1000 hover:scale-[1.03] md:h-[640px]" />
          </div>
          <div className="absolute -bottom-10 left-4 right-4 rounded-[20px] bg-navy p-8 text-navy-foreground shadow-float sm:left-auto sm:right-[-1.5rem] sm:w-80 lg:-left-16 lg:right-auto">
            <span className="block h-1 w-10 rounded-full bg-lime" />
            <p className="mt-5 text-2xl font-bold leading-snug">Growth starts with the right environment.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 04 WHAT WE DO ---------------- */
function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-primary">How we help you grow</p>
            <h2 className="display mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">
              More than learning.<br /><span className="text-primary">A path forward.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              Lead Learn & Inspire brings together development, mentorship and community to help growth-minded people build the skills, mindset and connections to move forward.
            </p>
            <div className="mt-8"><PrimaryCta /></div>
          </Reveal>
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06} className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"}>
              <article
                className={`group relative flex h-full min-h-[340px] flex-col justify-between overflow-hidden rounded-[24px] border p-8 transition-all duration-500 hover:-translate-y-1.5 md:p-10 ${
                  i === 0 ? "border-navy bg-navy text-navy-foreground" : "border-border bg-background hover:border-navy hover:bg-navy hover:text-navy-foreground"
                }`}
              >
                <span className="absolute left-0 top-0 h-1 w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                <div className="flex items-start justify-between">
                  <span className="text-6xl font-extrabold tracking-tighter text-primary md:text-7xl">{pad(i + 1)}</span>
                  <ArrowUpRight className="size-7 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight md:text-3xl">{s.title}</h3>
                  <p className={`mt-4 text-base leading-relaxed md:text-lg ${i === 0 ? "text-navy-muted" : "text-muted-foreground group-hover:text-navy-muted"}`}>{s.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 05 LEAD LEARN INSPIRE ---------------- */
function Pillars() {
  const words = [
    { w: "Lead.", c: "" },
    { w: "Learn.", c: "text-primary" },
    { w: "Inspire", c: "" },
  ];
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 text-center md:px-10">
        <h2 className="display flex flex-col items-center text-6xl sm:text-8xl lg:text-[8.5rem]">
          {words.map((x, i) => (
            <motion.span
              key={x.w}
              initial={{ opacity: 0, y: 80, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: i * 0.2, ease }}
              className={`block ${x.c}`}
            >
              {x.w}
              {i === 2 && <span className="text-lime">.</span>}
            </motion.span>
          ))}
        </h2>
        <Reveal delay={0.5}>
          <p className="mt-10 text-xl font-medium text-navy-muted md:text-2xl">Three ideas. One powerful journey.</p>
        </Reveal>
        <div className="relative mt-24 grid gap-14 text-left md:grid-cols-3 md:gap-10">
          <div className="absolute left-0 right-0 top-[2.25rem] hidden h-px bg-navy-foreground/15 md:block" />
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.15} className="relative">
              <div className="flex items-center gap-4">
                <span className="relative z-10 grid size-[4.5rem] place-items-center rounded-full border border-navy-foreground/20 bg-navy text-xl font-extrabold text-primary">{pad(i + 1)}</span>
              </div>
              <h3 className="mt-8 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{p.title}</h3>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-navy-muted">{p.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 06 COMMUNITY IMAGE ---------------- */
function CommunityBand() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden text-navy-foreground md:min-h-[680px]">
      <motion.img
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease }}
        src={communityImg}
        width={1920}
        height={1088}
        loading="lazy"
        alt="Diverse Australian professionals and mentors in an authentic group discussion at sunset"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-navy/70" />
      <div className="relative mx-auto max-w-5xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="display text-[2.5rem] sm:text-6xl lg:text-[5.5rem]">
            Growth becomes more powerful <span className="text-primary">when shared.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-navy-foreground/80 md:text-xl">
            Connect with people who challenge you, support you and help you think bigger.
          </p>
          <div className="mt-10 flex justify-center">
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 rounded-full bg-surface px-7 py-4 text-sm font-bold uppercase tracking-wider text-navy transition-transform hover:-translate-y-0.5">
              Meet the Community <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 07 HOW IT WORKS ---------------- */
function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <p className="eyebrow text-primary">Your growth journey</p>
          <h2 className="display mt-6 max-w-4xl text-[2.5rem] sm:text-6xl lg:text-7xl">
            Start where you are. <span className="text-primary">Build from there.</span>
          </h2>
        </Reveal>
        <div className="relative mt-20 grid gap-16 md:grid-cols-3 md:gap-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
            className="absolute left-0 right-0 top-12 hidden h-px origin-left bg-navy/20 md:block"
          />
          <div className="absolute bottom-0 left-12 top-0 w-px bg-navy/15 md:hidden" />
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.15} className="relative pl-28 md:pl-0">
              <div className="absolute left-0 top-0 md:relative">
                <span className="relative grid size-24 place-items-center rounded-full bg-navy text-3xl font-extrabold text-navy-foreground">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/20 [animation-duration:3s]" />
                  {pad(i + 1)}
                </span>
              </div>
              <p className="eyebrow mt-2 text-muted-foreground md:mt-10">Step {pad(i + 1)}</p>
              <h3 className="mt-3 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{s.title}</h3>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">{s.copy}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-20"><PrimaryCta /></Reveal>
      </div>
    </section>
  );
}

/* ---------------- 08 WHY US ---------------- */
function WhyUs() {
  return (
    <section id="why-us" className="bg-surface py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-5 md:px-10 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow text-primary">Why Lead Learn & Inspire?</p>
          <h2 className="display mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">
            The right people can change <span className="text-primary">how you think.</span>
          </h2>
          <p className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl">
            Growth doesn't happen in isolation. The environment around you can influence your standards, your confidence and the possibilities you see.
          </p>
        </Reveal>
        <div className="border-t border-border">
          {reasons.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              <div className="group relative flex items-center gap-6 border-b border-border px-4 py-10 transition-colors duration-500 hover:bg-navy hover:text-navy-foreground md:gap-10 md:px-8">
                <span className="text-4xl font-extrabold tracking-tighter text-primary md:text-6xl">{pad(i + 1)}</span>
                <div className="flex-1">
                  <h3 className="text-2xl font-extrabold uppercase tracking-tight md:text-3xl">{r.title}</h3>
                  <p className="mt-2 text-base text-muted-foreground transition-colors group-hover:text-navy-muted md:text-lg">{r.copy}</p>
                </div>
                <ArrowRight className="size-6 shrink-0 transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 09 STATEMENT ---------------- */
function Statement() {
  return (
    <section className="bg-background py-32 md:py-48">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="display text-5xl sm:text-7xl lg:text-[8rem]">
            Don't just build a career.<br /><span className="text-primary">Build yourself.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="mt-16 flex flex-wrap gap-x-10 gap-y-4 text-lg font-bold uppercase tracking-[0.15em] text-muted-foreground md:text-xl">
            {["Leadership", "Entrepreneurship", "Confidence", "Connection", "Opportunity"].map((w) => (
              <li key={w} className="flex items-center gap-3"><span className="size-1.5 rounded-full bg-primary" />{w}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 10 WHO IS IT FOR ---------------- */
function WhoFor() {
  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="display text-[2.5rem] sm:text-6xl lg:text-7xl">
            Built for people <span className="text-primary">ready to grow.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={(i % 2) * 0.1}>
              <article className="group overflow-hidden rounded-[24px] bg-background transition-transform duration-500 hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img src={a.img} alt={a.alt} loading="lazy" className="h-72 w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] md:h-96" />
                </div>
                <div className="flex items-end justify-between gap-6 p-8 md:p-10">
                  <div>
                    <span className="text-sm font-bold text-primary">{pad(i + 1)}</span>
                    <h3 className="mt-2 text-3xl font-extrabold uppercase tracking-tight md:text-4xl">{a.title}</h3>
                    <p className="mt-3 max-w-md text-lg text-muted-foreground">{a.copy}</p>
                  </div>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-navy/20 transition-all duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 11 NETWORKING ---------------- */
function Networking() {
  return (
    <section className="relative overflow-hidden bg-secondary py-24 md:py-36">
      <img src={communityImg} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-[0.07] grayscale" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="display text-[2.25rem] text-muted-foreground sm:text-5xl lg:text-6xl">Networking isn't about collecting contacts.</h2>
          <p className="display mt-4 text-[2.5rem] sm:text-6xl lg:text-[5.5rem]">
            It's about <span className="text-primary">creating connections.</span>
          </p>
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            The strongest communities aren't built through transactions. They're built through shared conversations, shared values and shared growth.
          </p>
        </Reveal>
        <div className="relative mt-20 flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="absolute left-0 right-0 top-1/2 hidden h-px origin-left bg-navy/25 md:block"
          />
          {["Connection", "Conversation", "Growth"].map((w, i) => (
            <Reveal key={w} delay={i * 0.2} className="relative">
              <span className={`inline-block rounded-full border px-8 py-4 text-xl font-extrabold uppercase tracking-tight md:text-3xl ${i === 2 ? "border-navy bg-navy text-navy-foreground" : "border-navy/20 bg-surface"}`}>
                {w}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 12 PERSONAL GROWTH ---------------- */
function PersonalGrowth() {
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground md:py-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(var(--navy-foreground)_1px,transparent_1px),linear-gradient(90deg,var(--navy-foreground)_1px,transparent_1px)] [background-size:80px_80px]" />
      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="display text-[2.5rem] sm:text-6xl lg:text-[5.5rem]">
            Success isn't only about what you achieve.<br />It's about <span className="text-primary">who you become.</span>
          </h2>
        </Reveal>
        <div className="mt-20 grid gap-px overflow-hidden rounded-[24px] bg-navy-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
          {["Resilient", "Disciplined", "Accountable", "Courageous"].map((w, i) => (
            <Reveal key={w} delay={i * 0.1} className="bg-navy p-8 md:p-10">
              <p className="text-sm font-semibold text-navy-muted">More</p>
              <p className="mt-2 text-3xl font-extrabold uppercase tracking-tight">{w}.</p>
              {i === 3 && <span className="mt-6 block h-1 w-8 rounded-full bg-lime" />}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 13 STORIES ---------------- */
function SampleLabel({ children = "Sample Member Story" }: { children?: ReactNode }) {
  return <span className="eyebrow inline-block rounded-full bg-secondary px-3 py-1.5 text-[0.65rem] text-primary">{children}</span>;
}

function Stories() {
  const feat = stories[0]!;
  const rest = stories.slice(1);
  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <h2 className="display text-[2.5rem] sm:text-6xl lg:text-7xl">
            Real people. <span className="text-primary">Real growth.</span>
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Reveal>
            <figure className="flex h-full flex-col justify-between rounded-[24px] bg-navy p-10 text-navy-foreground md:p-14">
              <SampleLabel />
              <blockquote className="mt-10 text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                <span className="text-primary">“</span>{feat.quote}<span className="text-primary">”</span>
              </blockquote>
              <figcaption className="mt-12 flex items-center gap-4">
                <span className="size-14 rounded-full bg-navy-foreground/15" aria-hidden />
                <span>
                  <span className="block font-bold">{feat.name}</span>
                  <span className="block text-sm text-navy-muted">{feat.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <div className="grid gap-6">
            {rest.map((s, i) => (
              <Reveal key={i} delay={0.1 + i * 0.1}>
                <figure className="h-full rounded-[24px] border border-border bg-surface p-8 md:p-10">
                  <SampleLabel />
                  <blockquote className="mt-6 text-2xl font-bold tracking-tight">“{s.quote}”</blockquote>
                  <figcaption className="mt-8">
                    <span className="block font-bold">{s.name}</span>
                    <span className="block text-sm text-muted-foreground">{s.role}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 14 MENTORS ---------------- */
function Mentors() {
  return (
    <section className="bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h2 className="display max-w-4xl text-[2.5rem] sm:text-6xl lg:text-7xl">
              Learn from people who've <span className="text-primary">walked the path.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground md:text-xl">
              Surround yourself with people who have experience, perspective and a genuine desire to help others grow.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-wider">
              Meet the Team <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {mentors.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.1}>
              <article className="group transition-transform duration-500 hover:-translate-y-1.5">
                <div className="relative overflow-hidden rounded-[22px]">
                  <img src={m.img} width={896} height={1120} loading="lazy" alt={`Sample mentor profile portrait — ${m.role}`} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-4 top-4"><SampleLabel>Sample Profile</SampleLabel></span>
                </div>
                <span className="mt-6 block h-0.5 w-0 bg-primary transition-all duration-500 group-hover:w-16" />
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold tracking-tight">{m.name}</h3>
                    <p className="mt-1 text-sm font-bold uppercase tracking-wider text-primary">{m.role}</p>
                  </div>
                  <ArrowRight className="mt-1 size-6 transition-transform group-hover:translate-x-1" />
                </div>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{m.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-14 text-xs text-muted-foreground">
          Team profiles shown above are presentation placeholders and will be replaced with official Lead Learn & Inspire team information.
        </p>
      </div>
    </section>
  );
}

/* ---------------- 15 OUTCOMES ---------------- */
function Outcomes() {
  return (
    <section className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {outcomes.map((o, i) => (
          <Reveal key={o.word}>
            <div className="group grid items-end gap-4 border-b border-border py-8 md:grid-cols-[1fr_320px] md:py-10">
              <h3 className={`display text-5xl transition-colors duration-500 sm:text-7xl lg:text-[7.5rem] ${i % 2 ? "text-primary" : ""}`}>{o.word}</h3>
              <p className="text-lg text-muted-foreground md:pb-4">{o.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 16 FAQ ---------------- */
function Faq() {
  return (
    <section id="faq" className="bg-surface py-24 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="display text-[2.5rem] sm:text-6xl lg:text-7xl">
            Questions?<br /><span className="text-primary">Let's make it simple.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="border-t border-border">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="border-border">
                <AccordionTrigger className="py-7 text-left text-xl font-bold tracking-tight hover:no-underline md:text-2xl">{f.q}</AccordionTrigger>
                <AccordionContent className="pb-7 text-lg leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 17 FINAL CTA + FOOTER ---------------- */
function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-navy-foreground md:py-40">
      <img src={heroImg} alt="" aria-hidden loading="lazy" className="absolute inset-0 size-full object-cover opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/60" />
      <div className="relative mx-auto max-w-[1400px] px-5 text-center md:px-10">
        <Reveal>
          <h2 className="display text-[2.75rem] sm:text-7xl lg:text-[7rem]">
            Your next chapter starts with <span className="text-primary">one step.</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg text-navy-muted md:text-xl">
            Connect with people. Build your skills. Develop your leadership. Create new possibilities.
          </p>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <PrimaryCta className="py-5 text-base" />
            <GhostCta href="#about">Learn More</GhostCta>
          </div>
          <p className="eyebrow mt-14 text-navy-muted">
            Lead <span className="text-lime">•</span> Learn <span className="text-lime">•</span> Inspire
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-navy-foreground/10 bg-navy pb-28 pt-20 text-navy-foreground md:pb-12">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[2fr_1fr_1fr] md:px-10">
        <div>
          <p className="text-lg font-extrabold uppercase tracking-[0.18em]">Lead Learn <span className="text-primary">&</span> Inspire</p>
          <p className="mt-4 max-w-sm text-navy-muted">Helping people learn, lead, grow and create new possibilities.</p>
        </div>
        <div>
          <p className="eyebrow text-navy-muted">Navigate</p>
          <ul className="mt-5 space-y-3">
            {[...navLinks, { label: "FAQ", href: "#faq" }].map((l) => (
              <li key={l.href}><a href={l.href} className="font-semibold hover:text-primary">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-navy-muted">Community</p>
          <ul className="mt-5 space-y-3">
            <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary">Learn Lead Inspire</a></li>
            <li><a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="font-semibold hover:text-primary">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-[1400px] flex-col justify-between gap-4 border-t border-navy-foreground/10 px-5 pt-8 text-sm text-navy-muted md:flex-row md:px-10">
        <p>© Lead Learn & Inspire</p>
        <div className="flex gap-6"><a href="#" className="hover:text-navy-foreground">Privacy Policy</a><a href="#" className="hover:text-navy-foreground">Terms & Conditions</a></div>
      </div>
    </footer>
  );
}

function MobileStickyCta() {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
      <PrimaryCta className="w-full shadow-float" />
    </div>
  );
}

export function Landing() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Intro />
        <WhatWeDo />
        <Pillars />
        <CommunityBand />
        <HowItWorks />
        <WhyUs />
        <Statement />
        <WhoFor />
        <Networking />
        <PersonalGrowth />
        <Stories />
        <Mentors />
        <Outcomes />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <MobileStickyCta />
    </MotionConfig>
  );
}
