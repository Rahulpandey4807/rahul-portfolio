import Reveal from "./Reveal";
import { projects } from "@/data/portfolio-data";

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-3 max-w-prose text-ink-300">
            Selected work from coursework and independent development.
          </p>
        </Reveal>

        {featured && (
          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-1 gap-8 rounded-2xl border border-amber/20 bg-gradient-to-br from-ink-900 to-ink-800/60 p-8 sm:p-10 lg:grid-cols-[0.55fr_0.45fr] lg:gap-12">
              <div>
                <span className="mb-4 inline-block rounded-full bg-amber/10 px-3 py-1 text-xs font-medium text-amber">
                  Featured project
                </span>
                <h3 className="font-display text-2xl text-ink-100 sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-4 max-w-prose leading-relaxed text-ink-300">
                  {featured.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {featured.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink-300"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap content-start gap-2">
                {featured.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-md border border-ink-600 bg-ink-950/50 px-3 py-1.5 font-mono text-xs text-ink-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {rest.map((project, i) => (
              <Reveal key={project.id} delay={0.1 + i * 0.08}>
                <div className="group h-full rounded-xl border border-ink-700 bg-ink-900/50 p-7 transition-all hover:-translate-y-1 hover:border-teal/40">
                  <h3 className="font-display text-xl text-ink-100">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-300">
                    {project.description}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {project.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2 text-sm leading-relaxed text-ink-400"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-ink-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-md bg-ink-800 px-2.5 py-1 font-mono text-xs text-ink-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
