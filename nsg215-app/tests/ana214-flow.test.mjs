import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';
const modules = await Promise.all(Array.from({ length: 7 }, async (_, index) =>
  JSON.parse(await readFile(new URL(`../../content/ana214/module${index + 1}.json`, import.meta.url), 'utf8'))));
const clean = (text) => text.replace(/\[cite:[^\]]+\]/g, '').trim();

const server = spawn(process.execPath, [fileURLToPath(new URL('../../node_modules/vite/bin/vite.js', import.meta.url)), '--host', '127.0.0.1'], {
  cwd: fileURLToPath(new URL('..', import.meta.url)), stdio: 'ignore',
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt++) {
    try {
      const response = await fetch('http://127.0.0.1:5173/');
      if (response.ok) return;
    } catch { /* server is starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Vite preview did not start');
}

test('ANA 214 library to Learn practice to persisted Tracker', { timeout: 60000 }, async () => {
  await waitForServer();
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
    args: ['--no-sandbox'],
  });
  try {
    const page = await browser.newPage();
    await page.goto('http://127.0.0.1:5173/');
    const card = page.locator('div.card-glass').filter({ hasText: 'ANA 214' }).first();
    await card.getByRole('button', { name: /Enter Course/ }).click();
    await page.waitForURL('**/course/ana214');
    await page.getByRole('link', { name: /Learn/ }).first().click();
    await page.waitForURL('**/course/ana214/learn');
    for (const module of modules) {
      const moduleButton = page.getByRole('button', { name: new RegExp(`Study Session ${module.id}:`) });
      if (await moduleButton.getAttribute('aria-expanded') === 'false') await moduleButton.click();
      const moduleCard = moduleButton.locator('..');
      await moduleCard.getByRole('button', { name: /Practice ITQs \(4\)/ }).click();
      const itqDialog = page.getByRole('dialog', { name: /In-Text Self-Check Questions/ });
      await itqDialog.waitFor();
      assert.ok((await itqDialog.textContent()).includes(clean(module.inTextQuestions[0].question)));
      await page.keyboard.press('Escape');
      await moduleCard.getByRole('button', { name: /Drill SAQs \(5\)/ }).click();
      const saqDialog = page.getByRole('dialog', { name: /Self-Assessment Questions/ });
      await saqDialog.waitFor();
      assert.ok((await saqDialog.textContent()).includes(clean(module.saqs[0].question)));
      await page.keyboard.press('Escape');
    }
    await page.getByRole('button', { name: 'Mark as Studied' }).first().click();
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_ana214_progress') || '{}'));
    assert.ok(saved.completedSessions.includes(1));
    await page.reload();
    const reloadedModule = page.getByRole('button', { name: /Study Session 1:/ });
    if (await reloadedModule.getAttribute('aria-expanded') === 'false') await reloadedModule.click();
    await page.getByRole('button', { name: /Session Studied/ }).first().waitFor();
    await page.getByRole('link', { name: /Tracker/ }).first().click();
    await page.waitForURL('**/course/ana214/tracker');
    const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_ana214_progress') || '{}'));
    assert.ok(persisted.completedSessions.includes(1));
    await page.getByRole('link', { name: /Drill/ }).first().click();
    await page.waitForURL('**/course/ana214/drill');
    await page.waitForFunction(() => [...document.querySelectorAll('option')].some((option) => option.textContent?.includes('All (300)')));
  } finally {
    await browser.close();
    server.kill();
  }
});
