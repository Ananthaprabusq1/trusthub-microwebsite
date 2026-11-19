import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/providers/motion-provider";
import { inter, roboto } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Stakflo | Trust Hub",
  description: "Enterprise Security & Compliance Trust Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body
        suppressHydrationWarning
        className="flex min-h-screen flex-col bg-white font-sans text-[#111827] antialiased"
      >
        <MotionProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}