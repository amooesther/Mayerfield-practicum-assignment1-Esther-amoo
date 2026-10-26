import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, () => {
      const { port } = server.address();
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

test('GET /api/health returns 200 with ok status', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.equal(res.status, 200);

  const data = await res.json();
  assert.equal(data.status, 'ok');
  assert.equal(data.message, 'API is running');
});

test('GET /api/unknown-endpoint returns 404', async () => {
  const res = await fetch(`${baseUrl}/api/unknown-endpoint`);
  assert.equal(res.status, 404);

  const data = await res.json();
  assert.equal(data.status, 'error');
});

test('POST /api/auth/signup rejects missing fields with 400', async () => {
  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.status, 'error');
  assert.equal(data.message, 'Name is required');
});

test('POST /api/auth/signup rejects invalid email with 400', async () => {
  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'notanemail', password: 'password123' }),
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.status, 'error');
  assert.equal(data.message, 'A valid email address is required');
});

test('POST /api/auth/signup rejects short password with 400', async () => {
  const res = await fetch(`${baseUrl}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', password: '123' }),
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.status, 'error');
  assert.equal(data.message, 'Password must be at least 6 characters long');
});

test('POST /api/auth/login rejects empty body with 400', async () => {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  assert.equal(res.status, 400);
  const data = await res.json();
  assert.equal(data.status, 'error');
  assert.equal(data.message, 'Please provide both email and password');
});

test('GET /api/auth/me returns user: null when unauthenticated', async () => {
  const res = await fetch(`${baseUrl}/api/auth/me`);
  assert.equal(res.status, 200);

  const data = await res.json();
  assert.equal(data.user, null);
});

