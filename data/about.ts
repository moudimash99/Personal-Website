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
}

export const hero = {
  title: 'Outside of work',
  outsideWork: 'A mix of building things, playing things, and finding new hobbies that somehow turn into engineering projects.',
  explainer: 'This page is the non-professional me: the hobbies, games and two cats that fill the rest of my time. Open any card to see more.',
}

export const commonThread = {
  intro: 'I like taking things apart, understanding how they work, and then making them my own.',
  whetherIts: 'A drone, a keyboard, a 3D print, a board game, or a feeder for two very demanding cats.',
  pattern: ['Curiosity', 'Tinkering', 'Overengineering', 'Somehow It Works'],
}

export const aboutTiles: AboutTile[] = [
  {
    id: 'fabrication',
    image: '/images/about/fabrication.svg',
    caption: 'fresh off the A1',
    title: '3D Printing & Making',
    tagline: 'Designed on a computer, holding it a few hours later.',
    facts: [
      { label: 'Current workhorse', value: 'Bambu Lab A1' },
      { label: 'Former workhorse', value: 'Longer LK4 Pro 🥴' },
    ],
    lists: [
      {
        label: 'What I print',
        items: [
          'Board-game inserts',
          'Useful things for the apartment',
          'Custom parts',
          'Models for May to paint',
          'Things I could probably have just bought',
        ],
      },
    ],
    notes: [
      { label: 'Favorite part', text: 'Designing something on a computer and then holding the physical thing a few hours later.' },
      { label: 'Next big build', text: 'A fully 3D-printed jet engine model.' },
    ],
  },
  {
    id: 'tennis',
    image: '/images/about/tennis.svg',
    caption: 'TOEC Purpan',
    title: 'Tennis',
    tagline: 'Beginner, but taking it seriously enough to overthink everything.',
    facts: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Home court', value: 'TOEC Tennis Purpan' },
      { label: 'Racket', value: 'Head Speed MP' },
    ],
    lists: [
      { label: 'Player inspirations', items: ['Carlos Alcaraz — the energy', 'Rafael Nadal — the hands'] },
    ],
    notes: [
      { label: 'Current goal', text: 'Become significantly less terrible at tennis.' },
    ],
    cta: 'Always happy to play a local match.',
  },
  {
    id: 'fpv',
    image: '/images/about/fpv.svg',
    caption: 'the fleet',
    title: 'Micro FPV',
    tagline: 'Tiny drones, fast feedback, and an excuse to tinker with electronics.',
    facts: [
      { label: 'The fleet', value: '2× Meteor65 + 1× custom 250 g build' },
    ],
    notes: [
      { label: 'Current challenge', text: 'Getting comfortable with building dives.' },
      { label: 'Favorite part', text: 'The line between “that was smooth” and “I just hit a wall” is surprisingly small.' },
    ],
  },
  {
    id: 'keyboards',
    image: '/images/about/keyboards.svg',
    caption: 'Lily58 + Sofle',
    title: 'Mechanical Keyboards',
    tagline: 'Split, wireless, programmable, and endlessly tweakable.',
    facts: [
      { label: 'The rotation', value: 'Lily58 + custom Sofle' },
      { label: 'Firmware', value: 'ZMK' },
      { label: 'Build style', value: 'DIY, wireless, programmable' },
    ],
    lists: [
      { label: 'Switches', items: ['Holy Pandas', 'Cherry MX Browns', 'Cherry MX Reds', 'Cherry MX Blues'] },
    ],
    notes: [
      { label: 'Why split keyboards', text: 'Ergonomics, customization, and apparently normal keyboards weren’t complicated enough.' },
    ],
  },
  {
    id: 'tabletop',
    image: '/images/about/tabletop.svg',
    caption: 'game night',
    title: 'Tabletop Games',
    tagline: 'Heavy strategy, asymmetric games, and anything with too many rules.',
    facts: [
      { label: 'Current obsession', value: 'Galactic Cruise' },
    ],
    lists: [
      { label: 'All-time favorites', items: ['War of the Ring', 'Spirit Island', 'Ark Nova', 'Root', 'Pandemic Legacy: Season 1'] },
    ],
    notes: [
      { label: 'Favorite part', text: 'Spending an entire evening trying to optimize a plan that falls apart two turns later.' },
    ],
    cta: 'Always happy to talk board games.',
  },
  {
    id: 'cats',
    image: '/images/about/cats.svg',
    caption: 'Simba & Nala',
    title: 'The Cats',
    tagline: 'Simba & Nala, two Maine Coons with opinions.',
    facts: [
      { label: 'Breed', value: 'Maine Coon' },
      { label: 'Born', value: 'August 2025' },
      { label: 'Simba', value: 'Orange male' },
      { label: 'Nala', value: 'Black female' },
    ],
    lists: [
      { label: 'Official job titles', items: ['Site Mascots', 'Chief Testing Officers', 'Professional Distractions'] },
    ],
    notes: [
      { label: 'Engineering impact', text: 'Somehow responsible for several of my hardware projects.' },
    ],
  },
]
