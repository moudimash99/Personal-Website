export type AboutTile = {
  id: string
  title: string
  tagline: string
  /** Illustration shown in the tile and at the top of the detail panel. */
  image: string
  /** Handwritten caption under the polaroid in the detail panel. */
  caption: string
  /** Short label/value facts, shown as chips at the top of the panel. */
  facts?: { label: string, value: string }[]
  /** Bulleted lists (favourites, what I print, switches…). */
  lists?: { label: string, items: string[] }[]
  /** Labelled one-liners (favourite part, current goal…). */
  notes?: { label: string, text: string }[]
  /** Closing line, highlighted at the bottom of the panel. */
  cta?: string
  /** Where the closing line links to, if anywhere. */
  ctaHref?: string
}

export const hero = {
  title: 'Beyond work',
  outsideWork: 'The things I love doing, and that bring me joy.',
  explainer: 'When I’m not working or with family, this is where my time goes: a few hobbies I keep coming back to, and two cats.',
}

export const commonThread = {
  intro: 'I love to create. I like understanding how things work, so I can use them to solve problems and make things run better.',
  examples: 'That goes for a drone, a keyboard, a 3D print, a board game, or a feeder for two very demanding cats.',
  pattern: ['Curiosity', 'Tinkering', 'Overengineering', 'Somehow It Works'],
}

export const aboutTiles: AboutTile[] = [
  {
    id: 'fabrication',
    image: '/images/about/fabrication.svg',
    caption: 'fresh off the A1',
    title: '3D Printing',
    tagline: 'An idea on screen, a real part in my hand a few hours later.',
    facts: [
      { label: 'Current printer', value: 'Bambu Lab A1' },
      { label: 'Decommissioned', value: 'Longer LK4 Pro 🥴' },
    ],
    lists: [
      {
        label: 'What I print',
        items: [
          'Board game inserts',
          'Brackets and holders for the house',
          'Drone and camera mounts',
          'Miniatures for May to paint',
          'Replacement parts for broken things',
        ],
      },
    ],
    notes: [
      { label: 'Next big build', text: 'A full 3D-printed jet engine model.' },
    ],
  },
  {
    id: 'tennis',
    image: '/images/about/tennis.svg',
    caption: 'TOEC Purpan',
    title: 'Tennis',
    tagline: 'In pursuit of the elegant game.',
    facts: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Where I train', value: 'TOEC Tennis Purpan' },
      { label: 'Racket', value: 'Head Speed MP' },
    ],
    lists: [
      { label: 'Favorite players', items: ['Carlos Alcaraz: golden retriever energy', 'Rafael Nadal: fierceness and a warrior’s spirit'] },
    ],
    notes: [
      { label: 'Current goal', text: 'Hitting deep from the baseline consistently, and trusting my one-handed backhand under pressure.' },
    ],
    cta: 'Always happy to play a local match.',
    ctaHref: '/book',
  },
  {
    id: 'fpv',
    image: '/images/about/fpv.svg',
    caption: 'the fleet',
    title: 'Micro FPV',
    tagline: 'The closest I get to feeling like a bird.',
    facts: [
      { label: 'The fleet', value: '2× Meteor65 + 1× custom 250 g build' },
    ],
    notes: [
      { label: 'Current challenge', text: 'Committing to vertical building dives.' },
      { label: 'Why I love it', text: 'Goggles on, and for a few minutes it feels like you are the one flying.' },
    ],
  },
  {
    id: 'keyboards',
    image: '/images/about/keyboards.svg',
    caption: 'Lily58 + Sofle',
    title: 'Mechanical Keyboards',
    tagline: 'Split boards I solder and program myself.',
    facts: [
      { label: 'The rotation', value: 'Lily58 + custom Sofle' },
      { label: 'Firmware', value: 'ZMK' },
      { label: 'Build style', value: 'DIY, wireless, programmable' },
    ],
    lists: [
      { label: 'Switches', items: ['Holy Pandas', 'Cherry MX Browns', 'Cherry MX Reds', 'Cherry MX Blues'] },
    ],
    notes: [
      { label: 'Why split keyboards', text: 'My wrists sit straighter, and Enter, Backspace and the layer keys are under my thumbs.' },
    ],
  },
  {
    id: 'tabletop',
    image: '/images/about/tabletop.svg',
    caption: 'game night',
    title: 'Tabletop Games',
    tagline: 'Big games, long evenings, good friends.',
    facts: [
      { label: 'My 2026 game of the year', value: 'Galactic Cruise' },
    ],
    lists: [
      { label: 'All-time favorites', items: ['War of the Ring', 'Spirit Island', 'Ark Nova', 'Root', 'Pandemic Legacy: Season 1'] },
    ],
    notes: [
      { label: 'Favorite part', text: 'The talk around the table: the deals, the bluffing, the arguing over rules.' },
    ],
    cta: 'Always happy to talk board games.',
    ctaHref: '/book',
  },
  {
    id: 'cats',
    image: '/images/about/cats.webp',
    caption: 'Simba & Nala',
    title: 'The Cats',
    tagline: 'Simba & Nala: two Maine Coons with plenty to say.',
    facts: [
      { label: 'Breed', value: 'Maine Coon' },
      { label: 'Born', value: 'August 2025' },
      { label: 'Simba', value: 'Red & white male' },
      { label: 'Nala', value: 'Silver tabby female' },
    ],
    lists: [
      { label: 'Official job titles', items: ['Site Mascots', 'Chief Testing Officers', 'Professional Distractions'] },
    ],
  },
]
