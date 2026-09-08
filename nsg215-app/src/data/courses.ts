export interface Course {
  id: string; // e.g. 'nsg215'
  code: string; // e.g. 'NSG 215'
  title: string;
  department: string;
  credits: string;
  level: string;
  aim: string;
  description: string;
  sessionCount: number;
  questionCount: number;
  status: 'active' | 'coming_soon';
  tags: string[];
  accentColor: string; // e.g. 'blue' | 'purple' | 'emerald'
  route: string;
}

export const COURSES: Course[] = [
  {
    id: 'nsg215',
    code: 'NSG 215',
    title: 'Human Behavior and Illness',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; First Semester',
    aim: 'Introduce concepts of behavior, health and illness; identify determinants of human behavior and describe illness behavior and models of human behavior in illness.',
    description: 'Master health psychology models, illness cognitions, coping mechanisms, and hospital adaptation strategies with 100 University of Ibadan-aligned practice questions.',
    sessionCount: 8,
    questionCount: 100,
    status: 'active',
    tags: ['Health Belief Model', 'Illness Cognition', 'Crisis Theory', 'Coping Models', 'Peplau Relationship'],
    accentColor: 'blue',
    route: '/course/nsg215',
  },
  {
    id: 'nsg216',
    code: 'NSG 216',
    title: 'Medical-Surgical Nursing I',
    department: 'Department of Nursing Science',
    credits: '4 Units',
    level: '200-Level; Second Semester',
    aim: 'Foundational nursing management of adult clients experiencing physiological alterations in respiratory, cardiovascular, and fluid/electrolyte balance.',
    description: 'In-depth clinical pathologies, perioperative care, emergency nursing interventions, and pathophysiology drills.',
    sessionCount: 10,
    questionCount: 120,
    status: 'coming_soon',
    tags: ['Perioperative Nursing', 'Cardiovascular Disorders', 'Fluid & Electrolytes', 'Respiratory Management'],
    accentColor: 'purple',
    route: '/course/nsg216',
  },
  {
    id: 'nsg217',
    code: 'NSG 217',
    title: 'Maternal & Child Health Nursing',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Promote optimal family health during antenatal, intrapartum, postnatal, and neonatal developmental stages.',
    description: 'Obstetric assessment, normal and high-risk labor management, neonatal resuscitation, and immunization protocols.',
    sessionCount: 8,
    questionCount: 90,
    status: 'coming_soon',
    tags: ['Antenatal Care', 'Labor & Delivery', 'Postpartum Care', 'Neonatal Health'],
    accentColor: 'emerald',
    route: '/course/nsg217',
  },
];

export function getAllCourses(): Course[] {
  return COURSES;
}

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getActiveCourse(): Course {
  return COURSES[0]; // NSG 215 default
}
