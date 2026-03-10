import { Metadata } from "next";
import type { Viewport } from 'next'
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/next';

export const metadata: Metadata = {
  title: 'Yash Burshe',
  description: 'My slice of the internet',
  applicationName: 'Yash Burshe',
  authors: { url: 'https://yashburshe.com', name: 'Yash Burshe' },
  generator: 'Next.js',
  creator: 'Yash Burshe',
  publisher: 'Yash Burshe',
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body className="min-h-dvh">
        <div>
          {children}
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
