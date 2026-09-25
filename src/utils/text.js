// Lowercase, no accents, trimmed: "Épicé " -> "epice". Used by the search and the URL params.
export function normalize(text) {
  return String(text ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim()
}

// "3 plats" / "1 plat"
export function plural(count, singular, pluralForm = `${singular}s`) {
  return `${count} ${count > 1 ? pluralForm : singular}`
}

// Cuts a sentence at a word boundary, never in the middle of a word: "Riz jaune au visage de…"
export function truncateWords(text, max = 90) {
  const value = String(text ?? '').trim()
  if (value.length <= max) return value
  const cut = value.slice(0, max + 1)
  const end = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf(','), cut.lastIndexOf(':'))
  return `${value.slice(0, end > 40 ? end : max).replace(/[\s,:;]+$/, '')}…`
}
