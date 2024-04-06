import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { matchers as emotionMatchers } from '@emotion/jest'
import { afterEach, expect } from 'vitest'
import { matchMedia, cleanup as cleanupMatchMedia } from 'mock-match-media'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
expect.extend(emotionMatchers)

window.scrollTo = () => {
  // do nothing
}

vi.stubGlobal('matchMedia', matchMedia)
Object.defineProperty(window, 'matchMedia', { value: matchMedia })

afterEach(() => {
  cleanup()
  cleanupMatchMedia()
})

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'))
}

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))
