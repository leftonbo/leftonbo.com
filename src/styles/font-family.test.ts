import { describe, expect, it } from 'vitest'
import tokensCss from './tokens.css?raw'

describe('font family tokens', () => {
  it('uses the shared Noto Sans JP stack for all site text', () => {
    expect(tokensCss).toMatch(
      /--font-sans:\s*'Noto Sans JP Variable',\s*'Noto Sans JP',\s*sans-serif;/,
    )
    expect(tokensCss).toMatch(/--font-display:\s*var\(--font-sans\);/)
    expect(tokensCss).toMatch(/--font-body:\s*var\(--font-sans\);/)
    expect(tokensCss).toMatch(/--font-data:\s*var\(--font-sans\);/)
  })

  it('does not retain the former platform-dependent display or monospace stacks', () => {
    expect(tokensCss).not.toMatch(/Avenir Next|BIZ UDPGothic|ui-monospace|SFMono-Regular/)
    expect(tokensCss).not.toMatch(/Cascadia Code|Roboto Mono|monospace/)
  })
})
