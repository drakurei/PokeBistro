// Prints the CSP hash of the inline script of index.html (the loader flag). Run it after changing
// that script and paste the value into vercel.json and netlify.toml.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'

const html = readFileSync('index.html', 'utf8')
const match = html.match(/<script>([\s\S]*?)<\/script>/)
if (!match) {
  console.error('No inline <script> found in index.html')
  process.exit(1)
}
console.log(createHash('sha256').update(match[1]).digest('base64'))
