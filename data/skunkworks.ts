export type SkunkworksStatus = 'active' | 'prototype' | 'archived'

export type SkunkworksProject = {
  id: string
  title: string
  /** Poster-style banner shown at the top of the card. */
  banner: string
  status: { label: string, tone: SkunkworksStatus }
  stack: string[]
  /** The problem that started it. */
  catalyst: string
  /** What the project is for, in a line or two. */
  goal: string
  /** Live sites a visitor can open. */
  sites?: { url: string, label: string }[]
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
    catalyst: 'Applying for jobs means filling in the same form again and again, dozens of times a week. By hand it is slow, and it is easy to make mistakes.',
    goal: 'Have AI agents do the applying: read each posting, write a CV and cover letter that fit it, and send the application.',
    architecture:
      'It is driven by agents from start to finish, and built on my fork of career-ops. A script hands each job to its own AI agent. The agent reads the posting, then puts together a tailored CV and cover letter by choosing from sections of my profile that I wrote in advance, so what it sends matches the job. Then it fills in the real application form in a browser. Several agents can run at once, and if the main model runs out of quota, a second one picks up the same job. Each posting is locked before work starts, so nothing is applied to twice.',
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
    catalyst: 'I have two Maine Coons on different diets, and one of them kept finishing both bowls before the other got to eat.',
    goal: 'Make sure each cat can only eat from its own bowl.',
    architecture:
      'A Tapo camera watches the feeding spot, and a computer-vision model works out which cat is walking up. An ESP32 then opens the door to that cat’s bowl and keeps the other one shut. Load cells under the bowls track the weight of the food the whole time.',
  },
  {
    id: 'okkazeo-scraper',
    title: 'Okkazeo Market Scraper',
    banner: '/images/skunkworks/okkazeo-scraper.svg',
    status: { label: 'Active Script', tone: 'active' },
    stack: ['Python', 'Selenium', 'SQLite', 'LLM Review'],
    repos: [{ name: 'BoardGameFinder', label: 'deal finder', private: true }],
    catalyst: 'Rare board games and good prices both turn up on Okkazeo, a second-hand marketplace, and both go quickly. I was checking the site by hand every day.',
    goal: 'Two things: find the rare games and expansions I am after, and catch good deals. Both without me refreshing the page.',
    architecture:
      'Once a day, a script takes the top games on BoardGameGeek and looks for them in Okkazeo’s second-hand listings, saving every price to a SQLite database. Each listing is compared with what that game usually sells for. Bundles and special editions are harder to price, so those go to an LLM that judges whether they are worth it. The best finds arrive as an email.',
  },
  {
    id: 'boardxplorer',
    title: 'BoardXplorer',
    banner: '/images/skunkworks/boardxplorer.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Django', 'BGG API', 'Docker'],
    sites: [{ url: 'https://boardxplorer.machaka.net', label: 'web app' }],
    repos: [{ name: 'BoardXplorer', label: 'web app', private: true }],
    catalyst: 'With a big collection, choosing a game for the night takes too long. Every evening has a different number of players and a different amount of time.',
    goal: 'Say who is playing and how long we have, and get the best games from the shelf for that night.',
    architecture:
      'A Django app that pulls a collection from BoardGameGeek and ranks it for the evening. The score mixes three things: the game’s BGG rank, how well players say it works at that player count, and whether it fits the time available. BGG limits how often you can call its API, so results are cached, and failed requests are retried with longer and longer waits.',
  },
  {
    id: 'unmatched-matchmaker',
    title: 'Unmatched Fair Matchmaker',
    banner: '/images/skunkworks/unmatched-matchmaker.svg',
    status: { label: 'Self-Hosted', tone: 'active' },
    stack: ['Python', 'Flask', 'Win-Rate Data', 'Docker'],
    sites: [
      { url: 'https://unmatched.machaka.net', label: 'matchmaker' },
      { url: 'https://unmatchedtournament.machaka.net', label: 'tournament app' },
    ],
    repos: [
      { name: 'unmatched_matcher', label: 'matchmaker' },
      { name: 'Unmatched-Tournament', label: 'tournament app' },
    ],
    catalyst: 'In Unmatched, some fighters simply beat others. Picking from my collection without thinking often gave one-sided games.',
    goal: 'Suggest matchups between fighters I own where both players have a real chance of winning.',
    architecture:
      'A small Flask app built on win rates from tournaments and games logged by the community. It keeps the pairings where each fighter wins between 40% and 60% of the time, then weighs them against the style you feel like playing (attrition, melee, ranged, mobility). You can ask for the fairest matchups, or for something less obvious to try.',
  },
]
