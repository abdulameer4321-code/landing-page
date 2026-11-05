import type { Metadata, Viewport } from "next";
import "@fontsource-variable/outfit";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { ScrollProgress } from "@/components/core/scroll-progress";
import { RouteProgressBar } from "@/components/navigation/RouteProgressBar";
import { BrandEntrance } from "@/components/motion/BrandEntrance";
import { AppleStyleDock } from "@/components/navigation/AppleStyleDock";
import { AgentXDrawer } from "@/components/agent-x/AgentXDrawer";
import { AgentXFloatingWidget } from "@/components/agent-x/AgentXFloatingWidget";
import { ConsentManager } from "@/components/legal/ConsentManager";
import { SITE } from "@/lib/constants";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#F7F7F2",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.person, url: SITE.linkedin }],
  creator: SITE.person,
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" data-theme="light" suppressHydrationWarning>
      <head>
        {/* Anti-flash script ensures light mode is strictly the default unless explicitly chosen */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('dpdp_matrix_theme');if(s==='dark'){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}else{document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="page-enter">
        <ThemeProvider>
          {/* Brand Reveal Entrance */}
          <BrandEntrance />

          {/* Route Navigation Transition Progress Runner */}
          <RouteProgressBar />

          {/* Scroll Progress Bar at the Top */}
          <ScrollProgress className="top-scroll-progress-bar" />

          {/* Primary Header */}
          <Header />

          {/* Main Website Content */}
          <main id="main-content">{children}</main>

          {/* Bottom Dock */}
          <AppleStyleDock />

          {/* Agent X Floating Display Following User */}
          <AgentXFloatingWidget />

          {/* Agent X Slide-in Chat Drawer */}
          <AgentXDrawer />

          {/* Cookie Preferences Banner */}
          <ConsentManager />

          {/* Footer */}
          <Footer />

          {/* Vercel Web Analytics */}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
