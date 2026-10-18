import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'admin-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const pathname = req.url.split('?')[0];
          if (pathname === '/admin' || pathname === '/admin/') {
            req.url = '/admin/index.html' + (req.url.includes('?') ? '?' + req.url.split('?')[1] : '');
          }
          next();
        });
      }
    },
    {
      name: 'page-builder-api',
      configureServer(server) {
        // API for the GrapeJS page builder to read/write page JSON files
        server.middlewares.use((req, res, next) => {
          const urlObj = new URL(req.url, 'http://localhost');

          // GET /api/pages/:slug — read a page's JSON
          if (req.method === 'GET' && urlObj.pathname.startsWith('/api/pages/')) {
            const slug = urlObj.pathname.replace('/api/pages/', '');
            if (!slug || slug.includes('..') || slug.includes('/')) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid slug' }));
              return;
            }
            const filePath = path.join(process.cwd(), 'src', 'data', 'pages', `${slug}.json`);
            try {
              const data = fs.readFileSync(filePath, 'utf-8');
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(data);
            } catch (e) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Page not found' }));
            }
            return;
          }

          // PUT /api/pages/:slug — write a page's JSON
          if (req.method === 'PUT' && urlObj.pathname.startsWith('/api/pages/')) {
            const slug = urlObj.pathname.replace('/api/pages/', '');
            if (!slug || slug.includes('..') || slug.includes('/')) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid slug' }));
              return;
            }
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                // Validate it's valid JSON
                JSON.parse(body);
                const filePath = path.join(process.cwd(), 'src', 'data', 'pages', `${slug}.json`);
                fs.writeFileSync(filePath, body, 'utf-8');
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.end(JSON.stringify({ success: true }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to save: ' + e.message }));
              }
            });
            return;
          }

          // GET /api/pages-list — list all page slugs
          if (req.method === 'GET' && urlObj.pathname === '/api/pages-list') {
            const pagesDir = path.join(process.cwd(), 'src', 'data', 'pages');
            try {
              const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.json'));
              const pages = files.map(f => {
                const data = JSON.parse(fs.readFileSync(path.join(pagesDir, f), 'utf-8'));
                return { slug: data.slug || f.replace('.json', ''), title: data.title || f, published: data.published !== false };
              });
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.end(JSON.stringify(pages));
            } catch (e) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: e.message }));
            }
            return;
          }

          // Handle CORS preflight for PUT
          if (req.method === 'OPTIONS' && urlObj.pathname.startsWith('/api/pages')) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
            res.statusCode = 204;
            res.end();
            return;
          }

          next();
        });
      }
    }
  ],
  base: '/',
  server: {
    port: 3000,
    open: true
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', 'lenis'],
        }
      }
    }
  },
  esbuild: {
    drop: ['console', 'debugger'],
  }
})
