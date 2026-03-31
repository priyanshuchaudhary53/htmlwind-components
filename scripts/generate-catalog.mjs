import { readdirSync, writeFileSync, statSync } from 'fs'
import { join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')

// Directories to skip — not component categories
const SKIP = new Set(['_dev', 'src', 'scripts', 'node_modules', 'dist', '.git', '.github'])

const catalog = {}

for (const entry of readdirSync(ROOT)) {
  if (SKIP.has(entry) || entry.startsWith('.')) continue
  const fullPath = join(ROOT, entry)
  if (!statSync(fullPath).isDirectory()) continue
  const files = readdirSync(fullPath).filter(f => f.endsWith('.html')).sort()
  if (files.length > 0) catalog[entry] = files
}

const outPath = join(ROOT, 'catalog.json')
writeFileSync(outPath, JSON.stringify(catalog, null, 2) + '\n')

const total = Object.values(catalog).flat().length
const cats  = Object.keys(catalog).length
console.log(`catalog.json written — ${total} components across ${cats} categories.`)
