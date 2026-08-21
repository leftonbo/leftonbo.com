export interface WispColor {
  readonly hue: number
  readonly saturation: number
  readonly lightness: number
}

export function createRandomWispColor(random: () => number = Math.random): WispColor {
  const isWarm = random() >= 0.85
  const [minimumHue, maximumHue] = isWarm ? [8, 48] : [178, 245]

  return {
    hue: randomInteger(minimumHue, maximumHue, random),
    saturation: randomInteger(84, 96, random),
    lightness: randomInteger(60, 78, random),
  }
}

function randomInteger(minimum: number, maximum: number, random: () => number): number {
  return Math.round(minimum + random() * (maximum - minimum))
}
