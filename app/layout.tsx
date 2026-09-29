import type { Metadata } from "next";
import localFont from "next/font/local";
import "@fontsource/instrument-sans/400.css";
import "@fontsource/instrument-sans/600.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { creator, creatorProject } from "@/config/creator";

const displayFont = localFont({
  src: "../node_modules/@fontsource/barlow-condensed/files/barlow-condensed-latin-500-normal.woff2",
  weight: "500",
  display: "swap",
  variable: "--font-vanta-display",
  preload: true,
});

export const metadata: Metadata = {
  title: { default: "VANTA MOTORWORKS — Power, with purpose", template: "%s — VANTA MOTORWORKS" },
  description: `${creatorProject.name} — Independent concept website designed and developed by ${creator.name}.`,
  authors: [{ name: creator.name, ...(creator.portfolioUrl ? { url: creator.portfolioUrl } : {}) }],
  creator: creator.name,
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={displayFont.variable}><body><a className="skip-link" href="#main">Skip to content</a><SiteHeader /><main id="main">{children}</main><SiteFooter /></body></html>;
}
