import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal, siteConfig } from "@/data/portfolio-data";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${personal.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: personal.name, url: siteConfig.url }],
  creator: personal.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: `${personal.name} — Portfolio`,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: personal.name,
        url: siteConfig.url,
        email: `mailto:${personal.email}`,
        jobTitle: personal.role,
        description: personal.summary,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Satna",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Oriental Institute of Science and Technology",
        },
        sameAs: [personal.linkedin, personal.github],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${personal.name} — Portfolio`,
        description: siteConfig.description,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/#profilepage`,
        url: siteConfig.url,
        name: siteConfig.title,
        about: { "@id": `${siteConfig.url}/#person` },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
    ],
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="grain" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-amber focus:text-ink-950 focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
