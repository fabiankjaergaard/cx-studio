import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";
import { HtmlLangUpdater } from "@/components/layout/HtmlLangUpdater";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kustra - Customer Experience Platform",
  description: "Professional CX platform for creating customer journey maps and improving customer experiences",
  icons: {
    icon: [
      { url: '/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Kustra - Customer Experience Platform",
    description: "Professional CX platform for creating customer journey maps and improving customer experiences",
    siteName: "Kustra",
    type: "website",
  },
  twitter: {
    title: "Kustra - Customer Experience Platform",
    description: "Professional CX platform for creating customer journey maps and improving customer experiences",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-gray-50`}
      >
        <ErrorBoundary>
          <ToastProvider>
            <LanguageProvider>
              <HtmlLangUpdater />
              <AuthProvider>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </AuthProvider>
            </LanguageProvider>
          </ToastProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
