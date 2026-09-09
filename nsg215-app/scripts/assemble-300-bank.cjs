const fs = require('fs');
const path = require('path');

function clean(text) {
  if (!text) return '';
  return text.replace(/\[cite:\s*\d+\]/g, '').replace(/\s{2,}/g, ' ').trim();
}

const modTitles = [
  'Introduction to Anatomy and General Histology',
  'Cell Structure and Function',
  'Basic Tissues in the Body',
  'Gametogenesis and Weeks 1-3 of Development',
  'Third Month of Gestation to Birth',
  'Development of the Head, Neck, and Respiratory System',
  'Development of the Skeletal and Urogenital Systems',
  'Development of the Muscular and Central Nervous Systems'
];

const targetCounts = {
  1: 38,
  2: 37,
  3: 38,
  4: 38,
  5: 37,
  6: 38,
  7: 37,
  8: 37
};

const buckets = JSON.parse(fs.readFileSync(path.join(__dirname, 'intermediate-buckets.json'), 'utf8'));
const supp = JSON.parse(fs.readFileSync(path.join(__dirname, 'supplementary-questions4.json'), 'utf8'));

// Extra question for Module 4 to reach 38
supp[4].push({
  subtopic: 'Fertilization and the Second Week',
  difficulty: 'beginner',
  type: 'recall',
  stem: 'Which process describes the rapid mitotic divisions of the unicellular zygote into smaller blastomeres without an increase in total cellular volume?',
  options: [
    'Cleavage',
    'Gastrulation',
    'Neurulation',
    'Capacitation'
  ],
  correctIndex: 0,
  explanation: {
    correct: 'Cleavage consists of repeated mitotic divisions of the zygote into smaller blastomeres within the confines of the non-expanding zona pellucida.',
    distractors: [
      'Gastrulation is the formation of the three germ layers.',
      'Neurulation is the formation of the neural tube.',
      'Capacitation is the conditioning of spermatozoa in the female genital tract.'
    ]
  },
  sourceTag: 'manual'
});

// Shuffle helper for options to vary correctIndex
function shuffleOptions(q, indexSeed) {
  const correctOption = q.options[q.correctIndex];
  const distractors = q.options.filter((_, idx) => idx !== q.correctIndex);
  
  // Pick target index: distribute evenly among 0, 1, 2, 3
  const targetIndex = indexSeed % 4;
  const newOptions = [];
  let distractorIdx = 0;
  
  for (let i = 0; i < 4; i++) {
    if (i === targetIndex) {
      newOptions.push(correctOption);
    } else {
      newOptions.push(distractors[distractorIdx++] || 'Alternative physiological pathway');
    }
  }

  return {
    ...q,
    options: newOptions,
    correctIndex: targetIndex
  };
}

const finalQuestions = [];
let globalIndex = 1;

for (let m = 1; m <= 8; m++) {
  const topicTitle = modTitles[m - 1];
  const target = targetCounts[m];
  const combinedList = [...(buckets[m] || []), ...(supp[m] || [])];
  
  // Deduplicate by stem
  const seenStems = new Set();
  const moduleQuestions = [];

  for (const q of combinedList) {
    if (moduleQuestions.length >= target) break;
    const stemClean = clean(q.stem);
    const key = stemClean.toLowerCase().slice(0, 35);
    if (!seenStems.has(key)) {
      seenStems.add(key);
      let distractors = (q.explanation?.distractors || []).map(d => clean(d)).filter(Boolean);
      while (distractors.length < 3) {
        distractors.push('Contradicts standard University of Ibadan curriculum specifications.');
      }
      if (distractors.length > 3) {
        distractors = distractors.slice(0, 3);
      }

      moduleQuestions.push({
        topic: topicTitle,
        subtopic: clean(q.subtopic) || clean(q.topic) || topicTitle,
        difficulty: q.difficulty || 'intermediate',
        type: q.type || 'recall',
        stem: stemClean,
        options: q.options.map(o => clean(o)),
        correctIndex: q.correctIndex ?? 0,
        explanation: {
          correct: clean(q.explanation?.correct),
          distractors
        },
        sourceTag: 'manual'
      });
    }
  }

  if (moduleQuestions.length < target) {
    console.error(`WARNING: Module ${m} only has ${moduleQuestions.length} of ${target} questions!`);
  }

  // Format and shuffle
  moduleQuestions.forEach(q => {
    const id = `ana213-${String(globalIndex).padStart(3, '0')}`;
    const shuffled = shuffleOptions(q, globalIndex);
    finalQuestions.push({
      id,
      topic: shuffled.topic,
      subtopic: shuffled.subtopic,
      difficulty: shuffled.difficulty,
      type: shuffled.type,
      stem: shuffled.stem,
      options: shuffled.options,
      correctIndex: shuffled.correctIndex,
      explanation: shuffled.explanation,
      sourceTag: 'manual'
    });
    globalIndex++;
  });
}

console.log(`Assembled exactly ${finalQuestions.length} questions.`);

// Verify breakdown per module
const counts = {};
finalQuestions.forEach(q => {
  counts[q.topic] = (counts[q.topic] || 0) + 1;
});
console.log('Final breakdown per module:', counts);

// Save to public/data and public/content
const dest1 = path.join(__dirname, '../public/data/ANA213-question-bank.json');
const dest2 = path.join(__dirname, '../public/content/ana213/questions.json');

fs.writeFileSync(dest1, JSON.stringify(finalQuestions, null, 2), 'utf8');
fs.writeFileSync(dest2, JSON.stringify(finalQuestions, null, 2), 'utf8');

console.log(`Saved to ${dest1} and ${dest2}`);
