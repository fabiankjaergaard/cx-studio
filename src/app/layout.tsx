import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kustra - Customer Experience Platform",
  description: "Professionell CX-plattform för att skapa customer journey maps och förbättra kundupplevelser",
  icons: {
    icon: '/favicon.ico',
    apple: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
  themeColor: '#1e293b',
  viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
  openGraph: {
    title: "Kustra - Customer Experience Platform",
    description: "Professionell CX-plattform för att skapa customer journey maps och förbättra kundupplevelser",
    siteName: "Kustra",
    type: "website",
  },
  twitter: {
    title: "Kustra - Customer Experience Platform",
    description: "Professionell CX-plattform för att skapa customer journey maps och förbättra kundupplevelser",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv">
      <body
        className={`${inter.variable} antialiased bg-gray-50`}
      >
        <LanguageProvider>
          <HtmlLangUpdater />
          <AuthProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
