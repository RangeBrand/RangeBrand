# rangebrand

رنگ‌برند: کد رنگ‌های رسمی برندهایی که در ایران می‌بینیم.

Brand color codes (especially brands seen in Iran) as installable JS modules.

## Install

```bash
npm install rangebrand
```

## Usage

```js
import brands from 'rangebrand/brands'
import amazon from 'rangebrand/brands/amazon'
import colors from 'rangebrand/colors'
import palette24 from 'rangebrand/colors/24'
```

`brands.amazon` is the same object as the `amazon` import. Palettes work the same way (`colors['24']`).

Hex values are stored without a `#` prefix.

```js
amazon.colors
// ['ff9900', 'ffffff', '000000']
```

The package root re-exports both catalogs:

```js
import { brands, colors } from 'rangebrand'
```

## Brand

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Filename of the source record (`amazon.json` → `amazon`) |
| `title` | `string` | Display name, usually Persian |
| `description` | `string` | Short description |
| `long_description` | `string?` | Optional longer description |
| `updated_at` | `string` | Date the record was last updated |
| `colors` | `string[]` | Hex colors without `#` |
| `tags` | `string[]` | e.g. `iran`, `shop`, `online` |

## Palette

| Field | Type | Notes |
| --- | --- | --- |
| `id` | `string` | Filename of the source record (`24.json` → `"24"`) |
| `colors` | `string[]` | Hex colors without `#` |

## License

MIT
