export interface CourseConfig {
  id: string; // e.g. 'nsg215'
  slug?: string;
  shortDescription?: string;
  accentToken?: 'amber' | 'rose' | 'teal' | 'sky' | 'fuchsia';
  targetQuestions?: number;
  moduleCount?: number;
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
  accentColor: string; // e.g. 'blue' | 'purple' | 'emerald' | 'rose' | 'amber' | 'teal'
  route: string;
}
export type Course = CourseConfig;

export const COURSES: CourseConfig[] = [
  {
    id: 'gce204', slug: 'gce204', code: 'GCE 204',
    title: 'Psychology of Human Learning',
    department: 'General and Cross-Cutting Education', credits: '3 Units', level: '200-Level',
    aim: 'Explore psychological principles and strategies of human learning.',
    description: 'Master learning principles, behavioural and cognitive theories, memory, forgetting, motivation, and evidence-based study strategies with 300 practice questions.',
    shortDescription: 'Master learning principles, behavioural and cognitive theories, memory, forgetting, motivation, and evidence-based study strategies with 300 practice questions.',
    sessionCount: 8, moduleCount: 8, questionCount: 300, targetQuestions: 300,
    status: 'active', tags: ['Learning Theories', 'Memory', 'Motivation', 'Study Strategies'],
    accentColor: 'rose', accentToken: 'rose', route: '/course/gce204',
  },
  {
    id: 'ana214', slug: 'ana214', code: 'ANA 214',
    title: 'Gross Anatomy: Upper Limb, Lower Limb & Thorax',
    department: 'Department of Anatomy', credits: '3 Units', level: '200-Level',
    aim: 'Study regional anatomy of the limbs and thorax.',
    description: 'Master regional osteology, musculature, neurovascular pathways, brachial plexus, and thoracic surface anatomy with 300 high-yield practice questions.',
    shortDescription: 'Master regional osteology, musculature, neurovascular pathways, brachial plexus, and thoracic surface anatomy with 300 high-yield practice questions.',
    sessionCount: 7, moduleCount: 7, questionCount: 300, targetQuestions: 300,
    status: 'active', tags: ['Upper Limb', 'Lower Limb', 'Thorax'],
    accentColor: 'amber', accentToken: 'amber', route: '/course/ana214',
  },
  {
    id: 'nsg222',
    slug: 'nsg222',
    code: 'NSG 222',
    title: 'Basic Concepts in Medical-Surgical Nursing',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master clinical pathophysiology and nursing management across pain, fatigue, inflammation, immunity, fluid-electrolyte balance, shock, and oncology.',
    description: 'Master clinical pathophysiology and nursing management across pain, fatigue, inflammation, immunity, fluid-electrolyte balance, shock, and oncology with 300 practice questions.',
    shortDescription: 'Master clinical pathophysiology and nursing management across pain, fatigue, inflammation, immunity, fluid-electrolyte balance, shock, and oncology with 300 practice questions.',
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['Pain & Fatigue', 'Inflammation & Healing', 'Immunity & Autoimmunity', 'Fluid & Electrolyte Balance', 'Shock States', 'Oncology & Neoplasms'],
    accentColor: 'teal',
    accentToken: 'teal',
    route: '/course/nsg222',
  },
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
    id: 'ana213',
    code: 'ANA 213',
    title: 'Introduction to Anatomy & Embryology',
    department: 'Department of Anatomy',
    credits: '3 Units',
    level: '200-Level; First Semester',
    aim: 'Introduce basic concepts of human gross anatomy, anatomical terminology, and developmental embryology from gametogenesis to organogenesis.',
    description: 'Master general anatomy terminology, anatomical planes, human embryology, and early embryonic development with 300 University of Ibadan-aligned practice questions.',
    sessionCount: 8,
    questionCount: 300,
    status: 'active',
    tags: ['Gross Anatomy', 'Embryology', 'Gametogenesis', 'Germ Layers', 'Organogenesis'],
    accentColor: 'emerald',
    route: '/course/ana213',
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
  return COURSES.find((course) => course.id === 'nsg215')!;
}
