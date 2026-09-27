export type SkunkworksStatus = 'active' | 'prototype' | 'archived'

export type SkunkworksProject = {
  id: string
  title: string
  /** Poster-style banner shown at the top of the card. */
  banner: string
  status: { label: string, tone: SkunkworksStatus }
  stack: string[]
  catalyst: string
  architecture: string
}

export const skunkworks: SkunkworksProject[] = [
  {
    id: 'free-motion',
    title: 'Free Motion Career Ops',
    banner: '/images/skunkworks/free-motion.svg',
    status: { label: 'Active Development', tone: 'active' },
    stack: ['Node.js', 'Multi-Agent', 'agy + Claude Sonnet', 'Playwright MCP'],
    catalyst: 'Job hunting is the same application form, filled in by hand, dozens of times a week.',
    architecture:
      'Built on my fork of the open-source career-ops. An orchestrator hands each job to a fresh AI agent session with one self-contained instruction sheet. The agent claims the posting, writes the CV and cover letter from one packed context, and fills in the real form in a browser it drives itself. When the primary agent (agy) runs out of quota, Claude Sonnet takes over the same job mid-night and hands back once agy resets. A claim lock and a recording guard make sure nothing is applied to twice or logged as sent when it was not.',
  },
  {
    id: 'cat-feeders',
    title: 'Selective Cat Feeders',
    banner: '/images/skunkworks/cat-feeders.svg',
    status: { label: 'Active Deployment', tone: 'active' },
    stack: ['C++', 'ESP32', 'Load Cells', 'CV Pipeline'],
    catalyst: 'Preventing pet food theft: one cat finishing both bowls while the other goes hungry.',
    architecture:
      'Load cells track bowl weight in real time, an ESP32 microcontroller drives the feeder, and a tailored computer-vision pipeline fed by a Tapo camera recognizes which cat is at the bowl before it opens.',
  },
  {
    id: 'okkazeo-scraper',
    title: 'Okkazeo Market Scraper',
    banner: '/images/skunkworks/okkazeo-scraper.svg',
    status: { label: 'Active Script', tone: 'active' },
    stack: ['Python', 'Selenium', 'SQLite', 'LLM Review'],
    catalyst: 'Hunting for board game expansion bundles without manually refreshing the marketplace.',
    architecture:
      'A daily pipeline picks games from the BGG charts, scrapes their Okkazeo second-hand listings into a price-history database, and scores each one against the game’s normalised median price. Bundles and special editions, which arithmetic can’t price, go to an LLM for review, and the deals land in a Gmail report.',
  },
  {
    id: 'boardxplorer',
    title: 'BoardXplorer',
    banner: '/images/skunkworks/boardxplorer.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Django', 'BGG API', 'Docker'],
    catalyst: 'Staring at a full shelf with friends over and still not knowing which game fits tonight’s group and time.',
    architecture:
      'A Django app that pulls a BoardGameGeek collection and ranks it for the player count and time on hand. Each game’s quality blends a log-scaled BGG rank with its rating, then gets multiplied by a playability gate built from BGG’s community player-count votes. A cache plus a circuit breaker with escalating cooldowns keeps it within BGG’s rate limits.',
  },
  {
    id: 'unmatched-matchmaker',
    title: 'Unmatched Fair Matchmaker',
    banner: '/images/skunkworks/unmatched-matchmaker.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Flask', 'Win-Rate Data', 'Docker'],
    catalyst: 'Picking an Unmatched matchup from the heroes we own that is both fun to play and not a one-sided stomp.',
    architecture:
      'A Flask app over community win-rate data. The matchup engine pre-computes which fighters are fair against each other (40–60% win rate), scores every pairing on how well both fighters fit the requested play style and range, and blends fit with fairness. Modes shift that balance toward discovery or strict fairness.',
  },
]
