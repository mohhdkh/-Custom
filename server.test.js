const assert = require('node:assert/strict');
const test = require('node:test');
const { createApp } = require('./server');

test('legacy generateCustomToken endpoint never issues a token', async () => {
  const server = createApp().listen(0);

  try {
    await new Promise((resolve) => server.once('listening', resolve));
    const { port } = server.address();
    const response = await fetch(
      `http://127.0.0.1:${port}/generateCustomToken`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uid: 'attacker-controlled-uid' }),
      },
    );
    const body = await response.json();

    assert.equal(response.status, 410);
    assert.equal(Object.hasOwn(body, 'token'), false);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
