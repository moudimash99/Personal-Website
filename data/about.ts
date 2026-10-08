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
  outsideWork: 'Usually making something, playing something, or spending time with the cats.',
  explainer: 'I like having things to do away from a screen, although some of my hobbies bring me straight back to one. Here’s a little of what I get up to outside work.',
}

export const commonThread = {
  intro: 'I enjoy figuring things out, trying them myself, and making small changes until they feel right.',
  whetherIts: 'That might mean building a keyboard, printing a useful part, learning a board game, or working on a feeder for Simba and Nala.',
  pattern: ['Get curious', 'Give it a try', 'Make a few changes', 'Try again'],
}

export const aboutTiles: AboutTile[] = [
  {
    id: 'fabrication',
    image: '/images/about/fabrication.svg',
    caption: 'fresh off the A1',
    title: '3D Printing & Making',
    tagline: 'Useful little fixes, board game inserts, and the occasional bigger project.',
    facts: [
      { label: 'Current workhorse', value: 'Bambu Lab A1' },
      { label: 'Former workhorse', value: 'Longer LK4 Pro 🥴' },
    ],
    lists: [
      {
        label: 'What I print',
        items: [
          'Board game organizers & inserts',
          'Brackets for the home and workshop',
          'Custom drone & camera mounts',
          'Miniature models for May to paint',
          'Replacement parts that are hard to find',
        ],
      },
    ],
    notes: [
      { label: 'Favorite part', text: 'Drawing a part, printing it, and seeing it fit where it’s supposed to. Especially when it solves a small everyday annoyance.' },
      { label: 'Next big build', text: 'A 3D-printed jet engine cutaway model.' },
    ],
  },
  {
    id: 'tennis',
    image: '/images/about/tennis.svg',
    caption: 'TOEC Purpan',
    title: 'Tennis',
    tagline: 'Still learning, and always happy to get on court.',
    facts: [
      { label: 'Level', value: 'Beginner' },
      { label: 'Home court', value: 'TOEC Tennis Purpan' },
      { label: 'Racket', value: 'Head Speed MP' },
    ],
    lists: [
      { label: 'Player inspirations', items: ['Carlos Alcaraz — explosive court coverage', 'Rafael Nadal — relentless topspin & discipline'] },
    ],
    notes: [
      { label: 'Current goal', text: 'Keeping my shots consistent and getting more comfortable with a two-handed backhand.' },
    ],
    cta: 'Up for a hit if you’re around Toulouse.',
  },
  {
    id: 'fpv',
    image: '/images/about/fpv.svg',
    caption: 'the fleet',
    title: 'Micro FPV',
    tagline: 'Small drones, a view through the goggles, and plenty of tinkering.',
    facts: [
      { label: 'The fleet', value: '2× Meteor65 + 1× custom 250 g build' },
    ],
    notes: [
      { label: 'Current challenge', text: 'Getting smoother when flying close to obstacles and more confident with dives.' },
      { label: 'Favorite part', text: 'The feeling of flying through the goggles, and how much difference a tiny movement of the sticks can make.' },
    ],
  },
  {
    id: 'keyboards',
    image: '/images/about/keyboards.svg',
    caption: 'Lily58 + Sofle',
    title: 'Mechanical Keyboards',
    tagline: 'Building keyboards and making the layout work for me.',
    facts: [
      { label: 'The rotation', value: 'Lily58 + custom Sofle' },
      { label: 'Firmware', value: 'ZMK' },
      { label: 'Build style', value: 'DIY, wireless, programmable' },
    ],
    lists: [
      { label: 'Switches', items: ['Holy Pandas', 'Cherry MX Browns', 'Cherry MX Reds', 'Cherry MX Blues'] },
    ],
    notes: [
      { label: 'Why split keyboards', text: 'I can position each half comfortably and put keys like Enter and Backspace within easy reach of my thumbs. Then comes all the experimenting with layers.' },
    ],
  },
  {
    id: 'tabletop',
    image: '/images/about/tabletop.svg',
    caption: 'game night',
    title: 'Tabletop Games',
    tagline: 'A good game, good company, and a plan that probably won’t survive the next turn.',
    facts: [
      { label: 'Current obsession', value: 'Galactic Cruise' },
    ],
    lists: [
      { label: 'All-time favorites', items: ['War of the Ring', 'Spirit Island', 'Ark Nova', 'Root', 'Pandemic Legacy: Season 1'] },
    ],
    notes: [
      { label: 'Favorite part', text: 'Working out a plan, watching what everyone else is doing, and deciding when to change course. I especially enjoy games that give you plenty to think about.' },
    ],
    cta: 'Always happy to talk board games.',
  },
  {
    id: 'cats',
    image: '/images/about/cats.webp',
    caption: 'Simba & Nala',
    title: 'The Cats',
    tagline: 'Simba and Nala, our Maine Coon siblings.',
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
      { label: 'Projects they inspired', text: 'They’ve given me a reason to work on feeders that recognise each cat, along with a few 3D prints to make things more cat-proof.' },
    ],
  },
]
