const fs = require('fs');
const path = require('path');

const modules = [
  // Module 1
  {
    "id": 1,
    "title": "Digestive System I: Gastrointestinal Structure, Accessory Organs, Sphincters and Motility",
    "introduction": "The gastrointestinal tract (GIT) and its accessory organs serve as the body's portal for water, electrolytes, vitamins, minerals, and energy substrates. Mastering the four histological wall layers, specialized regional anatomy, six anatomical sphincters, and coordinated basic and functional motility patterns establishes the structural foundation for understanding human digestion and absorption.",
    "learningOutcomes": [
      "1.1 Identify all organs of the alimentary canal (GIT) and the six accessory digestive organs, describing the four histological layers of the GI wall.",
      "1.2 Explain the structure-function relationships of the oral cavity, teeth, tongue, salivary glands, esophagus, stomach (including gastric gland cells), small intestine, and large intestine.",
      "1.3 Detail the anatomical architecture and physiological functions of the liver, gallbladder, pancreas, and the major GIT sphincters.",
      "1.4 Distinguish basic GIT movements (peristalsis, deglutition) from functional GIT movements (mastication, gastric motility, gastric emptying).",
      "1.5 Trace the neural mechanisms of the chewing reflex, the three phases of deglutition, receptive relaxation, retropulsion, and regulation of gastric emptying."
    ],
    "content": [
      {
        "heading": "Overview of the Digestive System, Wall Layers, and GIT Sphincters",
        "body": "Nutrition encompasses all processes supplying materials needed for energy production, growth, tissue repair, secretions, and fluid-electrolyte homeostasis. The digestive system comprises the muscular Gastrointestinal Tract (GIT / alimentary canal)—oral cavity, pharynx, esophagus, stomach, small intestine (duodenum, jejunum, ileum), large intestine (cecum, appendix, ascending, transverse, descending, and sigmoid colon), rectum, and anal canal—supported by six Accessory Organs: tongue, teeth, salivary glands, liver, gallbladder, and pancreas. Across the tract, food progresses through Ingestion, Digestion, Absorption, Assimilation, and Defecation. Histologically, the GIT wall exhibits four concentric layers from lumen outward: (1) Mucosa (epithelium, lamina propria with immune cells, and muscularis mucosae—secreting mucus, acid, and enzymes while absorbing nutrients); (2) Submucosa (connective tissue housing blood vessels, lymphatics, nerves, and submucosal glands); (3) Muscularis Externa (smooth muscle driving mixing and propulsion—circular and longitudinal layers generally, plus an inner oblique layer in the stomach); and (4) Serosa (visceral peritoneum reducing friction and protecting organs). Unidirectional transit and compartmentalization are regulated by key GIT Sphincters: Upper Esophageal Sphincter (cricopharyngeus muscle), Lower Esophageal (Cardiac) Sphincter, Pyloric Sphincter (controlling stomach-to-duodenum emptying), Sphincter of Oddi (at the hepatopancreatic ampulla/ampulla of Vater controlling bile and pancreatic juice entry), Ileocecal Valve (junction of ileum and cecum), and the Internal (involuntary) and External (voluntary) Anal Sphincters."
      },
      {
        "heading": "Structure-Function Relationships: Oral Cavity, Esophagus, Stomach, and Intestines",
        "body": "In the Oral Cavity, teeth (composed of crown, neck, root, enamel, dentin, vascular/innervated pulp, and cementum) perform mechanical processing via specialized types: Incisors (cutting), Canines (tearing), Premolars (crushing), and Molars (grinding). The Tongue (tip, body, root with papillae, taste buds, and lingual nerve) mixes food with saliva, senses taste, aids speech, and propels the bolus for swallowing. Three paired Salivary Glands—Parotid (largest, serous watery secretion), Submandibular, and Sublingual (richer in protein/mucus, more viscous)—moisten food, cleanse the mouth, and initiate starch digestion. The Esophagus is a muscular tube traversing the thorax behind the trachea and through the diaphragm to transport food to the stomach via peristalsis. The J-shaped Stomach divides functionally into Cardia, Fundus, Body (Corpus), and Pyloric Antrum/Pylorus, lined internally by rugae and deep gastric glands containing specialized cells: Mucous Neck Cells (mucus and bicarbonate protecting the lining), Parietal/Oxyntic Cells (hydrochloric acid [HCl] and intrinsic factor), Chief/Peptic/Zymogen Cells (pepsinogen and gastric lipase), Enterochromaffin-like (ECL) Cells (histamine stimulating acid), G Cells (gastrin stimulating acid), and D Cells (somatostatin inhibiting acid). The stomach temporarily stores food, destroys ingested microbes via HCl, churns food mechanically with three smooth muscle layers into chyme, and initiates protein digestion. The Small Intestine (duodenum receiving bile and pancreatic juice, jejunum, and ileum supported by mesentery) completes most digestion and absorbs nutrients across an amplified surface area created by circular folds, finger-like Villi (containing blood capillaries and central lymphatic lacteals), and Microvilli. The Large Intestine (featuring haustra, taenia coli, hepatic and splenic flexures, NO villi, abundant straight Crypts of Lieberkuhn, numerous mucus-secreting goblet cells, and lamina propria immune cells) absorbs water and electrolytes, houses beneficial microflora, and forms, stores, and eliminates feces."
      },
      {
        "heading": "Accessory Organs: Liver, Gallbladder, and Pancreas",
        "body": "The Liver (divided externally into larger right and smaller left lobes by the falciform ligament, plus posterior caudate and quadrate lobes) receives dual blood supply from the hepatic artery (oxygenated arterial blood) and hepatic portal vein (nutrient-rich venous blood from digestive organs), draining via hepatic veins into the inferior vena cava. Microscopically, hepatic lobules consist of radiating cords of Hepatocytes separated by blood Sinusoids (lined by phagocytic Kupffer cells and adjacent to the Space of Disse) converging toward a central vein, bordered by Portal Triads (branches of bile duct, hepatic artery, and hepatic portal vein). Key liver functions include producing bile for fat digestion, metabolizing carbohydrates and lipids, storing glycogen, vitamins, and iron, detoxifying poisons/drugs, and destroying old blood cells. The Gallbladder (fundus, body, neck connecting via the cystic duct to the common hepatic duct to form the common bile duct, joining the pancreatic duct at the ampulla of Vater/major duodenal papilla) stores, concentrates, and releases bile into the duodenum. The Pancreas (head nestled in the duodenum, body, and tail) is a dual gland: exocrine acinar and ductal cells secrete digestive enzymes (for proteins, fats, carbohydrates, and nucleic acids) and acid-neutralizing bicarbonate, while endocrine Islets of Langerhans secrete insulin, glucagon, somatostatin, and pancreatic polypeptide to regulate blood glucose."
      },
      {
        "heading": "Basic vs. Functional GIT Movements: Mastication, Peristalsis, Deglutition, and Gastric Motility",
        "body": "GIT motility is categorized into Basic Movements (occurring along the tract intrinsically—Peristalsis and Deglutition/Swallowing) and Functional Movements (triggered by food presence—Mastication/Chewing, Gastric Motility [propulsion and retropulsion], and Gastric Emptying). Mastication is driven by the brainstem-coordinated Chewing Reflex: jaw opening stretches jaw muscles to trigger reflex contraction of the masseter, medial pterygoid, and temporalis (closing the jaw); food contact with buccal receptors then triggers reflex contraction of the digastric and lateral pterygoid muscles (re-opening the jaw), repeating cyclically to reduce food size, rupture indigestible plant cellulose walls, increase enzyme surface area, mix food with salivary amylase and lingual lipase into a lubricated bolus, and stimulate taste and olfactory receptors. Peristalsis is a stretch-initiated progressive wave of proximal smooth muscle contraction coupled with distal relaxation that propels contents along the pharynx, esophagus, stomach, bile ducts, glandular ducts, and ureters. Deglutition (Swallowing), triggered via trigeminal (CN V), glossopharyngeal (CN IX), and vagus (CN X) afferents, proceeds through three phases: (1) Oral Phase (voluntary—tongue pushes bolus up and back against hard palate), (2) Pharyngeal Phase (involuntary, coordinated by medulla and lower pons; lasts 1–2 seconds with temporary inhibition of respiration as pharyngeal peristalsis pushes the bolus past the open upper esophageal sphincter), and (3) Esophageal Phase (involuntary—Primary esophageal peristalsis initiated by swallowing, and Secondary esophageal peristalsis initiated by residual food distending the esophagus, with force proportional to bolus size). Gastric Motility achieves storage via Receptive Relaxation of the fundus and thorough chyme mixing via peristaltic waves (originating near the fundal-corpus border) and Retropulsion (back-and-forth churning as chyme hits the closed pyloric sphincter). Gastric Emptying proceeds at a rate proportional to chyme volume and fluidity, stimulated primarily by vagal/distension nerve impulses and gastric gastrin."
      }
    ],
    "inTextQuestions": [
      {
        "question": "Distinguish between basic movements and functional movements of the gastrointestinal tract with two examples of each.",
        "answer": "Basic movements occur along the GIT intrinsically (e.g., peristalsis and deglutition/swallowing), whereas functional movements are elicited by the presence of food in the tract (e.g., mastication/chewing, gastric motility [propulsion and retropulsion], and gastric emptying)."
      },
      {
        "question": "Which gastric gland cells secrete hydrochloric acid and intrinsic factor, which secrete pepsinogen, and which secrete somatostatin to inhibit acid?",
        "answer": "Parietal (oxyntic) cells secrete HCl and intrinsic factor; Chief (peptic/zymogen) cells secrete pepsinogen (and gastric lipase); D cells secrete somatostatin."
      },
      {
        "question": "What anatomical structures make up a hepatic Portal Triad, and what is the function of Kupffer cells?",
        "answer": "A portal triad consists of a branch of the bile duct, a branch of the hepatic artery, and a branch of the hepatic portal vein. Kupffer cells are macrophages lining liver sinusoids that phagocytose debris and old blood cells."
      },
      {
        "question": "What distinguishes Primary esophageal peristalsis from Secondary esophageal peristalsis?",
        "answer": "Primary esophageal peristalsis is initiated by the act of swallowing as food enters the esophagus, whereas Secondary esophageal peristalsis is initiated locally by the continued presence/distension of food remaining in the esophagus."
      }
    ],
    "saqs": [
      {
        "id": "1.1",
        "question": "List the four histological layers of the gastrointestinal tract wall from innermost to outermost and state one key structural or functional feature of each.",
        "answer": "1. Mucosa (epithelium, lamina propria, muscularis mucosae—secretes mucus, acid, and enzymes and absorbs nutrients); 2. Submucosa (connective tissue housing blood vessels, lymphatics, nerves, and submucosal glands supporting mucosa); 3. Muscularis Externa (circular and longitudinal smooth muscle—plus inner oblique in stomach—driving mixing and propulsion); 4. Serosa (visceral peritoneum reducing friction and protecting organs)."
      },
      {
        "id": "1.2",
        "question": "Compare the mucosal adaptations of the small intestine versus the large intestine in relation to their primary functions.",
        "answer": "The small intestine features circular folds, finger-like villi (with blood capillaries and lacteals), and microvilli to maximize surface area for nutrient digestion and absorption. The large intestine has NO villi, instead featuring abundant straight tubular Crypts of Lieberkuhn, numerous mucus-secreting goblet cells for lubrication/protection, immune cells in the lamina propria, haustra, and taenia coli for water/electrolyte absorption and feces formation."
      },
      {
        "id": "1.3",
        "question": "List the six major sphincters/valves of the gastrointestinal tract and state the physiological role of each.",
        "answer": "1. Upper Esophageal Sphincter (controls bolus entry from pharynx to esophagus); 2. Lower Esophageal/Cardiac Sphincter (prevents gastric acid reflux into esophagus); 3. Pyloric Sphincter (regulates chyme emptying from stomach to duodenum); 4. Sphincter of Oddi (controls bile and pancreatic juice entry into duodenum); 5. Ileocecal Valve (regulates transit from ileum to cecum and prevents backflow); 6. Internal and External Anal Sphincters (control fecal continence and defecation)."
      },
      {
        "id": "1.4",
        "question": "Describe the chewing reflex and list four physiological functions of mastication.",
        "answer": "Opening the jaw stretches jaw muscles, triggering reflex contraction of masseter, medial pterygoid, and temporalis (closing jaw); food touching buccal receptors then triggers reflex contraction of digastric and lateral pterygoid (re-opening jaw). Four functions: reduces food into swallowable pieces, breaks indigestible plant cellulose walls to boost enzyme surface area, mixes food with salivary amylase/lingual lipase into a lubricated bolus, and stimulates taste and olfactory receptors."
      },
      {
        "id": "1.5",
        "question": "Explain the three phases of deglutition (swallowing) and distinguish receptive relaxation from retropulsion in gastric motility.",
        "answer": "Deglutition: (1) Oral phase (voluntary—tongue forces bolus back against hard palate), (2) Pharyngeal phase (involuntary, 1–2s, medulla/lower pons, inhibits breathing while pushing bolus past open UES), (3) Esophageal phase (involuntary primary/secondary peristalsis to stomach). Receptive relaxation is fundal enlargement accommodating incoming food for storage, whereas retropulsion is the back-and-forth churning of chyme propelled against the closed pyloric sphincter."
      }
    ]
  },

  // Module 2
  {
    "id": 2,
    "title": "Digestive System II: Digestive Juices, Enzymatic Digestion and Nutrient Absorption",
    "introduction": "Chemical digestion transforms complex dietary macromolecules into absorbable monomers through the coordinated action of saliva, gastric juice, pancreatic juice, bile, and intestinal brush-border enzymes. Tracing cellular transport proteins (SGLT1, GLUT5, GLUT2, PEPT1, and chylomicron exocytosis) and GI hormones reveals how a balanced meal fuels systemic metabolism via the portal vein and lymphatic system.",
    "learningOutcomes": [
      "2.1 Compare the composition, autonomic/hormonal control, secretion phases, and physiological functions of saliva, gastric juice, pancreatic juice, and bile.",
      "2.2 Trace the complete site-by-site enzymatic digestion and enterocyte absorption of dietary carbohydrates, including the roles of SGLT1, GLUT5, GLUT2, and the Na+/K+-ATPase.",
      "2.3 Trace the complete digestion and absorption of dietary proteins, including zymogen activation by enteropeptidase and uptake via Na+-dependent carriers and PEPT1.",
      "2.4 Explain dietary lipid emulsification by bile salts, pancreatic lipase/colipase digestion, micelle delivery, enterocyte re-esterification, chylomicron export into lacteals, and ASBT bile-salt reclamation.",
      "2.5 Integrate digestion, absorption, hormonal regulation (gastrin, secretin, CCK), and transport routes (portal blood vs. lymphatics) across a complete balanced meal."
    ],
    "content": [
      {
        "heading": "Digestive Juices: Saliva, Gastric Juice, Pancreatic Juice, and Bile",
        "body": "Four primary digestive juices drive chemical breakdown: (1) Saliva—hypotonic fluid higher in K+ and HCO3- and lower in Na+ and Cl-, containing alpha-amylase (ptyalin, initiating starch digestion; inactivated by low gastric pH), lingual lipase (initiating fat digestion in mouth, stomach, and upper small intestine), lubricating mucin, secretory IgA (first-line antimicrobial defence), lysozyme, and lactoferrin. Salivary secretion is controlled entirely by Autonomic Nervous System reflexes (triggered by thought, smell, or taste of food): Parasympathetic stimulation induces glandular vasodilation and profuse watery, electrolyte-rich saliva (blocked by atropine), whereas Sympathetic stimulation causes vasoconstriction and a small, viscous, mucus/organic-rich secretion. (2) Gastric Juice (~2 L/day)—secreted across Cephalic (thought/sight/smell/taste), Gastric (corpus/antral distension and elevated pH), and Intestinal (duodenal chyme) phases, containing mucus/bicarbonate (first-line anti-ulcer defence), HCl (from parietal cells; kills microbes, denatures proteins, activates pepsinogen), intrinsic factor (parietal cells), pepsinogen (chief cells; converted to active pepsin), and gastrin (G-17/G-34 from pyloric G cells stimulating acid). (3) Pancreatic Juice (1,200–1,500 mL/day across cephalic, gastric, and intestinal phases—strongly driven by CCK and secretin)—ductal cells secrete alkaline bicarbonate (neutralizing acidic gastric chyme in the duodenum), while acinar cells secrete enzymes for final digestion of proteins (trypsinogen, chymotrypsinogen, proelastase, procarboxypeptidases), fats (pancreatic lipase + colipase, phospholipase A2, cholesterol esterase), carbohydrates (pancreatic amylase), and nucleic acids (nucleases), protected from self-digestion by Trypsin Inhibitor. (4) Bile (250–1,100 mL/day synthesized continuously by hepatocytes and stored/concentrated in the gallbladder)—composed of bile acids (trihydroxycholic and dihydroxychenodeoxycholic acids), bile pigments (bilirubin, biliverdin, urobilin), phospholipids, cholesterol, and electrolytes, essential for fat emulsification and absorption."
      },
      {
        "heading": "Digestion and Absorption of Carbohydrates and Proteins",
        "body": "Carbohydrate Digestion & Absorption: Salivary alpha-amylase begins starch hydrolysis in the mouth (halted by gastric acid in the stomach). In the small intestine, pancreatic amylase converts starch to oligosaccharides/disaccharides, and intestinal brush-border (succus entericus) enzymes complete hydrolysis: maltase splits maltose into glucose + glucose, lactase splits lactose into glucose + galactose, and sucrase splits sucrose into glucose + fructose. At the villus enterocyte apical membrane, Glucose and Galactose enter via SGLT1 (Na+-coupled secondary active cotransport powered by the basolateral Na+/K+-ATPase maintaining low intracellular Na+), while Fructose enters via GLUT5 (ATP-independent facilitated diffusion). All three monosaccharides exit across the basolateral membrane via GLUT2 (facilitated diffusion) into interstitial fluid and portal capillaries bound for the liver (note: insulin acts primarily on post-absorptive peripheral tissues, NOT as the direct intestinal glucose transporter). Protein Digestion & Absorption: In the stomach, HCl denatures proteins and activates pepsinogen into pepsin to begin proteolysis into polypeptides. In the duodenum, brush-border Enteropeptidase converts trypsinogen into active Trypsin, which cascades to activate chymotrypsin, elastase, and carboxypeptidases; jejunal brush-border aminopeptidases and dipeptidases then generate free amino acids and di-/tripeptides. Free amino acids enter enterocytes via multiple apical (largely Na+-dependent) carriers, while di- and tripeptides enter via apical PEPT1 (H+-coupled cotransport). Inside enterocytes, cytosolic peptidases hydrolyse most small peptides into free amino acids, which exit via basolateral amino-acid carriers into hepatic portal blood."
      },
      {
        "heading": "Digestion and Absorption of Lipids, Nucleic Acids, Roughage, and Post-Absorptive Routes",
        "body": "Lipid Digestion & Absorption: Lingual and gastric lipases begin minor fat breakdown, but major lipid processing occurs in the duodenum where CCK (from I cells) stimulates gallbladder contraction, pancreatic enzyme release, and slowed gastric emptying, while Secretin (from S cells) stimulates bicarbonate-rich pancreatic/ductal secretion. Amphipathic bile salts emulsify large fat globules into tiny droplets, allowing Pancreatic Lipase + Colipase to hydrolyse triglycerides into 2-monoacylglycerol (2-MAG) and free fatty acids (phospholipase A2 and cholesterol esterase process phospholipids and cholesteryl esters). Bile salts then package these insoluble products into water-soluble Micelles for delivery to the brush border. Fatty acids and 2-MAG cross the apical membrane (with CD36/FATP aiding fatty acid uptake and NPC1L1 aiding cholesterol uptake). Inside the enterocyte Smooth ER, fatty acids and 2-MAG undergo re-esterification back into triglycerides; in the ER/Golgi, Apolipoprotein B-48 (ApoB-48) and Microsomal Triglyceride Transfer Protein (MTP) package them into Chylomicrons, which undergo exocytosis into central villus Lacteals -> lymphatic vessels -> thoracic duct -> systemic bloodstream. Short- and medium-chain fatty acids bypass lymphatics and enter portal blood directly (often bound to albumin), while bile salts are reclaimed in the terminal ileum via the Apical Sodium-Dependent Bile Acid Transporter (ASBT). Nucleic acids are broken down into nucleosides/nucleotides and then sugars + bases. Dietary Roughages (fibre) resist human enzymatic digestion, are acted upon by colonic microflora to support balanced luminal pH, and add stool bulk for easy defecation; water is not digested but absorbed to maintain fluidity. Overall, monosaccharides and amino acids travel via the Portal Vein to the liver before general circulation, whereas long-chain lipids travel via Lymphatics into systemic circulation for cellular ATP production, growth, repair, and storage."
      }
    ],
    "inTextQuestions": [
      {
        "question": "How does parasympathetic versus sympathetic autonomic stimulation affect salivary gland secretion?",
        "answer": "Parasympathetic stimulation causes glandular vasodilation and a large volume of watery, electrolyte-rich (low-protein) saliva; sympathetic stimulation causes vasoconstriction and a small volume of viscous, mucus/organic-rich saliva."
      },
      {
        "question": "Which intestinal enzyme activates pancreatic trypsinogen, and what prevents the pancreas from digesting itself?",
        "answer": "Brush-border enteropeptidase activates trypsinogen to trypsin in the duodenum; trypsin inhibitor inside pancreatic secretions prevents premature autodigestion of pancreatic cells."
      },
      {
        "question": "Which apical and basolateral transporters mediate intestinal absorption of glucose, galactose, and fructose?",
        "answer": "Apical SGLT1 (Na+-coupled, powered by basolateral Na+/K+-ATPase) absorbs glucose and galactose; apical GLUT5 absorbs fructose via facilitated diffusion; basolateral GLUT2 exports all three monosaccharides into portal blood."
      },
      {
        "question": "How do absorbed monosaccharides and amino acids reach general circulation compared with long-chain dietary lipids?",
        "answer": "Monosaccharides and amino acids enter intestinal blood capillaries and travel via the hepatic portal vein to the liver before general circulation, whereas long-chain lipids are packaged into chylomicrons and enter lymphatic lacteals -> thoracic duct -> systemic bloodstream."
      }
    ],
    "saqs": [
      {
        "id": "2.1",
        "question": "Explain how sodium-glucose co-transport works at the intestinal enterocyte, specifying the roles of SGLT1, GLUT2, and the Na+/K+-ATPase.",
        "answer": "The basolateral Na+/K+-ATPase uses ATP to actively pump Na+ out of the enterocyte, maintaining an inward Na+ gradient. Apical SGLT1 harnesses this Na+ gradient to cotransport glucose (and galactose) into the enterocyte against its concentration gradient. Intracellular glucose then exits passively across the basolateral membrane via GLUT2 facilitated diffusion into interstitial fluid and hepatic portal capillaries."
      },
      {
        "id": "2.2",
        "question": "Describe the role of bile in fat digestion and absorption, including emulsification, micelles, and ileal reclamation.",
        "answer": "Synthesized by hepatocytes and concentrated in the gallbladder, bile salts emulsify large hydrophobic fat globules in the duodenum into tiny droplets, massively increasing surface area for pancreatic lipase + colipase. Bile salts then incorporate fatty acids and 2-monoacylglycerol into micelles to shuttle them across the unstirred water layer to the brush border. Afterward, bile salts are reabsorbed in the terminal ileum via the Apical Sodium-Dependent Bile Acid Transporter (ASBT)."
      },
      {
        "id": "2.3",
        "question": "Trace the complete digestion and absorption of a balanced meal (e.g., rice or bread, chicken/beef, vegetable oil, and leafy vegetables) from mouth to large intestine.",
        "answer": "Mouth: mastication + salivary alpha-amylase starts starch breakdown; lingual lipase starts fat breakdown. Stomach: HCl kills germs, denatures proteins, activates pepsinogen -> pepsin digesting meat proteins into polypeptides. Duodenum/Jejunum: secretin releases bicarbonate; CCK releases bile (emulsifying oil) and pancreatic amylase, proteases (trypsin/chymotrypsin/carboxypeptidases), and lipase+colipase; brush-border enzymes finish monomers -> glucose/galactose (SGLT1), fructose (GLUT5), amino acids (Na+-carriers), di-/tripeptides (PEPT1) enter portal blood; fatty acids + 2-MAG re-esterify into chylomicrons (ApoB-48/MTP) entering lacteals -> lymph. Large intestine: water/electrolytes absorbed; vegetable roughage adds bulk and feeds microflora."
      },
      {
        "id": "2.4",
        "question": "State the cellular sources and main gastrointestinal actions of Gastrin, Secretin, and Cholecystokinin (CCK).",
        "answer": "Gastrin (pyloric G cells) stimulates gastric HCl secretion and gastric motility. Secretin (duodenal S cells) stimulates bicarbonate-rich pancreatic and ductal secretions to neutralize acidic chyme. CCK (duodenal I cells) stimulates gallbladder contraction, pancreatic acinar enzyme secretion, and slows gastric emptying."
      },
      {
        "id": "2.5",
        "question": "Summarize the composition and three phases of gastric juice secretion, and name the three brush-border disaccharidases with their end products.",
        "answer": "Gastric juice (~2 L/day) contains mucus, bicarbonate, HCl, pepsinogen, intrinsic factor, and gastrin, secreted across Cephalic (thought/sight/smell/taste), Gastric (stomach distension/pH rise), and Intestinal (duodenal chyme) phases. Brush-border disaccharidases: maltase (maltose -> glucose + glucose), lactase (lactose -> glucose + galactose), and sucrase (sucrose -> glucose + fructose)."
      }
    ]
  },

  // Module 3
  {
    "id": 3,
    "title": "Renal System Physiology: Nephron Architecture, Urine Formation, Clearance and Micturition",
    "introduction": "Filtering roughly 180–200 litres of plasma daily while excreting only ~1.5 litres of urine, the kidneys preserve body fluid volume, plasma osmolarity, electrolyte concentrations, blood pressure, acid-base balance, and red blood cell production. Understanding nephron types, Starling filtration forces, the juxtaglomerular apparatus, countercurrent urine concentration, renal clearance formulas, and neural control of micturition connects normal renal physiology directly to bedside clinical care.",
    "learningOutcomes": [
      "3.1 Summarize the six homeostatic functions of the renal system and differentiate cortical versus juxtamedullary nephrons and renal arterial branching.",
      "3.2 Explain the three-layer glomerular filtration barrier, Starling forces ($NFP$), and the four processes of urine formation ($Excretion = Filtration - Reabsorption + Secretion$).",
      "3.3 Describe the components and baroreceptor/chemoreceptor roles of the Juxtaglomerular Apparatus (JGA) in renin release and blood pressure control, alongside countercurrent urine concentration.",
      "3.4 Apply Fick's principle and renal clearance equations to evaluate GFR (inulin and creatinine clearance) and Renal Plasma Flow (PAH clearance).",
      "3.5 Explain urinary tract/bladder structure, sympathetic/parasympathetic/somatic innervation, receptive (stress-relaxation) storage, and the voiding micturition reflex."
    ],
    "content": [
      {
        "heading": "Renal Overview, Nephron Types, Regional Functions, and Renal Blood Flow",
        "body": "The retroperitoneal pair of bean-shaped kidneys (capped by adrenal glands) execute six vital functions: filtering ~180–200 L/day of fluid, excreting metabolic wastes (urea, uric acid, creatinine) and toxins, secreting Renin for blood pressure control, regulating plasma osmolarity and electrolytes, maintaining long-term acid-base balance, and producing Erythropoietin (EPO) for red blood cell synthesis. Internally, the kidney divides into outer dark Renal Cortex, inner pale Renal Medulla (conical renal pyramids ending in renal papillae), minor/major calyces, renal pelvis, and ureter. Each kidney houses 1–1.5 million functional units called Nephrons of two types: (1) Cortical Nephrons (85–88% of total; glomeruli in outer/middle cortex, short Loops of Henle) and (2) Juxtamedullary Nephrons (12–15% of total; glomeruli near corticomedullary junction, long Loops of Henle essential for countercurrent urine concentration). Renal blood supply branches sequentially: Abdominal Aorta -> Renal Artery -> 5 Segmental Arteries -> Interlobar Arteries (Columns of Bertin) -> Arcuate Arteries -> Interlobular (cortical radial) Arteries -> Afferent Arterioles -> Glomerular Capillaries (20–40 loops inside Bowman's capsule; ~20% plasma filters out while 80% plus proteins/cells exit) -> Efferent Arterioles -> Peritubular Capillaries / Vasa Recta. Basal Renal Blood Flow (RBF) averages ~1,200 mL/min (~20% of cardiac output), regulated by autoregulation, hormones, and arteriolar resistance; RBF supplies O2 (closely tied to active Na+ reabsorption and H+-ATPase secretion), sustains high GFR, modulates proximal reabsorption, aids urine concentration, and delivers substrates. Nephron segments perform specialized roles: Proximal Tubules reabsorb ~2/3 of filtered water plus glucose/amino acids/Na+/HCO3- and secrete wastes; Loop of Henle (thin descending, thin ascending, and mitochondria-rich cuboidal thick ascending limbs) reabsorbs ~25% of water and Na+; Distal Tubule (macula densa + DCT) fine-tunes ions; and Collecting Ducts house Principal cells (water/Na+/K+ handling) and mitochondria-rich Intercalated cells (acid-base)."
    },
    {
      "heading": "Glomerular Filtration, Urine Formation, JGA Hormonal Control, and Countercurrent Concentration",
      "body": "Urine formation integrates four processes governed by $Excretion = Filtration - Reabsorption + Secretion$: (1) Glomerular Filtration (~180 L/day; normal adult GFR 90–140 mL/min in males, 80–120 mL/min in females)—produces a cell-free, protein-free plasma ultrafiltrate across the size- and charge-selective (negatively charged) three-layer Glomerular Filtration Barrier: Fenestrated Capillary Endothelium (blocks blood cells), Glomerular Basement Membrane (GBM: lamina rara interna, lamina densa, lamina rara externa with Type IV collagen/proteoglycans), and Podocyte Foot Processes bridged by Slit Diaphragms (nephrin, podocin, P-cadherin, NEPH1—blocking albumin/IgG while passing water, ions, and glucose). Filtration obeys Starling forces: $NFP = (P_{gc} - P_{bs}) - (\\pi_{gc} - \\pi_{bs})$ and $GFR = K_f \\times NFP$ (where $K_f$ is the filtration coefficient determined by barrier permeability and surface area). (2) Tubular Reabsorption (~178.5 L/day from lumen to peritubular blood); (3) Tubular Secretion (from blood to lumen: H+, K+, organic acids/bases, drugs); and (4) Excretion (~1.5 L/day normal straw-yellow urine, protein-free, specific gravity 1.005–1.030). Internal renal regulation includes autoregulation, tubuloglomerular feedback, glomerulotubular balance, and the Juxtaglomerular Apparatus (JGA), comprising three elements: (a) Macula Densa (non-innervated chemoreceptor cells of the thick ascending limb stimulated by low NaCl load), (b) Extraglomerular Mesangial / Lacis Cells, and (c) Granular (Juxtaglomerular) Cells (sympathetically innervated modified smooth muscle baroreceptors in afferent/efferent arterioles storing/releasing Renin, half-life 40–120 min). Hypovolaemia, haemorrhage, hypotension, salt/K+ depletion, and sympathetic catecholamines trigger Renin release, which cleaves liver-derived Angiotensinogen into Angiotensin I (subsequently converted to Angiotensin II). Urine Concentration relies on the Countercurrent Multiplier (Loop of Henle: water leaves descending limb, Na+ actively pumped out of water-impermeable thick ascending limb creating a 300 -> 1,200 mOsm medullary osmotic gradient), preserved by the Countercurrent Exchanger (Vasa Recta), enabling ADH (vasopressin) to drive regulated water reabsorption in the collecting duct."
    },
    {
      "heading": "Renal Clearance, Inulin/Creatinine GFR Estimation, and PAH Renal Plasma Flow",
      "body": "Renal Clearance ($C_x$) measures the virtual plasma volume completely freed of substance $x$ per minute via filtration, secretion, or both, calculated non-invasively from urine and peripheral blood by $C_x = (U_x \\times V) / P_x$ (where $U_x$ = urine concentration in mg/mL, $V$ = urine flow rate in mL/min, $P_x$ = plasma concentration in mg/mL). Inulin Clearance is the gold standard for GFR ($C_{in} = GFR$) because inulin is freely filtered, unbound to plasma proteins, neither metabolized, reabsorbed, nor secreted by tubules, and does not alter GFR (alternatives: mannitol, sorbitol, iothalamate, 51Cr-EDTA). Clinically, 24-hour endogenous Creatinine Clearance estimates GFR without exogenous infusion because skeletal muscle produces creatinine at a steady rate proportional to muscle mass (normal plasma 0.8–1.0 mg/dL); mild tubular secretion slightly overestimates GFR, and creatinine clearance declines with age due to declining renal mass/RPF and reduced muscle mass even when serum creatinine looks stable. Substances with clearance below inulin are filtered and reabsorbed (e.g., glucose), whereas substances with clearance above inulin are filtered and secreted (e.g., Para-aminohippurate, PAH). By Fick's Principle ($Q = R / (A_x - V_x)$), low-concentration PAH (transport maximum $T_{mPAH} \\approx 80$ mg/min/1.73 $m^2$) is virtually 100% cleared in a single renal pass ($V_{PAH} \\approx 0$), so PAH clearance (>600 mL/min) measures Effective Renal Plasma Flow (RPF)."
    },
    {
      "heading": "Urinary Tract, Bladder Innervation, and Physiology of Micturition",
      "body": "The urinary tract (calyces, renal pelvis, ~60 cm muscular ureters, urinary bladder, urethra) is lined by impermeable transitional epithelium; calyceal stretch fires inherent pacemaker waves driving ureteral peristalsis, while oblique ureteral entry into the bladder wall (ureterovesical junction) prevents reflux without an anatomical sphincter. The bladder comprises the Body/Fundus (rugae-lined smooth Detrusor muscle) and funnel-shaped 2–3 cm Neck (containing the involuntary Internal Urethral Sphincter), plus the smooth triangular Trigone and voluntary skeletal External Urethral Sphincter. Three neural pathways govern Micturition (expulsion of stored urine): (1) Sympathetic Hypogastric Nerve relaxes the detrusor and contracts alpha-adrenergic bladder-neck/internal sphincter receptors for storage; (2) Sacral Parasympathetic Pelvic Nerve contracts the detrusor for voiding (pelvic afferents also relay fullness, pain, and temperature); and (3) Sacral Somatic Pudendal Nerve excites the voluntary external urethral sphincter. Micturition proceeds in two phases: Storage/Continence—as urine fills the bladder, rugae flatten and wall smooth muscle undergoes Receptive Relaxation (Stress-Relaxation Phenomenon), keeping intravesical pressure flat and below urethral pressure across wide volume increases (normal bladder capacity ~300–550 mL); and Voiding—voluntary CNS control develops from age 2; at ~400 mL filling, stretch afferents trigger the automatic spinal micturition reflex (modulated by brainstem and cerebral cortex), activating parasympathetic detrusor contraction in a self-regenerating positive-feedback loop paired with voluntary external sphincter relaxation. Full-bladder flow averages 20–25 mL/s in men (aided by bulbospongiosus contractions) and 25–30 mL/s in women (aided by gravity), leaving a normal post-void residual of ~50 mL."
    }
  ],
  "inTextQuestions": [
    {
      "question": "Compare Cortical Nephrons and Juxtamedullary Nephrons in terms of proportion, loop length, and functional specialization.",
      "answer": "Cortical nephrons make up 85–88% of nephrons, lie in the outer/middle cortex, and have short Loops of Henle; Juxtamedullary nephrons make up 12–15%, lie near the corticomedullary junction, and have long Loops of Henle vital for the countercurrent urine-concentrating mechanism."
    },
    {
      "question": "Write the equations for Net Filtration Pressure (NFP), Glomerular Filtration Rate (GFR), and Renal Clearance ($C_x$).",
      "answer": "$NFP = (P_{gc} - P_{bs}) - (\\pi_{gc} - \\pi_{bs})$; $GFR = K_f \\times NFP$; $C_x = (U_x \\times V) / P_x$."
    },
    {
      "question": "What five properties make Inulin the gold-standard marker for measuring GFR, and what does PAH clearance measure?",
      "answer": "Inulin is freely filtered, unbound to plasma proteins, not metabolized by the kidney, neither reabsorbed nor secreted by nephrons, and does not alter GFR. Low-concentration PAH clearance measures Effective Renal Plasma Flow (RPF)."
    },
    {
      "question": "Which autonomic nerves control the storage phase versus the voiding phase of micturition, and what is the stress-relaxation phenomenon?",
      "answer": "Storage is controlled by sympathetic nerves (relaxing detrusor, contracting internal sphincter) plus somatic pudendal contraction of the external sphincter; voiding is driven by sacral parasympathetic detrusor contraction plus voluntary relaxation of the external sphincter. Stress-relaxation (receptive relaxation) allows bladder walls to distend while keeping intravesical pressure relatively constant and below urethral pressure."
    }
  ],
  "saqs": [
    {
      "id": "3.1",
      "question": "List the six major physiological functions of the renal system and trace arterial blood flow from the renal artery to the glomerular capillary.",
      "answer": "Functions: filter ~180–200 L/day plasma, excrete metabolic wastes/toxins, secrete renin for BP regulation, regulate plasma osmolarity/electrolytes, maintain long-term acid-base balance, and produce erythropoietin for RBCs. Arterial path: Renal artery -> 5 segmental arteries -> interlobar arteries -> arcuate arteries -> interlobular (cortical radial) arteries -> afferent arterioles -> glomerular capillaries."
    },
    {
      "id": "3.2",
      "question": "Describe the three layers of the Glomerular Filtration Barrier and state the four processes of urine formation with their approximate daily volumes.",
      "answer": "Barrier: (1) Fenestrated capillary endothelium (blocks blood cells), (2) Negatively charged Glomerular Basement Membrane (Type IV collagen/proteoglycans), and (3) Podocyte foot processes with slit diaphragms (nephrin/podocin—restricts plasma proteins like albumin/IgG). Four processes: Glomerular filtration (~180 L/day), Tubular reabsorption (~178.5 L/day), Tubular secretion (H+, K+, drugs), and Excretion (~1.5 L/day)."
    },
    {
      "id": "3.3",
      "question": "Describe the three structural components of the Juxtaglomerular Apparatus (JGA) and explain four stimuli that trigger Renin release.",
      "answer": "Components: (1) Macula Densa (non-innervated thick-ascending-limb chemoreceptors sensing decreased NaCl load), (2) Extraglomerular mesangial/lacis cells, and (3) Renin-producing Granular cells (sympathetically innervated baroreceptors in afferent/efferent arterioles). Four stimuli: hypovolaemia/haemorrhage/salt depletion, acute hypotension, potassium depletion, and sympathetic catecholamines (epinephrine/norepinephrine)."
    },
    {
      "id": "3.4",
      "question": "Explain how the Countercurrent Multiplier and Countercurrent Exchanger enable the kidney to produce concentrated urine.",
      "answer": "In juxtamedullary Loops of Henle (Countercurrent Multiplier), water leaves the descending limb while Na+ is actively pumped out of the water-impermeable thick ascending limb, establishing a steep 300 -> 1,200 mOsm medullary interstitial gradient. The Vasa Recta (Countercurrent Exchanger) supplies nutrients without washing away this gradient, allowing ADH-regulated water reabsorption from the collecting duct."
    },
    {
      "id": "3.5",
      "question": "Describe the normal bladder capacity, urge threshold, urinary flow rates in men and women, and how the micturition reflex empties the bladder.",
      "answer": "Bladder capacity is 300–550 mL, with afferent stretch nerves signalling the urge to void around 400 mL. Full-bladder flow rates are 20–25 mL/s in men (aided by bulbospongiosus contractions) and 25–30 mL/s in women (aided by gravity), leaving ~50 mL post-void residual. Bladder stretch triggers a spinal positive-feedback reflex activating parasympathetic detrusor contractions while inhibiting sympathetic tone and allowing voluntary pudendal relaxation of the external sphincter."
    }
  ]
},

  // Module 4
  {
    "id": 4,
    "title": "Reproductive Physiology I: Anatomy, Puberty, Gametogenesis, Menstrual Cycle and Coitus",
    "introduction": "Human reproductive physiology is orchestrated by the hypothalamic-pituitary-gonadal (HPG) axis, driving pubertal maturation, continuous spermatogenesis in males, cyclic oogenesis and endometrial preparation in females, and the neurovascular events of human sexual response. Mastering these endocrine feedback loops clarifies normal reproductive milestones from menarche through menopause and andropause.",
    "learningOutcomes": [
      "4.1 Identify essential (gonads) and accessory reproductive structures in males and females and explain the hypothalamic-pituitary-gonadal (HPG) feedback axis.",
      "4.2 Describe the hormonal triggers and sequential physical milestones of puberty in females (growth spurt, thelarche, adrenarche, menarche) and males, plus menopause and andropause.",
      "4.3 Compare spermatogenesis (including sperm anatomy) with oogenesis across fetal, postnatal, pre-pubertal, and pubertal stages.",
      "4.4 Integrate the ovarian cycle (follicular, ovulation/LH surge, luteal) and uterine menstrual cycle (menses, proliferative, secretory) with hormonal curves and basal body temperature.",
      "4.5 Explain the sources and physiological actions of major reproductive hormones and the four phases of male and female sexual response (coitus)."
    ],
    "content": [
      {
        "heading": "Reproductive Organs and the Hypothalamic-Pituitary-Gonadal (HPG) Axis",
        "body": "Reproductive systems divide into essential organs (Gonads: Testes in males, Ovaries in females) and accessory ducts, glands, and external genitalia. The Male system includes testes (producing spermatozoa and testosterone), ductal system (epididymis, vas deferens, ejaculatory duct, urethra), supportive sex glands (seminal vesicles, prostate, bulbourethral/Cowper's glands), and external genitalia (scrotum and penis containing paired corpora cavernosa, corpus spongiosum, glans, and prepuce). The Female system comprises ovaries (producing ova, estrogen, and progesterone), fallopian tubes with fimbriae, uterus (fundus, body, cervix with cervical canal; endometrium, myometrium, perimetrium), vagina, external genitalia (mons pubis, labia majora/minora, clitoris, vestibule, hymen), and mammary glands (lobes, secretory alveoli surrounded by contractile myoepithelial cells, lactiferous ducts/sinuses, nipple, areola). Both sexes are governed by the HPG Axis: hypothalamic Gonadotropin-Releasing Hormone (GnRH) stimulates the anterior pituitary to secrete Follicle-Stimulating Hormone (FSH) and Luteinizing Hormone (LH). In males, LH stimulates testicular Leydig cells to secrete Testosterone (providing negative feedback to hypothalamus/pituitary), while FSH and testosterone act on Sertoli cells to drive spermatogenesis and secrete Inhibin (selective negative feedback on FSH). In females, FSH and LH drive ovarian folliculogenesis, ovulation, and estrogen/progesterone secretion via long-loop negative (and mid-cycle positive) feedback."
      },
      {
        "heading": "Puberty, Reproductive Hormones, Menopause, and Andropause",
        "body": "Puberty—the transition to reproductive maturity starting around age 8 as hypothalamic-pituitary sensitivity to negative sex-steroid feedback decreases and sleep-entrained pulsatile GnRH-LH release emerges—also features Adrenarche (growth of adrenal zona reticularis elevating adrenal androgens DHEA, DHEA-S, and androstenedione). Female Puberty (ages 8–14) unfolds in four stages: (1) Accelerated growth spurt (up to ~8 cm/yr, widening pelvis, increased adiposity and ligamentous laxity), (2) Thelarche (breast development, ages 8–9), (3) Adrenarche (pubic/axillary hair, body odour, acne, ages 9–11), and (4) Menarche (first menses, ages 10–14; early cycles often irregular/anovulatory; risk of anaemia). Male Puberty starts with testicular enlargement and Leydig-cell testosterone surge, driving penile growth/erections, sperm production/first ejaculation, growth spurt (up to ~10 cm/yr), increased lean muscle mass and haematocrit, decreased adiposity, broadened shoulders, facial/body/pubic hair, and voice deepening (laryngeal enlargement/vocal cord thickening). Key Reproductive Hormones include Testosterone (male secondary traits, accessory organs, protein anabolism, spermatogenesis with FSH), Estrogens (estradiol, weaker estrone, weakest estriol—female pubertal traits, uterine/breast duct growth, water balance, lowered cholesterol, FSH inhibition, oxytocin synergy in labour), Progesterone (endometrial/decidual maintenance, breast alveoli), Oxytocin (synthesized in hypothalamic paraventricular nuclei, stored in posterior pituitary; released via cholinergic/areolar/genital stimulation, inhibited by sympathetic catecholamines; drives milk let-down, coital sperm transport, and labour contractions), and Prolactin (anterior pituitary lactogenic hormone stimulated by suckling, inhibited by PIF/dopamine and bromocriptine; stimulates milk production and suppresses LH/ovulation causing lactational amenorrhoea). Reproductive ageing leads in females (~age 50–51) to Menopause (primary ovarian follicle depletion -> falling estrogen, elevated gonadotropins especially FSH, menstrual cessation, uterine/tubal shrinkage, vaginal thinning/dryness), and in males (from ~age 50) to Andropause (gradual testosterone decline—not total cessation—with smaller testicular mass, decreased ejaculate, erectile changes, and possible benign prostatic hypertrophy)."
      },
      {
        "heading": "Gametogenesis (Spermatogenesis & Oogenesis) and the Menstrual Cycle",
        "body": "Spermatogenesis continuously converts diploid spermatogonia -> diploid primary spermatocytes (46) -> haploid secondary spermatocytes (23) -> four haploid spermatids (23) -> mature spermatozoa throughout adult male life. A mature Sperm comprises a Head (haploid chromosome nucleus + enzyme-packed acrosome), Middle Piece (dense mitochondria generating ATP for swimming), and Tail (plasma membrane + ATP-driven axial filament for motility). Unlike continuous male spermatogenesis, female Oogenesis establishes a finite declining oocyte pool: Fetal oogenesis (starting ~15 wks gestation, peaking at 6–7 million germ cells at 5 months, declining to ~2 million by term); Postnatal oogenesis (all oogonia converted to primary oocytes arrested in meiotic prophase I diplotene by 6th gestational month, falling to ~400,000 by puberty); Pre-pubertal oogenesis (ages 5–11: zona pellucida + 6–9 granulosa layers); and Pubertal oogenesis (cyclic maturation yielding 1 large secondary oocyte + 1st polar body at Meiosis I, and 1 ovum + 2nd polar body only upon fertilization). The typical 25–30 day (28-day reference) Ovarian and Uterine Menstrual Cycle begins on Day 1 of menstrual shedding (stratum functionalis sloughs while stratum basalis remains) and spans three phases: (1) Pre-Ovulatory / Follicular / Estrogenic Phase (~days 1–14; FSH recruits primordial -> primary -> secondary -> mature Graafian follicle; rising estradiol drives endometrial Proliferative phase regenerating stratum functionalis); (2) Ovulation (~day 14–15; triggered 24–36 hours after a sharp anterior pituitary LH surge following peak estrogen, extruding the haploid secondary oocyte while estrogen briefly dips and ruptured follicle undergoes vascularization/luteinization); and (3) Post-Ovulatory / Luteal / Progestational Phase (fixed ~13–14 days; LH maintains the yellowish Corpus Luteum secreting abundant Progesterone plus estrogen, driving the Secretory endometrial phase and raising basal body temperature from ~36.4°C to ~36.7°C; absent fertilization, the corpus luteum regresses into the Corpus Albicans, progesterone/estrogen plummet, and menstruation restarts)."
      },
      {
        "heading": "Physiology of Sexual Intercourse (Coitus)",
        "body": "Sexual arousal varies by individual and sex (often visual, olfactory, auditory, or tactile in males; strongly tactile, verbal, and olfactory in females). Male Sexual Response centres on: (1) Erection—triggered by sacral parasympathetic efferents causing penile arteriolar vasodilation and high-pressure engorgement of erectile venous sinuses/spongiosa, paired with clear lubricating pre-ejaculatory secretion; (2) Orgasm—intense 3–4 second peak of arousal with involuntary rhythmic contractions and tension release; and (3) Ejaculation—3–4 seconds of 3–6 spasmodic expulsive contractions at the penile base propelling semen high into the vagina, followed by brief glans tenderness, relaxation/sleep, and detumescence (erection latency lengthens with age). Female Sexual Response unfolds across four phases: (1) Excitement/Arousal (generally slower onset, cycle-dependent; nipple erection and areolar duskiness, clitoral widening, labial vasocongestion, and vaginal wall lubrication); (2) Plateau (receptive readiness with direct clitoral stimulation); (3) Orgasm (intense pleasure differing from males by absence of ejaculation, expressed by rhythmic contractions of deep pelvic and vaginal muscles); and (4) Resolution (5–10 minutes of pelvic fluid drainage and relaxation without glans tenderness, enabling faster potential re-arousal than males)."
      }
    ],
    "inTextQuestions": [
      {
        "question": "In the male HPG axis, which testicular cells respond to LH, which respond to FSH, and what hormone provides selective negative feedback on FSH?",
        "answer": "Leydig cells respond to LH by secreting testosterone; Sertoli cells respond to FSH (and testosterone) to support spermatogenesis and secrete Inhibin, which provides selective negative feedback on FSH."
      },
      {
        "question": "Name the four sequential physical stages of female puberty in order and state the typical age range for menarche.",
        "answer": "Accelerated growth spurt -> Thelarche (breast development, 8–9 yrs) -> Adrenarche (pubic/axillary hair, 9–11 yrs) -> Menarche (onset of menstruation, 10–14 yrs)."
      },
      {
        "question": "What hormonal event triggers ovulation 24–36 hours before follicle rupture, and what endocrine gland forms afterward to drive the secretory phase?",
        "answer": "A rapid mid-cycle Luteinizing Hormone (LH) surge from the anterior pituitary triggers ovulation; afterward, luteinized granulosa and theca cells form the Corpus Luteum, secreting abundant progesterone (and estrogen)."
      },
      {
        "question": "Which autonomic nerves mediate penile erection, and what is the primary difference between female and male orgasm?",
        "answer": "Sacral parasympathetic nerves mediate arteriolar vasodilation and engorgement causing erection. Female orgasm involves rhythmic contractions of deep pelvic and vaginal muscles without ejaculation, and women can often be re-aroused after a shorter refractory interval."
      }
    ],
    "saqs": [
      {
        "id": "4.1",
        "question": "Explain the hormonal regulation of puberty through the HPG axis and distinguish adrenarche from thelarche and menarche.",
        "answer": "Around age 8, hypothalamic/pituitary sensitivity to negative feedback from low sex steroids decreases, allowing increased pulsatile GnRH release -> higher LH/FSH -> elevated testosterone (testes) or estrogen (ovaries) driving secondary sex traits and gametogenesis. Adrenarche is pubic/axillary hair appearance driven by adrenal zona reticularis androgens (9–11 yrs); Thelarche is breast development (8–9 yrs); Menarche is the first menstrual period (10–14 yrs)."
      },
      {
        "id": "4.2",
        "question": "Compare spermatogenesis and oogenesis with respect to timing, germ cell yield, and lifetime duration, and label the three parts of a mature sperm.",
        "answer": "Spermatogenesis runs continuously from puberty onward, producing 4 haploid sperm per primary spermatocyte. Oogenesis begins in fetal life (peaking at 6–7M germ cells at 5 mos, 2M at birth, 400k at puberty), arrests in prophase I until ovulation, produces 1 functional ovum + polar bodies per oocyte, and ends at menopause. Mature sperm parts: Head (haploid nucleus + acrosome), Middle piece (mitochondria/ATP), and Tail (axial filament/motility)."
      },
      {
        "id": "4.3",
        "question": "Correlate the three phases of the ovarian cycle with endometrial changes, hormone dominance, and basal body temperature across a 28-day cycle.",
        "answer": "Pre-ovulatory/Follicular (days 1–14): FSH + rising estradiol mature one Graafian follicle while endometrium sheds (menses) then rebuilds (proliferative phase); temp ~36.4°C. Ovulation (~day 14–15): peak estrogen triggers LH surge -> secondary oocyte extruded 24–36 hrs later. Post-ovulatory/Luteal (days 15–28): LH maintains corpus luteum secreting progesterone + estrogen -> secretory endometrium prepared for implantation; temp rises to ~36.7°C."
      },
      {
        "id": "4.4",
        "question": "State the source, stimulus for release, inhibitor, and three physiological actions of Oxytocin, and compare it with Prolactin.",
        "answer": "Oxytocin is made in hypothalamic paraventricular nuclei and stored in the posterior pituitary; stimulated by cholinergic, areolar tactile, and genital tract signals; inhibited by sympathetic catecholamines; acts in milk let-down, uterine contractions aiding coital sperm transport, and fetal expulsion during labour. Prolactin is made by the anterior pituitary, stimulated by nipple suckling, inhibited by PIF and bromocriptine, promotes milk production, and suppresses LH/ovulation (lactational amenorrhoea)."
      },
      {
        "id": "4.5",
        "question": "Compare Menopause and Andropause in terms of hormonal basis and anatomical tract changes.",
        "answer": "Menopause (~age 50–51) results from depleted ovarian follicles causing low estrogen, high FSH/LH, menstrual cessation, uterine/tubal shrinkage, and thin/dry vaginal mucosa risking tears/infection. Andropause (starting ~age 50) is a gradual decline (not cessation) in testosterone from testicular vascular ageing, causing reduced testicular mass, lower sperm/ejaculate volume, erectile dysfunction, and potential benign prostatic hypertrophy."
      }
    ]
  },

  // Module 5
  {
    "id": 5,
    "title": "Reproductive Physiology II: Fertilization, Pregnancy, Placenta, Parturition, Lactation and Fetal Circulation",
    "introduction": "Human pregnancy spans approximately 38 weeks from fertilization (40 weeks from LMP), uniting embryonic implantation, the multifaceted endocrine and exchange functions of the placenta, profound maternal multisystem adaptations, positive-feedback parturition, lactation, and the dramatic circulatory transition from parallel fetal shunts to independent neonatal breathing.",
    "learningOutcomes": [
      "5.1 Trace fertilization (acrosome and cortical reactions), early cleavage (zygote, morula, blastocyst), and the four steps of implantation (hatching, apposition, adhesion, invasion) plus decidualization.",
      "5.2 Summarize the major fetal events of the three trimesters and describe placental structure, five core placental functions, pregnancy hormones, and the luteal-placental shift.",
      "5.3 Explain maternal physiological adaptations during pregnancy across reproductive, mammary, cardiovascular, respiratory, GI, urinary, haematologic, and musculoskeletal systems.",
      "5.4 Detail the three stages of parturition, the hormonal positive-feedback relay (oxytocin, estrogen, prostaglandins), and the neuroendocrine reflexes of lactation.",
      "5.5 Differentiate fetal circulation (foramen ovale, ductus arteriosus, ductus venosus, HbF) from adult circulation and list the six major circulatory changes at birth."
    ],
    "content": [
      {
        "heading": "Fertilization, Implantation, Trimesters, and the Placenta",
        "body": "Fertilization occurs in the ampulla of the fallopian tube within ~24 hours of ovulation, performing three core functions: transmitting parental genes, restoring the diploid chromosome number, and initiating development. As sperm meets the ovum, the Acrosome Reaction releases hydrolytic enzymes to penetrate the corona radiata and zona pellucida; sperm-egg plasma membrane fusion permits nuclear entry, triggering the Cortical Reaction (cortical granules fuse with the egg membrane, hardening the vitelline/zona layer to block polyspermy). Rapid mitotic cleavage yields 2-, 4-, and 8-cell stages -> a solid Morula (Day 3) -> a fluid-filled Blastocyst entering the uterus (Day 5) with outer Trophoblast and inner Embryoblast. Implantation (~Days 6–9, usually upper posterior uterine wall) proceeds through Hatching, Apposition (initial contact with endometrial pinopods), Adhesion (firm trophoblast attachment), Invasion (syncytiotrophoblast penetration), and Decidualization (stromal cells form supportive decidual cells). Gestation spans three clinical Trimesters: First (Weeks 1–12: fertilization, implantation, organogenesis [weeks 3–8], embryo -> fetus), Second (Weeks 13–27: rapid skeletal/organ growth, maternal perception of movement [quickening]), and Third (Weeks 28–40: rapid weight gain, brain/lung maturation, fat deposition, head-down presentation). The Placenta (formed from fetal chorion frondosum and maternal decidua basalis) projects fetal chorionic villi into maternal intervillous blood spaces fed by uterine spiral arteries; fetal blood travels to the placenta via TWO umbilical arteries and returns oxygenated via ONE umbilical vein across a selective (not absolute—alcohol, drugs, and pathogens can cross) barrier. Its five major functions are: (1) Respiratory (O2/CO2 diffusion), (2) Nutritive/Transport (glucose, amino acids, fatty acids, vitamins, electrolytes, water), (3) Excretory (fetal urea, uric acid, creatinine), (4) Endocrine (hCG, progesterone, estrogens, hPL, placental CRH), and (5) Immunological (maternal-fetal immune tolerance and passive IgG transfer)."
      },
      {
        "heading": "Hormones of Pregnancy and Maternal Physiological Adaptations",
        "body": "Syncytiotrophoblast-derived hCG (detectable ~1 day post-implantation / 8 days post-ovulation—basis of pregnancy tests) binds corpus luteum LH/hCG receptors to prevent luteolysis, maintaining early progesterone/estrogen secretion until the Luteal-Placental Shift (commonly weeks 8–12 of the 1st trimester) when the placenta takes over steroidogenesis. Key pregnancy hormones include: Progesterone (maintains decidua, maintains uterine quiescence, supports immune tolerance and breast alveoli), Estrogens—especially Estriol (peaks at weeks 38–40; falling levels warn of feto-placental compromise; drives uterine growth/blood flow, breast ducts, and near-term gap junctions/oxytocin receptors), Human Placental Lactogen (hPL—promotes maternal insulin resistance and lipolysis to channel glucose/nutrients to the fetus and develops mammary glands), Relaxin (corpus luteum/placenta—highest 1st trimester; softens cervix, relaxes pelvic ligaments, vasodilates kidneys), and Placental CRH (rises near term, timing birth). Maternal systemic adaptations include: Uterus (hyperplasia/hypertrophy expanding from 7.5 cm/50 g to 35 cm/1,000 g and ~5–7 L capacity, dextro-rotated in 80% of cases, lower uterine segment forming from 4th month; involutes to pre-pregnancy size ~8 weeks postpartum); Cervix (softens, mucus-filled); Mammary Glands (3–4 wks tingling; 6–8 wks enlargement, tenderness, visible veins; 8–12 wks dark primary areola & prominent Montgomery tubercles; 16 wks colostrum secretion & secondary areola; minimal milk release before birth); Body Weight (+~12.5 kg); Cardiovascular (blood/plasma volume +40–50%, cardiac output peaks weeks 28–30; disproportionate plasma rise causes physiological anaemia of pregnancy; low diastolic BP via forearm vasodilation; hypercoagulable state increasing DVT risk and normal physiological leukocytosis); Respiratory (diaphragm rises reducing lung capacity, but progesterone stimulates medullary ventilation raising tidal volume and O2 supply -> dyspnoea); GI (early nausea/vomiting, ptyalism, upward stomach displacement + relaxed LES causing reflux, progesterone-slowed motility causing constipation/haemorrhoids, gallbladder stasis, elevated placental alkaline phosphatase); Urinary (GFR +50%, RPF +25–50%, higher creatinine clearance/lower BUN, bladder compression causing frequency, tubular glucose spillover causing glycosuria -> elevated UTI risk); and Musculoskeletal (lumbar lordosis, loosened pelvic ligaments, waddling gait, backaches)."
      },
      {
        "heading": "Parturition, Lactation, and Fetal-to-Neonatal Circulation",
        "body": "Parturition (childbirth, ~40 ± 2 weeks from LMP) is triggered not by an abrupt drop in human circulating progesterone, but by functional progesterone withdrawal alongside rising estrogen, placental CRH, oxytocin receptors, gap junctions, and placental prostaglandins. Cervical stretching sends afferent nerve impulses to the hypothalamus -> posterior pituitary Oxytocin release -> stronger myometrial contractions -> further cervical stretch and prostaglandin release in a Positive Feedback Relay until delivery. Parturition comprises Three Stages: (1) Stage 1—Cervical Dilation (up to ~10 cm with amniotic sac rupture; lasts hours to a day), (2) Stage 2—Fetal Expulsion (birth of baby driven by forceful uterine, abdominal wall, diaphragmatic, and expiratory contractions; minutes to an hour), and (3) Stage 3—Placental Delivery (continued contractions detach and expel the afterbirth). Postpartum Lactation relies on two suckling-triggered reflexes: nipple mechanoreceptors signal the hypothalamus to stimulate anterior pituitary Prolactin (milk synthesis) and posterior pituitary Oxytocin (myoepithelial contraction for milk ejection/let-down). In Fetal Circulation, the placenta replaces the non-functional bypassed lungs, Fetal Haemoglobin (HbF) binds oxygen with higher affinity than maternal Hb, and the right and left ventricles pump in PARALLEL via three fetal shunts: (1) Ductus Venosus (shunts oxygenated umbilical venous blood past the liver to the IVC), (2) Foramen Ovale (open flap shunting oxygenated blood from right atrium to left atrium), and (3) Ductus Arteriosus (shunts pulmonary artery blood directly into the aorta, bypassing lungs). Six major circulatory changes occur at birth: (1) closure of placental circulation, (2) shutting of the patent foramen ovale, (3) closure of the patent ductus arteriosus, (4) umbilical artery constriction triggered by stress, rising O2 tension, and cooler temperature, (5) spontaneous onset of pulmonary respiration, and (6) major neonatal haemodynamic reorganization into adult series circulation."
      }
    ],
    "inTextQuestions": [
      {
        "question": "How many umbilical arteries and umbilical veins connect the fetus to the placenta, and which vessel carries oxygenated blood back to the fetus?",
        "answer": "Two umbilical arteries carry fetal blood to the placenta, and one umbilical vein returns oxygenated blood from the placenta back to the fetus."
      },
      {
        "question": "What is the Luteal-Placental Shift, when does it occur, and what hormone maintains the corpus luteum beforehand?",
        "answer": "The luteal-placental shift (weeks 8–12 of the 1st trimester) is the transition in which the placenta takes over progesterone/estrogen synthesis from the corpus luteum. Syncytiotrophoblast-derived hCG rescues and maintains the corpus luteum prior to this shift."
      },
      {
        "question": "What causes 'physiological anaemia of pregnancy' and why are pregnant women more susceptible to urinary tract infections (UTIs)?",
        "answer": "Physiological anaemia occurs because maternal blood/plasma volume rises (+40–50%) disproportionately faster than red blood cell mass, diluting haemoglobin. Elevated UTI risk results from impaired tubular reabsorption of the heightened filtered glucose load (glycosuria) alongside bladder compression/urinary stasis."
      },
      {
        "question": "Name the three anatomical shunts in fetal circulation and state what each bypasses.",
        "answer": "1. Ductus venosus (bypasses the semi-functional fetal liver); 2. Foramen ovale (shunts right atrial blood to left atrium, bypassing pulmonary circuit); 3. Ductus arteriosus (shunts pulmonary artery blood into aorta, bypassing the non-functional lungs)."
      }
    ],
    "saqs": [
      {
        "id": "5.1",
        "question": "Trace the journey from ovulation to blastocyst implantation, explaining the acrosome reaction, cortical reaction, and the four stages of implantation.",
        "answer": "Ovulation (Day 0) -> ampullary fertilization within 24 hrs: sperm acrosome reaction digests zona pellucida, plasma membranes fuse, and cortical reaction hardens the egg coat against polyspermy -> cleavage (Days 1–3) -> morula (Day 3) -> blastocyst (Day 5). Implantation (Days 6–9) proceeds via Hatching, Apposition (pinopod contact), Adhesion (firm trophoblast binding), Invasion (syncytiotrophoblast penetration), and Decidualization."
      },
      {
        "id": "5.2",
        "question": "Summarize the five major physiological functions of the placenta and state the main source and key actions of hCG, hPL, and Relaxin.",
        "answer": "Placental functions: Respiratory (O2/CO2 exchange), Nutritive (glucose, amino acids, lipids, vitamins), Excretory (urea/creatinine), Endocrine (steroids/peptides), Immunological (tolerance + maternal IgG transfer). hCG (syncytiotrophoblast): rescues corpus luteum/progesterone. hPL (syncytiotrophoblast): induces maternal insulin resistance and lipolysis to feed fetus, aids breast growth. Relaxin (corpus luteum/placenta): cervical remodelling, pelvic ligament relaxation, renal vasodilation."
      },
      {
        "id": "5.3",
        "question": "Outline the timeline of mammary gland changes during pregnancy (weeks 3–16) and describe four major uterine changes across gestation.",
        "answer": "Mammary timeline: 3–4 wks (tingling/increased blood supply), 6–8 wks (enlargement, tenderness, bluish visible veins), 8–12 wks (dark erectile primary areola, prominent Montgomery tubercles), 16 wks (colostrum secretion, secondary areola). Uterine changes: height increases 7.5 -> 35 cm, weight increases 50 -> 1,000 g (capacity ~5–7 L), dextro-rotation to the right in 80% of cases, lower uterine segment forms from isthmus starting 4th month (reaches 10 cm at term), returning to baseline ~8 weeks postpartum."
      },
      {
        "id": "5.4",
        "question": "Explain the positive-feedback hormonal mechanism driving parturition and summarize the three stages of labour.",
        "answer": "Near term, rising estrogen, oxytocin receptors, gap junctions, and functional progesterone shift prime the myometrium. Fetal head stretching the cervix sends nerve signals to the hypothalamus -> posterior pituitary releases oxytocin -> stronger uterine contractions -> placenta releases prostaglandins -> greater cervical stretch in a positive-feedback loop. Stages: (1) Cervical dilation (up to ~10 cm), (2) Fetal expulsion (delivery of baby), (3) Placental delivery (expulsion of afterbirth)."
      },
      {
        "id": "5.5",
        "question": "State four major differences between fetal and adult circulation and list the six physiological changes that occur at birth.",
        "answer": "Differences: open Foramen Ovale, patent Ductus Arteriosus (parallel ventricular pumping), bypassed non-functional lungs (placenta acts as lungs), and fetal HbF with higher O2 affinity than maternal Hb. Six changes at birth: closure of placental circulation, shutting of foramen ovale, closure of ductus arteriosus, umbilical artery constriction (stress/high O2/cold), spontaneous respiration onset, and marked neonatal haemodynamic shifts."
      }
    ]
  },

  // Module 6
  {
    "id": 6,
    "title": "Cardiovascular Physiology: Cardiac Cycle, Haemodynamics, Conducting System and Electrocardiography",
    "introduction": "The heart functions as an electrically self-exciting dual pump whose rhythmic contractions propel blood continuously through the systemic and pulmonary circuits. Mastering core haemodynamic equations, the 0.8-second cardiac cycle, Frank-Starling mechanics, the specialized six-part conducting system, and the waveform complexes of the electrocardiogram (ECG) provides the bedrock for clinical cardiovascular assessment.",
    "learningOutcomes": [
      "6.1 Define core cardiovascular terms—heartbeat, systole, diastole, heart sounds ('LUB' and 'DUP'), pulse, pulse pressure, blood pressure, stroke volume, heart rate, cardiac output, and Frank-Starling Law.",
      "6.2 Trace the phases and durations of the 0.8-second cardiac cycle and distinguish the four fundamental properties of cardiac muscle.",
      "6.3 Map the six anatomical components of the cardiac conducting system, emphasizing the SA node pacemaker, AV nodal delay, and Purkinje fiber velocity.",
      "6.4 Explain the biophysical basis of the Electrocardiogram (ECG), including galvanometer recording, zero potential, depolarization, repolarization, and Einthoven's triangle.",
      "6.5 Interpret the P wave, QRS complex, T wave, and P-R interval with their normal durations and clinical diagnostic utility."
    ],
    "content": [
      {
        "heading": "Cardiovascular Terminologies, Haemodynamics, Cardiac Cycle, and Muscle Properties",
        "body": "A complete Heart Beat consists of two coordinated phases: Systole (ventricular contraction ejecting blood into arteries, accompanied by closure of the atrioventricular [AV] valves generating the louder first heart sound, 'LUB') and Diastole (ventricular relaxation filling from the atria, accompanied by closure of the aortic and pulmonary semilunar valves generating the softer second heart sound, 'DUP'). The Pulse is the palpable wave of systolic-diastolic pressure travelling along superficial arteries. In a healthy young adult with resting arterial Blood Pressure (pressure in the brachial artery) of 120/70 mmHg, Pulse Pressure equals Systolic minus Diastolic pressure ($120 - 70 = 50$ mmHg). Arterial Blood Pressure is the product of Cardiac Output and Peripheral Resistance ($BP = CO \\times PR$). Cardiac Output ($Q$)—the blood volume pumped by each ventricle per minute—is given by $Q = SV \\times HR$, where Stroke Volume ($SV$, also linked to ventricular end-diastolic volume/preload) averages 70–72 mL/beat per ventricle and Heart Rate ($HR$, beats/min) varies with age, gender, body temperature, and autonomic tone; during vigorous exercise, $Q$ rises to ~25 L/min in untrained adults and up to 35 L/min in trained athletes. According to the Frank-Starling Law of the Heart, the mechanical energy generated during cardiac contraction is a direct function of the end-diastolic length (stretch) of cardiac muscle fibers. One complete Cardiac Cycle lasts approximately 0.8 seconds, divided into Atrial Systole (0.1 s), Ventricular Systole (0.3 s), and Complete Cardiac Diastole (0.4 s). Cardiac muscle exhibits four intrinsic properties: (1) Excitability (ability to respond to stimuli and generate impulses), (2) Rhythmicity (automatic continuous, regular impulse discharge), (3) Conductivity (transmission of action potentials across the myocardium), and (4) Contractility (mechanical shortening following electrical excitation)."
      },
      {
        "heading": "The Conducting System of the Heart",
        "body": "Cardiac excitation originates intrinsically within specialized conducting cells—low in contractility, rich in mitochondria and glycogen, and electrically specialized—arranged across six sequential structures so atria always contract before ventricles: (1) Sinoatrial (SA) Node (the Pacemaker)—located at the posterior upper right atrium near the superior vena cava entrance; fires intrinsically at 90–120 beats/min (higher in youth, declining with age; accelerated by fever, thyroid hormone, epinephrine, and norepinephrine); (2) Interatrial Tract (Bachmann's Bundle)—conducts impulses rapidly from the SA node to the left atrium for near-simultaneous bi-atrial depolarization and contraction; (3) Internodal Tracts (Anterior, Middle, and Posterior bundles)—specialized pathways linking the SA node to the AV node that resist conduction block better than ordinary atrial muscle; (4) Atrioventricular (AV) Node—located beneath the right interatrial septal endocardium near the tricuspid valve, serving normally as the SOLE electrical bridge from atria to ventricles and richly innervated by sympathetic and vagal fibers; its slow conduction produces the critical AV Nodal Delay (100–150 milliseconds), giving the atria time to finish emptying blood into the ventricles before ventricular systole; (5) Bundle of His (AV Bundle)—continues from the AV node along the right interventricular septum and splits into Right and Left Bundle Branches; and (6) Purkinje Fibers—extensive subendocardial ventricular branches possessing the HIGHEST conduction velocity in the heart, ensuring near-simultaneous, high-efficiency contraction of both ventricles."
      },
      {
        "heading": "Electrocardiography (ECG): Action Potentials, Einthoven's Triangle, and Wave Complexes",
        "body": "The Electrocardiogram (ECG) uses a galvanometer to record surface voltage fluctuations across time between body-surface electrodes—commonly arranged in Einthoven's Triangle (both arms and the left leg, centering the heart). Clinically, the ECG diagnoses excitation disorders, arrhythmias, cardiac hypertrophy, myocardial damage, and ischaemia/necrosis, though it does NOT directly measure the heart's mechanical pumping performance. Electrical deflection principles include: Zero Potential (during complete diastole, all cardiac cells are uniformly polarized—positive outside, negative inside—producing zero voltage difference and a flat baseline), Depolarization (excitation reverses membrane polarity so the exterior becomes negative relative to resting neighbours, generating a measurable potential difference), and Repolarization (recovery proceeding in the same direction as depolarization deflects the galvanometer in the opposite direction). The standard ECG tracing features four key components: (1) P Wave—represents Atrial Depolarization as the SA node impulse sweeps across both atria; (2) QRS Complex (normal duration ~0.08 seconds: negative Q wave, positive R wave, negative S wave)—represents rapid Ventricular Depolarization travelling via the Bundle of His and Purkinje fibers; (3) T Wave—represents Ventricular Repolarization (relaxation of ventricular muscle, normally deflecting in the same direction as the QRS complex); and (4) P-R Interval (onset of P wave to onset of QRS complex; normal duration 0.12–0.21 seconds depending on heart rate)—measures total AV Conduction Time including the AV nodal delay (while the interval between successive QRS complexes measures cardiac cycle length)."
      }
    ],
    "inTextQuestions": [
      {
        "question": "State the Frank-Starling Law of the Heart and distinguish the origin of the 'LUB' and 'DUP' heart sounds.",
        "answer": "Frank-Starling Law states that the energy produced by the heart during contraction is a function of the end-diastolic length of its muscle fibers. 'LUB' (first, louder sound) comes from closure of the AV valves during ventricular systole; 'DUP' (second, softer sound) comes from closure of the aortic and pulmonary semilunar valves during diastole."
      },
      {
        "question": "What are the durations of the three phases of a single 0.8-second cardiac cycle?",
        "answer": "Atrial systole = 0.1 seconds, Ventricular systole = 0.3 seconds, and Complete cardiac diastole = 0.4 seconds (total = 0.8 s)."
      },
      {
        "question": "How long is the AV nodal delay, why is it physiologically essential, and which conducting structure has the highest conduction velocity?",
        "answer": "The AV nodal delay lasts 100–150 milliseconds, giving the atria time to contract and optimize ventricular filling before ventricular systole begins. Purkinje fibers have the highest action-potential conduction velocity."
      },
      {
        "question": "What cardiac electrical events correspond to the P wave, QRS complex, T wave, and P-R interval on an ECG?",
        "answer": "P wave = atrial depolarization; QRS complex (0.08 s) = ventricular depolarization; T wave = ventricular repolarization; P-R interval (0.12–0.21 s) = AV conduction time including AV nodal delay."
      }
    ],
    "saqs": [
      {
        "id": "6.1",
        "question": "Define Stroke Volume, Heart Rate, Cardiac Output, Pulse Pressure, and Blood Pressure, giving the mathematical relationships and normal adult resting values.",
        "answer": "Stroke Volume (SV): volume pumped per ventricle per beat (~70–72 mL). Heart Rate (HR): beats per minute. Cardiac Output: $Q = SV \\times HR$ (rising to 25–35 L/min in exercise). Pulse Pressure = Systolic − Diastolic ($120 - 70 = 50$ mmHg). Blood Pressure (arterial pressure, ~120/70 mmHg) = Cardiac Output $\\times$ Peripheral Resistance."
      },
      {
        "id": "6.2",
        "question": "List and define the four fundamental physiological properties of cardiac muscle.",
        "answer": "1. Excitability: ability to respond to stimulation and generate an impulse; 2. Rhythmicity: ability to discharge impulses continuously and regularly; 3. Conductivity: ability to transmit action potentials across the entire cardiac muscle from one point; 4. Contractility: ability to contract mechanically following electrical excitation."
      },
      {
        "id": "6.3",
        "question": "Trace an electrical impulse sequentially through all six components of the cardiac conducting system and explain the role of Bachmann's bundle and the internodal tracts.",
        "answer": "SA Node (pacemaker, 90–120 bpm) -> Bachmann's bundle (interatrial tract causing near-simultaneous left/right atrial depolarization) and Anterior/Middle/Posterior Internodal Tracts (block-resistant conduits to AV node) -> AV Node (100–150 ms delay for ventricular filling) -> Bundle of His & Right/Left Bundle Branches -> Purkinje Fibers (fastest conduction for near-simultaneous ventricular contraction)."
      },
      {
        "id": "6.4",
        "question": "Explain zero potential, depolarization, repolarization, and Einthoven's triangle in electrocardiography, and state one key limitation of an ECG.",
        "answer": "Zero potential occurs in diastole when all cells are equally polarized (flat baseline); depolarization reverses outer polarity to negative creating a voltage deflection; repolarization moving in the same direction deflects the galvanometer oppositely. Einthoven's triangle places electrodes on both arms and the left leg around the heart. Limitation: the ECG assesses electrical excitation/damage/arrhythmias but does NOT measure mechanical pumping performance."
      },
      {
        "id": "6.5",
        "question": "Explain the diagnostic value of an ECG and describe the QRS complex components (Q, R, S) alongside the normal durations of the QRS complex and P-R interval.",
        "answer": "ECGs evaluate excitation events, arrhythmias, cardiac hypertrophy, myocardial damage, and ischaemia/necrosis. The QRS complex (normal duration 0.08 s, ventricular depolarization via AV bundle/Purkinje fibers) consists of a negative Q wave preceding a positive R wave, followed by a negative S wave. The P-R interval normally spans 0.12–0.21 seconds (measuring AV conduction time and nodal delay)."
      }
    ]
  }
];

const targetDirs = [
  path.resolve(__dirname, '../../content/pio206'),
  path.resolve(__dirname, '../src/data/pio206')
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

console.log('Successfully written all 6 PIO 206 modules.');
