export const events = {
  matcha: {
    id: 'matcha',
    title: 'You must be thirsty.',
    body: 'Here.',
    item: 'MATCHA',
    icon: '🍵',
    /** Fire this many ms after visiting the 1st building */
    delayMs: 8000,
    afterVisits: 2,
  },
  tresLeches: {
    id: 'tres-leches',
    title: 'You must be hungry.',
    body: 'Here.',
    item: 'TRES LECHES',
    icon: '🍰',
    /** Fire this many ms after visiting the 3rd building */
    delayMs: 5000,
    afterVisits: 4,
  },
} as const

export const gameContent = {
  playerName: 'Hayati',
  worldTitle: 'A Little World',
  intro: {
    title: 'A LITTLE WORLD',
    madeFor: 'made for',
    name: 'HAYATI',
    enter: 'ENTER',
  },
  controlsHint: {
    move: 'WASD / ARROW KEYS\nto move',
    interact: 'SPACE\nto interact',
  },
  food: {
    drink: 'Matcha',
    dessert: 'Tres Leches',
  },
}
