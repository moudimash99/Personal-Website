export type SkunkworksStatus = 'active' | 'prototype' | 'archived'

export type SkunkworksProject = {
  id: string
  title: string
  /** Poster-style banner shown at the top of the card. */
  banner: string
  status: { label: string, tone: SkunkworksStatus }
  stack: string[]
  catalyst: string
  /** Source repositories. Private ones are shown but not linked. */
  repos?: { name: string, label: string, private?: boolean }[]
  architecture: string
}

export const skunkworks: SkunkworksProject[] = [
  {
    id: 'free-motion',
    title: 'Free Motion Career Ops',
    banner: '/images/skunkworks/free-motion.svg',
    status: { label: 'Active Development', tone: 'active' },
    stack: ['Node.js', 'Multi-Agent', 'agy + Claude Sonnet', 'Playwright MCP'],
    repos: [{ name: 'career-ops', label: 'my fork' }],
    catalyst: 'Filling out identical job application forms dozens of times a week by hand is inefficient and error-prone.',
    architecture:
      'Built on a custom fork of career-ops. An orchestrator assigns job leads to isolated AI agent sessions with standardized instructions. The agent parses the posting, synthesizes a tailored CV and cover letter from structured profile context, and completes form submissions via browser automation. If the primary model hits rate limits, a fallback agent seamlessly resumes the session. Claim locks and transaction guards ensure zero duplicate submissions.',
  },
  {
    id: 'cat-feeders',
    title: 'Selective Cat Feeders',
    banner: '/images/skunkworks/cat-feeders.webp',
    status: { label: 'Active Deployment', tone: 'active' },
    stack: ['C++', 'ESP32', 'Load Cells', 'CV Pipeline'],
    repos: [
      { name: 'Weight_Tracker', label: 'ESP32 firmware', private: true },
      { name: 'Cat-Camera', label: 'CV pipeline', private: true },
      { name: 'Cat-Weight', label: 'growth charts' },
    ],
    catalyst: 'Two Maine Coons with different dietary needs—where one kept clearing both bowls before the other could eat.',
    architecture:
      'Precision load cells monitor bowl weight continuously, while an ESP32 microcontroller controls servo-driven food bay doors. A low-latency computer-vision pipeline running on a local Tapo camera feed identifies which cat is approaching and only unlatches the corresponding bowl.',
  },
  {
    id: 'okkazeo-scraper',
    title: 'Okkazeo Market Scraper',
    banner: '/images/skunkworks/okkazeo-scraper.svg',
    status: { label: 'Active Script', tone: 'active' },
    stack: ['Python', 'Selenium', 'SQLite', 'LLM Review'],
    repos: [{ name: 'BoardGameFinder', label: 'deal finder', private: true }],
    catalyst: 'Tracking down rare board game bundles and expansions across second-hand listings without manual daily refreshes.',
    architecture:
      'A daily automated pipeline cross-references BoardGameGeek top lists against second-hand listings on Okkazeo, recording historical pricing into SQLite. Listings are benchmarked against normalized market medians, while complex bundles and custom editions are passed to an LLM evaluator to score deal viability before sending an email digest.',
  },
  {
    id: 'boardxplorer',
    title: 'BoardXplorer',
    banner: '/images/skunkworks/boardxplorer.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Django', 'BGG API', 'Docker'],
    repos: [{ name: 'BoardXplorer', label: 'web app', private: true }],
    catalyst: 'Overcoming decision paralysis when picking the right game for a specific group size and time slot from a large collection.',
    architecture:
      'A Django application that syncs a user’s BoardGameGeek library and ranks titles dynamically. The ranking algorithm balances logarithmic BGG rankings, community consensus on optimal player counts, and session duration constraints. Implements caching and circuit breakers with exponential backoff to respect BGG API rate limits.',
  },
  {
    id: 'unmatched-matchmaker',
    title: 'Unmatched Fair Matchmaker',
    banner: '/images/skunkworks/unmatched-matchmaker.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Flask', 'Win-Rate Data', 'Docker'],
    repos: [
      { name: 'unmatched_matcher', label: 'matchmaker' },
      { name: 'Unmatched-Tournament', label: 'tournament app' },
    ],
    catalyst: 'Picking balanced, competitive matchups from an owned set of Unmatched fighters rather than lopsided counter-picks.',
    architecture:
      'A Flask microservice built on tournament and community match logs. It isolates balanced pairings (40–60% empirical win rates) and weights fighter archetypes against desired playstyles (attrition, melee, ranged, mobility). Allows switching between high-fairness and exploration-focused match suggestions.',
  },
]
