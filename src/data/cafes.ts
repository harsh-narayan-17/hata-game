import type { CafeContent } from '../types/game'

export const cafes: Record<string, CafeContent> = {
  beanTheory: {
    id: 'bean-theory',
    name: 'Bean Theory',
    // tagline: 'Where every cup has a hypothesis.',
    menu: [
      { name: 'Coffee'},
      { name: 'Hot Chocolate'},
      { name: 'Cinamon Croissant Thingy'},
      { name: 'French Toast'},
    ],
  },
  brownRituals: {
    id: 'brown-rituals',
    name: 'Brown Rituals',
    // tagline: 'Another café?',
    menu: [
      { name: 'Affogato', },
      { name: 'Matcha', },
      { name: 'Sindhi Twist', },
      { name: 'Sandwich', },
    ],
  },
}
