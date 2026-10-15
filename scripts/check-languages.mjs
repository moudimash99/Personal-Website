import assert from 'node:assert/strict'

// Run against a built, running site: node scripts/check-languages.mjs [base-url]
const base = process.argv[2] || 'http://localhost:3100'
const cases = [
  ['/', 'Concevoir la', 'Architecting'],
  ['/experience', 'Expérience professionnelle', 'Industrial Experience'],
  ['/about-me', 'En dehors du travail', 'Beyond work'],
  ['/skunkworks', 'Mangeoires sélectives pour chats', 'Selective Cat Feeders'],
  ['/contact', 'Me contacter', 'Get in touch'],
  ['/book', 'Réserver un échange.', 'Book a call.'],
  ['/projects/showcase', 'Schémas d’architecture SVG (dernières retouches)', 'Architectural SVGs (Final Polish)'],
]

for (const [path, french, english] of cases) {
  for (const locale of ['fr', 'en']) {
    const response = await fetch(new URL(path, base), {
      headers: locale === 'en' ? { cookie: 'site_locale=en' } : {},
    })
    assert.equal(response.status, 200, `${path} (${locale}) status`)
    const html = (await response.text()).replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    assert.ok(html.includes(`<html lang="${locale}"`), `${path} document language`)
    assert.ok(html.includes(locale === 'fr' ? french : english), `${path} translated heading`)
    if (path !== '/projects/showcase') assert.ok(html.includes(`lang="${locale}" aria-label="${locale === 'fr' ? 'Français' : 'English'}" aria-pressed="true"`), `${path} active language button`)
    if (path === '/experience') {
      assert.ok(html.includes('id="murex"'), 'CV role anchor preserved')
      assert.ok(html.includes(locale === 'fr' ? 'Détection de plus de 50 signatures' : 'Detected 50+ previously uncaught'), 'experience details translated')
    }
    if (path === '/skunkworks') {
      assert.ok(html.includes('id="cat-feeders"'), 'project anchor preserved')
      if (locale === 'fr') assert.ok(!/skunkworks/i.test(html.replace(/(id|href|src)="[^"]*"/g, '')), 'no "Skunkworks" on the French page')
      assert.ok(html.includes(locale === 'fr' ? 'Une caméra Tapo surveille le coin repas' : 'A Tapo camera watches the feeding spot'), 'project details translated')
    }
    if (path === '/contact') assert.ok(html.includes('href="/cv.pdf"'), 'CV download preserved')
  }
  console.log(`PASS ${path}: French default and English preference`)
}

const invalid = await fetch(base, { headers: { cookie: 'site_locale=unknown' } })
assert.ok((await invalid.text()).includes('<html lang="fr"'), 'invalid locale defaults to French')
assert.equal((await fetch(new URL('/api/links', base))).status, 401, 'CV analytics still protected')
console.log('PASS invalid locale fallback and protected CV analytics')
