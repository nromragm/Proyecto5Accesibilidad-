const express = require('express');
const app = express();
const port = 3000;

// Rutas principales de la aplicación
const routes = [
  { path: '/', lastmod: '2025-02-16' },
  { path: '/about', lastmod: '2025-02-16' },
  { path: '/products', lastmod: '2025-02-16' },
  { path: '/contact', lastmod: '2025-02-16' }
];

// Generación del sitemap.xml dinámico
app.get('/sitemap.xml', (req, res) => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Agregar todas las rutas al sitemap
  routes.forEach(route => {
    sitemap += `
      <url>
        <loc>http://localhost:${port}${route.path}</loc>
        <lastmod>${route.lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  sitemap += '</urlset>';
  
  res.header('Content-Type', 'application/xml');
  res.send(sitemap);
});


// Rutas de ejemplo
app.get('/', (req, res) => res.send('Home'));
app.get('/about', (req, res) => res.send('About'));
app.get('/products', (req, res) => res.send('Products'));
app.get('/contact', (req, res) => res.send('Contact'));

// Servir el archivo robots.txt
app.get('/robots.txt', (req, res) => {
    const robotsContent = `
      User-agent: *
      Disallow: /private/
      Allow: /
    `;
  
    res.header('Content-Type', 'text/plain');
    res.send(robotsContent);
  });

// Iniciar servidor
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
