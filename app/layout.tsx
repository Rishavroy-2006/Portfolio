import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: 'Rishav Roy — Computer Science & AI/ML',
  description: 'Portfolio of Rishav Roy, 2nd-year B.Tech CSE student specializing in Artificial Intelligence and Machine Learning at Narula Institute of Technology. Exploring systems, edge servers, and software engineering.',
  keywords: ['Rishav Roy', 'Developer', 'Portfolio', 'AI/ML', 'Computer Science', 'Next.js', 'Kolkata'],
  authors: [{ name: 'Rishav Roy' }],
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <head>
        {/* iOS Safari Zoom-on-Refresh prevention */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
