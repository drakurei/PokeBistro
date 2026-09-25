// Performance budget: gzip size of what a visitor downloads, checked after every build (CI too).
// Budgets live in package.json under "budget": { name, files (glob, one folder deep), limit in bytes }.
// Zero dependency on purpose: it must behave the same on Windows, macOS and the CI runner.

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { gzipSync } from 'node:zlib'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const budgets = pkg.budget ?? []

function matches(pattern, name) {
  const regex = new RegExp(`^${pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`)
  return regex.test(name)
}

function expand(glob) {
  const dir = dirname(glob)
  const pattern = basename(glob)
  try {
    return readdirSync(dir)
      .filter((name) => matches(pattern, name) && statSync(join(dir, name)).isFile())
      .map((name) => join(dir, name))
  } catch {
    return []
  }
}

const format = (bytes) => `${(bytes / 1024).toFixed(1)} kB`
let failed = false

for (const budget of budgets) {
  const files = [budget.files]
    .flat()
    .flatMap(expand)
    .filter((file) => !(budget.exclude ?? []).some((fragment) => file.includes(fragment)))
  if (files.length === 0) {
    console.error(`✗ ${budget.name}: no file matches ${budget.files}`)
    failed = true
    continue
  }
  const size = files.reduce((sum, file) => sum + gzipSync(readFileSync(file), { level: 9 }).length, 0)
  const ok = size <= budget.limit
  if (!ok) failed = true
  console.log(
    `${ok ? '✓' : '✗'} ${budget.name}: ${format(size)} gzip (limit ${format(budget.limit)}, ${files.length} file${files.length > 1 ? 's' : ''})`,
  )
}

if (failed) {
  console.error(
    '\nBudget exceeded: reduce the size or raise the limit in package.json (with a reason in the commit).',
  )
  process.exit(1)
}
