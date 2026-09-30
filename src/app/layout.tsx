import type { Metadata } from "next";
import { Inter, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/shell/header";
import { Footer } from "@/components/shell/footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://primer-agente.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "primer-agente | Base de Conocimiento de Agentes de IA",
    template: "%s | primer-agente",
  },
  description:
    "Guías paso a paso, verificables y accesibles para instalar y configurar agentes de IA y sus herramientas base (terminal, Git, Node.js, Python, uv, MCP).",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "primer-agente | Base de Conocimiento de Agentes de IA",
    description:
      "Guías paso a paso, verificables y accesibles para instalar y configurar agentes de IA y sus herramientas base.",
    url: siteUrl,
    siteName: "primer-agente",
    locale: "es_CR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "primer-agente | Base de Conocimiento de Agentes de IA",
    description:
      "Guías paso a paso de instalación y configuración verificables de herramientas y agentes de IA para principiantes.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
        <Header />
        <main
          id="main-content"
          className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
