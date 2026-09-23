import type { CafeContent } from '../types/game'

export const cafes: Record<string, CafeContent> = {
  beanTheory: {
    id: 'bean-theory',
    name: 'Bean Theory',
    tagline: 'Where every cup has a hypothesis.',
    menu: [
      { name: 'Coffee', note: 'Hot, reliable, always right.' },
      { name: 'Matcha', note: 'Your favourite green.' },
      { name: 'Cinamon Croissant Thingy', note: 'Flaky and slightly dangerous.' },
      { name: 'French Toast', note: 'Because coffee needs company.' },
    ],
  },
  brownRituals: {
    id: 'brown-rituals',
    name: 'Brown Rituals',
    tagline: 'Another café?',
    menu: [
      { name: 'Espresso', note: 'Short. Strong. Honest.' },
      { name: 'Hot Chocolate', note: 'Patience in a glass.' },
      { name: 'Croissant', note: 'Worth the crumbs.' },
      { name: 'Tiramisu', note: 'Layered, like a good story.' },
    ],
  },
}
