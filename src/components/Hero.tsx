"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download, Mail } from "lucide-react";
import { personal } from "@/data/portfolio-data";

const TERMINAL_LINES = [
  { prompt: "rahul@satna", cmd: "whoami" },
  { output: "Associate System Engineer" },
  { prompt: "rahul@satna", cmd: "cat focus.txt" },
  { output: "databases · networking · UNIX/Linux · SQL" },
  { prompt: "rahul@satna", cmd: "status --current" },
  { output: "ASE in Tata Consultancy Services (TCS)" },
];

export default function Hero() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      {/* subtle background network mesh, purely decorative */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.15]" aria-hidden="true">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
              <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#4FD1C5" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -top-40 right-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-amber/10 blur-[140px]" aria-hidden="true" />

      <div className="mx-auto grid w-full max-w-content grid-cols-1 items-center gap-14 px-6 sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 font-mono text-sm text-teal"
          >
            {personal.location}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-balance font-display text-5xl leading-[1.05] text-ink-100 sm:text-6xl lg:text-7xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.6 }}
            className="mt-5 font-display text-2xl text-ink-200 sm:text-3xl"
          >
            {personal.role}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.6 }}
            className="mt-6 max-w-prose text-lg leading-relaxed text-ink-300"
          >
            {personal.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollTo("projects")}
              className="group rounded-md bg-amber px-6 py-3 text-sm font-medium text-ink-950 transition-transform hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(242,184,75,0.35)]"
            >
              View my projects
            </button>
            <a
              href={personal.resumeFile}
              download
              className="group flex items-center gap-2 rounded-md border border-ink-600 px-6 py-3 text-sm font-medium text-ink-100 transition-colors hover:border-teal hover:text-teal"
            >
              <Download size={16} className="transition-transform group-hover:-translate-y-0.5" />
              Download resume
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="flex items-center gap-2 px-2 py-3 text-sm font-medium text-ink-300 transition-colors hover:text-ink-100"
            >
              <Mail size={16} />
              Connect with me
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl border border-ink-700 bg-ink-900/70 p-5 font-mono text-sm shadow-2xl shadow-black/40 backdrop-blur"
          aria-hidden="true"
        >
          <div className="mb-4 flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-ink-600" />
            <span className="h-3 w-3 rounded-full bg-ink-600" />
            <span className="h-3 w-3 rounded-full bg-ink-600" />
          </div>
          <div className="space-y-2">
            {TERMINAL_LINES.map((line, i) =>
              "cmd" in line ? (
                <p key={i} className="text-ink-200">
                  <span className="text-teal">{line.prompt}</span>
                  <span className="text-ink-400">:~$ </span>
                  {line.cmd}
                </p>
              ) : (
                <p key={i} className="pl-1 text-ink-400">
                  {line.output}
                </p>
              )
            )}
            <p className="text-ink-200">
              <span className="text-teal">rahul@satna</span>
              <span className="text-ink-400">:~$ </span>
              <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-amber" />
            </p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-ink-400 transition-colors hover:text-ink-100 sm:block"
      >
        <ArrowDown size={20} />
      </button>
    </section>
  );
}
