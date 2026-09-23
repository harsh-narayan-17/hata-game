import { gameContent } from '../data/events'

interface Props {
  onEnter: () => void
}

export function IntroScreen({ onEnter }: Props) {
  const { intro } = gameContent
  return (
    <div className="intro">
      <div className="intro-glow" aria-hidden />
      <p className="intro-title">{intro.title}</p>
      <p className="intro-made">{intro.madeFor}</p>
      <h1 className="intro-name">{intro.name}</h1>
      <button type="button" className="btn btn--enter" onClick={onEnter}>
        {intro.enter}
      </button>
    </div>
  )
}
