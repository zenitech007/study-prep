import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const root = new URL('../../content/ana214/', import.meta.url);
const modules = await Promise.all(Array.from({ length: 7 }, async (_, index) =>
  JSON.parse(await readFile(new URL(`module${index + 1}.json`, root), 'utf8'))));
const bank = JSON.parse(await readFile(new URL('questions.json', root), 'utf8'));
const appBank = JSON.parse(await readFile(new URL('../src/data/ana214/questions.json', import.meta.url), 'utf8'));
const clean = (text) => text.replace(/\[cite:[^\]]+\]/g, '').replace(/\s+/g, ' ').trim();

test('ANA 214 bank has 300 unique, structurally valid questions', () => {
  assert.equal(bank.length, 300);
  assert.deepEqual(appBank, bank);
  assert.equal(new Set(bank.map((question) => question.id)).size, 300);
  assert.equal(new Set(bank.map((question) => question.stem.toLowerCase())).size, 300);
  for (const question of bank) {
    assert.ok(question.moduleId >= 1 && question.moduleId <= 7);
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options.map((option) => option.toLowerCase())).size, 4);
    assert.ok(question.correctIndex >= 0 && question.correctIndex < 4);
    assert.ok(question.explanation.correct);
    assert.equal(question.explanation.distractors.length, 3);
  }
});

test('all module ITQs and SAQs appear in their own module bank', () => {
  for (const module of modules) {
    const questionSet = bank.filter((question) => question.moduleId === module.id);
    for (const item of [...module.inTextQuestions, ...module.saqs]) {
      const matches = questionSet.filter((question) => question.stem === clean(item.question));
      assert.equal(matches.length, 1, `${module.id}: ${item.question}`);
      assert.equal(matches[0].options[matches[0].correctIndex], clean(item.answer));
    }
  }
});

test('every expanded correct answer reconstructs a source content sentence', () => {
  for (const question of bank.filter((item) => item.id.includes('-content-'))) {
    const module = modules[question.moduleId - 1];
    const heading = clean(module.content.find((section) => clean(section.heading) === question.subtopic).heading);
    const prefix = `Complete this statement about ${heading}: `;
    assert.ok(question.stem.startsWith(prefix));
    const reconstructed = question.stem.slice(prefix.length).replace('____', question.options[question.correctIndex]);
    const content = module.content.map((section) => clean(section.body)).join(' ');
    assert.ok(content.includes(reconstructed), `${question.id}: ${reconstructed}`);
    for (const option of question.options) {
      assert.ok(content.includes(option), `${question.id}: option absent from content: ${option}`);
    }
  }
});
