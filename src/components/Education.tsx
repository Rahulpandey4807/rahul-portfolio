import Reveal from "./Reveal";
import { education } from "@/data/portfolio-data";

export default function Education() {
  return (
    <section id="education" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <Reveal>
          <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
            Education
          </h2>
        </Reveal>

        <div className="mt-12 space-y-5">
          {education.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06}>
              <div className="flex flex-col justify-between gap-2 border-b border-ink-800 pb-5 sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="font-display text-lg text-ink-100">
                    {item.credential}
                  </h3>
                  <p className="text-ink-300">{item.institution}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-sm text-ink-400">
                    {item.duration}
                  </p>
                  <p className="text-sm text-teal">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
