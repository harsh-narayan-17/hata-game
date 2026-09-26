import type { DialogueContent } from '../types/game'

export const dialogue: Record<string, DialogueContent> = {
  viviana: {
    title: 'Viviana Mall',
    lines: [
      'Some places are just places.',
      'But some places become memories.',
      'We met here for the first time.',
    ],
    continueLabel: 'Continue',
    followUp: 'bowling',
  },
  bowlingInvite: {
    title: 'Viviana Bowling',
    lines: ['Would you fancy a bowling game?'],
    continueLabel: 'Yes',
  },
  endingIntro: {
    title: '',
    lines: [
      'So...',
      'You made it.',
      "I've built this because I wanted to ask you something.",
    ],
    continueLabel: 'Continue',
  },
}

export const cinemaContent = {
  title: 'NOW PLAYING',
  movie: 'The Little Prince',
  lines: ['To become spring, means accepting the risk of winter.'],
}

export const concertContent = {
  title: 'LIVE TONIGHT',
  artist: 'Seedhe Maut',
  lines: ['Your favourite artist is performing here hehe.'],
}

export const certificateContent = {
  title: 'CERTIFICATION',
  subtitle: 'CONGRATULATIONS',
  name: 'HAYATI',
  achievement: 'Outstanding Achievement',
  role: 'Real Estate Consultant',
}

export const endingContent = {
  ask: 'Would you like to be my girlfriend?',
  yes: {
    title: 'QUEST COMPLETE',
    lines: ['You said yes.'],
    epilogue: 'THE END\n\n...or maybe just the beginning.',
  },
  no: {
    title: "That's okay.",
    lines: [
      "I'm still really glad you explored this little world.",
      'Thank you for playing.',
    ],
  },
}

export const unlockHint = 'Something is waiting for you...'
