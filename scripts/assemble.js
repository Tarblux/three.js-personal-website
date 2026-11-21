import { cp, rm } from 'node:fs/promises'

const output = new URL('../dist/', import.meta.url)

await rm(output, { recursive: true, force: true })
await cp(new URL('../apps/website-2d/dist/', import.meta.url), output, { recursive: true })
await cp(new URL('../apps/website-3d/dist/', import.meta.url), new URL('./3d/', output), { recursive: true })
