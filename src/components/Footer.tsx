import { personal } from "@/data/portfolio-data";

export default function Footer() {
  return (
    <footer className="border-t border-ink-800 py-8">
      <div className="mx-auto flex max-w-content flex-col items-center justify-between gap-3 px-6 text-sm text-ink-400 sm:flex-row sm:px-10">
        <p>
          © {new Date().getFullYear()} {personal.name}
        </p>
        <p>
          Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
