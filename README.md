<h1 align="left">
monocle-ts for <a href="https://github.com/denoland/deno">Deno 🦕</a>
</h1>

[monocle-ts](https://github.com/gcanti/monocle-ts) is a library for _functional optics in TypeScript_.

Unfortunately monocle-ts is not available for Deno, because:

1. monocle-ts's Gcanti does not want to support Deno (yet)
2. Esm.sh keeps breaking and doesn't support all types (Jul 2022)
3. Skypack fails to support fp-ts (Jul 2022)

This repo is the first working Deno port I am aware of. Feel free to open an issue here if you experience any problems.

[`fp-ts` for Deno is also available](https://github.com/michaelhirn/fp-ts).

# Installation / Usage

> Note: This package is only available for version `monocle-ts@2.3.13` for now

```ts
import * as L from 'https://raw.githubusercontent.com/michaelhirn/monocle-ts/master/lib/Lens.ts'
```

## ToDo

- [ ] setup [deno.land/x](https://deno.land/x) CI/CD
