// Fails if any "REPLACE" marker is still in the project.
// Run before you submit:  npm run check
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

const roots = ['src', 'README.md', 'index.html']
const hits = []

function scan(path) {
  const stat = statSync(path)
  if (stat.isDirectory()) return readdirSync(path).forEach((f) => scan(join(path, f)))
  readFileSync(path, 'utf8')
    .split('\n')
    .forEach((line, i) => {
      if (line.includes('REPLACE')) hits.push(`${path}:${i + 1}  ${line.trim()}`)
    })
}

roots.forEach(scan)

if (hits.length) {
  console.log(`\n${hits.length} placeholder(s) left:\n`)
  hits.forEach((h) => console.log('  ' + h))
  console.log('')
  process.exit(1)
}
console.log('No placeholders left. Ready to ship.')
