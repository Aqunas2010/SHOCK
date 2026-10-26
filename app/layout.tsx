import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReadingProgress } from "@/components/learning/ReadingProgress";

export const metadata: Metadata = {
  title: "SHOCK — Clinical Learning & Emergency Management",
  description:
    "An advanced, peer-reviewed medical education platform covering circulatory shock mechanisms, classification, cellular pathophysiology, bedside assessment, and structured ABCDE emergency resuscitation.",
  keywords: [
    "circulatory shock",
    "shock physiology",
    "hypovolemic shock",
    "cardiogenic shock",
    "distributive shock",
    "obstructive shock",
    "sepsis",
    "anaphylaxis",
    "ABCDE resuscitation",
    "emergency medicine education",
  ],
  authors: [{ name: "SHOCK Medical Education" }],
  openGraph: {
    title: "SHOCK — Clinical Learning & Emergency Management",
    description:
      "Interactive medical education platform for understanding shock physiology, classification, recognition, and emergency management.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B1628",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-clinical-bg text-clinical-text antialiased selection:bg-teal-500/20 selection:text-navy-900">
        <ReadingProgress />
        <Header />
        <main className="flex-1 w-full" id="main-content">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
