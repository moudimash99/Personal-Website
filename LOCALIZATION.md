The website renders in French by default. The FR / EN control in the navigation stores the visitor’s choice in the `site_locale` cookie for one year and refreshes the server-rendered page. Missing or invalid preferences use French. Document language and page metadata follow the preference.

English copy remains in the source data and components. French translations live in `data/fr.json`; wrap rendered copy in the `Text` component, or use `useTranslation` for client attributes and `translateForRequest` for server attributes. Keep URLs, IDs and lookup keys in their original form so existing CV links continue to work. Product names and technical identifiers stay as written. The existing downloadable PDF is a separate asset.

Verification:

1. Run `npm run build`.
2. Start the build with `npm start -- -p 3100`.
3. Run `node scripts/check-languages.mjs` to check both languages, invalid preference fallback, existing anchors and CV downloads, and analytics authentication.

CV-link analytics are stored separately on the hosting server in `TRACKING_DIR` (`tracking-data` by default). The `/admin/links` dashboard requires the configured admin key, and `/api/links` accepts it in an Authorization header. Local checkout data does not establish production visit counts. Preserve the production tracking-data volume when deploying.
