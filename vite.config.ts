import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'
import { defineConfig } from 'vitest/config'

const machineReadableContentTypes: Readonly<Record<string, string>> = {
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
}

const machineReadableDevFiles: Plugin = {
  name: 'machine-readable-dev-files',
  apply: 'serve',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      if (!request.url || !['GET', 'HEAD'].includes(request.method ?? 'GET')) {
        next()
        return
      }

      let fileName: string

      try {
        fileName = decodeURIComponent(new URL(request.url, 'http://localhost').pathname).replace(
          /^\//,
          '',
        )
      } catch {
        next()
        return
      }

      const extension = Object.keys(machineReadableContentTypes).find((key) =>
        fileName.endsWith(key),
      )
      const contentType = extension ? machineReadableContentTypes[extension] : undefined
      if (!contentType) {
        next()
        return
      }

      try {
        const machineReadableModule = await server.ssrLoadModule('/src/machine-readable.ts')
        const files = machineReadableModule.getMachineReadableFiles() as Record<string, string>
        const content = files[fileName]

        if (content === undefined) {
          next()
          return
        }

        response.statusCode = 200
        response.setHeader('Content-Type', contentType)
        response.setHeader('X-Content-Type-Options', 'nosniff')
        response.end(request.method === 'HEAD' ? undefined : content)
      } catch (error) {
        next(error instanceof Error ? error : new Error(String(error)))
      }
    })
  },
}

export default defineConfig({
  plugins: [machineReadableDevFiles, react()],
  test: {
    environment: 'jsdom',
    css: true,
    restoreMocks: true,
    setupFiles: './src/test/setup.ts',
  },
})
