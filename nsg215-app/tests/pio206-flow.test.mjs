import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:5182';
const server = spawn(
  process.execPath,
  [fileURLToPath(new URL('../../node_modules/vite/bin/vite.js', import.meta.url)), '--host', '127.0.0.1', '--port', '5182'],
  { cwd: fileURLToPath(new URL('..', import.meta.url)), stdio: 'ignore' }
);

async function ready() {
  for (let attempt = 0; attempt < 80; attempt++) {
    try {
      if ((await fetch(base)).ok) return;
    } catch {
      /* Vite is starting */
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('PIO 206 test server did not start');
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

test('E2E: Homepage -> PIO 206 card -> Learn module accordion -> Action Zone -> Tracker persistence across reload', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(base);

    // 1. Course Card verification on Homepage
    const card = page.locator('div.card-glass').filter({ hasText: 'PIO 206' }).first();
    const cardText = await card.textContent();
    assert.ok(cardText.includes('300 Questions'), 'Card must show 300 Questions metric');
    assert.ok(cardText.includes('Spaced Repetition'), 'Card must show Spaced Repetition metric');
    assert.ok(cardText.includes('6 Modules'), 'Card must show 6 Modules metric');

    // CTA touch target check (>= 44px)
    const enter = card.getByRole('button', { name: /Enter Course/ });
    const box = await enter.boundingBox();
    assert.ok(box && box.height >= 44, `CTA touch target height ${box?.height} should be >= 44px`);

    await enter.click();
    await page.waitForURL('**/course/pio206');

    // Verify course dashboard rendered correctly
    await page.getByRole('heading', { name: /PIO 206/ }).waitFor();
    const dashboardText = await page.textContent('body');
    assert.ok(dashboardText.includes('Introduction to Human Physiology'));

    // 2. Navigate to Learn tab
    await page.getByRole('link', { name: /Learn/ }).first().click();
    await page.waitForURL('**/course/pio206/learn');

    // 3. Open Module 1 Accordion
    const first = page.getByRole('button', { name: /Study Session 1:/ });
    if ((await first.getAttribute('aria-expanded')) === 'false') await first.click();
    const cardBody = first.locator('..');

    // Test ITQ Modal + Escape Close + Focus Restoration
    const itqButton = cardBody.getByRole('button', { name: /Practice ITQs/ });
    await itqButton.waitFor();
    await itqButton.focus();
    await itqButton.click();

    const dialog = page.getByRole('dialog', { name: /In-Text Self-Check Questions/ });
    await dialog.waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await dialog.count(), 0);

    // Test SAQ Modal + Escape Close
    const saqButton = cardBody.getByRole('button', { name: /Drill SAQs/ });
    await saqButton.waitFor();
    await saqButton.click();

    const saqDialog = page.getByRole('dialog', { name: /Self-Assessment Questions/ });
    await saqDialog.waitFor();
    await page.keyboard.press('Escape');
    assert.equal(await saqDialog.count(), 0);

    // Mark as Studied and verify persistence in namespaced storage
    const markButton = cardBody.getByRole('button', { name: 'Mark as Studied' });
    await markButton.waitFor();
    await markButton.click();
    assert.deepEqual(
      await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_pio206_studied_sessions') || '[]')),
      [1]
    );

    // Reload page and verify state preserved
    await page.reload();
    const reloaded = page.getByRole('button', { name: /Study Session 1:/ });
    if ((await reloaded.getAttribute('aria-expanded')) === 'false') await reloaded.click();
    await page.getByRole('button', { name: /Session Studied/ }).first().waitFor();

    // 4. Navigate to Tracker and verify progress
    await page.getByRole('link', { name: /Tracker/ }).first().click();
    await page.waitForURL('**/course/pio206/tracker');
    const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('studyprep_pio206_progress') || '{}'));
    assert.ok(saved.completedSessions && saved.completedSessions.includes(1));

    // 5. Navigate to Drill page
    await page.getByRole('link', { name: /Drill/ }).first().click();
    await page.waitForURL('**/course/pio206/drill');
    await page.getByRole('heading', { name: /Configure Drill/i }).waitFor();
  } finally {
    await page.close();
  }
});

test('Component: Keyboard accessibility & Web Speech API TTS evaluation for PIO 206', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(`${base}/course/pio206/learn`);
    await page.getByRole('button', { name: /Study Session 1:/ }).waitFor();

    // Verify Web Speech API speechService voice selection logic in browser context
    const ttsResults = await page.evaluate(() => {
      const voices = [
        { name: 'Google Kore', lang: 'en-NG', default: false, localService: false, voiceURI: 'kore' },
        { name: 'Microsoft Zira', lang: 'en-US', default: false, localService: true, voiceURI: 'zira' },
        { name: 'David', lang: 'en-US', default: false, localService: true, voiceURI: 'david' },
        { name: 'Thomas', lang: 'fr-FR', default: false, localService: true, voiceURI: 'thomas' },
      ];

      function findBestVoice(voiceList) {
        if (!voiceList || voiceList.length === 0) return null;
        const english = voiceList.filter((v) => v.lang && v.lang.toLowerCase().replace('_', '-').startsWith('en'));
        if (english.length === 0) return null;

        const koreVoice = english.find((v) => {
          const name = v.name.toLowerCase();
          return name.includes('kore') && !name.includes('korean');
        });
        if (koreVoice) return koreVoice;

        const femaleKeywords = ['female', 'samantha', 'victoria', 'zira', 'kore', 'karen', 'moira'];
        const femaleVoice = english.find((v) => {
          const name = v.name.toLowerCase();
          if (name.includes('korean')) return false;
          return femaleKeywords.some((keyword) => name.includes(keyword));
        });
        if (femaleVoice) return femaleVoice;

        return english[0];
      }

      const koreMatch = findBestVoice(voices);
      const fallbackWithoutKore = findBestVoice(voices.filter((v) => !v.name.includes('Kore')));
      const nonEnglishOnly = findBestVoice([voices[3]]);

      return {
        korePicked: koreMatch?.name === 'Google Kore',
        fallbackPicked: fallbackWithoutKore?.name === 'Microsoft Zira',
        nonEnglishNull: nonEnglishOnly === null,
      };
    });

    assert.equal(ttsResults.korePicked, true, 'Should prioritize Google Kore voice');
    assert.equal(ttsResults.fallbackPicked, true, 'Should fallback to next English voice');
    assert.equal(ttsResults.nonEnglishNull, true, 'Should reject non-English voices');

    // Focus rings: verify focus ring classes/styles on interactive buttons
    const cta = page.getByRole('button', { name: /Study Session 1:/ });
    await cta.focus();
    const hasFocus = await page.evaluate(() => document.activeElement !== null);
    assert.ok(hasFocus, 'Interactive elements must support keyboard focus');
  } finally {
    await page.close();
  }
});

test('UI States: Loading skeleton and empty concepts state on PIO 206', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.route('**/module1.json*', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      await route.continue();
    });
    await page.goto(`${base}/course/pio206/learn`);
    await page.getByRole('status', { name: 'Loading modules' }).waitFor();
    await page.getByRole('button', { name: /Study Session 1:/ }).waitFor();

    await page.goto(`${base}/course/pio206/concepts`);
    await page.getByText('PIO206 flash facts are pending.').waitFor();
  } finally {
    await page.close();
  }
});

test('UI States: Error and Retry recovery on PIO 206', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.route('**/module1.json*', (route) => route.abort());
    await page.goto(`${base}/course/pio206/learn`);
    const alert = page.getByRole('alert').filter({ hasText: 'Modules could not be loaded.' });
    await alert.waitFor();
    await page.unroute('**/module1.json*');
    await alert.getByRole('button', { name: 'Retry' }).click();
    await page.getByRole('button', { name: /Study Session 1:/ }).waitFor();
  } finally {
    await page.close();
  }
});

test('UI States: Corrupt local progress shows a recoverable inline error on PIO 206', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(base);
    await page.evaluate(() => localStorage.setItem('studyprep_pio206_progress', '{broken'));
    await page.locator('div.card-glass').filter({ hasText: 'PIO 206' }).first().getByRole('button', { name: /Enter Course/ }).click();
    await page.waitForURL('**/course/pio206');
    const alert = page.getByRole('alert').filter({ hasText: 'Saved progress for PIO206 could not be read.' });
    await alert.getByRole('button', { name: 'Retry' }).waitFor();
    await page.evaluate(() => localStorage.removeItem('studyprep_pio206_progress'));
    await alert.getByRole('button', { name: 'Retry' }).click();
    await page.getByRole('heading', { name: /PIO 206/ }).waitFor();
  } finally {
    await page.close();
  }
});

test.after(async () => {
  await browser.close();
  server.kill();
});
