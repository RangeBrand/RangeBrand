import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')

const brandsDir = join(root, 'data/brands')
const colorsDir = join(root, 'data/colors')

function readJsonRecords(dir, extra) {
  return readdirSync(dir)
    .filter((name) => name.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => {
      const id = name.slice(0, -5)
      const source = JSON.parse(readFileSync(join(dir, name), 'utf8'))
      return { id, record: extra(id, source) }
    })
}

function withHash(color) {
  return color.startsWith('#') ? color : `#${color}`
}

function withHashedColors(record) {
  return {
    ...record,
    colors: record.colors.map(withHash)
  }
}

function write(file, contents) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, contents)
}

function writeModule(base, record) {
  const json = JSON.stringify(record)
  write(`${base}.js`, `export default ${json}\n`)
  write(`${base}.cjs`, `module.exports = ${json}\n`)
}

function writeBrandDts(base) {
  write(
    `${base}.d.ts`,
    `import type { Brand } from '../types.js'\n\ndeclare const brand: Brand\nexport default brand\n`
  )
}

function writePaletteDts(base) {
  write(
    `${base}.d.ts`,
    `import type { Palette } from '../types.js'\n\ndeclare const palette: Palette\nexport default palette\n`
  )
}

function writeEsmCatalog(file, entries, subdir) {
  const imports = entries
    .map((entry, index) => `import i${index} from './${subdir}/${entry.id}.js'`)
    .join('\n')
  const fields = entries
    .map((entry, index) => `  ${JSON.stringify(entry.id)}: i${index}`)
    .join(',\n')
  write(file, `${imports}\n\nexport default {\n${fields}\n}\n`)
}

function writeCjsCatalog(file, entries, subdir) {
  const fields = entries
    .map((entry) => `  ${JSON.stringify(entry.id)}: require('./${subdir}/${entry.id}.cjs')`)
    .join(',\n')
  write(file, `module.exports = {\n${fields}\n}\n`)
}

function writeCatalogDts(file, typeName, typePath, entries) {
  const fields = entries
    .map((entry) => `  readonly ${JSON.stringify(entry.id)}: ${typeName}`)
    .join('\n')
  write(
    file,
    `import type { ${typeName} } from '${typePath}'\n\ndeclare const catalog: {\n${fields}\n}\n\nexport default catalog\n`
  )
}

rmSync(dist, { recursive: true, force: true })
mkdirSync(dist, { recursive: true })

const brands = readJsonRecords(brandsDir, (id, source) => {
  const { path: _path, ...rest } = source
  return withHashedColors({ id, ...rest })
})
const palettes = readJsonRecords(colorsDir, (id, source) => withHashedColors({ id, ...source }))

for (const { id, record } of brands) {
  const base = join(dist, 'brands', id)
  writeModule(base, record)
  writeBrandDts(base)
}

for (const { id, record } of palettes) {
  const base = join(dist, 'colors', id)
  writeModule(base, record)
  writePaletteDts(base)
}

writeEsmCatalog(join(dist, 'brands.js'), brands, 'brands')
writeCjsCatalog(join(dist, 'brands.cjs'), brands, 'brands')
writeCatalogDts(join(dist, 'brands.d.ts'), 'Brand', './types.js', brands)

writeEsmCatalog(join(dist, 'colors.js'), palettes, 'colors')
writeCjsCatalog(join(dist, 'colors.cjs'), palettes, 'colors')
writeCatalogDts(join(dist, 'colors.d.ts'), 'Palette', './types.js', palettes)

write(
  join(dist, 'index.js'),
  `export { default as brands } from './brands.js'\nexport { default as colors } from './colors.js'\n`
)
write(
  join(dist, 'index.cjs'),
  `module.exports = {\n  brands: require('./brands.cjs'),\n  colors: require('./colors.cjs')\n}\n`
)
write(
  join(dist, 'index.d.ts'),
  `export { default as brands } from './brands.js'\nexport { default as colors } from './colors.js'\nexport type { Brand, Palette } from './types.js'\n`
)
write(
  join(dist, 'types.d.ts'),
  `export interface Brand {
  id: string
  title: string
  description: string
  long_description?: string
  updated_at: string
  colors: string[]
  tags: string[]
}

export interface Palette {
  id: string
  colors: string[]
}
`
)

console.log(`built ${brands.length} brands and ${palettes.length} palettes`)
