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
            <strong>A.</strong> Polar bears (<em>Ursus maritimus</em>) are the world's largest land carnivores and an iconic symbol of the Arctic wilderness. However, their reliance on sea ice for hunting seals—their primary source of food—means they are at immediate risk from global warming. As Arctic sea ice melts earlier in spring and refreezes later in autumn, polar bears are forced to spend longer periods fasting on land. During autumn, up to 50 percent of a polar bear's total body weight consists of subcutaneous adipose tissue (fat). In humans, such high levels of adipose tissue would lead to cardiovascular disease, high blood pressure, and diabetes, yet polar bears suffer from no such health problems.
          </p>
          <p>
            <strong>B.</strong> In 2014, a team of researchers led by Eline Lorenzen and Shi Liu from the University of Copenhagen, together with scientists from UC Berkeley and BGI-Shenzhen, published a landmark comparative genomic study. The study by Liu and his colleagues did not compare different populations of polar bears; rather, they sequenced the complete genomes of 79 polar bears and 10 brown bears (grizzly bears). Their analysis determined that polar bears diverged from brown bears between 400,000 and 500,000 years ago. While this was not the first time geneticists had compared polar bears and brown bears, this comprehensive study revealed the exact genes responsible for their cold-climate adaptations.
          </p>
          <p>
            <strong>C.</strong> Among these adaptations, the most important is the <em>APOB</em> (apolipoprotein B) gene. In polar bears, mutations in <em>APOB</em> allow the bears to clear low-density lipoproteins (LDL)—so-called 'bad' cholesterol—from their bloodstream with tremendous efficiency. Polar bears are thus able to genetically control their cholesterol levels despite their extremely fatty diet.
          </p>
          <p>
            <strong>D.</strong> Female polar bears display another remarkable physiological capability: during pregnancy and cub rearing, they enter snow dens for approximately six months. During this prolonged period, female polar bears survive without any food or water, nursing their cubs through dormancy. Remarkably, when they emerge from their dens in spring, their skeletal bone density remains intact and unaffected by osteopenia, whereas bedridden humans lose significant bone density in just a few weeks. Medical researchers believe that understanding the polar bear's mechanism for preserving bone mass could one day lead to breakthrough therapies for human osteoporosis.
          </p>
          <p>
            <strong>E.</strong> Aside from their physiological marvels, field observations demonstrate that polar bears possess acute problem-solving capabilities. While popular culture often portrays wild bears as unintelligent and violent creatures, behavioural scientists have documented numerous examples of bear cognition. For instance, GoGo, a male polar bear at Tennoji Zoo in Osaka, was observed deliberately utilizing a tree branch as a tool to knock down a suspended piece of meat that was positioned well beyond his physical reach.
          </p>
          <p>
            <strong>F.</strong> In the Canadian wild, an inventive polar bear was seen systematically manipulating empty fuel barrels, rolling and stacking them to construct a temporary platform that allowed it to reach an elevated wildlife photographer. Biologist Alison Ames observed captive polar bears repeatedly stacking objects and knocking them over in an activity that bore all the hallmarks of a playful game. Furthermore, field researchers noted that when a polar bear fails in an ambush and misses a seal, it may thrash the ice and kick snow around in an unmistakable display of emotional frustration.
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
            {
              questionNumber: 1,
              prompt: "Polar bears suffer from various health problems due to the build-up of fat under their skin.",
              correctAnswer: "FALSE",
              explanation: "Paragraph A states that although up to 50 percent of their body weight consists of fat, polar bears experience no such cardiovascular or health problems.",
              passageEvidence: { paragraph: "A", quote: "yet polar bears suffer from no such health problems" }
            },
            {
              questionNumber: 2,
              prompt: "The study done by Liu and his colleagues compared different groups of polar bears.",
              correctAnswer: "FALSE",
              explanation: "Paragraph B explicitly states that the study did not compare different groups of polar bears, but rather compared polar bears with brown bears.",
              passageEvidence: { paragraph: "B", quote: "did not compare different populations of polar bears; rather, they sequenced the complete genomes of 79 polar bears and 10 brown bears" }
            },
            {
              questionNumber: 3,
              prompt: "Liu and colleagues were the first researchers to compare polar bears and brown bears genetically.",
              correctAnswer: "NOT GIVEN",
              explanation: "Paragraph B clarifies that 'this was not the first time geneticists had compared polar bears and brown bears', meaning they were not the first.",
              passageEvidence: { paragraph: "B", quote: "While this was not the first time geneticists had compared polar bears and brown bears" }
            },
            {
              questionNumber: 4,
              prompt: "Polar bears are able to control their levels of 'bad' cholesterol by genetic means.",
              correctAnswer: "TRUE",
              explanation: "Paragraph C explains that mutations in the APOB gene allow polar bears to genetically control their cholesterol levels.",
              passageEvidence: { paragraph: "C", quote: "Polar bears are thus able to genetically control their cholesterol levels" }
            },
            {
              questionNumber: 5,
              prompt: "Female polar bears are able to survive for about six months without food.",
              correctAnswer: "TRUE",
              explanation: "Paragraph D states that during pregnancy and cub rearing, female polar bears enter snow dens for approximately six months without any food or water.",
              passageEvidence: { paragraph: "D", quote: "enter snow dens for approximately six months. During this prolonged period, female polar bears survive without any food or water" }
            },
            {
              questionNumber: 6,
              prompt: "It was found that the bones of female polar bears were very weak when they came out of their dens in spring.",
              correctAnswer: "FALSE",
              explanation: "Paragraph D states that when they emerge from their dens in spring, their skeletal bone density remains intact and unaffected by osteopenia.",
              passageEvidence: { paragraph: "D", quote: "their skeletal bone density remains intact and unaffected by osteopenia" }
            },
            {
              questionNumber: 7,
              prompt: "The polar bear's mechanism for increasing bone density could also be used by people one day.",
              correctAnswer: "TRUE",
              explanation: "Paragraph D confirms that medical researchers believe understanding this mechanism could one day lead to breakthrough therapies for human osteoporosis.",
              passageEvidence: { paragraph: "D", quote: "could one day lead to breakthrough therapies for human osteoporosis" }
            }
          ]
        },
        {
          id: "c16-r1-qg2",
          type: "table_completion",
          title: "Questions 8 – 13",
          instructions: "Complete the table below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "Reasons why polar bears should be protected",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            {
              questionNumber: 8,
              prompt: "People think of bears as unintelligent and [ 8 ].",
              correctAnswer: "violent",
              acceptedVariants: ["violent"],
              explanation: "Paragraph E notes: 'While popular culture often portrays wild bears as unintelligent and violent creatures...'",
              passageEvidence: { paragraph: "E", quote: "unintelligent and violent creatures" }
            },
            {
              questionNumber: 9,
              prompt: "A bear has been seen using a tree branch as a [ 9 ].",
              correctAnswer: "tool",
              acceptedVariants: ["tool"],
              explanation: "Paragraph E: 'deliberately utilizing a tree branch as a tool'",
              passageEvidence: { paragraph: "E", quote: "utilizing a tree branch as a tool" }
            },
            {
              questionNumber: 10,
              prompt: "This allowed him to knock down a piece of [ 10 ].",
              correctAnswer: "meat",
              acceptedVariants: ["meat"],
              explanation: "Paragraph E: 'to knock down a suspended piece of meat'",
              passageEvidence: { paragraph: "E", quote: "knock down a suspended piece of meat" }
            },
            {
              questionNumber: 11,
              prompt: "A wild bear was observed jumping onto barrels to reach a [ 11 ] on a platform.",
              correctAnswer: "photographer",
              acceptedVariants: ["photographer"],
              explanation: "Paragraph F: 'reach an elevated wildlife photographer'",
              passageEvidence: { paragraph: "F", quote: "reach an elevated wildlife photographer" }
            },
            {
              questionNumber: 12,
              prompt: "Bears were seen piling up objects and knocking them over in an activity similar to a [ 12 ].",
              correctAnswer: "game",
              acceptedVariants: ["game"],
              explanation: "Paragraph F: 'bore all the hallmarks of a playful game'",
              passageEvidence: { paragraph: "F", quote: "playful game" }
            },
            {
              questionNumber: 13,
              prompt: "Bears may make movements suggesting [ 13 ] when they miss a kill.",
              correctAnswer: "frustration",
              acceptedVariants: ["frustration"],
              explanation: "Paragraph F: 'in an unmistakable display of emotional frustration'",
              passageEvidence: { paragraph: "F", quote: "emotional frustration" }
            }
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
            <strong>A.</strong> The pyramids are the most iconic symbols of ancient Egyptian civilization. Yet for all the fame of Pharaoh Djoser, who reigned during the Third Dynasty (circa 2670 BCE), very little is known about his life with certainty. While some surviving dynastic records state that his reign lasted for 19 years, other historical sources and modern egyptologists argue that his reign spanned more than three decades. The single certainty among these conflicting details is that he commissioned the world's first great stone pyramid complex at Saqqara.
          </p>
          <p>
            <strong>B.</strong> Pharaoh Djoser's chief minister and master builder was Imhotep, later revered as a polymath and deified as the patron god of architects and physicians. Before Imhotep, Egyptian monarchs and nobles were buried in rectangular, flat-roofed mastabas constructed of sundried mudbrick. Imhotep conceived of an entirely new idea: replacing mudbrick with quarried limestone blocks, ensuring that the pharaoh's eternal dwelling would endure through the ages without succumbing to grave robbers or natural erosion.
          </p>
          <p>
            <strong>C.</strong> Constructing a multi-tiered stone monument on this scale was a difficult and arduous task for the thousands of masons, quarrymen, and labourers involved. Instead of simply building a traditional single-level mastaba, Imhotep repeatedly expanded the square stone base and progressively erected smaller stone tiers on top of one another. The final monument consisted of six distinct tiers reaching a height of 62 metres, soaring high above the desert horizon.
          </p>
          <p>
            <strong>D.</strong> The Step Pyramid stood at the heart of an immense mortuary complex that encompassed approximately 15 hectares—the size of an entire ancient Egyptian city. The complex was enclosed by an imposing 10.5-metre-high wall of fine Tura limestone. Beyond the pyramid itself, the walled precinct contained shrines, temples, courtyards for the Heb-Sed jubilee festival, and comfortable residential quarters occupied by the attending priests. The perimeter wall was ringed by an enormous trench 750 metres long and 40 metres wide, and visitors were prevented from entering unless they knew the exact location of the single true entrance concealed among fourteen false gates.
          </p>
          <p>
            <strong>E.</strong> Beneath the base of the pyramid lies a dizzying subterranean labyrinth of corridors, shafts, and chambers extending for more than 5.7 kilometres. At the bottom of a 28-metre-deep central shaft lies Djoser's burial chamber, constructed from heavy slabs of pink granite transported north from Aswan. The surrounding underground galleries were lined with exquisite blue faience tiles resembling reed matting, along with carved limestone reliefs depicting the pharaoh participating in sacred rituals.
          </p>
          <p>
            <strong>F.</strong> When modern archaeologists began clearing the subterranean tunnels in the 1920s, they discovered that tomb robbers had ransacked the royal chambers thousands of years earlier. Nonetheless, excavating the complex provided an incredible experience: archaeologists recovered thousands of exquisite stone vessels and jars inscribed with royal names, and a few of Djoser's personal possessions remained intact in the rubble of the burial vault.
          </p>
          <p>
            <strong>G.</strong> The Step Pyramid of Djoser was a revolutionary breakthrough in engineering that set the precedent for Egyptian royal tombs. It became the definitive archetype that all subsequent pyramid builders copied and refined, leading directly to the colossal smooth-faced pyramids at Meidum, Dahshur, and Giza during the Fourth Dynasty.
          </p>
        </div>
      `,
      questionGroups: [
        {
          id: "c16-r1-qg3",
          type: "matching_headings",
          title: "Questions 14 – 20",
          instructions: "Reading Passage 2 has seven paragraphs, A–G. Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i–ix, in boxes 14–20 on your answer sheet.",
          options: [
            "i The areas and artefacts within the pyramid itself",
            "ii A difficult task for those involved",
            "iii A king who saved his people",
            "iv A single certainty among other less definite facts",
            "v An overview of the external buildings and areas",
            "vi A pyramid design that others copied",
            "vii An idea for changing the design of burial structures",
            "viii An incredible experience despite the few remains",
            "ix The answers to some unexpected questions"
          ],
          questions: [
            {
              questionNumber: 14,
              prompt: "Paragraph A",
              correctAnswer: "iv",
              explanation: "Paragraph A mentions that while details of Djoser's reign are disputed, the single certainty is that he commissioned the Step Pyramid at Saqqara."
            },
            {
              questionNumber: 15,
              prompt: "Paragraph B",
              correctAnswer: "vii",
              explanation: "Paragraph B details Imhotep's groundbreaking idea of changing from traditional mudbrick mastabas to quarried stone pyramids."
            },
            {
              questionNumber: 16,
              prompt: "Paragraph C",
              correctAnswer: "ii",
              explanation: "Paragraph C highlights the immense physical difficulties and arduous task faced by the thousands of workers involved in stacking stone tiers."
            },
            {
              questionNumber: 17,
              prompt: "Paragraph D",
              correctAnswer: "v",
              explanation: "Paragraph D provides an overview of the external buildings, courtyards, perimeter wall, and trench surrounding the pyramid."
            },
            {
              questionNumber: 18,
              prompt: "Paragraph E",
              correctAnswer: "i",
              explanation: "Paragraph E explores the underground areas, corridors, burial chamber, and blue faience artefacts within the pyramid itself."
            },
            {
              questionNumber: 19,
              prompt: "Paragraph F",
              correctAnswer: "viii",
              explanation: "Paragraph F recounts the exciting and incredible experience of archaeologists excavating the tomb despite early looting."
            },
            {
              questionNumber: 20,
              prompt: "Paragraph G",
              correctAnswer: "vi",
              explanation: "Paragraph G concludes that the Step Pyramid became the archetype that subsequent Egyptian pyramid builders copied and refined."
            }
          ]
        },
        {
          id: "c16-r1-qg4",
          type: "note_completion",
          title: "Questions 21 – 24",
          instructions: "Complete the notes below. Choose ONE WORD ONLY from the passage for each answer.",
          summaryTitle: "The Step Pyramid complex",
          wordLimitRule: "ONE WORD ONLY",
          questions: [
            {
              questionNumber: 21,
              prompt: "The complex that includes the Step Pyramid and its surroundings is considered to be as big as an Egyptian [ 21 ] of the past.",
              correctAnswer: "city",
              acceptedVariants: ["city"],
              explanation: "Paragraph D: 'encompassed approximately 15 hectares—the size of an entire ancient Egyptian city.'",
              passageEvidence: { paragraph: "D", quote: "the size of an entire ancient Egyptian city" }
            },
            {
              questionNumber: 22,
              prompt: "The area outside the pyramid included accommodation that was occupied by [ 22 ], along with many other buildings and features.",
              correctAnswer: "priests",
              acceptedVariants: ["priests"],
              explanation: "Paragraph D: 'comfortable residential quarters occupied by the attending priests.'",
              passageEvidence: { paragraph: "D", quote: "residential quarters occupied by the attending priests" }
            },
            {
              questionNumber: 23,
              prompt: "In addition, a long [ 23 ] encircled the wall.",
              correctAnswer: "trench",
              acceptedVariants: ["trench"],
              explanation: "Paragraph D: 'The perimeter wall was ringed by an enormous trench 750 metres long.'",
              passageEvidence: { paragraph: "D", quote: "ringed by an enormous trench" }
            },
            {
              questionNumber: 24,
              prompt: "As a result, any visitors who had not been invited were cleverly prevented from entering the pyramid grounds unless they knew the [ 24 ] of the real entrance.",
              correctAnswer: "location",
              acceptedVariants: ["location"],
              explanation: "Paragraph D: 'prevented from entering unless they knew the exact location of the single true entrance.'",
              passageEvidence: { paragraph: "D", quote: "location of the single true entrance" }
            }
          ]
        },
        {
          id: "c16-r1-qg5",
          type: "multiple_choice_multi",
          title: "Questions 25 – 26",
          instructions: "Choose TWO letters, A–E. Which TWO of the following are mentioned about the Step Pyramid and Djoser's reign?",
          options: [
            "A. Initially he had to be persuaded to build in stone rather than clay.",
            "B. There is disagreement concerning the length of his reign.",
            "C. He failed to appreciate Imhotep's part in the design of the Step Pyramid.",
            "D. A few of his possessions were still in his tomb when archaeologists found it.",
            "E. He criticised the design and construction of other pyramids in Egypt."
          ],
          questions: [
            {
              questionNumber: 25,
              prompt: "Which TWO statements are mentioned in the passage? (First answer)",
              options: [
                "A. Initially he had to be persuaded to build in stone rather than clay.",
                "B. There is disagreement concerning the length of his reign.",
                "C. He failed to appreciate Imhotep's part in the design of the Step Pyramid.",
                "D. A few of his possessions were still in his tomb when archaeologists found it.",
                "E. He criticised the design and construction of other pyramids in Egypt."
              ],
              correctAnswer: "B",
              acceptedVariants: ["D"],
              explanation: "Paragraph A notes that while some records give 19 years, other sources suggest over 30 years (disagreement over reign length)."
            },
            {
              questionNumber: 26,
              prompt: "Which TWO statements are mentioned in the passage? (Second answer)",
              options: [
                "A. Initially he had to be persuaded to build in stone rather than clay.",
                "B. There is disagreement concerning the length of his reign.",
                "C. He failed to appreciate Imhotep's part in the design of the Step Pyramid.",
                "D. A few of his possessions were still in his tomb when archaeologists found it.",
                "E. He criticised the design and construction of other pyramids in Egypt."
              ],
              correctAnswer: "D",
              acceptedVariants: ["B"],
              explanation: "Paragraph F confirms that archaeologists discovered a few of Djoser's personal possessions still remained in the burial vault."
            }
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
            <strong>A.</strong> The ongoing revolution in artificial intelligence and automation has sparked widespread public debate regarding the future of employment. A landmark 2017 study by the McKinsey Global Institute suggested that between 3 and 14 percent of the global workforce will need to switch occupational categories by 2030 due to automation. However, while media headlines frequently warn of mass unemployment, what the first paragraph really illustrates is the profound extent to which AI will alter the nature of the work that people actually do on a daily basis. Rather than eliminating jobs wholesale, technological innovation reshapes job descriptions, requiring human workers to partner with smart algorithms.
          </p>
          <p>
            <strong>B.</strong> According to Dr Stella Pachidi of the Cambridge Judge Business School, discussions about automation have moved far beyond physical robots replacing assembly-line workers. She explains that the modern 'knowledge economy' is a key factor driving current developments in the workplace. In banking, legal practice, accounting, and consulting, automated algorithmic systems are now handling data-intensive analysis that previously demanded hours of manual scrutiny by junior associates.
          </p>
          <p>
            <strong>C.</strong> During an in-depth empirical study at a large international telecommunications company, Dr Pachidi observed how corporate sales staff adapted to a newly introduced machine-learning platform. She describes the 'art of work' as the subtle ways in which staff manipulate algorithmic inputs to ensure that AI produces the specific commercial results that they want, rather than accepting machine recommendations passively. While companies adopt AI to enforce standardized compliance, workers often invent creative workarounds to protect their practical expertise.
          </p>
          <p>
            <strong>D.</strong> Nonetheless, this shift creates major challenges for workforce planning. Dr Pachidi emphasizes the urgent necessity for organizations to change their hiring and training models. As AI takes over entry-level analytical tasks, traditional on-the-job apprenticeship models are disintegrating, leaving junior employees with fewer opportunities to learn the fundamental mechanics of their profession.
          </p>
          <p>
            <strong>E.</strong> In particular, Dr Pachidi highlights the risks of what she terms the 'algorithmication' of jobs where employees manage information rather than tangible products. In her research, she observed that when staff develop an uncritical reliance on AI recommendations, they gradually cease relying on their own professional intuition. Over time, this erosion of intuitive judgment prevents workers from making creative leaps, undermining the company's long-term capacity for true innovation. To counter this, researchers argue that leaders must foster genuine confidence among employees, empowering them to critique and interrogate algorithmic outputs.
          </p>
          <p>
            <strong>F.</strong> Professor Hamish Low, an economist at the University of Oxford, provides a broader historical perspective. He argues that greater levels of automation will not result in lower aggregate employment, pointing out that historical technological shocks—from the spinning jenny to the atmospheric steam engine—invariably created more employment opportunities than they destroyed. Professor Low asserts that in the modern economy, people's career trajectories will become more varied and flexible, with workers transitioning across multiple career phases rather than following a single unbroken ladder until retirement.
          </p>
          <p>
            <strong>G.</strong> Meanwhile, Dr Ewan McGaughey of King's College London argues that the popular idea that technology inherently causes unemployment is fundamentally flawed. In his legal and economic research, Dr McGaughey demonstrates that joblessness is not caused by digital automation, but rather by policy decisions, corporate governance structures, and laws that restrict capital allocation and fair wages. In his view, government policy and capital allocation play a decisive role in job security, and modern democratic societies have the legal power to guarantee full employment if they choose to do so.
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
            {
              questionNumber: 27,
              prompt: "The first paragraph tells us that",
              options: [
                "A. technological changes are happening faster than ever before.",
                "B. the extent to which AI will alter the nature of the work that people do.",
                "C. a high percentage of workers will be replaced by computers.",
                "D. companies should prepare their workforce for future disruptions."
              ],
              correctAnswer: "B",
              explanation: "Paragraph A highlights that automation alters the nature and daily tasks of work rather than simply causing mass joblessness."
            },
            {
              questionNumber: 28,
              prompt: "According to the second paragraph, what is Stella Pachidi's view of the 'knowledge economy'?",
              options: [
                "A. It is focused mainly on production and logistics.",
                "B. It has failed to create high-skilled employment opportunities.",
                "C. It is becoming increasingly reliant on manual labor.",
                "D. It is a key factor driving current developments in the workplace."
              ],
              correctAnswer: "D",
              explanation: "Paragraph B explains that Dr Pachidi considers the knowledge economy a primary driving factor of workplace transformations."
            },
            {
              questionNumber: 29,
              prompt: "What does the writer suggest about the 'art of work' in the third paragraph?",
              options: [
                "A. Employees prefer using traditional software over automated systems.",
                "B. Innovation requires workers to strictly follow algorithmic guidelines.",
                "C. Staff making sure that AI produces the results that they want.",
                "D. Managers must train employees to be more analytical."
              ],
              correctAnswer: "C",
              explanation: "Paragraph C defines the 'art of work' as staff tweaking inputs to ensure AI generates the specific outcomes they desire."
            },
            {
              questionNumber: 30,
              prompt: "What is the main point made in the fourth paragraph?",
              options: [
                "A. Businesses will eliminate human oversight entirely.",
                "B. AI systems will struggle to adapt to unforeseen market conditions.",
                "C. Employees will resist using automated algorithms in their daily tasks.",
                "D. The necessity for organizations to change their hiring and training models."
              ],
              correctAnswer: "D",
              explanation: "Paragraph D focuses directly on the necessity for firms to restructure their hiring, mentoring, and apprenticeship paradigms."
            }
          ]
        },
        {
          id: "c16-r1-qg7",
          type: "summary_completion",
          title: "Questions 31 – 34",
          instructions: "Complete the summary using the list of words, A–G, below. Write the correct letter, A–G, in boxes 31–34 on your answer sheet.",
          summaryTitle: "The 'algorithmication' of jobs",
          options: [
            "A pressure",
            "B satisfaction",
            "C intuition",
            "D promotion",
            "E reliance",
            "F confidence",
            "G information"
          ],
          questions: [
            {
              questionNumber: 31,
              prompt: "Stella Pachidi focuses on jobs where employees manage [ 31 ] rather than physical production.",
              options: ["A pressure", "B satisfaction", "C intuition", "D promotion", "E reliance", "F confidence", "G information"],
              correctAnswer: "G",
              acceptedVariants: ["information"],
              explanation: "Paragraph E refers to jobs dependent on data (information) rather than tangible physical manufacturing."
            },
            {
              questionNumber: 32,
              prompt: "She noticed a growing [ 32 ] on machine learning tools among corporate staff.",
              options: ["A pressure", "B satisfaction", "C intuition", "D promotion", "E reliance", "F confidence", "G information"],
              correctAnswer: "E",
              acceptedVariants: ["reliance"],
              explanation: "Paragraph E observes workers developing an uncritical reliance on AI recommendations."
            },
            {
              questionNumber: 33,
              prompt: "As a consequence, workers are less inclined to use their own [ 33 ] when solving problems.",
              options: ["A pressure", "B satisfaction", "C intuition", "D promotion", "E reliance", "F confidence", "G information"],
              correctAnswer: "C",
              acceptedVariants: ["intuition"],
              explanation: "Paragraph E highlights that staff cease relying on their professional intuition."
            },
            {
              questionNumber: 34,
              prompt: "This makes it difficult for organisations to build genuine [ 34 ] in their future decision-making.",
              options: ["A pressure", "B satisfaction", "C intuition", "D promotion", "E reliance", "F confidence", "G information"],
              correctAnswer: "F",
              acceptedVariants: ["confidence"],
              explanation: "Paragraph E emphasizes the need to restore employee confidence in questioning and guiding technology."
            }
          ]
        },
        {
          id: "c16-r1-qg8",
          type: "matching_features",
          title: "Questions 35 – 40",
          instructions: "Look at the following statements (Questions 35–40) and the list of people below. Match each statement with the correct person, A, B or C.",
          options: [
            "A Stella Pachidi",
            "B Hamish Low",
            "C Ewan McGaughey"
          ],
          questions: [
            {
              questionNumber: 35,
              prompt: "Greater levels of automation will not result in lower employment.",
              correctAnswer: "B",
              explanation: "Paragraph F mentions Professor Hamish Low's argument that automation will not cause aggregate job losses."
            },
            {
              questionNumber: 36,
              prompt: "There are several reasons why AI is appealing to businesses.",
              correctAnswer: "A",
              explanation: "Paragraph B details Dr Stella Pachidi's analysis of why corporations are eager to adopt algorithmic analysis."
            },
            {
              questionNumber: 37,
              prompt: "The idea that technology causes unemployment is fundamentally flawed.",
              correctAnswer: "C",
              explanation: "Paragraph G presents Dr Ewan McGaughey's view that technology causing joblessness is a fundamental misconception."
            },
            {
              questionNumber: 38,
              prompt: "Staff may feel less motivated to innovate when using automated systems.",
              correctAnswer: "A",
              explanation: "Paragraph E details Dr Pachidi's finding that reliance on AI suppresses human intuitive innovation."
            },
            {
              questionNumber: 39,
              prompt: "People's career trajectories will become more varied and flexible.",
              correctAnswer: "B",
              explanation: "Paragraph F notes Professor Low's view that working lives will become multistage and more flexible."
            },
            {
              questionNumber: 40,
              prompt: "Government policy and capital allocation play a decisive role in job security.",
              correctAnswer: "C",
              explanation: "Paragraph G states Dr McGaughey's thesis that legal regulations and capital allocation determine employment levels."
            }
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
  audioUrl: "/audio/cam16-test1-part1.mp3",
  sections: [
    {
      sectionNumber: 1,
      title: "Listening Part 1",
      subtitle: "Children's Engineering Workshops",
      audioUrl: "/audio/cam16-test1-part1.mp3",
      transcript: `
        RECEPTIONIST: Good morning, Highfield Community Centre. How may I help you?
        CALLER: Oh, hello. I'm calling to enquire about the engineering workshops for children that I saw advertised.
        RECEPTIONIST: Certainly! We offer two distinct programs based on the children's age. The first is called 'Tiny Engineers', which is designed specifically for children aged 4 to 5.
        CALLER: Right, and what kind of things do they do in that group?
        RECEPTIONIST: It's all about hands-on discovery and creative play. For example, in one popular challenge, the children design a protective cushion or special cover for a fresh egg, and then test whether they can drop it from a table without it breaking!
        CALLER: Haha, that sounds like great fun!
        RECEPTIONIST: Yes, they love it! Another activity involves a friendly team competition to see who can build the highest tower using lightweight building blocks. And in week three, they make a model car that is actually powered across the floor by a balloon.
        CALLER: Lovely! And what about the older children? My son is seven.
        RECEPTIONIST: Then he would be in our 'Junior Engineers' group for children aged 6 to 8. They tackle slightly more complex engineering projects. They build various model vehicles like trucks, and they also build model animals with moving joints and gears.
        CALLER: Fantastic.
        RECEPTIONIST: They also build a miniature bridge and test how much weight it can support using small metal weights. Later in the term, they plan and make a short movie using stop-motion animation with the characters they have built.
        CALLER: An animated movie! My son would be thrilled with that!
        RECEPTIONIST: In the final week, they construct a model of a fairground ride and decorate it with paint and battery-powered mini LED lights.
        CALLER: Wonderful! When do the sessions take place?
        RECEPTIONIST: Both workshops are held on Wednesdays after school, from 4:00 to 5:30 pm.
        CALLER: And where are they located?
        RECEPTIONIST: In Building 10A at the Fradstone Industrial Estate. That's F-R-A-D-S-T-O-N-E.
        CALLER: And is there somewhere to park?
        RECEPTIONIST: Yes, there is plenty of free parking directly in front of the building.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg1",
          type: "form_completion",
          title: "Questions 1 – 10",
          instructions: "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          summaryTitle: "Children's Engineering Workshops",
          wordLimitRule: "ONE WORD AND/OR A NUMBER",
          clozeTemplate: `Children's Engineering Workshops

Tiny Engineers (ages 4-5)

Activities
• Create a cover for an {{1}} so they can drop it from a height without breaking it.
• Take part in a competition to build the tallest {{2}}.
• Make a {{3}} powered by a balloon.

Junior Engineers (ages 6-8)

Activities:
• Build model cars, trucks and {{4}} and learn how to program them so they can move.
• Take part in a competition to build the longest {{5}} using card and wood.
• Create a short {{6}} with special software.
• Build, {{7}} and program a humanoid robot.

Cost:
• £50 for a five-week block

Schedule:
• Held on {{8}} from 10 am to 11 am

Location:
• Building 10A, {{9}} Industrial Estate, Grasford

Parking:
• There is plenty of {{10}} available`,
          questions: [
            {
              questionNumber: 1,
              prompt: "Create a cover for an [ 1 ] so they can drop it from a height without breaking it.",
              correctAnswer: "egg",
              acceptedVariants: ["egg"],
              explanation: "Transcript: 'design a protective cushion or special cover for a fresh egg'"
            },
            {
              questionNumber: 2,
              prompt: "Take part in a competition to see who can build the tallest [ 2 ].",
              correctAnswer: "tower",
              acceptedVariants: ["tower"],
              explanation: "Transcript: 'a friendly team competition to see who can build the highest tower'"
            },
            {
              questionNumber: 3,
              prompt: "Make a [ 3 ] powered by a balloon.",
              correctAnswer: "car",
              acceptedVariants: ["car"],
              explanation: "Transcript: 'they make a model car that is actually powered across the floor by a balloon'"
            },
            {
              questionNumber: 4,
              prompt: "Build model cars, trucks and [ 4 ] and learn how to program them so they can move.",
              correctAnswer: "animals",
              acceptedVariants: ["animals", "animal"],
              explanation: "Transcript: 'build various model vehicles like trucks, and they also build model animals'"
            },
            {
              questionNumber: 5,
              prompt: "Take part in a competition to build the longest [ 5 ] using card and wood.",
              correctAnswer: "bridge",
              acceptedVariants: ["bridge"],
              explanation: "Transcript: 'build a miniature bridge and test how much weight it can support'"
            },
            {
              questionNumber: 6,
              prompt: "Create a short [ 6 ] with special software.",
              correctAnswer: "movie",
              acceptedVariants: ["movie", "film"],
              explanation: "Transcript: 'plan and make a short movie using stop-motion animation'"
            },
            {
              questionNumber: 7,
              prompt: "Build, [ 7 ] and program a humanoid robot.",
              correctAnswer: "decorate",
              acceptedVariants: ["decorate"],
              explanation: "Transcript: 'construct a model of a fairground ride and decorate it with paint and battery-powered mini LED lights'"
            },
            {
              questionNumber: 8,
              prompt: "Held on [ 8 ] from 10 am to 11 am.",
              correctAnswer: "Wednesdays",
              acceptedVariants: ["Wednesdays", "Wednesday", "wednesdays", "wednesday"],
              explanation: "Transcript: 'Both workshops are held on Wednesdays after school'"
            },
            {
              questionNumber: 9,
              prompt: "Building 10A, [ 9 ] Industrial Estate, Grasford.",
              correctAnswer: "Fradstone",
              acceptedVariants: ["Fradstone", "fradstone"],
              explanation: "Transcript: 'In Building 10A at the Fradstone Industrial Estate. That's F-R-A-D-S-T-O-N-E.'"
            },
            {
              questionNumber: 10,
              prompt: "There is plenty of [ 10 ] available.",
              correctAnswer: "parking",
              acceptedVariants: ["parking", "car parking"],
              explanation: "Transcript: 'plenty of free parking directly in front of the building'"
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Listening Part 2",
      subtitle: "Stevenson's Site Tour",
      audioUrl: "/audio/cam16-test1-part2.mp3",
      transcript: `
        GUIDE: Welcome everyone to Stevenson's. We are delighted to host your work experience group this week. Before we take you onto the production floor, I'd like to share a brief background about the company. Stevenson's was originally established in 1926 by our founder, Ronald Stevenson. Ronald had worked as a metal craftsman since 1923 and drafted plans for an independent business in 1924, but it was in 1926 that the company was officially incorporated.
        Interestingly, although Stevenson's is widely known today for manufacturing automotive components and precision machine tools, originally Stevenson's manufactured goods exclusively for the healthcare industry, producing stainless surgical trays and sterilization containers.
        Now, you may have heard rumours about Stevenson's relocating to a modern industrial park outside the county. I can assure you that the company has no plans to move; our roots are firmly established here. As for your schedule this week, along with practical observation on the shop floor, the programme for your work experience includes regular talks by staff from engineering, marketing, and design.
        Now, let me give you a quick orientation using the site plan. You are currently standing at the Main Entrance. Directly facing you as you enter through the main double doors is Reception, which is marked A on your map. To your left, room H is our Coffee room where you can relax during breaks. Tucked behind the main corridor on the east side, letter C is our main Warehouse where raw materials and finished parts are catalogued. At the far north end, letter G is the Staff canteen, serving hot lunches every day. Beside the courtyard, letter B is the executive Meeting room. And finally, adjacent to the reception area on the eastern flank, letter I is the Admin office.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg2",
          type: "multiple_choice",
          title: "Questions 11 – 14",
          instructions: "Choose the correct letter, A, B or C.",
          questions: [
            {
              questionNumber: 11,
              prompt: "Stevenson's was founded in:",
              options: [
                "A. 1923",
                "B. 1924",
                "C. 1926"
              ],
              correctAnswer: "C",
              explanation: "The speaker clarifies that although Ronald worked since 1923 and drafted plans in 1924, the company was officially founded in 1926."
            },
            {
              questionNumber: 12,
              prompt: "Originally, Stevenson's manufactured goods for:",
              options: [
                "A. the healthcare industry",
                "B. the automotive industry",
                "C. the machine tools industry"
              ],
              correctAnswer: "A",
              explanation: "Transcript: 'originally Stevenson's manufactured goods exclusively for the healthcare industry'"
            },
            {
              questionNumber: 13,
              prompt: "What does the speaker say about the company premises?",
              options: [
                "A. The company is planning to expand to a new city.",
                "B. The company has no plans to move.",
                "C. The company recently sold part of the land."
              ],
              correctAnswer: "B",
              explanation: "Transcript: 'I can assure you that the company has no plans to move'"
            },
            {
              questionNumber: 14,
              prompt: "The programme for the work experience group includes:",
              options: [
                "A. shadowing senior executives",
                "B. operating factory machinery",
                "C. talks by staff"
              ],
              correctAnswer: "C",
              explanation: "Transcript: 'the programme for your work experience includes regular talks by staff'"
            }
          ]
        },
        {
          id: "c16-l1-qg3",
          type: "matching_features",
          title: "Questions 15 – 20",
          instructions: "Label the map below. Write the correct letter, A–J, next to Questions 15–20.",
          options: [
            "A. Reception",
            "B. Meeting room",
            "C. Warehouse",
            "D. Main laboratory",
            "E. Car park",
            "F. Quality control",
            "G. Staff canteen",
            "H. Coffee room",
            "I. Admin office",
            "J. Loading bay"
          ],
          questions: [
            {
              questionNumber: 15,
              prompt: "Coffee room",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "H",
              explanation: "Transcript: 'room H is our Coffee room where you can relax'"
            },
            {
              questionNumber: 16,
              prompt: "Warehouse",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "C",
              explanation: "Transcript: 'letter C is our main Warehouse'"
            },
            {
              questionNumber: 17,
              prompt: "Staff canteen",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "G",
              explanation: "Transcript: 'At the far north end, letter G is the Staff canteen'"
            },
            {
              questionNumber: 18,
              prompt: "Meeting room",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "B",
              explanation: "Transcript: 'Beside the courtyard, letter B is the executive Meeting room'"
            },
            {
              questionNumber: 19,
              prompt: "Admin office",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "I",
              explanation: "Transcript: 'adjacent to the reception area on the eastern flank, letter I is the Admin office'"
            },
            {
              questionNumber: 20,
              prompt: "Reception",
              options: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
              correctAnswer: "A",
              explanation: "Transcript: 'Directly facing you as you enter through the main double doors is Reception, which is marked A'"
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: "Listening Part 3",
      subtitle: "Jess and Tom's Art Projects (Birds in Art)",
      audioUrl: "/audio/cam16-test1-part3.mp3",
      transcript: `
        TUTOR: Hello Jess, Tom. How are you both getting on with your introductory research projects on 'Birds in Art'?
        JESS: Well, overall it's going well. In the introductory stage, visiting the Natural History Museum was tremendously useful—we both found that seeing the historic taxidermy and preserved specimens gave us a deep understanding of anatomical structure.
        TOM: Absolutely. And also, discussing our initial ideas with you, our tutor, helped us clarify our scope and choose our directions.
        TUTOR: Good. And what about your individual project assignments?
        TOM: Well, we both found preparing our initial sketches challenging but essential before committing to our compositions.
        JESS: Yes, and getting feedback from other students during our peer critique workshop was really insightful.
        TUTOR: Now, let's look at the specific historical paintings you've selected to examine how artists imbue birds with personal meaning.
        TOM: First, I chose Edwin Landseer's painting of a Falcon. Landseer portrayed the falcon circling overhead to represent a potential threat to vulnerable quarry below.
        JESS: Next is Audubon's famous study of the Fish hawk. The dynamic brushwork captures fast movement as the bird swoops towards the water.
        TOM: For the third piece, I looked at Vincent van Gogh's painting of a Kingfisher. Van Gogh's letters indicate that kingfishers brought back a nostalgic childhood memory of the waterways in Holland.
        JESS: Then there's the Portrait of William Wells. The composition reveals a confused attitude to nature, balancing hunting trophies with idyllic landscape elements.
        TOM: Paul Gauguin's Tahitian painting 'Vairumati' features a white bird that Gauguin explained symbolizes the continuity of life after mortality.
        JESS: Finally, the Renaissance portrait of Giovanni de Medici by Bronzino shows the young prince cradling a goldfinch, which historically represents the protection of nature and divine innocence.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg4",
          type: "multiple_choice_multi",
          title: "Questions 21 – 22",
          instructions: "Choose TWO letters, A–E. Which TWO aspects of the introductory stage did Jess and Tom find useful?",
          options: [
            "A. visiting the Bird Park",
            "B. reading books on bird species",
            "C. exploring the Natural History Museum",
            "D. observing live birds in nature",
            "E. discussing ideas with their tutor"
          ],
          questions: [
            {
              questionNumber: 21,
              prompt: "Which TWO aspects of the introductory stage did they find useful? (First answer)",
              options: [
                "A. visiting the Bird Park",
                "B. reading books on bird species",
                "C. exploring the Natural History Museum",
                "D. observing live birds in nature",
                "E. discussing ideas with their tutor"
              ],
              correctAnswer: "C",
              acceptedVariants: ["E"],
              explanation: "Jess states that visiting the Natural History Museum was tremendously useful."
            },
            {
              questionNumber: 22,
              prompt: "Which TWO aspects of the introductory stage did they find useful? (Second answer)",
              options: [
                "A. visiting the Bird Park",
                "B. reading books on bird species",
                "C. exploring the Natural History Museum",
                "D. observing live birds in nature",
                "E. discussing ideas with their tutor"
              ],
              correctAnswer: "E",
              acceptedVariants: ["C"],
              explanation: "Tom confirms that discussing ideas with their tutor helped them clarify their scope."
            }
          ]
        },
        {
          id: "c16-l1-qg5",
          type: "multiple_choice_multi",
          title: "Questions 23 – 24",
          instructions: "Choose TWO letters, A–E. Which TWO things do they agree about their individual assignments?",
          options: [
            "A. selecting an uncommon species",
            "B. preparing initial sketches",
            "C. researching cultural symbolism",
            "D. using oil paints",
            "E. getting feedback from other students"
          ],
          questions: [
            {
              questionNumber: 23,
              prompt: "Which TWO things do they agree on? (First answer)",
              options: [
                "A. selecting an uncommon species",
                "B. preparing initial sketches",
                "C. researching cultural symbolism",
                "D. using oil paints",
                "E. getting feedback from other students"
              ],
              correctAnswer: "B",
              acceptedVariants: ["E"],
              explanation: "Tom mentions that preparing initial sketches was challenging but essential."
            },
            {
              questionNumber: 24,
              prompt: "Which TWO things do they agree on? (Second answer)",
              options: [
                "A. selecting an uncommon species",
                "B. preparing initial sketches",
                "C. researching cultural symbolism",
                "D. using oil paints",
                "E. getting feedback from other students"
              ],
              correctAnswer: "E",
              acceptedVariants: ["B"],
              explanation: "Jess agrees that getting feedback from other students during peer critique was really insightful."
            }
          ]
        },
        {
          id: "c16-l1-qg6",
          type: "matching_features",
          title: "Questions 25 – 30",
          instructions: "What personal meaning did the artist attach to each artwork? Choose SIX answers from the box and write the correct letter, A–H, next to Questions 25–30.",
          options: [
            "A a childhood memory",
            "B hope for the future",
            "C fast movement",
            "D a potential threat",
            "E the power of color",
            "F the continuity of life",
            "G protection of nature",
            "H a confused attitude to nature"
          ],
          questions: [
            {
              questionNumber: 25,
              prompt: "Falcon (Landseer)",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "D",
              explanation: "Landseer portrayed the falcon to represent a potential threat to quarry below."
            },
            {
              questionNumber: 26,
              prompt: "Fish hawk (Audubon)",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "C",
              explanation: "Audubon's painting captures fast movement as the hawk swoops toward water."
            },
            {
              questionNumber: 27,
              prompt: "Kingfisher (van Gogh)",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "A",
              explanation: "Van Gogh explained kingfishers evoked a nostalgic childhood memory of Holland."
            },
            {
              questionNumber: 28,
              prompt: "Portrait of William Wells",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "H",
              explanation: "The portrait reveals a confused attitude to nature, juxtaposing hunting trophies with romantic scenery."
            },
            {
              questionNumber: 29,
              prompt: "Vairumati (Gauguin)",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "F",
              explanation: "Gauguin noted that the white bird symbolizes the continuity of life after mortality."
            },
            {
              questionNumber: 30,
              prompt: "Portrait of Giovanni de Medici",
              options: ["A", "B", "C", "D", "E", "F", "G", "H"],
              correctAnswer: "G",
              explanation: "The prince cradling a goldfinch represents protection of nature and divine innocence."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 4,
      title: "Listening Part 4",
      subtitle: "The Philosophy of Stoicism",
      audioUrl: "/audio/cam16-test1-part4.mp3",
      transcript: `
        LECTURER: Good afternoon. In today's lecture, we examine the enduring relevance of Stoicism, an ancient philosophical system founded in Athens by Zeno of Citium around 300 BCE. Unlike abstract metaphysics, Stoicism was primarily intended as a practical guide for navigating daily life and emotional adversity.
        During the Roman era, Stoic principles gained tremendous influence across society following the publication of prominent texts, particularly the letters and essays of Seneca and the personal journal of the emperor Marcus Aurelius.
        At its psychological core, the philosopher Epictetus posited that our distress arises not from external events themselves, but from our internal judgments. He argued that we must distinguish between what lies within our control and what does not, concentrating solely on our own choices and rational responses.
        To cultivate emotional stability, Stoic practitioners engaged in premeditatio malorum—the deliberate mental visualization of negative scenarios, such as illness, exile, or loss. By mentally confronting adversity in advance, one builds psychological resilience against sudden shocks.
        Another striking analogy compares mortal existence to the theatre: Epictetus remarked that each individual is like an actor assigned a specific role in a play, and our duty is not to demand a different character, but to perform our given role with dignity.
        Centuries later, the rise of early modern capitalism in Northern Europe absorbed several Stoic values, with thinkers praising rigorous self-discipline, prudence, and rational labor. In contemporary psychology, Stoic tenets directly inspired Cognitive Behavioural Therapy (CBT), developed by Albert Ellis and Aaron Beck as a leading therapeutic intervention for depression and acute anxiety.
        CBT practitioners instruct patients to apply objective logic to challenge catastrophic cognitive distortions. Rather than viewing setbacks with anger or defeat, Stoicism teaches that every impediment offers an opportunity to cultivate moral virtue and strength. Ultimately, the ancient Stoics maintained that living well is not an innate talent, but a skill requiring continuous, lifelong practice.
      `,
      questionGroups: [
        {
          id: "c16-l1-qg7",
          type: "sentence_completion",
          title: "Questions 31 – 40",
          instructions: "Complete the notes below. Write ONE WORD ONLY for each answer.",
          summaryTitle: "Stoicism",
          wordLimitRule: "ONE WORD ONLY",
          clozeTemplate: `Stoicism

Ancient Greek philosophy:
• Stoicism was designed as a {{31}} guide for daily life.
• Stoic ideas gained widespread popularity following the {{32}} of Seneca's letters.

Core principles:
• Epictetus emphasized that we should focus entirely on our own {{33}} and thoughts.
• Stoics recommended the mental visualization of {{34}} events to foster resilience.
• Human existence was compared to an actor playing an assigned role in a {{35}}.

Historical influence and modern applications:
• Early development of modern {{36}} was shaped by Stoic virtues of thrift and diligence.
• Cognitive behavioural therapy drew on Stoic principles to treat conditions like {{37}}.
• Patients are taught to apply {{38}} to dismantle irrational assumptions.
• Stoicism teaches that every obstacle presents an {{39}} to cultivate virtue.
• Achieving tranquility requires continuous, lifelong {{40}}.`,
          questions: [
            {
              questionNumber: 31,
              prompt: "Ancient Greek philosophy of Stoicism was designed as a [ 31 ] guide for daily life.",
              correctAnswer: "practical",
              acceptedVariants: ["practical"],
              explanation: "Transcript: 'Stoicism was primarily intended as a practical guide for navigating daily life'"
            },
            {
              questionNumber: 32,
              prompt: "Stoic ideas gained widespread popularity following the [ 32 ] of Seneca's letters.",
              correctAnswer: "publication",
              acceptedVariants: ["publication"],
              explanation: "Transcript: 'Stoic principles gained tremendous influence across society following the publication of prominent texts'"
            },
            {
              questionNumber: 33,
              prompt: "Epictetus emphasized that we should focus entirely on our own [ 33 ] and thoughts.",
              correctAnswer: "choices",
              acceptedVariants: ["choices", "choice"],
              explanation: "Transcript: 'concentrating solely on our own choices and rational responses'"
            },
            {
              questionNumber: 34,
              prompt: "Stoics recommended the mental visualization of [ 34 ] events to foster resilience.",
              correctAnswer: "negative",
              acceptedVariants: ["negative"],
              explanation: "Transcript: 'the deliberate mental visualization of negative scenarios'"
            },
            {
              questionNumber: 35,
              prompt: "Human existence was compared to an actor playing an assigned role in a [ 35 ].",
              correctAnswer: "play",
              acceptedVariants: ["play"],
              explanation: "Transcript: 'each individual is like an actor assigned a specific role in a play'"
            },
            {
              questionNumber: 36,
              prompt: "Early development of modern [ 36 ] was shaped by Stoic virtues of thrift and diligence.",
              correctAnswer: "capitalism",
              acceptedVariants: ["capitalism"],
              explanation: "Transcript: 'the rise of early modern capitalism in Northern Europe absorbed several Stoic values'"
            },
            {
              questionNumber: 37,
              prompt: "Cognitive behavioural therapy drew on Stoic principles to treat conditions like [ 37 ].",
              correctAnswer: "depression",
              acceptedVariants: ["depression"],
              explanation: "Transcript: 'leading therapeutic intervention for depression and acute anxiety'"
            },
            {
              questionNumber: 38,
              prompt: "Patients are taught to apply [ 38 ] to dismantle irrational assumptions.",
              correctAnswer: "logic",
              acceptedVariants: ["logic"],
              explanation: "Transcript: 'CBT practitioners instruct patients to apply objective logic to challenge catastrophic cognitive distortions'"
            },
            {
              questionNumber: 39,
              prompt: "Stoicism teaches that every obstacle presents an [ 39 ] to cultivate virtue.",
              correctAnswer: "opportunity",
              acceptedVariants: ["opportunity"],
              explanation: "Transcript: 'every impediment offers an opportunity to cultivate moral virtue'"
            },
            {
              questionNumber: 40,
              prompt: "Achieving tranquility requires continuous, lifelong [ 40 ].",
              correctAnswer: "practice",
              acceptedVariants: ["practice", "practise"],
              explanation: "Transcript: 'a skill requiring continuous, lifelong practice'"
            }
          ]
        }
      ]
    }
  ]
};

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
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 16 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Percentage of households with electrical appliances & Housework hours per week (1920–2019)</h3>
  </div>

  {/* Chart 1: Electrical Appliances Ownership */}
  <div class="space-y-1.5 mb-6">
    <div class="flex items-center justify-between text-xs font-bold text-slate-800 px-2">
      <span>CHART 1: Percentage of households with electrical appliances (1920–2019)</span>
      <span class="text-[10px] text-slate-500 font-normal">Source: Cambridge English</span>
    </div>
    <div class="bg-slate-50/60 p-3 sm:p-4 rounded-xl border border-slate-200">
      <svg viewBox="0 0 640 260" class="w-full h-auto max-w-2xl mx-auto font-sans select-none">
        {/* Horizontal grid lines */}
        <line x1="60" y1="20" x2="600" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="65" x2="600" y2="65" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="110" x2="600" y2="110" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="155" x2="600" y2="155" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="200" x2="600" y2="200" stroke="#94a3b8" stroke-width="1.5" />

        {/* Vertical Axis */}
        <line x1="60" y1="15" x2="60" y2="200" stroke="#94a3b8" stroke-width="1.5" />

        {/* Y Axis Labels */}
        <text x="50" y="204" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">0%</text>
        <text x="50" y="159" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">25%</text>
        <text x="50" y="114" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">50%</text>
        <text x="50" y="69" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">75%</text>
        <text x="50" y="24" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">100%</text>

        {/* X Axis Labels */}
        <text x="85" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1920</text>
        <text x="185" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1940</text>
        <text x="285" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1960</text>
        <text x="385" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1980</text>
        <text x="485" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2000</text>
        <text x="575" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2019</text>

        {/* Polyline 1: Refrigerator (Solid Blue Line with Circles) */}
        <polyline fill="none" stroke="#2563eb" stroke-width="3" points="85,200 185,101 285,38 385,20 485,20 575,20" />
        <circle cx="85" cy="200" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="185" cy="101" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="285" cy="38" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="385" cy="20" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="485" cy="20" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />
        <circle cx="575" cy="20" r="4.5" fill="#2563eb" stroke="#ffffff" stroke-width="1.5" />

        {/* Polyline 2: Vacuum cleaner (Dashed Crimson Line with Squares) */}
        <polyline fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,4" points="85,146 185,110 285,74 385,29 485,20 575,20" />
        <rect x="81" y="142" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <rect x="181" y="106" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <rect x="281" y="70" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <rect x="381" y="25" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <rect x="481" y="16" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />
        <rect x="571" y="16" width="8" height="8" fill="#dc2626" stroke="#ffffff" stroke-width="1.5" />

        {/* Polyline 3: Washing machine (Solid Emerald with Triangles) */}
        <polyline fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="2,2" points="85,128 185,92 285,74 385,83 485,74 575,65" />
        <polygon points="85,123 89,132 81,132" fill="#059669" stroke="#ffffff" stroke-width="1" />
        <polygon points="185,87 189,96 181,96" fill="#059669" stroke="#ffffff" stroke-width="1" />
        <polygon points="285,69 289,78 281,78" fill="#059669" stroke="#ffffff" stroke-width="1" />
        <polygon points="385,78 389,87 381,87" fill="#059669" stroke="#ffffff" stroke-width="1" />
        <polygon points="485,69 489,78 481,78" fill="#059669" stroke="#ffffff" stroke-width="1" />
        <polygon points="575,60 579,69 571,69" fill="#059669" stroke="#ffffff" stroke-width="1" />
      </svg>
      {/* Legend */}
      <div class="flex flex-wrap items-center justify-center gap-6 mt-3 pt-2 border-t border-slate-200/70 text-xs font-bold">
        <div class="flex items-center gap-2">
          <span class="w-4 h-1 bg-blue-600 rounded"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
          <span class="text-blue-900">Refrigerator (0% → 100%)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-1 bg-red-600 border border-dashed border-red-600"></span>
          <span class="w-2.5 h-2.5 bg-red-600 inline-block"></span>
          <span class="text-red-900">Vacuum cleaner (30% → 100%)</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-4 h-1 bg-emerald-600 border border-dotted border-emerald-600"></span>
          <span class="w-2.5 h-2.5 bg-emerald-600 inline-block" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)"></span>
          <span class="text-emerald-900">Washing machine (40% → 75%)</span>
        </div>
      </div>
    </div>
  </div>

  {/* Chart 2: Housework Hours */}
  <div class="space-y-1.5">
    <div class="flex items-center justify-between text-xs font-bold text-slate-800 px-2">
      <span>CHART 2: Number of hours of housework per week per household (1920–2019)</span>
      <span class="text-[10px] text-slate-500 font-normal">Hours/Week</span>
    </div>
    <div class="bg-slate-50/60 p-3 sm:p-4 rounded-xl border border-slate-200">
      <svg viewBox="0 0 640 170" class="w-full h-auto max-w-2xl mx-auto font-sans select-none">
        <line x1="60" y1="15" x2="600" y2="15" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="45" x2="600" y2="45" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="75" x2="600" y2="75" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="105" x2="600" y2="105" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="135" x2="600" y2="135" stroke="#94a3b8" stroke-width="1.5" />

        <line x1="60" y1="10" x2="60" y2="135" stroke="#94a3b8" stroke-width="1.5" />

        <text x="50" y="139" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">0</text>
        <text x="50" y="109" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">15</text>
        <text x="50" y="79" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">30</text>
        <text x="50" y="49" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">45</text>
        <text x="50" y="19" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">60</text>

        <text x="85" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1920</text>
        <text x="185" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1940</text>
        <text x="285" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1960</text>
        <text x="385" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1980</text>
        <text x="485" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2000</text>
        <text x="575" y="153" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2019</text>

        {/* Hours Line (Purple with Diamonds) */}
        <polyline fill="none" stroke="#7c3aed" stroke-width="3" points="85,35 185,65 285,95 385,105 485,109 575,115" />
        <polygon points="85,30 90,35 85,40 80,35" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="185,60 190,65 185,70 180,65" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="285,90 290,95 285,100 280,95" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="385,100 390,105 385,110 380,105" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="485,104 490,109 485,114 480,109" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
        <polygon points="575,110 580,115 575,120 570,115" fill="#7c3aed" stroke="#ffffff" stroke-width="1.5" />
      </svg>
      <div class="flex items-center justify-center gap-2 mt-2 pt-2 border-t border-slate-200/70 text-xs font-bold text-purple-900">
        <span class="w-4 h-1 bg-purple-600 rounded"></span>
        <span class="w-2.5 h-2.5 bg-purple-600 transform rotate-45 inline-block"></span>
        <span>Housework hours per week (50 hrs/wk in 1920 down to ~10 hrs/wk in 2019)</span>
      </div>
    </div>
  </div>
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
        <div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
            <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
          </div>
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
          <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
            "In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in.<br/><br/>
            What are the reasons for this?<br/>
            How can people research this?"
          </div>
          <div class="mt-4 space-y-1 text-xs text-slate-700">
            <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
            <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
          </div>
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
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 16 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">How Sugar is Manufactured from Sugar Cane</h3>
  </div>

  <div class="bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200">
    <svg viewBox="0 0 760 350" class="w-full h-auto max-w-3xl mx-auto font-sans select-none">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
        </marker>
        <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#059669" />
        </marker>
      </defs>

      {/* STAGE 1: GROWING */}
      <g transform="translate(15, 20)">
        <rect width="155" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="155" height="28" rx="12" fill="#f0fdf4" />
        <rect y="16" width="155" height="12" fill="#f0fdf4" />
        <circle cx="22" cy="14" r="9" fill="#16a34a" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">1</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#14532d">GROWING</text>
        {/* Graphic: Sugar cane field & sun */}
        <circle cx="125" cy="48" r="10" fill="#f59e0b" opacity="0.8" />
        <line x1="45" y1="110" x2="45" y2="55" stroke="#15803d" stroke-width="4" stroke-linecap="round" />
        <line x1="75" y1="110" x2="75" y2="48" stroke="#16a34a" stroke-width="4.5" stroke-linecap="round" />
        <line x1="105" y1="110" x2="105" y2="60" stroke="#15803d" stroke-width="4" stroke-linecap="round" />
        {/* Leaves */}
        <path d="M 45 70 Q 30 60 25 75" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <path d="M 75 62 Q 92 50 98 65" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <path d="M 105 75 Q 120 68 125 80" fill="none" stroke="#22c55e" stroke-width="2.5" />
        <line x1="20" y1="110" x2="135" y2="110" stroke="#78350f" stroke-width="3" />
        <text x="77" y="123" text-anchor="middle" font-size="10" font-weight="bold" fill="#475569">12 – 18 months</text>
      </g>

      {/* Arrow 1 -> 2 */}
      <line x1="175" y1="85" x2="200" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

      {/* STAGE 2: HARVESTING */}
      <g transform="translate(205, 20)">
        <rect width="155" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="155" height="28" rx="12" fill="#f0fdf4" />
        <rect y="16" width="155" height="12" fill="#f0fdf4" />
        <circle cx="22" cy="14" r="9" fill="#16a34a" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">2</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#14532d">HARVESTING</text>
        {/* Machinery & hand cutting icons */}
        <rect x="25" y="45" width="50" height="25" rx="4" fill="#3b82f6" />
        <circle cx="35" cy="72" r="7" fill="#334155" />
        <circle cx="65" cy="72" r="7" fill="#334155" />
        <text x="50" y="60" text-anchor="middle" font-size="8" font-weight="bold" fill="#ffffff">HARVESTER</text>
        <text x="50" y="88" text-anchor="middle" font-size="9" fill="#475569">By machine</text>
        {/* Hand tool */}
        <path d="M 100 70 L 130 50 Q 140 45 135 60 L 115 75 Z" fill="#94a3b8" stroke="#475569" stroke-width="1" />
        <line x1="95" y1="75" x2="105" y2="65" stroke="#78350f" stroke-width="3" stroke-linecap="round" />
        <text x="120" y="88" text-anchor="middle" font-size="9" fill="#475569">Or by hand</text>
        <text x="77" y="120" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Stalks cut</text>
      </g>

      {/* Arrow 2 -> 3 */}
      <line x1="365" y1="85" x2="390" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

      {/* STAGE 3: CRUSHING */}
      <g transform="translate(395, 20)">
        <rect width="155" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="155" height="28" rx="12" fill="#f0fdf4" />
        <rect y="16" width="155" height="12" fill="#f0fdf4" />
        <circle cx="22" cy="14" r="9" fill="#16a34a" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">3</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#14532d">CRUSHING</text>
        {/* Rollers graphic */}
        <circle cx="60" cy="62" r="16" fill="#e2e8f0" stroke="#475569" stroke-width="2.5" />
        <circle cx="95" cy="62" r="16" fill="#e2e8f0" stroke="#475569" stroke-width="2.5" />
        <path d="M 52 62 L 68 62 M 60 54 L 60 70" stroke="#64748b" stroke-width="1.5" />
        <path d="M 87 62 L 103 62 M 95 54 L 95 70" stroke="#64748b" stroke-width="1.5" />
        {/* Juice drips */}
        <path d="M 77 78 L 77 92" stroke="#84cc16" stroke-width="3" stroke-linecap="round" />
        <path d="M 68 95 Q 77 105 86 95 Z" fill="#84cc16" />
        <text x="77" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Rollers extract juice</text>
        <text x="77" y="124" text-anchor="middle" font-size="9" fill="#64748b">Raw Cane Juice</text>
      </g>

      {/* Arrow 3 -> 4 */}
      <line x1="555" y1="85" x2="580" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

      {/* STAGE 4: PURIFYING */}
      <g transform="translate(585, 20)">
        <rect width="155" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="155" height="28" rx="12" fill="#f0fdf4" />
        <rect y="16" width="155" height="12" fill="#f0fdf4" />
        <circle cx="22" cy="14" r="9" fill="#16a34a" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">4</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#14532d">PURIFYING</text>
        {/* Tank & limestone filter */}
        <rect x="40" y="42" width="75" height="50" rx="4" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
        <line x1="40" y1="65" x2="115" y2="65" stroke="#f59e0b" stroke-width="4" stroke-dasharray="2,3" />
        <rect x="42" y="70" width="71" height="20" fill="#fef08a" opacity="0.6" />
        <text x="77" y="60" text-anchor="middle" font-size="8" font-weight="bold" fill="#475569">Limestone filter</text>
        <text x="77" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Purified Juice</text>
        <text x="77" y="124" text-anchor="middle" font-size="9" fill="#64748b">Impurities removed</text>
      </g>

      {/* Connecting Arrow: Stage 4 down and back to Stage 5 */}
      <path d="M 662 155 L 662 178 Q 662 188 650 188 L 610 188" fill="none" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

      {/* STAGE 5: EVAPORATING */}
      <g transform="translate(435, 195)">
        <rect width="165" height="135" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#eff6ff" />
        <rect y="16" width="165" height="12" fill="#eff6ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">5</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#1e3a8a">EVAPORATING</text>
        {/* Boiler vessel & heat */}
        <rect x="45" y="42" width="75" height="42" rx="6" fill="#fef3c7" stroke="#b45309" stroke-width="1.5" />
        <path d="M 60 38 Q 65 30 70 38" fill="none" stroke="#94a3b8" stroke-width="2" />
        <path d="M 80 38 Q 85 30 90 38" fill="none" stroke="#94a3b8" stroke-width="2" />
        <path d="M 100 38 Q 105 30 110 38" fill="none" stroke="#94a3b8" stroke-width="2" />
        {/* Flames */}
        <path d="M 55 92 Q 62 82 70 92 Q 77 82 85 92 Q 92 82 100 92 Q 107 82 112 92" fill="#ef4444" stroke="#f59e0b" stroke-width="1.5" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Heat turns juice into syrup</text>
        <text x="82" y="125" text-anchor="middle" font-size="9" fill="#64748b">Water evaporates</text>
      </g>

      {/* Arrow 5 -> 6 */}
      <line x1="430" y1="262" x2="400" y2="262" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow)" />

      {/* STAGE 6: CENTRIFUGE */}
      <g transform="translate(225, 195)">
        <rect width="165" height="135" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#eff6ff" />
        <rect y="16" width="165" height="12" fill="#eff6ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">6</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#1e3a8a">CENTRIFUGE</text>
        {/* Spinning drum */}
        <circle cx="82" cy="65" r="22" fill="#f8fafc" stroke="#475569" stroke-width="2" />
        <path d="M 68 55 A 16 16 0 0 1 96 55" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow)" />
        <path d="M 96 75 A 16 16 0 0 1 68 75" fill="none" stroke="#2563eb" stroke-width="2.5" marker-end="url(#arrow)" />
        <circle cx="82" cy="65" r="5" fill="#f59e0b" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Separates sugar crystals</text>
        <text x="82" y="125" text-anchor="middle" font-size="9" fill="#64748b">from syrup/molasses</text>
      </g>

      {/* Arrow 6 -> 7 */}
      <line x1="220" y1="262" x2="190" y2="262" stroke="#059669" stroke-width="2.5" marker-end="url(#arrow-emerald)" />

      {/* STAGE 7: DRYING & COOLING */}
      <g transform="translate(15, 195)">
        <rect width="165" height="135" rx="12" fill="#ffffff" stroke="#059669" stroke-width="2" />
        <rect width="165" height="28" rx="12" fill="#ecfdf5" />
        <rect y="16" width="165" height="12" fill="#ecfdf5" />
        <circle cx="22" cy="14" r="9" fill="#059669" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">7</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#065f46">DRYING &amp; COOLING</text>
        {/* Sugar bags */}
        <rect x="35" y="44" width="40" height="42" rx="4" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" />
        <text x="55" y="65" text-anchor="middle" font-size="8" font-weight="bold" fill="#334155">SUGAR</text>
        <text x="55" y="76" text-anchor="middle" font-size="7" fill="#64748b">50 kg</text>
        <rect x="85" y="48" width="40" height="38" rx="4" fill="#f8fafc" stroke="#64748b" stroke-width="1.5" />
        <text x="105" y="68" text-anchor="middle" font-size="8" font-weight="bold" fill="#334155">SUGAR</text>
        <text x="105" y="78" text-anchor="middle" font-size="7" fill="#64748b">50 kg</text>
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#065f46">Final Sugar Crystals</text>
        <text x="82" y="125" text-anchor="middle" font-size="9" fill="#475569">Dried, cooled &amp; bagged</text>
      </g>
    </svg>
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
        <div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
            <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
          </div>
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
          <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
            "In their advertising, businesses now emphasise that their products are new in some way.<br/><br/>
            Why is this?<br/>
            Do you think this is a positive or negative development?"
          </div>
          <div class="mt-4 space-y-1 text-xs text-slate-700">
            <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
            <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
          </div>
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
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 16 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Southwest Airport: Current Site vs Planned Redevelopment Next Year</h3>
  </div>

  <div class="bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200">
    <svg viewBox="0 0 780 370" class="w-full h-auto max-w-3xl mx-auto font-sans select-none">
      {/* LEFT PLAN: SOUTHWEST AIRPORT (NOW) */}
      <g transform="translate(10, 10)">
        {/* Background panel */}
        <rect width="365" height="345" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5" />
        <rect width="365" height="30" rx="12" fill="#f1f5f9" />
        <rect y="18" width="365" height="12" fill="#f1f5f9" />
        <text x="182" y="20" text-anchor="middle" font-size="12" font-weight="extrabold" fill="#0f172a">SOUTHWEST AIRPORT (NOW)</text>

        {/* Compass */}
        <g transform="translate(325, 55)">
          <circle cx="15" cy="15" r="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
          <line x1="15" y1="5" x2="15" y2="25" stroke="#0f172a" stroke-width="1.5" />
          <line x1="5" y1="15" x2="25" y2="15" stroke="#cbd5e1" stroke-width="1" />
          <polygon points="15,4 12,12 18,12" fill="#ef4444" />
          <text x="15" y="0" text-anchor="middle" font-size="9" font-weight="bold" fill="#0f172a">N</text>
        </g>

        {/* North Concourse (Gates 1-8) */}
        <rect x="152" y="55" width="60" height="145" rx="4" fill="#e2e8f0" stroke="#64748b" stroke-width="1.5" />
        <text x="182" y="115" text-anchor="middle" font-size="9" font-weight="bold" fill="#334155" transform="rotate(-90 182 115)">WALKWAY</text>

        {/* West Gates: 1 - 4 */}
        <g transform="translate(90, 60)">
          <rect x="0" y="0" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="16" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 1</text>
          <rect x="0" y="32" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="48" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 2</text>
          <rect x="0" y="64" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="80" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 3</text>
          <rect x="0" y="96" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="112" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 4</text>
        </g>

        {/* East Gates: 5 - 8 */}
        <g transform="translate(220, 60)">
          <rect x="0" y="0" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="16" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 5</text>
          <rect x="0" y="32" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="48" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 6</text>
          <rect x="0" y="64" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="80" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 7</text>
          <rect x="0" y="96" width="55" height="24" rx="3" fill="#ffffff" stroke="#64748b" stroke-width="1.2" />
          <text x="27" y="112" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e293b">Gate 8</text>
        </g>

        {/* Main Terminal Building */}
        <rect x="25" y="210" width="315" height="110" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="2" />
        
        {/* Departures Side (Left) */}
        <rect x="35" y="220" width="140" height="90" rx="6" fill="#eff6ff" stroke="#3b82f6" stroke-width="1" />
        <text x="105" y="238" text-anchor="middle" font-size="11" font-weight="extrabold" fill="#1d4ed8">DEPARTURES</text>
        <rect x="45" y="248" width="120" height="22" rx="3" fill="#ffffff" stroke="#93c5fd" />
        <text x="105" y="262" text-anchor="middle" font-size="9" font-weight="semibold" fill="#1e40af">Security Check</text>
        <rect x="45" y="276" width="120" height="24" rx="3" fill="#ffffff" stroke="#93c5fd" />
        <text x="105" y="291" text-anchor="middle" font-size="9" font-weight="bold" fill="#1e40af">Check-in Desks</text>

        {/* Arrivals Side (Right) */}
        <rect x="190" y="220" width="140" height="90" rx="6" fill="#ecfdf5" stroke="#10b981" stroke-width="1" />
        <text x="260" y="238" text-anchor="middle" font-size="11" font-weight="extrabold" fill="#047857">ARRIVALS</text>
        <rect x="200" y="248" width="120" height="22" rx="3" fill="#ffffff" stroke="#a7f3d0" />
        <text x="260" y="262" text-anchor="middle" font-size="9" font-weight="semibold" fill="#065f46">Passport Control</text>
        <rect x="200" y="276" width="120" height="24" rx="3" fill="#ffffff" stroke="#a7f3d0" />
        <text x="260" y="291" text-anchor="middle" font-size="9" font-weight="bold" fill="#065f46">Customs / Exit</text>
      </g>

      {/* RIGHT PLAN: SOUTHWEST AIRPORT (NEXT YEAR) */}
      <g transform="translate(400, 10)">
        {/* Background panel */}
        <rect width="370" height="345" rx="12" fill="#ffffff" stroke="#6366f1" stroke-width="1.8" />
        <rect width="370" height="30" rx="12" fill="#eef2ff" />
        <rect y="18" width="370" height="12" fill="#eef2ff" />
        <text x="185" y="20" text-anchor="middle" font-size="12" font-weight="extrabold" fill="#3730a3">SOUTHWEST AIRPORT (NEXT YEAR)</text>

        {/* Y-shaped concourse & Skytrain track */}
        {/* Left Wing (Gates 1-9) */}
        <path d="M 160 145 L 85 55 L 120 40 L 180 125 Z" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2" />
        {/* Right Wing (Gates 10-18) */}
        <path d="M 210 145 L 285 55 L 250 40 L 190 125 Z" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2" />
        {/* Central stem concourse */}
        <rect x="165" y="135" width="40" height="65" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.2" />

        {/* Skytrain tracks down center */}
        <line x1="185" y1="55" x2="185" y2="200" stroke="#4f46e5" stroke-width="2.5" stroke-dasharray="4,3" />
        <rect x="170" y="165" width="30" height="16" rx="3" fill="#4f46e5" />
        <text x="185" y="176" text-anchor="middle" font-size="7" font-weight="bold" fill="#ffffff">TRAIN</text>
        <text x="185" y="128" text-anchor="middle" font-size="8" font-weight="bold" fill="#3730a3">SKYTRAIN</text>

        {/* Labels on wings */}
        <rect x="25" y="42" width="60" height="22" rx="3" fill="#ffffff" stroke="#6366f1" />
        <text x="55" y="56" text-anchor="middle" font-size="9" font-weight="bold" fill="#3730a3">Gates 1–9</text>

        <rect x="285" y="42" width="60" height="22" rx="3" fill="#ffffff" stroke="#6366f1" />
        <text x="315" y="56" text-anchor="middle" font-size="9" font-weight="bold" fill="#3730a3">Gates 10–18</text>

        {/* Redesigned Terminal Building */}
        <rect x="15" y="200" width="340" height="135" rx="8" fill="#f8fafc" stroke="#475569" stroke-width="2" />

        {/* Relocated Departures */}
        <rect x="25" y="210" width="95" height="115" rx="5" fill="#eff6ff" stroke="#3b82f6" />
        <text x="72" y="226" text-anchor="middle" font-size="10" font-weight="bold" fill="#1d4ed8">DEPARTURES</text>
        <rect x="30" y="235" width="85" height="32" rx="3" fill="#ffffff" stroke="#bfdbfe" />
        <text x="72" y="249" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e40af">Relocated</text>
        <text x="72" y="260" text-anchor="middle" font-size="8" fill="#1e40af">Check-in</text>
        <rect x="30" y="275" width="85" height="24" rx="3" fill="#ffffff" stroke="#bfdbfe" />
        <text x="72" y="290" text-anchor="middle" font-size="8" font-weight="bold" fill="#1e40af">Security</text>

        {/* Center Shops & Amenities */}
        <rect x="128" y="210" width="114" height="115" rx="5" fill="#fdf4ff" stroke="#d946ef" />
        <rect x="133" y="218" width="104" height="24" rx="3" fill="#ffffff" stroke="#f0abfc" />
        <text x="185" y="233" text-anchor="middle" font-size="9" font-weight="bold" fill="#a21caf">DUTY FREE</text>
        <rect x="133" y="248" width="104" height="24" rx="3" fill="#ffffff" stroke="#f0abfc" />
        <text x="185" y="263" text-anchor="middle" font-size="9" font-weight="bold" fill="#a21caf">NEW CAFE</text>
        <rect x="133" y="278" width="104" height="22" rx="3" fill="#ffffff" stroke="#f0abfc" />
        <text x="185" y="292" text-anchor="middle" font-size="8" font-weight="bold" fill="#a21caf">ATM / Currency</text>

        {/* Relocated Arrivals */}
        <rect x="250" y="210" width="95" height="115" rx="5" fill="#ecfdf5" stroke="#10b981" />
        <text x="297" y="226" text-anchor="middle" font-size="10" font-weight="bold" fill="#047857">ARRIVALS</text>
        <rect x="255" y="235" width="85" height="32" rx="3" fill="#ffffff" stroke="#a7f3d0" />
        <text x="297" y="249" text-anchor="middle" font-size="8" font-weight="bold" fill="#065f46">Baggage</text>
        <text x="297" y="260" text-anchor="middle" font-size="8" fill="#065f46">Reclaim</text>
        <rect x="255" y="275" width="85" height="35" rx="3" fill="#ffffff" stroke="#a7f3d0" />
        <text x="297" y="289" text-anchor="middle" font-size="8" font-weight="bold" fill="#065f46">Car Hire</text>
        <text x="297" y="300" text-anchor="middle" font-size="7" fill="#065f46">Counters</text>
      </g>
    </svg>
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
        <div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
            <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
          </div>
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
          <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
            "Manufactured food and drink that contains high levels of sugar is causing lots of health problems.<br/><br/>
            Some people say that this should be made more expensive to encourage people to consume less of it.<br/><br/>
            Do you agree or disagree?"
          </div>
          <div class="mt-4 space-y-1 text-xs text-slate-700">
            <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
            <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
          </div>
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
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-sky-700 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 16 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">The Industrial Process of Recycling Plastic Bottles</h3>
  </div>

  <div class="bg-slate-50/70 p-3 sm:p-4 rounded-xl border border-slate-200">
    <svg viewBox="0 0 780 360" class="w-full h-auto max-w-3xl mx-auto font-sans select-none">
      <defs>
        <marker id="arrow-sky" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284c7" />
        </marker>
        <marker id="arrow-teal" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#0d9488" />
        </marker>
      </defs>

      {/* ROW 1: Stages 1 to 4 */}
      {/* STAGE 1: COLLECTION */}
      <g transform="translate(15, 20)">
        <rect width="165" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#f0f9ff" />
        <rect y="16" width="165" height="12" fill="#f0f9ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">1</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#0369a1">COLLECTION</text>
        {/* Recycle bin & truck */}
        <rect x="25" y="48" width="30" height="42" rx="3" fill="#fde047" stroke="#ca8a04" stroke-width="1.5" />
        <path d="M 33 65 L 47 65 M 40 58 L 40 72" stroke="#854d0e" stroke-width="2" />
        <text x="40" y="82" text-anchor="middle" font-size="7" font-weight="bold" fill="#854d0e">RECYCLE</text>
        <rect x="75" y="55" width="55" height="30" rx="3" fill="#38bdf8" />
        <circle cx="90" cy="88" r="7" fill="#334155" />
        <circle cx="120" cy="88" r="7" fill="#334155" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Recycling Bins</text>
        <text x="82" y="124" text-anchor="middle" font-size="9" fill="#64748b">Garbage trucks collect</text>
      </g>

      <line x1="185" y1="85" x2="210" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-sky)" />

      {/* STAGE 2: SORTING */}
      <g transform="translate(215, 20)">
        <rect width="165" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#f0f9ff" />
        <rect y="16" width="165" height="12" fill="#f0f9ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">2</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#0369a1">SORTING</text>
        {/* Conveyor belt */}
        <rect x="25" y="65" width="115" height="12" rx="3" fill="#94a3b8" />
        <rect x="35" y="44" width="14" height="20" rx="2" fill="#38bdf8" />
        <rect x="65" y="42" width="14" height="22" rx="2" fill="#22c55e" />
        <rect x="95" y="46" width="14" height="18" rx="2" fill="#f59e0b" />
        <circle cx="40" cy="71" r="4" fill="#334155" />
        <circle cx="82" cy="71" r="4" fill="#334155" />
        <circle cx="125" cy="71" r="4" fill="#334155" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Sorted by Type &amp; Colour</text>
        <text x="82" y="124" text-anchor="middle" font-size="9" fill="#64748b">PET vs Non-recyclable</text>
      </g>

      <line x1="385" y1="85" x2="410" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-sky)" />

      {/* STAGE 3: COMPACTING */}
      <g transform="translate(415, 20)">
        <rect width="165" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#f0f9ff" />
        <rect y="16" width="165" height="12" fill="#f0f9ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">3</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#0369a1">COMPACTING</text>
        {/* Hydraulic press and compressed bale */}
        <rect x="55" y="38" width="55" height="10" fill="#475569" />
        <line x1="82" y1="48" x2="82" y2="60" stroke="#334155" stroke-width="4" />
        <rect x="50" y="60" width="65" height="35" rx="3" fill="#bae6fd" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
        <line x1="50" y1="72" x2="115" y2="72" stroke="#0284c7" stroke-width="1" />
        <line x1="50" y1="83" x2="115" y2="83" stroke="#0284c7" stroke-width="1" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Pressed into Bales</text>
        <text x="82" y="124" text-anchor="middle" font-size="9" fill="#64748b">High-density blocks</text>
      </g>

      <line x1="585" y1="85" x2="610" y2="85" stroke="#0284c7" stroke-width="2.5" marker-end="url(#arrow-sky)" />

      {/* STAGE 4: CRUSHING & SHREDDING */}
      <g transform="translate(615, 20)">
        <rect width="150" height="130" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="150" height="28" rx="12" fill="#f0f9ff" />
        <rect y="16" width="150" height="12" fill="#f0f9ff" />
        <circle cx="22" cy="14" r="9" fill="#0284c7" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">4</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#0369a1">SHREDDING</text>
        {/* Rotating blades */}
        <circle cx="55" cy="65" r="16" fill="#f1f5f9" stroke="#334155" stroke-width="2" />
        <path d="M 45 65 L 65 65 M 55 55 L 55 75" stroke="#0284c7" stroke-width="2" />
        <circle cx="95" cy="65" r="16" fill="#f1f5f9" stroke="#334155" stroke-width="2" />
        <path d="M 85 65 L 105 65 M 95 55 L 95 75" stroke="#0284c7" stroke-width="2" />
        {/* Flakes */}
        <circle cx="65" cy="90" r="2" fill="#0284c7" />
        <circle cx="75" cy="94" r="2.5" fill="#0284c7" />
        <circle cx="85" cy="90" r="2" fill="#0284c7" />
        <text x="75" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Cut into Flakes</text>
        <text x="75" y="124" text-anchor="middle" font-size="9" fill="#64748b">Rotary blade crush</text>
      </g>

      {/* Connecting Arrow: Stage 4 down and back to Stage 5 */}
      <path d="M 690 155 L 690 180 Q 690 190 680 190 L 640 190" fill="none" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arrow-teal)" />

      {/* ROW 2: Stages 5 to 8 */}
      {/* STAGE 5: WASHING & STERILIZING */}
      <g transform="translate(465, 205)">
        <rect width="165" height="135" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#f0fdfa" />
        <rect y="16" width="165" height="12" fill="#f0fdfa" />
        <circle cx="22" cy="14" r="9" fill="#0d9488" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">5</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#115e59">WASHING</text>
        {/* Water bath vat */}
        <rect x="35" y="44" width="95" height="42" rx="4" fill="#ccfbf1" stroke="#0d9488" stroke-width="1.5" />
        <path d="M 40 55 Q 55 50 70 55 Q 85 60 100 55 Q 115 50 125 55" fill="none" stroke="#0f766e" stroke-width="2" />
        <text x="82" y="74" text-anchor="middle" font-size="8" font-weight="bold" fill="#0f766e">WATER &amp; DETERGENT</text>
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Flakes Washed</text>
        <text x="82" y="125" text-anchor="middle" font-size="9" fill="#64748b">Labels &amp; adhesive removed</text>
      </g>

      <line x1="460" y1="272" x2="435" y2="272" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arrow-teal)" />

      {/* STAGE 6: PELLETIZING */}
      <g transform="translate(265, 205)">
        <rect width="165" height="135" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
        <rect width="165" height="28" rx="12" fill="#f0fdfa" />
        <rect y="16" width="165" height="12" fill="#f0fdfa" />
        <circle cx="22" cy="14" r="9" fill="#0d9488" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">6</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#115e59">PELLETIZING</text>
        {/* Extruder & pellets */}
        <rect x="35" y="50" width="60" height="22" rx="3" fill="#e2e8f0" stroke="#475569" stroke-width="1.5" />
        <polygon points="95,50 115,61 95,72" fill="#f59e0b" />
        <circle cx="120" cy="58" r="3" fill="#0d9488" />
        <circle cx="128" cy="62" r="3" fill="#0d9488" />
        <circle cx="122" cy="68" r="3" fill="#0d9488" />
        <text x="82" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#334155">Plastic Pellets Formed</text>
        <text x="82" y="125" text-anchor="middle" font-size="9" fill="#64748b">Flakes melted &amp; extruded</text>
      </g>

      <line x1="260" y1="272" x2="235" y2="272" stroke="#0d9488" stroke-width="2.5" marker-end="url(#arrow-teal)" />

      {/* STAGE 7 & 8: HEATING & FINISHED PRODUCTS */}
      <g transform="translate(15, 205)">
        <rect width="215" height="135" rx="12" fill="#ffffff" stroke="#0d9488" stroke-width="2" />
        <rect width="215" height="28" rx="12" fill="#ccfbf1" />
        <rect y="16" width="215" height="12" fill="#ccfbf1" />
        <circle cx="22" cy="14" r="9" fill="#0d9488" />
        <text x="22" y="18" text-anchor="middle" font-size="11" font-weight="bold" fill="#ffffff">7</text>
        <text x="38" y="18" font-size="12" font-weight="bold" fill="#134e4a">NEW END PRODUCTS</text>
        {/* Products illustrations */}
        <g transform="translate(25, 42)">
          {/* New Bottle */}
          <rect x="10" y="8" width="16" height="30" rx="3" fill="#38bdf8" stroke="#0284c7" />
          <rect x="14" y="2" width="8" height="6" fill="#0284c7" />
          <text x="18" y="48" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">Bottles</text>

          {/* Clothing / Fleece */}
          <path d="M 60 5 L 75 10 L 70 20 L 65 17 L 65 36 L 50 36 L 50 17 L 45 20 L 40 10 Z" fill="#6366f1" stroke="#4338ca" />
          <text x="58" y="48" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">Fleece Jacket</text>

          {/* Container / Bags */}
          <rect x="100" y="10" width="28" height="26" rx="4" fill="#facc15" stroke="#ca8a04" />
          <line x1="108" y1="10" x2="108" y2="4" stroke="#ca8a04" stroke-width="1.5" />
          <line x1="120" y1="10" x2="120" y2="4" stroke="#ca8a04" stroke-width="1.5" />
          <line x1="108" y1="4" x2="120" y2="4" stroke="#ca8a04" stroke-width="1.5" />
          <text x="114" y="48" text-anchor="middle" font-size="7" font-weight="bold" fill="#334155">Containers</text>
        </g>
        <text x="107" y="112" text-anchor="middle" font-size="10" font-weight="bold" fill="#0f766e">Manufactured Products</text>
        <text x="107" y="125" text-anchor="middle" font-size="9" fill="#475569">Clothes, bottles, containers &amp; pens</text>
      </g>
    </svg>
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
        <div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
          <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
            <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
          </div>
          <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
          <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
            "In the future, all cars, buses and trucks will be driverless.<br/><br/>
            The only people travelling inside these vehicles will be passengers.<br/><br/>
            Do you think the advantages of driverless vehicles outweigh the disadvantages?"
          </div>
          <div class="mt-4 space-y-1 text-xs text-slate-700">
            <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
            <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
          </div>
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
