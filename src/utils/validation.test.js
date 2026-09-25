import { describe, expect, it } from 'vitest'
import {
  clean,
  todayISO,
  validateDate,
  validateEmail,
  validateGuests,
  validateMessage,
  validateName,
  validateSlot,
} from './validation'

describe('validation', () => {
  it('cleans control characters, trims and limits length', () => {
    expect(clean('  Sacha\u0000 Ketchum\n ', 8)).toBe('Sacha Ke')
  })

  it('validates names', () => {
    expect(validateName('S')).not.toBe('')
    expect(validateName('  Sacha ')).toBe('')
  })

  it('validates emails', () => {
    expect(validateEmail('')).not.toBe('')
    expect(validateEmail('sacha@bourg')).not.toBe('')
    expect(validateEmail('sacha@bourg-palette.fr')).toBe('')
  })

  it('validates messages', () => {
    expect(validateMessage('court')).not.toBe('')
    expect(validateMessage('Une table pour quatre, samedi soir.')).toBe('')
  })

  it('validates dates (today or later, within three months)', () => {
    expect(validateDate('')).not.toBe('')
    expect(validateDate('2020-01-01')).not.toBe('')
    expect(validateDate(todayISO())).toBe('')
    expect(validateDate('2999-01-01')).not.toBe('')
  })

  it('validates slots and guests', () => {
    const slots = ['12:00', '20:00']
    expect(validateSlot('', slots)).not.toBe('')
    expect(validateSlot('13:00', slots)).not.toBe('')
    expect(validateSlot('20:00', slots)).toBe('')
    expect(validateGuests('0', 8)).not.toBe('')
    expect(validateGuests('9', 8)).not.toBe('')
    expect(validateGuests('4', 8)).toBe('')
  })
})
