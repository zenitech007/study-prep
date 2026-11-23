import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from '../../node_modules/typescript/lib/typescript.js';

const source = await readFile(new URL('../src/store/storage.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { storage, DEFAULT_PROGRESS } = await import(`data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`);

const ALL_COURSES = ['nsg215', 'ana213', 'ana214', 'gce204', 'nsg222', 'nsg223', 'nsg225', 'nsg229', 'nsg232', 'pio206', 'psy205', 'psm201'];

for (const target of ['ana214', 'gce204', 'nsg222', 'nsg223', 'nsg225', 'nsg229', 'nsg232', 'pio206', 'psy205', 'psm201']) test(`${target.toUpperCase()} reset leaves other courses intact`, () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  for (const id of ALL_COURSES) {
    storage.saveProgress({ ...DEFAULT_PROGRESS, totalAttempted: id === target ? 12 : 7 }, id);
    storage.saveStudiedSessions([1], id);
    values.set(`studyprep_${id}_active_drill`, JSON.stringify({ id: 'drill' }));
  }
  const otherIds = ALL_COURSES.filter((id) => id !== target);
  const others = otherIds.map((id) => ({
    progress: values.get(`studyprep_${id}_progress`),
    drill: values.get(`studyprep_${id}_active_drill`),
    studied: values.get(`studyprep_${id}_studied_sessions`),
  }));
  storage.resetProgress(target);
  storage.clearActiveQuiz(target);
  assert.equal(storage.getProgress(target).totalAttempted, 0);
  assert.equal(values.has(`studyprep_${target}_active_drill`), false);
  assert.equal(values.has(`studyprep_${target}_studied_sessions`), false);
  otherIds.forEach((id, index) => {
    assert.equal(values.get(`studyprep_${id}_progress`), others[index].progress);
    assert.equal(values.get(`studyprep_${id}_active_drill`), others[index].drill);
    assert.equal(values.get(`studyprep_${id}_studied_sessions`), others[index].studied);
  });
});

test('NSG229 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'nsg229-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['nsg229-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'nsg229');
  assert.deepEqual(storage.getActiveQuiz('nsg229'), quiz);
  assert.ok(values.has('studyprep_nsg229_active_drill'));
  for (const other of ALL_COURSES.filter((c) => c !== 'nsg229')) {
    assert.equal(values.has(`studyprep_${other}_active_drill`), false);
  }
});

test('NSG232 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'nsg232-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['nsg232-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'nsg232');
  assert.deepEqual(storage.getActiveQuiz('nsg232'), quiz);
  assert.ok(values.has('studyprep_nsg232_active_drill'));
  for (const other of ALL_COURSES.filter((c) => c !== 'nsg232')) {
    assert.equal(values.has(`studyprep_${other}_active_drill`), false);
  }
});

test('PIO206 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'pio206-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['pio206-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'pio206');
  assert.deepEqual(storage.getActiveQuiz('pio206'), quiz);
  assert.ok(values.has('studyprep_pio206_active_drill'));
  for (const other of ALL_COURSES.filter((c) => c !== 'pio206')) {
    assert.equal(values.has(`studyprep_${other}_active_drill`), false);
  }
});

test('PSY205 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'psy205-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['psy205-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'psy205');
  assert.deepEqual(storage.getActiveQuiz('psy205'), quiz);
  assert.ok(values.has('studyprep_psy205_active_drill'));
  for (const other of ALL_COURSES.filter((c) => c !== 'psy205')) {
    assert.equal(values.has(`studyprep_${other}_active_drill`), false);
  }
});

test('PSM201 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'psm201-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['psm201-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'psm201');
  assert.deepEqual(storage.getActiveQuiz('psm201'), quiz);
  assert.ok(values.has('studyprep_psm201_active_drill'));
  for (const other of ALL_COURSES.filter((c) => c !== 'psm201')) {
    assert.equal(values.has(`studyprep_${other}_active_drill`), false);
  }
});

test('NSG225 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'nsg225-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['nsg225-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'nsg225');
  assert.deepEqual(storage.getActiveQuiz('nsg225'), quiz);
  assert.ok(values.has('studyprep_nsg225_active_drill'));
  assert.equal(values.has('studyprep_nsg223_active_drill'), false);
  assert.equal(values.has('studyprep_nsg222_active_drill'), false);
  assert.equal(values.has('studyprep_gce204_active_drill'), false);
  assert.equal(values.has('studyprep_ana214_active_drill'), false);
  assert.equal(values.has('studyprep_ana213_active_drill'), false);
  assert.equal(values.has('studyprep_nsg215_active_drill'), false);
});

test('NSG223 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'nsg223-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['nsg223-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'nsg223');
  assert.deepEqual(storage.getActiveQuiz('nsg223'), quiz);
  assert.ok(values.has('studyprep_nsg223_active_drill'));
  assert.equal(values.has('studyprep_nsg222_active_drill'), false);
  assert.equal(values.has('studyprep_gce204_active_drill'), false);
  assert.equal(values.has('studyprep_ana214_active_drill'), false);
  assert.equal(values.has('studyprep_ana213_active_drill'), false);
  assert.equal(values.has('studyprep_nsg215_active_drill'), false);
});

test('NSG222 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'nsg222-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['nsg222-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'nsg222');
  assert.deepEqual(storage.getActiveQuiz('nsg222'), quiz);
  assert.ok(values.has('studyprep_nsg222_active_drill'));
  assert.equal(values.has('studyprep_gce204_active_drill'), false);
  assert.equal(values.has('studyprep_ana214_active_drill'), false);
  assert.equal(values.has('studyprep_ana213_active_drill'), false);
  assert.equal(values.has('studyprep_nsg215_active_drill'), false);
});

test('GCE204 active drill uses only its namespaced key', () => {
  const values = new Map();
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: (key) => values.delete(key),
  };
  const quiz = {
    id: 'gce204-test', config: { questionCount: 1, topics: [], difficulties: [], mode: 'practice', smartDrill: false },
    questionIds: ['gce204-q1'], answers: [], currentIndex: 0,
    startedAt: new Date().toISOString(), completedAt: null, bookmarkedIds: [],
  };
  storage.saveActiveQuiz(quiz, 'gce204');
  assert.deepEqual(storage.getActiveQuiz('gce204'), quiz);
  assert.ok(values.has('studyprep_gce204_active_drill'));
  assert.equal(values.has('studyprep_ana214_active_drill'), false);
  assert.equal(values.has('studyprep_ana213_active_drill'), false);
  assert.equal(values.has('studyprep_nsg215_active_drill'), false);
});
