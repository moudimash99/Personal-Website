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
  outsideWork: 'A mix of building things, learning new crafts, and letting curiosity take the lead.',
  explainer: 'When I step away from work, I usually end up at a workbench or across a game table. Here are the hobbies, side obsessions, and two cats that fill the rest of my time.',
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
    tagline: 'Designed on screen, holding it in physical form a few hours later.',
    facts: [
      { label: 'Current workhorse', value: 'Bambu Lab A1' },
      { label: 'Former workhorse', value: 'Longer LK4 Pro 🥴' },
    ],
    lists: [
      {
        label: 'What I print',
        items: [
          'Board game organizers & inserts',
          'Functional home & workshop brackets',
          'Custom drone & camera mounts',
          'Miniature models for May to paint',
          'Bespoke hardware replacement parts',
        ],
      },
    ],
    notes: [
      { label: 'Favorite part', text: 'Taking an idea from CAD measurements to a functional, tangible part on the same afternoon.' },
      { label: 'Next big build', text: 'A fully 3D-printed jet engine cutaway model.' },
    ],
  },
  {
    id: 'tennis',
    image: '/images/about/tennis.svg',
    caption: 'TOEC Purpan',
    title: 'Tennis',
    tagline: 'Footwork, clean timing, and the endless pursuit of repeatable mechanics.',
    facts: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Home court', value: 'TOEC Tennis Purpan' },
      { label: 'Racket', value: 'Head Speed MP' },
    ],
    lists: [
      { label: 'Player inspirations', items: ['Carlos Alcaraz — explosive court coverage', 'Rafael Nadal — relentless topspin & discipline'] },
    ],
    notes: [
      { label: 'Current goal', text: 'Building consistent depth from the baseline and trusting the one-handed backhand under pressure.' },
    ],
    cta: 'Always happy to play a local match.',
  },
  {
    id: 'fpv',
    image: '/images/about/fpv.svg',
    caption: 'the fleet',
    title: 'Micro FPV',
    tagline: 'Sub-250g acrobatics, soldering irons, and flying by video feed.',
    facts: [
      { label: 'The fleet', value: '2× Meteor65 + 1× custom 250 g build' },
    ],
    notes: [
      { label: 'Current challenge', text: 'Smooth proximity lines and committing to vertical building dives.' },
      { label: 'Favorite part', text: 'It’s pure real-time physics and muscle memory—where split-second stick adjustments make or break a line.' },
    ],
  },
  {
    id: 'keyboards',
    image: '/images/about/keyboards.svg',
    caption: 'Lily58 + Sofle',
    title: 'Mechanical Keyboards',
    tagline: 'Split ergo boards, custom ZMK layers, and clean soldering.',
    facts: [
      { label: 'The rotation', value: 'Lily58 + custom Sofle' },
      { label: 'Firmware', value: 'ZMK' },
      { label: 'Build style', value: 'DIY, wireless, programmable' },
    ],
    lists: [
      { label: 'Switches', items: ['Holy Pandas', 'Cherry MX Browns', 'Cherry MX Reds', 'Cherry MX Blues'] },
    ],
    notes: [
      { label: 'Why split keyboards', text: 'Better wrist posture and thumb clusters that put Enter, Backspace, and layers where fingers naturally rest.' },
    ],
  },
  {
    id: 'tabletop',
    image: '/images/about/tabletop.svg',
    caption: 'game night',
    title: 'Tabletop Games',
    tagline: 'Heavy strategy, asymmetric factions, and tight economic engines.',
    facts: [
      { label: 'Current obsession', value: 'Galactic Cruise' },
    ],
    lists: [
      { label: 'All-time favorites', items: ['War of the Ring', 'Spirit Island', 'Ark Nova', 'Root', 'Pandemic Legacy: Season 1'] },
    ],
    notes: [
      { label: 'Favorite part', text: 'Designing multi-turn engine builds and having to adapt on the fly when the board state shifts.' },
    ],
    cta: 'Always happy to talk board games.',
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
      { label: 'Official job titles', items: ['Desk Supervisors', 'Cable Quality Inspectors', 'Hardware Stress Testers'] },
    ],
    notes: [
      { label: 'Engineering impact', text: 'The direct inspiration behind custom selective RFID/CV feeders and pet-proofing 3D prints.' },
    ],
  },
]
