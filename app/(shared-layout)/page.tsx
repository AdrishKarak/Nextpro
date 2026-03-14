"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/* ── Scroll reveal ─────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        }),
      { threshold: 0.08 }
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const base: React.CSSProperties = {
  opacity: 0,
  transform: "translateY(28px)",
  transition: "opacity 0.6s ease, transform 0.6s ease",
};
const d = (ms: number): React.CSSProperties => ({ ...base, transitionDelay: `${ms}ms` });

/* ── SVGs ──────────────────────────────────────────────────────────────────── */
function QuillSVG() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <circle cx="26" cy="26" r="24" stroke="#f43f5e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <path d="M36 8 C40 14,38 24,26 31 L23 44 L21 43 L24 31 C13 27,11 16,16 10 C21 4,32 2,36 8Z"
        fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M26 31 C26 31,21 23,23 14" stroke="#f43f5e" strokeWidth="0.8" strokeDasharray="2 2" />
      <path d="M22 41 L20 47 L26 44 Z" fill="#f43f5e" />
      <circle cx="20" cy="48" r="1.5" fill="#fb7185" />
      <text x="6" y="16" fontSize="7" fill="#f43f5e" opacity="0.8">✦</text>
      <text x="40" y="42" fontSize="5" fill="#f43f5e" opacity="0.6">✦</text>
    </svg>
  );
}

function BookSVG() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="4" y="36" width="44" height="10" rx="2" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.2" />
      <line x1="8" y1="36" x2="8" y2="46" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="8" y="24" width="36" height="10" rx="2" fill="#fecdd3" stroke="#f43f5e" strokeWidth="1.2" />
      <line x1="12" y1="24" x2="12" y2="34" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="12" y="12" width="28" height="10" rx="2" fill="#fda4af" stroke="#f43f5e" strokeWidth="1.2" />
      <line x1="16" y1="12" x2="16" y2="22" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="19" y1="16" x2="36" y2="16" stroke="#f43f5e" strokeWidth="0.8" opacity="0.5" />
      <line x1="19" y1="19" x2="32" y2="19" stroke="#f43f5e" strokeWidth="0.8" opacity="0.4" />
      <text x="35" y="11" fontSize="7" fill="#f43f5e">✦</text>
    </svg>
  );
}

function PenSVG() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
      <rect x="20" y="8" width="12" height="26" rx="4" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.2" />
      <rect x="20" y="27" width="12" height="7" rx="1" fill="#fda4af" stroke="#f43f5e" strokeWidth="1" />
      <path d="M23 34 L26 43 L29 34Z" fill="#f43f5e" />
      <path d="M30 10 L31 28" stroke="#f43f5e" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      <circle cx="26" cy="9" r="3.5" fill="#fecdd3" stroke="#f43f5e" strokeWidth="1" />
    </svg>
  );
}

function GridSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.04 }}>
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0L0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

function Wave() {
  return (
    <svg viewBox="0 0 1200 50" fill="none" className="w-full">
      <path d="M0 25 C200 50,400 0,600 25 C800 50,1000 0,1200 25"
        stroke="#fda4af" strokeWidth="1.5" fill="none" />
      <path d="M0 33 C200 58,400 8,600 33 C800 58,1000 8,1200 33"
        stroke="#fecdd3" strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ── Data ──────────────────────────────────────────────────────────────────── */
const posts = [
  { tag: "Essay", num: "01", title: "The quiet art of writing nothing important", excerpt: "Why the most mundane observations make the best essays — and what that says about how we understand each other.", author: "Maya Chen", time: "7 min" },
  { tag: "Technology", num: "02", title: "I deleted my algorithm and started reading slower", excerpt: "A month without feeds, recommendations, or infinite scroll. Here's what filled the void.", author: "Rahul Verma", time: "5 min" },
  { tag: "Travel", num: "03", title: "Postcards from a city that no longer exists", excerpt: "Memory, displacement, and the strange grief of returning somewhere that has moved on without you.", author: "Sara Müller", time: "4 min" },
];

const steps = [
  { svg: <BookSVG />, step: "01", title: "Browse stories", desc: "Explore thousands of posts across every topic — from deep dives to daily dispatches.", href: "/blog" },
  { svg: <QuillSVG />, step: "02", title: "Find your voice", desc: "Your perspective is unique. Inkwell gives it a stage, a format, and an audience.", href: "/create" },
  { svg: <PenSVG />, step: "03", title: "Publish instantly", desc: "No gatekeepers. Hit publish and your words are live for the world to read.", href: "/create" },
];

/* ── Page ──────────────────────────────────────────────────────────────────── */
export default function Home() {
  useReveal();

  return (
    <>
      <div className="flex flex-col overflow-x-hidden">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-24 overflow-hidden">
          <GridSVG />
          {/* Glow blobs */}
          <div className="absolute top-1/4 right-[8%] w-80 h-80 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(244,63,94,0.1) 0%, transparent 70%)", animation: "inkFloat 6s ease-in-out infinite" }} />
          <div className="absolute bottom-1/4 left-[5%] w-56 h-56 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(244,63,94,0.07) 0%, transparent 70%)", animation: "inkFloat 8s ease-in-out infinite 2s" }} />

          <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col gap-7">
            {/* Eyebrow */}
            <div data-reveal style={base}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                style={{ border: "1.5px solid #f43f5e", color: "#f43f5e", background: "rgba(244,63,94,0.07)" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f43f5e", display: "inline-block", animation: "inkPulse 2s ease-in-out infinite" }} />
                A space for every story
              </span>
            </div>

            {/* Headline */}
            <h1 data-reveal style={d(80)}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span style={{ display: "block", lineHeight: 0.95 }}>
                Write what{" "}
                <span className="relative inline-block" style={{ color: "#f43f5e" }}>
                  matters
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                    <path d="M2 7 C60 3,130 9,198 5" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                  </svg>
                </span>
              </span>
              <span className="text-muted-foreground font-light italic" style={{ display: "block", lineHeight: 1.1, marginTop: 10 }}>
                to you.
              </span>
            </h1>

            <p data-reveal style={d(160)} className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Inkwell is a home for writers, thinkers, and readers. Post your thoughts, discover new voices, and let your words find their audience.
            </p>

            <div data-reveal style={d(240)} className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 h-12 text-base">
                <Link href="/blog">Start Reading</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-12 text-base">
                <Link href="/create">Write a Post</Link>
              </Button>
            </div>

            {/* Stats */}
            <div data-reveal style={d(320)} className="flex items-center justify-center gap-10 pt-2">
              {[{ v: "4.2k", l: "Writers" }, { v: "18k", l: "Stories" }, { v: "92k", l: "Readers" }].map((s) => (
                <div key={s.l} className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "#f43f5e" }}>{s.v}</div>
                  <div className="text-xs text-muted-foreground tracking-widest uppercase">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            style={{ animation: "inkFloat 2.5s ease-in-out infinite", opacity: 0.4 }}>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
              <rect x="1" y="1" width="14" height="22" rx="7" stroke="currentColor" strokeWidth="1.2" className="text-muted-foreground" />
              <circle cx="8" cy="7" r="2.5" fill="currentColor" className="text-muted-foreground"
                style={{ animation: "scrollDot 1.8s ease-in-out infinite" }} />
            </svg>
          </div>
        </section>

        <Wave />

        {/* ── FEATURED POSTS ────────────────────────────────────────────────── */}
        <section className="px-4 py-20 max-w-6xl mx-auto w-full">
          <div data-reveal style={base} className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "#f43f5e" }}>✦ Featured Stories</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                What people are <span style={{ color: "#f43f5e" }}>reading</span>
              </h2>
            </div>
            <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: "#f43f5e" }}>
              All posts
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <Link key={post.num} href="/blog" data-reveal style={d(i * 90)}
                className="post-card group relative flex flex-col p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                {/* Watermark number */}
                <span className="absolute top-4 right-5 text-5xl font-black select-none pointer-events-none"
                  style={{ lineHeight: 1, color: "#f43f5e", opacity: 0.08 }}>
                  {post.num}
                </span>
                {/* Tag */}
                <span className="self-start px-3 py-1 rounded-full text-xs font-bold mb-4"
                  style={{ background: "rgba(244,63,94,0.12)", color: "#f43f5e" }}>
                  {post.tag}
                </span>
                <h3 className="font-bold text-lg leading-snug mb-3 transition-colors duration-200"
                  style={{ color: "hsl(var(--foreground))" }}>
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: "#f43f5e" }}>
                  <span className="font-medium">{post.author}</span>
                  <span className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
                      <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    {post.time}
                  </span>
                </div>
                {/* Bottom hover bar */}
                <span className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: "#f43f5e" }} />
              </Link>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
        <section className="how-section py-24 px-4 relative overflow-hidden" style={{ background: "#fff1f2" }}>
          {/* rings */}
          <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(244,63,94,0.25)" }} />
          <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full pointer-events-none"
            style={{ border: "1px solid rgba(244,63,94,0.15)" }} />

          <div className="max-w-6xl mx-auto">
            <div data-reveal style={base} className="text-center mb-16">
              <p className="text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "#f43f5e" }}>✦ How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ color: "hsl(var(--foreground))" }}>
                Three steps to your <span style={{ color: "#f43f5e" }}>first story</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 relative">
              <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+36px)] right-[calc(16.67%+36px)] h-px"
                style={{ background: "linear-gradient(90deg,rgba(244,63,94,0.4),rgba(244,63,94,0.15) 50%,rgba(244,63,94,0.4))" }} />

              {steps.map((item, i) => (
                <div key={item.step} data-reveal style={d(i * 110)}
                  className="step-card relative flex flex-col items-center text-center gap-4 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className="p-4 rounded-2xl" style={{ background: "#ffe4e6" }}>
                    {item.svg}
                  </div>
                  <span className="text-xs font-bold tracking-[0.18em] uppercase" style={{ color: "#f43f5e" }}>
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-bold" style={{ color: "hsl(var(--foreground))" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>{item.desc}</p>
                  <Link href={item.href}
                    className="text-sm font-semibold inline-flex items-center gap-1 hover:gap-2 transition-all duration-200"
                    style={{ color: "#f43f5e" }}>
                    Get started →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── QUOTE ─────────────────────────────────────────────────────────── */}
        <section className="py-24 px-4 max-w-4xl mx-auto w-full text-center">
          <div data-reveal style={base}>
            <svg width="56" height="44" viewBox="0 0 56 44" fill="none" className="mx-auto mb-6" style={{ opacity: 0.25 }}>
              <path d="M0 44 L0 26 C0 11,7 4,22 0 L26 7 C17 9,11 15,11 22 L18 22 L18 44 Z" fill="#f43f5e" />
              <path d="M30 44 L30 26 C30 11,37 4,52 0 L56 7 C47 9,41 15,41 22 L48 22 L48 44 Z" fill="#f43f5e" />
            </svg>
            <blockquote className="text-2xl md:text-4xl font-bold leading-tight tracking-tight mb-5"
              style={{ color: "hsl(var(--foreground))" }}>
              "Every person carries a story the world hasn't read yet.{" "}
              <span style={{ color: "#f43f5e" }}>This is where you write it.</span>"
            </blockquote>
            <p className="text-sm tracking-widest uppercase text-muted-foreground">
              — The Inkwell Manifesto
            </p>
          </div>
        </section>

        {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
        <section className="px-4 pb-24 max-w-6xl mx-auto w-full">
          <div data-reveal
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: "linear-gradient(135deg, #f43f5e 0%, #e11d48 100%)" }}>

            {/* Dot texture */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.12 }}>
              <defs>
                <pattern id="dots" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.5" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
            {/* Rings */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full pointer-events-none"
              style={{ border: "1.5px solid rgba(255,255,255,0.2)" }} />
            <div className="absolute -right-4 -top-4 w-52 h-52 rounded-full pointer-events-none"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }} />

            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight" style={{ color: "#ffffff" }}>
                Got something to say?
              </h2>
              <p className="text-base max-w-md leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                No algorithm. No gatekeepers. Just you, your words, and thousands of readers waiting to hear them.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0">
              {/* White solid button */}
              <Link href="/create"
                className="inline-flex items-center justify-center rounded-full px-8 h-12 text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#ffffff", color: "#f43f5e" }}>
                Write a Post
              </Link>
              {/* White outlined button */}
              <Link href="/blog"
                className="inline-flex items-center justify-center rounded-full px-8 h-12 text-sm font-bold transition-all duration-200 hover:bg-white hover:text-rose-500"
                style={{ border: "2px solid #ffffff", color: "#ffffff", background: "transparent" }}>
                Browse Blog
              </Link>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* Post cards */
        .post-card {
          background: #fff1f2;
          border: 1.5px solid #fda4af;
        }
        .post-card:hover {
          background: #ffe4e6;
          border-color: #f43f5e;
          box-shadow: 0 8px 30px rgba(244,63,94,0.12);
        }

        /* Step cards */
        .step-card {
          background: #ffffff;
          border: 1.5px solid #fda4af;
        }
        .step-card:hover {
          background: #fff1f2;
          border-color: #f43f5e;
          box-shadow: 0 8px 30px rgba(244,63,94,0.1);
        }

        /* Dark mode overrides */
        @media (prefers-color-scheme: dark) {
          .post-card {
            background: rgba(244,63,94,0.08);
            border-color: rgba(244,63,94,0.3);
          }
          .post-card:hover {
            background: rgba(244,63,94,0.14);
            border-color: #f43f5e;
            box-shadow: 0 8px 30px rgba(244,63,94,0.15);
          }
          .step-card {
            background: rgba(244,63,94,0.08);
            border-color: rgba(244,63,94,0.25);
          }
          .step-card:hover {
            background: rgba(244,63,94,0.14);
            border-color: #f43f5e;
          }
          /* How-it-works section bg in dark */
          .how-section {
            background: rgba(244,63,94,0.06) !important;
          }
        }

        /* Animations */
        @keyframes inkFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes inkPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }
        @keyframes scrollDot {
          0%   { cy: 7;  opacity: 1; }
          100% { cy: 17; opacity: 0; }
        }
        [data-reveal] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
      `}</style>
    </>
  );
}