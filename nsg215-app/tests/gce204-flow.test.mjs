import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:5174';
const server = spawn(process.execPath, [fileURLToPath(new URL('../../node_modules/vite/bin/vite.js', import.meta.url)), '--host', '127.0.0.1', '--port', '5174'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)), stdio: 'ignore',
});

async function ready() {
  for (let attempt = 0; attempt < 80; attempt++) {
    try { if ((await fetch(base)).ok) return; } catch { /* Vite is starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('GCE 204 test server did not start');
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true, args: ['--no-sandbox'],
});

test('GCE 204 card, module Action Zone, and Tracker persist across reload', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(base);
    const card = page.locator('div.card-glass').filter({ hasText: 'GCE 204' }).first();
    assert.ok((await card.textContent()).includes('300 Questions'));
    assert.ok((await card.textContent()).includes('8 Modules'));
    const enter = card.getByRole('button', { name: /Enter Course/ });
    assert.ok((await enter.boundingBox()).height >= 44);
    await enter.click();
    await page.waitForURL('**/course/gce204');
    await page.getByRole('link', { name: /Learn/ }).first().click();
    await page.waitForURL('**/course/gce204/learn');
    const first = page.getByRole('button', { name: /Study Session 1:/ });
    if (await first.getAttribute('aria-expanded') === 'false') await first.click();
    const cardBody = first.locator('..');
    await cardBody.getByText('Content for this module is pending.').waitFor();
    await cardBody.getByRole('button', { name: /Practice ITQs \(0\)/ }).click();
    const dialog = page.getByRole('dialog', { name: /In-Text Self-Check Questions/ });
    await dialog.getByText('Questions for this module are pending.').waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await dialog.count(), 0);
    await cardBody.getByRole('button', { name: /Drill SAQs \(0\)/ }).click();
    await page.getByRole('dialog', { name: /Self-Assessment Questions/ }).getByText('Questions for this module are pending.').waitFor();
    await page.keyboard.press('Escape');
    await cardBody.getByRole('button', { name: 'Mark as Studied' }).click();
    assert.deepEqual(await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_gce204_studied_sessions') || '[]')), [1]);
    await page.reload();
    const reloaded = page.getByRole('button', { name: /Study Session 1:/ });
    if (await reloaded.getAttribute('aria-expanded') === 'false') await reloaded.click();
    await page.getByRole('button', { name: /Session Studied/ }).first().waitFor();
    await page.getByRole('link', { name: /Tracker/ }).first().click();
    await page.waitForURL('**/course/gce204/tracker');
    assert.ok((await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_gce204_progress') || '{}'))).completedSessions.includes(1));
    await page.getByRole('link', { name: /Drill/ }).first().click();
    await page.getByText('Drill questions are pending').waitFor();
  } finally { await page.close(); }
});

test('GCE 204 loading skeleton and empty Quick-Prep render', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.route('**/module1.json*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      await route.continue();
    });
    await page.goto(`${base}/course/gce204/learn`);
    await page.getByRole('status', { name: 'Loading modules' }).waitFor();
    await page.getByRole('button', { name: /Study Session 1:/ }).waitFor();
    await page.goto(`${base}/course/gce204/concepts`);
    await page.getByText('GCE204 flash facts are pending.').waitFor();
  } finally { await page.close(); }
});

test('GCE 204 module load failure shows an error and Retry recovers', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.route('**/module1.json*', (route) => route.abort());
    await page.goto(`${base}/course/gce204/learn`);
    const alert = page.getByRole('alert').filter({ hasText: 'Modules could not be loaded.' });
    await alert.waitFor();
    await page.unroute('**/module1.json*');
    await alert.getByRole('button', { name: 'Retry' }).click();
    await page.getByRole('button', { name: /Study Session 1:/ }).waitFor();
  } finally { await page.close(); }
});

test('GCE 204 corrupt local progress shows a recoverable inline error', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(base);
    await page.evaluate(() => localStorage.setItem('studyprep_gce204_progress', '{broken'));
    await page.locator('div.card-glass').filter({ hasText: 'GCE 204' }).first()
      .getByRole('button', { name: /Enter Course/ }).click();
    await page.waitForURL('**/course/gce204');
    const alert = page.getByRole('alert').filter({ hasText: 'Saved progress for GCE204 could not be read.' });
    await alert.getByRole('button', { name: 'Retry' }).waitFor();
    await page.evaluate(() => localStorage.removeItem('studyprep_gce204_progress'));
    await alert.getByRole('button', { name: 'Retry' }).click();
    await page.getByText('Practice questions are pending').waitFor();
  } finally { await page.close(); }
});

test.after(async () => { await browser.close(); server.kill(); });
