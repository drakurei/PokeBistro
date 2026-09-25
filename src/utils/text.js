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
