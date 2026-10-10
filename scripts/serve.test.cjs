const assert = require('node:assert/strict');
const { test, before, after } = require('node:test');
const { once } = require('node:events');
const { mkdtemp, mkdir, writeFile, symlink, rm } = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const { createServer } = require('./serve.cjs');

let directory, server, base, canCreateSymlink = true;
before(async () => {
  directory = await mkdtemp(path.join(os.tmpdir(), 'aniani-server-'));
  const root = path.join(directory, 'site');
  await mkdir(path.join(root, '.git'), { recursive: true });
  await mkdir(path.join(root, 'images'));
  await writeFile(path.join(root, 'index.html'), '<title>Portal</title>');
  await writeFile(path.join(root, 'app.js'), 'window.portal = true;');
  await writeFile(path.join(root, 'images', 'card.png'), Buffer.from([0, 1, 2, 3]));
  for (const filename of ['.env', '.git/config', 'supabase.txt', 'package.json']) {
    await writeFile(path.join(root, filename), 'private');
  }
  await writeFile(path.join(directory, 'outside.html'), 'outside');
  try {
    await symlink(path.join(directory, 'outside.html'), path.join(root, 'escape.html'));
  } catch (error) {
    if (process.platform !== 'win32' || error.code !== 'EPERM') throw error;
    canCreateSymlink = false;
  }
  server = createServer(root);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  base = `http://127.0.0.1:${server.address().port}`;
});
after(async () => {
  if (server?.listening) await new Promise(resolve => server.close(resolve));
  if (directory) await rm(directory, { recursive: true, force: true });
});

test('serves HTML, versioned JavaScript and binary images with correct MIME types', async () => {
  const index = await fetch(`${base}/`);
  assert.equal(index.status, 200);
  assert.match(index.headers.get('content-type'), /^text\/html/);
  assert.equal(await index.text(), '<title>Portal</title>');
  const script = await fetch(`${base}/app.js?v=1`);
  assert.equal(script.status, 200);
  assert.match(script.headers.get('content-type'), /^text\/javascript/);
  assert.equal(script.headers.get('cache-control'), 'no-store');
  assert.equal(await script.text(), 'window.portal = true;');
  const image = await fetch(`${base}/images/card.png`);
  assert.equal(image.status, 200);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.deepEqual(Buffer.from(await image.arrayBuffer()), Buffer.from([0, 1, 2, 3]));
});

test('HEAD has content headers and no response body', async () => {
  const response = await fetch(`${base}/app.js`, { method: 'HEAD' });
  assert.equal(response.status, 200);
  assert.equal(Number(response.headers.get('content-length')), Buffer.byteLength('window.portal = true;'));
  assert.equal(await response.text(), '');
});

test('does not expose private files, directories or traversal', async () => {
  for (const url of ['/.env', '/.git/config', '/supabase.txt', '/package.json', '/images/',
    '/missing.js', '/..%2Foutside.html']) {
    const response = await fetch(base + url);
    assert.equal(response.status, 404, url);
    assert.equal(await response.text(), 'Not found');
  }
});

test('does not follow a symlink outside the public root', async context => {
  if (!canCreateSymlink) {
    context.skip('Windows requires permission to create symlinks');
    return;
  }
  const response = await fetch(`${base}/escape.html`);
  assert.equal(response.status, 404);
  assert.equal(await response.text(), 'Not found');
});

test('rejects malformed paths and unsupported methods', async () => {
  const malformed = await fetch(`${base}/%ZZ.js`);
  assert.equal(malformed.status, 400);
  const post = await fetch(`${base}/index.html`, { method: 'POST' });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get('allow'), 'GET, HEAD');
});
