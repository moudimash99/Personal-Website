import type { Metadata } from 'next'
import { getLocale } from '@/lib/locale'

export function generateMetadata(): Metadata {
  const english = getLocale() === 'en'
  return {
    title: `${english ? 'Beyond Work' : 'En dehors du travail'} | MACHAKA Mohammad`,
    description: english ? 'What I do for fun: 3D printing, tennis, FPV drones, keyboards, board games, and my two cats.' : 'Ce que je fais pour le plaisir : impression 3D, tennis, drones FPV, claviers, jeux de société et mes deux chats.',
  }
}

export default function AboutMeLayout({ children }: { children: React.ReactNode }) {
  return children
}
