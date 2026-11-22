import type { Question, StudySessionContent, Difficulty, QuestionType } from '../types';

/**
 * Removes citation brackets like [cite: 4] and cleans extra whitespace.
 */
export function cleanText(text?: string): string {
  if (!text) return '';
  return text.replace(/\[cite:\s*\d+\]/g, '').replace(/\s{2,}/g, ' ').trim();
}

/**
 * Programmatically extracts all inTextQuestions and saqs from session/module content
 * and standardizes them into the Drill Bank Question format.
 */
export function aggregateSessionQuestions(
  sessions: StudySessionContent[],
  courseId: string
): Question[] {
  const aggregated: Question[] = [];

  sessions.forEach((session, sIdx) => {
    const sessionNum = session.sessionNumber ?? session.id ?? sIdx + 1;
    const topic = cleanText(session.title);

    // 1. Extract In-Text Questions (ITQs)
    if (session.inTextQuestions && session.inTextQuestions.length > 0) {
      session.inTextQuestions.forEach((itq, idx) => {
        const qText = cleanText(itq.question);
        const aText = cleanText(itq.answer);
        if (!qText || !aText) return;

        aggregated.push({
          id: `${courseId.toLowerCase()}-itq-s${sessionNum}-${idx + 1}`,
          topic,
          subtopic: 'In-Text Self-Check',
          difficulty: 'beginner' as Difficulty,
          type: 'recall' as QuestionType,
          stem: qText,
          options: [
            aText,
            'Opposite physiological orientation relative to standard anatomical criteria',
            'Alternate tissue derivative derived from adjacent embryonic layers',
            'Secondary morphological modification observed in late pathology',
          ],
          correctIndex: 0,
          explanation: {
            correct: aText,
            distractors: [
              'Contradicts official University of Ibadan course manual criteria.',
              'Refers to an alternative structure or embryonic lineage.',
              'Represents a pathological variation rather than the normal anatomy.',
            ],
          },
          sourceTag: 'manual',
        });
      });
    }

    // 2. Extract Self-Assessment Questions (SAQs)
    if (session.saqs && session.saqs.length > 0) {
      session.saqs.forEach((saq) => {
        const qText = cleanText(saq.question);
        const aText = cleanText(saq.answer);
        if (!qText || !aText) return;

        const saqIdClean = (saq.id || '').replace(/[^a-zA-Z0-9.-]/g, '');

        aggregated.push({
          id: `${courseId.toLowerCase()}-saq-${saqIdClean}`,
          topic,
          subtopic: `SAQ ${saq.id}`,
          difficulty: 'intermediate' as Difficulty,
          type: 'scenario' as QuestionType,
          stem: qText,
          options: [
            aText,
            'Transient embryonic structure that regresses without functional adult derivative',
            'Secondary tissue differentiation appearing exclusively in the third trimester',
            'Pathological anomaly arising from disruption of neural crest cell migration',
          ],
          correctIndex: 0,
          explanation: {
            correct: aText,
            distractors: [
              'Incorrect structural or embryological assignment according to the course manual.',
              'Conflates secondary adaptation with primary anatomical definitions.',
              'Does not meet official anatomical criteria.',
            ],
          },
          sourceTag: 'manual',
        });
      });
    }
  });

  return aggregated;
}

/**
 * Merges base question bank with aggregated session questions ensuring no duplicates.
 * Matching is performed on ID and normalized stem prefix.
 */
export function mergeQuestionBanks(baseBank: Question[], sessionQuestions: Question[]): Question[] {
  const seenIds = new Set(baseBank.map((q) => q.id));
  const seenStems = new Set(baseBank.map((q) => cleanText(q.stem).toLowerCase().slice(0, 35)));
  const merged = [...baseBank];

  for (const q of sessionQuestions) {
    const stemKey = cleanText(q.stem).toLowerCase().slice(0, 35);
    if (!seenIds.has(q.id) && !seenStems.has(stemKey)) {
      seenIds.add(q.id);
      seenStems.add(stemKey);
      merged.push(q);
    }
  }

  return merged;
}
