import { fileURLToPath } from 'node:url'
import { createServer, preview } from 'vite'

const directory = (path) => fileURLToPath(new URL(path, import.meta.url))

function redirectTo3D(req, res, next) {
  const [pathname] = req.url.split('?')
  if (pathname !== '/3d') return next()

  res.writeHead(308, { Location: '/3d/' + req.url.slice(pathname.length) })
  res.end()
}

const canonical3D = {
  name: 'canonical-3d-url',
  configureServer(server) {
    server.middlewares.use(redirectTo3D)
  },
  configurePreviewServer(server) {
    server.middlewares.use(redirectTo3D)
  },
}

if (process.argv.includes('--preview')) {
  const server = await preview({
    root: directory('../'),
    configFile: false,
    appType: 'mpa',
    plugins: [canonical3D],
  })
  server.printUrls()
} else {
  const world = await createServer({
    root: directory('../apps/website-3d/'),
    server: { host: '127.0.0.1', port: 5174, strictPort: true, open: false },
  })

  try {
    await world.listen()
    const landing = await createServer({
      root: directory('../apps/website-2d/'),
      plugins: [canonical3D],
      server: {
        port: 5173,
        strictPort: true,
        proxy: { '/3d/': { target: 'http://127.0.0.1:5174', ws: true } },
      },
    })
    await landing.listen()
    landing.printUrls()
  } catch (error) {
    await world.close()
    throw error
  }
}
