import Reveal from "./Reveal";
import { journey } from "@/data/portfolio-data";
import { GraduationCap, Briefcase, Terminal } from "lucide-react";

const KIND_ICON = {
  education: GraduationCap,
  work: Briefcase,
  training: Terminal,
};

const KIND_LABEL = {
  education: "Education",
  work: "Experience",
  training: "Training",
};

export default function Journey() {
  return (
    <section id="journey" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
            Professional journey
          </h2>
          <p className="mt-3 max-w-prose text-ink-300">
            Education, internships, and training milestones in order.
          </p>
        </Reveal>

        <ol className="relative mt-14 space-y-10 border-l border-ink-700 pl-8 sm:pl-10">
          {journey.map((item, i) => {
            const Icon = KIND_ICON[item.kind];
            return (
              <Reveal key={item.id} delay={i * 0.05}>
                <li className="relative">
                  <span className="absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-ink-600 bg-ink-950 text-teal sm:-left-[49px]">
                    <Icon size={13} />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-wide text-ink-400">
                    {item.date} · {KIND_LABEL[item.kind]}
                  </p>
                  <h3 className="mt-1.5 font-display text-xl text-ink-100">
                    {item.title}
                  </h3>
                  <p className="text-ink-300">{item.org}</p>
                  <p className="mt-2 max-w-prose text-sm leading-relaxed text-ink-400">
                    {item.description}
                  </p>
                </li>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
