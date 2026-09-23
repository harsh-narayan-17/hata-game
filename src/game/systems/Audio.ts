let ctx: AudioContext | null = null

function getCtx() {
  if (!ctx) {
    ctx = new AudioContext()
  }
  return ctx
}

/** Lightweight procedural SFX — no audio files required. */
export function playSfx(kind: string, muted: boolean) {
  if (muted) return
  try {
    const ac = getCtx()
    if (ac.state === 'suspended') void ac.resume()

    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)

    const now = ac.currentTime
    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.02)

    switch (kind) {
      case 'interact':
      case 'open':
        osc.frequency.setValueAtTime(520, now)
        osc.type = 'sine'
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15)
        osc.start(now)
        osc.stop(now + 0.16)
        break
      case 'close':
        osc.frequency.setValueAtTime(320, now)
        osc.type = 'sine'
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12)
        osc.start(now)
        osc.stop(now + 0.13)
        break
      case 'success':
      case 'unlock':
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.setValueAtTime(660, now + 0.1)
        osc.type = 'triangle'
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35)
        osc.start(now)
        osc.stop(now + 0.36)
        break
      case 'yes':
        osc.frequency.setValueAtTime(523, now)
        osc.frequency.setValueAtTime(659, now + 0.12)
        osc.frequency.setValueAtTime(784, now + 0.24)
        osc.type = 'sine'
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5)
        osc.start(now)
        osc.stop(now + 0.52)
        break
      default:
        osc.frequency.setValueAtTime(400, now)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.11)
    }
  } catch {
    // Autoplay / unsupported — ignore
  }
}
