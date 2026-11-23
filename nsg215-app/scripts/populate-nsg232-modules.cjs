const fs = require('fs');
const path = require('path');

const modules = [
  // Module 1
  {
    "id": 1,
    "title": "Fever Management and Tepid Sponging",
    "introduction": "Fever is one of the most frequent acute presentations in primary and emergency care, accounting for over 14% of pediatric hospital attendances. Mastering the physiological distinction between fever and hyperthermia, recognizing fever patterns and stages of reduction, and executing safe, evidence-based tepid sponging enables nurses to lower elevated body temperature effectively without triggering shock or shivering.",
    "learningOutcomes": [
      "1.1 Define fever, hyperthermia, and tepid sponging, and explain the heat-loss mechanisms by which tepid sponging lowers body temperature.",
      "1.2 Classify fever by temperature pattern (septic, remittent, intermittent, continuous, cyclic/relapsing), cause, and intensity.",
      "1.3 Describe the three clinical phases of fever (onset, course/plateau, abatement) and the three stages of fever reduction (lysis, crisis, pseudocrisis).",
      "1.4 Formulate nursing assessments, diagnoses, measurable objectives, and trolley requirements for a febrile client.",
      "1.5 Demonstrate the step-by-step tepid sponging procedure, safety precautions, monitoring intervals, and documentation standards."
    ],
    "content": [
      {
        "heading": "Fever vs. Hyperthermia, Tepid Sponging Definition, and Mechanisms of Heat Loss",
        "body": "Fever (pyrexia) is an elevation of core body temperature above the hypothalamic thermoregulatory set-point—clinically defined as rectal temperature >38°C (100.4°F), oral >37.8°C, or axillary >37.2°C (99°F). Unlike fever, where the hypothalamus raises the set-point to maintain a controlled core increase, Hyperthermia (hyperpyrexia) occurs when core temperature rises beyond the confines of hypothalamic set-point regulation. Tepid sponging is a clean, non-pharmacological (or adjunct) nursing procedure that lowers elevated body temperature by applying lukewarm/cool water (26°C–32°C / 80°F–90°F, with or without alcohol—never cold or hot water) to the skin with flannels or sponges. Physiologically, tepid sponging induces peripheral vasodilation, opens skin pores, reduces blood viscosity, and transmits signals from cutaneous receptors to the posterior hypothalamus to promote heat loss—capable of lowering temperature by ~1.4°C within 20 minutes, with each gram of evaporated water removing roughly 0.58 kcal of body heat. Heat loss occurs through four physical mechanisms: Conduction (direct physical contact with a cooler object), Convection (body heat warming surrounding air that rises and is replaced by cooler air), Radiation (heat transfer to surrounding objects without physical contact), and Evaporation (liquid perspiration changing into vapour on the skin surface)—with tepid sponging acting primarily via evaporation, conduction, and convection."
      },
      {
        "heading": "Classifications of Fever, Clinical Phases, and Stages of Fever Reduction",
        "body": "Fever is classified by three frameworks: (A) By Pattern—Septic fever (rises gradually at night and falls above normal in the morning with chills/sweating), Remittent/Remittance fever (fluctuates significantly daily but never drops to normal in 24 hours), Intermittent fever (drops to normal for several hours daily—typical of malaria, boils, acute pyelonephritis, and furuncles), Continuous/Sustained fever (varies ≤1°C / 1.4°F over 24 hours—typical of enteric/typhoid fever, bacterial endocarditis, and viral pneumonia; persistent high levels constitute hyperpyrexia), and Cyclic/Relapsing fever (febrile days alternating with fever-free days or weeks); (B) By Cause—Viral (self-limiting, e.g., influenza, dengue), Bacterial (e.g., pneumonia, UTI requiring antibiotics), Drug-induced, and Idiopathic/Fever of Unknown Origin (FUO); and (C) By Intensity—Low-grade (38.1–39°C), Moderate (39.1–40°C), High-grade (40.1–41.1°C), and Hyperpyrexia (>41.1°C). Clinically, fever unfolds across three phases: (1) Onset (Cold/Chill Phase)—elevated heart and respiratory rates, shivering, pallor, cold skin, gooseflesh, cessation of sweating, and cyanotic nail beds; (2) Course (Plateau Phase)—absence of chills, warm skin, persistent tachycardia/tachypnoea, photosensitivity, mild-to-severe dehydration, drowsiness, anorexia, malaise, weakness, and myalgia; and (3) Fever Abatement (Flush Phase)—flushed warm skin, diaphoresis, reduced shivering, and possible dehydration. Fever resolves through three reduction patterns: Lysis (gradual normalization over 3–5 days with steady pulse/respiration improvement), Crisis (sharp drop within 24 hours with matching pulse/respiration improvement), or False/Pseudocrisis (temperature drop WITHOUT corresponding pulse, respiration, or clinical improvement, followed shortly by another spike)."
      },
      {
        "heading": "Assessment, Nursing Plan, and Trolley Requirements",
        "body": "Before initiating cool applications, the nurse executes five assessment checks: (1) verify the clinical purpose (fever vs. injury), (2) obtain baseline vital signs, (3) assess fluid and electrolyte status, (4) inspect baseline skin condition before and after treatment, and (5) verify whether antipyretic or antibiotic medications have already been administered. Primary nursing diagnoses include Hyperthermia (related to disease process, inadequate fluid intake, environmental temperature, or poor cutaneous circulation such as dermatitis) and Altered Body Comfort (related to elevated temperature and pain). Measurable objectives target an appreciable 1°C–2°C drop in body temperature within 30 minutes, pain reduction within 20 minutes, and verbalized comfort within 30 minutes. Trolley preparation organizes equipment across two shelves: Top Shelf—basin, tepid solution (water with or without alcohol), 8 washcloths/flannels, bath thermometer (maintaining water at 26°C–32°C), patient thermometer, powder and hairbrush if needed, and a cold drink if not contraindicated; Bottom Shelf—2 bath blankets, clean bed sheets if required, bucket for used water, and jug of water."
      },
      {
        "heading": "Step-by-Step Tepid Sponging Procedure, Precautions, and Evaluation",
        "body": "To perform tepid sponging safely: (1) greet the patient, explain the procedure, gain consent, screen the bed for privacy, and wash hands; (2) remove clothing and place one bath blanket beneath and one over the client to permit cooling and observation; (3) pour solution into the basin and monitor water temperature continuously; (4) immerse flannels, wring out excess fluid, and place them over highly vascularized areas—forehead, axillae, groins, back of neck, and abdomen—changing flannels every 5 minutes so wraps do not trap body heat; (5) expose one limb at a time and sponge using long strokes with tepid water, leaving thin moisture beads to evaporate while encouraging air movement (fanning); (6) check and chart body temperature after 10–15 minutes—if temperature has dropped by 1°C–2°C, discontinue sponging, otherwise continue; (7) support the hypermetabolic state with a high-calorie carbohydrate/protein diet and 2.5–3 L daily fluid intake; and (8) recheck and chart temperature 30 minutes post-procedure, then replace sheets, groom hair, leave the client clean, dry, and comfortable, discard the trolley, remove screens, and document findings. Essential precautions: monitor continuously for untoward reactions such as shivering or sudden extreme temperature drops—if a sudden drop occurs, stop immediately, cover the patient with a blanket, and notify the charge nurse; never allow water or cloths to warm up (change PRN); check temperature every 10 minutes during sponging; and sign every charted reading."
      }
    ],
    "inTextQuestions": [
      {
        "question": "Can cold water or cold water mixed with alcohol be used for tepid sponging? Explain.",
        "answer": "False. Tepid sponging uses lukewarm/cool water (26°C–32°C)—neither hot nor cold—to promote vasodilation and evaporation without triggering shivering or vasoconstriction."
      },
      {
        "question": "Which fever pattern drops to normal for several hours daily (common in malaria), and which pattern varies by no more than 1°C over 24 hours (common in viral pneumonia)?",
        "answer": "Intermittent fever drops to normal for several hours daily (malaria); Continuous/sustained fever varies by no more than 1°C throughout the day (viral pneumonia, enteric fever)."
      },
      {
        "question": "Why are wrung flannels placed on the forehead, axillae, groins, back of the neck, and abdomen—and why must they be changed every 5 minutes?",
        "answer": "Those sites are highly vascularized, which maximizes conductive and evaporative cooling; changing flannels every 5 minutes prevents the cloths from absorbing and trapping body heat."
      },
      {
        "question": "How should a nurse respond immediately if a sudden, extreme drop in temperature occurs during tepid sponging?",
        "answer": "Stop the procedure immediately, cover the patient with a blanket, and report to the charge nurse immediately."
      }
    ],
    "saqs": [
      {
        "id": "1.1",
        "question": "Distinguish between fever and hyperthermia, and define the four physical methods of body heat loss.",
        "answer": "In fever, the hypothalamus raises the thermoregulatory set-point to maintain a controlled elevation of core temperature; in hyperthermia, core temperature rises beyond hypothalamic set-point control. Four heat-loss methods: Conduction (direct contact with a cooler object), Convection (warmed air rising and replaced by cooler air), Radiation (warming nearby objects without contact), and Evaporation (liquid sweat turning into vapour on the skin)."
      },
      {
        "id": "1.2",
        "question": "Compare the three clinical phases of fever (onset, course/plateau, abatement) and differentiate lysis, crisis, and false crisis.",
        "answer": "Onset (chill phase): shivering, cold pale skin, gooseflesh, increased HR/RR, no sweating. Course (plateau): warm skin, no chills, tachycardia/tachypnoea, dehydration, malaise, drowsiness. Abatement (flush): warm flushed skin, sweating, less shivering. Reduction stages: Lysis (gradual drop over 3–5 days with improved pulse/RR), Crisis (sharp drop within 24 hrs with improved pulse/RR), False/Pseudocrisis (drop without pulse/RR or clinical improvement, soon rising again)."
      },
      {
        "id": "1.3",
        "question": "List the five baseline nursing assessments required before tepid sponging and state the items placed on the top and bottom shelves of the tepid sponging trolley.",
        "answer": "Assessments: check purpose of cool application, baseline vital signs, fluid/electrolyte status, skin condition before/after, and prior antipyretics/antibiotics. Top shelf: basin, solution (water ± alcohol), 8 washcloths/flannels, bath thermometer (26–32°C), patient thermometer, powder/hairbrush, cold drink if permitted. Bottom shelf: 2 bath blankets, clean bed sheets, bucket for used water, jug of water."
      },
      {
        "id": "1.4",
        "question": "Outline the step-by-step tepid sponging procedure for a 24-year-old febrile patient and state when sponging should be discontinued.",
        "answer": "Explain procedure/screen bed -> replace clothing with 2 bath blankets -> pour 26–32°C solution -> place wrung flannels on forehead, axillae, groins, back of neck, and abdomen (change every 5 min) -> expose one limb at a time, sponge with long strokes leaving beads to evaporate with air movement -> check temp at 10–15 min -> discontinue once temperature drops by 1–2°C -> offer high-calorie diet and 2.5–3 L fluids -> recheck/chart at 30 min -> dry, dress, tidy, and document."
      },
      {
        "id": "1.5",
        "question": "State four essential safety precautions nurses must observe during tepid sponging.",
        "answer": "1. Observe continuously for shivering or untoward reactions. 2. If sudden extreme temperature drop occurs, stop immediately, cover with a blanket, and notify the charge nurse. 3. Never let flannels or basin water become warm—change PRN. 4. Recheck temperature every 10 minutes during the procedure and chart/sign every reading."
      }
    ]
  },

  // Module 2
  {
    "id": 2,
    "title": "Maintaining Skin Integrity and Pressure Ulcer Prevention",
    "introduction": "Preserving intact skin is a core nursing responsibility—underscored by Florence Nightingale's 1859 observation that bedsores are generally a failure of nursing rather than disease. Systematically identifying at-risk clients with the Braden Scale, recognizing all stages of pressure injury, and executing rigorous 2-hourly turning, moisture control, and skin protection prevent debilitating tissue breakdown.",
    "learningOutcomes": [
      "2.1 Define pressure sore (decubitus ulcer/pressure injury) and distinguish internal versus external factors maintaining skin integrity.",
      "2.2 Enumerate the fourteen risk factors for impaired skin integrity, high-risk client groups, and vulnerable bony prominences and skin-fold pressure areas.",
      "2.3 Apply and interpret the six-subscale Braden Scale to predict pressure ulcer risk.",
      "2.4 Differentiate Stages I through IV and unstageable (eschar) pressure ulcers, as well as the four types of wound exudate.",
      "2.5 Execute structured skin-condition monitoring, skin-breakdown prevention protocols, documentation, and family education."
    ],
    "content": [
      {
        "heading": "Definition, Factors Maintaining Skin Integrity, Risk Factors, and Vulnerable Pressure Areas",
        "body": "A pressure sore (decubitus ulcer or pressure injury, per NPIAP) is a localized area of damage to the skin and underlying soft tissue—usually over a bony prominence or beneath a medical device—caused by prolonged or intense pressure, friction, or shear that interferes with blood circulation. Early signs include non-blanching discoloured patches (red on light skin; purple or blue on dark skin), warm, spongy, or indurated tissue, and localized pain or itching. Skin integrity is maintained by Internal factors (genetics/race, skin pigmentation, allergies, light sensitivity, age, underlying health such as corticosteroid use) and External factors (physical activity). Fourteen key risk factors compromise skin integrity: (1) immobility, (2) excessive body heat, (3) inadequate nutrition, (4) advanced age, (5) friction and shearing, (6) chronic medical conditions (e.g., diabetes, cardiovascular disease), (7) faecal and urinary incontinence, (8) poor lifting techniques, (9) decreased mental status, (10) incorrect positioning, (11) diminished sensation, (12) hard support surfaces, (13) incorrect application of pressure-applying devices, and (14) tightly or badly applied bandages/splints. Clients requiring proactive skin protection include those undergoing invasive procedures, immobile patients, chronically ill clients, and trauma patients. Vulnerable pressure areas include the coccyx/sacrum, hips (greater trochanter and ischial tuberosities), elbows, heels, shoulder blades (scapulae), knees (patellae/inner knees), ankles (malleoli), back of the head (occiput), ears, skin folds in obese patients, beneath breasts, buttocks, and abdomen."
      },
      {
        "heading": "Braden Scale Risk Assessment and Stages of Pressure Ulcers",
        "body": "The Braden Scale is a validated 6-subscale predictive tool scoring up to 23 points, where a total score BELOW 18 indicates risk for developing pressure ulcers: (A) Sensory Perception (1 = completely limited, 2 = very limited, 3 = slightly limited, 4 = no impairment); (B) Moisture (1 = completely moist, 2 = moist, 3 = occasionally moist, 4 = rarely moist); (C) Activity (1 = bedfast, 2 = chairfast, 3 = walks occasionally, 4 = walks frequently); (D) Mobility (1 = completely immobile, 2 = very limited, 3 = slightly limited, 4 = no limitations); (E) Nutrition (1 = very poor, 2 = probably adequate, 3 = adequate, 4 = excellent); and (F) Friction and Shear (1 = problem, 2 = potential problem, 3 = no apparent problem). Pressure ulcers progress through four numbered stages plus an unstageable category: Stage I—non-blanchable erythema of intact skin (persistent redness on light skin or red/blue/purple hues on dark skin, with altered warmth/coolness, firm/boggy feel, or pain/itching); Stage II—partial-thickness skin loss involving epidermis, dermis, or both, appearing superficially as an abrasion, blister, or shallow crater; Stage III—full-thickness skin loss with damage or necrosis of subcutaneous tissue extending down to (but not through) underlying fascia, forming a deep crater with or without undermining; Stage IV—full-thickness skin and tissue loss with extensive destruction, necrosis, or damage to muscle, bone, tendons, or joint capsules, often with undermining and sinus tracts; and Unstageable/Ungradable—wound base fully obscured by thick, dry, black necrotic tissue (eschar). When assessing open lesions, exudate is classified as Serous (clear fluid free of blood/pus), Sanguinous (bloody), Serosanguinous (blood mixed with clear fluid), or Purulent (cloudy, viscous, pus-like)."
      },
      {
        "heading": "Monitoring Skin Condition vs. Preventing Skin Breakdown",
        "body": "Under the primary nursing diagnosis Risk for Impaired Skin Integrity (related to immobility, decreased sensory perception, impaired perfusion, friction, shear, moisture, and advanced age), nurses aim to maintain intact skin free of ischaemia, hyperaemia, necrosis, dryness, flaking, itching, or burning. Monitoring Skin Condition requires artificial light, a bath blanket, gown, and zinc-oxide cream/cornstarch powder: explain the procedure, ensure privacy, wash hands, compare skin colour against the client's racial baseline (observing pallor, flushing, jaundice, cyanosis), palpate temperature with the back of the fingers/hand (reflecting dermal blood circulation), inspect dryness/flaking/moisture/odours in folds, pinch a small skin fold to check turgor/return speed (reflecting hydration), press firmly over the ankle to check for pitting indentation, test sensory response to touch/heat/cold, and document lesions or discolourations (ecchymosis, petechiae, purpura, erythema—which can signal leukaemia, haemophilia, or vitamin deficiency). Preventing Skin Breakdown requires cornstarch powder (preferred because it does NOT 'cake' on contact with moisture), a pressure-relieving mattress, clean gloves for open lesions, and zinc oxide/barrier cream. Core prevention interventions include: turning at-risk clients at least every 2 hours (rotating right/left lateral, prone, supine, and swimming-type positions while inspecting vulnerable areas), proper lifting techniques avoiding drag/shear, lubricating dry unbroken skin, keeping skin dry and free of urine/faeces/soap/drainage, applying zinc oxide cream to sacrum, elbows, and heels several times daily, keeping linens clean, dry, and wrinkle-free, avoiding chipped bedpans, encouraging active/ROM exercises, providing protein-rich nutrition and adequate fluids, educating family members, and thoroughly documenting skin condition, mobility, turning frequency, care rendered, client complaints, and wound specimen details."
      }
    ],
    "inTextQuestions": [
      {
        "question": "A chairfast client (2) has very limited sensory perception (2), occasionally moist skin (3), slightly limited mobility (3), excellent nutrition (4), and no friction/shear problem (3). What is their Braden score and interpretation?",
        "answer": "Total Braden score = 17 (2 + 2 + 3 + 3 + 4 + 3). Because the score is below 18, the client is AT RISK of developing a pressure ulcer."
      },
      {
        "question": "How is a superficial pressure ulcer involving partial-thickness loss of the epidermis and/or dermis classified, and what defines an unstageable pressure ulcer?",
        "answer": "Partial-thickness loss of epidermis/dermis (abrasion, blister, shallow crater) is Stage II. An unstageable/ungradable ulcer is fully covered by thick, dry, black necrotic tissue (eschar)."
      },
      {
        "question": "Why is cornstarch powder preferred on skin and bed linens for pressure-ulcer prevention?",
        "answer": "Cornstarch powder does not cause 'caking' when it comes into contact with moisture."
      },
      {
        "question": "How frequently must at-risk immobilized patients be repositioned to prevent pressure sores?",
        "answer": "At least every 2 hours (4-hourly turning is insufficient)."
      }
    ],
    "saqs": [
      {
        "id": "2.1",
        "question": "Define pressure sore, list eight risk factors for impaired skin integrity, and identify eight common vulnerable pressure areas.",
        "answer": "A pressure sore (decubitus ulcer) is a localized injury to skin and underlying tissue over a bony prominence or medical device caused by prolonged pressure, friction, or shear impairing blood flow. Eight risk factors: immobility, excessive heat, inadequate nutrition, advanced age, friction/shear, chronic illness, faecal/urinary incontinence, decreased mental status (others: poor lifting, diminished sensation, hard surfaces, tight bandages/splints). Eight pressure areas: coccyx/sacrum, greater trochanter/ischium, heels, elbows, scapulae, patellae, malleoli, and occiput (plus ears, obese skin folds, under breasts)."
      },
      {
        "id": "2.2",
        "question": "List the six subscales of the Braden Scale with their score ranges and state the maximum score and risk threshold.",
        "answer": "Sensory Perception (1–4), Moisture (1–4), Activity (1–4), Mobility (1–4), Nutrition (1–4), and Friction & Shear (1–3). Maximum score is 23; a score below 18 indicates risk for developing pressure ulcers."
      },
      {
        "id": "2.3",
        "question": "Differentiate Stages I, II, III, and IV of pressure ulcers and define serous, sanguinous, serosanguinous, and purulent exudates.",
        "answer": "Stage I: intact skin with non-blanchable erythema. Stage II: partial-thickness loss of epidermis/dermis (blister/shallow crater). Stage III: full-thickness loss into subcutaneous tissue down to fascia. Stage IV: full-thickness loss with extensive necrosis/damage to muscle, bone, or tendons. Exudates: Serous (clear fluid), Sanguinous (bloody), Serosanguinous (blood mixed with clear fluid), Purulent (cloudy, viscous, pus-like)."
      },
      {
        "id": "2.4",
        "question": "Outline the steps for systematically monitoring a newly transferred trauma patient's skin condition and state what skin temperature and skin turgor indicate.",
        "answer": "Explain procedure, ensure privacy, wash hands, inspect skin/mucosa colour against racial baseline, feel temperature with back of hand/fingers (reflects dermal blood circulation), inspect moisture/dryness/odours, gently pinch skin for turgor/return speed (reflects hydration), press ankle for pitting oedema, test sensation, and check for lesions or ecchymosis/petechiae/purpura."
      },
      {
        "id": "2.5",
        "question": "Summarize nine key nursing strategies for preventing pressure ulcers in bedridden clients.",
        "answer": "1. Assess risk using the Braden Scale; 2. Reposition every 2 hours; 3. Use proper lifting techniques avoiding shear; 4. Keep skin clean, dry, and free of urine/faeces/drainage; 5. Apply zinc oxide cream to sacrum/elbows/heels and cornstarch powder; 6. Keep linens dry and wrinkle-free; 7. Avoid skin trauma (e.g., chipped bedpans); 8. Provide pressure-relieving mattresses/support devices; 9. Ensure protein-rich nutrition, fluids, and active/ROM exercises."
      }
    ]
  },

  // Module 3
  {
    "id": 3,
    "title": "Therapeutic Positioning in Nursing",
    "introduction": "Therapeutic positioning places a client in proper anatomical alignment to maximize comfort, safeguard respiratory and circulatory function, enable examinations or surgery, and prevent contractures and immobility complications. Mastering general positioning principles, supportive devices, and the eight core nursing positions is foundational to safe bedside practice.",
    "learningOutcomes": [
      "3.1 Define therapeutic positioning, state its four core rationales, and outline the eight general principles of safe patient positioning.",
      "3.2 Identify the twelve standard bed accessories and supportive articles used to maintain anatomical alignment.",
      "3.3 Differentiate Fowler's (semi, standard, high), Supine, Prone, and Lateral positions—including clinical indications and pillow/roll rationales.",
      "3.4 Differentiate Sims's, Lithotomy, Trendelenburg, and Genupectoral (knee-chest) positions with their specific diagnostic, surgical, and emergency indications.",
      "3.5 Match specific clinical conditions (e.g., dyspnoea, ARDS, post-op aspiration risk, hypotension, cord prolapse) to their correct therapeutic position."
    ],
    "content": [
      {
        "heading": "Definition, Rationales, General Principles, and Positioning Equipment",
        "body": "Positioning in nursing is the strategic placement of a patient in good body alignment as needed therapeutically—not merely as the patient casually prefers. Positioning serves four essential rationales: (1) promoting patient comfort, (2) preventing complications of immobility (such as pressure sores, contractures, and foot drop), (3) stimulating circulation, and (4) promoting normal physiological functions. Eight general principles govern every position change: maintain good body mechanics, obtain assistance whenever required, ensure the mattress is firm and the bed is raised to working height, keep bed sheets clean and dry, avoid placing one body part directly over another to prevent pressure, establish a regular 24-hour position-change schedule, ensure patient comfort, and perform hand hygiene before and after the procedure. Twelve essential supportive articles facilitate safe alignment: a clean dry firm bed, specialized mattresses, bed board, pillows, footboard or foot boot, sand bags, hand rolls, trochanter rolls, bed blocks, overbed table, additional sheets, and a trapeze bar."
      },
      {
        "heading": "Fowler's, Supine, Prone, and Lateral (Side-Lying) Positions",
        "body": "(1) Fowler's Position elevates the head of the bed across three ranges—Semi-Fowler's (15°–45°), Fowler's (45°–90°), and High Fowler's (>90°)—to relieve dyspnoea and reduce tension on abdominal sutures. Key supports: small head pillow (prevents cervical flexion contractures), arm pillows (prevents shoulder dislocation and arm/wrist flexion contractures while aiding circulation), small lower-back pillow (supports lumbar spine), thigh roll (prevents knee hyperextension and popliteal artery occlusion), ankle pillow (relieves heel pressure), and footboard (maintains dorsiflexion, preventing foot drop). (2) Supine (Dorsal Recumbent) Position places the client flat on their back with a small rolled lumbar towel, pillow under head/neck/upper shoulders (prevents cervical flexion/hyperextension), trochanter rolls or sandbags parallel to the lateral thighs (reduces external hip rotation), small thigh and ankle pillows, footboard (prevents plantar flexion/foot drop), pillow under pronated arms, and hand rolls for paralyzed patients (prevents finger extension/thumb abduction, keeping thumb in slight adduction and opposition). (3) Prone Position places the client flat face-down on the abdomen—boosting oxygenation in acute respiratory distress syndrome (ARDS) and indicated for back pressure sores/burns/injuries/surgeries, >24 hours post-lower-limb amputation, and renal biopsy. Support with head turned to one side on a small pillow, a small pillow under the abdomen below the diaphragm (reduces lumbar hyperextension and pressure on female breasts/male genitals), flexed arms at shoulder level (prevents shoulder dislocation), and a lower-leg pillow elevating toes off the mattress. (4) Lateral (Side-Lying) Position is used for periodic turning of bedridden patients and immediate post-operative aspiration prevention (EXCEPT after spinal or epidural anaesthesia): lower the head of bed, roll safely onto the side, bring the lower shoulder blade forward (off the shoulder joint), support head/neck, flex both arms with a pillow under the uppermost arm (prevents shoulder internal rotation and improves chest expansion), tuck a lengthwise-folded pillow behind the back, place a pillow from groin to foot under the semi-flexed upper leg, and place a sandbag against the dependent foot's plantar surface."
      },
      {
        "heading": "Sims's, Lithotomy, Trendelenburg, and Genupectoral (Knee-Chest) Positions",
        "body": "(5) Sims's (Semi-Prone) Position turns a supine patient into a lateral posture lying partially on the abdomen with the head of bed flat—indicated for vaginal and rectal examinations, administering enemas and suppositories, and sigmoidoscopy/proctoscopy. Support with small head/neck pillow, pillow under the flexed upper arm at shoulder level (prevents shoulder internal rotation), pillow under the flexed upper leg at hip level (prevents internal hip rotation), and a sandbag parallel to the dependent foot (prevents plantar flexion). (6) Lithotomy Position places the supine patient with head/neck pillowed and both hips and knees flexed at 90° with legs supported in stirrups—indicated for vaginal delivery, vaginal examination, vaginal hysterectomy, and rectal surgeries (haemorrhoidectomy, fissurotomy). (7) Trendelenburg Position tilts the entire supine bed frame head-down (using a bed key or bed blocks under the foot end)—indicated for postural drainage, management of hypotension and shock, and deep vein thrombosis (DVT). (8) Genupectoral (Knee-Chest) Position has the client kneel with weight supported on the knees and upper chest, arms extended beyond the head, elbows flexed, and head turned to one side on a pillow (optional small chest pillow)—indicated for rectal examination, administering enemas or rectal suppositories, and managing specific obstetric emergencies such as umbilical cord prolapse."
      }
    ],
    "inTextQuestions": [
      {
        "question": "What are the head-of-bed elevation angles for Semi-Fowler's, standard Fowler's, and High Fowler's positions?",
        "answer": "Semi-Fowler's: 15° to 45°; Fowler's: 45° to 90°; High Fowler's: greater than 90°."
      },
      {
        "question": "Why are trochanter rolls or sandbags placed parallel to the lateral thighs in the supine position, and why is a small pillow placed under the abdomen below the diaphragm in the prone position?",
        "answer": "Trochanter rolls reduce external rotation of the hips in the supine position. A small pillow under the abdomen below the diaphragm in the prone position reduces lumbar hyperextension/lower-back strain and relieves pressure on female breasts and male genitals."
      },
      {
        "question": "Which position is indicated for an immediate post-operative patient to prevent aspiration—and under what anaesthetic conditions is it excepted?",
        "answer": "Lateral (side-lying) position, except following spinal and epidural anaesthesia."
      },
      {
        "question": "Which position is used for an obstetric emergency such as umbilical cord prolapse, and which position is indicated for renal biopsy?",
        "answer": "Genupectoral (knee-chest) position is used for umbilical cord prolapse; Prone position is used for renal biopsy."
      }
    ],
    "saqs": [
      {
        "id": "3.1",
        "question": "Define positioning in nursing, state its four rationales, and list six general principles nurses must follow when positioning a patient.",
        "answer": "Positioning is placing a patient in good body alignment as needed therapeutically. Four rationales: promote comfort, prevent immobility complications, stimulate circulation, promote normal physiological functions. Six general principles: maintain good body mechanics, obtain assistance as needed, ensure firm mattress at working height, keep sheets clean/dry, avoid resting one body part over another, plan a 24-hour turning schedule (plus ensure comfort and wash hands before/after)."
      },
      {
        "id": "3.2",
        "question": "State the two main purposes of Fowler's position and explain the anatomical rationale for using a thigh roll, arm pillows, ankle pillow, and footboard.",
        "answer": "Purposes: relieve/minimize dyspnoea and relieve tension on abdominal sutures. Rationales: thigh roll prevents knee hyperextension and popliteal artery occlusion; arm pillows prevent shoulder dislocation and arm/wrist flexion contractures; ankle pillow prevents heel pressure; footboard maintains dorsiflexion and prevents foot drop."
      },
      {
        "id": "3.3",
        "question": "Compare the indications for Prone, Lateral, Sims's, and Lithotomy positions.",
        "answer": "Prone: back burns/sores/surgeries, >24 hrs post-lower-limb amputation, renal biopsy, improving oxygenation in ARDS. Lateral: periodic turning of bedridden clients and immediate post-op aspiration prevention (excluding spinal/epidural anaesthesia). Sims's: vaginal/rectal exam, enema/suppository, sigmoidoscopy/proctoscopy. Lithotomy: vaginal delivery/exam, vaginal hysterectomy, haemorrhoidectomy/fissurotomy."
      },
      {
        "id": "3.4",
        "question": "Explain how to place a patient in Trendelenburg and Genupectoral positions and list three indications for each.",
        "answer": "Trendelenburg: place patient supine and tilt the entire bed frame head-down using a bed key or bed blocks at the foot end (Indications: postural drainage, hypotension/shock, DVT). Genupectoral: instruct client to kneel supporting weight on knees and chest with arms extended past head and head turned on a pillow (Indications: rectal exam, enema/suppository administration, obstetric cord prolapse)."
      },
      {
        "id": "3.5",
        "question": "List eight supportive articles used in patient positioning and state the role of hand rolls for a paralyzed patient in the supine position.",
        "answer": "Eight articles: bed board, pillows, footboard/foot boot, sand bags, hand rolls, trochanter rolls, bed blocks, trapeze bar (others: firm bed, specialized mattresses, overbed table, sheets). Hand rolls reduce finger extension and thumb abduction, maintaining the thumb in slight adduction and opposition."
      }
    ]
  },

  // Module 4
  {
    "id": 4,
    "title": "Collection of Urine Specimens",
    "introduction": "Urinalysis and urine culture are cornerstone diagnostic tools for detecting urinary tract infections, renal dysfunction, metabolic disorders like diabetes mellitus, and drug exposure. Applying strict asepsis, clear client instruction, correct container handling, and timely transport guarantees reliable laboratory results while safeguarding patient dignity.",
    "learningOutcomes": [
      "4.1 Define urine specimen examination, state its clinical indications, and differentiate random, first morning, clean-catch midstream, timed (24-hour), catheterized, and suprapubic specimens.",
      "4.2 Explain the six core nursing responsibilities, proper container labelling, biohazard transport, and temperature/preservative storage rules.",
      "4.3 Assess clients for urinary tract infection symptoms and formulate appropriate urinary nursing diagnoses.",
      "4.4 Demonstrate step-by-step collection procedures and patient teaching for random, female/male midstream, and 24-hour urine specimens.",
      "4.5 Adapt urine collection for infants and children and interpret normal physical and chemical urine characteristics."
    ],
    "content": [
      {
        "heading": "Definition, Clinical Indications, Types, and Collection Methods",
        "body": "Urine specimen examination analyzes the physical and chemical constituents of urine—colour, odour, specific gravity, deposits, volume, litmus/pH reaction, and abnormal substances—to diagnose and monitor urinary tract infections (UTIs), kidney disease, and diabetes, evaluate treatment effectiveness, and perform drug screening. Six specimen types serve distinct clinical aims: (1) Random Urine Sample—clean collection at any time for routine urinalysis (ideally collected on the first morning void for higher concentration and acidity); (2) First Morning Sample—most concentrated overnight void, preferred for pregnancy testing and protein analysis; (3) Clean-Catch Midstream Specimen—collected into a sterile container after cleansing the urinary meatus and discarding the initial stream to flush out meatal flora, used for urine culture; (4) Timed Specimen (12- or 24-hour)—assesses kidney concentrating/diluting capacity, glucose metabolism disorders (diabetes), and quantitative creatinine, hormone, or albumin levels; (5) Catheterized Specimen—sterile urine aspirated from a catheter port with a sterile syringe or obtained via straight catheterization for accurate culture; and (6) Suprapubic Aspiration—clinician inserts a sterile needle directly into the bladder (reserved for special cases like infants or unclear results). Collection methods therefore encompass spontaneous voiding, catheterization, and suprapubic aspiration."
      },
      {
        "heading": "Nursing Responsibilities, Labelling, Storage, Transport, and Client Assessment",
        "body": "Six general nursing responsibilities govern specimen collection: (1) ensure client comfort, privacy, safety, and non-judgmental cultural sensitivity; (2) explain the purpose and exact collection steps to reduce anxiety and promote independence; (3) maintain strict asepsis (hand hygiene, gloves, sterile leak-proof containers) to prevent sample contamination; (4) note relevant clinical data on requisition slips (e.g., medications affecting test results); (5) label immediately at bedside with patient name, identifier (DOB/MRN), date, time, and specimen type, place in a biohazard transport bag with absorbent pad, and send promptly to the lab—ideally within 2–3 hours; and (6) report abnormal results promptly according to severity. Proper storage prevents bacterial overgrowth or analyte breakdown: transport bacterial culture specimens at room temperature promptly, keep 24-hour specimens refrigerated or on ice throughout collection and transit, refrigerate delayed routine samples at 4°C–8°C, freeze long-term/viral specimens at -70°C or below (using viral transport medium when needed), and note preservative tubes stabilize samples for 48 hours (culture) and 72 hours (urinalysis) at ambient temperature. Before collection, assess the client's ability to follow instructions and screen for UTI signs—frequency, urgency, dysuria, haematuria, flank pain, and cloudy urine with sediments—guiding diagnoses such as Altered Urinary Elimination, Fluid Volume Excess/Deficit, High Risk for Injury, and Flank Pain."
      },
      {
        "heading": "Step-by-Step Collection Procedures: Random, Midstream, and 24-Hour Urine",
        "body": "For a Random Specimen, ensure the sample is free of faecal contamination, tightly capped, and never allow toilet tissue inside a bedpan (which interferes with lab analysis). For a Clean-Catch Midstream Specimen, prepare a two-shelf trolley—Top Shelf: bowl of sterile swabs, cooled boiled water, sponge-holding forceps in kidney receiver, and small tray with sterile specimen bottle and gloves; Bottom Shelf: destructor bowls, kidney receiver, and bedpan. For Female Patients: explain, draw screens, position on bedpan with knees flexed and legs apart, swab vulva front-to-back (above downwards) with forceps, unscrew sterile lid with gloved hand, ask client to void and catch the midstream without breaking the stream, dry vulva, and comfort. For Male Patients: cleanse the glans around the meatus in circular motions with forceps/swab, void a small amount first to flush meatal flora, then void directly into the sterile bottle and cap tightly. Teach patients adequate hydration, collecting urine before defecating, and front-to-back cleansing for females. For a 24-Hour Urine Specimen (requiring container, preservative such as HCl or thymol, requisition slip, label, bathroom sign, and ice/refrigerator): post a bathroom sign with start date/time, instruct the client to void and DISCARD the initial specimen at the start time, keep the container refrigerated/on ice, collect ALL subsequent voids over 24 hours, have the client empty the bladder at the exact end time and ADD that final void to the container, then send promptly to the lab while documenting start/end times, appearance, and voiding pain."
      },
      {
        "heading": "Special Populations and Normal Urine Characteristics",
        "body": "Collection adapts for pediatric clients: for Infants, cleanse the perineum and urethral opening as for adults, apply an adhesive pediatric specimen bag cleanly to the skin, and gently peel it off once sufficient urine is voided; for Children, explain steps in age-appropriate non-medical terms, use a clean jug or bedpan, involve parents for reassurance, and perform straight catheterization if a sterile specimen is needed. Normal adult urine baseline characteristics are: Colour—pale yellow to dark amber (governed by concentrations of pigments urochrome, urobilin, and uroerythrin); Clarity—clear (cloudiness results from leukocytes, bacteria, epithelial cells, or phosphate precipitation); Specific Gravity—1.001 to 1.025; pH—4.5 to 8.0 (averaging ~6); 24-Hour Adult Volume—1,000 to 2,500 mL (cc); and routine Chemical Determinations testing for abnormal presence of glucose, ketones, blood, and protein."
      }
    ],
    "inTextQuestions": [
      {
        "question": "Why is the first voided morning specimen ideal for routine urinalysis, pregnancy testing, and protein analysis?",
        "answer": "It has a higher, more uniform concentration and a more acidic pH than specimens collected later in the day."
      },
      {
        "question": "In a midstream urine collection, why does the patient pass a small initial stream before catching urine in the sterile container?",
        "answer": "To flush out microorganisms that naturally accumulate at the urinary meatus so they do not contaminate the sterile specimen."
      },
      {
        "question": "When starting and ending a 24-hour urine collection, what happens to the very first void and the very last void?",
        "answer": "The initial void at the start time is DISCARDED; every void thereafter is saved, and at the exact 24-hour end time the client empties their bladder and SAVES that final void into the bottle."
      },
      {
        "question": "What four causes can make a urine specimen appear cloudy, and what is the normal specific gravity range of urine?",
        "answer": "Cloudiness is caused by leukocytes, bacteria, epithelial cells, or precipitation of phosphates. Normal specific gravity ranges between 1.001 and 1.025."
      }
    ],
    "saqs": [
      {
        "id": "4.1",
        "question": "Define random, clean-catch midstream, catheterized, and 24-hour timed urine specimens and state the primary clinical use of each.",
        "answer": "Random: clean voided sample at any time for routine urinalysis. Clean-catch midstream: sterile mid-void sample after meatal cleansing and flushing initial stream for urine culture. Catheterized: sterile urine aspirated from catheter port or straight catheter for accurate culture. 24-hour timed: full 24-hour collection to evaluate kidney concentrating/diluting function, diabetes/glucose metabolism, creatinine, hormones, or albumin."
      },
      {
        "id": "4.2",
        "question": "State the six general nursing responsibilities during urine specimen collection and list the key storage/transport rules.",
        "answer": "Responsibilities: (1) protect comfort/privacy/cultural beliefs, (2) explain purpose and steps, (3) maintain strict asepsis, (4) record relevant clinical/medication info on requisition slips, (5) transport promptly, and (6) report abnormal results urgently. Transport/storage: send within 2–3 hrs in leak-proof biohazard bags; bacterial culture at room temp; 24-hr specimens refrigerated/on ice; delayed routine samples refrigerated at 4–8°C (long-term frozen ≤-70°C)."
      },
      {
        "id": "4.3",
        "question": "List the top-shelf and bottom-shelf requirements for midstream urine collection and contrast the cleansing direction for female versus male clients.",
        "answer": "Top shelf: sterile swabs, cooled boiled water, sponge-holding forceps in kidney receiver, sterile specimen bottle, and gloves. Bottom shelf: destructor bowls, kidney receiver, bedpan. Female clients are swabbed from front to back (above downwards), whereas male clients have the glans cleansed in a circular motion around the meatus."
      },
      {
        "id": "4.4",
        "question": "Outline the step-by-step nursing procedure for collecting a 24-hour urine specimen, including preservatives and documentation.",
        "answer": "Explain procedure and post a bathroom sign with date/time -> obtain labelled lab bottle with preservative (HCl or thymol) and keep refrigerated or on ice -> have client void and discard initial specimen at start time -> pour all subsequent voids over 24 hrs into bottle -> have client void at exact end time and add to bottle -> transport promptly to lab -> document start/end times, urine colour/appearance, and voiding pain."
      },
      {
        "id": "4.5",
        "question": "State the normal values for adult urine colour pigments, specific gravity, pH, and 24-hour volume, and explain how urine is collected from an infant.",
        "answer": "Pigments: urochrome, urobilin, uroerythrin (pale yellow to dark amber); specific gravity 1.001–1.025; pH 4.5–8 (avg ~6); volume 1,000–2,500 mL/24 hrs. For infants, cleanse the perineum and urethral opening, attach an adhesive pediatric urine specimen bag to the skin, and gently remove it once adequate urine is collected (or suprapubic aspiration/straight catheter if sterile sample is required)."
      }
    ]
  },

  // Module 5
  {
    "id": 5,
    "title": "Urinary Catheterization: Principles, Female and Male Procedures, and Safety",
    "introduction": "Urinary catheterization is a strictly sterile invasive procedure providing direct bladder access for diagnostic sampling, output monitoring, surgical protection, or relief of urinary retention. Thorough knowledge of sex-specific urethral anatomy, catheter types and French sizing, contraindications, aseptic insertion steps, and complication prevention minimizes trauma and catheter-associated urinary tract infections (CAUTI).",
    "learningOutcomes": [
      "5.1 Define urinary catheterization, compare female and male urethral anatomy, and state diagnostic, therapeutic, and surgical indications alongside contraindications.",
      "5.2 Identify catheter anatomical parts, classify catheter types (intermittent, indwelling/Foley, suprapubic, external condom, coude, 3-way), and select appropriate French sizes across age and sex.",
      "5.3 Perform comprehensive pre-catheterization assessment, formulate nursing diagnoses/objectives, and prepare sterile catheterization equipment.",
      "5.4 Execute step-by-step sterile female and male urethral catheterization procedures, troubleshooting measures, and post-insertion securing/drainage care.",
      "5.5 Recognize and prevent major complications of catheterization (UTI, paraphimosis, stricture, perforation, obstruction, bladder spasms)."
    ],
    "content": [
      {
        "heading": "Definition, Urethral Anatomy, Indications, Contraindications, and Pre-Procedure Assessment",
        "body": "Urinary catheterization is the strictly sterile introduction of a thin flexible catheter into the urinary bladder—most commonly retrograde via the urethra or surgically through the lower abdomen (suprapubic)—performed only when clinically necessary. Anatomically, the female urethra is ~3.7–6.2 cm long, opening as an anteroposterior slit anterior to the vaginal orifice and ~2.5 cm posterior to the glans clitoris (it may recede superiorly into the vagina in older women). The male urethra is 18–20 cm long, extending from the internal orifice at the bladder neck through prostatic, membranous, and spongy segments to the glans tip. Indications span three domains: (1) Diagnostic—uncontaminated culture specimen, accurate urine output monitoring, post-void residual volume, urinary tract imaging; (2) Therapeutic—acute urinary retention (e.g., BPH, blood clots), chronic obstruction with hydronephrosis, continuous bladder irrigation, neurogenic bladder decompression, intravesical medication/chemotherapy instillation, and selected urinary incontinence/bedridden care; and (3) Surgical—keeping the bladder empty before/during/after abdominopelvic, urological, or gynaecological surgery to improve visualization, prevent accidental bladder injury, and protect perineal sutures. Contraindications include suspected urethral trauma (blood at the meatus—insertion worsens injury!), gross haematuria, urethral infection, urethral pain, low bladder compliance, and patient refusal. Pre-procedure assessment checks last voiding time/fluid intake, urge to void, dysuria/frequency/hesitancy, incontinence, suprapubic palpation (firm rounded mass) and percussion (dullness indicating full bladder), antiseptic allergies, prior catheterization, positioning ability, and signs of anxiety (shaky hands, facial tension), guiding diagnoses of Altered Urinary Elimination, Urinary Retention, Anxiety, Risk for Impaired Skin Integrity, and Pain."
      },
      {
        "heading": "Catheter Parts, Types, French Sizing, and Short-Term vs. Long-Term Methods",
        "body": "An indwelling Foley catheter features six parts: catheter tip, drainage eye, balloon seal, catheter shaft, drainage funnel, and inflation funnel/balloon port (marked with recommended sterile water volume). Four primary catheter types exist: (1) Intermittent (Straight) Catheter—inserted temporarily for 5–10 minutes to empty the bladder and removed immediately; (2) Indwelling (Foley) Catheter—retained for days or weeks via a water-filled internal balloon (including 2-way and 3-way irrigation catheters, plus curved-tip Coude catheters); (3) Suprapubic Catheter—inserted surgically through a small suprapubic incision for continuous drainage (key alternative when urethral trauma exists); and (4) External Condom Catheter—adheres externally to the penis or pubic area for incontinence management. Catheter lumen diameter is measured on the French scale (Fr)—smaller numbers mean narrower tubes; always use the smallest effective size to reduce trauma, noting standard clinical sizing: Children (8–10 Fr), Adult Females (14–16 Fr, commonly 16 Fr), and Adult Males (20–22 Fr—stiffer to negotiate the longer male urethra). Short-term catheterization serves temporary obstruction, pelvic/bowel surgery, childbirth bladder drainage, or post-injury clot removal, whereas Long-term catheterization serves critically ill patients, refractory incontinence, or neuropathic bladder (with suprapubic or condom catheters as alternatives)."
      },
      {
        "heading": "Step-by-Step Female and Male Urethral Catheterization Techniques",
        "body": "Assemble a sterile catheterization pack (under-drape, fenestrated perineal drape, sterile gloves, antiseptic lotion, water-soluble lubricant, cotton balls/gauze, catheter, forceps, basin), prefilled 10–30 mL syringe, specimen container, angle-poise lamp, closed drainage bag (uribag), Velcro leg strap/tape, disposal bag, waterproof pad, and extra sheet. For Female Catheterization: explain/gain consent, ensure privacy/lighting, wash perineum with warm water/soap first, position in dorsal recumbent (knees flexed, thighs relaxed) or Sims's position, wash hands and don sterile gloves, drape sterile field, test indwelling balloon integrity and deflate leaving syringe attached, lubricate tip 1–2 inches, separate labia with non-dominant hand (now contaminated—maintain separation continuously), cleanse with forceps and fresh antiseptic cotton balls anterior-to-posterior (clitoris to anus, outer to inner folds, meatus last), instruct client to take a slow deep breath to relax perineal muscles, gently insert 5–7.5 cm until urine flows (never force) plus 1 extra inch for indwelling catheters, drain NO MORE THAN 750 mL at once to prevent hypotension, inflate balloon with sterile water per manufacturer volume, tug gently for resistance then advance slightly off the bladder neck, connect closed uribag kept below bladder level without kinks, and tape to upper thigh with slack. For Male Catheterization: position supine with thighs slightly apart, generously lubricate catheter 15–18 cm (and instil local anaesthetic lubricant gel proximally while occluding distal urethra; cooling gel to 4°C reduces transient stinging), grasp penis with non-dominant hand, retract foreskin in uncircumcised males, cleanse circularly from meatus toward shaft base, hold penis at a 90° angle pulling gently upward to straighten the urethra, advance catheter 15–20 cm (to the Y-hub) until urine flows plus 1 inch (if resistance occurs, ask client to breathe deeply/bear down or adjust angle; NEVER force—stop and notify charge nurse for possible stricture/BPH), inflate balloon only after urine return, ALWAYS reduce retracted foreskin immediately afterward, and secure catheter to upper thigh or lower abdomen with penis directed toward the chest and slack for nocturnal erection."
      },
      {
        "heading": "Troubleshooting, Home Care, Documentation, and Complications",
        "body": "If urine does not flow immediately after insertion, ask the client to take a deep breath (relaxes perineal/abdominal muscles), rotate the catheter slightly (frees drainage eye from bladder wall), or raise the head of the bed to boost bladder pressure. For clients with indwelling catheters, showers are recommended over tub baths to reduce ascending bacterial entry; for home intermittent self-catheterization, clean technique suffices (wash thoroughly, boil catheter 20 minutes, dry, and store cleanly). Document insertion time, catheter size, sterile water volume in balloon, presence/absence of bleeding or inflammation, patient tolerance, and urine amount, colour, and odour. Major complications include: Urinary Tract Infection (urethritis, cystitis, pyelonephritis, transient bacteraemia—the MOST COMMON long-term complication), Paraphimosis (from failing to reduce the foreskin post-procedure), urethral strictures, urethral perforation/injury, bleeding, pain from bag traction, catheter obstruction from sediment (relieved by flushing), altered micturition, and painful bladder spasms causing extrinsic urine leakage (managed with anticholinergics such as oxybutynin)."
      }
    ],
    "inTextQuestions": [
      {
        "question": "Why must no more than 750 mL of urine be drained at one time during urinary catheterization?",
        "answer": "To prevent sudden decompression-induced hypotension."
      },
      {
        "question": "What clinical sign at the urethral meatus is an absolute warning sign/contraindication against urethral catheter insertion, and what alternative route can be used?",
        "answer": "Blood at the meatus (indicating urethral trauma, which catheter insertion can worsen). Suprapubic catheterization (or external condom catheter for incontinence) is the alternative."
      },
      {
        "question": "What causes paraphimosis after male catheterization, and why must slack be left when taping a male patient's catheter toward the chest?",
        "answer": "Paraphimosis is caused by failing to reduce the retracted foreskin back over the glans after catheterization. Leaving slack prevents tension and accommodates natural nocturnal penile erection, while directing the penis toward the chest prevents penoscrotal angle irritation."
      },
      {
        "question": "State the standard French catheter sizes for children, adult females, and adult males.",
        "answer": "Children: 8 Fr and 10 Fr; Adult females: 14 Fr and 16 Fr; Adult males: 20 Fr and 22 Fr."
      }
    ],
    "saqs": [
      {
        "id": "5.1",
        "question": "Explain why a patient undergoing non-urological abdominopelvic surgery may require urinary catheterization, and list five contraindications to urethral catheterization.",
        "answer": "Surgical catheterization keeps the bladder empty to give the surgeon a clearer view and safer palpation of internal tissues, prevents accidental bladder injury, and prevents urine from contaminating perineal sutures. Five contraindications: blood at the meatus (urethral trauma), gross haematuria, urethral infection, urethral pain/discomfort, and patient refusal (also low bladder compliance)."
      },
      {
        "id": "5.2",
        "question": "List the six parts of an indwelling Foley catheter and differentiate intermittent, indwelling, suprapubic, and external condom catheters.",
        "answer": "Parts: catheter tip, drainage eye, balloon seal, catheter shaft, drainage funnel, and inflation funnel/balloon port. Types: Intermittent (temporary 5–10 min drainage), Indwelling/Foley (held in place days/weeks by water-filled balloon), Suprapubic (surgically placed through lower abdomen for continuous drainage), External condom (non-invasive sheath adhering externally for incontinence)."
      },
      {
        "id": "5.3",
        "question": "Compare the anatomical length, cleansing technique, insertion depth, and securing method between female and male urethral catheterization.",
        "answer": "Female: urethra 3.7–6.2 cm; cleanse labia/meatus anterior-to-posterior (meatus last) with fresh swabs; insert 5–7.5 cm (+1 inch for balloon); secure to upper thigh with slack. Male: urethra 18–20 cm; retract foreskin, cleanse circularly from meatus to base; hold penis at 90° upward, lubricate 15–18 cm, insert 15–20 cm (to Y-hub) +1 inch; reduce foreskin; secure to thigh or lower abdomen directed toward chest with slack."
      },
      {
        "id": "5.4",
        "question": "Outline three troubleshooting actions if urine fails to flow immediately after catheter insertion, and explain why a shower is safer than a tub bath with an indwelling catheter.",
        "answer": "Troubleshooting: (1) ask the client to take a deep breath to relax perineal/abdominal muscles, (2) rotate the catheter slightly in case the drainage eye rests against the bladder wall, and (3) raise the head of the bed to increase bladder pressure. A shower is safer because sitting in bathwater allows easy bacterial entry into the urinary tract."
      },
      {
        "id": "5.5",
        "question": "List six complications of urinary catheterization and explain how catheter sediment obstruction and painful bladder spasms are managed.",
        "answer": "Six complications: UTI (urethritis, cystitis, pyelonephritis, bacteraemia—most common), paraphimosis, urethral strictures, urethral perforation, bleeding, and altered micturition. Sediment obstruction is often relieved by catheter flushing, while painful bladder spasms causing extrinsic leakage can be alleviated with anticholinergics such as oxybutynin."
      }
    ]
  },

  // Module 6
  {
    "id": 6,
    "title": "Collection of Specimens from the Nose, Throat and Sputum",
    "introduction": "Upper and lower respiratory tract cultures pinpoint causative pathogens in pharyngitis, nasal colonization, pneumonia, and tuberculosis. Grounded in nasal sinus and pharyngeal anatomy, precise swabbing of target mucosa, deep-cough sputum expectoration, and safe sterile tracheal suctioning yield uncontaminated diagnostic specimens while protecting airway oxygenation across all age groups.",
    "learningOutcomes": [
      "6.1 Describe the relevant anatomy of the nose (including the four paranasal sinuses and their developmental timelines) and throat (pharynx, tonsils, adenoids, larynx, epiglottis).",
      "6.2 Perform pre-collection clinical assessment, state nursing diagnoses, and identify required articles for nose, throat, and sputum cultures.",
      "6.3 Demonstrate step-by-step sterile throat swabbing and nasal mucosa culturing techniques while avoiding oral or anterior-nares contamination.",
      "6.4 Execute sputum specimen collection by both client expectoration and sterile tracheal suctioning, emphasizing oxygenation intervals and biohazard handling.",
      "6.5 Apply essential pediatric safety precautions when collecting throat and respiratory specimens from infants and young children."
    ],
    "content": [
      {
        "heading": "Anatomy of the Nose, Paranasal Sinuses, and Throat",
        "body": "The nose—responsible for breathing and olfaction—comprises the external meatus, external nostrils divided by the cartilaginous/bony septum, ciliated mucous-lined nasal passages filtering air, and four paired air-filled paranasal sinuses draining into the nasal passages: Ethmoid sinuses (between the eyes at the nasal bridge; present at birth), Maxillary sinuses (cheeks; present at birth), Frontal sinuses (forehead; develop around age 7 years), and Sphenoid sinuses (deep behind the nose; develop in the teen years). The throat (pharynx—divided into nasopharynx, oropharynx, and hypopharynx) is a muscular passageway for air, food, liquid, and speech containing lymphoid tissue: Adenoids (top of throat behind nose; shrink by early adulthood) and Tonsils (back of mouth laterally; protect against childhood infection). Below lies the Larynx (voice box housing vocal cords leading into the trachea) guarded superiorly by the Epiglottis, a soft-tissue flap folding over the vocal cords during swallowing to prevent aspiration."
      },
      {
        "heading": "Assessment, Equipment, Throat Swabbing, and Nasal Mucosa Culturing",
        "body": "Prior to swabbing, assess the client's comprehension, observe for anxiety, and inspect nasopharyngeal mucosa for redness, swelling, exudates, congestion, or bleeding so sampling targets inflamed areas; nursing diagnoses include Health-Seeking Behaviours (knowledge deficit), Anxiety, and Pain (mucosal irritation). Required articles: sterile cotton-tipped swab in culture tube (for pharyngeal exudates), sterile flexible wire swab in culture tube (for nasal mucosa—less traumatic), tongue depressor, penlight/head-mounted light, facial tissues, emesis basin (for gagging/vomiting), ID labels, laboratory requisition, gloves, and apron. For Throat Swabbing: explain the procedure (warning of a brief tickling sensation), wash hands, seat client upright with tissues and emesis basin nearby, loosen swab cap, ask client to tilt head back and open wide, depress tongue while illuminating pharynx to spot inflamed areas/exudates, set penlight aside, insert swab carefully avoiding the tongue, teeth, and cheeks (GOOD targets: posterior throat wall & tonsils; UNSUITABLE: tongue & sides of mouth), rub quickly and firmly over tonsils and posterior pharynx behind the uvula, crush the transport medium ampoule at the bottom of the tube and push swabs firmly onto the sponge (never cut or detach red-cap swabs; discard white transport cap), discard tongue blade, offer tissues/water, wash hands, label, and send promptly. For Nasal Mucosa Culturing: instruct client to blow nose (clearing anterior contaminants), tilt head back to access turbinates, check nostril patency with penlight, check expiry date and optionally moisten swab with sterile water for comfort; insert pre-curved flexible wire swab gently without touching anterior sides, advance past slight resistance to reach the turbinates, rotate against turbinate mucosa, and withdraw cleanly (alternatively, for anterior nares screening, sweep upwards in one anterior nare and repeat in the opposite nare with the same swab)."
      },
      {
        "heading": "Sputum Collection by Expectoration and by Tracheal Suctioning",
        "body": "Before sputum collection, verify test purpose, specimen count, respiratory infection signs (cough, chest pain), and ability to cough deeply (nursing diagnoses: Ineffective Airway Clearance, Health-Seeking Behaviours, Anxiety). For Client Expectoration: explain procedure and gain consent, have client rinse mouth with water first (removes oral flora contaminants), don clean gloves, position upright (high Fowler's, dangling, or standing for maximal lung expansion), hand sterile container warning not to touch the inside, instruct client to take slow deep breaths and cough deeply after full inhalation to bring up lower-airway secretions directly into the container until at least 5 mL is collected, screw cap tightly BEFORE wiping exterior sputum with a disinfectant wipe, offer tissues and mouth care, label in the client's presence, place in a biohazard plastic bag, discard PPE, wash hands, transport immediately, and document sputum appearance/quality. For Sputum Collection by Suctioning: place client in high Fowler's position, attach suction tubing to a sterile sputum collection trap, open sterile saline and suction kit aseptically, don a sterile glove on the dominant hand, pour saline into cup with ungloved hand, attach suction catheter to trap, turn on suction, lubricate catheter tip by dipping in sterile normal saline (NEVER oil), advance gently through patent nare, endotracheal tube, or tracheostomy into the trachea, encourage coughing, apply intermittent suction briefly by covering the valve with gloved thumb while avoiding prolonged hypoxia, WAIT AT LEAST 1 FULL MINUTE between suction passes for reoxygenation until 5 mL is collected, monitor continuously for dyspnoea, cyanosis, or restlessness (giving oxygen if hypoxic), withdraw gently WITHOUT suction, seal trap tubing onto its adaptor, comfort client, wash hands, and document. Pediatric Special Considerations: Infants are obligate nose-breathers—NEVER occlude an infant's nose when taking a throat swab; cooperative children can sit on their hands, open their mouths, and laugh or pant like a dog while a parent gently steadies them."
      }
    ],
    "inTextQuestions": [
      {
        "question": "Which two paranasal sinuses are present at birth, and when do the frontal and sphenoid sinuses typically develop?",
        "answer": "Ethmoid and maxillary sinuses are present at birth; frontal sinuses develop around age 7 years, and sphenoid sinuses typically develop during the teen years."
      },
      {
        "question": "Which oral structures must be strictly avoided during throat swabbing, and which areas are the proper swab targets?",
        "answer": "Avoid touching the tongue, teeth, and cheeks (sides of the mouth); firmly swab the tonsils and posterior pharyngeal/nasopharyngeal wall behind the uvula."
      },
      {
        "question": "What minimum volume of sputum is required for diagnostic testing, and what lubricant is used on a suction catheter tip?",
        "answer": "A minimum of 5 mL of sputum is required. Sterile normal saline (never oil) is used to lubricate the suction catheter tip."
      },
      {
        "question": "How long must a nurse wait between tracheal suction passes when collecting sputum, and why must an infant's nose never be occluded during a throat swab?",
        "answer": "Wait at least 1 full minute between passes to permit reoxygenation. Infants normally breathe only through their noses, so occluding an infant's nose risks respiratory compromise."
      }
    ],
    "saqs": [
      {
        "id": "6.1",
        "question": "List the eight essential articles needed for collecting nose and throat cultures and state the specific purpose of the flexible wire swab and tongue depressor.",
        "answer": "Articles: sterile cotton-tipped swab in culture tube, sterile flexible wire swab in culture tube, tongue depressor, penlight, facial tissue, identification labels, laboratory requisition, and emesis basin. The flexible wire swab collects nasal mucosa exudates with less tissue trauma, while the tongue depressor pushes down the tongue for unobstructed pharyngeal visualization."
      },
      {
        "id": "6.2",
        "question": "Outline the step-by-step procedure for swabbing a patient's throat and explain proper handling of the culture transport tube.",
        "answer": "Explain procedure (brief tickle), wash hands, seat upright with tissue/emesis basin -> tilt head back, open mouth -> depress tongue and inspect pharynx with penlight for redness/exudates -> insert sterile swab avoiding tongue/teeth/cheeks -> rub quickly and firmly over tonsils and posterior wall behind uvula -> crush culture medium ampoule and seat swab firmly onto sponge (without breaking red-cap swabs) -> discard blade, comfort client, wash hands, label, and send promptly."
      },
      {
        "id": "6.3",
        "question": "Explain the positioning and sequential steps for culturing the nasal mucosa using a flexible wire swab.",
        "answer": "Ask client to blow nose (clears anterior microbes) -> tilt head back to expose turbinates -> inspect patency with penlight -> gently insert pre-curved wire swab without touching anterior nares -> advance gently past turbinate resistance -> rotate tip against turbinate mucosa -> withdraw quickly without touching sides -> seal, label, and transport."
      },
      {
        "id": "6.4",
        "question": "Describe the nursing procedure for collecting a sputum specimen by client expectoration, including mouth preparation, positioning, volume, and exterior decontamination.",
        "answer": "Explain procedure -> rinse mouth with water first to remove oral contaminants -> don gloves and place upright (high Fowler's/standing) for maximal lung expansion -> give sterile container (do not touch inside) -> deep breaths followed by deep cough expectorating directly until ≥5 mL collected -> tighten lid completely BEFORE wiping outside with disinfectant wipe -> offer tissues/mouth care, label in patient's presence, place in biohazard bag, transport immediately, and document."
      },
      {
        "id": "6.5",
        "question": "Explain the sterile precautions, oxygenation safety rules, and pediatric adaptations for respiratory specimen collection.",
        "answer": "Suctioning uses high Fowler's position, sterile glove on dominant hand, saline lubrication (never oil), brief intermittent suction during cough, ≥1 full minute rest between passes for reoxygenation, monitoring for hypoxia/dyspnoea, and gentle withdrawal without suction. Pediatric care: never occlude an infant's nose during throat swabbing (obligate nasal breathers); encourage cooperative children to put hands under buttocks and laugh/pant like a dog with parental support."
      }
    ]
  },

  // Module 7
  {
    "id": 7,
    "title": "Wound Dressing, Stages of Wound Healing and Wound Complications",
    "introduction": "Any break in skin integrity breaches the body's primary barrier against microbial invasion. Performing sterile non-touch wound dressing with proper forceps handling, direction of cleansing, and exudate assessment—combined with understanding wound healing intentions and systemic barriers to healing—accelerates tissue repair and prevents infection, dehiscence, and evisceration.",
    "learningOutcomes": [
      "7.1 Define wound dressing, state its five core clinical purposes, and conduct a thorough pre-dressing wound assessment.",
      "7.2 Organize sterile top-shelf and bottom-shelf trolley requirements and prepare the client and clinical environment safely.",
      "7.3 Execute step-by-step sterile non-touch wound dressing, including proper forceps roles, tape removal, and cleansing directions for linear versus irregular wounds.",
      "7.4 Differentiate primary, secondary, and tertiary intention wound healing.",
      "7.5 Analyze factors that delay wound healing and identify the three major complications of wounds (infection, dehiscence, evisceration)."
    ],
    "content": [
      {
        "heading": "Definition, Five Purposes, Assessment, Nursing Plan, and Trolley Setup",
        "body": "Wound dressing is the sterile cleaning and covering of a wound to achieve five key purposes: (1) protecting the wound from microbial contamination, (2) providing or maintaining a moist wound-healing environment, (3) immobilizing the wound to facilitate healing, (4) absorbing wound drainage, and (5) preventing haemorrhage. Pre-dressing assessment evaluates eight parameters: wound location/size/shape (determines dressing type), condition of current dressing, exterior moisture/drainage (signals copious exudate needing more absorbent dressing), exudate volume/colour/viscosity/odour, freshness/amount of blood (large fresh blood indicates haemorrhage needing a pressure dressing), pain severity (manage pain beforehand to ensure cooperation), elevated temperature or pulse (suggests wound infection), and client willingness to participate. Nursing diagnoses include Risk for Infection, Pain, Impaired Physical Mobility, and Impaired Skin Integrity. Preparation requires explaining/consenting, administering analgesics if needed, disinfecting the trolley with clean gloves, donning a facemask, closing nearby windows (limiting airborne contaminants), pre-cutting tape strips, raising the bed to working height, and placing a dressing mackintosh beneath the limb/body part. Trolley Requirements: Top Shelf (sterile)—kidney dish with 2 non-toothed dissecting forceps and 2 dressing forceps (+ scissors if needed and extra dressing forceps for multiple wounds), 2–3 gallipots for cleansing and dressing lotions, and a medium covered bowl of cotton balls and gauze swabs; Bottom Shelf—bandages, adhesive tape, scissors, normal saline, prescribed topical medications (e.g., honey, povidone-iodine cream, Sofratulle), mackintosh/towel, disinfectant kidney dish for used forceps, covered paper-lined destructor bowl/disposal bag, paper-lined kidney dish for used swabs, and clean/sterile gloves."
      },
      {
        "heading": "Step-by-Step Sterile Non-Touch Wound Dressing Technique",
        "body": "Wound dressing is a strict sterile non-touch procedure: (1) wash hands, open sterile bowls/receivers aseptically, pour cleansing lotion into gallipot, don facemask and clean gloves; (2) remove adhesive tape slowly while supporting skin and pulling TOWARD the wound (prevents traction/pain along the incision line); (3) lift soiled dressings using dissecting forceps (moistening with sterile normal saline if adhered) and dispose into the destructor bowl; (4) inspect drainage colour/consistency/odour/amount and check for healing or dehiscence, then discard soiled forceps; (5) don sterile gloves and use a paired forceps technique—hold the DISSECTING FORCEPS in the NON-DOMINANT hand to pick up sterile swabs and pass them to the DRESSING FORCEPS in the DOMINANT hand for cleansing, keeping forceps tips pointed downward at all times so fluid does not run back and contaminate the sterile tips; (6) cleanse moving from least to most contaminated—for linear incisions, stroke firmly proximal-to-distal directly over the incision first, then adjacent skin (discarding each swab after one stroke); for irregular wounds, stroke firmly from the centre outward in circular motions using a fresh swab for each circle; dry similarly if overly wet; (7) apply prescribed topical medication and sufficient sterile absorbent gauze—avoiding tight packing in non-bleeding wounds because tight packing forces wound edges apart and delays healing; (8) discard gloves, secure dressing with tape/bandages, reposition client comfortably, wash instruments with clean gloves and pack for CSSD sterilization, clear trolley, wash hands, and document pre/post-dressing wound status (exudate, erythema, granulation) and lotions used."
      },
      {
        "heading": "Stages (Intentions) of Wound Healing, Delaying Factors, and Complications",
        "body": "Wounds heal via three distinct intentions: (1) Primary Intention (ideal healing)—clean, straight, minimal tissue loss, well-approximated sutured edges (e.g., surgical incisions) healing rapidly via fibroblast/capillary-bud proliferation and collagen with minimal scarring; (2) Secondary Intention—open wounds with significant tissue loss or infection where edges cannot be approximated, healing slowly from the base upward via granulation tissue, resulting in a large scar covered by epithelium; and (3) Tertiary Intention (Delayed Primary Closure)—deep or potentially fluid-accumulating wounds deliberately left open for several days (often with a drain or gauze pack) before suturing closed, carrying heightened risk of infection and inflammation. Seventeen systemic and local factors delay wound healing: malnutrition (lacking protein, carbohydrates, fatty acids, trace elements), reduced blood supply/ischaemia/cardiovascular disease, medications (NSAIDs, corticosteroids), chemotherapy (immunosuppression), radiotherapy (cell-damaging free radicals), psychological stress and sleep deprivation, obesity (poor tissue perfusion), infection (prolongs inflammation, consumes nutrients, releases toxins), low wound temperature (cold lotions or prolonged exposure), underlying conditions (diabetes mellitus, autoimmune disorders), maceration (excess moisture lowering tensile strength), inappropriate wound care, non-compliance, unrelieved pressure, immobility, alcohol/cigarette abuse, and advanced age (diminished fibroblastic activity and circulation). The three major wound complications are Wound Infection, Dehiscence (separation of wound edges), and Evisceration (protrusion of internal viscera through a separated wound)."
      }
    ],
    "inTextQuestions": [
      {
        "question": "In the paired-forceps wound dressing technique, which hand holds the dissecting forceps and which hand holds the dressing forceps?",
        "answer": "The non-dominant hand holds the dissecting forceps to pick up sterile swabs, while the dominant hand holds the dressing forceps to clean and dress the wound."
      },
      {
        "question": "How should adhesive tape be removed from a wound dressing, and in what direction should an irregular wound be cleansed?",
        "answer": "Remove tape slowly while supporting the skin and pulling TOWARD the wound to minimize pain and incision tension. Cleanse an irregular wound from the centre outward in circular motions (least to most contaminated), discarding the swab after each circle."
      },
      {
        "question": "Which wound-healing intention is also called 'delayed primary closure', and why should non-bleeding wounds NOT be tightly packed?",
        "answer": "Tertiary intention is delayed primary closure. Tightly packing a non-bleeding wound forces the wound edges apart and delays healing."
      },
      {
        "question": "What are the three major complications of wounds?",
        "answer": "Wound infection, dehiscence, and evisceration."
      }
    ],
    "saqs": [
      {
        "id": "7.1",
        "question": "State the five purposes of wound dressing and explain what elevated temperature/pulse and copious fresh blood on a dressing signify during pre-dressing assessment.",
        "answer": "Five purposes: protect from microbial contamination, maintain moist healing, immobilize wound to facilitate healing, absorb drainage, and prevent haemorrhage. Elevated temperature/pulse suggests wound infection; large amounts of fresh blood suggest haemorrhage requiring a pressure dressing."
      },
      {
        "id": "7.2",
        "question": "List the top-shelf and bottom-shelf articles on a wound dressing trolley and explain why nearby windows are closed before starting.",
        "answer": "Top shelf: kidney dish with 2 non-toothed dissecting forceps, 2 dressing forceps, scissors, 2–3 gallipots for lotions, covered bowl with cotton balls/gauze. Bottom shelf: bandages/tape/scissors, normal saline, prescribed topical agents (honey, povidone-iodine, Sofratulle), mackintosh/towel, disinfectant dish for used forceps, destructor bowl, paper-lined dish for used swabs, clean & sterile gloves. Windows are closed to prevent airborne dust/microbial contamination."
      },
      {
        "id": "7.3",
        "question": "Describe the aseptic cleansing technique for both a linear surgical incision and an irregular open wound, stating the rationale for keeping forceps tips pointed downward.",
        "answer": "Linear incision: stroke firmly proximal-to-distal over the incision first, then adjacent skin, using a fresh swab per stroke. Irregular wound: stroke firmly from centre outward in circular motions, changing swabs after each circle (moves from least to most contaminated). Keeping forceps tips downward prevents cleansing lotion from running back up the handle and contaminating the sterile tips."
      },
      {
        "id": "7.4",
        "question": "Compare Primary Intention, Secondary Intention, and Tertiary Intention wound healing.",
        "answer": "Primary intention: clean, minimal tissue loss, sutured well-approximated edges healing rapidly with minimal scarring. Secondary intention: open wound with substantial tissue loss/infection healing via granulation tissue and large scar. Tertiary intention (delayed primary closure): deep wound left open several days with drain/pack before suturing, with higher infection/inflammatory risk."
      },
      {
        "id": "7.5",
        "question": "Identify four patient-specific factors delaying foot-ulcer healing in a 54-year-old obese diabetic woman undergoing cancer treatment, and list six other general factors that delay wound healing.",
        "answer": "Patient-specific factors: underlying diabetes mellitus, obesity (reduced perfusion), advancing age (54), and cancer therapy (chemotherapy immunosuppression / radiotherapy free-radical cell damage). Six other factors: malnutrition, ischaemia/cardiovascular disease, NSAIDs/corticosteroids, wound infection, maceration, and smoking/alcohol abuse (also low wound temperature, psychological stress, unrelieved pressure, immobility)."
      }
    ]
  },

  // Module 8
  {
    "id": 8,
    "title": "Fluid Input/Output Monitoring and Intravenous Infusion Therapy",
    "introduction": "Maintaining precise fluid and electrolyte homeostasis—regulated primarily by the kidneys—demands accurate 24-hour intake/output tracking alongside skilled administration and maintenance of intravenous infusions. Understanding isotonic, hypotonic, and hypertonic fluid physiology, gravity and pump flow control, and aseptic 72-hour tubing and dressing changes protects clients from fluid overload, air embolism, infiltration, and bloodstream infection.",
    "learningOutcomes": [
      "8.1 Define fluid input/output (I&O) monitoring, state its four purposes, apply standard bedside fluid volume equivalents, and measure output accurately including in incontinent or infant clients.",
      "8.2 Define intravenous (IV) infusion, list its six clinical purposes, and compare isotonic, hypotonic, and hypertonic solutions (osmolality, indications, contraindications, and complications).",
      "8.3 Demonstrate step-by-step IV infusion setup, priming, flow regulation, and monitoring while identifying contraindicated venipuncture sites, flow-rate factors, and IV complications.",
      "8.4 State the two reasons for changing IV containers, tubing, and dressings (every 72 hours) and outline the required sterile articles.",
      "8.5 Execute step-by-step aseptic changing of an IV container, tubing, and cannula site dressing without dislodging or contaminating the venous line."
    ],
    "content": [
      {
        "heading": "Monitoring Fluid Input and Output (I&O)",
        "body": "Fluid intake and output (I&O) monitoring is the accurate measuring and recording of all fluids entering and leaving the body over a 24-hour period (kidneys serve as the primary fluid regulators) to achieve four purposes: assessing general health, monitoring specific diseases, evaluating fluid and electrolyte balance, and assessing organ function such as the kidneys. Required articles: bedside I&O form, 24-hour chart graphic record, bedpan/urinal/commode, graduated drinking tumbler, graduated output container, clean gloves, and a bedside 'I&O Monitoring' sign. Standard bedside volume equivalents guide consistent oral measurement: water glassful = 200 mL, cupful = 120 mL, large paper cup = 200 mL, small paper cup = 120 mL, soup bowl = 180 mL, and full water pitcher = 1,000 mL. Intake includes ALL oral liquids (including water swallowed with pills), semi-solid liquid foods, tube feedings, and IV fluids; Output includes urine (emptying retention catheter bags into a measuring jug at shift end or prescribed intervals), NG suction, and wound/drainage outputs. For infants and incontinent clients, output is calculated by weighing dry diapers/incontinent pads and subtracting that dry weight from the weight of soiled items. Nurses sum 8-hour shift totals from the bedside sheet and transfer them to the 24-hour chart record, strictly observing universal precautions and instructing visitors/family members NEVER to empty bedpans, urinals, or catheter bags."
      },
      {
        "heading": "Intravenous Infusion Therapy: Purposes and Types of IV Solutions",
        "body": "Intravenous (IV) infusion administers sterile fluids directly into a peripheral (or central) vein via a cannula or butterfly needle for six purposes: maintaining fluid/electrolyte balance, supplying metabolic glucose, delivering water-soluble vitamins/minerals, establishing an emergency lifeline, administering medications (rapid onset within seconds to minutes—requiring strict rate/dilution verification), and transfusing blood/blood products (whole blood, PRBCs, albumin, cryoprecipitate). Solutions are classified relative to plasma osmolality (~300 mOsm/L): (1) Isotonic Fluids (total electrolytes ~310 mEq/L; do not shrink or swell RBCs; expand ECF by 1 L and plasma by 0.25 L—monitor HTN/HF clients for overload): D5W (5% dextrose, 252 mOsm/L; isotonic in bag but disperses hypotonically—1/3 ECF, 2/3 ICF—as glucose metabolizes; supplies water/treats hyperosmolality; contraindicated for fluid resuscitation due to hyperglycaemia), Normal Saline (0.9% NaCl, 308 mOsm/L; stays in ECF; used for blood transfusions and burn sodium losses; contraindicated in heart failure, pulmonary oedema, renal impairment, and sodium retention), and Lactated Ringer's (NaCl + potassium + calcium; corrects dehydration, sodium depletion, and GI losses); (2) Hypotonic Fluids (<250 mEq/L, e.g., 0.45% half-strength saline, 154 mOsm/L): replace cellular fluid and supply free water in hypernatremia/hyperosmolar states; excessive infusion causes intravascular depletion, hypotension, cellular oedema, and cell damage; and (3) Hypertonic Fluids (>375 mEq/L, e.g., D5NS, D5LR, or strongly hypertonic 50% dextrose in water—which MUST enter central veins for rapid dilution): draw water from ICF into ECF, shrinking cells; used cautiously only in severe hypo-osmolality because excess causes extracellular overload, circulatory overload, and cellular dehydration."
      },
      {
        "heading": "IV Setup, Flow-Rate Control, Complications, and Changing IV Container, Tubing & Dressing",
        "body": "IV setup begins by verifying the physician's order (solution, volume, flow rate), assessing baseline vitals, allergies (tape/povidone-iodine), bleeding tendencies, and screening venipuncture contraindications (AV fistula, arm on mastectomy side, phlebitis, infiltration, sclerosis). Inspect containers for turbidity, sediments, colour change, and expiry; add prescribed medications and paste the medication label UPSIDE DOWN for easy reading when hung; paste a timing/flow-rate label; hang the bag on an IV pole 3 feet above the patient's head (enabling gravity to overcome venous pressure); squeeze the drip chamber half full; prime tubing completely to expel all air bubbles (preventing air embolism); connect to cannula and regulate flow accurately via roller clamp or volumetric/syringe pump (preventing cardiac overload); and label tubing with date/time (IV tubing is changed every 72 hours). Five factors influence flow rate: forearm position, tubing position/patency, height of infusion container, infiltration/leakage, and cannula-to-vein size ratio. Monitor sites frequently for the three primary IV complications—Infiltration (swelling, coolness, blanching, slowed flow), Phlebitis (vein inflammation/redness/pain), and Extravasation (vesicant/blood leakage into tissue). Changing an IV Container, Tubing, and Dressing serves two purposes—preventing infection/phlebitis and maintaining patency—using new verified fluid, sterile drip set, labels, kidney tray, sterile gloves, sterile gauze, antiseptic swabs, tape, and underpad. After priming and labelling new tubing, don gloves, remove soiled dressing/tapes layer-by-layer EXCEPT the cannula-anchoring tape, and inspect the site (if infiltration or inflammation exists, REMOVE the cannula and start a new IV site elsewhere). Place a sterile swab beneath the hub, clamp old tubing, hold hub steady with non-dominant hand, twist off old tubing, attach new primed tubing, open clamp, remove anchor tape while holding hub, clean site with adhesive remover then alcohol/povidone-iodine from CENTRE TO PERIPHERY across a 2-inch diameter, apply antiseptic ointment and sterile gauze, label dressing with date/time, secure tubing, discard waste, wash hands, and document."
      }
    ],
    "inTextQuestions": [
      {
        "question": "What standard fluid volumes correspond to a water glassful, a soup bowl, and a full water pitcher, and how often are shift I&O totals transferred to the 24-hour record?",
        "answer": "Water glassful = 200 mL; soup bowl = 180 mL; full water pitcher = 1,000 mL. Totals are summed and transferred every 8-hour shift."
      },
      {
        "question": "Which IV fluid is preferred for a burn patient with large sodium losses, and what four conditions contraindicate it?",
        "answer": "Normal Saline (0.9% NaCl, isotonic). Contraindications: heart failure, pulmonary oedema, renal impairment, and sodium retention."
      },
      {
        "question": "Why is an IV bag hung 3 feet above the patient's head, and how often should IV tubing be changed?",
        "answer": "Hanging it 3 feet above the patient's head allows gravity to overcome venous pressure for steady flow. IV tubing must be labelled and changed every 72 hours."
      },
      {
        "question": "When changing an IV dressing, what must the nurse do if signs of infiltration or inflammation are found at the cannula site, and in what pattern is an intact site cleansed?",
        "answer": "If infiltration or inflammation is present, remove the cannula immediately and start a new IV line at a different site. An intact site is cleansed from the centre (entry point) outward to the periphery across a 2-inch diameter."
      }
    ],
    "saqs": [
      {
        "id": "8.1",
        "question": "State the four purposes of monitoring fluid input and output, list the required bedside articles, and explain how output is measured in an incontinent patient.",
        "answer": "Four purposes: assess general health, monitor specific diseases, evaluate fluid/electrolyte balance, and assess renal/organ status. Articles: bedside I&O form, 24-hr chart record, bedpan/urinal/commode, graduated drinking cup and output container, clean gloves, bedside I&O sign. Incontinent/infant output: weigh dry diapers or incontinent pads first, then subtract the dry weight from the weight of the soiled items."
      },
      {
        "id": "8.2",
        "question": "Compare Isotonic, Hypotonic, and Hypertonic intravenous fluids by electrolyte content, one example each, primary clinical use, and main complication of excess infusion.",
        "answer": "Isotonic (~310 mEq/L, e.g., 0.9% NaCl, LR, D5W): expands ECF/replaces losses; excess causes fluid/circulatory overload. Hypotonic (<250 mEq/L, e.g., 0.45% NaCl): replaces cellular fluid in hypernatremia; excess causes intravascular depletion, hypotension, and cellular oedema/damage. Hypertonic (>375 mEq/L, e.g., 50% dextrose via central vein): corrects severe hypo-osmolality by drawing ICF to ECF; excess causes circulatory overload and cellular dehydration."
      },
      {
        "id": "8.3",
        "question": "List five contraindications to venipuncture at a specific extremity, five factors influencing IV flow rate, and three complications of IV therapy.",
        "answer": "Venipuncture contraindications: arterio-venous fistula, arm on mastectomy side, phlebitis, infiltration, and vein sclerosis. Five flow-rate factors: forearm position, tubing position/patency, height of infusion container, infiltration/fluid leakage, and cannula-to-vein size ratio. Three IV complications: infiltration, phlebitis, and extravasation."
      },
      {
        "id": "8.4",
        "question": "Explain the rationale for pasting an IV medication label upside down, priming tubing before connection, squeezing the drip chamber half full, and monitoring infusion flow via pump or roller clamp.",
        "answer": "Upside-down label enables easy reading once the bottle hangs; priming expels all air bubbles to prevent air embolism; half-filling the drip chamber prevents air moving down tubing while letting drops be counted; regulating flow via pump/clamp prevents cardiac/fluid overload."
      },
      {
        "id": "8.5",
        "question": "Outline the sequential steps for changing an IV container, tubing, and site dressing safely.",
        "answer": "1. Verify physician order and inspect new container; 2. Wash hands, spike/label/prime new tubing; 3. Prepare tape strips/dressing tray and don gloves; 4. Remove soiled dressing/tapes layer-by-layer leaving anchor tape intact; 5. Assess site for infiltration/inflammation (restart elsewhere if present); 6. Place sterile swab under hub, clamp/disconnect old tubing while stabilizing hub, connect new primed tubing and open clamp; 7. Remove anchor tape holding hub, clean site centre-to-periphery (2-inch diameter) with alcohol/povidone-iodine; 8. Apply antiseptic ointment and sterile gauze, label with date/time, secure tubing, discard waste, wash hands, and document."
      }
    ]
  }
];

const targetDirs = [
  path.resolve(__dirname, '../../content/nsg232'),
  path.resolve(__dirname, '../src/data/nsg232')
];

for (const dir of targetDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  modules.forEach((mod) => {
    const filename = `module${mod.id}.json`;
    const filePath = path.join(dir, filename);
    fs.writeFileSync(filePath, JSON.stringify(mod, null, 2), 'utf8');
    console.log(`Wrote ${filePath}`);
  });
}

console.log('Successfully written all 8 NSG 232 modules.');
