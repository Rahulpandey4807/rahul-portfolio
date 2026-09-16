"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Network,
  Sparkles,
  Wrench,
  Users,
  type LucideIcon,
} from "lucide-react";
import Reveal from "./Reveal";
import { skillCategories } from "@/data/portfolio-data";

const ICONS: Record<string, LucideIcon> = {
  programming: Code2,
  databases: Database,
  networking: Network,
  "ai-tools": Sparkles,
  tools: Wrench,
  "soft-skills": Users,
};

export default function Skills() {
  return (
    <section id="skills" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
            Skills
          </h2>
          <p className="mt-3 max-w-prose text-ink-300">
            Technical foundations built through coursework, internships, and
            self-directed projects.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => {
            const Icon = ICONS[category.id] ?? Code2;
            return (
              <Reveal key={category.id} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group h-full rounded-xl border border-ink-700 bg-ink-900/50 p-6 transition-colors hover:border-amber/40 hover:bg-ink-900"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-ink-800 p-2.5 text-amber transition-transform group-hover:scale-110">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-3 font-display text-lg text-ink-100">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md bg-ink-800/80 px-2.5 py-1 text-xs text-ink-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
