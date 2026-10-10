const http = require('node:http');
const path = require('node:path');
const { realpathSync } = require('node:fs');
const { readFile, realpath } = require('node:fs/promises');
const { parseArgs } = require('node:util');

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function createServer(root = path.resolve(__dirname, '..')) {
  const publicRoot = realpathSync(root);
  function isPublic(file) {
    const relative = path.relative(publicRoot, file);
    return relative !== '..' && !relative.startsWith(`..${path.sep}`) &&
      !path.isAbsolute(relative) && !relative.split(path.sep).some(part => part.startsWith('.')) &&
      Boolean(contentTypes[path.extname(file).toLowerCase()]);
  }
  return http.createServer(async (request, response) => {
    const send = (status, text, headers = {}) => {
      response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8', ...headers });
      response.end(request.method === 'HEAD' ? undefined : text);
    };
    if (!['GET', 'HEAD'].includes(request.method)) {
      send(405, 'Method not allowed', { Allow: 'GET, HEAD' });
      return;
    }
    let pathname;
    try {
      pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    } catch {
      send(400, 'Bad request');
      return;
    }
    const requestedFile = path.resolve(publicRoot, `.${pathname === '/' ? '/index.html' : pathname}`);
    if (!isPublic(requestedFile)) {
      send(404, 'Not found');
      return;
    }
    try {
      const file = await realpath(requestedFile);
      if (!isPublic(file)) {
        send(404, 'Not found');
        return;
      }
      const body = await readFile(file);
      response.writeHead(200, {
        'Content-Type': contentTypes[path.extname(file).toLowerCase()],
        'Content-Length': body.length,
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
      });
      response.end(request.method === 'HEAD' ? undefined : body);
    } catch {
      send(404, 'Not found');
    }
  });
}

if (require.main === module) {
  const { values } = parseArgs({ options: {
    host: { type: 'string', default: '127.0.0.1' },
    port: { type: 'string', default: '3000' }
  } });
  const port = Number(values.port);
  if (!/^\d+$/.test(values.port) || !Number.isInteger(port) || port > 65535) {
    console.error('Port must be an integer from 0 to 65535.');
    process.exit(1);
  }
  const server = createServer();
  server.on('error', error => {
    console.error(`Development server: ${error.message}`);
    process.exitCode = 1;
  });
  server.listen(port, values.host, () => {
    const host = values.host.includes(':') ? `[${values.host}]` : values.host;
    console.log(`Development server: http://${host}:${server.address().port}/`);
  });
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => server.close());
}

module.exports = { createServer };
