const fs = require('fs');
const path = require('path');

const manualPath = path.join(__dirname, '../src/data/courseManual.json');
const starterPath = path.join(__dirname, '../public/data/NSG215-question-bank-starter.json');

const starter = JSON.parse(fs.readFileSync(starterPath, 'utf8'));

// New converted questions from official SAQs and ITQs
const manualMCQs = [
  // ── Session 1 ──────────────────────────────────────────────
  {
    id: "nsg215-m01",
    topic: "Introduction to Human Behavior and Illness",
    subtopic: "Disease Definition",
    difficulty: "beginner",
    type: "recall",
    stem: "According to the NSG 215 course manual, what is defined as 'a definite strange condition, a disorder of outlook or function that affects part or all of an organism'?",
    options: ["An illness", "A disease", "A syndrome", "A disability"],
    correctIndex: 1,
    explanation: {
      correct: "In the manual, disease is specifically defined as a definite strange condition or disorder of outlook or function affecting part or all of an organism.",
      distractors: [
        "Illness is a highly personal, subjective state where functioning is thought to be diminished.",
        "A syndrome refers to a group of concurrent symptoms rather than the single underlying disorder.",
        "Disability refers to restriction or lack of ability to perform an activity within the normal human range."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m02",
    topic: "Introduction to Human Behavior and Illness",
    subtopic: "Norms & Values",
    difficulty: "beginner",
    type: "recall",
    stem: "The norm or standard of behavior that is considered vital or appropriate in human society is termed:",
    options: ["Belief", "Value", "Attitude", "Cognition"],
    correctIndex: 1,
    explanation: {
      correct: "Value is defined as the norm or standard of behavior that is considered vital or appropriate by an individual or society.",
      distractors: [
        "Belief refers to acceptance that a statement is true or that something exists without empirical certainty.",
        "Attitude is a settled way of thinking or feeling about someone or something.",
        "Cognition is the mental action or process of acquiring knowledge and understanding through thought and experience."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m03",
    topic: "Introduction to Human Behavior and Illness",
    subtopic: "Definition of Behavior",
    difficulty: "intermediate",
    type: "recall",
    stem: "In Study Session 1 (SAQ 1.1), human behavior is defined fundamentally as:",
    options: [
      "The innate, unmodifiable genetic reflexes of a person",
      "The response of an individual or group to an action, environment, person, or stimulus",
      "Only the unconscious psychological defense mechanisms against anxiety",
      "A purely pathological deviation from biological norms"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The manual defines behavior as the response of an individual or group to an action, environment, person, or stimulus.",
      distractors: [
        "Behavior includes learned, observable, and adaptable responses, not merely innate genetic reflexes.",
        "Unconscious defense mechanisms are only one aspect of psychological functioning, not the overall definition of behavior.",
        "Human behavior encompasses both healthy adaptive responses and maladaptive behaviors, not only pathology."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m04",
    topic: "Introduction to Human Behavior and Illness",
    subtopic: "Health Belief Model Conditions",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A nurse is counseling a market woman who has a positive family history of hypertension. According to the Health Belief Model (SAQ 1.3), which two core conditions must be met for her to take preventative action?",
    options: [
      "Perception that hospital care is free AND expectation of immediate recovery",
      "Belief of susceptibility to the disease AND belief that the disease would have a moderately severe impact on her life",
      "Peer pressure from family members AND fear of stigmatization",
      "High educational attainment AND access to private specialist clinics"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The Health Belief Model posits that an individual acts when they perceive themselves as susceptible and believe the condition's occurrence will have moderately severe consequences.",
      distractors: [
        "Cost and recovery time are secondary factors, not the two foundational readiness conditions.",
        "Stigmatization and peer pressure are social pressures, not the primary core tenets of the HBM.",
        "Education level and private care access are demographic/modifying variables, not the primary cognitive drivers."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 2 ──────────────────────────────────────────────
  {
    id: "nsg215-m05",
    topic: "Illness and Disease",
    subtopic: "Chronic vs Acute Illness",
    difficulty: "beginner",
    type: "recall",
    stem: "According to the manual, an illness that lasts for an extended period (typically six months or longer) and often exhibits periods of remission and exacerbation is classified as:",
    options: ["An acute illness", "A chronic illness", "A terminal disorder", "A latent infection"],
    correctIndex: 1,
    explanation: {
      correct: "Chronic illness is characterized by lasting extended periods (usually 6 months or longer), often with remission and exacerbation (e.g., sickle cell anemia).",
      distractors: [
        "Acute illness has an abrupt onset and relatively short duration that typically resolves.",
        "Terminal disorder refers specifically to an incurable disease resulting in death, not all long-term conditions.",
        "Latent infection refers to an asymptomatic pathogenic state, not the overall classification of illness duration."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m06",
    topic: "Illness and Disease",
    subtopic: "Classification of Diseases",
    difficulty: "beginner",
    type: "recall",
    stem: "In Study Session 2 (ITQ 2.2), which of the following is NOT an official recognized category in the manual's disease classification list?",
    options: ["Cancer", "Injury", "Brain / Nervous System Diseases", "Trypanosotic disease"],
    correctIndex: 3,
    explanation: {
      correct: "'Trypanosotic disease' is a distractor; the manual specifically lists categories like Cancer, Injury, Brain/Nervous System Diseases, and others.",
      distractors: [
        "Cancer is an official major recognized category in the manual.",
        "Injury is an explicitly listed disease category in the manual.",
        "Brain / Nervous System Diseases is a listed disease category in the manual."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m07",
    topic: "Illness and Disease",
    subtopic: "Illness vs Disease Definition",
    difficulty: "intermediate",
    type: "recall",
    stem: "How does the manual (SAQ 2.1) distinguish the concept of 'Illness' from 'Disease'?",
    options: [
      "Illness is a physical cellular defect, whereas disease is an emotional psychological response",
      "Illness is a highly personal state where functioning is thought to be diminished, whereas disease is a disorder/interruption of body structure or function",
      "Illness only affects children, whereas disease only affects adult patients",
      "Illness is always fatal, whereas disease always resolves spontaneously"
    ],
    correctIndex: 1,
    explanation: {
      correct: "Illness is a subjective, highly personal experience of diminished functioning, while disease is an objective biological interruption or disorder of organ structure/function.",
      distractors: [
        "The definitions are inverted; disease has an objective cellular/pathological basis, illness is the personal experience.",
        "Both illness and disease can affect any age group across the human lifespan.",
        "Illness is not inherently fatal, and disease does not always resolve spontaneously."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m08",
    topic: "Illness and Disease",
    subtopic: "Childhood Illness Behavior",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A 4-year-old child admitted to the pediatric surgical ward cries intensely whenever the nurse approaches with a syringe, believing the hospital admission is a punishment for misbehaving at home. According to SAQ 2.3, this behavior reflects:",
    options: [
      "Childhood illness behavior shaped by misperception and tension produced by medical procedures",
      "Calculated adult-type manipulative malingering",
      "Advanced cognitive intellectualization of hospital care",
      "An acute psychosis caused by separation anxiety"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The manual notes that children's illness reactions depend on developmental stage, tension produced by hospitalization, and common misperceptions about procedures as punishment.",
      distractors: [
        "Malingering requires conscious deceit for secondary gain, which does not apply to a frightened 4-year-old.",
        "Intellectualization is an adult defense mechanism using detached logic.",
        "Normal developmental stress and fear of medical procedures do not constitute psychosis."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 3 ──────────────────────────────────────────────
  {
    id: "nsg215-m09",
    topic: "Medication Adherence",
    subtopic: "Methods of Assessment",
    difficulty: "beginner",
    type: "recall",
    stem: "Which of the following is considered a DIRECT method of assessing medication adherence, rather than an indirect method?",
    options: ["Pharmacist refill records", "Pill counts", "Directly observed therapy (DOT)", "Patient self-report diaries"],
    correctIndex: 2,
    explanation: {
      correct: "Direct methods include directly observed therapy (DOT), blood level assays, and biological metabolite markers. Pill counts and refill rates are indirect.",
      distractors: [
        "Pharmacist refill rates are an indirect method of measuring adherence.",
        "Pill counts are an indirect method (patients may discard pills).",
        "Self-reports and diaries are indirect methods subject to recall bias and social desirability."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m10",
    topic: "Medication Adherence",
    subtopic: "Cultural & Religious Factors",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A 52-year-old hypertensive patient abruptly stops taking his prescribed antihypertensive medication because his religious gathering has declared a 21-day dry fasting program. What does this clinical scenario demonstrate?",
    options: [
      "Medication non-adherence driven by cultural and religious belief systems",
      "Direct drug allergy causing spontaneous therapy termination",
      "Intentional pharmacokinetic drug-drug antagonism",
      "Incompetence of the attending pharmacy dispenser"
    ],
    correctIndex: 0,
    explanation: {
      correct: "Cultural and religious beliefs strongly influence health behaviors and medication adherence, requiring nurses to actively engage and accommodate patient values.",
      distractors: [
        "The patient stopped because of religious fasting, not due to an adverse allergic reaction.",
        "Fasting is not a chemical drug-drug antagonism.",
        "The issue stems from cultural/spiritual conflict, not dispenser negligence."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m11",
    topic: "Medication Adherence",
    subtopic: "Tackling Non-Adherence",
    difficulty: "intermediate",
    type: "recall",
    stem: "Study Session 3 (SAQ 3.3) recommends which systemic strategy to help patients and families maintain consistent medication adherence?",
    options: [
      "Discharging non-compliant patients permanently from the hospital register",
      "Creating patient-centered projects, family tracking, and shared clinical databases",
      "Doubling the drug dosage whenever a patient skips a day",
      "Confining all non-compliant patients to inpatient isolation"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The manual emphasizes patient-centered initiatives, family involvement, digital registers/apps, and open patient-staff communication to boost adherence.",
      distractors: [
        "Punitive discharge violates medical ethics and worsens patient outcomes.",
        "Doubling doses can cause dangerous drug toxicity and is medically contraindicated.",
        "Isolation is meant for contagious pathogens, not chronic non-adherence."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m12",
    topic: "Medication Adherence",
    subtopic: "Nurse's Role in Adherence",
    difficulty: "intermediate",
    type: "recall",
    stem: "In Study Session 3 (SAQ 3.4), what is highlighted as an indispensable nursing responsibility in ensuring medication adherence?",
    options: [
      "Assuming the patient will read and understand the drug package insert independently",
      "Emphasizing regimen value, evaluating health literacy, and acting as a patient advocate",
      "Instructing the patient to alter doses based on daily symptom fluctuations",
      "Delegating all drug education entirely to commercial patent medicine vendors"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The nurse must emphasize regimen value, actively listen, assess the patient's literacy level, and act as a compassionate patient advocate.",
      distractors: [
        "Assuming patient literacy without assessment frequently leads to medication errors.",
        "Patients must not alter dosages without clinician consultation.",
        "Nursing retains core accountability for health education and patient advocacy."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 4 ──────────────────────────────────────────────
  {
    id: "nsg215-m13",
    topic: "Illness Cognition",
    subtopic: "Illness Perception Dimensions",
    difficulty: "beginner",
    type: "recall",
    stem: "Under Leventhal's Illness Perception framework (SAQ 4.2), the dimension that refers to 'a patient's beliefs about how long the illness will last' is known as:",
    options: ["Identity", "Timeline", "Consequences", "Cure/Control"],
    correctIndex: 1,
    explanation: {
      correct: "Timeline refers to beliefs regarding the trajectory and duration of the illness (acute, chronic, or cyclical).",
      distractors: [
        "Identity involves the label or diagnosis and the associated symptoms perceived.",
        "Consequences refers to beliefs about the anticipated physical, financial, and emotional impact.",
        "Cure/Control reflects beliefs about whether the condition can be treated, managed, or cured."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m14",
    topic: "Illness Cognition",
    subtopic: "Germ Theory vs Reductionism",
    difficulty: "intermediate",
    type: "recall",
    stem: "Which disease causation theory states a strict 'one-to-one relationship between a causal biological agent and a specific disease'?",
    options: [
      "Germ theory of disease",
      "Biopsychosocial model",
      "General Adaptation Syndrome",
      "Community stress prevention model"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The Germ Theory states a linear, single-factor relationship where a specific causal microorganism produces a specific disease.",
      distractors: [
        "The biopsychosocial model incorporates multi-factorial biological, psychological, and social determinants.",
        "General Adaptation Syndrome describes physiological response stages to prolonged systemic stress.",
        "Community stress prevention model focuses on multifaceted coping dimensions in communities."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m15",
    topic: "Illness Cognition",
    subtopic: "Epidemiological Triad",
    difficulty: "intermediate",
    type: "recall",
    stem: "According to the Epidemiological Triad of disease causation (SAQ 4.3), clinical disease results from continuous dynamic interactions between:",
    options: [
      "Doctor, Nurse, and Pharmacist",
      "Agent, Host, and Environment",
      "Id, Ego, and Superego",
      "Sympathetic, Parasympathetic, and Somatic systems"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The epidemiological triad model posits that disease arises through interactions between the causal Agent, the susceptible Host, and the external Environment.",
      distractors: [
        "Doctor, nurse, and pharmacist are members of the healthcare multidisciplinary team.",
        "Id, ego, and superego are Freudian intrapsychic personality structures.",
        "Sympathetic and parasympathetic systems are divisions of the autonomic nervous system."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m16",
    topic: "Illness Cognition",
    subtopic: "Biological Model Characteristics",
    difficulty: "advanced",
    type: "recall",
    stem: "Why is the traditional Biological Model of disease causation (SAQ 4.4) criticized as 'reductionist'?",
    options: [
      "It views the mind and body as unified with equal weight on psychosocial factors",
      "It regards the mind and body as separate entities and emphasizes physical illness concerns over holistic health",
      "It focuses exclusively on community-wide socioeconomic poverty",
      "It rejects laboratory and pharmacological interventions completely"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The biomedical model is reductionist because it treats mind and body dualistically (Cartesian dualism) and focuses purely on biological lesions over holistic wellness.",
      distractors: [
        "Viewing mind and body as unified describes the holistic biopsychosocial paradigm.",
        "The biomedical model historically neglected socioeconomic poverty in favor of cellular pathology.",
        "The biological model heavily relies on laboratory and pharmacological treatments."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 5 ──────────────────────────────────────────────
  {
    id: "nsg215-m17",
    topic: "Coping Models with Adaptation to Illness",
    subtopic: "Definition of Coping",
    difficulty: "beginner",
    type: "recall",
    stem: "According to the International Red Cross definition cited in the NSG 215 manual (SAQ 5.1), what is coping?",
    options: [
      "Complete eradication of all environmental stress within 24 hours",
      "Anything people do to adjust to the challenges and demands of stress to reduce its negative impact",
      "The automatic involuntary autonomic reflex of pupil dilation",
      "Only the medical administration of sedative pharmacotherapy"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The Red Cross defines coping as anything individuals do to adjust to the challenges and demands of stress to reduce its negative consequences.",
      distractors: [
        "Stress can rarely be entirely eradicated; coping focuses on adjustment and mitigation.",
        "Pupillary reflex is an involuntary neurological sign, not intentional coping.",
        "Coping incorporates broad psychological, behavioral, and social strategies beyond medication."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m18",
    topic: "Coping Models with Adaptation to Illness",
    subtopic: "Universal Stressors",
    difficulty: "intermediate",
    type: "recall",
    stem: "Study Session 5 (SAQ 5.4) identifies three universal stressors that threaten core human psychological needs. Which triad is correct?",
    options: [
      "Neglect (threatens relatedness), Chaos (undermines competence), and Coercion (impinges on autonomy)",
      "Poverty, Malaria, and Malnutrition",
      "Fever, Inflammation, and Infection",
      "Denial, Anger, and Bargaining"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The manual identifies Neglect (undermining relatedness), Chaos (undermining competence), and Coercion (undermining autonomy) as universal stressors.",
      distractors: [
        "Poverty, malaria, and malnutrition are socioeconomic and physical disease burdens.",
        "Fever, inflammation, and infection are cardinal physiological pathology processes.",
        "Denial, anger, and bargaining are stages of Kübler-Ross's grief model."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m19",
    topic: "Coping Models with Adaptation to Illness",
    subtopic: "Community Stress Prevention Dimensions",
    difficulty: "advanced",
    type: "recall",
    stem: "The Community Stress Prevention Model (BASIC Ph model / SAQ 5.5) identifies six core dimensions used by individuals and communities to cope with adversity. These dimensions are:",
    options: [
      "Beliefs/Values, Affection, Social, Imagination, Cognitive, and Physiological",
      "Acute, Chronic, Severe, Moderate, Mild, and Subclinical",
      "Sympathy, Empathy, Apathy, Antipathy, Denial, and Projection",
      "Income, Education, Housing, Sanitation, Nutrition, and Transportation"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The six BASIC Ph dimensions are Beliefs/Values, Affect/Affection, Social, Imagination, Cognitive, and Physiological.",
      distractors: [
        "Acute, chronic, and severe are clinical descriptors of illness duration and intensity.",
        "Sympathy and empathy are interpersonal communication traits.",
        "Income, housing, and nutrition are social determinants of health."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m20",
    topic: "Coping Models with Adaptation to Illness",
    subtopic: "Responses to Stress Coping Types",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A 16-year-old with newly diagnosed asthma tries to adapt by doing breathing exercises when anxious and learning cognitive reframing to accept the condition. According to SAQ 5.3, adapting via cognitive reframing and acceptance is an example of:",
    options: ["Disengagement Coping", "Primary Control Coping", "Secondary Control Coping", "Pathological Regression"],
    correctIndex: 2,
    explanation: {
      correct: "Secondary control coping involves adapting to stress through cognitive reappraisal, acceptance, and positive adjustment.",
      distractors: [
        "Disengagement coping involves avoiding or redirecting attention away from the problem.",
        "Primary control coping attempts to actively alter or modify the external stressor itself.",
        "Regression is reverting to immature childish behaviors under severe stress."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 6 ──────────────────────────────────────────────
  {
    id: "nsg215-m21",
    topic: "Coping Response",
    subtopic: "Physiological Coping Mechanism",
    difficulty: "beginner",
    type: "recall",
    stem: "In Study Session 6 (SAQ 6.1), the physiological 'fight or flight' coping response triggered by environmental threat is mediated by the sympathetic/adrenal secretion of:",
    options: ["Insulin and Glucagon", "Epinephrine and Norepinephrine", "Estrogen and Progesterone", "Thyroxine and Calcitonin"],
    correctIndex: 1,
    explanation: {
      correct: "The sympathetic-adrenal medullary axis secretes epinephrine and norepinephrine to rapidly prepare the body for the 'fight or flight' response.",
      distractors: [
        "Insulin and glucagon regulate glucose homeostasis in the pancreas.",
        "Estrogen and progesterone are female reproductive hormones.",
        "Thyroxine and calcitonin regulate basal metabolism and calcium homeostasis."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m22",
    topic: "Coping Response",
    subtopic: "Crisis Stage Response",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A patient admitted to the ICU after a catastrophic cerebrovascular accident appears confused, disoriented to time, and directed entirely toward immediate survival and panic control. According to SAQ 6.2, which stage of illness response does this portray?",
    options: ["Rehabilitation stage", "Crisis stage of illness", "Acceptance stage", "Termination stage"],
    correctIndex: 1,
    explanation: {
      correct: "In the crisis stage, patients are severely ill, frightened, time is distorted, disorientation is common, and energy is consumed by panic control.",
      distractors: [
        "The rehabilitation stage focuses on regaining functional independence after acute stabilization.",
        "The acceptance stage occurs when the patient has processed the diagnosis and achieves psychological equilibrium.",
        "The termination stage relates to the discharge and resolution phase of the therapeutic relationship."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m23",
    topic: "Coping Response",
    subtopic: "Factors Affecting Diagnosis Reaction",
    difficulty: "intermediate",
    type: "recall",
    stem: "How a patient reacts psychologically when receiving a serious chronic diagnosis (SAQ 6.3) depends predominantly on which three conditions?",
    options: [
      "The hospital's architecture, vehicle parking availability, and room painting",
      "The severity of the illness, available social support, and the patient's pre-illness personality",
      "The patient's blood group, genotype, and eye color",
      "The time of day, current weather conditions, and lunar cycle"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The manual states that reaction to chronic diagnosis depends on: illness severity, level of social support available, and pre-illness personality structure.",
      distractors: [
        "Physical architecture is secondary compared to interpersonal and psychological dynamics.",
        "Genotype determines biological trait inheritance, but personality and social support shape psychological coping.",
        "Weather conditions do not determine long-term adaptation to chronic illness."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m24",
    topic: "Coping Response",
    subtopic: "Cultural Traits Influencing Coping",
    difficulty: "intermediate",
    type: "recall",
    stem: "In Study Session 6 (SAQ 6.4), which of the following cultural traits can profoundly influence how an individual experiences and copes with illness?",
    options: [
      "Forbearance, perseverance, sacrifice, and cultural stigma/guilt",
      "Reflex arc, tendon jerk, and Babinski sign",
      "Systolic blood pressure, pulse pressure, and cardiac output",
      "Serum sodium, serum potassium, and serum urea"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The manual explicitly lists forbearance, perseverance, sacrifice, discrimination, stigmatization, guilt, and shame as cultural influences on coping.",
      distractors: [
        "Reflex arc and Babinski sign are neurological physical examination findings.",
        "Blood pressure and pulse pressure are cardiovascular hemodynamic parameters.",
        "Electrolytes are biochemical laboratory markers."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 7 ──────────────────────────────────────────────
  {
    id: "nsg215-m25",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Cognitive Appraisal",
    difficulty: "intermediate",
    type: "recall",
    stem: "The logical analysis and cognitive redefinition of the meaning or significance of an illness, its threats, and one's coping resources is called:",
    options: ["Cognitive appraisal", "Somatization", "Delusion", "Sensory deprivation"],
    correctIndex: 0,
    explanation: {
      correct: "Cognitive appraisal is the process of evaluating the significance of a stressor and assessing coping resources to handle it.",
      distractors: [
        "Somatization is the expression of psychological distress through physical bodily symptoms.",
        "Delusion is a fixed, false belief resistant to contrary evidence.",
        "Sensory deprivation is the deliberate reduction or removal of stimuli from senses."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m26",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Ego Defense Mechanisms",
    difficulty: "intermediate",
    type: "recall",
    stem: "According to Study Session 7 (ITQ 7.3), the defense mechanism where an individual covers up for a weakness by overemphasizing a desirable trait is:",
    options: ["Projection", "Compensation", "Regression", "Displacement"],
    correctIndex: 1,
    explanation: {
      correct: "Compensation is an ego defense mechanism where someone covers up perceived deficiencies by excelling in another area.",
      distractors: [
        "Projection is attributing one's unacceptable thoughts or impulses to others.",
        "Regression is reverting to an earlier developmental stage under stress.",
        "Displacement is redirecting emotions from the original source to a safer substitute target."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m27",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Rationalization vs Intellectualization",
    difficulty: "advanced",
    type: "recall",
    stem: "In Study Session 7 (SAQ 7.3), how are Rationalization and Intellectualization distinguished?",
    options: [
      "Rationalization attempts to prove feelings/behaviors are justifiable; Intellectualization uses detached logical explanations devoid of affective emotion",
      "Rationalization occurs only in children; Intellectualization occurs only in elderly patients",
      "Rationalization involves hallucinations; Intellectualization involves physical muscle paralysis",
      "Both mechanisms are identical and represent conscious malingering"
    ],
    correctIndex: 0,
    explanation: {
      correct: "Rationalization creates plausible justifications for one's actions; Intellectualization strips emotional components away through detached, sterile logic.",
      distractors: [
        "Both defense mechanisms occur across diverse age groups in adolescent and adult cognition.",
        "Neither mechanism involves hallucinations or motor paralysis.",
        "Defense mechanisms are unconscious ego adaptations, not conscious malingering."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m28",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Grief vs Mourning",
    difficulty: "intermediate",
    type: "recall",
    stem: "What is the primary difference between 'Grief' and 'Mourning' as explained in Study Session 7 (SAQ 7.4)?",
    options: [
      "Grief is a contagious pathogen, whereas mourning is an autoimmune reaction",
      "Grief is the internal emotional process of loss, whereas mourning is the outward cultural expression and social dealing with the void",
      "Grief only occurs after financial loss, whereas mourning occurs only in hospitals",
      "Grief lasts 2 days, whereas mourning lasts 20 years in all individuals"
    ],
    correctIndex: 1,
    explanation: {
      correct: "Grief is the internal emotional reaction to loss; mourning is the external social and cultural expression of that grief.",
      distractors: [
        "Grief and mourning are psychological and sociological processes, not infectious pathogens.",
        "Grief occurs following many types of significant loss, especially death of loved ones.",
        "Grief duration varies widely based on individual resilience and cultural rituals."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m29",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Complicated / Abnormal Grief",
    difficulty: "intermediate",
    type: "recall",
    stem: "In Study Session 7 (SAQ 7.5), abnormal or complicated grief is categorized into which recognized forms?",
    options: [
      "Chronic grief, Delayed grief, Disenfranchised grief, Exaggerated grief, and Masked/Sudden grief",
      "Mild, moderate, severe, and catastrophic grief",
      "Pediatric grief and geriatric grief only",
      "Somatic, visceral, and neuropathic grief"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The manual identifies complicated grief variants: chronic (prolonged), delayed (suppressed until later), disenfranchised (unacknowledged by society), and exaggerated grief.",
      distractors: [
        "Mild/moderate/severe is a generic grading scale, not the clinical categories in the manual.",
        "Complicated grief affects individuals across multiple developmental periods.",
        "Somatic, visceral, and neuropathic are classifications of physical pain."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m30",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Awareness of Dying Contexts",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A cancer patient and his family openly discuss the patient's terminal prognosis with the hospice healthcare team, allowing shared decision-making regarding palliative comfort goals. In Study Session 7 (ITQ 7.6), this awareness context is termed:",
    options: ["Closed Awareness", "Suspected Awareness", "Mutual Pretense", "Open Awareness"],
    correctIndex: 3,
    explanation: {
      correct: "Open Awareness exists when both patient and healthcare team freely acknowledge impending death and openly plan appropriate care.",
      distractors: [
        "Closed awareness occurs when the staff and family keep the fatal prognosis secret from the patient.",
        "Suspected awareness occurs when the patient suspects the truth but staff do not confirm it.",
        "Mutual pretense occurs when everyone knows the patient is dying, but all act as if recovery is expected."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m31",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Elderly Perception of Grief",
    difficulty: "intermediate",
    type: "recall",
    stem: "According to Study Session 7 (SAQ 7.6), how does the 65 years and older age group commonly perceive grief and mortality?",
    options: [
      "They believe death is completely impossible and a temporary illusion",
      "They have experienced deaths of peers and family, making them see death as inevitable while fearing prolonged debilitating illness",
      "They exhibit severe separation anxiety similar to infants aged under 6 months",
      "They deny all physical health problems and never utilize healthcare"
    ],
    correctIndex: 1,
    explanation: {
      correct: "Older adults often see death as inevitable due to peer loss, but frequently harbor significant fear of prolonged suffering and losing independence.",
      distractors: [
        "Believing death is temporary is characteristic of preschool children (under 5 years).",
        "Infant separation anxiety is a developmental attachment reaction, not typical geriatric grief.",
        "Older adults are the highest consumers of medical and palliative healthcare."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m32",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Core Fears in Terminal Illness",
    difficulty: "intermediate",
    type: "recall",
    stem: "Study Session 7 (SAQ 7.7) specifies that patients facing terminal illness commonly confront which triad of deep existential fears?",
    options: [
      "Fear of hospital fees, fear of needles, and fear of dark rooms",
      "Fear of pain, fear of loneliness/isolation, and fear of meaninglessness",
      "Fear of microbes, fear of surgery, and fear of food",
      "Fear of noise, fear of light, and fear of strangers"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The manual identifies three paramount existential fears in terminal illness: fear of intractable pain, fear of dying alone (loneliness), and fear of meaninglessness.",
      distractors: [
        "Financial strain and needles are procedural concerns, not the core existential fears listed.",
        "Fear of microbes represents germ phobia.",
        "Sensory phobias do not represent the terminal existential crisis."
      ]
    },
    sourceTag: "manual"
  },

  // ── Session 8 ──────────────────────────────────────────────
  {
    id: "nsg215-m33",
    topic: "Influences on the Sick",
    subtopic: "Economic Domain Impact",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A family's primary wage earner suffers kidney failure requiring bi-weekly hemodialysis. The spouse leaves her job to care for him, causing acute household income loss. In Study Session 8 (SAQ 8.1), this demonstrates the impact of chronic illness on the:",
    options: ["Scientific domain", "Economic domain", "Geographical domain", "Metabolic domain"],
    correctIndex: 1,
    explanation: {
      correct: "The economic domain is heavily impacted when chronic illness results in lost employment for both the patient and family caregivers, coupled with continuous treatment costs.",
      distractors: [
        "Scientific domain is not one of the patient life domains described in the manual.",
        "Geographical domain is not a patient life domain in this taxonomy.",
        "Metabolic relates to cellular physiology, not family financial strain."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m34",
    topic: "Influences on the Sick",
    subtopic: "Hospitalization Reaction in Preschoolers",
    difficulty: "intermediate",
    type: "recall",
    stem: "According to the manual's developmental breakdown of hospitalization reactions (ITQ 8.3), which age group is characterized primarily by 'helplessness, passivity, and generalized fear'?",
    options: ["Infancy to 5 years (preschool)", "10 to 12 years (preadolescent)", "18 to 25 years (young adult)", "65 years and older"],
    correctIndex: 0,
    explanation: {
      correct: "The manual notes that children from infancy to 5 years (preschool) characteristically react to hospitalization with passivity, helplessness, and generalized fear.",
      distractors: [
        "Preadolescents (10-12 years) typically exhibit anger, aggression, mood changes, and fear of death.",
        "Young adults worry about career interruption and altered body image.",
        "Older adults worry about prolonged loss of independence and peer loss."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m35",
    topic: "Influences on the Sick",
    subtopic: "Hospitalization Reaction in Preadolescents",
    difficulty: "intermediate",
    type: "recall",
    stem: "How does the 10 to 12 years (preadolescent) age group characteristically respond to hospital admission (SAQ 8.4)?",
    options: [
      "Total developmental unconcern and complete vegetative withdrawal",
      "Anger/aggression, changes in mood and personality, somatic complaints, and fear of death",
      "Passive acceptance without any emotional response",
      "Delusions of grandeur and compulsive excessive spending"
    ],
    correctIndex: 1,
    explanation: {
      correct: "Preadolescents (10-12 yrs) react to hospitalization with behavioral upheaval, irritability/anger, somatic symptoms, anxiety, and fears of death.",
      distractors: [
        "Preadolescents are acutely aware of body integrity and do not display total unconcern.",
        "Passive acceptance is uncharacteristic of preadolescents struggling with loss of control.",
        "Grandeur delusions indicate psychiatric mania, not typical developmental hospitalization stress."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m36",
    topic: "Influences on the Sick",
    subtopic: "Nurse-Patient Relationship Phases",
    difficulty: "beginner",
    type: "recall",
    stem: "Peplau's classic nurse-patient relationship described in Study Session 8 includes all the following phases EXCEPT:",
    options: ["Orientation Phase", "Working Phase", "Termination / Resolution Phase", "Determination Phase"],
    correctIndex: 3,
    explanation: {
      correct: "'Determination Phase' is not a component of the nurse-patient relationship model; the valid phases are Orientation, Working, and Termination/Resolution.",
      distractors: [
        "Orientation Phase is the initial phase where boundaries, expectations, and goals are defined.",
        "Working Phase is where active nursing interventions and patient problem-solving occur.",
        "Termination Phase is the concluding phase where goals are evaluated and independence is fostered."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m37",
    topic: "Influences on the Sick",
    subtopic: "Termination Phase Dynamics",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A nurse preparing a patient for discharge reviews the goals achieved during admission and reinforces the patient's confidence in managing medication independently. In SAQ 8.5, when did preparation for this termination phase officially begin?",
    options: [
      "At the Orientation Phase when the parameters and duration of the relationship were first established",
      "Five minutes before the patient leaves the ward",
      "Only after the doctor has signed the discharge order",
      "Only if the patient asks for a summary"
    ],
    correctIndex: 0,
    explanation: {
      correct: "Preparation for termination begins during the orientation phase, when the duration, boundaries, and goals of the therapeutic relationship are initially agreed upon.",
      distractors: [
        "Rushing discharge 5 minutes before leaving leads to patient confusion and non-adherence.",
        "Therapeutic termination is an ongoing nursing process, not an administrative sign-off.",
        "The nurse proactively initiates termination planning regardless of patient prompting."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m38",
    topic: "Influences on the Sick",
    subtopic: "Family Living Demands",
    difficulty: "intermediate",
    type: "recall",
    stem: "According to Study Session 8 (SAQ 8.2), families living with a chronically ill member confront a new set of demands that include:",
    options: [
      "Financial stressors/strains, social demands, and psychological demands",
      "Strict dietary restrictions on healthy siblings only",
      "Mandatory legal eviction from residential premises",
      "Complete cessation of all religious activities"
    ],
    correctIndex: 0,
    explanation: {
      correct: "The manual categorizes the demands placed on families of chronically ill patients into Financial stressors, Social demands, and Psychological strains.",
      distractors: [
        "Healthy siblings are not placed on unwarranted dietary restrictions.",
        "Eviction is not an inherent clinical demand of chronic illness adaptation.",
        "Families frequently increase spiritual practices rather than stopping them."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m39",
    topic: "Influences on the Sick",
    subtopic: "Family Life Stage Influence",
    difficulty: "advanced",
    type: "scenario",
    stem: "A 32-year-old mother with two toddlers is diagnosed with multiple sclerosis. According to SAQ 8.3, how does her 'family life stage' influence the impact of this chronic illness?",
    options: [
      "Young families have minimal caregiving responsibilities so the impact is negligible",
      "Disabling illness in a parental figure with young children severely strains child-rearing tasks and alters developmental family roles",
      "Illness in young parents is automatically resolved by school teachers",
      "Family life stage has no measurable effect on how families respond to chronic illness"
    ],
    correctIndex: 1,
    explanation: {
      correct: "In families with young children, a parental chronic illness severely disrupts critical child-rearing duties, financial security, and role equilibrium.",
      distractors: [
        "Young families have intense dependent caregiving demands and are highly vulnerable to parental disability.",
        "School teachers do not resolve household parental illness burdens.",
        "Family life stage is an acknowledged key determinant of how families adapt to chronic illness."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m40",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Family Grief Crisis Stage",
    difficulty: "intermediate",
    type: "recall",
    stem: "In the model of family grief (SAQ 7.8), the diagnosis of a terminal illness creates an immediate disruption of equilibrium, where the most common initial family reaction is:",
    options: ["Elation", "Anxiety", "Indifference", "Schizophrenia"],
    correctIndex: 1,
    explanation: {
      correct: "The manual explains that receiving a terminal diagnosis disrupts the family's balance like a rock in a still pond, with anxiety being the universal initial reaction.",
      distractors: [
        "Elation (extreme happiness) is an inappropriate reaction not observed in family crisis.",
        "Indifference is uncommon; families typically experience high emotional turbulence.",
        "Schizophrenia is a chronic psychotic psychiatric illness, not an acute family crisis response."
      ]
    },
    sourceTag: "manual"
  },

  // ── Extra High-Yield Clinical Scenario Questions Across All Sessions ──
  {
    id: "nsg215-m41",
    topic: "Introduction to Human Behavior and Illness",
    subtopic: "Health Belief Model: Cues to Action",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A 50-year-old civil servant only goes for prostate cancer screening after watching a television documentary featuring a prominent politician who died of the disease. In the Health Belief Model, this television documentary functioned as a:",
    options: ["Perceived barrier", "Cue to action", "Perceived susceptibility", "Modifying biological trait"],
    correctIndex: 1,
    explanation: {
      correct: "Cues to action are external events (media reports, illness of a friend, reminders) that trigger the decision to take health-protecting action.",
      distractors: [
        "Perceived barriers are the negative costs or hassles of taking action.",
        "Perceived susceptibility is the internal belief about one's personal likelihood of developing a condition.",
        "Biological traits include age and genetics, not external media broadcasts."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m42",
    topic: "Illness and Disease",
    subtopic: "Adolescent Illness Behavior",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A 15-year-old diabetic teenager hides her insulin pen from school friends and skips injections during social outings to avoid looking 'weird' or different. What developmental task makes adolescents especially vulnerable to this illness behavior?",
    options: [
      "Drive for peer acceptance and fear of altered body image / peer alienation",
      "Complete cognitive inability to comprehend pharmacology",
      "Infantile oral fixation",
      "Lack of fine motor coordination required for injections"
    ],
    correctIndex: 0,
    explanation: {
      correct: "Adolescents are heavily driven by peer conformity and body image; illness behaviors often involve hiding treatment to prevent feeling ostracized.",
      distractors: [
        "Adolescents in Piaget's formal operational stage have mature cognitive capacity to understand drug regimens.",
        "Oral fixation is a Freudian infant stage, not applicable to adolescent peer conformity.",
        "Teenagers have normal fine motor dexterity."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m43",
    topic: "Medication Adherence",
    subtopic: "Indirect Assessment: Electronic Monitors",
    difficulty: "advanced",
    type: "scenario",
    stem: "A clinical trial uses Medication Event Monitoring Systems (MEMS caps) that log the exact timestamp each pill bottle is opened. Why is this method categorized as an INDIRECT measure of adherence rather than direct?",
    options: [
      "Because opening the pill bottle does not confirm that the patient actually ingested the medication",
      "Because the device uses electronic microchips instead of human observers",
      "Because the data is only viewable after 12 months",
      "Because MEMS caps are only used for pediatric vitamins"
    ],
    correctIndex: 0,
    explanation: {
      correct: "MEMS logging is indirect because bottle opening is a proxy behavior; it does not directly verify that the capsule entered the patient's gastrointestinal tract.",
      distractors: [
        "The use of electronics does not determine directness; direct observation of ingestion does.",
        "Data can be downloaded and analyzed in real-time.",
        "MEMS devices are used across wide medical specialties, especially cardiovascular and antiretroviral regimens."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m44",
    topic: "Illness Cognition",
    subtopic: "Leventhal: Identity Dimension",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A patient experiencing intermittent chest tightness refuses to accept a diagnosis of angina pectoris, insisting: 'It is just heartburn from eating spicy stew; I have no chest problem.' Which dimension of Leventhal's illness cognition is this patient struggling to accept?",
    options: ["Identity", "Timeline", "Cure", "Consequences"],
    correctIndex: 0,
    explanation: {
      correct: "The Identity dimension represents the label/diagnosis of the illness and the specific symptoms the patient attributes to that diagnostic category.",
      distractors: [
        "Timeline pertains to expected duration, not the diagnosis label itself.",
        "Cure relates to beliefs about treatment efficacy.",
        "Consequences relates to expected physical or socioeconomic impact."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m45",
    topic: "Coping Models with Adaptation to Illness",
    subtopic: "Primary Control Coping",
    difficulty: "intermediate",
    type: "scenario",
    stem: "Upon being diagnosed with prediabetes, a 40-year-old accountant joins a fitness gym, consults a clinical dietitian to restructure his meals, and schedules weekly blood glucose logs. In stress coping models, these active problem-focused modifications represent:",
    options: ["Primary Control Coping", "Disengagement Coping", "Denial Defense Mechanism", "Subconscious Intellectualization"],
    correctIndex: 0,
    explanation: {
      correct: "Primary control coping consists of proactive, problem-focused behaviors directly targeted at modifying or overcoming the stressor.",
      distractors: [
        "Disengagement coping involves avoiding or denying the stressor.",
        "Denial involves refusing to acknowledge the reality of the prediabetic diagnosis.",
        "Subconscious intellectualization involves detached philosophical talk without taking practical lifestyle action."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m46",
    topic: "Coping Response",
    subtopic: "Trashing Coping",
    difficulty: "advanced",
    type: "recall",
    stem: "Study Session 6 mentions various maladaptive response styles during severe distress. Which response pattern involves erratic, disorganized, and non-constructive behavior under crisis?",
    options: ["Trashing coping", "Direct confrontation", "Cognitive reappraisal", "Secondary adaptation"],
    correctIndex: 0,
    explanation: {
      correct: "'Trashing' refers to disorganized, frantic, or counter-productive coping attempts that aggravate stress rather than resolving it.",
      distractors: [
        "Direct confrontation is tackling the problem head-on in a structured manner.",
        "Cognitive reappraisal is a mature, constructive emotional adjustment.",
        "Secondary adaptation is accepting and adjusting to unavoidable stressors."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m47",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Disenfranchised Grief",
    difficulty: "advanced",
    type: "scenario",
    stem: "A hospital cleaning attendant experiences deep mourning after the death of an estranged ex-spouse with whom she maintained a secret supportive friendship, but she receives no condolences or time off from colleagues because 'they were long divorced.' This unrecognized, socially unsanctioned grief is known as:",
    options: ["Disenfranchised grief", "Anticipatory grief", "Normal uncomplicated grief", "Chronic exaggerated grief"],
    correctIndex: 0,
    explanation: {
      correct: "Disenfranchised grief occurs when a person incurs a significant loss that cannot be openly acknowledged, socially mourned, or publicly supported.",
      distractors: [
        "Anticipatory grief occurs prior to the actual death during prolonged terminal illness.",
        "Normal uncomplicated grief is socially recognized and moves toward gradual resolution.",
        "Chronic exaggerated grief involves prolonged, disabling intensification of depressive symptoms."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m48",
    topic: "Influences on the Sick",
    subtopic: "Working Phase of Nurse-Patient Relationship",
    difficulty: "intermediate",
    type: "recall",
    stem: "In the Working Phase of the therapeutic nurse-patient relationship (Session 8), what is the primary focus of nursing actions?",
    options: [
      "Establishing initial introduction and contract terms",
      "Active problem-solving, therapeutic intervention, and supporting the patient through behavioral changes",
      "Immediate discharge and termination of contact",
      "Writing bills and financial account audits"
    ],
    correctIndex: 1,
    explanation: {
      correct: "The Working Phase is the active therapeutic stage where the nurse and patient collaborate on health goals, coping strategies, and problem-solving.",
      distractors: [
        "Contract terms and boundaries are set during the Orientation Phase.",
        "Discharge and relationship conclusion occur during the Termination Phase.",
        "Financial billing is an administrative hospital task, not the clinical core of the therapeutic relationship."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m49",
    topic: "Coping with the Crisis of Illness",
    subtopic: "Moos Crisis Theory",
    difficulty: "intermediate",
    type: "recall",
    stem: "Moos's Crisis Theory (1982) cited in Study Session 7 posits that an individual's adjustment to serious illness is shaped by background personal factors, illness-related factors, and:",
    options: [
      "Physical and social environmental factors",
      "Astrological zodiac compatibility",
      "The price of pharmaceutical stocks",
      "Only the patient's blood type"
    ],
    correctIndex: 0,
    explanation: {
      correct: "Moos's framework outlines that outcome is determined by cognitive appraisal influenced by three sets of factors: personal factors, illness factors, and physical/social environmental factors.",
      distractors: [
        "Astrological factors have no empirical clinical validity.",
        "Stock prices do not form part of Moos's psychological crisis theory framework.",
        "Blood type is a biological antigen trait, not a determinant of crisis coping."
      ]
    },
    sourceTag: "manual"
  },
  {
    id: "nsg215-m50",
    topic: "Medication Adherence",
    subtopic: "Patient Health Literacy Assessment",
    difficulty: "intermediate",
    type: "scenario",
    stem: "A nurse notices that an illiterate elderly diabetic patient nods politely to complex written discharge instructions but cannot explain which pill to take in the morning. What is the most effective nursing intervention to ensure adherence?",
    options: [
      "Using color-coded pill organizers, pictorial daily timetables, and 'teach-back' verification",
      "Speaking more loudly using the exact same technical medical jargon",
      "Criticizing the patient for not asking questions during ward rounds",
      "Canceling all prescribed medications and sending the patient home"
    ],
    correctIndex: 0,
    explanation: {
      correct: "For patients with low health literacy, nurses use color-coded organizers, pictorial schedules, and the teach-back method to ensure safe adherence.",
      distractors: [
        "Increasing volume does not compensate for low reading or health literacy.",
        "Criticizing patients damages trust and promotes avoidance of healthcare.",
        "Canceling medications endangers the patient's life."
      ]
    },
    sourceTag: "manual"
  }
];

// Combine existing starter questions with the 50 new manual-derived questions
const mergedQuestions = [...starter, ...manualMCQs];

fs.writeFileSync(starterPath, JSON.stringify(mergedQuestions, null, 2), 'utf8');
console.log('Successfully expanded question bank to:', mergedQuestions.length, 'questions!');
