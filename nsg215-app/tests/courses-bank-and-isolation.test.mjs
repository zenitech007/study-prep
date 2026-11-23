import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from '../../node_modules/typescript/lib/typescript.js';

const storageSource = await readFile(new URL('../src/store/storage.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(storageSource, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { storage, DEFAULT_PROGRESS } = await import(
  `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`
);

const COURSES = ['nsg215', 'ana213', 'ana214', 'gce204', 'nsg222', 'nsg223', 'nsg225', 'nsg229', 'nsg232', 'pio206', 'psy205', 'psm201'];

test('localStorage isolation across all 12 courses', () => {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => store.get(key) ?? null,
    setItem: (key, val) => store.set(key, val),
    removeItem: (key) => store.delete(key),
  };

  for (const courseId of COURSES) {
    storage.saveProgress({ ...DEFAULT_PROGRESS, totalAttempted: 10, totalCorrect: 8 }, courseId);
    storage.saveStudiedSessions([1, 2], courseId);
    storage.saveActiveQuiz({ id: `${courseId}-quiz` }, courseId);
  }

  // Reset each course one by one and ensure only that course is wiped
  for (const target of COURSES) {
    const snapshotsBefore = {};
    for (const other of COURSES.filter((c) => c !== target)) {
      snapshotsBefore[other] = {
        progress: storage.getProgress(other),
        quiz: storage.getActiveQuiz(other),
        studied: store.get(`studyprep_${other}_studied_sessions`),
      };
    }

    storage.resetProgress(target);
    storage.clearActiveQuiz(target);

    // Target is reset
    assert.equal(storage.getProgress(target).totalAttempted, 0);
    assert.equal(storage.getActiveQuiz(target), null);
    assert.equal(store.has(`studyprep_${target}_studied_sessions`), false);

    // All others remain intact
    for (const other of COURSES.filter((c) => c !== target)) {
      assert.deepEqual(storage.getProgress(other), snapshotsBefore[other].progress);
      assert.deepEqual(storage.getActiveQuiz(other), snapshotsBefore[other].quiz);
      assert.equal(store.get(`studyprep_${other}_studied_sessions`), snapshotsBefore[other].studied);
    }
  }
});

test('Exact question counts across all 12 courses (NSG 215: 100, ANA 213: 300, ANA 214: 300, GCE 204: 300, NSG 222: 300, NSG 223: 300, NSG 225: 300, NSG 229: 300, NSG 232: 300, PIO 206: 300, PSY 205: 300, PSM 201: 300 = 3,400 total questions)', async () => {
  // 1. NSG 215
  const nsg215 = JSON.parse(
    await readFile(new URL('../public/data/NSG215-question-bank-starter.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg215.length, 100, 'NSG 215 must have exactly 100 questions');

  // 2. ANA 213
  const ana213 = JSON.parse(
    await readFile(new URL('../public/data/ANA213-question-bank.json', import.meta.url), 'utf8')
  );
  assert.equal(ana213.length, 300, 'ANA 213 must have exactly 300 questions');

  // 3. ANA 214
  const ana214 = JSON.parse(
    await readFile(new URL('../src/data/ana214/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(ana214.length, 300, 'ANA 214 must have exactly 300 questions');

  // 4. GCE 204
  const gce204 = JSON.parse(
    await readFile(new URL('../src/data/gce204/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(gce204.length, 300, 'GCE 204 must have exactly 300 questions');

  // 5. NSG 222
  const nsg222 = JSON.parse(
    await readFile(new URL('../src/data/nsg222/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg222.length, 300, 'NSG 222 must have exactly 300 questions');

  // 6. NSG 223
  const nsg223 = JSON.parse(
    await readFile(new URL('../src/data/nsg223/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg223.length, 300, 'NSG 223 must have exactly 300 questions');

  // 7. NSG 225
  const nsg225 = JSON.parse(
    await readFile(new URL('../src/data/nsg225/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg225.length, 300, 'NSG 225 must have exactly 300 questions');

  // 8. NSG 229
  const nsg229 = JSON.parse(
    await readFile(new URL('../src/data/nsg229/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg229.length, 300, 'NSG 229 must have exactly 300 questions');

  // 9. NSG 232
  const nsg232 = JSON.parse(
    await readFile(new URL('../src/data/nsg232/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(nsg232.length, 300, 'NSG 232 must have exactly 300 questions');

  // 10. PIO 206
  const pio206 = JSON.parse(
    await readFile(new URL('../src/data/pio206/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(pio206.length, 300, 'PIO 206 must have exactly 300 questions');

  // 11. PSY 205
  const psy205 = JSON.parse(
    await readFile(new URL('../src/data/psy205/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(psy205.length, 300, 'PSY 205 must have exactly 300 questions');

  // 12. PSM 201
  const psm201 = JSON.parse(
    await readFile(new URL('../src/data/psm201/questions.json', import.meta.url), 'utf8')
  );
  assert.equal(psm201.length, 300, 'PSM 201 must have exactly 300 questions');

  const total = nsg215.length + ana213.length + ana214.length + gce204.length + nsg222.length + nsg223.length + nsg225.length + nsg229.length + nsg232.length + pio206.length + psy205.length + psm201.length;
  assert.equal(total, 3400, 'Total questions across all 12 courses must equal exactly 3,400');
});

test('PSM 201 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/psm201/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37 or 38 questions per module across all 8 modules
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('psm201-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('psm201-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('PSY 205 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/psy205/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37 or 38 questions per module across all 8 modules
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('psy205-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('psy205-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('PIO 206 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/pio206/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 6);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: exactly 50 questions per module across all 6 modules
  for (let m = 1; m <= 6; m++) {
    assert.equal(
      moduleCounts[m],
      50,
      `Module ${m} has ${moduleCounts[m]} questions (expected 50)`
    );
  }

  // All 24 ITQs and 30 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('pio206-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('pio206-saq-'));
  assert.equal(itqs.length, 24);
  assert.equal(saqs.length, 30);
});

test('NSG 232 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/nsg232/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37-38 questions per module across all 8 modules
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('nsg232-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('nsg232-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('NSG 229 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/nsg229/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 6);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 50 questions per module across all 6 modules
  for (let m = 1; m <= 6; m++) {
    assert.equal(
      moduleCounts[m],
      50,
      `Module ${m} has ${moduleCounts[m]} questions (expected 50)`
    );
  }

  // All 24 ITQs and 30 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('nsg229-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('nsg229-saq-'));
  assert.equal(itqs.length, 24);
  assert.equal(saqs.length, 30);
});

test('NSG 225 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/nsg225/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37-38 questions per module
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('nsg225-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('nsg225-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('NSG 223 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/nsg223/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37-38 questions per module
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('nsg223-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('nsg223-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('NSG 222 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/nsg222/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  // Balanced coverage: 37-38 questions per module
  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }

  // All 32 ITQs and 40 SAQs are present
  const itqs = bank.filter((q) => q.id.startsWith('nsg222-itq-'));
  const saqs = bank.filter((q) => q.id.startsWith('nsg222-saq-'));
  assert.equal(itqs.length, 32);
  assert.equal(saqs.length, 40);
});

test('GCE 204 question bank structural integrity and balanced module coverage', async () => {
  const bank = JSON.parse(await readFile(new URL('../src/data/gce204/questions.json', import.meta.url), 'utf8'));
  assert.equal(bank.length, 300);
  assert.equal(new Set(bank.map((q) => q.id)).size, 300);
  assert.equal(new Set(bank.map((q) => q.stem.toLowerCase())).size, 300);

  const moduleCounts = {};
  for (const q of bank) {
    assert.ok(q.moduleId >= 1 && q.moduleId <= 8);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((opt) => opt.toLowerCase())).size, 4);
    assert.ok(q.correctIndex >= 0 && q.correctIndex < 4);
    assert.ok(q.explanation.correct);
    assert.equal(q.explanation.distractors.length, 3);
    moduleCounts[q.moduleId] = (moduleCounts[q.moduleId] || 0) + 1;
  }

  for (let m = 1; m <= 8; m++) {
    assert.ok(
      moduleCounts[m] >= 37 && moduleCounts[m] <= 38,
      `Module ${m} has ${moduleCounts[m]} questions (expected 37-38)`
    );
  }
});
