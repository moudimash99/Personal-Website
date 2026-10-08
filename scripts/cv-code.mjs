// Generate CV tracking codes offline — no server call, nothing registered.
// Usage: node scripts/cv-code.mjs [count] [prefix]      e.g. node scripts/cv-code.mjs 3 airbus
//        node scripts/cv-code.mjs --json [prefix]       one code, as per-section CV links (data/cv-sections.json)
// Any code that gets opened is tracked; register it later (dashboard or POST /api/links) to attach who it was for.
import crypto from 'crypto'
import { readFileSync } from 'fs'

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'
const site = process.env.SITE_URL || 'https://<your-domain>'
const args = process.argv.slice(2)
const json = args.includes('--json')
const [first, second] = args.filter((a) => a !== '--json')

function newCode(prefix) {
  const rand = Array.from(crypto.randomBytes(6), (b) => ALPHABET[b % ALPHABET.length]).join('')
  return prefix ? `${prefix.toLowerCase()}-${rand}` : rand
}

if (json) {
  const sections = JSON.parse(readFileSync(new URL('../data/cv-sections.json', import.meta.url), 'utf8'))
  const base = `${site}/r/${newCode(first)}`
  const website_links = Object.fromEntries(Object.keys(sections.website_links).map((key) => [key, `${base}/${key.replace(/_/g, '-')}`]))
  console.log(JSON.stringify({ website_links, booking_link: `${base}/book` }, null, 2))
} else {
  const [count = '1', prefix] = [first, second]
  for (let i = 0; i < Number(count); i++) console.log(`${site}/r/${newCode(prefix)}`)
}
