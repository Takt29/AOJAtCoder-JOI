import jestDomMatchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { matchers as emotionMatchers } from '@emotion/jest'
import { afterEach, expect } from 'vitest'

expect.extend(jestDomMatchers)
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
expect.extend(emotionMatchers)

afterEach(() => {
  cleanup()
})

if (typeof window.matchMedia !== 'function') {
  Object.defineProperty(window, 'matchMedia', {
    enumerable: true,
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // Deprecated
      removeListener: vi.fn(), // Deprecated
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))