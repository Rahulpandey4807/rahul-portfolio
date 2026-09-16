import Reveal from "./Reveal";
import { personal, education } from "@/data/portfolio-data";

export default function About() {
  const latestDegree = education[0];

  return (
    <section id="about" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
              About
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="max-w-prose space-y-6 text-lg leading-relaxed text-ink-300">
              <p>{personal.summary}</p>
              <p>
                {personal.name} holds a {latestDegree.credential} from{" "}
                {latestDegree.institution} ({latestDegree.duration}), and has
                worked across frontend development and project management
                internships — building responsive interfaces on one side, and
                coordinating teams and features on the other.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["UNIX/Linux", "SQL", "Databases", "Networking", "Java"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-ink-700 px-4 py-1.5 text-sm text-ink-200"
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
