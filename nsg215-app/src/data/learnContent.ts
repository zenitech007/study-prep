import type { StudySessionContent, ConceptItem, CourseInfo } from '../types';

export const courseInfo: CourseInfo = {
  code: 'NSG 215',
  title: 'Human Behavior and Illness',
  credits: '3 Units',
  level: '200-Level; First Semester',
  aim: 'The course aims at introducing concepts of behavior, health and illness; identify the determinants of human behavior and describe illness behavior and various models of human behavior in illness.',
};

// ── Study Session Review Content ─────────────────────────────────
// Card-based concept review data for the Learn page.
// All content sourced from the NSG 215 course manual (8 study sessions).

export const studySessions: StudySessionContent[] = [
  {
    sessionNumber: 1,
    title: 'Introduction to human behavior and illness',
    introduction:
      'Health they say is wealth. Most individuals want to stay healthy. However not everybody is healthy. Our health status could be determined by ourselves, our behaviors and traits.',
    learningOutcomes: [
      '1.1 Explain the concepts of behavior, health and illness',
      '1.2 Discuss the determinants of health',
      '1.3 Highlight the factors that influence health behaviors: health belief model.',
    ],
    overview:
      'This session lays the foundation by defining behavior, health, and illness. It explores the determinants of health and introduces the Health Belief Model as a framework for understanding why people engage in health-related behaviors.',
    content: [
      {
        heading: '1.1 Concepts of Behavior, Health and Illness',
        body: 'Behavior is the response of an individual or group to an action, environment, person, or stimulus. Health is defined by the WHO as a state of complete physical, mental, and social well-being, not merely the absence of disease or infirmity. Illness represents the subjective experience of feeling unwell and how an individual perceives and lives with symptoms, whereas disease is an objective, medically diagnosed pathological condition that affects part or all of an organism.',
      },
      {
        heading: '1.2 Determinants of Health',
        body: 'Health status is shaped by a broad spectrum of determinants: biological and genetic factors (age, sex, inherited traits), behavioral and lifestyle factors (diet, physical activity, tobacco or alcohol use), environmental conditions (sanitation, housing, water supply), socioeconomic circumstances (income, education, occupation), and access to quality healthcare services.',
      },
      {
        heading: '1.3 Factors Influencing Health Behaviors: Health Belief Model',
        body: 'The Health Belief Model (HBM) proposes that an individual will take action (exhibit a health behavior) to avoid disease primarily when two key conditions are met: (1) the individual\'s belief of personal susceptibility to a particular disease condition, and (2) the belief that the occurrence of the disease would have a moderately severe impact on some aspects of their life. Modifying factors include perceived benefits of the action, perceived barriers/costs, cues to action (advice, symptoms, reminders), and self-efficacy.',
      },
    ],
    keyPoints: [
      'Behavior is any observable action or response of an organism, influenced by both internal and external factors.',
      'Health is a state of complete physical, mental, and social well-being — not merely the absence of disease (WHO definition).',
      'Illness is a subjective experience of feeling unwell, while disease is an objective, medically diagnosed pathological condition.',
      'Determinants of health include biological/genetic factors, behavioral factors, environmental conditions, social circumstances, and healthcare access.',
      'The Health Belief Model (HBM) proposes that health behavior is driven by perceived susceptibility, perceived severity, perceived benefits, perceived barriers, cues to action, and self-efficacy.',
    ],
    models: [
      {
        name: 'Health Belief Model (HBM)',
        description:
          'A psychological model that explains and predicts health-related behaviors based on individual beliefs about health conditions.',
        components: [
          'Perceived susceptibility — belief about the likelihood of getting a condition',
          'Perceived severity — belief about the seriousness of the condition',
          'Perceived benefits — belief in the effectiveness of taking action',
          'Perceived barriers — belief about the costs/obstacles of taking action',
          'Cues to action — triggers that prompt action (symptoms, media, advice)',
          'Self-efficacy — confidence in one\'s ability to take action',
        ],
      },
    ],
    definitions: [
      { term: 'Behavior', definition: 'Any observable action or response of an organism to internal or external stimuli.' },
      { term: 'Health', definition: 'A state of complete physical, mental, and social well-being, not merely the absence of disease or infirmity (WHO).' },
      { term: 'Illness', definition: 'A subjective experience of feeling unwell; how the individual perceives and lives with symptoms.' },
      { term: 'Disease', definition: 'An objective, medically diagnosed pathological condition with identifiable signs and symptoms.' },
      { term: 'Value', definition: 'The norm or standard of behavior that is considered vital or appropriate.' },
    ],
    inTextQuestions: [
      {
        question: '-------is a definite strange condition, a disorder of outlook or function that affects part or all of an organism',
        answer: 'A disease',
      },
      {
        question: 'The norm or standard as of behavior that is considered vital or appropriate is _______',
        answer: 'Value',
      },
    ],
    saqs: [
      {
        id: '1.1',
        question: 'How can we define human behavior?',
        answer: 'Behavior is the response of an individual or group to an action, environment, person, or stimulus.',
      },
      {
        id: '1.3',
        question: 'The health- belief model proposes that the individual will take action (exhibit a behavior) to avoid disease if two conditions are met. What are the conditions?',
        answer: "It involves the individual's belief of susceptibility to a particular disease condition... The second condition is the belief that the occurrence of the disease would have a moderately severe impact on some aspects of the individual's life.",
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 2,
    title: 'Illness and Disease',
    introduction:
      'She walked into the hospital looking weak and pale. You could judge by her looks that she is not her normal self. She is sick. I guess you could have met individuals like this before. That is what illness could do. In this study session you will learn the concept of illness and disease, the classes of illness and disease and the Illness behaviors in childhood, adolescence, and adulthood.',
    learningOutcomes: [
      '2.1 Explain the concept of illness and disease',
      '2.2 Highlight the classes of illness and disease',
      '2.3 Discuss the illness behaviors in children, adolescence and adulthood.',
    ],
    overview:
      'Differentiates illness from disease and explores the stages of illness, classification of diseases, and how illness behavior varies across the lifespan (childhood, adolescence, adulthood).',
    content: [
      {
        heading: '2.1 Concept of Illness and disease',
        body: 'Illness is a condition of being unhealthy in your body and mind. It is an exact condition that prevents your body or mind from working normally. Illness is a state of being unwell. It is the level of depth of disease manifestation in an individual. Illness is a highly personal state in which the person\'s physical, emotional, intellectual, social, developmental or spiritual functioning is thought to be diminished.\n\nDisease is an interruption, termination, or disorder of a body, system, or organ structure or function. A disease is a definite strange condition, a disorder of outlook or function that affects part or all of an organism.',
      },
      {
        heading: '2.2 Classes of illness and disease',
        body: 'Illness can be classified based on onset (beginning), duration and management. Illness could be Acute Illness or Chronic illness. Acute illness is a type of illness that will eventually resolve without any medical supervision. Acute Illness is characterized by severe symptoms of relatively short duration. Chronic illness is the type of illness that lasts for an extended period, usually six months or longer and often has periods of reduction, when the symptoms disappear and when symptoms re-appear e.g. sickle cell anemia.',
      },
      {
        heading: '2.2.1 Stages of Illness',
        body: 'There are different stages of illness:\n1. Symptoms experience: could occur when an individual senses physical limitation or knowing of something that is wrong but could not diagnose the problem.\n2. Assumption of the sick role: When symptoms continue and turn out to be severe, clients accept the sick role and seek approval from families.\n3. Medical care contact: The person is encouraged to seek professional health services.\n4. Dependent client role: The client trusts and depends on health care professionals for the relief of symptoms.\n5. Recovery or rehabilitation: This stage shows up suddenly just like when the symptoms show up. In the case of prolonged illness, the final stage may require an adjustment to a prolonged reduction in health and functioning.',
      },
      {
        heading: 'Classification of disease',
        body: 'Diseases can be classified into the following types: 1. Heart, Lung and Other Organ Diseases 2. Blood and Immune System Diseases 3. Cancer 4. Injury 5. Brain and Nervous System Diseases 6. Endocrine System Diseases 7. Infectious and Parasitic Diseases 8. Pregnancy and Childbirth-Related Diseases 9. Inherited Diseases 10. Environmentally-Acquired Diseases.',
      },
      {
        heading: '2.2.2 Differences between illness and disease',
        body: 'Easily recoverable ailments are considered illnesses, while severe, life-death type treatments are considered diseases. For example, fever is considered illness, while Malaria or jaundice is a disease. Illness is a product of disease, but you can have disease without illness. Illness is something a man has; Disease is something an organ has.',
      },
      {
        heading: '2.3 Illness behaviors in childhood, adolescence, and adulthood',
        body: 'Illness behavior is a concept put forward by sociologists and is seen as a coping mechanism, which involves ways individuals describe, monitor and interpret their symptoms, take remedial actions and use the health care system.\n\nIllness Behavior in Childhood: Erik Erikson divided human development into stages. Childhood (0-12 years) is categorized into Neonates/infancy (birth - 1 year), Toddler (2-3 years), Pre-school (4-5 years), and School Age (6-12 years). Children at different developmental stages react differently to illness and hospitalization.\n\nIllness Behavior in Adolescence (13 to 19): This age group is more likely to demand independence and this reflects in the illness behavior.\n\nIllness Behaviors in Adulthood (20 years above): This age group could exhibit behavioral disorder which could reflect as anxiety, emotional disorder etc. They reflect their experience or background which is easily seen in their illness behavioral pattern.',
      },
    ],
    keyPoints: [
      'Illness is subjective (how one feels), disease is objective (what is clinically diagnosed). Illness is something a man has; disease is something an organ has.',
      'Suchman\'s 5 Stages of Illness: (1) Symptom experience, (2) Assumption of the sick role, (3) Medical care contact, (4) Dependent client/patient role, (5) Recovery/rehabilitation.',
      'Acute illness has a rapid onset, short duration, severe symptoms, and often resolves quickly.',
      'Chronic illness lasts for an extended period (usually 6 months or longer) with remissions and exacerbations (e.g. sickle cell anemia).',
      'Illness behavior: coping mechanism involving how individuals monitor bodies, interpret symptoms, take remedial action, and utilize healthcare.',
      'Children express illness through developmental stages (Erikson: Infancy, Toddler, Preschool, School Age); adolescents demand independence; adults reflect life background/roles.',
    ],
    models: [
      {
        name: 'Suchman\'s Stages of Illness',
        description: 'A 5-stage model describing the typical progression of illness experience.',
        components: [
          'Stage 1: Symptom experience — sensing limitation or knowing something is wrong',
          'Stage 2: Assumption of the sick role — accepting illness and seeking approval from families',
          'Stage 3: Medical care contact — seeking professional health services',
          'Stage 4: Dependent client role — trusting and depending on healthcare professionals',
          'Stage 5: Recovery or rehabilitation — gradual or sudden return to functioning, or long-term adjustment',
        ],
      },
    ],
    definitions: [
      { term: 'Illness', definition: 'A condition of being unhealthy in body and mind; highly personal state where physical, emotional, social, or spiritual functioning is diminished.' },
      { term: 'Disease', definition: 'An interruption, termination, or disorder of a body, system, or organ structure or function; a definite pathological condition.' },
      { term: 'Acute illness', definition: 'Characterized by severe symptoms of relatively short duration, often resolving without prolonged supervision.' },
      { term: 'Chronic illness', definition: 'Illness that lasts for an extended period, usually 6 months or longer, with periods of remission and recurrence (e.g. sickle cell anemia).' },
      { term: 'Illness behavior', definition: 'Ways individuals describe, monitor, and interpret symptoms, take remedial actions, and use the healthcare system.' },
    ],
    inTextQuestions: [
      {
        question: '________ is the one that lasts for an extended period.',
        answer: 'Chronic illness',
      },
      {
        question: 'The different types of disease include the following except (a) Cancer (b) Injury (c) Brain Nervous System Diseases (d) Trypanosotic disease',
        answer: '(d) Trypanosotic disease',
      },
    ],
    saqs: [
      {
        id: '2.1',
        question: 'Define illness and disease',
        answer: 'Illness is a state in which the person\'s physical, emotional, intellectual, social, developmental or spiritual functioning is thought to be diminished. Disease is an interruption, termination, or disorder of a body, system, or organ structure or function.',
      },
      {
        id: '2.2',
        question: 'Explain the acute and chronic nature of illness',
        answer: 'Acute illness is a type of illness that will eventually resolve without any medical supervision. Acute Illness is characterized by severe symptoms of relatively short duration. The symptoms often appear sharply and diminish quickly. Chronic illness is the type of illness that lasts for an extended period, usually six months or longer and often has periods of reduction, when the symptoms disappear and when symptoms re-appear e.g. sickle cell anemia.',
      },
      {
        id: '2.3',
        question: 'Discuss the illness behavior pattern of the childhood group',
        answer: 'Childhood is the period between infancy and puberty i.e. 0-12 years. The term is non-specific and implies a varying range of years in human development. Children at different developmental stages react differently to illness and subsequently, hospitalization. The emotional reactions of children also depend on the type and quantity of the stress and tension produced by the illness, hospitalization, misperception about hospitalization and medical procedure.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 3,
    title: 'Medication Adherence',
    introduction:
      'Most students who sit for exams want to pass. Likewise most patients who visit hospitals need healing. Complete wellness might not be realizable if the patients do not adhere to their medication. Medication adherence describes the degree to which a patient correctly follows medical guidance. This is achieved through different measures. In this study session you will understand the concept of medical adherence, assessing medication adherence, medication non-adherence, and nurses\' role in medication adherence.',
    learningOutcomes: [
      '3.1 Discuss Medication Adherence',
      '3.2 Explain ways of accessing medication adherence',
      '3.3 Discuss Medication non-adherence',
      '3.4 Highlight nurses\' responsibility in ensuring adherence',
    ],
    overview:
      'Explores the concepts of medication adherence and persistence, methods of assessment, reasons patients do not adhere, and the nurse\'s role in promoting adherence.',
    content: [
      {
        heading: '3.1 Medication Adherence',
        body: 'Medication adherence describes the degree to which a patient correctly follows medical guidance. It can also refer to medication or drug compliance. This also includes medical device use, self-care, self-directed workouts, or treatment sessions. Medication adherence behavior can divided into 2 main concepts, namely, adherence and persistence. Adherence refers to the intensity of drug use during the duration of therapy, whereas persistence refers to the overall duration of drug therapy.',
      },
      {
        heading: '3.2 Assessing Medication Adherence',
        body: 'There are many different methods for assessing adherence to medications. They are: Direct method and Indirect method. Direct method includes directly observed therapy, measurement of the level of medicine or metabolite in blood, and measurement of the biological marker in blood. Indirect method involves the use of questionnaires, assessment of the patient\'s clinical response, electronic medication monitors, measurement of physiological markers, patient diaries, pharmacists refill, self-reports, pill counts, rate of prescription refills etc.',
      },
      {
        heading: '3.3 Medication non adherence',
        body: 'Non adherence to medications is common for patients with cardiovascular diseases. Non adherence could be tackled by taking some measures. Some of which are: 1. The creation of a patient-centered project 2. Encourage the patient\'s family to keep track of medication 3. Create an online medical database 4. Encourage patient participation and engagement 5. Creation of an application where patients can register 6. Promote meetings between medical staff and patients and their families 7. Changed and improved healthcare systems.',
      },
      {
        heading: '3.4 Nurses\' responsibilities in ensuring adherence',
        body: 'Nurses plays very important roles in ensuring patients adhere to their medication. Nurses have access to the patients than the physicians and therefore there is need for them to ensure that the patients adhere to their medication. Some of their responsibilities include: Emphasizing the value of the regimen, Listening to your patient\'s concerns, Accessing the patients literacy level, and being a Patient Advocate.',
      },
    ],
    keyPoints: [
      'Adherence refers to the intensity of drug use during therapy; persistence refers to the overall duration of drug therapy.',
      'Medication adherence extends beyond pills to medical devices, self-care, and treatment sessions.',
      'Direct assessment methods: directly observed therapy (DOT), blood/urine drug levels, biological markers.',
      'Indirect assessment methods: self-reports, pill counts, prescription refill records, electronic monitors, diaries, clinical response.',
      'Measures to tackle non-adherence: patient-centered projects, family involvement, digital tracking tools/apps, patient engagement, and improved health systems.',
      'Nurses\' key responsibilities: emphasize regimen value, listen to patient concerns, assess health literacy, and serve as patient advocates.',
    ],
    definitions: [
      { term: 'Medication adherence', definition: 'The degree to which a patient correctly follows medical guidance, including intensity and timing of therapy.' },
      { term: 'Persistence', definition: 'The overall duration of time from initiation to discontinuation of prescribed drug therapy.' },
      { term: 'Direct assessment', definition: 'Objective verification of intake, including directly observed therapy and blood/urine metabolite measurement.' },
      { term: 'Indirect assessment', definition: 'Proxy measures of adherence including questionnaires, pill counts, refill rates, and electronic monitors.' },
      { term: 'Patient advocate', definition: 'A core nursing role supporting and defending the patient\'s rights, literacy needs, and treatment comprehension.' },
    ],
    inTextQuestions: [
      {
        question: 'Indirect method of assessing Medicare adherence include the following except a. Pharmacist Refill b. Pill Counts c. Observed therapy d. Self-reports',
        answer: 'c. Observed therapy',
      },
      {
        question: 'The culture and religious belief of patients could make them not to adhere to medication. True or false',
        answer: 'True',
      },
    ],
    saqs: [
      {
        id: '3.1',
        question: 'Define Medication adherence',
        answer: 'Medication adherence describes the degree to which a patient correctly follows medical guidance. It can also refer to medication or drug compliance. This also includes medical device use, self-care, self-directed workouts, or treatment sessions.',
      },
      {
        id: '3.2',
        question: 'State and explain the different methods for assessing adherence to medications',
        answer: 'There are many different methods for assessing adherence to medications. They are: Direct method, Indirect method. Direct method includes directly observed therapy, measurement of the level of medicine or metabolite in blood, and measurement of the biological marker in blood. Indirect method involves the use of questionnaires, assessment of the patient\'s clinical response, electronic medication monitors, measurement of physiological markers, patient diaries, pharmacists refill, self-reports, pill counts, rate of prescription refills etc.',
      },
      {
        id: '3.3',
        question: 'Mention ways of tackling non-adherence of medications',
        answer: 'Non adherence could be tackled by taking some measures. Some of which are: 1. The creation of a patient-centered project 2. Encourage the patient\'s family to keep track of medication 3. Create an online medical database 4. Encourage patient participation and engagement 5. Creation of an application where patients can register 6. Promote meetings between medical staff and patients and their families 7. Changed and improved healthcare systems.',
      },
      {
        id: '3.4',
        question: 'What is your role as a nurse in ensuring medication adherence?',
        answer: 'Some of their responsibilities include: Emphasizing the value of the regimen, Listening to your patient\'s concerns, Accessing the patients literacy level, Patient Advocate.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 4,
    title: 'Illness Cognition',
    introduction:
      'Health they say is wealth. The desire to live healthy is one of the goals of the average man. However the wellbeing of man is threatened by illness. Most patients are mainly familiar with common sense knowledge of illness called cognition. It has become important to learn about illness. In this study session you will learn about illness cognition, illness and health, the concept of disease causation, models of disease causation and patterns of illness.',
    learningOutcomes: [
      '4.1 Define illness and health',
      '4.2 Explain illness cognition',
      '4.3 Discuss the concept of disease causation',
      '4.4 Discuss the models of disease causation',
      '4.5 Explain the patterns of illness',
    ],
    overview:
      'Examines how people mentally represent and make sense of illness, including Leventhal\'s self-regulatory model, concepts of disease causation, and the shift from biomedical to bio-psychosocial approaches.',
    content: [
      {
        heading: '4.1 Illness and healthiness',
        body: 'The World Health Assembly in 1974 coined a universally acceptable definition of health as a state of complete physical, mental and social well-being and not merely the absence of diseases or infirmity. The term \'Illness\' also has several definitions ranging from not feeling normal/right, presence of physical/psychological symptoms, having a specific illness to standard definitions like \'Individual\'s perception and labeling of a set of physical and emotional experience, which highlights the role of cognition on illness perception.',
      },
      {
        heading: '4.2 Illness Cognition',
        body: 'Illness Cognition is defined as a patient\'s common sense beliefs about their illness. Leventhal attempted to list the factors that make up an individual\'s illness perceptions and they are in five dimensions: Identity (the label a patient gives his condition in terms of diagnosis and symptoms), Perceived cause of illness (factors causing or contributing to the illness), Time line (beliefs about how long the illness will last), Consequences (perceptions of the possible effects of the illness on their life), and Cure & control (beliefs that the illness can be treated and cured).',
      },
      {
        heading: '4.3 Concept of disease causation',
        body: 'There are several concepts regarding disease causation. 1. Germ theory of disease: states the one to one relationship between causal agent and disease. 2. Epidemiological triad: reveals that disease is caused by interactions between agent, host and environment. 3. Multifactorial Causation: talks about array of interactions between the host and environment. 4. Web of causation: meant for chronic disease where disease agent is not known and it is the outcome of interaction of multiple factors.',
      },
      {
        heading: '4.4 Models of disease causation',
        body: 'The Biological Model of disease causation: The biomedical model, which dominates medicine, is a reductionist, single-factor model of illness that regards the mind and the body as separate entities and emphasizes illness concerns over health. The Bio psychosocial Model: fundamental assumption is that health and illness are consequences of the interplay of biological, psychological, and social factors. It maintains that health and illness are caused by multiple factors and produce multiple effects.',
      },
      {
        heading: '4.5 Patterns of Illness',
        body: 'Illness could exist in these patterns: Acute and Chronic. Acute illness is a self-limiting disease which is mostly characterized by the symptoms having a rapid onset. These symptoms are fairly intense and resolve in short period of time. Chronic illness are those that occur across the whole range of illness, complex in how they are caused, are often long-lasting and persistent in their effects and can produce a range of complications.',
      },
    ],
    keyPoints: [
      'Illness cognition: a patient\'s common-sense beliefs and mental representations of their illness.',
      'Leventhal\'s 5 Illness Perception Dimensions: Identity, Cause, Timeline, Consequences, and Cure/Control.',
      'Concepts of disease causation: Germ Theory (single agent), Epidemiological Triad (agent-host-environment), Multifactorial Causation, and Web of Causation (complex chronic interactions).',
      'Biomedical Model (reductionist, mind-body split) vs. Bio-psychosocial Model (interplay of biological, psychological, and social factors).',
      'Patterns of illness: Acute (rapid onset, short duration, single cause, curable) vs. Chronic (gradual onset, lengthy/indefinite, multiple causes, manageable not curable).',
    ],
    models: [
      {
        name: 'Leventhal\'s Common-Sense Model (Self-Regulatory Model)',
        description: 'Describes how individuals construct cognitive representations of illness across five core dimensions.',
        components: [
          'Identity — label and symptoms associated with the condition',
          'Perceived cause — ideas and beliefs about what produced the illness',
          'Timeline — expectations of duration (acute, chronic, or cyclical)',
          'Consequences — perceived personal, emotional, and social impact',
          'Cure & control — beliefs about whether the illness can be managed or cured',
        ],
      },
      {
        name: 'Epidemiological Triad',
        description: 'Traditional disease causation model examining the dynamic interaction of three components.',
        components: [
          'Agent — causative factor or organism (biological, chemical, physical)',
          'Host — organism/human giving existence to infectious agents with varying susceptibility',
          'Environment — external conditions facilitating transmission and exposure',
        ],
      },
    ],
    definitions: [
      { term: 'Illness cognition', definition: 'A patient\'s common-sense beliefs and cognitive representations regarding their illness.' },
      { term: 'Biomedical model', definition: 'A reductionist, single-factor model viewing mind and body as separate and emphasizing disease over health.' },
      { term: 'Bio-psychosocial model', definition: 'A model asserting health and illness stem from the interplay of biological, psychological, and social factors.' },
      { term: 'Web of causation', definition: 'A model for chronic disease where multiple interconnected factors interact without a single known agent.' },
    ],
    inTextQuestions: [
      {
        question: '________ is the individual\'s perception and labeling of a set of physical and emotional experience which highlights the role of cognition on illness and perception.',
        answer: 'Illness',
      },
      {
        question: '________ refers to a patient\'s beliefs about how long the illness will last.',
        answer: 'Timeline',
      },
      {
        question: '________ states the one to one relationship between causal agent and disease.',
        answer: 'Germ theory of disease',
      },
    ],
    saqs: [
      {
        id: '4.1',
        question: 'Define illness and healthiness',
        answer: 'Healthiness is ability to maintain a good psychological well-being or the absence of illness/symptoms. Illness is the individual\'s perception and labeling of a set of physical and emotional experience.',
      },
      {
        id: '4.2',
        question: 'Explain illness cognition and state the illness perception dimensions according to Leventhal.',
        answer: 'Illness Cognition is defined as a patient\'s common sense beliefs about their illness. Illness perceptions dimensions are the following: Perceived cause of illness, Time line, Consequences, Cure & control, Identity.',
      },
      {
        id: '4.3',
        question: 'Discuss the concept of disease causation using the Epidemiological triad.',
        answer: 'Epidemiological triad reveals that disease is caused by interactions between agent, host and environment. Agent is an organism/substance which may cause the disease to continue e.g. organisms, chemicals, radiation, etc. Similarly host is defined as man or an animal that gives existence to infections agents in the environment.',
      },
      {
        id: '4.4',
        question: 'Discuss the Biological Model of disease causation',
        answer: 'The Biological Model of disease causation is a reductionist, single-factor model of illness that regards the mind and the body as separate entities and emphasizes illness concerns over health.',
      },
      {
        id: '4.5',
        question: 'Highlight the differences between acute and chronic illness',
        answer: 'Acute illness: abrupt onset, limited duration, single cause, usually accurate diagnosis and prognosis, usually effective intervention, outcome is cure. Chronic illness: usually graduated onset, lengthy/indefinite duration, multiple/changing causes, often uncertain diagnosis and prognosis, often indecisive intervention, outcome is no cure.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 5,
    title: 'Coping models with adaptation to illness',
    introduction:
      'Change is inevitable and it occurs in our day to day activity. At times, we need to manage these changes. The process of dealing with these day to day changes is known as Coping. In this study session you will learn about coping, coping models in the context of adaptation to illness, responses to stress model, motivational model of coping and the community stress prevention model.',
    learningOutcomes: [
      '5.1 Define Coping',
      '5.2 Discuss the coping models in the context of adaptation to illness',
      '5.3 Explain the responses to stress model',
      '5.4 Discuss the motivational model of coping',
      '5.5 Explain the Community Stress Prevention Model',
    ],
    overview:
      'Presents major theoretical models of stress and coping, including the Transactional Model, the Responses to Stress Model, the Motivational Model, and the Community Stress Prevention Model.',
    content: [
      {
        heading: '5.1 Coping',
        body: 'According to Folkman & Lazarus (1984) Coping can be described as constantly changing cognitive and behavioral efforts to manage specific external and internal demands that are appraised as tasking or exceeding the resources of a person. The second definition is offered by the Red Cross as anything people do to adjust to the challenges and demands of stress. It is any adjustments made to reduce the negative impact of stress.',
      },
      {
        heading: '5.2 Coping model in the context of adaptation to illness',
        body: 'Coping model in the context of adaptation to illness could be expressed using several models: The Transactional Model of Stress and Coping, Responses to stress Model, Motivational Model of Coping, and The Community Stress Prevention Model. The transactional model of stress and coping is a systems-based framework for understanding and evaluating the processes of coping with stressful events. According to the Transactional Model of Coping, the concepts are Primary Appraisal (determination of the significance of the event) and Secondary appraisal (assessing the controllability of the stressor and coping resources). Emotion-focused coping refers to coping efforts directed inward in order to strengthen the emotional response to the stressor. Problem-focused coping relates to coping efforts directed outward as a means to change the environment.',
      },
      {
        heading: '5.3 Responses to stress Model',
        body: 'This developmental and contextual theoretical framework emphasizes the importance of developmental changes in the nature of stress experienced by children and adolescents, the internal /external constraints that limit coping processes, and the complex interplay between voluntary and involuntary responses to stress. Voluntary Strategies include: Primary Control Coping (Attempts to modify stressful problem), Secondary Control Coping (Attempts to adapt via cognition), and Disengagement Coping (Attempts to redirect attention away from the stressor). Involuntary Strategies involve Involuntary Engagement and Involuntary Disengagement.',
      },
      {
        heading: '5.4 Motivational Model of Coping',
        body: 'The Motivational Model of Coping described by Skinner and Wellborn (1997) is a life span theory based on the assumption that all people have basic needs for understanding, for competence, and for autonomy or self-determination. It suggests three universal stressors: Neglect (threatens understanding), Chaos (undermines competence), and Coercion (encroaches on independence).',
      },
      {
        heading: '5.5 The Community Stress Prevention Model',
        body: 'The Community Stress Prevention Model emphasizes resilience and is thought to be appropriate for both prevention and intervention following disaster or illness. The six dimensions central to coping with adversity are: 1. Beliefs/Values, 2. Affection, 3. Social, 4. Imagination, 5. Cognitive, 6. Physiological.',
      },
    ],
    keyPoints: [
      'Folkman & Lazarus: Coping is constantly changing cognitive and behavioral efforts to manage taxing demands.',
      'Red Cross definition: Anything people do to adjust to the challenges and demands of stress and reduce negative impacts.',
      'Transactional Model: Primary Appraisal (significance of event) and Secondary Appraisal (controllability and coping resources); Problem-focused vs. Emotion-focused coping.',
      'Responses to Stress Model: Developmental framework highlighting voluntary (Primary control, Secondary control, Disengagement) and involuntary responses.',
      'Motivational Model (Skinner & Wellborn): 3 basic needs (understanding, competence, autonomy) threatened by 3 universal stressors: Neglect, Chaos, and Coercion.',
      'Community Stress Prevention Model: 6 dimensions (Beliefs/Values, Affection, Social, Imagination, Cognitive, Physiological) central to resilience in disaster or illness.',
    ],
    models: [
      {
        name: 'Transactional Model of Stress and Coping (Lazarus & Folkman)',
        description: 'Stress arises from a dynamic transaction between the individual and their environment, mediated by cognitive appraisal.',
        components: [
          'Primary appraisal — evaluating whether a situation is irrelevant, benign-positive, or stressful',
          'Secondary appraisal — evaluating available coping resources and options',
          'Reappraisal — reevaluating the situation as new information emerges',
          'Problem-focused coping — efforts directed outward to change the environment or problem',
          'Emotion-focused coping — efforts directed inward to manage or strengthen emotional response',
        ],
      },
      {
        name: 'Motivational Model of Coping (Skinner & Wellborn)',
        description: 'Life span theory identifying three universal psychological needs and their corresponding threats.',
        components: [
          'Relatedness / Understanding — threatened by Neglect',
          'Competence — undermined by Chaos',
          'Autonomy / Self-determination — encroached by Coercion',
        ],
      },
      {
        name: 'Community Stress Prevention Model (BASIC Ph)',
        description: 'Six core dimensions central to individual and community coping and resilience.',
        components: [
          'Beliefs / Values — philosophical or spiritual anchors',
          'Affection — emotional expression and sharing',
          'Social — community and relational support networks',
          'Imagination — creative and symbolic outlets',
          'Cognitive — problem solving and information processing',
          'Physiological — physical and somatic activities',
        ],
      },
    ],
    definitions: [
      { term: 'Coping (Folkman & Lazarus)', definition: 'Constantly changing cognitive and behavioral efforts to manage specific external/internal demands appraised as taxing or exceeding resources.' },
      { term: 'Coping (Red Cross)', definition: 'Anything people do to adjust to the challenges and demands of stress, reducing its negative impact.' },
      { term: 'Primary appraisal', definition: 'The cognitive evaluation determining the personal significance or threat level of an event.' },
      { term: 'Secondary appraisal', definition: 'The evaluation of controllability, available coping resources, and options.' },
      { term: 'Primary control coping', definition: 'Voluntary coping efforts aimed at directly modifying the stressful problem or emotion.' },
      { term: 'Secondary control coping', definition: 'Voluntary coping efforts aimed at adapting to the stressor via cognitive restructuring or acceptance.' },
      { term: 'Disengagement coping', definition: 'Voluntary efforts aimed at redirecting attention away from the stressor or emotional reaction.' },
    ],
    inTextQuestions: [
      {
        question: 'One of the assumptions of the transactional model is that stressful experiences are conceptualized as person-environment transactions. True or False',
        answer: 'True',
      },
      {
        question: 'Responses stress model emphasizes the importance of developmental changes in the nature of stress experienced by children and adolescents and the internal /external constraints that limit coping processes. True or False',
        answer: 'True',
      },
      {
        question: 'Neglect leads to insecure working models which lead to children doubting their own value, viewing others as likely to be dangerous, and reacting to stressful events with anxiety and expectations of negative consequences. True or False',
        answer: 'True',
      },
    ],
    saqs: [
      {
        id: '5.1',
        question: 'According to the Red Cross definition, what do we mean by coping?',
        answer: 'According to the Red Cross definition, coping is anything people do to adjust to the challenges and demands of stress. It is any adjustments made to reduce the negative impact of stress.',
      },
      {
        id: '5.2',
        question: 'Explain the Coping model in the context of adaptation to illness using the transactional model of stress and coping',
        answer: 'The transactional model of stress and coping is a systems-based framework for understanding and evaluating the processes of coping with stressful events. Some of the assumptions for this model include: Stressful experiences are conceptualized as person-environment transactions, and Adaptation is based on the entire system changing from moment to moment, from one emotional context to another.',
      },
      {
        id: '5.3',
        question: 'Discuss the responses to stress model and explain the Primary Control, Secondary Control and disengagement Coping.',
        answer: 'Responses to stress model emphasizes the importance of developmental changes in the nature of stress experienced by children and adolescents, the internal/external constraints that limit coping processes, and the complex interplay between voluntary and involuntary responses to stress. Primary Control Coping: Attempts to modify stressful problem or emotion. Secondary Control Coping: Attempts to adapt via cognition. Disengagement Coping: Attempts to redirect attention away from the stressor or emotional reaction.',
      },
      {
        id: '5.4',
        question: 'Mention the three universal stressors',
        answer: 'Neglect (because it threatens relatedness), Chaos (because it undermines competence), Coercion (because it impinges on autonomy).',
      },
      {
        id: '5.5',
        question: 'The Community Stress Prevention Model suggests that by using some dimensions, coping styles can be effectively identified in individuals and communities. Highlight the dimensions.',
        answer: 'The six dimensions central to coping with adversity are: 1. Beliefs/Values 2. Affection 3. Social 4. Imagination 5. Cognitive 6. Physiological.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 6,
    title: 'Coping response',
    introduction:
      'The state of being ill is a threat for human existence. There are several approaches and responses that man gives as a result of these illnesses. All these purposeful interactions aimed at managing stress/illness are known as coping. In this study therefore you will learn about coping response, stages of responses in illness, coping with a diagnosis, coping and culture.',
    learningOutcomes: [
      '6.1 Explain coping response',
      '6.2 Highlight the Stage of Responses in illness',
      '6.3 Discuss coping with a diagnosis',
      '6.4 Explain coping and culture',
    ],
    overview:
      'Details Lazarus\'s components of stress and conscious coping, Freud\'s unconscious defenses, the 6 stages of individual response to illness, conditions influencing coping with diagnosis, collectivistic cultural coping traits, and the 5 phases of facing fatal illness.',
    content: [
      {
        heading: '6.1 Coping responses',
        body: 'Freud first talked about the unconscious mechanisms of coping, such as denial, repression, rationalization, and projection. Lazarus was one of the first to develop a theoretical perspective about coping as a conscious process, defining stress as consisting of primary appraisal, secondary appraisal, and coping. Coping strategies can be conceptualized into multiple ways: Biological/physiological Coping (the body\'s natural \'fight or flight\' method), The cognitive component of coping (mental process of thinking about the situation), The learned component of coping (strategies learned from modeling/observation), and Intention (whether the strategy is voluntary or involuntary).',
      },
      {
        heading: '6.2 Stages of responses in illness',
        body: 'There are different stages of responses in illness. 1. Crisis: the patient is seriously ill and very frightened, directing energies toward healing and controlling panic. 2. Isolation: the acute nature of the illness may decrease, but total recovery does not occur, leading to a dawning awareness of a chronic situation. 3. Anger: the sick person suffers from severe upset, terror, anxiety, and helplessness, often targeting themselves for these feelings. 4. Reconstruction: the sick person feels stronger physically or has time to master new living skills. 5. Intermittent Depression: the joy associated with new skills can give way to new feelings of despair. 6. Renewal: a sense of lingering regret for lost capacities remains, but the person learns to make realistic expectations and take an active approach to problems.',
      },
      {
        heading: '6.3 Coping with a diagnosis',
        body: 'Emotional reactions to illness may culminate in the feeling that life is meaningless. How people react to chronic illness depends on many conditions: The severity of the illness (putting energy into healing), The social support available (asking for help), and The pre illness personality of the person (resilience). The emotional trauma of chronic physical illness is caused by loss of a valued level of functioning.',
      },
      {
        heading: '6.4 Coping and culture',
        body: 'There is a connection between culture and coping. Collectivistic values emphasize interpersonal relationships, respect for authority figures, intra-cultural coping and relational universality. Forbearance, perseverance, and sacrifice are characteristics that are highly valued in collectivistic cultures. Cultural factors that can influence coping include discrimination and stigma which can erode resilience, as well as gender constraints, guilt, and shame. The 5 phase models of facing a potentially fatal illness are: Pre-diagnostic phase, Acute phase, Chronic phase, Recovery Phase, and Terminal Phase.',
      },
    ],
    keyPoints: [
      'Freud (unconscious defense mechanisms) vs. Lazarus (conscious appraisal and coping process).',
      'Coping conceptualized in 4 ways: Biological/physiological (fight or flight), Cognitive (mental appraisal), Learned (modeling/observation), and Intention (voluntary vs. involuntary).',
      '6 Stages of individual response to illness: (1) Crisis, (2) Isolation, (3) Anger, (4) Reconstruction, (5) Intermittent Depression, (6) Renewal.',
      'Coping with diagnosis depends on: severity of illness, available social support, and pre-illness personality/resilience.',
      'Culture and coping: Collectivistic values emphasize interpersonal bonds, respect for authority, forbearance, perseverance, and sacrifice.',
      '5 Phases of facing a fatal illness: Pre-diagnostic, Acute, Chronic, Recovery, and Terminal phase.',
    ],
    models: [
      {
        name: '6 Stages of Response to Illness',
        description: 'Chronological progression of emotional and behavioral responses to serious or chronic illness.',
        components: [
          '1. Crisis — acute panic, terror, disorientation, directing energy toward survival',
          '2. Isolation — realization that illness is chronic, feeling separated from normal life',
          '3. Anger — severe upset, anxiety, helplessness, self-blame',
          '4. Reconstruction — mastering new living skills, physical stabilization',
          '5. Intermittent Depression — recurring despair alternating with progress',
          '6. Renewal — realistic expectations, lingering regret transformed into active problem-solving',
        ],
      },
      {
        name: '5 Phases of Facing Potentially Fatal Illness',
        description: 'Trajectory model of coping with life-threatening diagnoses.',
        components: [
          'Pre-diagnostic phase — suspecting illness, symptom noticing',
          'Acute phase — dealing with medical diagnosis and urgent treatments',
          'Chronic phase — managing ongoing illness, therapies, and lifestyle shifts',
          'Recovery phase — convalescence and reintegration (if remission occurs)',
          'Terminal phase — coming to terms with mortality and end-of-life care',
        ],
      },
    ],
    definitions: [
      { term: 'Physiological coping', definition: 'The body\'s autonomic fight-or-flight response, secretes epinephrine and norepinephrine from the sympathetic/adrenal system.' },
      { term: 'Crisis stage', definition: 'Stage where patient is severely ill and frightened, with distorted time, disorientation, and focused on controlling panic.' },
      { term: 'Forbearance', definition: 'Patient endurance, restraint, and tolerance under adversity, highly valued in collectivistic cultures.' },
      { term: 'Collectivistic values', definition: 'Cultural emphasis on relational harmony, family support, respect for authority, and perseverance over individual autonomy.' },
    ],
    inTextQuestions: [
      {
        question: 'Coping strategies can be conceptualized into the following ways except a. Biological/physiological Coping b. The cognitive component of coping c. The trashing coping d. Intention',
        answer: 'c. The trashing coping',
      },
      {
        question: 'The severity of the illness could affect how a person responds to illness. True or False',
        answer: 'True',
      },
    ],
    saqs: [
      {
        id: '6.1',
        question: 'Explain the physiological way of coping',
        answer: 'The body has a natural method of coping with stress. Any threat or challenge perceived by an individual in the environment triggers a physiological chain of events. The sympathetic/adrenal system secretes epinephrine and norepinephrine. This is the \'fight or flight\' response.',
      },
      {
        id: '6.2',
        question: 'Discuss how patients respond in the crisis stage of illness',
        answer: 'In the crisis stage, the patient is seriously ill and very frightened. There is decrease in his ability to respond to others psychologically and physically. The sick directs his energies toward healing, and controlling panic. The patient is often too sick to even be frightened. Events are often confused. Time is distorted. Disorientation is common.',
      },
      {
        id: '6.3',
        question: 'Explain how a patient could cope with a diagnosis',
        answer: 'Emotional reactions to illness may culminate in the feeling that life is meaningless. How people react to chronic illness depends on many conditions: The severity of the illness, The social support available, The pre illness personality of the person.',
      },
      {
        id: '6.4',
        question: 'Highlight some cultural traits that can influence coping',
        answer: 'Some of the cultural traits that can influence coping include the following: 1. Forbearance 2. Perseverance 3. Sacrifice 4. Discrimination 5. Stigmatization 6. Guilt 7. Shame.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 7,
    title: 'Coping with the crisis of illness',
    introduction:
      'Bad events occur every day all over the world. From earthquake to tsunami, from tsunami to plane crash and list is endless. Crises abound every day. Illness in every context is not a good one and could be considered a crisis. In this study session, you will learn about the crisis theory, the defense mechanism of patients, the meaning of grief and mourning and how to assess a grieving patient, factors that influence how people cope when they grieve and the responsibility of a family when they grieve.',
    learningOutcomes: [
      '7.1 Explain the crisis Theory',
      '7.2 Discuss the ego defense mechanism',
      '7.3 Enumerate the types of defence mechanism',
      '7.4 Discuss the responses of patients and their families to terminal illnesses',
      '7.5 Explain how to access a grieving patient',
      '7.6 Highlight factors that Influence how people cope when they grieve',
      '7.7 Explain the responsibilities of a family during grieving',
      '7.8 Discuss grief as a family matter',
    ],
    overview:
      'Explores crisis theory (Moos), direct vs. defensive coping, 16 ego defense mechanisms, grief and mourning, assessment of the grieving client, awareness contexts, terminal illness fears, and the 5-stage family grief model.',
    content: [
      {
        heading: '7.1 Crisis Theory',
        body: 'Illness is a crisis because it is a turning point in an individual\'s life. The crisis theory described the factors that affect people\'s adjustment to having serious illness. The coping process is influenced by three factors: Illness related factors, Background and personal factors, and Physical, social and environmental factors. The coping process includes: Cognitive appraisal, Adaptive tasks, Coping skills, Adaptation and Adjustment, and General tasks.',
      },
      {
        heading: '7.2 & 7.3 Ego Defense Mechanism & Types',
        body: 'These are unconscious behaviors that offer psychological protection from a stressful event. There are two types of adjustments: Direct coping (Confrontation, Compromise, Withdrawal) and Defensive coping. Types of Defense Mechanism include: Repression, Denial, Suppression, Rationalization, Intellectualization, Identification, Introjection, Compensation, Reaction formation, Displacement, Projection, Conversion, Undoing, Dissociation, Regression, and Sublimation.',
      },
      {
        heading: '7.4 & 7.5 Grief, Mourning and Responses to Terminal Illness',
        body: 'Grief is an emotional reaction/response to loss. Mourning is the outward expression of grief. It is usually based on cultural, religious, or personal belief systems. Grief has two responses: Normal response (grief that is eventually lessened as a person readjusts) and Abnormal response (complicated grief). Abnormal grief can be divided into: Chronic grief, Delayed grief, Disenfranchised grief, Exaggerated grief, and Sudden grief.',
      },
      {
        heading: '7.6 & 7.7 Assessment of the Grieving Client & Factors Influencing Coping',
        body: 'To assess the grieving client, several factors are taken into considerations: Developmental considerations, Nature of relationship with the ill or dead, Nature of the loss, Cultural and spiritual beliefs, Gender roles, and Socioeconomic status/ social support system. Factors that influence coping during the grieving process include Dying trajectories and Awareness contexts (Closed Awareness, Suspected Awareness, Mutual Pretense, Open Awareness). Fears associated with terminal illness include: Fear of pain, Fear of loneliness, and Fear of meaninglessness.',
      },
      {
        heading: '7.8 Grief is a family matter',
        body: 'Grief today is a family matter as much as it is an individual one. The five-stage model of family grief includes: Stage 1: Crisis (disrupts the family\'s equilibrium), Stage 2: Unity (putting longstanding complaints on hold), Stage 3: Upheaval (lifestyles gradually undergo significant changes), Stage 4: Resolution (gradual deterioration and resolving longstanding issues), and Stage 5: Renewal (begins with the funeral and opens the door to renewal).',
      },
    ],
    keyPoints: [
      'Crisis Theory (Moos): Coping process influenced by illness-related, background/personal, and physical/social/environmental factors.',
      'Two types of adjustment: Direct coping (Confrontation, Compromise, Withdrawal) and Defensive coping (unconscious protective mechanisms).',
      '16 Ego defense mechanisms: Repression, Denial, Suppression, Rationalization, Intellectualization, Identification, Introjection, Compensation, Reaction formation, Displacement, Projection, Conversion, Undoing, Dissociation, Regression, and Sublimation.',
      'Grief is the internal emotional reaction to loss; Mourning is the outward, cultural/spiritual expression of grief.',
      'Abnormal (complicated) grief: Chronic, Delayed, Disenfranchised, Exaggerated, and Sudden grief.',
      'Awareness Contexts (Glaser & Strauss): Closed, Suspected, Mutual Pretense, and Open Awareness (preferred for open communication).',
      'Fears of terminal illness: Fear of pain, Fear of loneliness, and Fear of meaninglessness.',
      '5-Stage Family Grief Model: (1) Crisis, (2) Unity, (3) Upheaval, (4) Resolution, (5) Renewal.',
    ],
    models: [
      {
        name: 'Awareness Contexts (Glaser & Strauss)',
        description: 'Four patterns of awareness between dying patients, families, and healthcare providers.',
        components: [
          'Closed awareness — patient does not know they are dying',
          'Suspected awareness — patient suspects their condition but receives no confirmation',
          'Mutual pretense — both parties know about the terminal prognosis but pretend otherwise',
          'Open awareness — both patient and staff freely discuss the impending death and treatment goals',
        ],
      },
      {
        name: '5-Stage Model of Family Grief',
        description: 'Describes how the family unit as a systemic whole navigates terminal illness and bereavement.',
        components: [
          'Stage 1: Crisis — disruption of family equilibrium and immediate anxiety',
          'Stage 2: Unity — rallying together, setting aside past conflicts',
          'Stage 3: Upheaval — strain as lifestyles and roles undergo drastic adjustments',
          'Stage 4: Resolution — confronting reality, addressing unresolved interpersonal matters',
          'Stage 5: Renewal — post-funeral adaptation, reorganizing life and family identity',
        ],
      },
    ],
    definitions: [
      { term: 'Crisis Theory (Moos)', definition: 'Describes how illness acts as a turning point, influenced by illness-related, personal, and environmental factors.' },
      { term: 'Confrontation', definition: 'A direct coping style where the person faces the stressful situation directly.' },
      { term: 'Compensation', definition: 'Covering up for a perceived weakness by overemphasizing or developing a desirable trait.' },
      { term: 'Rationalization', definition: 'Attempting to prove that one\'s feelings or behaviors are justifiable through logical excuses.' },
      { term: 'Intellectualization', definition: 'Using purely logical explanations without feelings or an emotional/affective component.' },
      { term: 'Grief', definition: 'The internal emotional reaction or response to loss.' },
      { term: 'Mourning', definition: 'The outward expression and ritualized behavior undertaken to deal with loss.' },
      { term: 'Open awareness', definition: 'Free and open discussion between healthcare team, patient, and family regarding impending death.' },
    ],
    inTextQuestions: [
      {
        question: '________ involves the logical analysis and cognitive redefinition of the meaning or significance of the illness, the threats and coping ability.',
        answer: 'Cognitive appraisal',
      },
      {
        question: 'When you face a stressful situation directly it is referred to as ________.',
        answer: 'Confrontation',
      },
      {
        question: 'From this study ________ means to Cover up for a weakness by overemphasizing or making up a desirable trait.',
        answer: 'Compensation',
      },
      {
        question: 'The process that begins with a life-threatening diagnosis proceeds through a period of treatment (or treatments), and end eventually in death is known as ________.',
        answer: 'Grief',
      },
      {
        question: 'The grief that is eventually lessened as a person readjusts to his loss is called ________.',
        answer: 'Normal grief',
      },
      {
        question: 'It is preferred by health care providers and patients and involves free and open discuss on the impending death. What kind of awareness is that?',
        answer: 'Open Awareness',
      },
      {
        question: 'The model of family grief include the following except (a) Crisis (b) Unity (c) Resolution (d) Decision',
        answer: '(d) Decision',
      },
    ],
    saqs: [
      {
        id: '7.1',
        question: 'Explain the crisis theory',
        answer: 'The crisis theory described the factors that affect people\'s adjustment to having serious illness (Moos, 1982).',
      },
      {
        id: '7.2',
        question: 'Highlight the two types of adjustments',
        answer: 'The two types of adjustments are: Direct coping, Defensive coping.',
      },
      {
        id: '7.3',
        question: 'Explain rationalization and Intellectualization defense mechanisms',
        answer: 'Rationalization: Attempts to make or prove that one\'s feelings or behaviors are justifiable. Intellectualization: Using only logical explanations without feelings or an affective component.',
      },
      {
        id: '7.4',
        question: 'What is the major difference between grief and mourning?',
        answer: 'Mourning is the outward expression of grief. It is the process one undertakes to deal with the void that is now left.',
      },
      {
        id: '7.5',
        question: 'Explain the abnormal response to grief',
        answer: 'Abnormal grief is complicated grief. It can be divided into: Chronic grief, Delayed grief, Disenfranchised grief, Exaggerated grief, Sudden grief.',
      },
      {
        id: '7.6',
        question: 'How does 65 years and older age group perceive grief?',
        answer: 'They are afraid of prolonged health problems. They witness death of family members and peers. This makes them see death as inevitable.',
      },
      {
        id: '7.7',
        question: 'Highlight the several fears associated with terminal illness',
        answer: 'There are several fears associated with terminal illness and death. They are: Fear of pain, Fear of loneliness, Fear of meaninglessness.',
      },
      {
        id: '7.8',
        question: 'Discuss the crisis stage of the model of family grief.',
        answer: 'The diagnosis of a terminal illness or a potentially terminal illness creates a crisis for the family. It disrupts the family\'s equilibrium, just as a rock thrown into the middle of a still pond disrupts its equilibrium. Anxiety is the most common initial reaction to the news that a family member is terminally ill.',
      },
    ],
    sourceTag: 'slide',
  },
  {
    sessionNumber: 8,
    title: 'Influences on the sick',
    introduction:
      'The problems associated with chronic illness will ultimately affect the various domains (aspects) of not only the patient\'s life but also that of the significant others like the family etc. The physical, psychological, economic, and social dimensions are affected. Therefore in this study you will learn about the domains of the patient\'s life affected by chronic illness, the impact of chronic illness on families, the factors influencing how families react to chronic illness, reactions to hospitalization across ages and the role of the nurse in hospitalization.',
    learningOutcomes: [
      '8.1 Explain the domains of the patient\'s life affected by chronic illness',
      '8.2 Discuss the impact of chronic illness on families',
      '8.3 Highlight the factors influencing how families will react to chronic illness',
      '8.4 Discuss the reactions to hospitalization across ages',
      '8.5 Highlight the role of the nurse during and at the end of hospitalization',
    ],
    overview:
      'Examines the physical, psychological, economic, and social domains affected by chronic illness, Pollin\'s 8 fears, family stressors and strains, age-specific reactions to hospitalization, and the 3-phase nurse-patient therapeutic relationship.',
    content: [
      {
        heading: '8.1 Domains of the patient\'s life affected by chronic illness',
        body: 'There are several domains (fields) of the patient\'s life affected by chronic illness. They are: Physical domain, Psychological Domain, Economic Domain, and Social Domain. The physical domain can be assessed by taking into consideration his Functional Status and Physical Symptoms. The psychological domain includes Grief and Sorrow, and Fears. Irene Pollin highlighted eight fears that a patient with chronic illness experiences: Loss of control, Loss of self-image, Loss of independence, Stigma, Abandonment, Expression of anger, Isolation, and Death. Economic Domain involves loss of income due to incapacitating effects. Social Domain involves decreased participation in social activities.',
      },
      {
        heading: '8.2 Impact of chronic illness on families',
        body: 'Families living with chronic illness confront a new set of demands related to that illness. Some of such demands include: Financial Stressors and Strains, Social Demands, and Psychological Demands. Financial demands include medical visits, therapy, special equipment, and medicines. Social demands can strain marital relationships and sibling adjustments. Psychological demands involve mourning over the loss of what could have been the hopes, dreams, and possibilities of the family member that is ill.',
      },
      {
        heading: '8.3 Factors influencing how families will respond to chronic illness',
        body: 'Variations exist in how families respond to the consequences of chronic illness. These variations are influenced by the following: Nature and characteristics of the condition, Resources (Personal, Social/Familial, Community), Illness phases (Crisis Phase, Chronic Phase, Terminal Phase), Family life stage, and Gender. The term \'feminization of care\' refers to the notion that most women are caregivers and expected to provide caregiving duties.',
      },
      {
        heading: '8.4 Reactions to Hospitalization across ages',
        body: 'Age affects individual reactions to hospitalization. The categories are: Infancy to 5 years (preschool) characterized by helplessness and passivity. Six to 11 years (school age) characterized by feelings of responsibility, guilt, and anger. 10 to 12 years (preadolescent) characterized by disturbance, anger, and fear of death. 13 to 18 years (adolescent) show self-consciousness, rebellion, and may act out defiance. 19 to 45 years (young adulthood) where cultural and religious beliefs influence attitudes. 45 to 65 years (middle adulthood) accepts mortality as inevitable. 65 years and older (older adulthood) are afraid of prolonged health problems and see death as inevitable.',
      },
      {
        heading: '8.5 Role of the nurse during and at the end of hospitalization',
        body: 'The nurse and the client work together to assist the client to grow and solve his problems in a therapeutic relationship. The phases in the nurse-patient relationship include: Orientation Phase (establishes a therapeutic environment and trust), Identification / working phase (client\'s problems are identified and solutions are explored), and Termination/ resolution phase (when mutually agreed goals are met and the patient is discharged, which may cause normal separation anxiety).',
      },
    ],
    keyPoints: [
      '4 domains affected by chronic illness: Physical (functional status, symptoms), Psychological (grief, fears), Economic (lost income, treatment costs), Social (isolation, altered participation).',
      'Irene Pollin\'s 8 fears of chronic illness: Loss of control, Loss of self-image, Loss of independence, Stigma, Abandonment, Expression of anger, Isolation, Death.',
      'Demands on families: Financial stressors (equipment, medication, lost wages), Social demands (marital/sibling strain), Psychological demands (mourning lost expectations).',
      'Factors influencing family response: Nature of condition, Resources, Illness phases, Family life stage, and Gender ("feminization of care").',
      'Reactions to hospitalization across age groups: Infancy–5 (helplessness, passivity); 6–11 (guilt, responsibility); 10–12 (aggression, fear of death); 13–18 (rebellion, defiance); 19–45 (cultural/religious mediation); 45–65 & 65+ (mortality acceptance, fear of prolonged debility).',
      '3 phases in nurse-patient relationship: Orientation Phase (rapport, trust, contract), Identification/Working Phase (problem-solving, growth), Termination/Resolution Phase (goal achievement, separation management).',
    ],
    models: [
      {
        name: 'Nurse-Patient Therapeutic Relationship Phases',
        description: 'Collaborative interpersonal process enabling the client to grow and resolve health challenges.',
        components: [
          'Orientation phase — establishing rapport, mutual trust, and clarifying expectations/duration',
          'Identification / Working phase — identifying core health problems and actively implementing solutions',
          'Termination / Resolution phase — evaluating goal achievement, fostering patient independence, managing discharge anxiety',
        ],
      },
      {
        name: 'Pollin\'s 8 Fears of Chronic Illness',
        description: 'Eight primary psychological fears identified by Irene Pollin confronting chronic illness sufferers.',
        components: [
          'Loss of control',
          'Loss of self-image',
          'Loss of independence',
          'Stigma',
          'Abandonment',
          'Expression of anger',
          'Isolation',
          'Death',
        ],
      },
    ],
    definitions: [
      { term: 'Feminization of care', definition: 'The cultural and societal expectation that women predominantly undertake informal family caregiving burdens.' },
      { term: 'Orientation phase', definition: 'The initial therapeutic phase focused on establishing trust, boundaries, and relationship goals.' },
      { term: 'Termination phase', definition: 'The concluding therapeutic phase when agreed goals are met, supporting client independence and addressing separation anxiety.' },
      { term: 'Physical domain', definition: 'The functional status and physical symptomatology experienced by a chronically ill individual.' },
    ],
    inTextQuestions: [
      {
        question: 'The domains (fields) of the patient\'s life affected by chronic illness are the following except. (a) Physical domain (b) Psychological Domain (c) Scientific domain (d) Economic Domain',
        answer: '(c) Scientific domain',
      },
      {
        question: 'How a family responds to chronic illness is also a function of the phases of the illnesses. True or False',
        answer: 'True',
      },
      {
        question: 'The ------------------------is characterized by helplessness, passivity, and generalized fear',
        answer: 'Infancy to 5 years (preschool)',
      },
      {
        question: 'The phases in the nurse- patient relationship include the following except (a) Orientation Phase (b) Termination/ resolution phase (c) Determination Phase',
        answer: '(c) Determination Phase',
      },
    ],
    saqs: [
      {
        id: '8.1',
        question: 'Explain the economic domain of patients in relation to chronic illnesses',
        answer: 'Chronic illness is emotionally and financially draining. Due to the incapacitating effects of the illness, patients may find themselves giving up their jobs. The patient\'s family may also experience loss of income, particularly those family members who have to forfeit their jobs to assist with caregiving activities.',
      },
      {
        id: '8.2',
        question: 'Mention the new set of demands that families living with chronic illness confront',
        answer: '• Financial Stressors and Strains • Social Demands • Psychological Demands',
      },
      {
        id: '8.3',
        question: 'Discuss one of the factors influencing how families will respond to chronic illness',
        answer: 'Family Life Stage: Families who have a family member with a chronic illness have different needs, strengths, and resources at various points in the family life cycle. In a family with young children, for example, when one of the parental figures is diagnosed with a devastating disease, the impact on child-rearing tasks can be affected in several ways.',
      },
      {
        id: '8.4',
        question: 'How does 10 to 12 years (preadolescent) age group respond to hospitalization?',
        answer: '10 to 12 years (preadolescent): It is characterized by disturbance, anger/aggression, change in behavior, mood, personality, somatic symptoms, fear and anxiety and fear of death fear.',
      },
      {
        id: '8.5',
        question: 'Explain the termination phase of the nurse-patient relationship',
        answer: 'Preparation of the termination phase begins at the orientation phase, when the duration and length of the nurse-client relationship was established. The nurse terminates the relationship when the mutually agreed goals are met, the patient is discharged. The focus of this stage is the growth that has occurred in the client and how the nurse has helped the patient to become independent and responsible in making his own decisions.',
      },
    ],
    sourceTag: 'slide',
  },
];

// ── Concepts Page Content ────────────────────────────────────────
// Organized by category for the focused memorization view.

export const conceptItems: ConceptItem[] = [
  {
    sessionNumber: 1,
    category: 'Foundational Definitions',
    items: [
      { term: 'Behavior', definition: 'Any observable action or response of an organism to stimuli.' },
      { term: 'Health (WHO)', definition: 'A state of complete physical, mental, and social well-being — not merely the absence of disease.' },
      { term: 'Illness vs Disease', definition: 'Illness is subjective (how one feels); disease is objective (clinical diagnosis).' },
      { term: 'Determinants of health', definition: 'Biological, behavioral, environmental, social, and healthcare access factors.' },
    ],
  },
  {
    sessionNumber: 1,
    category: 'Health Belief Model',
    items: [
      { term: 'Perceived susceptibility', definition: 'Belief about the likelihood of getting a condition.' },
      { term: 'Perceived severity', definition: 'Belief about the seriousness of the condition.' },
      { term: 'Perceived benefits', definition: 'Belief in the effectiveness of taking preventive action.' },
      { term: 'Perceived barriers', definition: 'Belief about the costs/obstacles of taking action.' },
      { term: 'Cues to action', definition: 'Triggers that prompt health behavior (symptoms, media, advice).' },
      { term: 'Self-efficacy', definition: 'Confidence in one\'s ability to successfully take action.' },
    ],
  },
  {
    sessionNumber: 2,
    category: 'Stages of Illness (Suchman)',
    items: [
      { term: 'Stage 1', definition: 'Symptom experience — recognizing something is wrong.' },
      { term: 'Stage 2', definition: 'Assumption of the sick role — accepting illness, seeking validation.' },
      { term: 'Stage 3', definition: 'Medical care contact — seeking professional help.' },
      { term: 'Stage 4', definition: 'Dependent patient role — relying on health professionals.' },
      { term: 'Stage 5', definition: 'Recovery/rehabilitation — returning to normal functioning.' },
    ],
  },
  {
    sessionNumber: 3,
    category: 'Medication Adherence',
    items: [
      { term: 'Adherence', definition: 'Extent to which patient behavior matches agreed recommendations.' },
      { term: 'Persistence', definition: 'Duration of time a patient continues taking medication.' },
      { term: 'Direct methods', definition: 'DOT, blood/urine drug levels.' },
      { term: 'Indirect methods', definition: 'Self-reports, pill counts, refill records, MEMS caps, clinical response.' },
      { term: 'Common barriers', definition: 'Regimen complexity, side effects, cost, asymptomatic state, poor rapport, low health literacy.' },
    ],
  },
  {
    sessionNumber: 4,
    category: 'Leventhal\'s 5 Illness Perceptions',
    items: [
      { term: 'Identity', definition: 'The label and symptoms associated with the illness.' },
      { term: 'Cause', definition: 'Personal beliefs about what caused the illness.' },
      { term: 'Timeline', definition: 'Expected duration — acute, chronic, or cyclical.' },
      { term: 'Consequences', definition: 'Anticipated effects and outcomes of the illness.' },
      { term: 'Controllability/Cure', definition: 'Beliefs about whether the illness can be managed or cured.' },
    ],
  },
  {
    sessionNumber: 4,
    category: 'Disease Causation Models',
    items: [
      { term: 'Germ Theory', definition: 'Single specific agent causes a specific disease.' },
      { term: 'Epidemiological Triad', definition: 'Agent + Host + Environment interaction.' },
      { term: 'Multifactorial', definition: 'Multiple factors contribute to disease development.' },
      { term: 'Web of Causation', definition: 'Complex interplay of multiple interconnected causal factors.' },
    ],
  },
  {
    sessionNumber: 5,
    category: 'Stress & Coping Models',
    items: [
      { term: 'Primary appraisal', definition: 'Evaluating if a situation is irrelevant, benign-positive, or stressful.' },
      { term: 'Secondary appraisal', definition: 'Evaluating available coping resources and options.' },
      { term: 'Problem-focused coping', definition: 'Addressing or changing the source of stress directly.' },
      { term: 'Emotion-focused coping', definition: 'Managing emotional responses to stress.' },
      { term: '3 universal stressors (Motivational Model)', definition: 'Threats to relatedness, competence, and autonomy.' },
    ],
  },
  {
    sessionNumber: 6,
    category: 'Stages of Response to Illness',
    items: [
      { term: '6 stages', definition: 'Crisis → Isolation → Anger → Reconstruction → Intermittent Depression → Renewal.' },
      { term: 'Kübler-Ross 5 stages', definition: 'Denial → Anger → Bargaining → Depression → Acceptance.' },
    ],
  },
  {
    sessionNumber: 7,
    category: 'Defense Mechanisms',
    items: [
      { term: 'Repression', definition: 'Unconsciously blocking unacceptable thoughts from awareness.' },
      { term: 'Denial', definition: 'Refusing to acknowledge a threatening reality.' },
      { term: 'Projection', definition: 'Attributing one\'s unacceptable feelings to another person.' },
      { term: 'Displacement', definition: 'Redirecting emotions to a safer substitute target.' },
      { term: 'Sublimation', definition: 'Channeling unacceptable impulses into socially acceptable activities.' },
      { term: 'Rationalization', definition: 'Creating logical excuses for unacceptable behavior.' },
      { term: 'Regression', definition: 'Reverting to an earlier developmental stage under stress.' },
      { term: 'Reaction formation', definition: 'Expressing the opposite of one\'s true unacceptable feelings.' },
    ],
  },
  {
    sessionNumber: 7,
    category: 'Grief & Awareness Contexts',
    items: [
      { term: 'Grief vs Mourning', definition: 'Grief is internal emotional response; mourning is outward cultural expression.' },
      { term: 'Closed awareness', definition: 'Patient does not know they are dying.' },
      { term: 'Suspected awareness', definition: 'Patient suspects but has no confirmation.' },
      { term: 'Mutual pretense', definition: 'Both know but neither discusses it.' },
      { term: 'Open awareness', definition: 'Everyone acknowledges and discusses the dying openly.' },
    ],
  },
  {
    sessionNumber: 8,
    category: 'Chronic Illness Impact & Pollin\'s Fears',
    items: [
      { term: '4 domains affected', definition: 'Physical, Psychological, Economic, Social.' },
      { term: 'Pollin\'s 8 fears', definition: 'Loss of control, loss of self-image, loss of independence, stigma, abandonment, anger, isolation, death.' },
    ],
  },
  {
    sessionNumber: 8,
    category: 'Hospitalization & Nurse-Patient Relationship',
    items: [
      { term: 'Infant reaction', definition: 'Separation anxiety from primary caregivers.' },
      { term: 'Toddler reaction', definition: 'Loss of control, regression to earlier behaviors.' },
      { term: 'Preschooler reaction', definition: 'Fear of mutilation, magical thinking.' },
      { term: 'School-age reaction', definition: 'Loss of normalcy, fear of disability.' },
      { term: 'Adolescent reaction', definition: 'Body image concerns, privacy needs, autonomy struggles.' },
      { term: 'Peplau\'s 3 phases', definition: 'Orientation → Working → Termination.' },
    ],
  },
];
