import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import { brands, colors } from 'rangebrand'
import allBrands from 'rangebrand/brands'
import amazon from 'rangebrand/brands/amazon'
import allColors from 'rangebrand/colors'
import palette24 from 'rangebrand/colors/24'

const require = createRequire(import.meta.url)

test('brand deep import matches the catalog entry', () => {
  assert.equal(amazon.id, 'amazon')
  assert.equal(amazon.title, 'آمازون')
  assert.deepEqual(amazon.colors, ['ff9900', 'ffffff', '000000'])
  assert.equal(amazon.path, undefined)
  assert.equal(allBrands.amazon, amazon)
  assert.equal(brands.amazon, amazon)
})

test('palette deep import matches the catalog entry', () => {
  assert.equal(palette24.id, '24')
  assert.deepEqual(palette24.colors, ['fe938c', 'e6b89c', 'ead2ac', '9cafb7', '4281a4'])
  assert.equal(allColors['24'], palette24)
  assert.equal(colors['24'], palette24)
})

test('optional brand fields are preserved', async () => {
  const { default: digikala } = await import('rangebrand/brands/digikala')
  assert.ok(digikala.long_description.includes('دیجی‌کالا'))
})

test('commonjs deep imports work', () => {
  const cjsAmazon = require('rangebrand/brands/amazon')
  const cjsRoot = require('rangebrand')
  assert.equal(cjsAmazon.id, 'amazon')
  assert.equal(cjsRoot.brands.amazon.id, 'amazon')
  assert.equal(cjsRoot.colors['24'].id, '24')
})
