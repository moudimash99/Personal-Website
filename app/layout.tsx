import type { Metadata } from 'next'
import './globals.css'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { profile } from '@/data/profile'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-spacegrotesk' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.headline}`,
  description: 'Systems engineering, cloud, and real-time data portfolio for aerospace and mission-critical platforms.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, space.variable, jetbrains.variable].join(' ')}>
      <body className="min-h-screen bg-base text-foreground antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10">
          {/* <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-0 bg-radial" /> */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[70rem] h-[35rem] bg-aurora animate-aurora rounded-full" />
        </div>
        <div className="grain" />
        {children}
      </body>
    </html>
  )
}