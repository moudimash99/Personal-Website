// Generate CV tracking codes offline — no server call, nothing registered.
// Usage: node scripts/cv-code.mjs [count] [prefix]      e.g. node scripts/cv-code.mjs 3 airbus
// Any code that gets opened is tracked; register it later (dashboard or POST /api/links) to attach who it was for.
import crypto from 'crypto'

const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789'
const [count = '1', prefix] = process.argv.slice(2)
const site = process.env.SITE_URL || 'https://<your-domain>'

for (let i = 0; i < Number(count); i++) {
  const rand = Array.from(crypto.randomBytes(6), (b) => ALPHABET[b % ALPHABET.length]).join('')
  const code = prefix ? `${prefix.toLowerCase()}-${rand}` : rand
  console.log(`${site}/r/${code}`)
}
