import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const PORT = 3000

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'text/javascript',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
}

function serveFile(filePath, res) {
  if (!fs.existsSync(filePath)) {
    res.writeHead(404)
    res.end('Not found: ' + filePath)
    return
  }
  const ext = path.extname(filePath)
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'text/plain' })
  res.end(fs.readFileSync(filePath))
}

http.createServer((req, res) => {
  const url = req.url.split('?')[0]

  // Intercept ALL compiled CSS requests from component files.
  // Component files reference /assets/css/{category}/preview.css —
  // we serve a single compiled file for all of them.
  if (/^\/assets\/css\/.+\/preview\.css$/.test(url)) {
    const cssPath = path.join(__dirname, 'app.css')
    if (!fs.existsSync(cssPath)) {
      res.writeHead(503)
      res.end('/* Run `npm run build` first to compile Tailwind CSS */')
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/css' })
    res.end(fs.readFileSync(cssPath))
    return
  }

  // Serve index (component browser)
  if (url === '/' || url === '/index.html') {
    serveFile(path.join(__dirname, 'index.html'), res)
    return
  }

  // Serve catalog.json from repo root
  if (url === '/catalog.json') {
    serveFile(path.join(ROOT, 'catalog.json'), res)
    return
  }

  // Serve any file from repo root
  serveFile(path.join(ROOT, url), res)

}).listen(PORT, () => {
  console.log(`\n  Htmlwind component preview running at http://localhost:${PORT}\n`)
  console.log(`  Open http://localhost:${PORT} to browse all components.`)
  console.log(`  Or open a single component:`)
  console.log(`  http://localhost:${PORT}/hero-sections/centered.html\n`)
})
