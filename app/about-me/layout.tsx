import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Beyond Work | MACHAKA Mohammad',
  description: 'What I do for fun: 3D printing, tennis, FPV drones, keyboards, board games, and my two cats.',
}

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
