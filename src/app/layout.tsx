import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { FloatingPhoneButton } from "@/components/FloatingPhoneButton";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1e5566",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} | PVC и алуминиева дограма, комарници София`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "дограма",
    "PVC дограма",
    "алуминиева дограма",
    "комарници",
    "стъклопакети",
    "Aluplast",
    "Вива пласт",
    "София",
    "Лотос 98",
  ],
  openGraph: {
    type: "website",
    locale: "bg_BG",
    siteName: SITE.name,
    title: SITE.tagline,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className={`${manrope.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteShell>{children}</SiteShell>
        <FloatingPhoneButton />
      </body>
    </html>
  );
}
