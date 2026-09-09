import type { StudySessionContent } from '../types';

export const ana213Sessions: StudySessionContent[] = [
  {
    sessionNumber: 1,
    title: 'Module 1: General Anatomy, Organization of Human Body & Anatomical Terminology',
    overview: 'Introduction to human gross anatomy, anatomical terminology, anatomical planes, positions, cavities, and body organization.',
    content: [
      {
        heading: '1.1 The Anatomical Position and Directional Terminology',
        body: 'The anatomical position is the standardized reference posture adopted internationally for anatomical descriptions. In this position, the human body stands upright, feet slightly separated with toes directed forward, eyes looking horizontally forward, upper limbs resting beside the torso, and the palms of the hands facing anteriorly with thumbs pointed away from the body. All directional descriptions assume this position regardless of patient orientation. Key terms: Superior (cranial) denotes toward the head or upper part of a structure; Inferior (caudal) denotes away from the head or toward the lower body; Anterior (ventral) is toward the front; Posterior (dorsal) is toward the back; Medial is nearer to the midline; Lateral is further from the midline; Proximal is closer to the limb origin; Distal is further from the limb origin; Superficial is nearer the surface; Deep is farther from the body surface.'
      },
      {
        heading: '1.2 Cardinal Anatomical Planes and Sections',
        body: 'Sectional anatomy relies on three fundamental mutually perpendicular cardinal planes: (1) The Sagittal plane passes vertically through the body, dividing it into right and left portions. When passing precisely through the midline, it is termed the median sagittal plane (mid-sagittal) dividing the body into equal symmetrical halves; planes parallel to it are parasagittal planes. (2) The Coronal (frontal) plane passes vertically at right angles to the sagittal plane, dividing the body into anterior (front) and posterior (back) parts. (3) The Transverse (horizontal or axial) plane cuts horizontally across the longitudinal axis, dividing the body into superior (upper) and inferior (lower) portions.'
      },
      {
        heading: '1.3 Human Body Cavities and Serous Membranes',
        body: 'Body cavities are internal fluid-filled spaces that shield, support, and accommodate internal organs. The dorsal body cavity contains the cranial cavity (housing the brain and meninges) and the vertebral canal (housing the spinal cord). The ventral body cavity is subdivided by the dome-shaped diaphragm into the superior thoracic cavity and the inferior abdominopelvic cavity. The thoracic cavity contains the paired pleural cavities (lungs), the pericardial cavity (heart), and the central mediastinum. The abdominopelvic cavity is lined by the peritoneum, the thoracic cavity by the pleura, and the pericardial space by the pericardium. Serous membranes consist of a parietal layer lining cavity walls and an inner visceral layer covering organ surfaces, lubricated by slippery serous fluid.'
      },
      {
        heading: '1.4 Structural Levels of Biological Organization',
        body: 'The human body is structured in a hierarchical continuum: Chemical level (atoms bonding into macromolecular compounds such as DNA, carbohydrates, proteins, and lipids), Cellular level (specialized functional units of life), Tissue level (groups of similar cells with specialized extracellular matrices classified into epithelial, connective, muscle, and nervous tissue), Organ level (distinct structures formed from two or more primary tissue types executing specialized physiological roles), System level (integrated organs functioning harmoniously), and Organismal level (the complete living biological being).'
      }
    ],
    keyPoints: [
      'Standard anatomical position assumes an erect posture, eyes forward, arms at sides, palms facing forward with thumbs lateral, and feet flat.',
      'Sagittal, coronal, and transverse planes are the three cardinal orthogonal reference planes used in clinical imaging and gross anatomy.',
      'The diaphragm is the primary anatomical muscular partition separating the thoracic cavity from the abdominopelvic cavity.',
      'Serous membranes feature double layers: the parietal layer lines the body cavity wall, while the visceral layer directly envelops organs.',
      'Biological structural hierarchy ascends from chemical to cellular, tissue, organ, organ-system, and organismal levels.'
    ],
    models: [
      {
        name: 'Hierarchy of Anatomical Organization',
        description: 'Six ascending hierarchical levels of structure and function in the human organism.',
        components: [
          'Chemical Level: Atoms, molecules, and biological macromolecules',
          'Cellular Level: Basic structural and functional units (e.g., osteocytes, neurons, myocytes)',
          'Tissue Level: Epithelial, Connective, Muscular, and Nervous tissues',
          'Organ Level: Discrete anatomical organs composed of two or more tissues',
          'Organ System Level: Eleven integrated physiological organ systems',
          'Organismal Level: Complete, coordinated living human entity'
        ]
      }
    ],
    definitions: [
      {
        term: 'Anatomical Position',
        definition: 'Universal standard anatomical reference posture: erect body, gaze forward, upper limbs by sides, palms facing forward with thumbs pointing laterally, feet together.'
      },
      {
        term: 'Coronal (Frontal) Plane',
        definition: 'A vertical plane dividing the human body or organ into anterior (front) and posterior (back) portions.'
      },
      {
        term: 'Sagittal Plane',
        definition: 'A vertical longitudinal plane that divides the body into right and left sections; mid-sagittal yields symmetrical equal halves.'
      },
      {
        term: 'Visceral Serosa',
        definition: 'The inner layer of a serous membrane that adheres directly to the outer surface of visceral organs.'
      }
    ],
    inTextQuestions: [
      {
        question: 'Why is the anatomical position universally utilized as the benchmark for anatomical and clinical descriptions?',
        answer: 'It provides a fixed, unambiguous frame of reference regardless of the actual position (supine, prone, lateral) the patient or specimen assumes during examination, imaging, or surgical procedures.'
      },
      {
        question: 'Which anatomical plane would divide the brain into anterior and posterior segments?',
        answer: 'The coronal (or frontal) plane.'
      },
      {
        question: 'What anatomical structure separates the thoracic cavity from the abdominal cavity?',
        answer: 'The muscular thoracic diaphragm.'
      }
    ],
    saqs: [
      {
        id: '1.1',
        question: 'Define the standard anatomical position and state four reciprocal directional pairs used in clinical anatomy.',
        answer: 'The standard anatomical position is the reference posture wherein the subject stands erect, face oriented forward, upper extremities alongside the trunk, palms facing anteriorly with thumbs directed outward, and lower extremities parallel with feet flat on the floor. Reciprocal directional pairs: (1) Superior (cranial) and Inferior (caudal), (2) Anterior (ventral) and Posterior (dorsal), (3) Medial and Lateral, (4) Proximal and Distal.'
      },
      {
        id: '1.2',
        question: 'Differentiate between the parietal and visceral layers of serous membranes, providing two clinical anatomical examples.',
        answer: 'The parietal layer lines the internal walls of closed body cavities, while the visceral layer directly envelops the outer adventitia/surface of organs within that cavity. Between them lies a serous fluid-filled potential space. Examples: (1) Parietal pleura lining the thoracic cage vs. visceral pleura covering lung parenchyma; (2) Parietal peritoneum lining abdominal walls vs. visceral peritoneum investing gastrointestinal viscera.'
      }
    ],
    sourceTag: 'manual'
  },
  {
    sessionNumber: 2,
    title: 'Module 2: General Embryology, Gametogenesis & Early Human Development',
    overview: 'Overview of gametogenesis, fertilization, cleavage, blastocyst formation, implantation, gastrulation, and germ layer derivatives.',
    content: [
      {
        heading: '2.1 Gametogenesis: Spermatogenesis and Oogenesis',
        body: 'Gametogenesis is the specialized biological process through which primordial germ cells undergo meiosis and cytodifferentiation to produce mature haploid gametes (spermatozoa and ova). Spermatogenesis begins at puberty within the seminiferous tubules of the testes, continuously generating four functional spermatozoa from each primary spermatocyte over approximately 64 to 74 days under FSH, LH, and testosterone regulation. In contrast, oogenesis begins during prenatal embryonic development: oogonia undergo mitosis and enter meiosis I to form primary oocytes, which remain arrested in prophase I (diplotene stage) until puberty. At ovulation, the secondary oocyte completes meiosis I and arrests in metaphase II, which is only completed upon successful fertilization by a spermatozoon.'
      },
      {
        heading: '2.2 Fertilization, Cleavage, and Blastocyst Formation',
        body: 'Fertilization normally occurs in the ampulla of the uterine (fallopian) tube. It comprises sperm capacitation, the acrosome reaction (penetration of corona radiata and zona pellucida), fusion of plasma membranes, the cortical reaction to prevent polyspermy, and fusion of male and female pronuclei restoring diploidy (46 chromosomes). Following fertilization, the zygote undergoes rapid mitotic divisions called cleavage without net cell growth, creating individual cells termed blastomeres. By day 3–4, a solid ball of 16–32 blastomeres forms the morula. Fluid accumulates within the morula to form a blastocyst cavity (blastocoele), demarcating two distinct cell lineages: the outer trophoblast (which gives rise to embryonic placenta and extraembryonic membranes) and the inner cell mass or embryoblast (which forms the embryo proper).'
      },
      {
        heading: '2.3 Implantation and the Bilaminar Germ Disc',
        body: 'Implantation of the blastocyst commences around day 6 post-fertilization in the endometrium of the superior posterior uterine wall. The trophoblast differentiates into an inner cellular cytotrophoblast and an outer invasive, multinucleated syncytiotrophoblast, which secretes human chorionic gonadotropin (hCG). Concurrently, during the second week (the "week of twos"), the embryoblast differentiates into a bilaminar embryonic disc comprising two layers: the dorsal epiblast (columnar cells giving rise to the amniotic cavity) and the ventral hypoblast (cuboidal cells lining the exocoelomic cavity / primary yolk sac).'
      },
      {
        heading: '2.4 Gastrulation and the Trilaminar Embryonic Disc',
        body: 'Gastrulation is the defining developmental event of the third week (the "week of threes"), transforming the bilaminar disc into a trilaminar embryo with three primary germ layers. Gastrulation is initiated by the formation of the primitive streak on the caudal dorsal surface of the epiblast. Epiblast cells invaginate through the primitive streak via epithelial-to-mesenchymal transition: displacing hypoblast cells to form the Endoderm, migrating laterally between layers to form the intraembryonic Mesoderm, and remaining dorsal epiblast cells become the Ectoderm. The primitive node and notochord establish embryonic axial orientation and induce neurulation.'
      }
    ],
    keyPoints: [
      'Spermatogenesis produces four viable spermatozoa per primary spermatocyte; oogenesis produces one mature ovum and polar bodies.',
      'Oocytes are arrested in prophase I from fetal life until ovulation, and in metaphase II until fertilization.',
      'Fertilization restores diploid chromosome count (2n = 46), determines chromosomal sex (XX or XY), and triggers cleavage.',
      'Week 2 is characterized by bilaminar disc formation (epiblast + hypoblast) and trophoblast differentiation (cytotrophoblast + syncytiotrophoblast).',
      'Gastrulation in week 3 produces the three definitive germ layers: Ectoderm, Mesoderm, and Endoderm.'
    ],
    models: [
      {
        name: 'Germ Layer Fate Mapping',
        description: 'The three primary germ layers established during gastrulation and their adult anatomical tissue derivatives.',
        components: [
          'Ectoderm: Central and peripheral nervous systems, epidermis of skin, hair, nails, lens of eye, adrenal medulla',
          'Mesoderm: Musculoskeletal system, cardiovascular system, kidneys and gonads, adrenal cortex, connective tissues',
          'Endoderm: Epithelial lining of gastrointestinal tract, respiratory system, liver parenchyma, pancreas, urinary bladder'
        ]
      }
    ],
    definitions: [
      {
        term: 'Gastrulation',
        definition: 'The formative morphogenetic process in the third embryonic week that establishes the three primary germ layers (ectoderm, mesoderm, endoderm) from the epiblast.'
      },
      {
        term: 'Syncytiotrophoblast',
        definition: 'The outer multinucleated syncytial layer of the trophoblast that invades maternal uterine endometrium and produces hCG.'
      },
      {
        term: 'Notochord',
        definition: 'A cellular rod developed along the longitudinal embryonic axis that serves as the primitive axial skeleton and induces neural tube formation.'
      }
    ],
    inTextQuestions: [
      {
        question: 'At what stage of meiosis is the primary oocyte arrested prior to ovulation?',
        answer: 'The primary oocyte is arrested in prophase I (specifically the diplotene stage) from embryonic life until puberty.'
      },
      {
        question: 'Where does physiological fertilization typically take place in the female reproductive tract?',
        answer: 'In the ampulla of the uterine (fallopian) tube.'
      },
      {
        question: 'Which specific embryonic layer gives rise to the central nervous system?',
        answer: 'The neuroectoderm (specialized surface ectoderm induced by the underlying notochord).'
      }
    ],
    saqs: [
      {
        id: '2.1',
        question: 'Outline the fundamental cytological differences between spermatogenesis and oogenesis.',
        answer: 'Spermatogenesis: Commences at puberty, continuous process without major meiotic arrest, produces 4 functional spermatozoa per primary spermatocyte, motile gametes, millions produced daily. Oogenesis: Commences in prenatal fetal life, contains two prolonged meiotic arrests (prophase I until puberty, metaphase II until fertilization), yields only 1 mature ovum and 2-3 non-functional polar bodies per primary oocyte, non-motile gamete with abundant cytoplasm, cyclical release (typically one per month).'
      },
      {
        id: '2.2',
        question: 'Define gastrulation and enumerate the three primary germ layers with two tissue derivatives of each.',
        answer: 'Gastrulation is the embryonic process occurring in week 3 that converts the bilaminar embryonic disc into a trilaminar disc composed of three primary germ layers: (1) Ectoderm derivatives: Epidermis of skin and Central Nervous System (brain and spinal cord). (2) Mesoderm derivatives: Skeletal muscle and cardiovascular system (heart, blood vessels). (3) Endoderm derivatives: Epithelial lining of the digestive tract and epithelial lining of the respiratory tree.'
      }
    ],
    sourceTag: 'manual'
  },
  {
    sessionNumber: 3,
    title: 'Module 3: Musculoskeletal System & Neuroanatomy Fundamentals',
    overview: 'Comprehensive introduction to osteology, arthrology, muscle architecture, central and peripheral nervous systems, and reflex arcs.',
    content: [
      {
        heading: '3.1 Skeletal System: Bone Classification and Osteology',
        body: 'The human adult skeleton comprises 206 distinct bones divided into two major functional sections: the axial skeleton (80 bones: skull, vertebral column, ribs, and sternum providing central support and organ protection) and the appendicular skeleton (126 bones: pectoral and pelvic girdles and upper and lower limb bones facilitating locomotion and manipulation). Morphologically, bones are classified into: Long bones (e.g., femur, humerus, possessing a diaphysis shaft and epiphyses ends), Short bones (e.g., carpals, tarsals, roughly cuboidal), Flat bones (e.g., parietal bone, sternum, scapula, thin parallel compact plates enclosing cancellous diploë), Irregular bones (e.g., vertebrae, sphenoid), and Sesamoid bones (e.g., patella, embedded within tendons to modify tendon pull). Histologically, bone tissue presents dense compact cortical bone organized into osteons (Haversian systems) and inner trabecular spongy bone housing red bone marrow.'
      },
      {
        heading: '3.2 Arthrology: Classification and Mechanics of Joints',
        body: 'Joints (articulations) occur where two or more skeletal elements meet. Structurally and functionally, joints are categorized into three classes: (1) Fibrous joints (synarthroses): bones united by fibrous connective tissue allowing negligible movement (sutures of cranial vault, syndesmoses like inferior tibiofibular joint, gomphoses anchor teeth into alveolar sockets). (2) Cartilaginous joints (amphiarthroses): bones joined by cartilage; primary cartilaginous joints (synchondroses) utilize hyaline cartilage (epiphyseal growth plates), while secondary cartilaginous joints (symphyses) utilize fibrocartilage (pubic symphysis, intervertebral discs). (3) Synovial joints (diarthroses): freely movable articulations featuring a joint cavity containing synovial fluid enclosed by a fibrous capsule, lined by synovial membrane, with articular ends capped by frictionless hyaline cartilage. Subtypes include planar, hinge, pivot, condyloid, saddle, and ball-and-socket joints.'
      },
      {
        heading: '3.3 Muscular Architecture and Functional Roles',
        body: 'Muscular tissue is categorized into skeletal, cardiac, and smooth muscle types. Skeletal muscles represent voluntary, striated contractile organs anchored to bones via collagenous tendons or broad aponeuroses. Muscle fascicle architectural arrangements dictate range of motion and force production: parallel, convergent (fan-shaped), pennate (unipennate, bipennate, multipennate providing high force), circular (sphincters), and fusiform. During movement execution, muscles act cooperatively: the Agonist (prime mover) contracts to produce the designated primary movement; the Antagonist stretches and yields to counteract the agonist; Synergists steady the joint or assist prime movement; and Fixators stabilize the proximal skeletal origin.'
      },
      {
        heading: '3.4 Neuroanatomy: Central vs. Peripheral Nervous System',
        body: 'The nervous system is organized anatomically into the Central Nervous System (CNS: brain and spinal cord enclosed in the dorsal cavity) and Peripheral Nervous System (PNS: 12 pairs of cranial nerves and 31 pairs of spinal nerves with associated ganglia). Functionally, the PNS divides into the Sensory (afferent) division transmitting somatosensory and visceral input toward the CNS, and the Motor (efferent) division conducting impulses outward. The motor division comprises the Somatic Nervous System (voluntary control of skeletal musculature) and the Autonomic Nervous System (ANS: involuntary control of cardiac muscle, smooth muscle, and glands). The ANS further divides into the sympathetic division ("fight or flight", thoracolumbar outflow) and the parasympathetic division ("rest and digest", craniosacral outflow). A basic reflex arc consists of a sensory receptor, afferent neuron, integrating center within CNS gray matter, efferent neuron, and effector organ.'
      }
    ],
    keyPoints: [
      'The 206 bones of the human skeleton divide into axial (80) and appendicular (126) skeletons.',
      'Synovial joints are characterized by a fibrous capsule, synovial cavity, synovial fluid, and articular hyaline cartilage.',
      'Muscles work in functional teams: agonist (prime mover), antagonist, synergist, and fixator.',
      'The nervous system comprises the CNS (brain and spinal cord) and PNS (12 cranial nerve pairs, 31 spinal nerve pairs).',
      'The autonomic nervous system is divided into sympathetic (thoracolumbar) and parasympathetic (craniosacral) divisions.'
    ],
    models: [
      {
        name: 'Synovial Joint Classification Model',
        description: 'Morphological classification of diarthrodial joints and their degrees of operational freedom.',
        components: [
          'Hinge (Ginglymus): Uniaxial flexion/extension (e.g., elbow, interphalangeal joints)',
          'Pivot (Trochoid): Uniaxial rotation around central axis (e.g., atlantoaxial, proximal radioulnar joint)',
          'Condyloid (Ellipsoid): Biaxial flexion/extension and abduction/adduction (e.g., radiocarpal wrist joint)',
          'Saddle (Sellar): Biaxial reciprocal concavoconvex surfaces (e.g., 1st carpometacarpal joint of thumb)',
          'Ball and Socket (Spheroid): Multiaxial all planes + circumduction (e.g., glenohumeral shoulder, hip joint)',
          'Plane (Gliding): Nonaxial gliding translation (e.g., acromioclavicular, intercarpal joints)'
        ]
      }
    ],
    definitions: [
      {
        term: 'Haversian System (Osteon)',
        definition: 'The structural and functional microscopic cylindrical unit of compact cortical bone, consisting of concentric lamellae surrounding a central neurovascular canal.'
      },
      {
        term: 'Synarthrosis',
        definition: 'An immovable fibrous articulation providing maximum mechanical stability (such as cranial sutures).'
      },
      {
        term: 'Autonomic Nervous System',
        definition: 'The visceral efferent division of the peripheral nervous system regulating involuntary vegetative functions of cardiac muscle, smooth muscle, and glandular tissue.'
      }
    ],
    inTextQuestions: [
      {
        question: 'What type of cartilage coats the articular ends of bones in a typical synovial joint?',
        answer: 'Hyaline articular cartilage.'
      },
      {
        question: 'How many pairs of spinal nerves originate from the human spinal cord?',
        answer: '31 pairs: 8 cervical, 12 thoracic, 5 lumbar, 5 sacral, and 1 coccygeal.'
      },
      {
        question: 'Which division of the autonomic nervous system originates from the thoracolumbar spinal cord segments?',
        answer: 'The sympathetic nervous system (T1 to L2/L3 lateral horn neurons).'
      }
    ],
    saqs: [
      {
        id: '3.1',
        question: 'List the five structural components essential to every synovial joint.',
        answer: '(1) Articular cartilage (hyaline cartilage covering bone ends), (2) Joint (synovial) cavity filled with synovial fluid, (3) Fibrous articular capsule enclosing the joint, (4) Synovial membrane lining internal capsule surfaces, and (5) Reinforcing ligaments (extrinsic or intrinsic).'
      },
      {
        id: '3.2',
        question: 'Outline the five anatomical components of a typical somatic reflex arc.',
        answer: '(1) Sensory receptor (detects noxious or sensory stimulus), (2) Afferent / Sensory neuron (transmits impulse into the CNS), (3) Integrating center (one or more synapses within CNS gray matter, often involving interneurons), (4) Efferent / Motor neuron (transmits nerve impulse from CNS to periphery), and (5) Effector organ (skeletal muscle contracting in response).'
      }
    ],
    sourceTag: 'manual'
  }
];
