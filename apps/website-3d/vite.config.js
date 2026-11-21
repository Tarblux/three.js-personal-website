import react from '@vitejs/plugin-react'
import { transformWithEsbuild } from 'vite'
import restart from 'vite-plugin-restart'
import { fileURLToPath } from 'node:url'

const appDirectory = fileURLToPath(new URL('.', import.meta.url))

export default {
    root: appDirectory,
    base: '/3d/',
    appType: 'mpa',
    plugins:
    [
        // Restart server on static/public file change
        restart({ restart: [ 'public/**', ] }),

        // React support
        react(),

        // .js file support as if it was JSX
        {
            name: 'load+transform-js-files-as-jsx',
            async transform(code, id)
            {
                if (!id.match(/src\/.*\.js$/))
                    return null

                return transformWithEsbuild(code, id, {
                    loader: 'jsx',
                    jsx: 'automatic',
                });
            },
        },
    ],
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
        allowedHosts: ['5ac3dbb8ba57.ngrok-free.app']
    },
    build:
    {
        sourcemap: true // Add sourcemap
    },
}
