import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://submanager.app"),
  title: {
    default: "SubManager — Stop Wasting Money on Unused Software Licenses",
    template: "%s | SubManager",
  },
  description:
    "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://submanager.app",
    siteName: "SubManager",
    title: "SubManager — Stop Wasting Money on Unused Software Licenses",
    description:
      "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubManager — Stop Wasting Money on Unused Software Licenses",
    description:
      "SubManager gives office managers, engineering leads, and agency ops teams a single dashboard to track every SaaS seat, catch renewals before they hit, and cancel the tools nobody uses.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
