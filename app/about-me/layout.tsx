import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me | MACHAKA Mohammad',
  description: 'The human element: fabrication, tennis, FPV, keyboards, and tabletop strategy.',
}

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
