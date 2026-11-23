import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { readFile } from 'node:fs/promises';
import ts from '../../node_modules/typescript/lib/typescript.js';

const coursesSource = await readFile(new URL('../src/data/courses.ts', import.meta.url), 'utf8');
const compiledCourses = ts.transpileModule(coursesSource, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { COURSES, getAllCourses, getCourse } = await import(`data:text/javascript;base64,${Buffer.from(compiledCourses.outputText).toString('base64')}`);

test('Unit: Course registry status and ordering for locked courses', () => {
  assert.equal(COURSES.length, 12, 'Must have exactly 12 courses');

  const ana213 = getCourse('ana213');
  const nsg215 = getCourse('nsg215');

  assert.ok(ana213, 'ANA 213 must exist in registry');
  assert.equal(ana213.status, 'locked', 'ANA 213 must be locked');
  assert.equal(ana213.lockReason, 'Previous Semester', 'ANA 213 lockReason must be Previous Semester');

  assert.ok(nsg215, 'NSG 215 must exist in registry');
  assert.equal(nsg215.status, 'locked', 'NSG 215 must be locked');
  assert.equal(nsg215.lockReason, 'Previous Semester', 'NSG 215 lockReason must be Previous Semester');

  const activeCourses = COURSES.filter((c) => c.status === 'active');
  assert.equal(activeCourses.length, 10, 'Must have exactly 10 active courses');

  const sortedCourses = getAllCourses();
  const first10 = sortedCourses.slice(0, 10);
  const last2 = sortedCourses.slice(10);

  assert.ok(first10.every((c) => c.status === 'active'), 'First 10 courses on homepage must be active');
  assert.ok(last2.every((c) => c.status === 'locked'), 'Last 2 courses on homepage must be locked');
  assert.ok(last2.some((c) => c.id === 'ana213') && last2.some((c) => c.id === 'nsg215'));
});

const base = 'http://127.0.0.1:5185';
const server = spawn(
  process.execPath,
  [fileURLToPath(new URL('../../node_modules/vite/bin/vite.js', import.meta.url)), '--host', '127.0.0.1', '--port', '5185'],
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
  throw new Error('Test server on port 5185 did not start');
}

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: true,
  args: ['--no-sandbox'],
});

test('E2E: Homepage locked cards (badges, disabled button >=44px) and direct route guards', { timeout: 60000 }, async () => {
  await ready();
  const page = await browser.newPage();
  try {
    await page.goto(base);

    // 1. Verify Active courses count badge on Homepage
    const activeBadge = page.locator('span.badge-primary').filter({ hasText: /10 Active/ });
    await activeBadge.waitFor();

    // 2. Verify ANA 213 locked card on homepage
    const anaCard = page.locator('div.card-glass').filter({ hasText: 'ANA 213' }).first();
    await anaCard.waitFor();
    const anaBadge = anaCard.getByText('Last Semester', { exact: true });
    await anaBadge.waitFor();
    const anaButton = anaCard.getByRole('button', { name: /Locked/i });
    await anaButton.waitFor();
    assert.equal(await anaButton.isDisabled(), true, 'ANA 213 button must be disabled');
    assert.equal(await anaButton.getAttribute('aria-disabled'), 'true', 'ANA 213 button must have aria-disabled');
    const anaBox = await anaButton.boundingBox();
    assert.ok(anaBox && anaBox.height >= 44, `ANA 213 button height ${anaBox?.height} must be >= 44px`);

    // 3. Verify NSG 215 locked card on homepage
    const nsgCard = page.locator('div.card-glass').filter({ hasText: 'NSG 215' }).first();
    await nsgCard.waitFor();
    const nsgBadge = nsgCard.getByText('Last Semester', { exact: true });
    await nsgBadge.waitFor();
    const nsgButton = nsgCard.getByRole('button', { name: /Locked/i });
    await nsgButton.waitFor();
    assert.equal(await nsgButton.isDisabled(), true, 'NSG 215 button must be disabled');
    assert.equal(await nsgButton.getAttribute('aria-disabled'), 'true', 'NSG 215 button must have aria-disabled');
    const nsgBox = await nsgButton.boundingBox();
    assert.ok(nsgBox && nsgBox.height >= 44, `NSG 215 button height ${nsgBox?.height} must be >= 44px`);

    // 4. Test direct navigation to /course/ana213 -> Route Guard triggers
    await page.goto(`${base}/course/ana213`);
    await page.waitForURL('**/course/ana213');
    await page.getByRole('heading', { name: /ANA 213/ }).waitFor();
    const anaGuardText = await page.textContent('main');
    assert.ok(anaGuardText.includes('Previous Semester Archive'));
    assert.ok(anaGuardText.includes('Course Access Locked'));
    const backBtn = page.getByRole('link', { name: /Back to Course Library/i });
    await backBtn.waitFor();
    const backBox = await backBtn.boundingBox();
    assert.ok(backBox && backBox.height >= 44, `Back button height ${backBox?.height} must be >= 44px`);
    await backBtn.click();
    await page.waitForURL(`${base}/`);

    // 5. Test direct navigation to /course/nsg215 and /course/nsg215/learn
    await page.goto(`${base}/course/nsg215`);
    await page.waitForURL('**/course/nsg215');
    await page.getByRole('heading', { name: /NSG 215/ }).waitFor();
    const nsgGuardText = await page.textContent('main');
    assert.ok(nsgGuardText.includes('Previous Semester Archive'));

    await page.goto(`${base}/course/nsg215/learn`);
    await page.waitForURL('**/course/nsg215/learn');
    await page.getByRole('heading', { name: /NSG 215/ }).waitFor();

    // 6. Test progress preservation
    await page.evaluate(() => {
      localStorage.setItem('studyprep_nsg215_progress', JSON.stringify({ totalAttempted: 50, accuracy: 80 }));
    });
    await page.goto(`${base}/course/nsg215`);
    const preserved = await page.evaluate(() => {
      return JSON.parse(localStorage.getItem('studyprep_nsg215_progress') || '{}');
    });
    assert.equal(preserved.totalAttempted, 50, 'Stored progress must not be wiped by route guard');
  } finally {
    await page.close();
  }
});

test.after(async () => {
  await browser.close();
  server.kill();
});
