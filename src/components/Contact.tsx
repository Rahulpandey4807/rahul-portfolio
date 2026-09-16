import { Mail, Linkedin, Github, MapPin } from "lucide-react";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { personal } from "@/data/portfolio-data";

export default function Contact() {
  const links = [
    { label: personal.email, href: `mailto:${personal.email}`, icon: Mail },
    {
      label: personal.linkedinLabel,
      href: personal.linkedin,
      icon: Linkedin,
    },
    { label: personal.githubLabel, href: personal.github, icon: Github },
  ];

  return (
    <section id="contact" className="border-t border-ink-800 py-24 sm:py-32">
      <div className="mx-auto max-w-content px-6 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.4fr_0.6fr]">
          <Reveal>
            <h2 className="font-display text-3xl text-ink-100 sm:text-4xl">
              Connect with me
            </h2>
            <p className="mt-3 max-w-prose text-ink-300">
              Have an opportunity, question, or just want to say hello? Reach
              out directly, or use the form.
            </p>

            <div className="mt-8 space-y-4">
              <p className="flex items-center gap-3 text-ink-300">
                <MapPin size={17} className="text-teal" />
                {personal.location}
              </p>
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex items-center gap-3 text-ink-300 transition-colors hover:text-amber"
                >
                  <link.icon size={17} className="text-teal" />
                  <span className="border-b border-transparent group-hover:border-amber">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-xl border border-ink-700 bg-ink-900/40 p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
