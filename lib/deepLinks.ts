import { missions } from '@/data/missions'
import { skunkworks } from '@/data/skunkworks'
import { aboutTiles } from '@/data/about'
import { sitePages } from '@/data/site'

export const slugify = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48)

/** Anchor of one operation card inside a mission: /experience#<mission>--<operation>. */
export const operationAnchor = (missionId: string, operationName: string) => `${missionId}--${slugify(operationName)}`

export type DeepLink = { href: string; label: string }

/** Every URL on the site that can be linked to directly, in reading order. */
export function deepLinks(): DeepLink[] {
  const links: DeepLink[] = [{ href: '/', label: 'Home' }]
  for (const page of sitePages) {
    links.push({ href: page.href, label: page.label })
    if (page.href === '/experience') {
      for (const m of missions) {
        links.push({ href: `/experience#${m.id}`, label: m.title })
        for (const op of m.operations) links.push({ href: `/experience#${operationAnchor(m.id, op.name)}`, label: `${m.title} › ${op.name}` })
      }
    }
    if (page.href === '/skunkworks') for (const p of skunkworks) links.push({ href: `/skunkworks#${p.id}`, label: `Skunkworks › ${p.title}` })
    if (page.href === '/about-me') for (const t of aboutTiles) links.push({ href: `/about-me#${t.id}`, label: `${page.label} › ${t.title}` })
  }
  return links
}
