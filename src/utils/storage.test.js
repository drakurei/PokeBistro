import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readJSON, writeJSON, removeItem } from './storage'

// A minimal localStorage double, installed on the global `window` the module reads from
function fakeStorage(store = new Map()) {
  return {
    getItem: (key) => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: (key) => store.delete(key),
    store,
  }
}

describe('storage', () => {
  let storage

  beforeEach(() => {
    storage = fakeStorage()
    vi.stubGlobal('window', { localStorage: storage })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('round-trips a value under the app prefix', () => {
    writeJSON('cart', { items: [{ id: 1, quantity: 2 }] })
    expect(storage.store.has('pokebistro:cart')).toBe(true)
    expect(readJSON('cart', (value) => Array.isArray(value.items))).toEqual({
      items: [{ id: 1, quantity: 2 }],
    })
  })

  it('returns null for missing, invalid JSON or rejected values', () => {
    expect(readJSON('cart', () => true)).toBeNull()
    storage.setItem('pokebistro:cart', '{not json')
    expect(readJSON('cart', () => true)).toBeNull()
    storage.setItem('pokebistro:cart', JSON.stringify({ items: 'nope' }))
    expect(readJSON('cart', (value) => Array.isArray(value.items))).toBeNull()
  })

  it('ignores oversized payloads', () => {
    writeJSON('big', 'x'.repeat(40 * 1024))
    expect(storage.store.has('pokebistro:big')).toBe(false)
    storage.setItem('pokebistro:big', JSON.stringify('y'.repeat(40 * 1024)))
    expect(readJSON('big', () => true)).toBeNull()
  })

  it('never throws when storage is unavailable', () => {
    vi.stubGlobal('window', {
      get localStorage() {
        throw new Error('blocked')
      },
    })
    expect(() => writeJSON('cart', {})).not.toThrow()
    expect(readJSON('cart', () => true)).toBeNull()
    expect(() => removeItem('cart')).not.toThrow()
  })
})
