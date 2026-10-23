const { test } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { randomBytes } = require('node:crypto');
const path = require('node:path');
const { once } = require('node:events');

// Requires a frontend build and the database configured in backend/.env.
test('production serves the SPA, assets, health and API errors on one origin', async () => {
  const child = spawn(process.execPath, [path.join(__dirname, '../server.js')], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '5051', JWT_SECRET: randomBytes(32).toString('hex') },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  let output = '';
  child.stdout.on('data', data => { output += data; });
  child.stderr.on('data', data => { output += data; });
  try {
    let ready = false;
    for (let attempt = 0; attempt < 80; attempt++) {
      if (child.exitCode !== null) throw new Error('Production server exited before startup. Check local database configuration.');
      try { ready = (await fetch('http://127.0.0.1:5051/api/health')).ok; } catch { /* Wait for startup. */ }
      if (ready) break;
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    assert.ok(ready, 'Database-backed production health must be ready');
    for (const route of ['/', '/login', '/dashboard', '/roadmap/web-development']) {
      const response = await fetch('http://127.0.0.1:5051' + route);
      assert.equal(response.status, 200);
      assert.match(response.headers.get('content-type'), /text\/html/);
      assert.match(await response.text(), /<div id="root"><\/div>/);
    }
    const html = await (await fetch('http://127.0.0.1:5051/')).text();
    const asset = html.match(/src="(\/assets\/[^\"]+\.js)"/);
    assert.ok(asset, 'Build must include a JavaScript asset');
    assert.equal((await fetch('http://127.0.0.1:5051' + asset[1])).status, 200);
    const missing = await fetch('http://127.0.0.1:5051/api/does-not-exist');
    assert.equal(missing.status, 404);
    assert.equal((await missing.json()).success, false);
    assert.equal((await fetch('http://127.0.0.1:5051/api/user/profile')).status, 401);
  } finally {
    const exited = once(child, 'exit');
    if (child.exitCode === null) { child.kill(); await exited; }
  }
});

test('production refuses a missing private JWT secret', async () => {
  const child = spawn(process.execPath, [path.join(__dirname, '../server.js')], {
    env: { ...process.env, NODE_ENV: 'production', PORT: '5052', JWT_SECRET: '' },
    stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
  });
  let error = '';
  child.stdout.resume();
  child.stderr.on('data', data => { error += data; });
  const [code] = await once(child, 'exit');
  assert.notEqual(code, 0);
  assert.match(error, /Production requires MONGO_URI and a private JWT_SECRET/);
});
