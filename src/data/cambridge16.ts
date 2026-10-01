import type { IELTSMockTest } from '../types/ielts';

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 1 READING
// ==========================================
export const cambridge16Test1Reading: IELTSMockTest = {
  id: "cambridge-16-test-1-reading",
  book: 16,
  testNumber: 1,
  module: "reading",
  title: "Cambridge 16 Academic Reading Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Reading Passage 1",
      subtitle: "Why we need to protect polar bears",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Polar bears are being increasingly threatened by the effects of climate change, but their disappearance could have far-reaching consequences. They are uniquely adapted to the extreme conditions of the Arctic Circle, where temperatures can reach −40°C. One of the most fascinating aspects of their survival is their ability to build up massive fat reserves while remaining free of the cardiovascular diseases that affect humans.
          </p>
          <p>
            <strong>A.</strong> Polar bears (<em>Ursus maritimus</em>) are the world\'s largest land carnivores and an iconic symbol of the Arctic wilderness. However, their reliance on sea ice for hunting seals—their primary source of food—means they are at immediate risk from global warming. As Arctic sea ice melts earlier in spring and refreezes later in autumn, polar bears are forced to spend longer periods fasting on land. Scientists warn that if current climate trajectories continue, polar bear populations throughout the Hudson Bay and across northern Siberia could decline drastically by the mid-21st century.
          </p>
          <p>
            <strong>B.</strong> Aside from their ecological role as apex predators, polar bears possess unique physiological characteristics that may hold the key to solving some of humanity\'s most pressing medical conditions. During the autumn feeding season, up to 50 percent of a polar bear\'s total body weight consists of subcutaneous adipose tissue (fat). In humans, such extraordinary levels of adipose tissue would inevitably result in severe obesity, atherosclerosis, hypertension, and fatal heart attacks. Yet, polar bears show no evidence whatsoever of clogged arteries or vascular inflammation.
          </p>
          <p>
            <strong>C.</strong> In 2014, a collaborative genomic study led by Dr. Eline Lorenzen from the University of Copenhagen and researchers at the University of California, Berkeley, decoded the complete polar bear genome. They compared it with that of its closest evolutionary relative, the brown bear (grizzly bear). The comparative analysis revealed that polar bears diverged from brown bears surprisingly recently, between 400,000 and 500,000 years ago. Despite this relatively brief evolutionary timescale, the species underwent dramatic genetic adaptations in genes responsible for fatty acid metabolism and cardiovascular development.
          </p>
          <p>
            <strong>D.</strong> The most significant discovery centered on a gene known as <em>APOB</em> (apolipoprotein B). This gene codes for a protein that transports bad cholesterol (low-density lipoproteins, or LDL) through the bloodstream. In humans, mutations or dysfunctions in <em>APOB</em> are well-documented triggers for severe cardiovascular disease. In polar bears, however, natural selection has favored a specialized variant of <em>APOB</em> that clears LDL particles from circulation with exceptional efficiency. Understanding how this mutated protein operates could lead to novel pharmaceutical therapies for human coronary heart disease.
          </p>
          <p>
            <strong>E.</strong> Another physiological marvel is the polar bear\'s bone density. Female polar bears spend up to six consecutive months inside subterranean snow dens during pregnancy and maternity. During this prolonged period of dormancy, the mother does not eat, drink, or defecate, yet she produces nutrient-dense milk to suckle her cubs. In contrast to humans who lose significant bone mass when immobilized for even a few weeks, female polar bears emerge from their dens with their skeletal density completely intact. Unraveling the biological mechanisms preventing osteopenia during denning could revolutionize treatments for osteoporosis in elderly humans.
          </p>
          <p>
            <strong>F.</strong> Furthermore, recent behavioural studies indicate that polar bears possess cognitive capacities far beyond what was previously assumed. Field biologists in Svalbard have documented individual bears systematically stacking ice blocks and manipulating stone fragments to reach baited traps, demonstrating problem-solving capabilities on par with primates. These cognitive skills, combined with their irreplaceable ecological importance, underscore why the international community must intensify conservation protocols to protect this magnificent Arctic sentinel.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r1-qg1",
          type: "true_false_not_given",
          title: "Questions 1 – 7",
          instructions: "Do the following statements agree with the information given in Reading Passage 1? Write TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.",
          questions: [
            { questionNumber: 1, prompt: "Polar bears are experiencing longer periods without food due to changes in Arctic sea ice.", correctAnswer: "TRUE", explanation: "Paragraph A states polar bears are forced to spend longer periods fasting on land due to earlier melting and later freezing.", passageEvidence: { paragraph: "A", quote: "forced to spend longer periods fasting on land" } },
            { questionNumber: 2, prompt: "Polar bears suffer from high blood pressure during the autumn feeding season.", correctAnswer: "FALSE", explanation: "Paragraph B explains that polar bears show no evidence whatsoever of clogged arteries or vascular inflammation.", passageEvidence: { paragraph: "B", quote: "show no evidence whatsoever of clogged arteries" } },
            { questionNumber: 3, prompt: "Dr. Lorenzen\'s team found that polar bears diverged from brown bears more than two million years ago.", correctAnswer: "FALSE", explanation: "Paragraph C notes that polar bears diverged from brown bears surprisingly recently, between 400,000 and 500,000 years ago.", passageEvidence: { paragraph: "C", quote: "diverged from brown bears surprisingly recently" } },
            { questionNumber: 4, prompt: "The APOB gene in polar bears is responsible for removing low-density lipoproteins from the blood.", correctAnswer: "TRUE", explanation: "Paragraph D confirms the specialized variant of APOB clears LDL particles from circulation with exceptional efficiency.", passageEvidence: { paragraph: "D", quote: "clears LDL particles from circulation with exceptional efficiency" } },
            { questionNumber: 5, prompt: "Doctors have already synthesized a heart medication directly based on the polar bear APOB gene.", correctAnswer: "NOT GIVEN", explanation: "Paragraph D states this could lead to novel therapies, but does not claim any drug has yet been synthesized.", passageEvidence: { paragraph: "D", quote: "could lead to novel pharmaceutical therapies" } },
            { questionNumber: 6, prompt: "Female polar bears lose a substantial amount of bone density while hibernating in snow dens.", correctAnswer: "FALSE", explanation: "Paragraph E clarifies female polar bears emerge from dens with their skeletal density completely intact.", passageEvidence: { paragraph: "E", quote: "skeletal density completely intact" } },
            { questionNumber: 7, prompt: "Research on polar bear denning could offer insights for treating human osteoporosis.", correctAnswer: "TRUE", explanation: "Paragraph E confirms this could revolutionize treatments for osteoporosis in elderly humans.", passageEvidence: { paragraph: "E", quote: "revolutionize treatments for osteoporosis" } }
          ]
        },
        {
          id: "c16-r1-qg2",
          type: "table_completion",
          title: "Questions 8 – 13",
          instructions: "Complete the table below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Medical insights from polar bear physiology",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 8, prompt: "Up to half of an adult polar bear\'s weight can be comprised of [ 8 ] in the autumn months.", correctAnswer: "fat", acceptedVariants: ["adipose"], explanation: "Paragraph B: 'up to 50 percent of a polar bear\'s total body weight consists of subcutaneous adipose tissue (fat).'", passageEvidence: { paragraph: "B", quote: "adipose tissue (fat)" } },
            { questionNumber: 9, prompt: "Genomic comparison was conducted between polar bears and [ 9 ] bears.", correctAnswer: "brown", acceptedVariants: ["grizzly"], explanation: "Paragraph C: 'They compared it with that of its closest evolutionary relative, the brown bear.'", passageEvidence: { paragraph: "C", quote: "closest evolutionary relative, the brown bear" } },
            { questionNumber: 10, prompt: "The APOB gene codes for a specific [ 10 ] that transports cholesterol.", correctAnswer: "protein", explanation: "Paragraph D: 'This gene codes for a protein that transports bad cholesterol.'", passageEvidence: { paragraph: "D", quote: "codes for a protein" } },
            { questionNumber: 11, prompt: "Female polar bears reside in [ 11 ] throughout their pregnancy and cub nursing.", correctAnswer: "dens", acceptedVariants: ["snow dens"], explanation: "Paragraph E: 'spend up to six consecutive months inside subterranean snow dens.'", passageEvidence: { paragraph: "E", quote: "subterranean snow dens" } },
            { questionNumber: 12, prompt: "Unlike humans, polar bears experience no loss of [ 12 ] during months of inactivity.", correctAnswer: "bone", acceptedVariants: ["bone mass", "density"], explanation: "Paragraph E: 'emerge from their dens with their skeletal density completely intact.'", passageEvidence: { paragraph: "E", quote: "skeletal density completely intact" } },
            { questionNumber: 13, prompt: "Studies in Svalbard observed polar bears moving blocks of [ 13 ] to access traps.", correctAnswer: "ice", explanation: "Paragraph F: 'systematically stacking ice blocks and manipulating stone fragments.'", passageEvidence: { paragraph: "F", quote: "stacking ice blocks" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Reading Passage 2",
      subtitle: "The Step Pyramid of Djoser",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            The Step Pyramid of Djoser at Saqqara represents a monumental leap forward in architectural engineering and burial practices in ancient Egypt. Built in the 27th century BCE, it revolutionized construction methods by replacing mudbrick with stone.
          </p>
          <p>
            <strong>A.</strong> The pyramids are the most iconic symbols of ancient Egyptian civilization, yet they did not spring into existence fully formed. Before the reign of Pharaoh Djoser (circa 2670 BCE) of the Third Dynasty, Egyptian monarchs were customarily buried in rectangular, flat-roofed structures called mastabas. These tombs were constructed primarily of dried mudbricks baked in the sun. Because mudbrick degraded rapidly under environmental exposure and was vulnerable to tomb robbers, royal architects constantly sought more durable methods to protect the pharaoh\'s body and grave goods.
          </p>
          <p>
            <strong>B.</strong> Enter Imhotep, Djoser\'s vizier, high priest of Ra, and master architect. Imhotep is credited with being the first architect in recorded history whose identity is preserved. Imhotep conceived of an unprecedented vision: building a funerary monument made entirely of carved limestone blocks rather than mudbrick. Limestone was quarried nearby and offered permanence that would endure for all eternity, reflecting the eternal reign of the divine king.
          </p>
          <p>
            <strong>C.</strong> Rather than stopping at a traditional single-level rectangular mastaba, Imhotep introduced successive modifications. Initially, he built a square stone mastaba, which he subsequently enlarged twice. Then, in an inspired stroke of monumental engineering, Imhotep stacked five successively smaller stone mastabas directly on top of the foundation. The resulting structure was a six-tiered step pyramid that soared to a height of 62 metres (203 feet), dominating the flat desert plateau of Saqqara.
          </p>
          <p>
            <strong>D.</strong> The exterior of the Step Pyramid was originally encased in gleaming white Tura limestone, polished smooth to catch the morning sun. Surrounding the pyramid was a vast mortuary complex covering approximately 15 hectares (37 acres), enclosed by a monumental 10.5-metre-high recessed stone wall with only one functioning entrance among fourteen simulated gates. Within this sacred precinct were courtyards for the Heb-Sed festival (the ritual rejuvenation of the king\'s vitality), ceremonial pavilions, and subterranean galleries.
          </p>
          <p>
            <strong>E.</strong> Beneath the Step Pyramid lies a labyrinth of underground tunnels, galleries, and chambers stretching for over 5.7 kilometres. At the center of this underground network is a 28-metre-deep shaft leading to the burial chamber, built from massive blocks of pink granite imported from Aswan. Around the burial chamber, walls were decorated with exquisite blue faience tiles mimicking reed matting, alongside lifelike limestone relief carvings depicting Djoser performing sacred ceremonies.
          </p>
          <p>
            <strong>F.</strong> The structural significance of Djoser\'s Step Pyramid cannot be overstated. It established stone masonry as the supreme medium for royal architecture, paving the way for the smooth-sided pyramids of Giza constructed just a few generations later during the Fourth Dynasty. Imhotep\'s unprecedented achievement made him a legend; centuries after his death, Egyptians deified him as a god of medicine, wisdom, and architecture.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r1-qg3",
          type: "summary_completion",
          title: "Questions 14 – 19",
          instructions: "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Imhotep and the Construction of the Step Pyramid",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 14, prompt: "Early royal Egyptian graves prior to Djoser were rectangular tombs made from [ 14 ] bricks.", correctAnswer: "mudbrick", acceptedVariants: ["mud"], explanation: "Paragraph A states early tombs were mastabas made of dried mudbricks baked in the sun.", passageEvidence: { paragraph: "A", quote: "constructed primarily of dried mudbricks" } },
            { questionNumber: 15, prompt: "Imhotep is notable as the earliest [ 15 ] in recorded history known by name.", correctAnswer: "architect", explanation: "Paragraph B confirms Imhotep is credited with being the first architect in recorded history whose identity is preserved.", passageEvidence: { paragraph: "B", quote: "first architect in recorded history" } },
            { questionNumber: 16, prompt: "To guarantee durability, Imhotep opted to build the monument out of [ 16 ] rather than mud.", correctAnswer: "limestone", acceptedVariants: ["stone"], explanation: "Paragraph B explains he conceived a monument made entirely of carved limestone blocks.", passageEvidence: { paragraph: "B", quote: "carved limestone blocks" } },
            { questionNumber: 17, prompt: "The Step Pyramid comprised six tiers and reached a total height of 62 [ 17 ].", correctAnswer: "metres", acceptedVariants: ["meters", "m"], explanation: "Paragraph C notes the six-tiered step pyramid soared to a height of 62 metres.", passageEvidence: { paragraph: "C", quote: "soared to a height of 62 metres" } },
            { questionNumber: 18, prompt: "The outer wall of the 15-hectare complex featured only one real [ 18 ] among many false ones.", correctAnswer: "entrance", acceptedVariants: ["gate"], explanation: "Paragraph D describes fourteen simulated gates with only one functioning entrance.", passageEvidence: { paragraph: "D", quote: "only one functioning entrance among fourteen simulated gates" } },
            { questionNumber: 19, prompt: "The subterranean burial chamber was assembled using heavy blocks of pink [ 19 ] from Aswan.", correctAnswer: "granite", explanation: "Paragraph E states it was built from massive blocks of pink granite imported from Aswan.", passageEvidence: { paragraph: "E", quote: "massive blocks of pink granite" } }
          ]
        },
        {
          id: "c16-r1-qg4",
          type: "multiple_choice",
          title: "Questions 20 – 24",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 20, prompt: "Why were traditional mudbrick mastabas considered unsatisfactory by royal architects?", options: ["A. They took too long to build in hot desert conditions.", "B. They deteriorated quickly and failed to deter grave robbers.", "C. They were too expensive to decorate with wall carvings.", "D. Sun-dried mudbrick was forbidden by high priests of Ra."], correctAnswer: "B", explanation: "Paragraph A states mudbrick degraded rapidly and was vulnerable to tomb robbers.", passageEvidence: { paragraph: "A", quote: "degraded rapidly under environmental exposure and was vulnerable to tomb robbers" } },
            { questionNumber: 21, prompt: "How did Imhotep arrive at the step pyramid design?", options: ["A. By directly copying temple architecture from Mesopotamia.", "B. By excavating an existing limestone mound and cutting steps into it.", "C. By repeatedly expanding a base mastaba and stacking smaller tiers above it.", "D. By assembling prefabricated stone blocks according to royal decree."], correctAnswer: "C", explanation: "Paragraph C explains he enlarged a square stone mastaba, then stacked five successively smaller stone mastabas on top.", passageEvidence: { paragraph: "C", quote: "stacked five successively smaller stone mastabas directly on top" } },
            { questionNumber: 22, prompt: "What purpose did the Heb-Sed courtyards in the mortuary complex serve?", options: ["A. Storing building materials and equipment for ongoing construction.", "B. Hosting ritual ceremonies to symbolically renew the pharaoh\'s vitality.", "C. Housing foreign ambassadors and visiting dignitaries.", "D. Conducting administrative trade across Lower Egypt."], correctAnswer: "B", explanation: "Paragraph D states courtyards were for the Heb-Sed festival, the ritual rejuvenation of the king\'s vitality.", passageEvidence: { paragraph: "D", quote: "ritual rejuvenation of the king\'s vitality" } },
            { questionNumber: 23, prompt: "What feature decorated the walls around Djoser\'s subterranean burial chamber?", options: ["A. Blue faience tiles designed to look like reed mats.", "B. Sheets of beaten gold illustrating the underworld.", "C. Wooden panels imported from the Lebanese coast.", "D. Mudbrick reliefs inscribed with royal genealogies."], correctAnswer: "A", explanation: "Paragraph E describes blue faience tiles mimicking reed matting.", passageEvidence: { paragraph: "E", quote: "blue faience tiles mimicking reed matting" } },
            { questionNumber: 24, prompt: "What was one enduring long-term legacy of Imhotep\'s work at Saqqara?", options: ["A. The complete abandonment of mortuary complexes in Egyptian history.", "B. The adoption of stone masonry as the supreme medium for royal monuments.", "C. The restriction of pyramid building to viziers and priests.", "D. A shift towards circular tombs throughout the Old Kingdom."], correctAnswer: "B", explanation: "Paragraph F confirms it established stone masonry as the supreme medium for royal architecture.", passageEvidence: { paragraph: "F", quote: "established stone masonry as the supreme medium" } }
          ]
        },
        {
          id: "c16-r1-qg5",
          type: "multiple_choice_multi",
          title: "Questions 25 – 26",
          instructions: "Choose TWO letters, A – E. Which TWO of the following statements about the Step Pyramid are mentioned in the passage?",
          questions: [
            { questionNumber: 25, prompt: "Which TWO statements about the Step Pyramid are mentioned in the passage? (First answer)", options: ["A. Its outer casing was made of polished white Tura limestone.", "B. It was the tallest structure ever constructed in the ancient world.", "C. It contains over five kilometres of underground passageways.", "D. It collapsed during an earthquake in the Third Dynasty.", "E. Its design was kept secret by ancient guilds of craftsmen."], correctAnswer: "A", acceptedVariants: ["C"], explanation: "Paragraph D mentions casing in white Tura limestone; Paragraph E mentions underground tunnels over 5.7 km.", passageEvidence: { paragraph: "D", quote: "encased in gleaming white Tura limestone" } },
            { questionNumber: 26, prompt: "Which TWO statements about the Step Pyramid are mentioned in the passage? (Second answer)", options: ["A. Its outer casing was made of polished white Tura limestone.", "B. It was the tallest structure ever constructed in the ancient world.", "C. It contains over five kilometres of underground passageways.", "D. It collapsed during an earthquake in the Third Dynasty.", "E. Its design was kept secret by ancient guilds of craftsmen."], correctAnswer: "C", acceptedVariants: ["A"], explanation: "Paragraph E mentions underground tunnels over 5.7 km.", passageEvidence: { paragraph: "E", quote: "tunnels, galleries, and chambers stretching for over 5.7 kilometres" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Reading Passage 3",
      subtitle: "The Future of Work",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Automation, machine learning, and artificial intelligence are transforming workplace dynamics at a pace unseen since the Industrial Revolution. How will economies, corporations, and workers adapt to the automated future?
          </p>
          <p>
            <strong>A.</strong> The anxiety that machines will render human labor obsolete has recurred periodically throughout modern history. In the early 19th century, textile workers known as Luddites smashed mechanical looms in northern England, fearful that industrial machinery would destroy their livelihoods. Today, similar apprehensions are surfacing across global capitals, driven by breakthroughs in algorithmic computation, predictive robotics, and generative AI. However, contemporary economists argue that the nature of current technological change differs fundamentally from historical precedents.
          </p>
          <p>
            <strong>B.</strong> In a landmark 2017 study by the McKinsey Global Institute, researchers estimated that up to 375 million workers globally—roughly 14 percent of the worldwide workforce—could need to transition to entirely new occupational categories by 2030. While earlier waves of automation primarily replaced physically demanding, manual tasks on factory floors, digital algorithms are now capable of executing complex cognitive routines. Routine cognitive work, such as basic financial auditing, paralegal document indexing, and medical radiology scanning, can now be executed faster and with fewer errors by machine learning systems.
          </p>
          <p>
            <strong>C.</strong> Yet, technological displacement does not necessarily equate to aggregate employment decline. As Professor David Autor of the Massachusetts Institute of Technology points out, technology often acts as a complement rather than a substitute for human labor. When automated teller machines (ATMs) were widely deployed across American banking branches in the 1980s and 1990s, pundits predicted the total demise of bank tellers. Instead, ATMs lowered the operating cost of maintaining local branches, allowing banks to open far more branches. Consequently, total teller employment actually grew, although the tellers\' daily responsibilities shifted from cash dispensing toward relationship management, advisory services, and loan sales.
          </p>
          <p>
            <strong>D.</strong> Nonetheless, the economic transition is rarely frictionless. Economists highlight the emerging phenomenon of \'labor market polarization\'. While employment in high-skill, high-wage occupations (such as software architecture, specialized surgery, and corporate strategy) and low-skill, low-wage personal services (such as elder care, hospitality, and landscape maintenance) continues to expand, middle-wage clerical and manufacturing jobs are shrinking rapidly. This \'hollowing out\' of the middle class threatens social cohesion and exacerbates income inequality, particularly in developed Western economies.
          </p>
          <p>
            <strong>E.</strong> To mitigate these structural disruptions, educational institutions and national governments must urgently modernize workforce development paradigms. Traditional models of front-loaded education—in which an individual earns a degree in their twenties and expects that technical knowledge to sustain a 40-year career—are hopelessly obsolete. Instead, forward-looking economists advocate for lifelong learning frameworks supported by government-subsidized reskilling accounts and corporate apprenticeships.
          </p>
          <p>
            <strong>F.</strong> Ultimately, human workers retain distinct comparative advantages over computational models in domains that require empathy, complex interpersonal negotiation, ethical judgment, and imaginative creativity. Rather than treating artificial intelligence as an adversarial threat, the most resilient enterprises are building hybrid collaborative workflows where automated systems handle quantitative heavy lifting while human professionals focus on nuanced synthesis and strategic leadership.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r1-qg6",
          type: "multiple_choice",
          title: "Questions 27 – 30",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 27, prompt: "In Paragraph A, what comparison does the author draw with the 19th-century Luddites?", options: ["A. Both eras experienced widespread worker riots in rural communities.", "B. Both periods were marked by intense anxiety regarding machine-driven job displacement.", "C. Today\'s AI developers are adopting the same organizational tactics as early factory owners.", "D. Textile automation caused far worse economic depression than modern computing."], correctAnswer: "B", explanation: "Paragraph A states anxieties that machines will render human labor obsolete occurred during the Luddite era and are surfacing again today.", passageEvidence: { paragraph: "A", quote: "anxiety that machines will render human labor obsolete has recurred periodically" } },
            { questionNumber: 28, prompt: "How does the McKinsey Global Institute study distinguish modern automation from earlier waves?", options: ["A. Modern automation primarily targets agricultural production.", "B. Modern automation is confined only to developing economies.", "C. Modern automation replaces cognitive routines rather than merely physical labor.", "D. Modern automation will affect less than one percent of total workers."], correctAnswer: "C", explanation: "Paragraph B explains that modern algorithms execute complex cognitive routines rather than merely manual physical tasks.", passageEvidence: { paragraph: "B", quote: "algorithms are now capable of executing complex cognitive routines" } },
            { questionNumber: 29, prompt: "What unexpected result occurred when ATMs were introduced in US banking branches?", options: ["A. Most commercial bank branches were closed immediately.", "B. Bank teller employment increased while their job responsibilities changed.", "C. Customers refused to use automated machines due to security concerns.", "D. Bank profits dropped because machines were more expensive than humans."], correctAnswer: "B", explanation: "Paragraph C notes total teller employment grew while responsibilities shifted toward advisory services.", passageEvidence: { paragraph: "C", quote: "total teller employment actually grew" } },
            { questionNumber: 30, prompt: "What is meant by \'labor market polarization\' described in Paragraph D?", options: ["A. Equal growth across every occupational sector in the economy.", "B. The migration of workers exclusively from rural areas to urban tech hubs.", "C. The expansion of high-wage and low-wage jobs alongside the shrinkage of middle-tier jobs.", "D. A division between workers who support unions and those who do not."], correctAnswer: "C", explanation: "Paragraph D defines polarization as expanding high-wage and low-wage jobs while middle-tier jobs shrink.", passageEvidence: { paragraph: "D", quote: "hollowing out of the middle class" } }
          ]
        },
        {
          id: "c16-r1-qg7",
          type: "matching_features",
          title: "Questions 31 – 35",
          instructions: "Look at the following viewpoints (Questions 31–35) and the list of entities below. Match each statement with the correct entity, A, B or C.",
          questions: [
            { questionNumber: 31, prompt: "Up to 375 million workers may need to switch occupational categories by 2030.", options: ["A. McKinsey Global Institute", "B. Professor David Autor", "C. Contemporary economic consensus"], correctAnswer: "A", explanation: "Paragraph B cites the McKinsey Global Institute study for the 375 million estimate.", passageEvidence: { paragraph: "B", quote: "McKinsey Global Institute, researchers estimated that up to 375 million workers" } },
            { questionNumber: 32, prompt: "Automated teller machines did not destroy overall bank teller employment.", options: ["A. McKinsey Global Institute", "B. Professor David Autor", "C. Contemporary economic consensus"], correctAnswer: "B", explanation: "Paragraph C notes Professor David Autor highlighted how ATMs transformed teller roles without eliminating jobs.", passageEvidence: { paragraph: "C", quote: "Professor David Autor of the Massachusetts Institute of Technology points out" } },
            { questionNumber: 33, prompt: "Technology often acts as a complementary partner rather than a pure replacement for labor.", options: ["A. McKinsey Global Institute", "B. Professor David Autor", "C. Contemporary economic consensus"], correctAnswer: "B", explanation: "Paragraph C quotes David Autor showing technology complements human labor.", passageEvidence: { paragraph: "C", quote: "technology often acts as a complement rather than a substitute" } },
            { questionNumber: 34, prompt: "Front-loaded education in a person\'s youth is inadequate for lifelong career demands.", options: ["A. McKinsey Global Institute", "B. Professor David Autor", "C. Contemporary economic consensus"], correctAnswer: "C", explanation: "Paragraph E explains forward-looking economists advocate for lifelong learning frameworks.", passageEvidence: { paragraph: "E", quote: "Traditional models of front-loaded education... are hopelessly obsolete" } },
            { questionNumber: 35, prompt: "Human workers maintain advantages in jobs requiring interpersonal empathy and negotiation.", options: ["A. McKinsey Global Institute", "B. Professor David Autor", "C. Contemporary economic consensus"], correctAnswer: "C", explanation: "Paragraph F highlights human comparative advantages in empathy, negotiation, and ethics.", passageEvidence: { paragraph: "F", quote: "human workers retain distinct comparative advantages over computational models" } }
          ]
        },
        {
          id: "c16-r1-qg8",
          type: "summary_completion",
          title: "Questions 36 – 40",
          instructions: "Complete the summary below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          summaryTitle: "Adapting to the Automated Workplace",
          wordLimitRule: "NO MORE THAN TWO WORDS",
          questions: [
            { questionNumber: 36, prompt: "Early 19th-century workers known as [ 36 ] protested against mechanical equipment in England.", correctAnswer: "Luddites", explanation: "Paragraph A: 'textile workers known as Luddites smashed mechanical looms.'", passageEvidence: { paragraph: "A", quote: "textile workers known as Luddites" } },
            { questionNumber: 37, prompt: "Unlike past industrial machines, digital algorithms can now perform complex [ 37 ] tasks.", correctAnswer: "cognitive", acceptedVariants: ["cognitive routines"], explanation: "Paragraph B: 'digital algorithms are now capable of executing complex cognitive routines.'", passageEvidence: { paragraph: "B", quote: "executing complex cognitive routines" } },
            { questionNumber: 38, prompt: "The decline of middle-wage roles has caused labor market [ 38 ] in Western economies.", correctAnswer: "polarization", acceptedVariants: ["labour market polarization"], explanation: "Paragraph D discusses the emerging phenomenon of 'labor market polarization'.", passageEvidence: { paragraph: "D", quote: "labor market polarization" } },
            { questionNumber: 39, prompt: "Economists recommend introducing [ 39 ] learning initiatives supported by government reskilling accounts.", correctAnswer: "lifelong", acceptedVariants: ["lifelong learning"], explanation: "Paragraph E: 'forward-looking economists advocate for lifelong learning frameworks.'", passageEvidence: { paragraph: "E", quote: "lifelong learning frameworks" } },
            { questionNumber: 40, prompt: "Enterprises achieve the highest resilience by designing [ 40 ] workflows combining AI with humans.", correctAnswer: "hybrid", acceptedVariants: ["hybrid collaborative"], explanation: "Paragraph F: 'building hybrid collaborative workflows where automated systems handle quantitative heavy lifting.'", passageEvidence: { paragraph: "F", quote: "building hybrid collaborative workflows" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 1 LISTENING
// ==========================================
export const cambridge16Test1Listening: IELTSMockTest = {
  id: "cambridge-16-test-1-listening",
  book: 16,
  testNumber: 1,
  module: "listening",
  title: "Cambridge 16 Academic Listening Test 1",
  durationMinutes: 35,
  audioUrl: "/audio/cam18-test1-part1.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Listening Part 1",
      subtitle: "Children's Engineering Workshops",
      audioUrl: "/audio/cam18-test1-part1.mp3",
      transcript: `
        RECEPTIONIST: Good morning, Highfield Youth Club. How can I help you?
        PARENT: Hello, I\'m calling to enquire about the weekend engineering workshops for children. My daughter Sarah is very keen on building things.
        RECEPTIONIST: That\'s wonderful! We run two distinct programs depending on age. The Junior Inventors is for children aged 6 to 9, and then we have the Master Robotics club for ages 10 to 14.
        PARENT: Sarah just turned eight last month, so Junior Inventors sounds perfect. Where are the sessions held?
        RECEPTIONIST: All sessions take place in our modern Science Centre located on Bridge Street, just opposite the library.
        PARENT: And what days and times?
        RECEPTIONIST: The Junior Inventors workshop runs every Saturday morning from 9:30 to 11:30 am.
        PARENT: What kind of projects do the children work on?
        RECEPTIONIST: We focus on practical, hands-on construction. For instance, in the first couple of weeks they build small wooden bridges to test load strength. Then in week three, they construct miniature catapults, which teaches them about kinetic energy.
        PARENT: Sounds fascinating. Do they need to bring any tools or materials?
        RECEPTIONIST: No, we supply everything, including safety goggles and aprons. But we do ask parents to ensure children wear flat shoes rather than sandals or flip-flops.
        PARENT: Understood. And how much does the term cost?
        RECEPTIONIST: It\'s 85 pounds for the six-week course. That includes all materials and a certificate of completion.
        PARENT: Excellent. How do I register?
        RECEPTIONIST: You can register online at our website or leave your details with me now.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg1",
          type: "form_completion",
          title: "Questions 1 – 10",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          summaryTitle: "Children\'s Engineering Workshops",
          wordLimitRule: "ONE WORD AND/OR A NUMBER",
          clozeTemplate: `
Children\'s Engineering Workshops
Club for ages 6–9: Junior {{1}}
Location: Science Centre on {{2}} Street (opposite the library)
Day & time: Every {{3}} morning from 9:30 to 11:30 am
Projects:
• Build small wooden {{4}} to test weight capacity
• Build miniature {{5}} to demonstrate kinetic energy
Requirements:
• Children must wear flat {{6}} (no sandals)
• Safety goggles and {{7}} provided by the club
Cost:
• £{{8}} for a 6-week course
• Includes all materials and a final {{9}}
Registration:
• Complete the form on the club\'s {{10}}
          `,
          questions: [
            { questionNumber: 1, prompt: "Club for ages 6–9: Junior [ 1 ]", correctAnswer: "Inventors", acceptedVariants: ["inventors"], explanation: "Transcript: 'The Junior Inventors is for children aged 6 to 9.'", passageEvidence: { paragraph: "Part 1", quote: "Junior Inventors" } },
            { questionNumber: 2, prompt: "Location: Science Centre on [ 2 ] Street", correctAnswer: "Bridge", acceptedVariants: ["bridge"], explanation: "Transcript: 'located on Bridge Street, just opposite the library.'", passageEvidence: { paragraph: "Part 1", quote: "on Bridge Street" } },
            { questionNumber: 3, prompt: "Day & time: Every [ 3 ] morning", correctAnswer: "Saturday", acceptedVariants: ["saturday"], explanation: "Transcript: 'runs every Saturday morning from 9:30 to 11:30 am.'", passageEvidence: { paragraph: "Part 1", quote: "every Saturday morning" } },
            { questionNumber: 4, prompt: "Build small wooden [ 4 ] to test weight capacity", correctAnswer: "bridges", acceptedVariants: ["bridge"], explanation: "Transcript: 'they build small wooden bridges to test load strength.'", passageEvidence: { paragraph: "Part 1", quote: "build small wooden bridges" } },
            { questionNumber: 5, prompt: "Build miniature [ 5 ] to demonstrate kinetic energy", correctAnswer: "catapults", acceptedVariants: ["catapult"], explanation: "Transcript: 'they construct miniature catapults, which teaches them about kinetic energy.'", passageEvidence: { paragraph: "Part 1", quote: "miniature catapults" } },
            { questionNumber: 6, prompt: "Children must wear flat [ 6 ]", correctAnswer: "shoes", explanation: "Transcript: 'ensure children wear flat shoes rather than sandals or flip-flops.'", passageEvidence: { paragraph: "Part 1", quote: "wear flat shoes" } },
            { questionNumber: 7, prompt: "Safety goggles and [ 7 ] provided", correctAnswer: "aprons", acceptedVariants: ["apron"], explanation: "Transcript: 'we supply everything, including safety goggles and aprons.'", passageEvidence: { paragraph: "Part 1", quote: "safety goggles and aprons" } },
            { questionNumber: 8, prompt: "Cost: £ [ 8 ] for a 6-week course", correctAnswer: "85", acceptedVariants: ["85 pounds"], explanation: "Transcript: 'It\'s 85 pounds for the six-week course.'", passageEvidence: { paragraph: "Part 1", quote: "85 pounds for the six-week course" } },
            { questionNumber: 9, prompt: "Includes all materials and a final [ 9 ]", correctAnswer: "certificate", acceptedVariants: ["certificate of completion"], explanation: "Transcript: 'Includes all materials and a certificate of completion.'", passageEvidence: { paragraph: "Part 1", quote: "certificate of completion" } },
            { questionNumber: 10, prompt: "Complete the form on the club\'s [ 10 ]", correctAnswer: "website", acceptedVariants: ["site"], explanation: "Transcript: 'You can register online at our website.'", passageEvidence: { paragraph: "Part 1", quote: "register online at our website" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Listening Part 2",
      subtitle: "Parkwood Community Centre Tour",
      audioUrl: "/audio/cam18-test1-part2.mp3",
      transcript: `
        GUIDE: Welcome to Parkwood Centre, everyone! We\'re delighted to show you our newly upgraded facilities. Over the past year, thanks to generous municipal funding and volunteer contributions, we\'ve completely revitalized the complex. First, let\'s look at our sports wing. Our gym has been expanded and fitted with low-impact cardiovascular equipment designed for all fitness levels. Next door, the multipurpose hall now features sprung oak flooring suitable for badminton, yoga, and community dances. Upstairs, we have created dedicated study carrels with high-speed fiber internet for local students. Regarding our volunteering program, we are actively recruiting invigilators and community mentors. If you can spare three hours on a Tuesday or Thursday, your assistance would make a world of difference to our after-school literacy tutoring.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg2",
          type: "multiple_choice",
          title: "Questions 11 – 15",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 11, prompt: "What major enhancement was made to the gym at Parkwood Centre?", options: ["A. A brand new Olympic swimming pool was added.", "B. Low-impact cardiovascular equipment was installed.", "C. A 24-hour weightlifting room was created."], correctAnswer: "B", explanation: "Guide mentions gym was fitted with low-impact cardiovascular equipment.", passageEvidence: { paragraph: "Part 2", quote: "fitted with low-impact cardiovascular equipment" } },
            { questionNumber: 12, prompt: "What special feature does the multipurpose hall floor have?", options: ["A. Heated concrete slabs.", "B. Sprung oak flooring.", "C. Recycled rubber tiles."], correctAnswer: "B", explanation: "Guide notes the multipurpose hall features sprung oak flooring.", passageEvidence: { paragraph: "Part 2", quote: "sprung oak flooring" } },
            { questionNumber: 13, prompt: "What facility was built upstairs for local students?", options: ["A. Soundproof music rehearsal rooms.", "B. Dedicated study carrels with fiber internet.", "C. A commercial cafeteria."], correctAnswer: "B", explanation: "Guide mentions dedicated study carrels with high-speed fiber internet.", passageEvidence: { paragraph: "Part 2", quote: "dedicated study carrels with high-speed fiber internet" } },
            { questionNumber: 14, prompt: "Which days are community mentors currently needed for volunteering?", options: ["A. Monday and Wednesday mornings.", "B. Tuesday or Thursday afternoons.", "C. Saturday evenings."], correctAnswer: "B", explanation: "Guide asks for volunteers who can spare three hours on a Tuesday or Thursday.", passageEvidence: { paragraph: "Part 2", quote: "spare three hours on a Tuesday or Thursday" } },
            { questionNumber: 15, prompt: "What is the primary objective of the after-school volunteer tutoring?", options: ["A. Improving youth literacy.", "B. Coaching junior football.", "C. Teaching introductory computer coding."], correctAnswer: "A", explanation: "Guide specifically highlights after-school literacy tutoring.", passageEvidence: { paragraph: "Part 2", quote: "after-school literacy tutoring" } }
          ]
        },
        {
          id: "c16-l1-qg3",
          type: "matching_features",
          title: "Questions 16 – 20",
          instructions: "What facility is recommended for each group? Choose FIVE answers from the box, A – G.",
          questions: [
            { questionNumber: 16, prompt: "Senior citizens", options: ["A. Sprung floor hall", "B. Low-impact gym", "C. Study carrels", "D. Outdoor sensory garden", "E. Cafe lounge", "F. Ceramic pottery studio", "G. IT training suite"], correctAnswer: "B", explanation: "Senior exercise programs take place in the low-impact gym.", passageEvidence: { paragraph: "Part 2", quote: "low-impact gym" } },
            { questionNumber: 17, prompt: "High school examination candidates", options: ["A. Sprung floor hall", "B. Low-impact gym", "C. Study carrels", "D. Outdoor sensory garden", "E. Cafe lounge", "F. Ceramic pottery studio", "G. IT training suite"], correctAnswer: "C", explanation: "Students preparing for exams use the quiet study carrels.", passageEvidence: { paragraph: "Part 2", quote: "study carrels" } },
            { questionNumber: 18, prompt: "Badminton players", options: ["A. Sprung floor hall", "B. Low-impact gym", "C. Study carrels", "D. Outdoor sensory garden", "E. Cafe lounge", "F. Ceramic pottery studio", "G. IT training suite"], correctAnswer: "A", explanation: "Badminton games are scheduled on the sprung oak floor hall.", passageEvidence: { paragraph: "Part 2", quote: "sprung oak flooring suitable for badminton" } },
            { questionNumber: 19, prompt: "Elderly gardening club", options: ["A. Sprung floor hall", "B. Low-impact gym", "C. Study carrels", "D. Outdoor sensory garden", "E. Cafe lounge", "F. Ceramic pottery studio", "G. IT training suite"], correctAnswer: "D", explanation: "Gardening club members meet in the outdoor sensory garden.", passageEvidence: { paragraph: "Part 2", quote: "outdoor sensory garden" } },
            { questionNumber: 20, prompt: "Remote job seekers", options: ["A. Sprung floor hall", "B. Low-impact gym", "C. Study carrels", "D. Outdoor sensory garden", "E. Cafe lounge", "F. Ceramic pottery studio", "G. IT training suite"], correctAnswer: "G", explanation: "Job seekers access the IT training suite for resume writing.", passageEvidence: { paragraph: "Part 2", quote: "IT training suite" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Listening Part 3",
      subtitle: "University Art Education Project",
      audioUrl: "/audio/cam18-test1-part3.mp3",
      transcript: `
        TUTOR: Good afternoon, Liam and Chloe. Let\'s discuss your collaborative research presentation on integrating art into primary school STEM curricula.
        CHLOE: Thanks, Dr. Vance. We\'ve collected case studies from five primary schools in Leeds that introduced weekly ceramics and painting into their science lessons.
        LIAM: What surprised us most was how children who previously struggled with abstract geometry grasped spatial concepts much faster when sculpting three-dimensional clay models.
        TUTOR: That aligns with cognitive developmental research on tactile learning. Did you notice any gender differences in engagement?
        CHLOE: Interestingly, no. Both boys and girls participated with equal enthusiasm. However, the teachers pointed out that lesson preparation took nearly twice as long because mixing non-toxic glazes and cleaning kilns required significant logistical effort.
        TUTOR: An important practical constraint to address in your recommendations. How will you structure your concluding slides?
        LIAM: We want to recommend that school districts provide pre-mixed art supply kits to relieve the burden on individual classroom teachers.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg4",
          type: "multiple_choice",
          title: "Questions 21 – 25",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 21, prompt: "What was the main focus of Liam and Chloe\'s research project?", options: ["A. Comparing funding between independent and state art schools.", "B. Integrating visual arts into primary school STEM lessons.", "C. Measuring the historical influence of Leeds ceramics."], correctAnswer: "B", explanation: "Chloe mentions integrating art into primary school STEM curricula.", passageEvidence: { paragraph: "Part 3", quote: "integrating art into primary school STEM curricula" } },
            { questionNumber: 22, prompt: "What unexpected cognitive benefit did Liam observe when students sculpted clay?", options: ["A. Better memorization of scientific vocabulary.", "B. Faster understanding of spatial geometry concepts.", "C. Improved interpersonal team leadership."], correctAnswer: "B", explanation: "Liam explains children grasped spatial concepts much faster when sculpting 3D models.", passageEvidence: { paragraph: "Part 3", quote: "grasped spatial concepts much faster" } },
            { questionNumber: 23, prompt: "What was the findings regarding student gender engagement?", options: ["A. Boys were significantly more enthusiastic than girls.", "B. Girls demonstrated higher artistic patience.", "C. Both boys and girls engaged with equal enthusiasm."], correctAnswer: "C", explanation: "Chloe says 'Both boys and girls participated with equal enthusiasm.'", passageEvidence: { paragraph: "Part 3", quote: "Both boys and girls participated with equal enthusiasm" } },
            { questionNumber: 24, prompt: "What major challenge was identified by the participating teachers?", options: ["A. High financial expense of kiln electricity.", "B. Excessive time required for lesson preparation and clean-up.", "C. Resistance from conservative parents."], correctAnswer: "B", explanation: "Chloe notes lesson preparation took twice as long due to cleaning and mixing.", passageEvidence: { paragraph: "Part 3", quote: "preparation took nearly twice as long" } },
            { questionNumber: 25, prompt: "What practical recommendation do the students suggest in their conclusion?", options: ["A. School districts should provide pre-mixed art kits.", "B. Schools should eliminate traditional mathematics exams.", "C. Teachers should receive mandatory art degrees."], correctAnswer: "A", explanation: "Liam recommends districts provide pre-mixed art supply kits.", passageEvidence: { paragraph: "Part 3", quote: "school districts provide pre-mixed art supply kits" } }
          ]
        },
        {
          id: "c16-l1-qg5",
          type: "multiple_choice_multi",
          title: "Questions 26 – 30",
          instructions: "Choose FIVE letters, A – H. Which FIVE research methods did Liam and Chloe use in their study?",
          questions: [
            { questionNumber: 26, prompt: "Research method 1", options: ["A. Classroom observation videos", "B. Semi-structured teacher interviews", "C. Student standardized math test scores", "D. Online parental surveys", "E. Peer feedback journals", "F. Photographic documentation of clay sculptures", "G. Focus groups with headmasters", "H. Blood pressure stress testing"], correctAnswer: "A", explanation: "Classroom video observations were recorded.", passageEvidence: { paragraph: "Part 3", quote: "observation" } },
            { questionNumber: 27, prompt: "Research method 2", options: ["A. Classroom observation videos", "B. Semi-structured teacher interviews", "C. Student standardized math test scores", "D. Online parental surveys", "E. Peer feedback journals", "F. Photographic documentation of clay sculptures", "G. Focus groups with headmasters", "H. Blood pressure stress testing"], correctAnswer: "B", explanation: "Teacher interviews provided qualitative insights.", passageEvidence: { paragraph: "Part 3", quote: "teacher interviews" } },
            { questionNumber: 28, prompt: "Research method 3", options: ["A. Classroom observation videos", "B. Semi-structured teacher interviews", "C. Student standardized math test scores", "D. Online parental surveys", "E. Peer feedback journals", "F. Photographic documentation of clay sculptures", "G. Focus groups with headmasters", "H. Blood pressure stress testing"], correctAnswer: "C", explanation: "Standardized test scores measured mathematical growth.", passageEvidence: { paragraph: "Part 3", quote: "math test scores" } },
            { questionNumber: 29, prompt: "Research method 4", options: ["A. Classroom observation videos", "B. Semi-structured teacher interviews", "C. Student standardized math test scores", "D. Online parental surveys", "E. Peer feedback journals", "F. Photographic documentation of clay sculptures", "G. Focus groups with headmasters", "H. Blood pressure stress testing"], correctAnswer: "D", explanation: "Parental questionnaires assessed home engagement.", passageEvidence: { paragraph: "Part 3", quote: "parental surveys" } },
            { questionNumber: 30, prompt: "Research method 5", options: ["A. Classroom observation videos", "B. Semi-structured teacher interviews", "C. Student standardized math test scores", "D. Online parental surveys", "E. Peer feedback journals", "F. Photographic documentation of clay sculptures", "G. Focus groups with headmasters", "H. Blood pressure stress testing"], correctAnswer: "F", explanation: "High-resolution photos recorded the students\' 3D pottery.", passageEvidence: { paragraph: "Part 3", quote: "photographic documentation" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Listening Part 4",
      subtitle: "The History of Tea and Global Commerce",
      audioUrl: "/audio/cam18-test1-part4.mp3",
      transcript: `
        LECTURER: Good morning, students. Today we continue our module on economic history with the remarkable story of tea. Originating in south-western China thousands of years ago, tea was initially valued primarily as a medicinal elixir rather than a recreational beverage. Buddhist monks drank green tea to maintain alert wakefulness during prolonged hours of meditation. During the Tang Dynasty, tea drinking became deeply ingrained in aristocratic culture, codified by the scholar Lu Yu in his classic treatise \'The Classic of Tea\'. In the early seventeenth century, Dutch merchant ships brought the first chests of Chinese green and black tea to Amsterdam. By the mid-eighteenth century, tea had supplanted ale and gin as Britain\'s national drink. The insatiable British demand for tea created a massive trade deficit with Qing dynasty China, because Chinese merchants accepted only silver bullion in exchange for tea leaves. To solve this currency drain, the British East India Company began illicitly smuggling opium cultivated in Bengal into Chinese coastal ports, directly sparking the devastating Opium Wars of the nineteenth century.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg6",
          type: "sentence_completion",
          title: "Questions 31 – 40",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          summaryTitle: "The Global History of Tea",
          wordLimitRule: "ONE WORD ONLY",
          clozeTemplate: `
The Early History of Tea:
• In ancient China, tea was first used as a {{31}} tonic
• Buddhist monks consumed tea to stay alert during {{32}}
• During the Tang Dynasty, the scholar Lu Yu published an influential {{33}} on tea culture
Spread to Europe:
• The first tea shipments reached Europe via {{34}} merchant vessels
• By the mid-18th century, tea replaced ale and {{35}} in Britain
Economic Impacts:
• British tea consumption caused a severe trade {{36}} with China
• Chinese merchants demanded payment exclusively in {{37}}
• The East India Company financed tea imports by smuggling {{38}}
• This illicit commerce provoked armed conflict known as the {{39}} Wars
• British botanists later established vast tea plantations in {{40}} (Assam and Darjeeling)
          `,
          questions: [
            { questionNumber: 31, prompt: "Tea was first used as a [ 31 ] tonic", correctAnswer: "medicinal", acceptedVariants: ["medicine"], explanation: "Lecturer: 'initially valued primarily as a medicinal elixir.'", passageEvidence: { paragraph: "Part 4", quote: "medicinal elixir" } },
            { questionNumber: 32, prompt: "Buddhist monks consumed tea to stay alert during [ 32 ]", correctAnswer: "meditation", explanation: "Lecturer: 'maintain alert wakefulness during prolonged hours of meditation.'", passageEvidence: { paragraph: "Part 4", quote: "hours of meditation" } },
            { questionNumber: 33, prompt: "The scholar Lu Yu published an influential [ 33 ] on tea culture", correctAnswer: "treatise", acceptedVariants: ["book"], explanation: "Lecturer: 'codified by the scholar Lu Yu in his classic treatise.'", passageEvidence: { paragraph: "Part 4", quote: "classic treatise" } },
            { questionNumber: 34, prompt: "The first tea shipments reached Europe via [ 34 ] merchant vessels", correctAnswer: "Dutch", acceptedVariants: ["dutch"], explanation: "Lecturer: 'Dutch merchant ships brought the first chests.'", passageEvidence: { paragraph: "Part 4", quote: "Dutch merchant ships" } },
            { questionNumber: 35, prompt: "Tea replaced ale and [ 35 ] in Britain", correctAnswer: "gin", explanation: "Lecturer: 'tea had supplanted ale and gin as Britain\'s national drink.'", passageEvidence: { paragraph: "Part 4", quote: "supplanted ale and gin" } },
            { questionNumber: 36, prompt: "British tea consumption caused a severe trade [ 36 ] with China", correctAnswer: "deficit", explanation: "Lecturer: 'created a massive trade deficit with Qing dynasty China.'", passageEvidence: { paragraph: "Part 4", quote: "trade deficit" } },
            { questionNumber: 37, prompt: "Chinese merchants demanded payment exclusively in [ 37 ]", correctAnswer: "silver", acceptedVariants: ["silver bullion"], explanation: "Lecturer: 'Chinese merchants accepted only silver bullion.'", passageEvidence: { paragraph: "Part 4", quote: "silver bullion" } },
            { questionNumber: 38, prompt: "The East India Company financed imports by smuggling [ 38 ]", correctAnswer: "opium", explanation: "Lecturer: 'illicitly smuggling opium cultivated in Bengal.'", passageEvidence: { paragraph: "Part 4", quote: "smuggling opium" } },
            { questionNumber: 39, prompt: "This illicit commerce provoked armed conflict known as the [ 39 ] Wars", correctAnswer: "Opium", acceptedVariants: ["opium"], explanation: "Lecturer: 'directly sparking the devastating Opium Wars.'", passageEvidence: { paragraph: "Part 4", quote: "Opium Wars" } },
            { questionNumber: 40, prompt: "British botanists later established vast tea plantations in [ 40 ]", correctAnswer: "India", acceptedVariants: ["india", "Assam"], explanation: "Lecturer notes British botanists established plantations in India (Assam and Darjeeling).", passageEvidence: { paragraph: "Part 4", quote: "plantations in India" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 1 WRITING
// ==========================================
export const cambridge16Test1Writing: IELTSMockTest = {
  id: "cambridge-16-test-1-writing",
  book: 16,
  testNumber: 1,
  module: "writing",
  title: "Cambridge 16 Academic Writing Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Ownership of electrical appliances and housework hours (1920–2019)",
      passageContent: `<div class="my-6 p-4 bg-white border border-slate-300 rounded-xl shadow-xs">
  <div class="text-center font-bold text-slate-900 text-sm mb-1">Percentage of households with electrical appliances (1920–2019)</div>
  <svg viewBox="0 0 600 240" class="w-full h-auto max-w-xl mx-auto font-sans">
    <line x1="60" y1="20" x2="60" y2="200" stroke="#cbd5e1" stroke-width="1.5" />
    <line x1="60" y1="200" x2="570" y2="200" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="50" y="205" text-anchor="end" font-size="10" fill="#64748b">0%</text>
    <text x="50" y="155" text-anchor="end" font-size="10" fill="#64748b">25%</text>
    <text x="50" y="110" text-anchor="end" font-size="10" fill="#64748b">50%</text>
    <text x="50" y="65" text-anchor="end" font-size="10" fill="#64748b">75%</text>
    <text x="50" y="25" text-anchor="end" font-size="10" fill="#64748b">100%</text>
    <line x1="60" y1="155" x2="570" y2="155" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3,3" />
    <line x1="60" y1="110" x2="570" y2="110" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3,3" />
    <line x1="60" y1="65" x2="570" y2="65" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3,3" />
    <line x1="60" y1="25" x2="570" y2="25" stroke="#f1f5f9" stroke-width="1" stroke-dasharray="3,3" />
    <text x="80" y="218" text-anchor="middle" font-size="10" fill="#64748b">1920</text>
    <text x="170" y="218" text-anchor="middle" font-size="10" fill="#64748b">1940</text>
    <text x="260" y="218" text-anchor="middle" font-size="10" fill="#64748b">1960</text>
    <text x="350" y="218" text-anchor="middle" font-size="10" fill="#64748b">1980</text>
    <text x="440" y="218" text-anchor="middle" font-size="10" fill="#64748b">2000</text>
    <text x="540" y="218" text-anchor="middle" font-size="10" fill="#64748b">2019</text>
    <polyline fill="none" stroke="#2563eb" stroke-width="2.5" points="80,200 170,95 260,35 350,25 440,25 540,25" />
    <polyline fill="none" stroke="#dc2626" stroke-width="2.5" stroke-dasharray="5,3" points="80,145 170,110 260,70 350,35 440,25 540,25" />
    <polyline fill="none" stroke="#059669" stroke-width="2.5" points="80,125 170,88 260,70 350,78 440,68 540,65" />
  </svg>
  <div class="flex flex-wrap items-center justify-center gap-5 mt-2 text-xs">
    <div class="flex items-center gap-1.5"><span class="w-3.5 h-1 bg-blue-600 rounded"></span><span class="font-semibold text-slate-700">Refrigerator</span></div>
    <div class="flex items-center gap-1.5"><span class="w-3.5 h-1 bg-red-600 rounded border border-dashed border-red-600"></span><span class="font-semibold text-slate-700">Vacuum cleaner</span></div>
    <div class="flex items-center gap-1.5"><span class="w-3.5 h-1 bg-emerald-600 rounded"></span><span class="font-semibold text-slate-700">Washing machine</span></div>
  </div>
  <div class="text-center font-bold text-slate-900 text-sm mt-5 mb-1">Number of hours of housework per week per household (1920–2019)</div>
  <svg viewBox="0 0 600 140" class="w-full h-auto max-w-xl mx-auto font-sans">
    <line x1="60" y1="15" x2="60" y2="105" stroke="#cbd5e1" stroke-width="1.5" />
    <line x1="60" y1="105" x2="570" y2="105" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="50" y="108" text-anchor="end" font-size="10" fill="#64748b">0</text>
    <text x="50" y="75" text-anchor="end" font-size="10" fill="#64748b">20</text>
    <text x="50" y="45" text-anchor="end" font-size="10" fill="#64748b">40</text>
    <text x="50" y="18" text-anchor="end" font-size="10" fill="#64748b">60</text>
    <text x="80" y="120" text-anchor="middle" font-size="10" fill="#64748b">1920</text>
    <text x="170" y="120" text-anchor="middle" font-size="10" fill="#64748b">1940</text>
    <text x="260" y="120" text-anchor="middle" font-size="10" fill="#64748b">1960</text>
    <text x="350" y="120" text-anchor="middle" font-size="10" fill="#64748b">1980</text>
    <text x="440" y="120" text-anchor="middle" font-size="10" fill="#64748b">2000</text>
    <text x="540" y="120" text-anchor="middle" font-size="10" fill="#64748b">2019</text>
    <polyline fill="none" stroke="#7c3aed" stroke-width="2.5" points="80,30 170,55 260,78 350,86 440,90 540,93" />
  </svg>
</div>`,
      questionGroups: [
        {
          id: "c16-w1-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The charts below show the changes in ownership of electrical appliances and amount of time spent doing housework in households in one country between 1920 and 2019.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Responses are evaluated by consultancy examiners across Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Researching building history essay",
      passageContent: `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm">
          <p class="font-bold text-slate-900 mb-1">WRITING TASK 2 TOPIC:</p>
          <p class="italic text-slate-700">"In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in. What are the reasons for this? How can people research this?"</p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-w1-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in.\n\nWhat are the reasons for this?\nHow can people research this?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluated on Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 2 READING
// ==========================================
export const cambridge16Test2Reading: IELTSMockTest = {
  id: "cambridge-16-test-2-reading",
  book: 16,
  testNumber: 2,
  module: "reading",
  title: "Cambridge 16 Academic Reading Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Reading Passage 1",
      subtitle: "The White Horse of Uffington",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            The cutting of huge figures or ‘geoglyphs’ into the earth of English hillsides has taken place for more than 3,000 years. There are 56 hill figures scattered around England, with the vast majority on the chalk downlands of the southern counties. The most famous of these figures is the Uffington White Horse.
          </p>
          <p>
            <strong>A.</strong> The Uffington White Horse is a highly stylized prehistoric hill figure carved into the upper slopes of Whitehorse Hill in Oxfordshire, England. Measuring 110 metres (360 feet) in length, the figure consists of a graceful, minimalist equine design created by trenching deep trenches into the turf and filling them with crushed white chalk. Seen from across the Vale of White Horse, the radiant white figure stands out dramatically against the emerald green turf of the Berkshire Downs.
          </p>
          <p>
            <strong>B.</strong> For centuries, antiquarians and local historians debated the precise chronological origins of the horse. Medieval folklore attributed the creation of the carving to King Alfred the Great in the 9th century CE to celebrate his legendary victory over Danish Viking invaders at the Battle of Ashdown. In the 18th and 19th centuries, scholars speculated that it might be Iron Age in origin, noting stylistic similarities between the horse and abstract animal depictions stamped onto Celtic coins from the 1st century BCE.
          </p>
          <p>
            <strong>C.</strong> In the 1990s, modern archaeological science decisively resolved the debate. A scientific research team led by the Oxford Archaeological Unit used optical stimulated luminescence (OSL) dating on soil sediment samples extracted from the deepest strata of the chalk trenches. The OSL testing revealed that the figure was constructed between 1400 BCE and 600 BCE, placing its creation firmly in the late Bronze Age or early Iron Age—far older than anyone had previously anticipated.
          </p>
          <p>
            <strong>D.</strong> Why prehistoric communities expended thousands of hours carving and maintaining such a colossal landscape monument remains a subject of intense academic inquiry. Because the complete horse is best appreciated from several miles away or from the air, anthropologists suggest it functioned as a territorial boundary marker or a sacred tribal emblem. Furthermore, religious historians suggest the horse may be associated with sun worship, as Bronze Age mythology across Europe frequently depicted horses pulling the sun across the heavens in a solar chariot.
          </p>
          <p>
            <strong>E.</strong> The survival of the Uffington White Horse across three millennia is itself an extraordinary testament to communal tradition. Because exposed chalk trenches would naturally become overgrown with grass and weed within a single generation, the figure required continuous 'scouring'—the regular weeding, digging, and re-chalking of the outlines. Historical records document periodic community scouring festivals organized by local lords, where hundreds of villagers gathered to clean the horse, followed by traditional games, feasting, and fairs at the nearby Iron Age hillfort of Uffington Castle.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r2-qg1",
          type: "true_false_not_given",
          title: "Questions 1 – 7",
          instructions: "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
          questions: [
            { questionNumber: 1, prompt: "The majority of England\'s hill figures are situated on chalk downlands in southern counties.", correctAnswer: "TRUE", explanation: "Paragraph 1 states vast majority are on the chalk downlands of the southern counties.", passageEvidence: { paragraph: "1", quote: "vast majority on the chalk downlands of the southern counties" } },
            { questionNumber: 2, prompt: "The Uffington White Horse measures exactly 150 metres in length.", correctAnswer: "FALSE", explanation: "Paragraph A states it measures 110 metres (360 feet) in length.", passageEvidence: { paragraph: "A", quote: "Measuring 110 metres (360 feet) in length" } },
            { questionNumber: 3, prompt: "Medieval folklore linked the carving to King Alfred\'s victory over Viking invaders.", correctAnswer: "TRUE", explanation: "Paragraph B explains medieval folklore attributed the carving to King Alfred celebrating victory at the Battle of Ashdown.", passageEvidence: { paragraph: "B", quote: "attributed the creation of the carving to King Alfred the Great" } },
            { questionNumber: 4, prompt: "OSL testing proved that the horse was created during the Viking Age in the 9th century.", correctAnswer: "FALSE", explanation: "Paragraph C states OSL testing placed creation between 1400 BCE and 600 BCE, in the late Bronze Age or early Iron Age.", passageEvidence: { paragraph: "C", quote: "constructed between 1400 BCE and 600 BCE" } },
            { questionNumber: 5, prompt: "Antiquarians extracted gold jewellery from the soil beneath the chalk trenches.", correctAnswer: "NOT GIVEN", explanation: "Paragraph C discusses soil sediment samples extracted for OSL dating, with no mention of gold jewellery.", passageEvidence: { paragraph: "C", quote: "soil sediment samples extracted" } },
            { questionNumber: 6, prompt: "The figure would naturally disappear under weeds without regular maintenance.", correctAnswer: "TRUE", explanation: "Paragraph E notes exposed chalk trenches would become overgrown with grass and weed within a single generation.", passageEvidence: { paragraph: "E", quote: "would naturally become overgrown with grass and weed" } },
            { questionNumber: 7, prompt: "Community scouring festivals were held exclusively on midsummer night.", correctAnswer: "NOT GIVEN", explanation: "Paragraph E mentions periodic scouring festivals accompanied by games and fairs, but does not state they were held exclusively on midsummer night.", passageEvidence: { paragraph: "E", quote: "periodic community scouring festivals" } }
          ]
        },
        {
          id: "c16-r2-qg2",
          type: "sentence_completion",
          title: "Questions 8 – 13",
          instructions: "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Features of the Uffington White Horse",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 8, prompt: "The trenches forming the horse are filled with crushed white [ 8 ].", correctAnswer: "chalk", explanation: "Paragraph A: 'trenching deep trenches into the turf and filling them with crushed white chalk.'", passageEvidence: { paragraph: "A", quote: "crushed white chalk" } },
            { questionNumber: 9, prompt: "Scholars noted similarities between the hill figure and animal drawings on Celtic [ 9 ].", correctAnswer: "coins", explanation: "Paragraph B: 'stylistic similarities between the horse and abstract animal depictions stamped onto Celtic coins.'", passageEvidence: { paragraph: "B", quote: "stamped onto Celtic coins" } },
            { questionNumber: 10, prompt: "Soil sediment samples were tested using optical stimulated [ 10 ] dating.", correctAnswer: "luminescence", acceptedVariants: ["OSL"], explanation: "Paragraph C: 'used optical stimulated luminescence (OSL) dating.'", passageEvidence: { paragraph: "C", quote: "optical stimulated luminescence" } },
            { questionNumber: 11, prompt: "The figure may have marked a tribal [ 11 ] between neighboring communities.", correctAnswer: "boundary", explanation: "Paragraph D: 'functioned as a territorial boundary marker.'", passageEvidence: { paragraph: "D", quote: "territorial boundary marker" } },
            { questionNumber: 12, prompt: "European Bronze Age myths often showed horses pulling the [ 12 ] across the sky.", correctAnswer: "sun", explanation: "Paragraph D: 'depicted horses pulling the sun across the heavens in a solar chariot.'", passageEvidence: { paragraph: "D", quote: "pulling the sun across the heavens" } },
            { questionNumber: 13, prompt: "Community maintenance of the figure was known locally as [ 13 ].", correctAnswer: "scouring", explanation: "Paragraph E: 'the figure required continuous \'scouring\'.' ", passageEvidence: { paragraph: "E", quote: "continuous \'scouring\'" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Reading Passage 2",
      subtitle: "I Contain Multitudes: The Human Microbiome",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Your body is home to tens of trillions of microscopic organisms—bacteria, viruses, fungi, and archaea. Far from being passive freeloaders or infectious enemies, these microbial inhabitants are indispensable partners in human biology.
          </p>
          <p>
            <strong>A.</strong> In his acclaimed book <em>I Contain Multitudes</em>, science journalist Ed Yong explores the profound symbiotic relationships between animals and their resident microbes. For over a century following Louis Pasteur and Robert Koch, biomedical science adopted a predominantly militaristic perspective toward bacteria: microbes were considered dangerous pathogens to be sterilized, sanitized, and eliminated. Today, an intellectual revolution is underway, recognizing that the human microbiome is an essential organ in its own right.
          </p>
          <p>
            <strong>B.</strong> Every individual harbors an estimated 39 trillion bacterial cells, roughly matching or exceeding the total number of human cells in the body. The majority reside in the gastrointestinal tract, especially the large intestine. These gut microbes encode over three million distinct genes—150 times more than the human genome. They perform essential metabolic feats that our human biology cannot manage alone, including fermenting complex dietary fibers into short-chain fatty acids, synthesizing essential vitamin K and B12, and neutralizing environmental carcinogens.
          </p>
          <p>
            <strong>C.</strong> Perhaps most critically, the microbiome plays an indispensable role in educating and calibrating the human immune system. During infancy, the newborn\'s gut is colonized by microbes acquired during birth and through breastfeeding. Oligosaccharides found in human breast milk cannot be digested by human infants; instead, they serve specifically to nourish beneficial bacteria such as <em>Bifidobacterium infantis</em>. In turn, these bacteria train infant white blood cells to distinguish between harmless dietary proteins and genuine pathogens, preventing hyperactive allergic reactions such as asthma, eczema, and autoimmune disorders.
          </p>
          <p>
            <strong>D.</strong> Conversely, the overuse of broad-spectrum antibiotics, sterile modern lifestyles, and diets heavy in ultra-processed sugars have wrought collateral damage upon our internal ecosystems. When diverse native bacteria are eradicated by repeated antibiotic courses, opportunistic pathogens like <em>Clostridioides difficile</em> can flourish, causing life-threatening colon inflammation. Remarkably, one of the most effective treatments for recurrent <em>C. diff</em> is not another pharmaceutical antibiotic, but fecal microbiota transplantation (FMT)—transferring stool microbes from a healthy donor into the patient\'s colon, which restores ecological balance in over 90 percent of cases.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r2-qg3",
          type: "summary_completion",
          title: "Questions 14 – 19",
          instructions: "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "The Human Microbiome and Health",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 14, prompt: "In the 19th century, scientists predominantly treated bacteria as dangerous [ 14 ].", correctAnswer: "pathogens", acceptedVariants: ["enemies"], explanation: "Paragraph A states microbes were considered dangerous pathogens to be eliminated.", passageEvidence: { paragraph: "A", quote: "considered dangerous pathogens" } },
            { questionNumber: 15, prompt: "The largest population of human bacteria lives in the large [ 15 ].", correctAnswer: "intestine", acceptedVariants: ["colon"], explanation: "Paragraph B: 'reside in the gastrointestinal tract, especially the large intestine.'", passageEvidence: { paragraph: "B", quote: "especially the large intestine" } },
            { questionNumber: 16, prompt: "Gut microbes synthesize vital vitamins like [ 16 ] and vitamin K.", correctAnswer: "B12", acceptedVariants: ["vitamin B12"], explanation: "Paragraph B mentions synthesizing essential vitamin K and B12.", passageEvidence: { paragraph: "B", quote: "synthesizing essential vitamin K and B12" } },
            { questionNumber: 17, prompt: "Special sugars in mother\'s milk feed helpful bacteria called [ 17 ].", correctAnswer: "Bifidobacterium", acceptedVariants: ["Bifidobacterium infantis"], explanation: "Paragraph C highlights nourishing beneficial bacteria such as Bifidobacterium infantis.", passageEvidence: { paragraph: "C", quote: "nourish beneficial bacteria such as Bifidobacterium infantis" } },
            { questionNumber: 18, prompt: "Immune training in infants helps prevent conditions like [ 18 ] and eczema.", correctAnswer: "asthma", explanation: "Paragraph C points out preventing hyperactive allergic reactions such as asthma and eczema.", passageEvidence: { paragraph: "C", quote: "reactions such as asthma, eczema" } },
            { questionNumber: 19, prompt: "Fecal microbiota transplantation introduces stool from a healthy [ 19 ] to restore balance.", correctAnswer: "donor", explanation: "Paragraph D: 'transferring stool microbes from a healthy donor.'", passageEvidence: { paragraph: "D", quote: "stool microbes from a healthy donor" } }
          ]
        },
        {
          id: "c16-r2-qg4",
          type: "multiple_choice",
          title: "Questions 20 – 26",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 20, prompt: "What historical attitude toward bacteria is described in Paragraph A?", options: ["A. Ancient physicians worshipped bacteria as spiritual protectors.", "B. 19th-century science treated microbes as enemies that must be eliminated.", "C. Pasteur proved that all bacteria are harmless to humans.", "D. Robert Koch suggested adding bacteria to tap water."], correctAnswer: "B", explanation: "Paragraph A explains biomedical science adopted a militaristic perspective: microbes were considered dangerous pathogens to be eliminated.", passageEvidence: { paragraph: "A", quote: "microbes were considered dangerous pathogens to be sterilized" } },
            { questionNumber: 21, prompt: "How does the genetic diversity of gut bacteria compare to human genes?", options: ["A. Gut microbes have 150 times more genes than the human genome.", "B. Human cells contain more genetic code than all bacteria combined.", "C. Microbes have fewer genes but mutate much faster.", "D. Gut bacteria share identical DNA sequences with human white blood cells."], correctAnswer: "A", explanation: "Paragraph B states gut microbes encode over three million genes—150 times more than the human genome.", passageEvidence: { paragraph: "B", quote: "150 times more than the human genome" } },
            { questionNumber: 22, prompt: "Why can human infants not digest oligosaccharides in breast milk directly?", options: ["A. Because infant stomach acid is too strong.", "B. Because these sugars are meant to feed beneficial gut bacteria instead.", "C. Because mothers lack the necessary enzymes to synthesize sugar.", "D. Because human infants are naturally lactose intolerant."], correctAnswer: "B", explanation: "Paragraph C clarifies they serve specifically to nourish beneficial bacteria.", passageEvidence: { paragraph: "C", quote: "serve specifically to nourish beneficial bacteria" } },
            { questionNumber: 23, prompt: "What danger is associated with the overuse of broad-spectrum antibiotics?", options: ["A. It permanently turns skin yellow.", "B. It eliminates beneficial bacteria, allowing pathogens like C. diff to multiply.", "C. It prevents humans from tasting sweetness.", "D. It causes hair follicles to stop growing."], correctAnswer: "B", explanation: "Paragraph D explains native bacteria are eradicated, allowing pathogens like Clostridioides difficile to flourish.", passageEvidence: { paragraph: "D", quote: "opportunistic pathogens like Clostridioides difficile can flourish" } },
            { questionNumber: 24, prompt: "What makes fecal microbiota transplantation (FMT) remarkable?", options: ["A. It is manufactured by artificial intelligence robotics.", "B. It cures recurrent C. diff in over 90% of cases by restoring ecological balance.", "C. It requires no clinical supervision or screening.", "D. It has been practiced continuously since ancient Egyptian times."], correctAnswer: "B", explanation: "Paragraph D notes FMT restores ecological balance in over 90 percent of cases.", passageEvidence: { paragraph: "D", quote: "restores ecological balance in over 90 percent of cases" } },
            { questionNumber: 25, prompt: "What general conclusion does the passage draw regarding the human microbiome?", options: ["A. Microbes are an essential internal organ rather than external enemies.", "B. Humans should take daily antibiotics to sanitize their digestive systems.", "C. Future medicine will eliminate all bacteria from the human body.", "D. Most human illnesses are caused by friendly bacteria."], correctAnswer: "A", explanation: "Paragraph A and B emphasize the microbiome is an essential organ in its own right.", passageEvidence: { paragraph: "A", quote: "essential organ in its own right" } },
            { questionNumber: 26, prompt: "What role do short-chain fatty acids play in the human body?", options: ["A. They are waste products that must be filtered by kidneys.", "B. They result from fiber fermentation and support metabolic health.", "C. They destroy tooth enamel.", "D. They replace human bone minerals."], correctAnswer: "B", explanation: "Paragraph B mentions fermenting dietary fibers into short-chain fatty acids.", passageEvidence: { paragraph: "B", quote: "fermenting complex dietary fibers into short-chain fatty acids" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Reading Passage 3",
      subtitle: "How to Make Wise Decisions",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Across cultures and centuries, wisdom has been revered as the pinnacle of human decision-making. Recent psychological research demonstrates that wise judgment is not an immutable personality trait, but a cognitive skill that can be systematically trained.
          </p>
          <p>
            <strong>A.</strong> Historical traditions frequently depict wisdom as the exclusive domain of venerable philosophers or elderly sages who have accumulated decades of worldly experience. However, empirical research led by Professor Igor Grossmann at the University of Waterloo in Canada challenges this traditional stereotype. Grossmann\'s work suggests that wisdom is highly malleable and contextual: the same individual may display exceptional wisdom in one dilemma and shocking foolishness in another, depending on their emotional mindset and cognitive perspective.
          </p>
          <p>
            <strong>B.</strong> Grossmann and his colleagues define wise reasoning across four core competencies: intellectual humility (recognizing the limits of one\'s own knowledge), appreciation of broader perspectives beyond one\'s immediate viewpoint, recognition of uncertainty and the possibility of change, and a commitment to integrating diverse interests into a workable compromise. When experimental subjects demonstrate these four faculties, their solutions to complex interpersonal and geopolitical crises are judged significantly wiser by independent panels of ethicists and psychologists.
          </p>
          <p>
            <strong>C.</strong> One of the most intriguing insights uncovered by Grossmann\'s laboratory is known as the 'Solomon\'s paradox', named after King Solomon of ancient Israel. Solomon was renowned for dispensing impeccably wise judgments to citizens who came to his court, yet in his personal life, he made disastrous financial and romantic choices that ultimately led to the collapse of his kingdom. Grossmann\'s research confirmed that people reason far more wisely about other people\'s predicaments than about their own personal dilemmas.
          </p>
          <p>
            <strong>D.</strong> Why do we fall victim to Solomon\'s paradox? The answer lies in egocentric immersion. When confronting our own problems, our visual and psychological perspective is deeply self-centered. We become overwhelmed by immediate emotional anxiety, defensiveness, and pride. In contrast, when considering a friend\'s problem, we observe the situation from a detached, third-person perspective, making it far easier to evaluate trade-offs objectively and recognize long-term consequences.
          </p>
          <p>
            <strong>E.</strong> Fortunately, psychologists have developed a remarkably simple cognitive intervention called 'self-distancing'. In controlled experiments, participants instructed to analyze their own personal crises in the third person (using their name or the pronouns 'he' or 'she' instead of 'I') immediately demonstrated higher intellectual humility, greater recognition of compromise, and less emotional reactivity. By training ourselves to adopt the perspective of an external observer, we can transcend our egocentric biases and unlock wiser decision-making in daily life.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r2-qg5",
          type: "multiple_choice",
          title: "Questions 27 – 30",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 27, prompt: "What traditional stereotype does Professor Igor Grossmann\'s research challenge?", options: ["A. That wisdom can only be achieved by elderly sages with decades of experience.", "B. That wisdom is closely correlated with mathematical ability.", "C. That wisdom is forbidden in Western academic circles.", "D. That women possess higher emotional intelligence than men."], correctAnswer: "A", explanation: "Paragraph A states his work challenges the stereotype that wisdom is the exclusive domain of venerable philosophers or elderly sages.", passageEvidence: { paragraph: "A", quote: "challenges this traditional stereotype" } },
            { questionNumber: 28, prompt: "Which of the following is NOT one of Grossmann\'s four core competencies of wise reasoning?", options: ["A. Intellectual humility.", "B. Rapid mathematical computation under pressure.", "C. Recognition of uncertainty and change.", "D. Integration of diverse interests into compromise."], correctAnswer: "B", explanation: "Paragraph B lists intellectual humility, broader perspectives, uncertainty, and compromise, but not mathematical computation.", passageEvidence: { paragraph: "B", quote: "intellectual humility... broader perspectives... uncertainty... compromise" } },
            { questionNumber: 29, prompt: "What characterizes the \'Solomon\'s paradox\'?", options: ["A. Being unable to remember advice given by parents.", "B. Giving wise advice to others while making foolish personal choices.", "C. Refusing to negotiate in international trade disputes.", "D. Failing to understand moral parables in literature."], correctAnswer: "B", explanation: "Paragraph C notes Solomon gave impeccably wise judgments to others while making disastrous personal choices.", passageEvidence: { paragraph: "C", quote: "people reason far more wisely about other people\'s predicaments than about their own" } },
            { questionNumber: 30, prompt: "Why do people struggle to reason wisely about their own problems?", options: ["A. Because personal dilemmas trigger egocentric immersion and emotional defensiveness.", "B. Because personal problems involve smaller sums of money.", "C. Because modern education discourages personal reflection.", "D. Because third-person pronouns are banned in courtrooms."], correctAnswer: "A", explanation: "Paragraph D explains that in our own problems we are overwhelmed by immediate emotional anxiety, defensiveness, and pride.", passageEvidence: { paragraph: "D", quote: "egocentric immersion... emotional anxiety, defensiveness, and pride" } }
          ]
        },
        {
          id: "c16-r2-qg6",
          type: "matching_features",
          title: "Questions 31 – 35",
          instructions: "Match each research concept (Questions 31–35) with the correct description, A, B, C or D.",
          questions: [
            { questionNumber: 31, prompt: "Intellectual humility", options: ["A. Accepting the limitations of one\'s own knowledge", "B. Adopting a detached third-person perspective", "C. Giving better advice to others than to oneself", "D. Unifying opposing viewpoints into a functional compromise"], correctAnswer: "A", explanation: "Paragraph B defines intellectual humility as recognizing the limits of one\'s own knowledge.", passageEvidence: { paragraph: "B", quote: "recognizing the limits of one\'s own knowledge" } },
            { questionNumber: 32, prompt: "Solomon\'s paradox", options: ["A. Accepting the limitations of one\'s own knowledge", "B. Adopting a detached third-person perspective", "C. Giving better advice to others than to oneself", "D. Unifying opposing viewpoints into a functional compromise"], correctAnswer: "C", explanation: "Paragraph C explains people reason far more wisely about others\' issues than their own.", passageEvidence: { paragraph: "C", quote: "reason far more wisely about other people\'s predicaments" } },
            { questionNumber: 33, prompt: "Self-distancing", options: ["A. Accepting the limitations of one\'s own knowledge", "B. Adopting a detached third-person perspective", "C. Giving better advice to others than to oneself", "D. Unifying opposing viewpoints into a functional compromise"], correctAnswer: "B", explanation: "Paragraph E describes self-distancing as analyzing personal problems in the third person like an external observer.", passageEvidence: { paragraph: "E", quote: "adopt the perspective of an external observer" } },
            { questionNumber: 34, prompt: "Integration of diverse perspectives", options: ["A. Accepting the limitations of one\'s own knowledge", "B. Adopting a detached third-person perspective", "C. Giving better advice to others than to oneself", "D. Unifying opposing viewpoints into a functional compromise"], correctAnswer: "D", explanation: "Paragraph B emphasizes integrating diverse interests into a workable compromise.", passageEvidence: { paragraph: "B", quote: "integrating diverse interests into a workable compromise" } },
            { questionNumber: 35, prompt: "Egocentric immersion", options: ["A. Narrow focus driven by immediate defensiveness and pride", "B. Adopting a detached third-person perspective", "C. Giving better advice to others than to oneself", "D. Unifying opposing viewpoints into a functional compromise"], correctAnswer: "A", explanation: "Paragraph D explains egocentric immersion overwhelms us with self-centered anxiety and defensiveness.", passageEvidence: { paragraph: "D", quote: "overwhelmed by immediate emotional anxiety, defensiveness" } }
          ]
        },
        {
          id: "c16-r2-qg7",
          type: "sentence_completion",
          title: "Questions 36 – 40",
          instructions: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          summaryTitle: "Training for Wisdom",
          wordLimitRule: "NO MORE THAN TWO WORDS",
          questions: [
            { questionNumber: 36, prompt: "Research by Igor Grossmann demonstrates that wisdom is malleable and [ 36 ].", correctAnswer: "contextual", explanation: "Paragraph A states wisdom is highly malleable and contextual.", passageEvidence: { paragraph: "A", quote: "wisdom is highly malleable and contextual" } },
            { questionNumber: 37, prompt: "King Solomon made disastrous choices regarding his [ 37 ] and personal life.", correctAnswer: "financial", acceptedVariants: ["finances"], explanation: "Paragraph C notes he made disastrous financial and romantic choices.", passageEvidence: { paragraph: "C", quote: "disastrous financial and romantic choices" } },
            { questionNumber: 38, prompt: "When considering a friend\'s dilemma, people naturally adopt a [ 38 ] perspective.", correctAnswer: "third-person", acceptedVariants: ["detached"], explanation: "Paragraph D explains we observe from a detached, third-person perspective.", passageEvidence: { paragraph: "D", quote: "detached, third-person perspective" } },
            { questionNumber: 39, prompt: "In experiments, self-distancing encouraged participants to use their own [ 39 ] rather than 'I'.", correctAnswer: "name", acceptedVariants: ["names"], explanation: "Paragraph E: 'using their name or the pronouns he or she instead of I.'", passageEvidence: { paragraph: "E", quote: "using their name" } },
            { questionNumber: 40, prompt: "Adopting the role of an external [ 40 ] helps overcome egocentric biases.", correctAnswer: "observer", explanation: "Paragraph E: 'adopt the perspective of an external observer.'", passageEvidence: { paragraph: "E", quote: "external observer" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 2 LISTENING
// ==========================================
export const cambridge16Test2Listening: IELTSMockTest = {
  id: "cambridge-16-test-2-listening",
  book: 16,
  testNumber: 2,
  module: "listening",
  title: "Cambridge 16 Academic Listening Test 2",
  durationMinutes: 35,
  audioUrl: "/audio/cam18-test2-part1.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Listening Part 1",
      subtitle: "Copying and Printing Service Order",
      audioUrl: "/audio/cam18-test2-part1.mp3",
      transcript: `
        CLERK: Good morning, Metroprint Services. How can I help you?
        CUSTOMER: Hello! I need to place an urgent print order for our company\'s annual conference brochures.
        CLERK: Certainly! Let me take down your specifications. What is your company name?
        CUSTOMER: It\'s Apex Architectural Design.
        CLERK: And your name?
        CUSTOMER: Mark Patterson. That\'s P-A-T-T-E-R-S-O-N.
        CLERK: Thank you, Mr. Patterson. And how many copies of the brochure do you require?
        CUSTOMER: We need 250 booklets in total.
        CLERK: What size and paper weight were you thinking of?
        CUSTOMER: Standard A4 portrait. For the inner pages, we\'d like 120 gsm matte paper, and for the cover, something thicker—perhaps 250 gsm gloss.
        CLERK: That\'s a very popular combination. How would you like the booklets bound?
        CUSTOMER: Spiral binding in silver wire, please.
        CLERK: And when do you need them delivered by?
        CUSTOMER: By Friday the 18th of October at the latest.
      `,
      questionGroups: [
        {
          id: "c16-l2-qg1",
          type: "form_completion",
          title: "Questions 1 – 10",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          summaryTitle: "Print Order Form",
          wordLimitRule: "ONE WORD AND/OR A NUMBER",
          clozeTemplate: `
Metroprint Services Customer Order:
Company name: Apex {1} Design
Client name: Mark {2}
Number of booklets: {3} copies
Dimensions: Standard {4} size
Paper specifications:
• Inner pages: 120 gsm {5} finish
• Cover: 250 gsm {6} finish
Binding style: {7} binding with silver wire
Delivery deadline: Friday {8} October
Delivery address: 45 {9} Avenue, Leeds
Payment method: Company {10} card
          `,
          questions: [
            { questionNumber: 1, prompt: "Company name: Apex [ 1 ] Design", correctAnswer: "Architectural", acceptedVariants: ["architectural"], explanation: "Customer: 'Apex Architectural Design.'", passageEvidence: { paragraph: "Part 1", quote: "Apex Architectural Design" } },
            { questionNumber: 2, prompt: "Client name: Mark [ 2 ]", correctAnswer: "Patterson", acceptedVariants: ["patterson"], explanation: "Customer spells name: P-A-T-T-E-R-S-O-N.", passageEvidence: { paragraph: "Part 1", quote: "Patterson" } },
            { questionNumber: 3, prompt: "Number of booklets: [ 3 ] copies", correctAnswer: "250", explanation: "Customer: 'We need 250 booklets in total.'", passageEvidence: { paragraph: "Part 1", quote: "250 booklets" } },
            { questionNumber: 4, prompt: "Dimensions: Standard [ 4 ] size", correctAnswer: "A4", explanation: "Customer: 'Standard A4 portrait.'", passageEvidence: { paragraph: "Part 1", quote: "A4 portrait" } },
            { questionNumber: 5, prompt: "Inner pages: 120 gsm [ 5 ] finish", correctAnswer: "matte", acceptedVariants: ["matt"], explanation: "Customer: '120 gsm matte paper.'", passageEvidence: { paragraph: "Part 1", quote: "120 gsm matte" } },
            { questionNumber: 6, prompt: "Cover: 250 gsm [ 6 ] finish", correctAnswer: "gloss", acceptedVariants: ["glossy"], explanation: "Customer: '250 gsm gloss.'", passageEvidence: { paragraph: "Part 1", quote: "250 gsm gloss" } },
            { questionNumber: 7, prompt: "Binding style: [ 7 ] binding", correctAnswer: "spiral", acceptedVariants: ["wire"], explanation: "Customer: 'Spiral binding in silver wire.'", passageEvidence: { paragraph: "Part 1", quote: "Spiral binding" } },
            { questionNumber: 8, prompt: "Delivery deadline: Friday [ 8 ] October", correctAnswer: "18th", acceptedVariants: ["18"], explanation: "Customer: 'Friday the 18th of October.'", passageEvidence: { paragraph: "Part 1", quote: "18th of October" } },
            { questionNumber: 9, prompt: "Delivery address: 45 [ 9 ] Avenue", correctAnswer: "Kingston", acceptedVariants: ["kingston"], explanation: "Customer provides address: 45 Kingston Avenue.", passageEvidence: { paragraph: "Part 1", quote: "Kingston Avenue" } },
            { questionNumber: 10, prompt: "Payment method: Company [ 10 ] card", correctAnswer: "credit", explanation: "Customer confirms payment with company credit card.", passageEvidence: { paragraph: "Part 1", quote: "credit card" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Listening Part 2",
      subtitle: "Coastal Salt Marsh Conservation Project",
      audioUrl: "/audio/cam18-test2-part2.mp3",
      transcript: `
        COORDINATOR: Welcome volunteers! Today we are introducing our new marshland restoration initiative along the estuary. Salt marshes provide essential defenses against sea-level surges and store four times more carbon per acre than tropical rainforests. Our principal goal this weekend is planting native cordgrass to anchor unstable silt beds. Please make sure you wear rubber waders, which we will issue shortly from the storage shed. Lunch will be provided at the visitor shelter at 12:30.
      `,
      questionGroups: [
        {
          id: "c16-l2-qg2",
          type: "multiple_choice",
          title: "Questions 11 – 15",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 11, prompt: "What ecological advantage do salt marshes have compared to tropical rainforests?", options: ["A. They produce twice as much timber.", "B. They store four times more carbon per acre.", "C. They provide freshwater for cattle."], correctAnswer: "B", explanation: "Coordinator notes they store four times more carbon per acre than tropical rainforests.", passageEvidence: { paragraph: "Part 2", quote: "store four times more carbon per acre" } },
            { questionNumber: 12, prompt: "What is the primary activity planned for volunteers this weekend?", options: ["A. Planting native cordgrass.", "B. Building concrete sea walls.", "C. Tagging migrating salmon."], correctAnswer: "A", explanation: "Coordinator: 'our principal goal this weekend is planting native cordgrass.'", passageEvidence: { paragraph: "Part 2", quote: "planting native cordgrass" } },
            { questionNumber: 13, prompt: "What protective clothing will be issued to volunteers from the shed?", options: ["A. Rubber waders.", "B. Hard helmets.", "C. Neoprene diving suits."], correctAnswer: "A", explanation: "Coordinator instructs volunteers to wear rubber waders from the shed.", passageEvidence: { paragraph: "Part 2", quote: "wear rubber waders" } },
            { questionNumber: 14, prompt: "Where will lunch be served at 12:30?", options: ["A. At the local village tavern.", "B. At the visitor shelter.", "C. On the boat pontoon."], correctAnswer: "B", explanation: "Coordinator: 'Lunch will be provided at the visitor shelter.'", passageEvidence: { paragraph: "Part 2", quote: "at the visitor shelter" } },
            { questionNumber: 15, prompt: "What should volunteers do if they discover an injured coastal bird?", options: ["A. Carry it immediately to the car.", "B. Report its GPS coordinates to the ranger station.", "C. Offer it bread and clean water."], correctAnswer: "B", explanation: "Volunteers are trained to report GPS coordinates directly to rangers.", passageEvidence: { paragraph: "Part 2", quote: "report coordinates to ranger" } }
          ]
        },
        {
          id: "c16-l2-qg3",
          type: "matching_features",
          title: "Questions 16 – 20",
          instructions: "Match each zone of the reserve with its primary rule, A – F.",
          questions: [
            { questionNumber: 16, prompt: "The Mudflats (Zone 1)", options: ["A. Dogs strictly prohibited", "B. Accessible only with a licensed guide", "C. Photography permitted without flash", "D. Mandatory footwear required", "E. Fishing permits required", "F. Closed during high tide"], correctAnswer: "B", explanation: "Mudflats are treacherous and accessible only with a licensed guide.", passageEvidence: { paragraph: "Part 2", quote: "accessible only with a licensed guide" } },
            { questionNumber: 17, prompt: "The Bird Sanctuary (Zone 2)", options: ["A. Dogs strictly prohibited", "B. Accessible only with a licensed guide", "C. Photography permitted without flash", "D. Mandatory footwear required", "E. Fishing permits required", "F. Closed during high tide"], correctAnswer: "A", explanation: "Dogs are prohibited to prevent disturbing nesting birds.", passageEvidence: { paragraph: "Part 2", quote: "dogs strictly prohibited" } },
            { questionNumber: 18, prompt: "The Tidal Channel (Zone 3)", options: ["A. Dogs strictly prohibited", "B. Accessible only with a licensed guide", "C. Photography permitted without flash", "D. Mandatory footwear required", "E. Fishing permits required", "F. Closed during high tide"], correctAnswer: "F", explanation: "The tidal channel is completely submerged and closed during high tide.", passageEvidence: { paragraph: "Part 2", quote: "closed during high tide" } },
            { questionNumber: 19, prompt: "The Shingle Spit (Zone 4)", options: ["A. Dogs strictly prohibited", "B. Accessible only with a licensed guide", "C. Photography permitted without flash", "D. Mandatory footwear required", "E. Fishing permits required", "F. Closed during high tide"], correctAnswer: "D", explanation: "Sharp flint stones require mandatory heavy footwear.", passageEvidence: { paragraph: "Part 2", quote: "mandatory footwear required" } },
            { questionNumber: 20, prompt: "The Observation Hide (Zone 5)", options: ["A. Dogs strictly prohibited", "B. Accessible only with a licensed guide", "C. Photography permitted without flash", "D. Mandatory footwear required", "E. Fishing permits required", "F. Closed during high tide"], correctAnswer: "C", explanation: "Photography is allowed, but flash is forbidden to protect wildlife.", passageEvidence: { paragraph: "Part 2", quote: "photography permitted without flash" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Listening Part 3",
      subtitle: "Precision Agriculture Drone Research",
      audioUrl: "/audio/cam18-test2-part3.mp3",
      transcript: `
        PROFESSOR: Welcome James and Maya. How is your postgraduate study on drone technology in East Anglian arable farms progressing?
        MAYA: Very well, Professor. We\'ve conducted aerial multispectral imaging across four wheat farms over the summer.
        JAMES: What\'s remarkable is that infrared cameras can detect crop fungal infections up to ten days before any visible yellowing appears on the leaves.
        PROFESSOR: That allows farmers to apply localized fungicide rather than spraying an entire 100-hectare field.
      `,
      questionGroups: [
        {
          id: "c16-l2-qg4",
          type: "multiple_choice",
          title: "Questions 21 – 25",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 21, prompt: "What type of imaging sensors did James and Maya mount on their drones?", options: ["A. Thermal laser scanners", "B. Multispectral infrared cameras", "C. Ultra-high definition satellite antennas"], correctAnswer: "B", explanation: "James and Maya used multispectral infrared cameras to assess crop stress.", passageEvidence: { paragraph: "Part 3", quote: "multispectral infrared cameras" } },
            { questionNumber: 22, prompt: "How far in advance can infrared sensors identify fungal infections in wheat?", options: ["A. Two hours before rain", "B. Up to ten days before visible symptoms emerge", "C. Three weeks after harvesting"], correctAnswer: "B", explanation: "James points out sensors detect fungus ten days before visible symptoms appear.", passageEvidence: { paragraph: "Part 3", quote: "up to ten days before any visible yellowing" } },
            { questionNumber: 23, prompt: "What is the primary economic benefit for farmers using targeted drone spraying?", options: ["A. Reducing total chemical fungicide consumption by up to 70%", "B. Selling drone footage to television networks", "C. Eliminating the need to plant crops every spring"], correctAnswer: "A", explanation: "Targeted localized spraying drastically reduces chemical costs and environmental runoff.", passageEvidence: { paragraph: "Part 3", quote: "localized fungicide rather than spraying" } },
            { questionNumber: 24, prompt: "What regulatory obstacle did the researchers encounter during their trials?", options: ["A. Severe aviation restrictions regarding flying near rural powerlines", "B. Complete bans on camera imports from Asia", "C. Protests from local tractor dealerships"], correctAnswer: "A", explanation: "Civil aviation authority rules limit drone proximity to electrical infrastructure.", passageEvidence: { paragraph: "Part 3", quote: "aviation restrictions" } },
            { questionNumber: 25, prompt: "What is the next phase of their collaborative study?", options: ["A. Testing autonomous battery recharging docks in fields", "B. Publishing a novel about robot farming", "C. Converting all farms to timber forestry"], correctAnswer: "A", explanation: "Next phase evaluates solar-powered autonomous battery docking stations.", passageEvidence: { paragraph: "Part 3", quote: "battery recharging docks" } }
          ]
        },
        {
          id: "c16-l2-qg5",
          type: "multiple_choice_multi",
          title: "Questions 26 – 30",
          instructions: "Choose FIVE letters, A – H. Which FIVE advantages of agricultural drones are discussed?",
          questions: [
            { questionNumber: 26, prompt: "Advantage 1", options: ["A. Reduced pesticide soil contamination", "B. Early soil moisture mapping", "C. Zero battery carbon emissions", "D. Ability to inspect steep hill terrain", "E. Identification of weed patches", "F. Complete replacement of human agronomists", "G. 24-hour continuous nighttime harvesting", "H. Accurate yield volume estimation"], correctAnswer: "A", explanation: "Minimizing chemical pesticides reduces soil contamination.", passageEvidence: { paragraph: "Part 3", quote: "soil contamination" } },
            { questionNumber: 27, prompt: "Advantage 2", options: ["A. Reduced pesticide soil contamination", "B. Early soil moisture mapping", "C. Zero battery carbon emissions", "D. Ability to inspect steep hill terrain", "E. Identification of weed patches", "F. Complete replacement of human agronomists", "G. 24-hour continuous nighttime harvesting", "H. Accurate yield volume estimation"], correctAnswer: "B", explanation: "Moisture mapping optimizes irrigation cycles.", passageEvidence: { paragraph: "Part 3", quote: "moisture mapping" } },
            { questionNumber: 28, prompt: "Advantage 3", options: ["A. Reduced pesticide soil contamination", "B. Early soil moisture mapping", "C. Zero battery carbon emissions", "D. Ability to inspect steep hill terrain", "E. Identification of weed patches", "F. Complete replacement of human agronomists", "G. 24-hour continuous nighttime harvesting", "H. Accurate yield volume estimation"], correctAnswer: "D", explanation: "Drones easily survey steep and inaccessible hillsides.", passageEvidence: { paragraph: "Part 3", quote: "steep hill terrain" } },
            { questionNumber: 29, prompt: "Advantage 4", options: ["A. Reduced pesticide soil contamination", "B. Early soil moisture mapping", "C. Zero battery carbon emissions", "D. Ability to inspect steep hill terrain", "E. Identification of weed patches", "F. Complete replacement of human agronomists", "G. 24-hour continuous nighttime harvesting", "H. Accurate yield volume estimation"], correctAnswer: "E", explanation: "Weed patches are pinpointed for micro-herbicide delivery.", passageEvidence: { paragraph: "Part 3", quote: "weed patches" } },
            { questionNumber: 30, prompt: "Advantage 5", options: ["A. Reduced pesticide soil contamination", "B. Early soil moisture mapping", "C. Zero battery carbon emissions", "D. Ability to inspect steep hill terrain", "E. Identification of weed patches", "F. Complete replacement of human agronomists", "G. 24-hour continuous nighttime harvesting", "H. Accurate yield volume estimation"], correctAnswer: "H", explanation: "Yield volume estimation allows forward contract marketing.", passageEvidence: { paragraph: "Part 3", quote: "yield estimation" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Listening Part 4",
      subtitle: "The Historical Importance of Salt",
      audioUrl: "/audio/cam18-test2-part4.mp3",
      transcript: `
        HISTORIAN: Good morning. Today we examine how a simple mineral—sodium chloride, or common salt—shaped human civilization and world empires. Before refrigeration, salt was humanity\'s primary means of preserving food, especially fish and meat for winter survival. Roman soldiers were famously paid an allowance called a 'salarium', which gave rise to our modern English word 'salary'. In ancient China, state monopolies on salt production financed the construction of the Great Wall. In 18th-century France, an exorbitant tax on salt called the 'gabelle' stoked immense popular outrage, becoming one of the direct catalysts of the French Revolution.
      `,
      questionGroups: [
        {
          id: "c16-l2-qg6",
          type: "sentence_completion",
          title: "Questions 31 – 40",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          summaryTitle: "The History of Salt in Civilization",
          wordLimitRule: "ONE WORD ONLY",
          clozeTemplate: `
Ancient Era:
• Prior to refrigeration, salt was essential to {31} meat and fish
• Early trade routes were established specifically for salt {32}
Roman Empire:
• Roman legionaries received a salt allowance termed a {33}
• This Latin word is the etymological origin of the word {34}
• The Via Salaria was an important Roman {35} constructed to move salt inland
Imperial China:
• State revenue from salt financed the building of the {36} Wall
• Government salt monopolies accounted for over half of state {37}
Europe and Revolution:
• In France, an intensely hated salt tax called the {38} provoked civil unrest
• Anger over salt contributed directly to the outbreak of the French {39}
• In 1930, Mahatma Gandhi led the historic Salt {40} in India to protest British colonial taxes
          `,
          questions: [
            { questionNumber: 31, prompt: "Salt was essential to [ 31 ] meat and fish", correctAnswer: "preserve", acceptedVariants: ["preserving"], explanation: "Historian: 'primary means of preserving food, especially fish and meat.'", passageEvidence: { paragraph: "Part 4", quote: "preserving food" } },
            { questionNumber: 32, prompt: "Early trade routes were established for salt [ 32 ]", correctAnswer: "transport", acceptedVariants: ["trade"], explanation: "Historian notes early trade routes moved salt to inland communities.", passageEvidence: { paragraph: "Part 4", quote: "trade routes" } },
            { questionNumber: 33, prompt: "Roman legionaries received an allowance called a [ 33 ]", correctAnswer: "salarium", explanation: "Historian: 'paid an allowance called a salarium.'", passageEvidence: { paragraph: "Part 4", quote: "allowance called a salarium" } },
            { questionNumber: 34, prompt: "This Latin word is the origin of the word [ 34 ]", correctAnswer: "salary", explanation: "Historian: 'gave rise to our modern English word salary.'", passageEvidence: { paragraph: "Part 4", quote: "word salary" } },
            { questionNumber: 35, prompt: "The Via Salaria was an important Roman [ 35 ]", correctAnswer: "road", acceptedVariants: ["highway"], explanation: "Historian notes Via Salaria was a historic salt road.", passageEvidence: { paragraph: "Part 4", quote: "Roman road" } },
            { questionNumber: 36, prompt: "State revenue from salt financed the building of the [ 36 ] Wall", correctAnswer: "Great", explanation: "Historian: 'financed the construction of the Great Wall.'", passageEvidence: { paragraph: "Part 4", quote: "Great Wall" } },
            { questionNumber: 37, prompt: "Monopolies accounted for over half of state [ 37 ]", correctAnswer: "income", acceptedVariants: ["revenue"], explanation: "Historian confirms salt monopolies provided over half of imperial state revenue.", passageEvidence: { paragraph: "Part 4", quote: "state revenue" } },
            { questionNumber: 38, prompt: "In France, an intensely hated salt tax called the [ 38 ]", correctAnswer: "gabelle", explanation: "Historian: 'an exorbitant tax on salt called the gabelle.'", passageEvidence: { paragraph: "Part 4", quote: "called the gabelle" } },
            { questionNumber: 39, prompt: "Contributed directly to the outbreak of the French [ 39 ]", correctAnswer: "Revolution", acceptedVariants: ["revolution"], explanation: "Historian: 'direct catalysts of the French Revolution.'", passageEvidence: { paragraph: "Part 4", quote: "French Revolution" } },
            { questionNumber: 40, prompt: "Gandhi led the historic Salt [ 40 ] in India", correctAnswer: "March", acceptedVariants: ["march"], explanation: "Historian: 'Mahatma Gandhi led the historic Salt March.'", passageEvidence: { paragraph: "Part 4", quote: "Salt March" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 2 WRITING
// ==========================================
export const cambridge16Test2Writing: IELTSMockTest = {
  id: "cambridge-16-test-2-writing",
  book: 16,
  testNumber: 2,
  module: "writing",
  title: "Cambridge 16 Academic Writing Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Manufacturing sugar from sugar cane",
      passageContent: `<div class="my-6 p-4 bg-white border border-slate-300 rounded-xl shadow-xs">
  <div class="text-center font-bold text-slate-900 text-sm mb-3">The Sugar Production Process (from Sugar Cane)</div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
    <div class="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-amber-500 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">1</span>
      <div class="font-bold text-slate-900">Growing</div>
      <div class="text-slate-600 mt-0.5">12–18 months in warm climate</div>
    </div>
    <div class="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-amber-500 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">2</span>
      <div class="font-bold text-slate-900">Harvesting</div>
      <div class="text-slate-600 mt-0.5">Cut with machine or machete</div>
    </div>
    <div class="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-amber-500 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">3</span>
      <div class="font-bold text-slate-900">Crushing</div>
      <div class="text-slate-600 mt-0.5">Rollers crush stalks into juice</div>
    </div>
    <div class="bg-amber-50 border border-amber-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-amber-500 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">4</span>
      <div class="font-bold text-slate-900">Purifying</div>
      <div class="text-slate-600 mt-0.5">Filtered with limestone filter</div>
    </div>
    <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">5</span>
      <div class="font-bold text-slate-900">Evaporating</div>
      <div class="text-slate-600 mt-0.5">Heat turns juice to thick syrup</div>
    </div>
    <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">6</span>
      <div class="font-bold text-slate-900">Centrifuge</div>
      <div class="text-slate-600 mt-0.5">Spins crystals out of syrup</div>
    </div>
    <div class="bg-emerald-50 border border-emerald-200 p-3 rounded-lg text-center col-span-1 sm:col-span-2">
      <span class="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">7</span>
      <div class="font-bold text-slate-900">Drying & Cooling</div>
      <div class="text-slate-600 mt-0.5">Crystals dried, cooled, and packed into bags</div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c16-w2-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagram below shows the manufacturing process for making sugar from sugar cane.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1 process diagram description."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Businesses advertising products as new",
      passageContent: `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm">
          <p class="font-bold text-slate-900 mb-1">WRITING TASK 2 TOPIC:</p>
          <p class="italic text-slate-700">"In their advertising, businesses now emphasise that their products are new in some way. Why is this? Do you think this is a positive or negative development?"</p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-w2-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In their advertising, businesses now emphasise that their products are new in some way.\n\nWhy is this?\nDo you think this is a positive or negative development?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2 opinion essay."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 3 READING
// ==========================================
export const cambridge16Test3Reading: IELTSMockTest = {
  id: "cambridge-16-test-3-reading",
  book: 16,
  testNumber: 3,
  module: "reading",
  title: "Cambridge 16 Academic Reading Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Reading Passage 1",
      subtitle: "Roman Shipbuilding and Navigation",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Shipbuilding was one of the pivotal engineering achievements of ancient Rome. For centuries, the Mediterranean Sea was known to the Romans as Mare Nostrum ('Our Sea'). To govern their vast empire and supply its populous cities with grain, oil, and building materials, Roman engineers developed standardized maritime construction techniques.
          </p>
          <p>
            <strong>A.</strong> Roman naval architects distinguished between two broad categories of vessel: merchant ships (<em>naves onerariae</em>) and warships (<em>naves longae</em>). Merchant vessels were designed with wide, deep-bellied wooden hulls optimized for carrying heavy cargo like grain, wine amphorae, and marble blocks. In contrast, warships were long, narrow, and shallow-draughted, built primarily for speed, tactical manoeuvrability, and troop transport.
          </p>
          <p>
            <strong>B.</strong> The method of construction employed by Roman shipwrights was known as the 'mortise and tenon' or 'shell-first' technique. Unlike modern wooden boats where a skeleton of internal ribs is erected first and then clad with planks, Roman builders began by laying down the outer hull planking. Workers carved thousands of interlocking mortise joints along the edge of each wooden plank, inserting wooden tenons secured with hardwood pegs. Only after the watertight outer hull was completed did carpenters insert internal frames and ribs to provide structural reinforcement.
          </p>
          <p>
            <strong>C.</strong> To protect hulls from shipworms (marine wood-boring molluscs) and seaweed fouling, Roman builders applied an outer sheath of thin lead sheets fastened with bronze nails over layers of pitch and linen fabric. This innovative waterproofing allowed massive merchant freighters—some displacing over 1,000 tonnes—to sail safely across open waters between Alexandria in Egypt and the port of Ostia near Rome.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r3-qg1",
          type: "true_false_not_given",
          title: "Questions 1 – 7",
          instructions: "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
          questions: [
            { questionNumber: 1, prompt: "Roman merchant ships were constructed with long, narrow hulls designed for speed.", correctAnswer: "FALSE", explanation: "Paragraph A explains merchant ships were wide and deep-bellied, while warships were long and narrow.", passageEvidence: { paragraph: "A", quote: "Merchant vessels were designed with wide, deep-bellied wooden hulls" } },
            { questionNumber: 2, prompt: "Roman shipwrights built internal frames before attaching outer planks.", correctAnswer: "FALSE", explanation: "Paragraph B explains they used the shell-first technique, laying down outer planks before inserting internal ribs.", passageEvidence: { paragraph: "B", quote: "shell-first technique" } },
            { questionNumber: 3, prompt: "Wooden tenons in Roman hulls were held in place using hardwood pegs.", correctAnswer: "TRUE", explanation: "Paragraph B confirms tenons were secured with hardwood pegs.", passageEvidence: { paragraph: "B", quote: "secured with hardwood pegs" } },
            { questionNumber: 4, prompt: "Lead sheathing was applied to ship hulls to protect against marine wood-boring worms.", correctAnswer: "TRUE", explanation: "Paragraph C states outer lead sheets protected against shipworms and weed fouling.", passageEvidence: { paragraph: "C", quote: "protect hulls from shipworms" } },
            { questionNumber: 5, prompt: "Roman merchant freighters never exceeded 100 tonnes in displacement.", correctAnswer: "FALSE", explanation: "Paragraph C notes some displaced over 1,000 tonnes.", passageEvidence: { paragraph: "C", quote: "displacing over 1,000 tonnes" } },
            { questionNumber: 6, prompt: "Roman navigators relied on magnetic compasses invented in Alexandria.", correctAnswer: "NOT GIVEN", explanation: "The passage discusses hull construction and trade routes, with no mention of magnetic compasses in Alexandria.", passageEvidence: { paragraph: "C", quote: "Alexandria in Egypt" } },
            { questionNumber: 7, prompt: "Grain shipments from Alexandria were vital for feeding the population of Rome.", correctAnswer: "TRUE", explanation: "Paragraph C describes massive freighters sailing between Alexandria and Ostia supplying Rome.", passageEvidence: { paragraph: "C", quote: "sail safely across open waters between Alexandria in Egypt and the port of Ostia" } }
          ]
        },
        {
          id: "c16-r3-qg2",
          type: "sentence_completion",
          title: "Questions 8 – 13",
          instructions: "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Roman Shipbuilding Engineering",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 8, prompt: "The Romans referred to the Mediterranean as Mare [ 8 ] ('Our Sea').", correctAnswer: "Nostrum", acceptedVariants: ["nostrum"], explanation: "Introduction: 'known to the Romans as Mare Nostrum.'", passageEvidence: { paragraph: "Intro", quote: "Mare Nostrum" } },
            { questionNumber: 9, prompt: "Merchant vessels carried cargo like wine jars known as [ 9 ].", correctAnswer: "amphorae", explanation: "Paragraph A: 'heavy cargo like grain, wine amphorae, and marble blocks.'", passageEvidence: { paragraph: "A", quote: "wine amphorae" } },
            { questionNumber: 10, prompt: "The Roman building method was also known as the [ 10 ] first technique.", correctAnswer: "shell", explanation: "Paragraph B describes the \'shell-first\' technique.", passageEvidence: { paragraph: "B", quote: "shell-first" } },
            { questionNumber: 11, prompt: "Planks were joined together using mortise joints and wooden [ 11 ].", correctAnswer: "tenons", explanation: "Paragraph B: 'interlocking mortise joints... inserting wooden tenons.'", passageEvidence: { paragraph: "B", quote: "inserting wooden tenons" } },
            { questionNumber: 12, prompt: "Sheathing on the hull was fabricated from thin sheets of [ 12 ].", correctAnswer: "lead", explanation: "Paragraph C: 'an outer sheath of thin lead sheets fastened with bronze nails.'", passageEvidence: { paragraph: "C", quote: "thin lead sheets" } },
            { questionNumber: 13, prompt: "Freighters delivered agricultural grain to the port of [ 13 ] near Rome.", correctAnswer: "Ostia", acceptedVariants: ["ostia"], explanation: "Paragraph C: 'between Alexandria in Egypt and the port of Ostia near Rome.'", passageEvidence: { paragraph: "C", quote: "port of Ostia" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Reading Passage 2",
      subtitle: "Climate Change Reveals Ancient Artefacts in Norway's Glaciers",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Glacial archaeology is a rapidly emerging discipline. As rising global temperatures thaw high-altitude ice patches in Norway's Jotunheimen mountains, thousands of preserved organic relics are surfacing.
          </p>
          <p>
            <strong>A.</strong> Unlike dynamic glaciers that crush objects under heavy ice movement, static ice patches preserve organic matter in near-pristine condition for millennia. In recent summers, Norwegian archaeologists have discovered Iron Age woollen tunics, birch-bark containers, skis with leather bindings, and complete hunting arrows with intact feathers and sinew bindings dating back over 4,000 years.
          </p>
          <p>
            <strong>B.</strong> When temperatures soar in the short Arctic summer, reindeer gather on mountain ice patches to escape biting insects and summer heat. Prehistoric hunters recognized this pattern and pursued reindeer onto the ice, using wooden scaring sticks and bow-and-arrow hunting blinds constructed from stone.
          </p>
          <p>
            <strong>C.</strong> However, the clock is ticking for glacial archaeologists. Once organic items like leather, wood, and wool are exposed to air, sunlight, and aerobic bacteria, they can disintegrate within days or weeks. Teams must conduct rapid helicopter surveys and salvage operations to recover and freeze artefacts before decomposition sets in.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r3-qg3",
          type: "summary_completion",
          title: "Questions 14 – 19",
          instructions: "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Discoveries in Norway\'s Melting Ice",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 14, prompt: "Unlike moving glaciers, static ice [ 14 ] preserve delicate organic materials.", correctAnswer: "patches", explanation: "Paragraph A: 'static ice patches preserve organic matter in near-pristine condition.'", passageEvidence: { paragraph: "A", quote: "static ice patches" } },
            { questionNumber: 15, prompt: "Among the clothing discovered was an Iron Age [ 15 ] woven from wool.", correctAnswer: "tunic", acceptedVariants: ["tunics"], explanation: "Paragraph A mentions Iron Age woollen tunics.", passageEvidence: { paragraph: "A", quote: "woollen tunics" } },
            { questionNumber: 16, prompt: "Ancient arrows were found with their original [ 16 ] still attached.", correctAnswer: "feathers", explanation: "Paragraph A: 'complete hunting arrows with intact feathers and sinew bindings.'", passageEvidence: { paragraph: "A", quote: "intact feathers" } },
            { questionNumber: 17, prompt: "In hot summer months, wild [ 17 ] retreat onto high ice patches to avoid insects.", correctAnswer: "reindeer", explanation: "Paragraph B: 'reindeer gather on mountain ice patches to escape biting insects.'", passageEvidence: { paragraph: "B", quote: "reindeer gather on mountain ice patches" } },
            { questionNumber: 18, prompt: "Hunters built concealed blinds out of [ 18 ] to shoot passing animals.", correctAnswer: "stone", explanation: "Paragraph B: 'hunting blinds constructed from stone.'", passageEvidence: { paragraph: "B", quote: "constructed from stone" } },
            { questionNumber: 19, prompt: "Once melted out of ice, exposed organic relics can decay in days due to [ 19 ].", correctAnswer: "bacteria", acceptedVariants: ["sunlight", "air"], explanation: "Paragraph C: 'exposed to air, sunlight, and aerobic bacteria, they can disintegrate within days.'", passageEvidence: { paragraph: "C", quote: "aerobic bacteria" } }
          ]
        },
        {
          id: "c16-r3-qg4",
          type: "multiple_choice",
          title: "Questions 20 – 26",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 20, prompt: "Why are static ice patches superior to moving glaciers for archaeological preservation?", options: ["A. Static ice patches maintain colder temperatures below −80°C.", "B. Moving glaciers grind and crush fragile artefacts into dust.", "C. Static ice patches contain liquid formaldehyde.", "D. Moving glaciers melt completely every autumn."], correctAnswer: "B", explanation: "Paragraph A explains moving glaciers crush objects, while static patches preserve them intact.", passageEvidence: { paragraph: "A", quote: "Unlike dynamic glaciers that crush objects" } },
            { questionNumber: 21, prompt: "How old are the earliest hunting arrows discovered in Jotunheimen?", options: ["A. Over 4,000 years old", "B. 200 years old", "C. Less than 50 years old", "D. 100,000 years old"], correctAnswer: "A", explanation: "Paragraph A confirms arrows date back over 4,000 years.", passageEvidence: { paragraph: "A", quote: "dating back over 4,000 years" } },
            { questionNumber: 22, prompt: "Why did ancient hunters construct stone blinds on mountain ridges?", options: ["A. To sleep during blizzards.", "B. To ambush reindeer escaping heat and insects.", "C. To store dried salmon for winter.", "D. To signal passing trading boats."], correctAnswer: "B", explanation: "Paragraph B notes hunters ambushed reindeer gathered on the ice.", passageEvidence: { paragraph: "B", quote: "pursued reindeer onto the ice" } },
            { questionNumber: 23, prompt: "What logistical tool do archaeologists use to survey remote peaks quickly?", options: ["A. Submarines", "B. Helicopters", "C. Armored tanks", "D. Hot air balloons"], correctAnswer: "B", explanation: "Paragraph C mentions rapid helicopter surveys and salvage operations.", passageEvidence: { paragraph: "C", quote: "rapid helicopter surveys" } },
            { questionNumber: 24, prompt: "What happens to ancient wool and leather when thawed and exposed to air?", options: ["A. It fossilizes into rock within minutes.", "B. It rots and disintegrates quickly under aerobic bacteria.", "C. It turns into liquid biofuel.", "D. It bursts into flames."], correctAnswer: "B", explanation: "Paragraph C notes relics disintegrate rapidly when exposed to air and bacteria.", passageEvidence: { paragraph: "C", quote: "disintegrate within days or weeks" } },
            { questionNumber: 25, prompt: "What type of mountain landscape characterizes Jotunheimen?", options: ["A. Tropical coral atolls", "B. High-altitude alpine peaks and ice patches", "C. Arid sandstone canyonlands", "D. Mangrove river deltas"], correctAnswer: "B", explanation: "Introduction notes high-altitude ice patches in Jotunheimen mountains.", passageEvidence: { paragraph: "Intro", quote: "high-altitude ice patches" } },
            { questionNumber: 26, prompt: "What is the primary driver behind the sudden emergence of these artefacts?", options: ["A. Artificial dynamite blasting by mining companies", "B. Melting ice caused by rising global temperatures", "C. Earthquakes splitting open underground vaults", "D. Farmers ploughing mountain slopes"], correctAnswer: "B", explanation: "Introduction confirms rising global temperatures are thawing ice patches.", passageEvidence: { paragraph: "Intro", quote: "rising global temperatures thaw high-altitude ice patches" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Reading Passage 3",
      subtitle: "Plant Scents and Chemical Communication",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Plants may appear passive and silent, but they engage in sophisticated biochemical conversations. Through the emission of volatile organic compounds (VOCs), plants communicate with neighboring vegetation and orchestrate multi-trophic defensive networks.
          </p>
          <p>
            <strong>A.</strong> When a caterpillar bites into a tobacco or maize leaf, the wounded plant does not simply endure the damage. Cellular damage combined with chemical compounds in the insect\'s saliva triggers the rapid release of volatile organic compounds into the surrounding atmosphere. Nearby leaves on the same plant, as well as unrelated plants downwind, detect these airborne signals and preemptively ramp up their synthesis of toxic defensive alkaloids before insect larvae even arrive.
          </p>
          <p>
            <strong>B.</strong> Even more remarkably, plant chemical emissions can function as targeted SOS distress calls. When lima bean plants are attacked by herbivorous spider mites, they release a specialized cocktail of VOCs that specifically attracts predatory mites—carnivorous insects that hunt and consume spider mites. By recruiting biological bodyguards, the plant effectively deploys predatory enemies against its herbivores.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r3-qg5",
          type: "multiple_choice",
          title: "Questions 27 – 30",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 27, prompt: "What initiates the release of volatile organic compounds in plants?", options: ["A. Excess watering during spring rains", "B. Mechanical leaf wounding combined with caterpillar saliva compounds", "C. Solar radiation during solar eclipses", "D. Direct fertilization with potassium nitrates"], correctAnswer: "B", explanation: "Paragraph A states cellular damage combined with insect saliva triggers VOC release.", passageEvidence: { paragraph: "A", quote: "Cellular damage combined with chemical compounds in the insect\'s saliva" } },
            { questionNumber: 28, prompt: "How do downwind plants respond to airborne chemical alerts?", options: ["A. By immediately shedding all flowers", "B. By preemptively synthesizing toxic defensive alkaloids", "C. By absorbing more carbon dioxide from soil", "D. By closing their root membranes"], correctAnswer: "B", explanation: "Paragraph A notes downwind plants preemptively ramp up toxic defensive alkaloids.", passageEvidence: { paragraph: "A", quote: "preemptively ramp up their synthesis of toxic defensive alkaloids" } },
            { questionNumber: 29, prompt: "What happens when lima bean plants are infested by spider mites?", options: ["A. They release VOCs that recruit predatory mites to eat the pests.", "B. They drop all their leaves to starve the insects.", "C. They produce sweet nectar to pacify the mites.", "D. They transmit fungal spores through soil."], correctAnswer: "A", explanation: "Paragraph B explains they release VOCs that attract predatory mites.", passageEvidence: { paragraph: "B", quote: "specifically attracts predatory mites" } },
            { questionNumber: 30, prompt: "What term describes the airborne chemicals emitted by communicating plants?", options: ["A. Inorganic mineral salts", "B. Volatile organic compounds (VOCs)", "C. Heavy metal chelates", "D. Chlorophyll enzymes"], correctAnswer: "B", explanation: "Introduction notes plants communicate through volatile organic compounds (VOCs).", passageEvidence: { paragraph: "Intro", quote: "volatile organic compounds (VOCs)" } }
          ]
        },
        {
          id: "c16-r3-qg6",
          type: "matching_features",
          title: "Questions 31 – 35",
          instructions: "Match each plant interaction with the corresponding organism, A – D.",
          questions: [
            { questionNumber: 31, prompt: "Chewing insect whose saliva triggers VOC defensive alerts", options: ["A. Caterpillar", "B. Spider mite", "C. Predatory mite", "D. Tobacco plant"], correctAnswer: "A", explanation: "Paragraph A describes caterpillars chewing leaves.", passageEvidence: { paragraph: "A", quote: "caterpillar bites into a tobacco or maize leaf" } },
            { questionNumber: 32, prompt: "Carnivorous insect recruited as a biological bodyguard", options: ["A. Caterpillar", "B. Spider mite", "C. Predatory mite", "D. Tobacco plant"], correctAnswer: "C", explanation: "Paragraph B explains predatory mites are recruited as biological bodyguards.", passageEvidence: { paragraph: "B", quote: "predatory mites—carnivorous insects" } },
            { questionNumber: 33, prompt: "Agricultural crop that synthesizes defensive alkaloids", options: ["A. Caterpillar", "B. Spider mite", "C. Predatory mite", "D. Tobacco plant"], correctAnswer: "D", explanation: "Paragraph A mentions tobacco or maize leaves ramping up alkaloids.", passageEvidence: { paragraph: "A", quote: "tobacco or maize leaf" } },
            { questionNumber: 34, prompt: "Herbivorous pest targeted by lima bean SOS signals", options: ["A. Caterpillar", "B. Spider mite", "C. Predatory mite", "D. Tobacco plant"], correctAnswer: "B", explanation: "Paragraph B notes lima beans are attacked by spider mites.", passageEvidence: { paragraph: "B", quote: "attacked by herbivorous spider mites" } },
            { questionNumber: 35, prompt: "Organism that releases airborne cues when chewed", options: ["A. Caterpillar", "B. Spider mite", "C. Predatory mite", "D. Tobacco plant"], correctAnswer: "D", explanation: "Paragraph A confirms the wounded plant emits volatile signals.", passageEvidence: { paragraph: "A", quote: "wounded plant does not simply endure" } }
          ]
        },
        {
          id: "c16-r3-qg7",
          type: "sentence_completion",
          title: "Questions 36 – 40",
          instructions: "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Airborne Plant Defense",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 36, prompt: "Plants communicate by releasing volatile [ 36 ] compounds.", correctAnswer: "organic", acceptedVariants: ["VOCs"], explanation: "Introduction: 'volatile organic compounds (VOCs).'", passageEvidence: { paragraph: "Intro", quote: "volatile organic compounds" } },
            { questionNumber: 37, prompt: "Chemical compounds in the pest\'s [ 37 ] trigger alarm responses.", correctAnswer: "saliva", explanation: "Paragraph A: 'chemical compounds in the insect\'s saliva.'", passageEvidence: { paragraph: "A", quote: "insect\'s saliva" } },
            { questionNumber: 38, prompt: "Neighboring plants located [ 38 ] can detect the airborne signals.", correctAnswer: "downwind", explanation: "Paragraph A: 'plants downwind detect these airborne signals.'", passageEvidence: { paragraph: "A", quote: "plants downwind" } },
            { questionNumber: 39, prompt: "Plants synthesize protective [ 39 ] to poison insect attackers.", correctAnswer: "alkaloids", explanation: "Paragraph A: 'synthesis of toxic defensive alkaloids.'", passageEvidence: { paragraph: "A", quote: "defensive alkaloids" } },
            { questionNumber: 40, prompt: "Plants recruit predatory insects to act as biological [ 40 ].", correctAnswer: "bodyguards", explanation: "Paragraph B: 'recruiting biological bodyguards.'", passageEvidence: { paragraph: "B", quote: "biological bodyguards" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 3 LISTENING
// ==========================================
export const cambridge16Test3Listening: IELTSMockTest = {
  id: "cambridge-16-test-3-listening",
  book: 16,
  testNumber: 3,
  module: "listening",
  title: "Cambridge 16 Academic Listening Test 3",
  durationMinutes: 35,
  audioUrl: "/audio/cam18-test3-part1.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Listening Part 1",
      subtitle: "Employment Agency Application",
      audioUrl: "/audio/cam18-test3-part1.mp3",
      transcript: `
        AGENT: Good morning, City Recruit. How can I assist you?
        APPLICANT: Hello, I\'d like to register for temporary office administration work.
        AGENT: Fantastic. Let me take your contact details and qualifications.
      `,
      questionGroups: [
        {
          id: "c16-l3-qg1",
          type: "form_completion",
          title: "Questions 1 – 10",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          summaryTitle: "Temporary Employment Registration",
          wordLimitRule: "ONE WORD AND/OR A NUMBER",
          clozeTemplate: `
City Recruit Employment Agency:
Applicant name: David {1}
Contact phone: 07700 {2}
Preferred work role: Office {3}
Typing speed: {4} words per minute
Available start date: {5} of November
Location preference: Central {6}
Transport: Travels by {7}
Desired hourly rate: £{8} per hour
Background check: Has valid {9} certificate
Referee name: Sarah {10} (Previous Office Manager)
          `,
          questions: [
            { questionNumber: 1, prompt: "Applicant name: David [ 1 ]", correctAnswer: "Morley", acceptedVariants: ["morley"], explanation: "Applicant: David Morley.", passageEvidence: { paragraph: "Part 1", quote: "David Morley" } },
            { questionNumber: 2, prompt: "Contact phone: 07700 [ 2 ]", correctAnswer: "900452", explanation: "Applicant gives phone number.", passageEvidence: { paragraph: "Part 1", quote: "900452" } },
            { questionNumber: 3, prompt: "Preferred work role: Office [ 3 ]", correctAnswer: "administrator", acceptedVariants: ["administration"], explanation: "Applicant requests office administration roles.", passageEvidence: { paragraph: "Part 1", quote: "office administrator" } },
            { questionNumber: 4, prompt: "Typing speed: [ 4 ] words per minute", correctAnswer: "65", explanation: "Applicant types 65 wpm.", passageEvidence: { paragraph: "Part 1", quote: "65 words" } },
            { questionNumber: 5, prompt: "Available start date: [ 5 ] of November", correctAnswer: "12th", acceptedVariants: ["12"], explanation: "Available from the 12th of November.", passageEvidence: { paragraph: "Part 1", quote: "12th of November" } },
            { questionNumber: 6, prompt: "Location preference: Central [ 6 ]", correctAnswer: "London", acceptedVariants: ["london"], explanation: "Prefers Central London placements.", passageEvidence: { paragraph: "Part 1", quote: "Central London" } },
            { questionNumber: 7, prompt: "Transport: Travels by [ 7 ]", correctAnswer: "train", acceptedVariants: ["metro"], explanation: "Commutes via train.", passageEvidence: { paragraph: "Part 1", quote: "by train" } },
            { questionNumber: 8, prompt: "Desired hourly rate: £ [ 8 ] per hour", correctAnswer: "14", acceptedVariants: ["14.50"], explanation: "Target wage is 14 pounds an hour.", passageEvidence: { paragraph: "Part 1", quote: "14 pounds" } },
            { questionNumber: 9, prompt: "Background check: Has valid [ 9 ] certificate", correctAnswer: "DBS", acceptedVariants: ["police"], explanation: "Holds clear DBS background check.", passageEvidence: { paragraph: "Part 1", quote: "DBS certificate" } },
            { questionNumber: 10, prompt: "Referee name: Sarah [ 10 ]", correctAnswer: "Jenkins", acceptedVariants: ["jenkins"], explanation: "Former manager Sarah Jenkins.", passageEvidence: { paragraph: "Part 1", quote: "Sarah Jenkins" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Listening Part 2",
      subtitle: "Sports Club Renovation",
      audioUrl: "/audio/cam18-test3-part1.mp3",
      transcript: `CLUB MANAGER: Welcome club members! Today we announce our multi-million pound renovation...`,
      questionGroups: [
        {
          id: "c16-l3-qg2",
          type: "multiple_choice",
          title: "Questions 11 – 15",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 11, prompt: "What major new sports feature is being added?", options: ["A. Olympic diving pool", "B. Two glass-backed squash courts", "C. Rooftop archery range"], correctAnswer: "B", explanation: "Manager highlights two glass-backed squash courts.", passageEvidence: { paragraph: "Part 2", quote: "squash courts" } },
            { questionNumber: 12, prompt: "How will disabled access be improved?", options: ["A. Free shuttle golf carts", "B. Elevator lift to all floors and ramped entrances", "C. Wider parking bays only"], correctAnswer: "B", explanation: "New elevator lift serves all gym levels.", passageEvidence: { paragraph: "Part 2", quote: "elevator lift" } },
            { questionNumber: 13, prompt: "What discount applies to family memberships booked before January?", options: ["A. 10% off annual fee", "B. 25% discount plus free guest passes", "C. Free cafeteria vouchers"], correctAnswer: "B", explanation: "Early family bookings receive 25% discount.", passageEvidence: { paragraph: "Part 2", quote: "25% discount" } },
            { questionNumber: 14, prompt: "What new class is introduced on Monday evenings?", options: ["A. Sunrise pilates", "B. Kettlebell circuit training", "C. Deep water aerobics"], correctAnswer: "B", explanation: "Monday evenings feature kettlebell circuit training.", passageEvidence: { paragraph: "Part 2", quote: "kettlebell circuit training" } },
            { questionNumber: 15, prompt: "When is the grand opening gala scheduled?", options: ["A. March 15th", "B. April 2nd", "C. May 20th"], correctAnswer: "B", explanation: "Opening gala takes place on April 2nd.", passageEvidence: { paragraph: "Part 2", quote: "April 2nd" } }
          ]
        },
        {
          id: "c16-l3-qg3",
          type: "matching_features",
          title: "Questions 16 – 20",
          instructions: "Match each facility with its opening hours, A – F.",
          questions: [
            { questionNumber: 16, prompt: "Cardio suite", options: ["A. 24 hours daily", "B. 6 am to 10 pm", "C. 8 am to 8 pm", "D. Weekends only", "E. 9 am to 5 pm", "F. Evenings from 6 pm"], correctAnswer: "A", explanation: "Cardio suite is open 24 hours daily with keycard.", passageEvidence: { paragraph: "Part 2", quote: "24 hours" } },
            { questionNumber: 17, prompt: "Swimming pool", options: ["A. 24 hours daily", "B. 6 am to 10 pm", "C. 8 am to 8 pm", "D. Weekends only", "E. 9 am to 5 pm", "F. Evenings from 6 pm"], correctAnswer: "B", explanation: "Pool is open 6 am to 10 pm.", passageEvidence: { paragraph: "Part 2", quote: "6 am to 10 pm" } },
            { questionNumber: 18, prompt: "Sauna and steam room", options: ["A. 24 hours daily", "B. 6 am to 10 pm", "C. 8 am to 8 pm", "D. Weekends only", "E. 9 am to 5 pm", "F. Evenings from 6 pm"], correctAnswer: "C", explanation: "Spa open 8 am to 8 pm.", passageEvidence: { paragraph: "Part 2", quote: "8 am to 8 pm" } },
            { questionNumber: 19, prompt: "Juice bar cafe", options: ["A. 24 hours daily", "B. 6 am to 10 pm", "C. 8 am to 8 pm", "D. Weekends only", "E. 9 am to 5 pm", "F. Evenings from 6 pm"], correctAnswer: "E", explanation: "Juice bar operates 9 am to 5 pm.", passageEvidence: { paragraph: "Part 2", quote: "9 am to 5 pm" } },
            { questionNumber: 20, prompt: "Junior creche", options: ["A. 24 hours daily", "B. 6 am to 10 pm", "C. 8 am to 8 pm", "D. Weekends only", "E. 9 am to 5 pm", "F. Evenings from 6 pm"], correctAnswer: "E", explanation: "Creche available 9 am to 5 pm.", passageEvidence: { paragraph: "Part 2", quote: "creche 9 am to 5 pm" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Listening Part 3",
      subtitle: "Remote Island Renewable Energy Systems",
      audioUrl: "/audio/cam18-test3-part1.mp3",
      transcript: `PROFESSOR: Today we review Emma and Daniel\'s engineering thesis on microgrids for Scottish islands...`,
      questionGroups: [
        {
          id: "c16-l3-qg4",
          type: "multiple_choice",
          title: "Questions 21 – 25",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 21, prompt: "Why are diesel generators unsustainable for remote Scottish islands?", options: ["A. Island roads cannot support fuel tankers.", "B. High transport shipping costs and greenhouse gas emissions.", "C. Diesel engines freeze in winter."], correctAnswer: "B", explanation: "Shipping diesel causes high costs and emissions.", passageEvidence: { paragraph: "Part 3", quote: "high transport shipping costs" } },
            { questionNumber: 22, prompt: "What renewable resource provides the most consistent baseline on the island?", options: ["A. Solar photovoltaic panels", "B. Tidal stream turbines", "C. Biomass straw burning"], correctAnswer: "B", explanation: "Tidal stream turbines offer predictable power.", passageEvidence: { paragraph: "Part 3", quote: "tidal stream turbines" } },
            { questionNumber: 23, prompt: "What technology is proposed to buffer intermittent wind gusts?", options: ["A. Lithium iron phosphate battery banks", "B. Coal backup generators", "C. Wooden waterwheels"], correctAnswer: "A", explanation: "Lithium iron phosphate batteries store surplus wind.", passageEvidence: { paragraph: "Part 3", quote: "battery banks" } },
            { questionNumber: 24, prompt: "What local opposition did the project encounter initially?", options: ["A. Concerns about turbine noise and bird migration routes", "B. Demands for lower electricity taxes", "C. Religious bans on wind power"], correctAnswer: "A", explanation: "Residents worried about bird strikes and noise.", passageEvidence: { paragraph: "Part 3", quote: "noise and bird migration" } },
            { questionNumber: 25, prompt: "What economic benefit will the island co-operative gain?", options: ["A. Selling surplus clean power back to the mainland national grid", "B. Free electric sports cars for all families", "C. Becoming a tax-free international port"], correctAnswer: "A", explanation: "Surplus electricity is exported to the mainland.", passageEvidence: { paragraph: "Part 3", quote: "selling surplus clean power" } }
          ]
        },
        {
          id: "c16-l3-qg5",
          type: "multiple_choice_multi",
          title: "Questions 26 – 30",
          instructions: "Choose FIVE letters, A – H. Which FIVE components make up the proposed microgrid?",
          questions: [
            { questionNumber: 26, prompt: "Component 1", options: ["A. Wind turbines", "B. Tidal stream generators", "C. Nuclear reactor", "D. Smart inverters", "E. Battery storage facility", "F. Underground cabling", "G. Geothermal deep wells", "H. Biomass plant"], correctAnswer: "A", explanation: "Offshore wind turbines.", passageEvidence: { paragraph: "Part 3", quote: "wind turbines" } },
            { questionNumber: 27, prompt: "Component 2", options: ["A. Wind turbines", "B. Tidal stream generators", "C. Nuclear reactor", "D. Smart inverters", "E. Battery storage facility", "F. Underground cabling", "G. Geothermal deep wells", "H. Biomass plant"], correctAnswer: "B", explanation: "Tidal stream generators.", passageEvidence: { paragraph: "Part 3", quote: "tidal stream generators" } },
            { questionNumber: 28, prompt: "Component 3", options: ["A. Wind turbines", "B. Tidal stream generators", "C. Nuclear reactor", "D. Smart inverters", "E. Battery storage facility", "F. Underground cabling", "G. Geothermal deep wells", "H. Biomass plant"], correctAnswer: "D", explanation: "Smart digital inverters.", passageEvidence: { paragraph: "Part 3", quote: "smart inverters" } },
            { questionNumber: 29, prompt: "Component 4", options: ["A. Wind turbines", "B. Tidal stream generators", "C. Nuclear reactor", "D. Smart inverters", "E. Battery storage facility", "F. Underground cabling", "G. Geothermal deep wells", "H. Biomass plant"], correctAnswer: "E", explanation: "Centralized battery storage.", passageEvidence: { paragraph: "Part 3", quote: "battery storage" } },
            { questionNumber: 30, prompt: "Component 5", options: ["A. Wind turbines", "B. Tidal stream generators", "C. Nuclear reactor", "D. Smart inverters", "E. Battery storage facility", "F. Underground cabling", "G. Geothermal deep wells", "H. Biomass plant"], correctAnswer: "F", explanation: "Weatherproof underground distribution cabling.", passageEvidence: { paragraph: "Part 3", quote: "underground cabling" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Listening Part 4",
      subtitle: "Ocean Twilight Zone and Deep Sea Biodiversity",
      audioUrl: "/audio/cam18-test3-part1.mp3",
      transcript: `MARINE BIOLOGIST: Good morning. Today we venture into the ocean\'s mesopelagic zone, often called the Twilight Zone...`,
      questionGroups: [
        {
          id: "c16-l3-qg6",
          type: "sentence_completion",
          title: "Questions 31 – 40",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          summaryTitle: "The Ocean Mesopelagic Twilight Zone",
          wordLimitRule: "ONE WORD ONLY",
          clozeTemplate: `
Location and Depth:
• Extends from 200 metres down to {31} metres beneath the ocean surface
• Very little {32} penetrates this deep layer
Living Organisms:
• Contains up to 90 percent of the world\'s total fish {33}
• Lanternfish produce light using chemical {34}
• Bristlemouth fish are estimated to be the most abundant {35} on Earth
Diel Vertical Migration:
• Millions of animals migrate upward to feed at {36}
• This movement is the largest animal {37} on Earth
• Animals feed on microscopic {38} in surface waters
Carbon Cycle:
• Deep sea creatures sequester vast quantities of {39} to the sea floor
Threats:
• Commercial deep-sea fishing and seabed mineral {40}
          `,
          questions: [
            { questionNumber: 31, prompt: "Extends from 200 metres down to [ 31 ] metres", correctAnswer: "1000", acceptedVariants: ["1,000"], explanation: "Biologist: 'down to 1,000 metres.'", passageEvidence: { paragraph: "Part 4", quote: "1,000 metres" } },
            { questionNumber: 32, prompt: "Very little [ 32 ] penetrates this deep layer", correctAnswer: "sunlight", acceptedVariants: ["light"], explanation: "Biologist notes little sunlight reaches this depth.", passageEvidence: { paragraph: "Part 4", quote: "sunlight" } },
            { questionNumber: 33, prompt: "Contains 90% of the world\'s total fish [ 33 ]", correctAnswer: "biomass", explanation: "Biologist: 'up to 90 percent of global fish biomass.'", passageEvidence: { paragraph: "Part 4", quote: "fish biomass" } },
            { questionNumber: 34, prompt: "Lanternfish produce light using [ 34 ]", correctAnswer: "bioluminescence", acceptedVariants: ["photophores"], explanation: "Biologist explains lanternfish use bioluminescence.", passageEvidence: { paragraph: "Part 4", quote: "bioluminescence" } },
            { questionNumber: 35, prompt: "Bristlemouth fish are the most abundant [ 35 ] on Earth", correctAnswer: "vertebrate", acceptedVariants: ["vertebrates"], explanation: "Biologist: 'most abundant vertebrate on Earth.'", passageEvidence: { paragraph: "Part 4", quote: "abundant vertebrate" } },
            { questionNumber: 36, prompt: "Millions of animals migrate to feed at [ 36 ]", correctAnswer: "night", explanation: "Biologist: 'migrate upward to feed at night.'", passageEvidence: { paragraph: "Part 4", quote: "feed at night" } },
            { questionNumber: 37, prompt: "This is the largest animal [ 37 ] on Earth", correctAnswer: "migration", explanation: "Biologist: 'largest animal migration on the planet.'", passageEvidence: { paragraph: "Part 4", quote: "largest migration" } },
            { questionNumber: 38, prompt: "Animals feed on microscopic [ 38 ] in surface waters", correctAnswer: "plankton", explanation: "Biologist: 'consume phytoplankton and zooplankton.'", passageEvidence: { paragraph: "Part 4", quote: "plankton" } },
            { questionNumber: 39, prompt: "Deep sea creatures sequester vast quantities of [ 39 ]", correctAnswer: "carbon", explanation: "Biologist: 'sequester millions of tons of carbon.'", passageEvidence: { paragraph: "Part 4", quote: "sequester carbon" } },
            { questionNumber: 40, prompt: "Threats include commercial fishing and seabed [ 40 ]", correctAnswer: "mining", explanation: "Biologist: 'threatened by deep-sea mineral mining.'", passageEvidence: { paragraph: "Part 4", quote: "mineral mining" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 3 WRITING
// ==========================================
export const cambridge16Test3Writing: IELTSMockTest = {
  id: "cambridge-16-test-3-writing",
  book: 16,
  testNumber: 3,
  module: "writing",
  title: "Cambridge 16 Academic Writing Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Southwest Airport layout redevelopment",
      passageContent: `<div class="my-6 p-4 bg-white border border-slate-300 rounded-xl shadow-xs">
  <div class="text-center font-bold text-slate-900 text-sm mb-3">Southwest Airport: Current vs Planned Redevelopment</div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border border-slate-200 p-3 rounded-lg bg-slate-50">
      <div class="font-bold text-xs text-slate-800 text-center mb-2">CURRENT AIRPORT</div>
      <div class="space-y-2 text-[11px] text-slate-700">
        <div class="p-2 bg-white rounded border border-slate-200 font-semibold text-center">North Concourse (Gates 1–8)</div>
        <div class="flex gap-2">
          <div class="flex-1 p-2 bg-blue-50 border border-blue-200 rounded text-center">Departures (Left)</div>
          <div class="flex-1 p-2 bg-emerald-50 border border-emerald-200 rounded text-center">Arrivals (Right)</div>
        </div>
        <div class="p-2 bg-amber-50 border border-amber-200 rounded text-center">Security & Check-in Desks</div>
      </div>
    </div>
    <div class="border border-indigo-200 p-3 rounded-lg bg-indigo-50/40">
      <div class="font-bold text-xs text-indigo-900 text-center mb-2">PLANNED REDEVELOPMENT</div>
      <div class="space-y-2 text-[11px] text-slate-700">
        <div class="p-2 bg-white rounded border border-indigo-200 font-semibold text-center">Expanded Concourse: Gates 1–18 (Y-shaped wings)</div>
        <div class="grid grid-cols-3 gap-1.5 text-center text-[10px]">
          <span class="p-1.5 bg-blue-100 rounded">Duty Free Shops</span>
          <span class="p-1.5 bg-emerald-100 rounded">New Cafe</span>
          <span class="p-1.5 bg-purple-100 rounded">Car Hire Desks</span>
        </div>
        <div class="flex gap-2">
          <div class="flex-1 p-2 bg-blue-50 border border-blue-200 rounded text-center">Relocated Departures</div>
          <div class="flex-1 p-2 bg-emerald-50 border border-emerald-200 rounded text-center">Relocated Arrivals</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c16-w3-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The plans below show the site of an airport now and how it will look after planned redevelopment next year.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1 map comparison."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "High sugar food and drink taxation essay",
      passageContent: `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm">
          <p class="font-bold text-slate-900 mb-1">WRITING TASK 2 TOPIC:</p>
          <p class="italic text-slate-700">"Manufactured food and drink that contains high levels of sugar is causing lots of health problems. Some people say that this should be made more expensive to encourage people to consume less of it. Do you agree or disagree?"</p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-w3-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Manufactured food and drink that contains high levels of sugar is causing lots of health problems. Some people say that this should be made more expensive to encourage people to consume less of it.\n\nDo you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2 agree/disagree essay."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 4 READING
// ==========================================
export const cambridge16Test4Reading: IELTSMockTest = {
  id: "cambridge-16-test-4-reading",
  book: 16,
  testNumber: 4,
  module: "reading",
  title: "Cambridge 16 Academic Reading Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Reading Passage 1",
      subtitle: "Roman Tunnels",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            The Romans were among the preeminent tunnel engineers of antiquity. Across Europe, the Middle East, and North Africa, Roman builders cut subterranean passages through solid stone to transport water, drain lakes, and facilitate military movements.
          </p>
          <p>
            <strong>A.</strong> The most common method used by Roman engineers was the 'qanat' method, an excavation technique originally pioneered in ancient Persia. In the qanat method, surveyors first mapped the underground path across a hill using sighting poles and water levels. Workers then sank a series of vertical shafts at regular intervals along the planned alignment. Once these vertical shafts reached the desired subterranean depth, miners tunnelled horizontally between adjacent shafts until the segments connected into a continuous passage. The vertical shafts served multiple critical purposes: they provided continuous fresh air to underground workers, allowed the removal of excavated rock via ropes and baskets, and ensured that multiple teams could dig simultaneously, speeding up construction significantly.
          </p>
          <p>
            <strong>B.</strong> When mountains were too steep or high to sink vertical shafts, engineers were compelled to employ the 'counter-excavation' method, tunnelling from both ends of the mountain toward an anticipated meeting point in the center. Counter-excavation required astonishing surveying precision. Without compasses or laser levels, surveyors relied on geometric sighting rods (the <em>groma</em> and <em>chorobates</em>) to maintain identical horizontal gradients and straight alignments. Even with these tools, deviations were frequent. A famous Latin inscription found at Saldae in modern Algeria records the exasperated report of Roman military engineer Nonius Datus, who arrived at a tunnel site in 152 CE to find that the two excavation teams digging from opposite sides of a mountain had completely missed each other, requiring corrective cross-trenching to connect the passages.
          </p>
          <p>
            <strong>C.</strong> To crack exceptionally hard granite and limestone, Roman miners used the 'fire-setting' method. Large fires were lit directly against the stone face until it reached extreme heat. Miners then dashed cold water or vinegar onto the scorching rock. The violent thermal shock caused the stone to crack and fracture, enabling miners to pry fragments away with iron picks and bronze chisels.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r4-qg1",
          type: "true_false_not_given",
          title: "Questions 1 – 7",
          instructions: "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
          questions: [
            { questionNumber: 1, prompt: "The qanat tunnelling method originated in ancient Persia.", correctAnswer: "TRUE", explanation: "Paragraph A confirms it was originally pioneered in ancient Persia.", passageEvidence: { paragraph: "A", quote: "originally pioneered in ancient Persia" } },
            { questionNumber: 2, prompt: "Vertical shafts in qanat tunnelling provided ventilation for subterranean miners.", correctAnswer: "TRUE", explanation: "Paragraph A states vertical shafts provided continuous fresh air to underground workers.", passageEvidence: { paragraph: "A", quote: "provided continuous fresh air" } },
            { questionNumber: 3, prompt: "The counter-excavation method was preferred when mountains were too steep for vertical shafts.", correctAnswer: "TRUE", explanation: "Paragraph B explains when mountains were too steep to sink shafts, engineers used counter-excavation.", passageEvidence: { paragraph: "B", quote: "When mountains were too steep or high to sink vertical shafts" } },
            { questionNumber: 4, prompt: "Nonius Datus was awarded a gold medal by Emperor Antoninus Pius.", correctAnswer: "NOT GIVEN", explanation: "Paragraph B discusses Nonius Datus solving the alignment error at Saldae, but does not mention receiving a gold medal.", passageEvidence: { paragraph: "B", quote: "Nonius Datus" } },
            { questionNumber: 5, prompt: "At Saldae, the two opposing tunnelling teams met perfectly on their first attempt.", correctAnswer: "FALSE", explanation: "Paragraph B explains the two teams had completely missed each other.", passageEvidence: { paragraph: "B", quote: "had completely missed each other" } },
            { questionNumber: 6, prompt: "Fire-setting involved rapidly cooling heated rock with cold water or vinegar.", correctAnswer: "TRUE", explanation: "Paragraph C notes miners dashed cold water or vinegar onto the scorching rock.", passageEvidence: { paragraph: "C", quote: "dashed cold water or vinegar onto the scorching rock" } },
            { questionNumber: 7, prompt: "Roman miners used gunpowder explosives to widen mountain passes.", correctAnswer: "FALSE", explanation: "Paragraph C clarifies they used fire-setting, iron picks, and chisels; gunpowder was unknown to ancient Rome.", passageEvidence: { paragraph: "C", quote: "iron picks and bronze chisels" } }
          ]
        },
        {
          id: "c16-r4-qg2",
          type: "sentence_completion",
          title: "Questions 8 – 13",
          instructions: "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Roman Underground Construction Techniques",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 8, prompt: "In the qanat method, workers excavated a series of vertical [ 8 ] into the hillside.", correctAnswer: "shafts", explanation: "Paragraph A: 'sank a series of vertical shafts at regular intervals.'", passageEvidence: { paragraph: "A", quote: "vertical shafts" } },
            { questionNumber: 9, prompt: "Excavated stone was hauled out using ropes and [ 9 ].", correctAnswer: "baskets", explanation: "Paragraph A: 'removal of excavated rock via ropes and baskets.'", passageEvidence: { paragraph: "A", quote: "ropes and baskets" } },
            { questionNumber: 10, prompt: "Tunnelling from both sides of a mountain was known as [ 10 ] excavation.", correctAnswer: "counter", acceptedVariants: ["counter-excavation"], explanation: "Paragraph B describes the \'counter-excavation\' method.", passageEvidence: { paragraph: "B", quote: "counter-excavation" } },
            { questionNumber: 11, prompt: "Surveyors used a leveling instrument called the [ 11 ] to verify straight alignments.", correctAnswer: "chorobates", acceptedVariants: ["groma"], explanation: "Paragraph B mentions sighting rods: the groma and chorobates.", passageEvidence: { paragraph: "B", quote: "groma and chorobates" } },
            { questionNumber: 12, prompt: "An ancient Latin inscription in modern [ 12 ] recorded an engineering blunder at Saldae.", correctAnswer: "Algeria", acceptedVariants: ["algeria"], explanation: "Paragraph B mentions Saldae in modern Algeria.", passageEvidence: { paragraph: "B", quote: "Saldae in modern Algeria" } },
            { questionNumber: 13, prompt: "Sudden thermal shock caused heated rock to crack and [ 13 ].", correctAnswer: "fracture", explanation: "Paragraph C: 'thermal shock caused the stone to crack and fracture.'", passageEvidence: { paragraph: "C", quote: "crack and fracture" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Reading Passage 2",
      subtitle: "Changes in Reading Habits in the Digital Age",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Cognitive neuroscientists are warning that widespread screen reading is altering the neural architecture of the human reading brain, prioritizing superficial scanning over contemplative comprehension.
          </p>
          <p>
            <strong>A.</strong> In her influential research, cognitive neuroscientist Maryanne Wolf of UCLA points out that reading is not an innate biological capability like vision or spoken language. Humans were never genetically hardwired to read; the alphabet was invented only a few thousand years ago. To read, the brain must assemble an artificial neural circuit that repurposes visual recognition, auditory processing, and conceptual reasoning networks. Because this reading circuit is plastic and adaptable, it mirrors the medium through which we consume text.
          </p>
          <p>
            <strong>B.</strong> When reading on digital screens—smartphones, laptops, social feeds—our attention is bombarded by hyperlinks, notifications, and visual distractions. Eye-tracking studies demonstrate that digital readers rarely read linearly from left to right. Instead, they skim in an 'F-shaped' pattern: scanning the top couple of lines, skipping halfway down to read another snippet, and darting down the left margin in search of bold keywords.
          </p>
          <p>
            <strong>C.</strong> This habitual skim-reading has consequences. Known as the 'shallowing hypothesis', psychologists find that chronic digital skimmers struggle when confronted with dense, long-form arguments. Cognitive faculties such as critical analysis, analogical reasoning, and empathetic perspective-taking—which require slow, contemplative immersion—are gradually eroded.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r4-qg3",
          type: "summary_completion",
          title: "Questions 14 – 19",
          instructions: "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "The Plastic Reading Circuit",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            { questionNumber: 14, prompt: "Unlike vision, reading is not an [ 14 ] biological ability.", correctAnswer: "innate", acceptedVariants: ["natural"], explanation: "Paragraph A: 'reading is not an innate biological capability.'", passageEvidence: { paragraph: "A", quote: "not an innate biological capability" } },
            { questionNumber: 15, prompt: "To read, human brains assemble an artificial neural [ 15 ].", correctAnswer: "circuit", explanation: "Paragraph A: 'the brain must assemble an artificial neural circuit.'", passageEvidence: { paragraph: "A", quote: "artificial neural circuit" } },
            { questionNumber: 16, prompt: "Eye-tracking reveals screen users read in an [ 16 ] shaped pattern.", correctAnswer: "F", acceptedVariants: ["F-shaped"], explanation: "Paragraph B: 'skim in an F-shaped pattern.'", passageEvidence: { paragraph: "B", quote: "F-shaped pattern" } },
            { questionNumber: 17, prompt: "Digital readers dart their eyes down the margin hunting for bold [ 17 ].", correctAnswer: "keywords", explanation: "Paragraph B: 'search of bold keywords.'", passageEvidence: { paragraph: "B", quote: "bold keywords" } },
            { questionNumber: 18, prompt: "The \'shallowing [ 18 ]\' suggests screen reading weakens deep analysis.", correctAnswer: "hypothesis", explanation: "Paragraph C: 'Known as the shallowing hypothesis.'", passageEvidence: { paragraph: "C", quote: "shallowing hypothesis" } },
            { questionNumber: 19, prompt: "Deep reading promotes cognitive qualities like critical analysis and [ 19 ].", correctAnswer: "empathy", acceptedVariants: ["reasoning"], explanation: "Paragraph C mentions critical analysis, analogical reasoning, and empathetic perspective-taking.", passageEvidence: { paragraph: "C", quote: "empathetic perspective-taking" } }
          ]
        },
        {
          id: "c16-r4-qg4",
          type: "multiple_choice",
          title: "Questions 20 – 26",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 20, prompt: "What foundational premise does Maryanne Wolf emphasize in Paragraph A?", options: ["A. Reading was developed by Neanderthals.", "B. Reading is not hardwired in human genetics.", "C. Children learn to read faster on tablets.", "D. Print books are harmful to visual development."], correctAnswer: "B", explanation: "Paragraph A emphasizes that humans were never genetically hardwired to read.", passageEvidence: { paragraph: "A", quote: "Humans were never genetically hardwired to read" } },
            { questionNumber: 21, prompt: "How do eye-tracking studies describe digital screen reading?", options: ["A. Slow, methodical word-by-word reading", "B. Nonlinear F-shaped skimming pattern", "C. Reading sentences backwards", "D. Reading strictly from bottom to top"], correctAnswer: "B", explanation: "Paragraph B explains readers skim in an F-shaped pattern.", passageEvidence: { paragraph: "B", quote: "skim in an \'F-shaped\' pattern" } },
            { questionNumber: 22, prompt: "What does the \'shallowing hypothesis\' assert?", options: ["A. That people who read online become physically taller.", "B. That chronic digital skimming impairs deep critical comprehension.", "C. That shallow waters reflect light better than deep seas.", "D. That modern digital text uses fewer vowels."], correctAnswer: "B", explanation: "Paragraph C confirms chronic skimming weakens deep analysis and analogical reasoning.", passageEvidence: { paragraph: "C", quote: "shallowing hypothesis" } },
            { questionNumber: 23, prompt: "Why is the neural reading circuit considered \'plastic\'?", options: ["A. Because it is fabricated from synthetic polymers.", "B. Because it adapts to and reflects whichever medium is used.", "C. Because it melts under high fever.", "D. Because it cannot change once established."], correctAnswer: "B", explanation: "Paragraph A states the circuit is plastic and adaptable, mirroring the medium used.", passageEvidence: { paragraph: "A", quote: "reading circuit is plastic and adaptable" } },
            { questionNumber: 24, prompt: "What cognitive faculty is threatened by perpetual skim-reading?", options: ["A. Color vision", "B. Empathetic perspective-taking and analogical reasoning", "C. Finger dexterity on touchscreens", "D. Ability to hear high-pitched whistles"], correctAnswer: "B", explanation: "Paragraph C highlights analogical reasoning and empathetic perspective-taking.", passageEvidence: { paragraph: "C", quote: "empathetic perspective-taking" } },
            { questionNumber: 25, prompt: "What distinguishes print reading from screen reading according to cognitive studies?", options: ["A. Print reading encourages continuous linear immersion.", "B. Print reading causes immediate eye fatigue.", "C. Print books contain interactive hyperlinks.", "D. Print text flashes every twenty seconds."], correctAnswer: "A", explanation: "Passage contrasts print linear immersion with digital F-shaped scanning.", passageEvidence: { paragraph: "B", quote: "read linearly from left to right" } },
            { questionNumber: 26, prompt: "What advice do neuroscientists offer for developing healthy reading habits?", options: ["A. Completely throw away all digital computers.", "B. Cultivate a bi-literate brain that can engage in both digital scanning and deep print reading.", "C. Read only headlines and bullet points.", "D. Avoid reading books over 50 pages."], correctAnswer: "B", explanation: "Scientists advocate cultivating bi-literacy—using digital tools while preserving deep reading circuits.", passageEvidence: { paragraph: "C", quote: "contemplative immersion" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Reading Passage 3",
      subtitle: "Attitudes Towards Artificial Intelligence",
      passageContent: `
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            As artificial intelligence becomes ubiquitous in deciding loan applications, medical diagnoses, and legal sentences, how do human beings perceive machine authority?
          </p>
          <p>
            <strong>A.</strong> For decades, social psychologists documented a phenomenon known as 'algorithm aversion': when humans discover that an automated program has made a mistake, their trust in the algorithm plummets far more steeply than if a human professional had committed the identical error. While humans readily forgive human error as an inevitable foible, machine error is often viewed as unforgivable incompetence.
          </p>
          <p>
            <strong>B.</strong> However, recent experiments by behavioral scientists at the Wharton School have revealed an opposite trend termed 'algorithm appreciation'. When presented with objective numerical tasks—such as predicting box-office revenues, weather patterns, or mortgage defaults—people actually express greater confidence in advice generated by an algorithm than in identical advice attributed to an expert human analyst.
          </p>
          <p>
            <strong>C.</strong> The crucial deciding factor appears to be the subjective versus objective nature of the domain. In analytical tasks governed by mathematics and data, people embrace machine precision. But in subjective domains requiring moral empathy, artistic taste, or judicial fairness, algorithm aversion re-emerges vigorously.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r4-qg5",
          type: "multiple_choice",
          title: "Questions 27 – 30",
          instructions: "Choose the correct letter, A, B, C or D.",
          questions: [
            { questionNumber: 27, prompt: "What defines \'algorithm aversion\' in social psychology?", options: ["A. People disliking smartphones because of battery weight.", "B. A steeper decline in trust when an algorithm errs compared to a human error.", "C. Fear of robots destroying electrical power stations.", "D. Refusing to learn computer programming languages."], correctAnswer: "B", explanation: "Paragraph A defines it: when an automated program makes a mistake, trust plummets far more steeply than for a human error.", passageEvidence: { paragraph: "A", quote: "trust in the algorithm plummets far more steeply" } },
            { questionNumber: 28, prompt: "What did Wharton School researchers discover regarding \'algorithm appreciation\'?", options: ["A. People prefer machine advice over human advice in objective numerical tasks.", "B. People want computers to replace all human artists.", "C. Algorithms are cheaper to buy than calculators.", "D. People trust machines only when they speak with a human voice."], correctAnswer: "A", explanation: "Paragraph B explains people express greater confidence in algorithmic advice for objective numerical tasks.", passageEvidence: { paragraph: "B", quote: "greater confidence in advice generated by an algorithm" } },
            { questionNumber: 29, prompt: "In which domains does algorithm aversion re-emerge most strongly?", options: ["A. Calculating mortgage compound interest", "B. Moral empathy, artistic judgment, and judicial fairness", "C. Sorting postal parcels by barcode", "D. Predicting tomorrow\'s rainfall in millimeters"], correctAnswer: "B", explanation: "Paragraph C notes aversion returns in subjective domains requiring moral empathy and fairness.", passageEvidence: { paragraph: "C", quote: "moral empathy, artistic taste, or judicial fairness" } },
            { questionNumber: 30, prompt: "How do humans treat human mistakes compared to algorithmic mistakes?", options: ["A. Human errors are forgiven more easily than machine errors.", "B. Human errors are punished by life imprisonment.", "C. Machine errors are celebrated with awards.", "D. Both are treated with identical indifference."], correctAnswer: "A", explanation: "Paragraph A states humans readily forgive human error, but view machine error as unforgivable.", passageEvidence: { paragraph: "A", quote: "humans readily forgive human error as an inevitable foible" } }
          ]
        },
        {
          id: "c16-r4-qg6",
          type: "matching_features",
          title: "Questions 31 – 35",
          instructions: "Match each scenario with the predominant human attitude, A or B.",
          questions: [
            { questionNumber: 31, prompt: "Predicting financial stock market fluctuations from quarterly spreadsheets", options: ["A. Algorithm appreciation", "B. Algorithm aversion"], correctAnswer: "A", explanation: "Objective numerical forecasting triggers algorithm appreciation.", passageEvidence: { paragraph: "B", quote: "objective numerical tasks" } },
            { questionNumber: 32, prompt: "Determining a criminal sentence for a juvenile offender", options: ["A. Algorithm appreciation", "B. Algorithm aversion"], correctAnswer: "B", explanation: "Judicial sentencing involves moral empathy, prompting aversion.", passageEvidence: { paragraph: "C", quote: "judicial fairness, algorithm aversion re-emerges" } },
            { questionNumber: 33, prompt: "Calculating optimal fuel flight trajectories for commercial airlines", options: ["A. Algorithm appreciation", "B. Algorithm aversion"], correctAnswer: "A", explanation: "Mathematical calculations trigger algorithm appreciation.", passageEvidence: { paragraph: "B", quote: "predicting box-office revenues, weather patterns" } },
            { questionNumber: 34, prompt: "Evaluating creative poetry in an international literary contest", options: ["A. Algorithm appreciation", "B. Algorithm aversion"], correctAnswer: "B", explanation: "Artistic evaluation requires subjective taste, causing aversion.", passageEvidence: { paragraph: "C", quote: "artistic taste" } },
            { questionNumber: 35, prompt: "Diagnosing bone fractures from calibrated X-ray imagery", options: ["A. Algorithm appreciation", "B. Algorithm aversion"], correctAnswer: "A", explanation: "Visual data analysis shows strong appreciation when calibrated.", passageEvidence: { paragraph: "B", quote: "numerical tasks" } }
          ]
        },
        {
          id: "c16-r4-qg7",
          type: "sentence_completion",
          title: "Questions 36 – 40",
          instructions: "Complete the sentences below. Choose NO MORE THAN TWO WORDS from the passage for each answer.",
          summaryTitle: "Perceptions of Algorithmic Authority",
          wordLimitRule: "NO MORE THAN TWO WORDS",
          questions: [
            { questionNumber: 36, prompt: "When machines commit errors, people view it as unforgivable [ 36 ].", correctAnswer: "incompetence", explanation: "Paragraph A: 'machine error is often viewed as unforgivable incompetence.'", passageEvidence: { paragraph: "A", quote: "unforgivable incompetence" } },
            { questionNumber: 37, prompt: "Wharton School experiments identified a counter-trend termed algorithm [ 37 ].", correctAnswer: "appreciation", explanation: "Paragraph B: 'an opposite trend termed algorithm appreciation.'", passageEvidence: { paragraph: "B", quote: "algorithm appreciation" } },
            { questionNumber: 38, prompt: "People welcome machine guidance in objective [ 38 ] tasks.", correctAnswer: "numerical", explanation: "Paragraph B: 'presented with objective numerical tasks.'", passageEvidence: { paragraph: "B", quote: "objective numerical tasks" } },
            { questionNumber: 39, prompt: "In subjective domains requiring [ 39 ] empathy, machine skepticism rises.", correctAnswer: "moral", explanation: "Paragraph C: 'subjective domains requiring moral empathy.'", passageEvidence: { paragraph: "C", quote: "moral empathy" } },
            { questionNumber: 40, prompt: "Decisions involving artistic [ 40 ] remain firmly guarded by humans.", correctAnswer: "taste", explanation: "Paragraph C mentions artistic taste and judicial fairness.", passageEvidence: { paragraph: "C", quote: "artistic taste" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 4 LISTENING
// ==========================================
export const cambridge16Test4Listening: IELTSMockTest = {
  id: "cambridge-16-test-4-listening",
  book: 16,
  testNumber: 4,
  module: "listening",
  title: "Cambridge 16 Academic Listening Test 4",
  durationMinutes: 35,
  audioUrl: "/audio/cam18-test4-part1.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Listening Part 1",
      subtitle: "Cottage Holiday Rental Enquiry",
      audioUrl: "/audio/cam18-test4-part1.mp3",
      transcript: `
        AGENT: Good morning, Coastal Retreats. How can I help you?
        CALLER: Hello, I\'m looking to book a self-catering holiday cottage in Cornwall for my family.
        AGENT: Wonderful! When are you planning to visit?
        CALLER: For one week starting on Saturday the 14th of August.
      `,
      questionGroups: [
        {
          id: "c16-l4-qg1",
          type: "form_completion",
          title: "Questions 1 – 10",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          summaryTitle: "Holiday Rental Reservation Form",
          wordLimitRule: "ONE WORD AND/OR A NUMBER",
          clozeTemplate: `
Coastal Holiday Reservation:
Caller surname: {1}
Contact mobile: 07911 {2}
Cottage name: Sea {3} Cottage
Arrival date: Saturday 14th of {4}
Rental duration: {5} nights
Number of guests: 4 adults and 2 {6}
Key features:
• Enclosed rear {7} suitable for pets
• Panoramic views of the sandy {8}
Deposit amount: £{9} paid by debit card
Key collection: Lockbox code sent via {10}
          `,
          questions: [
            { questionNumber: 1, prompt: "Caller surname: [ 1 ]", correctAnswer: "Bradshaw", acceptedVariants: ["bradshaw"], explanation: "Caller: Mrs. Bradshaw.", passageEvidence: { paragraph: "Part 1", quote: "Bradshaw" } },
            { questionNumber: 2, prompt: "Contact mobile: 07911 [ 2 ]", correctAnswer: "834921", explanation: "Mobile number recorded.", passageEvidence: { paragraph: "Part 1", quote: "834921" } },
            { questionNumber: 3, prompt: "Cottage name: Sea [ 3 ] Cottage", correctAnswer: "Breeze", acceptedVariants: ["breeze"], explanation: "Property name: Sea Breeze Cottage.", passageEvidence: { paragraph: "Part 1", quote: "Sea Breeze Cottage" } },
            { questionNumber: 4, prompt: "Arrival date: Saturday 14th of [ 4 ]", correctAnswer: "August", acceptedVariants: ["august"], explanation: "Arrival on 14th of August.", passageEvidence: { paragraph: "Part 1", quote: "14th of August" } },
            { questionNumber: 5, prompt: "Rental duration: [ 5 ] nights", correctAnswer: "7", acceptedVariants: ["seven"], explanation: "One week equals 7 nights.", passageEvidence: { paragraph: "Part 1", quote: "7 nights" } },
            { questionNumber: 6, prompt: "Number of guests: 4 adults and 2 [ 6 ]", correctAnswer: "children", acceptedVariants: ["kids"], explanation: "4 adults and 2 children.", passageEvidence: { paragraph: "Part 1", quote: "2 children" } },
            { questionNumber: 7, prompt: "Enclosed rear [ 7 ] suitable for pets", correctAnswer: "garden", explanation: "Cottage has enclosed rear garden.", passageEvidence: { paragraph: "Part 1", quote: "rear garden" } },
            { questionNumber: 8, prompt: "Panoramic views of the sandy [ 8 ]", correctAnswer: "beach", explanation: "Views of the sandy beach.", passageEvidence: { paragraph: "Part 1", quote: "sandy beach" } },
            { questionNumber: 9, prompt: "Deposit amount: £ [ 9 ]", correctAnswer: "200", explanation: "Deposit is 200 pounds.", passageEvidence: { paragraph: "Part 1", quote: "200 pounds" } },
            { questionNumber: 10, prompt: "Lockbox code sent via [ 10 ]", correctAnswer: "email", acceptedVariants: ["SMS", "text"], explanation: "Sent via email confirmation.", passageEvidence: { paragraph: "Part 1", quote: "via email" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Listening Part 2",
      subtitle: "Ancient Oak Woodland Walking Tour",
      audioUrl: "/audio/cam18-test4-part1.mp3",
      transcript: `RANGER: Welcome walkers to Blackwood Forest nature reserve...`,
      questionGroups: [
        {
          id: "c16-l4-qg2",
          type: "multiple_choice",
          title: "Questions 11 – 15",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 11, prompt: "How old is the oldest oak tree in the reserve?", options: ["A. Approximately 200 years old", "B. Over 800 years old", "C. Exactly 50 years old"], correctAnswer: "B", explanation: "Ranger highlights the King Oak, over 800 years old.", passageEvidence: { paragraph: "Part 2", quote: "over 800 years old" } },
            { questionNumber: 12, prompt: "What nocturnal mammal is frequently spotted near the quarry?", options: ["A. Wild boar", "B. Badgers", "C. Red foxes"], correctAnswer: "B", explanation: "Badgers inhabit setts near the old quarry.", passageEvidence: { paragraph: "Part 2", quote: "badger setts" } },
            { questionNumber: 13, prompt: "Why are visitors asked to stay strictly on gravel footpaths?", options: ["A. To protect rare ground orchids and fungal networks", "B. Because of unexploded wartime mines", "C. To prevent scaring sheep"], correctAnswer: "A", explanation: "Protects delicate ground orchids and mycelium.", passageEvidence: { paragraph: "Part 2", quote: "rare orchids" } },
            { questionNumber: 14, prompt: "What equipment is provided free of charge at the visitor hut?", options: ["A. Walking poles and binoculars", "B. Rubber boots only", "C. Night-vision goggles"], correctAnswer: "A", explanation: "Walking poles and binoculars can be borrowed.", passageEvidence: { paragraph: "Part 2", quote: "walking poles and binoculars" } },
            { questionNumber: 15, prompt: "Where does the circular 5-kilometre trail conclude?", options: ["A. At the waterfall tea rooms", "B. At the railway station", "C. In the village square"], correctAnswer: "A", explanation: "Concludes at the waterfall tea rooms.", passageEvidence: { paragraph: "Part 2", quote: "waterfall tea rooms" } }
          ]
        },
        {
          id: "c16-l4-qg3",
          type: "matching_features",
          title: "Questions 16 – 20",
          instructions: "Match each trail section with its primary natural feature, A – F.",
          questions: [
            { questionNumber: 16, prompt: "The Bluebell Clearing (Section 1)", options: ["A. Dense spring wildflower carpet", "B. Steep rocky waterfall gorge", "C. Ancient Roman charcoal burning pits", "D. Panoramic valley viewpoint", "E. Bat roosting caves", "F. Wooden bird observation blind"], correctAnswer: "A", explanation: "Section 1 carpeted with bluebells.", passageEvidence: { paragraph: "Part 2", quote: "bluebell carpet" } },
            { questionNumber: 17, prompt: "The Gorge Walk (Section 2)", options: ["A. Dense spring wildflower carpet", "B. Steep rocky waterfall gorge", "C. Ancient Roman charcoal burning pits", "D. Panoramic valley viewpoint", "E. Bat roosting caves", "F. Wooden bird observation blind"], correctAnswer: "B", explanation: "Section 2 follows the steep rocky waterfall gorge.", passageEvidence: { paragraph: "Part 2", quote: "waterfall gorge" } },
            { questionNumber: 18, prompt: "The Ridge (Section 3)", options: ["A. Dense spring wildflower carpet", "B. Steep rocky waterfall gorge", "C. Ancient Roman charcoal burning pits", "D. Panoramic valley viewpoint", "E. Bat roosting caves", "F. Wooden bird observation blind"], correctAnswer: "D", explanation: "The Ridge offers panoramic valley viewpoints.", passageEvidence: { paragraph: "Part 2", quote: "valley viewpoint" } },
            { questionNumber: 19, prompt: "The Charcoal Copse (Section 4)", options: ["A. Dense spring wildflower carpet", "B. Steep rocky waterfall gorge", "C. Ancient Roman charcoal burning pits", "D. Panoramic valley viewpoint", "E. Bat roosting caves", "F. Wooden bird observation blind"], correctAnswer: "C", explanation: "Archaeological charcoal burning pits.", passageEvidence: { paragraph: "Part 2", quote: "charcoal burning pits" } },
            { questionNumber: 20, prompt: "The Marsh Wetland (Section 5)", options: ["A. Dense spring wildflower carpet", "B. Steep rocky waterfall gorge", "C. Ancient Roman charcoal burning pits", "D. Panoramic valley viewpoint", "E. Bat roosting caves", "F. Wooden bird observation blind"], correctAnswer: "F", explanation: "Features wooden bird hide.", passageEvidence: { paragraph: "Part 2", quote: "bird observation blind" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Listening Part 3",
      subtitle: "Museum Architecture and Visitor Experience",
      audioUrl: "/audio/cam18-test4-part1.mp3",
      transcript: `TUTOR: Let\'s discuss your thesis on interactive museum architecture...`,
      questionGroups: [
        {
          id: "c16-l4-qg4",
          type: "multiple_choice",
          title: "Questions 21 – 25",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            { questionNumber: 21, prompt: "How has museum lighting design changed in recent years?", options: ["A. Natural daylighting is integrated using UV-filtering glass.", "B. All lights are turned off for atmosphere.", "C. High-intensity floodlights are aimed directly at paintings."], correctAnswer: "A", explanation: "Architects integrate daylight with UV-filtering glass.", passageEvidence: { paragraph: "Part 3", quote: "UV-filtering glass" } },
            { questionNumber: 22, prompt: "What is the primary benefit of open-circulation galleries?", options: ["A. Allowing visitors to choose personal non-linear routes", "B. Selling more drinks", "C. Reducing carpet wear"], correctAnswer: "A", explanation: "Allows visitors to curate their own path.", passageEvidence: { paragraph: "Part 3", quote: "non-linear routes" } },
            { questionNumber: 23, prompt: "What challenge arises from interactive touchscreen kiosks?", options: ["A. Queues forming and interrupting visual flow", "B. High software subscription fees", "C. Breakages from toddlers"], correctAnswer: "A", explanation: "Queues congregate around screens.", passageEvidence: { paragraph: "Part 3", quote: "queues forming" } },
            { questionNumber: 24, prompt: "What acoustic treatment was applied to the central atrium?", options: ["A. Micro-perforated timber ceiling baffles", "B. Heavy velvet drapes on every wall", "C. Concrete acoustic reflectors"], correctAnswer: "A", explanation: "Micro-perforated timber baffles absorb reverberation.", passageEvidence: { paragraph: "Part 3", quote: "timber baffles" } },
            { questionNumber: 25, prompt: "What do the students recommend regarding museum cafes?", options: ["A. Locating them on the ground floor with public street access", "B. Replacing them with vending machines", "C. Moving them to the roof"], correctAnswer: "A", explanation: "Ground floor location draws outside pedestrian footfall.", passageEvidence: { paragraph: "Part 3", quote: "ground floor with street access" } }
          ]
        },
        {
          id: "c16-l4-qg5",
          type: "multiple_choice_multi",
          title: "Questions 26 – 30",
          instructions: "Choose FIVE letters, A – H. Which FIVE design strategies improved visitor dwell time?",
          questions: [
            { questionNumber: 26, prompt: "Strategy 1", options: ["A. Comfortable bench seating", "B. Clear sightlines between exhibits", "C. Free high-speed Wi-Fi", "D. Quiet contemplation alcoves", "E. Tactile handling objects", "F. Forced one-way corridors", "G. Loud background music", "H. Flashing neon signage"], correctAnswer: "A", explanation: "Plentiful bench seating reduces museum fatigue.", passageEvidence: { paragraph: "Part 3", quote: "bench seating" } },
            { questionNumber: 27, prompt: "Strategy 2", options: ["A. Comfortable bench seating", "B. Clear sightlines between exhibits", "C. Free high-speed Wi-Fi", "D. Quiet contemplation alcoves", "E. Tactile handling objects", "F. Forced one-way corridors", "G. Loud background music", "H. Flashing neon signage"], correctAnswer: "B", explanation: "Clear sightlines invite exploration.", passageEvidence: { paragraph: "Part 3", quote: "clear sightlines" } },
            { questionNumber: 28, prompt: "Strategy 3", options: ["A. Comfortable bench seating", "B. Clear sightlines between exhibits", "C. Free high-speed Wi-Fi", "D. Quiet contemplation alcoves", "E. Tactile handling objects", "F. Forced one-way corridors", "G. Loud background music", "H. Flashing neon signage"], correctAnswer: "C", explanation: "Wi-Fi enables digital guide downloads.", passageEvidence: { paragraph: "Part 3", quote: "Wi-Fi" } },
            { questionNumber: 29, prompt: "Strategy 4", options: ["A. Comfortable bench seating", "B. Clear sightlines between exhibits", "C. Free high-speed Wi-Fi", "D. Quiet contemplation alcoves", "E. Tactile handling objects", "F. Forced one-way corridors", "G. Loud background music", "H. Flashing neon signage"], correctAnswer: "D", explanation: "Contemplation alcoves allow reflective rest.", passageEvidence: { paragraph: "Part 3", quote: "contemplation alcoves" } },
            { questionNumber: 30, prompt: "Strategy 5", options: ["A. Comfortable bench seating", "B. Clear sightlines between exhibits", "C. Free high-speed Wi-Fi", "D. Quiet contemplation alcoves", "E. Tactile handling objects", "F. Forced one-way corridors", "G. Loud background music", "H. Flashing neon signage"], correctAnswer: "E", explanation: "Hands-on replicas engage sensory touch.", passageEvidence: { paragraph: "Part 3", quote: "tactile handling" } }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Listening Part 4",
      subtitle: "Subterranean Urban Architecture",
      audioUrl: "/audio/cam18-test4-part1.mp3",
      transcript: `PROFESSOR: Good morning. Today we examine subterranean architecture in densely populated modern metropolises...`,
      questionGroups: [
        {
          id: "c16-l4-qg6",
          type: "sentence_completion",
          title: "Questions 31 – 40",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          summaryTitle: "Underground Urban Architecture",
          wordLimitRule: "ONE WORD ONLY",
          clozeTemplate: `
Benefits of Subterranean Construction:
• Relieves severe surface land {31} in expanding cities
• Naturally stable ground {32} minimizes heating and cooling energy
• Provides shelter against extreme surface {33} conditions
Notable Examples:
• Montreal\'s Underground City covers over 32 kilometres of {34} corridors
• Helsinki\'s Master Plan reserves subterranean bedrock for swimming pools and {35} shelters
Engineering Challenges:
• Excavation requires heavy geotechnical drilling through solid {36}
• Pumping groundwater is essential to avoid structural {37}
Psychological Factors:
• Lack of natural daylight can cause disorientation and {38}
• Architects incorporate fiber-optic sunpipes and artificial {39} light
Future Outlook:
• Subterranean multi-level freight delivery will reduce surface truck {40}
          `,
          questions: [
            { questionNumber: 31, prompt: "Relieves surface land [ 31 ] in expanding cities", correctAnswer: "scarcity", acceptedVariants: ["shortage"], explanation: "Lecturer: 'relieves urban land scarcity.'", passageEvidence: { paragraph: "Part 4", quote: "land scarcity" } },
            { questionNumber: 32, prompt: "Naturally stable ground [ 32 ] minimizes energy", correctAnswer: "temperature", acceptedVariants: ["temperatures"], explanation: "Lecturer: 'stable ground temperature saves HVAC energy.'", passageEvidence: { paragraph: "Part 4", quote: "ground temperature" } },
            { questionNumber: 33, prompt: "Shelter against extreme surface [ 33 ] conditions", correctAnswer: "weather", acceptedVariants: ["climate"], explanation: "Lecturer: 'insulates against harsh surface weather.'", passageEvidence: { paragraph: "Part 4", quote: "surface weather" } },
            { questionNumber: 34, prompt: "Montreal covers 32 kilometres of [ 34 ] corridors", correctAnswer: "pedestrian", explanation: "Lecturer: '32 kilometres of interconnected pedestrian corridors.'", passageEvidence: { paragraph: "Part 4", quote: "pedestrian corridors" } },
            { questionNumber: 35, prompt: "Helsinki reserves bedrock for swimming pools and [ 35 ] shelters", correctAnswer: "emergency", acceptedVariants: ["bomb"], explanation: "Lecturer: 'civil defense emergency shelters.'", passageEvidence: { paragraph: "Part 4", quote: "emergency shelters" } },
            { questionNumber: 36, prompt: "Excavation requires drilling through solid [ 36 ]", correctAnswer: "bedrock", acceptedVariants: ["rock"], explanation: "Lecturer: 'tunneling through hard crystalline bedrock.'", passageEvidence: { paragraph: "Part 4", quote: "solid bedrock" } },
            { questionNumber: 37, prompt: "Pumping groundwater avoids structural [ 37 ]", correctAnswer: "flooding", acceptedVariants: ["damage"], explanation: "Lecturer: 'preventing subterranean flooding.'", passageEvidence: { paragraph: "Part 4", quote: "avoid flooding" } },
            { questionNumber: 38, prompt: "Lack of daylight can cause disorientation and [ 38 ]", correctAnswer: "claustrophobia", acceptedVariants: ["anxiety"], explanation: "Lecturer: 'feelings of claustrophobia and disorientation.'", passageEvidence: { paragraph: "Part 4", quote: "claustrophobia" } },
            { questionNumber: 39, prompt: "Architects incorporate artificial [ 39 ] light", correctAnswer: "skylight", acceptedVariants: ["circadian"], explanation: "Lecturer: 'simulated artificial skylight fixtures.'", passageEvidence: { paragraph: "Part 4", quote: "artificial skylight" } },
            { questionNumber: 40, prompt: "Multi-level freight will reduce surface truck [ 40 ]", correctAnswer: "traffic", acceptedVariants: ["congestion"], explanation: "Lecturer: 'relieving surface vehicular traffic.'", passageEvidence: { paragraph: "Part 4", quote: "truck traffic" } }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 16 ACADEMIC - TEST 4 WRITING
// ==========================================
export const cambridge16Test4Writing: IELTSMockTest = {
  id: "cambridge-16-test-4-writing",
  book: 16,
  testNumber: 4,
  module: "writing",
  title: "Cambridge 16 Academic Writing Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Plastic bottle recycling process",
      passageContent: `<div class="my-6 p-4 bg-white border border-slate-300 rounded-xl shadow-xs">
  <div class="text-center font-bold text-slate-900 text-sm mb-3">Plastic Bottle Recycling Process</div>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
    <div class="bg-sky-50 border border-sky-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-sky-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">1</span>
      <div class="font-bold text-slate-900">Collection</div>
      <div class="text-slate-600 mt-0.5">Recycling bins & trucks</div>
    </div>
    <div class="bg-sky-50 border border-sky-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-sky-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">2</span>
      <div class="font-bold text-slate-900">Sorting</div>
      <div class="text-slate-600 mt-0.5">Separated by polymer/colour</div>
    </div>
    <div class="bg-sky-50 border border-sky-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-sky-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">3</span>
      <div class="font-bold text-slate-900">Compacting</div>
      <div class="text-slate-600 mt-0.5">Pressed into tight bales</div>
    </div>
    <div class="bg-sky-50 border border-sky-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-sky-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">4</span>
      <div class="font-bold text-slate-900">Shredding</div>
      <div class="text-slate-600 mt-0.5">Flaked and washed</div>
    </div>
    <div class="bg-teal-50 border border-teal-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-teal-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">5</span>
      <div class="font-bold text-slate-900">Pelletizing</div>
      <div class="text-slate-600 mt-0.5">Extruded into plastic pellets</div>
    </div>
    <div class="bg-teal-50 border border-teal-200 p-3 rounded-lg text-center">
      <span class="w-6 h-6 rounded-full bg-teal-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">6</span>
      <div class="font-bold text-slate-900">Melting</div>
      <div class="text-slate-600 mt-0.5">Heated for manufacturing</div>
    </div>
    <div class="bg-teal-50 border border-teal-200 p-3 rounded-lg text-center col-span-1 sm:col-span-2">
      <span class="w-6 h-6 rounded-full bg-teal-600 text-white font-bold inline-flex items-center justify-center text-xs mb-1.5">7</span>
      <div class="font-bold text-slate-900">New Products</div>
      <div class="text-slate-600 mt-0.5">New bottles, clothing fibres, containers, bags</div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c16-w4-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagram below shows the process for recycling plastic bottles.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1 industrial recycling process."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Autonomous driverless vehicles essay",
      passageContent: `
        <div class="p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm">
          <p class="font-bold text-slate-900 mb-1">WRITING TASK 2 TOPIC:</p>
          <p class="italic text-slate-700">"In the future, all cars, buses and trucks will be driverless. The only people travelling inside these vehicles will be passengers. Do you think the advantages of driverless vehicles outweigh the disadvantages?"</p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-w4-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In the future, all cars, buses and trucks will be driverless. The only people travelling inside these vehicles will be passengers.\n\nDo you think the advantages of driverless vehicles outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2 advantages vs disadvantages essay."
            }
          ]
        }
      ]
    }
  ]
};
