# Rahul Pandey — Portfolio

A production-ready personal portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. All personal content (skills, experience, education, projects, contact info) is extracted from Rahul Pandey's resume and centralized in one file for easy updates.

## Features

- Animated name-reveal loading screen (respects `prefers-reduced-motion`)
- Sticky navbar with scroll-spy active states and an animated mobile menu
- Hero, About, Skills, Professional Journey (timeline), Projects (with a featured project), Education, and Connect/Contact sections
- Fully functional contact form: client + server-side validation, honeypot spam protection, basic rate limiting, loading/success/error states
- Secure server-side email delivery via [Resend](https://resend.com) — no secrets in client code
- Technical SEO: metadata, Open Graph, canonical URL, `robots.txt`, `sitemap.xml`, Schema.org JSON-LD (`Person`, `WebSite`, `ProfilePage`)
- Accessible: semantic HTML, visible focus states, labeled form fields, alt text, reduced-motion support
- Resume download button serving the actual uploaded resume PDF

## Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · Lucide Icons · Resend · Zod

## Project structure

```
src/
├── app/
│   ├── page.tsx            # Homepage — assembles all sections
│   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD
│   ├── globals.css
│   ├── robots.ts           # /robots.txt
│   ├── sitemap.ts          # /sitemap.xml
│   └── api/contact/route.ts  # Server-side email sending
├── components/              # One component per section
└── data/
    └── portfolio-data.ts   # SINGLE SOURCE OF TRUTH for all personal content
public/
└── resume/
    └── Rahul_Pandey_Resume.pdf
```

To update any content on the site (a new job, project, skill, etc.), edit `src/data/portfolio-data.ts` — nothing else needs to change.

## 1. Local setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` (see the email setup section below), then:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 2. Email configuration (contact form)

The contact form uses **Resend** because it's the simplest reliable option for a Next.js API route and has a generous free tier.

1. Create a free account at [resend.com](https://resend.com).
2. Go to **API Keys** and create a new key.
3. Add it to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   CONTACT_TO_EMAIL=rashupandey2003@gmail.com
   CONTACT_FROM_EMAIL="Portfolio <onboarding@resend.dev>"
   ```
   `onboarding@resend.dev` is Resend's shared sandbox sender and works immediately without domain verification — good for getting started. For production, verify your own domain in Resend and send from an address on it (e.g. `contact@yourdomain.com`) for better deliverability.
4. Restart the dev server after changing env vars.

**Never** commit `.env.local` or put the API key in any client-side file — it is only read inside `src/app/api/contact/route.ts`, which runs on the server.

### Testing the contact form

Run `npm run dev`, open the Connect section, and submit the form. Check:
- A real email arrives at `CONTACT_TO_EMAIL`.
- Replying to that email replies to the visitor (the form sets `replyTo`).
- Submitting more than 5 times in 10 minutes from the same IP triggers the rate limit.
- Leaving a required field empty shows an inline error and never calls the API.

> Note on rate limiting: the built-in limiter is in-memory, which is fine for a single-instance/low-traffic deployment. If you deploy to a multi-instance or serverless platform with many concurrent regions, swap it for a shared store like Upstash Redis for accurate limits across instances.

## 3. Production build

```bash
npm run build
npm run start
```

## 4. Deployment (Vercel — recommended for Next.js)

1. Push this project to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. In the project's **Settings → Environment Variables**, add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` (same values as `.env.local`).
4. Deploy. Vercel builds and hosts the site, including the `/api/contact` serverless function.

Any other Node-compatible host (Netlify, Render, a VPS with `next start`) works the same way — just set the same environment variables there.

### Custom domain

1. In your hosting provider, add your domain (e.g. `rahulpandey.dev`) under project/domain settings and follow the DNS instructions shown (usually an `A`/`CNAME` record at your registrar).
2. Once the domain is live, update `siteConfig.url` in `src/data/portfolio-data.ts` to the real domain — this feeds the canonical URL, Open Graph tags, sitemap, and structured data.
3. Redeploy.

## 5. SEO & Google Search Console setup

1. Go to [Google Search Console](https://search.google.com/search-console) and add your domain as a property (domain-level verification via DNS TXT record is easiest, and also covers `www`/non-`www` and http/https variants).
2. Once verified, go to **Sitemaps** and submit:
   ```
   https://yourdomain.com/sitemap.xml
   ```
3. Use **URL Inspection** on your homepage URL and click **Request Indexing**.
4. Check indexing status periodically under **Pages** in the sidebar.
5. Monitor **Performance** for impressions/clicks on searches like "Rahul Pandey", "Rahul Pandey portfolio", etc.

### Realistic ranking strategy (no guarantees)

Search ranking cannot be guaranteed by anyone — Google's algorithm considers hundreds of signals. What reliably *improves the odds* of ranking well for a personal name search:

- Keep this site's `siteConfig.url`, name, and bio consistent with your LinkedIn and GitHub profiles (entity consistency helps search engines and AI systems associate the name with you).
- Link to this portfolio from your LinkedIn "Contact info" / featured section and your GitHub profile README — these act as quality backlinks from established, trusted domains.
- Keep the sitemap valid and resubmit after major content updates.
- Keep Core Web Vitals healthy (see Performance below) — page experience is a ranking factor.
- Update the site with real, current content over time (new projects, roles) rather than leaving it static.
- Avoid keyword stuffing; write naturally, as this project already does.

## 6. Performance

The build already uses:
- `next/font` for self-hosted, layout-shift-free fonts
- `next/image` formats (AVIF/WebP) configured in `next.config.mjs`
- Static generation for the homepage, `sitemap.xml`, and `robots.txt`
- Minimal client JavaScript — most sections are server components; only interactive pieces (`Navbar`, `LoadingScreen`, `ContactForm`, motion wrappers) are client components

Run `npx next build` and check the route size output, or run Lighthouse in Chrome DevTools against the production build (`npm run build && npm run start`) for Core Web Vitals numbers.

## 7. Accessibility checklist

- All interactive elements have visible focus rings (see `globals.css`)
- Form fields have associated `<label>`s and `aria-describedby` error messages
- `prefers-reduced-motion` disables/shortens all animation
- Semantic landmarks (`header`, `main`, `nav`, `footer`) and heading hierarchy (`h1` → `h2` → `h3`)
- "Skip to content" link for keyboard users

## Content policy

All personal content (name, summary, skills, experience, education, projects, contact details) in `src/data/portfolio-data.ts` is taken directly from the provided resume. The only addition not present in the original resume, per explicit authorization, is **PostgreSQL** in the Databases skill category. No projects, job titles, certifications, or links were invented; where the resume didn't provide a GitHub/live-demo link for a project, none is shown.
