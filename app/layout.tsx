import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chief of Staff - AI-Powered Executive Assistant',
  description: 'Your AI-powered executive assistant for strategic insights and organizational intelligence',
  keywords: ['AI', 'Chief of Staff', 'Executive Assistant', 'Business Intelligence', 'Strategic Planning'],
  authors: [{ name: 'ZeroEntropy' }],
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#667eea',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-executive-gradient min-h-screen`}>
        <div className="relative min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
} 