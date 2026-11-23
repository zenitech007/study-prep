export interface CourseConfig {
  id: string; // e.g. 'nsg215'
  slug?: string;
  shortDescription?: string;
  accentToken?: 'amber' | 'rose' | 'teal' | 'sky' | 'fuchsia' | 'indigo' | 'violet' | 'orange' | 'cyan' | 'purple';
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
  status: 'active' | 'coming_soon' | 'locked';
  lockReason?: string;
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
    status: 'locked',
    lockReason: 'Previous Semester',
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
    status: 'locked',
    lockReason: 'Previous Semester',
    tags: ['Gross Anatomy', 'Embryology', 'Gametogenesis', 'Germ Layers', 'Organogenesis'],
    accentColor: 'emerald',
    route: '/course/ana213',
  },
  {
    id: 'nsg223',
    slug: 'nsg223',
    code: 'NSG 223',
    title: 'Fundamentals of Maternal and Child Health Nursing',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master MCH frameworks, family-centred maternity care, midwifery regulations, clinical ethics, informed consent, and nursing theories.',
    description: 'Master MCH frameworks, family-centred maternity care, midwifery regulations, clinical ethics, informed consent, and nursing theories with 300 practice questions.',
    shortDescription: 'Master MCH frameworks, family-centred maternity care, midwifery regulations, clinical ethics, informed consent, and nursing theories with 300 practice questions.',
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['MCH Frameworks', 'Family-Centred Care', 'Midwifery Regulations', 'Clinical Ethics', 'Informed Consent', 'Nursing Theories'],
    accentColor: 'fuchsia',
    accentToken: 'fuchsia',
    route: '/course/nsg223',
  },
  {
    id: 'nsg225',
    slug: 'nsg225',
    code: 'NSG 225',
    title: 'Child Health Nursing',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master child growth and development, developmental theories, behavioural disorders, child survival strategies (Growth Monitoring, ORT, EBF, NPI), childhood diseases, and IMNCI.',
    description: 'Master child growth and development, developmental theories, behavioural disorders, child survival strategies (Growth Monitoring, ORT, EBF, NPI), childhood diseases, and IMNCI with 300 practice questions.',
    shortDescription: 'Master child growth and development, developmental theories, behavioural disorders, child survival strategies (Growth Monitoring, ORT, EBF, NPI), childhood diseases, and IMNCI with 300 practice questions.',
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['Growth & Development', 'Developmental Theories', 'Child Survival Strategies', 'ORT & EBF', 'Childhood Diseases', 'IMNCI'],
    accentColor: 'indigo',
    accentToken: 'indigo',
    route: '/course/nsg225',
  },
  {
    id: 'nsg229',
    slug: 'nsg229',
    code: 'NSG 229',
    title: 'Nursing Process',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master nursing professionalism, metaparadigm concepts, health assessment & GCS, NANDA-I Taxonomy II diagnoses, quality care evaluation, and standardized documentation (NMDS, NIC, NOC).',
    description: 'Master nursing professionalism, metaparadigm concepts, health assessment & GCS, NANDA-I Taxonomy II diagnoses, quality care evaluation, and standardized documentation (NMDS, NIC, NOC) with 300 practice questions.',
    shortDescription: 'Master nursing professionalism, metaparadigm concepts, health assessment & GCS, NANDA-I Taxonomy II diagnoses, quality care evaluation, and standardized documentation (NMDS, NIC, NOC) with 300 practice questions.',
    sessionCount: 6,
    moduleCount: 6,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['Professionalism', 'Nursing Metaparadigm', 'Health Assessment & GCS', 'NANDA-I Taxonomy II', 'Quality Evaluation', 'NMDS, NIC & NOC'],
    accentColor: 'violet',
    accentToken: 'violet',
    route: '/course/nsg229',
  },
  {
    id: 'nsg232',
    slug: 'nsg232',
    code: 'NSG 232',
    title: 'Nursing Practical II',
    department: 'Department of Nursing Science',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master hands-on clinical procedures including tepid sponging, Braden Scale pressure ulcer prevention, therapeutic positioning, urine/nose/throat/sputum specimen collection, catheterization, sterile wound dressing, I&O monitoring, and IV infusion therapy.',
    description: 'Master hands-on clinical procedures including tepid sponging, Braden Scale pressure ulcer prevention, therapeutic positioning, urine/nose/throat/sputum specimen collection, catheterization, sterile wound dressing, I&O monitoring, and IV infusion therapy with 300 practice questions.',
    shortDescription: 'Master hands-on clinical procedures including tepid sponging, Braden Scale pressure ulcer prevention, therapeutic positioning, urine/nose/throat/sputum specimen collection, catheterization, sterile wound dressing, I&O monitoring, and IV infusion therapy with 300 practice questions.',
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['Tepid Sponging', 'Pressure Ulcer Prevention', 'Therapeutic Positioning', 'Specimen Collection', 'Urinary Catheterization', 'Wound Dressing', 'I&O Monitoring', 'IV Therapy'],
    accentColor: 'sky',
    accentToken: 'sky',
    route: '/course/nsg232',
  },
  {
    id: 'pio206',
    slug: 'pio206',
    code: 'PIO 206',
    title: 'Introduction to Human Physiology',
    department: 'Department of Physiology',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master gastrointestinal motility & nutrient absorption, renal filtration/clearance & micturition, male/female reproductive endocrinology, pregnancy, fetal circulation, cardiac cycle, and ECG physiology.',
    description: 'Master gastrointestinal motility & nutrient absorption, renal filtration/clearance & micturition, male/female reproductive endocrinology, pregnancy, fetal circulation, cardiac cycle, and ECG physiology with 300 practice questions.',
    shortDescription: 'Master gastrointestinal motility & nutrient absorption, renal filtration/clearance & micturition, male/female reproductive endocrinology, pregnancy, fetal circulation, cardiac cycle, and ECG physiology with 300 practice questions.',
    sessionCount: 6,
    moduleCount: 6,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: ['Gastrointestinal Physiology', 'Digestive Enzymes', 'Renal Physiology', 'Reproductive Endocrinology', 'Pregnancy & Fetal Circulation', 'Cardiovascular & ECG'],
    accentColor: 'orange',
    accentToken: 'orange',
    route: '/course/pio206',
  },
  {
    id: 'psy205',
    slug: 'psy205',
    code: 'PSY 205',
    title: 'Developmental Psychology',
    department: 'Department of Psychology',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master human development across the lifespan from conception to late adulthood.',
    description: "Master Baltes' lifespan perspective, Bronfenbrenner's ecological systems, Freud, Erikson, Piaget, Pavlov, Skinner, Bandura, Bowlby/Ainsworth attachment, prenatal & newborn reflexes, childhood cognition, and Levinger's relationships across the lifespan with 300 practice questions.",
    shortDescription: "Master Baltes' lifespan perspective, Bronfenbrenner's ecological systems, Freud, Erikson, Piaget, Pavlov, Skinner, Bandura, Bowlby/Ainsworth attachment, prenatal & newborn reflexes, childhood cognition, and Levinger's relationships across the lifespan with 300 practice questions.",
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: [
      'Lifespan Perspective',
      'Ecological Systems',
      'Psychosexual & Psychosocial',
      'Cognitive & Attachment',
      'Prenatal Development',
      'Neonatal Reflexes',
      'Childhood & Adolescence',
      'Adulthood & Aging',
    ],
    accentColor: 'cyan',
    accentToken: 'cyan',
    route: '/course/psy205',
  },
  {
    id: 'psm201',
    slug: 'psm201',
    code: 'PSM 201',
    title: 'Introduction to Human Biostatistics',
    department: 'Department of Preventive & Social Medicine',
    credits: '3 Units',
    level: '200-Level; Second Semester',
    aim: 'Master measurement scales, sampling techniques, descriptive tables/graphs, central tendency & dispersion, probability laws, Binomial/Poisson/Normal distributions, confidence intervals, t-tests, Chi-Square, and correlation/regression with 300 practice questions.',
    description: 'Master measurement scales, sampling techniques, descriptive tables/graphs, central tendency & dispersion, probability laws, Binomial/Poisson/Normal distributions, confidence intervals, t-tests, Chi-Square, and correlation/regression with 300 practice questions.',
    shortDescription: 'Master measurement scales, sampling techniques, descriptive tables/graphs, central tendency & dispersion, probability laws, Binomial/Poisson/Normal distributions, confidence intervals, t-tests, Chi-Square, and correlation/regression with 300 practice questions.',
    sessionCount: 8,
    moduleCount: 8,
    questionCount: 300,
    targetQuestions: 300,
    status: 'active',
    tags: [
      'Measurement Scales',
      'Sampling Methods',
      'Descriptive Statistics',
      'Central Tendency & Dispersion',
      'Probability & Distributions',
      'Confidence Intervals & t-Tests',
      'Chi-Square Association',
      'Correlation & Regression',
    ],
    accentColor: 'purple',
    accentToken: 'purple',
    route: '/course/psm201',
  },
];

export function getAllCourses(): Course[] {
  return [...COURSES].sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') return -1;
    if (a.status !== 'active' && b.status === 'active') return 1;
    return 0;
  });
}

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id.toLowerCase() === id.toLowerCase());
}

export function getActiveCourse(): Course {
  return COURSES.find((course) => course.status === 'active') || COURSES[0];
}
