import type { Metadata } from 'next'
import './globals.css'
import { Inter, Space_Grotesk, DM_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const space = Space_Grotesk({ subsets: ['latin'], variable: '--font-spacegrotesk' })
const dmmono = DM_Mono({ weight: ['300','400','500'], subsets: ['latin'], variable: '--font-dmmono' })

export const metadata: Metadata = {
  title: 'Machaka Ground Station',
  description: 'Mission Control portfolio — Debrief → Projects → Contact',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, space.variable, dmmono.variable].join(' ')}>
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