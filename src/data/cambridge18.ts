import type { IELTSMockTest } from '../types/ielts';

export const cambridge18Test1Reading: IELTSMockTest = {
  "id": "cambridge-18-test-1-reading",
  "book": 18,
  "testNumber": 1,
  "module": "reading",
  "title": "Cambridge 18 Academic Reading Test 1",
  "durationMinutes": 60,
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Reading Passage 1",
      "subtitle": "Urban farming",
      "passageContent": "\n        <div class=\"space-y-5 text-slate-800 leading-relaxed font-serif\">\n          <p class=\"font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3\">\n            In Paris, urban farmers are trying a soil-free approach to agriculture that uses less space and fewer resources. Could it help cities face the threats to our food supplies?\n          </p>\n          <p>\n            On top of a striking new exhibition hall in southern Paris, the world’s largest urban rooftop farm has started to bear fruit. Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic tubes. Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them. From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs, such as basil, sage and peppermint. Opposite, in narrow, horizontal trays packed not with soil but with coconut fibre, grow cherry tomatoes, shiny aubergines and brightly coloured chards.\n          </p>\n          <p>\n            Pascal Hardy, an engineer and sustainable development consultant, began experimenting with vertical farming and aeroponic growing towers – as the soil-free plastic tubes are known – on his Paris apartment block roof five years ago. The urban rooftop space above the exhibition hall is somewhat bigger: 14,000 square metres and almost exactly the size of a couple of football pitches. Already, the team of young urban farmers who tend it have picked, in one day, 3,000 lettuces and 150 punnets of strawberries. When the remaining two thirds of the vast open area are in production, 20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day. ‘We’re not ever, obviously, going to feed the whole city this way,’ cautions Hardy. ‘In the urban environment you’re working with very significant practical constraints, clearly, on what you can do and where. But if enough unused space can be developed like this, there’s no reason why you shouldn’t eventually target maybe between 5% and 10% of consumption.’\n          </p>\n          <p>\n            Perhaps most significantly, however, this is a real-life showcase for the work of Hardy’s flourishing urban agriculture consultancy, Agripolis, which is currently fielding enquiries from around the world to design, build and equip a new breed of soil-free inner-city farm. ‘The method’s advantages are many,’ he says. ‘First, I don’t much like the fact that most of the fruit and vegetables we eat have been treated with something like 17 different pesticides, or that the intensive farming techniques that produced them are such huge generators of greenhouse gases. I don’t much like the fact, either, that they’ve travelled an average of 2,000 refrigerated kilometres to my plate, that their quality is so poor, because the varieties are selected for their capacity to withstand such substantial journeys, or that 80% of the price I pay goes to wholesalers and transport companies, not the producers.’\n          </p>\n          <p>\n            Produce grown using this soil-free method, on the other hand – which relies solely on a small quantity of water, enriched with organic nutrients, pumped around a closed circuit of pipes, towers and trays – is ‘produced up here, and sold locally, just down there. It barely travels at all,’ Hardy says. ‘You can select crop varieties for their flavour, not their resistance to the transport and storage chain, and you can pick them when they’re really at their best, and not before.’ No soil is exhausted, and the water that gently showers the plants’ roots every 12 minutes is recycled, so the method uses 90% less water than a classic intensive farm for the same yield.\n          </p>\n          <p>\n            Urban farming is not, of course, a new phenomenon. Inner-city agriculture is booming from Shanghai to Detroit and Tokyo to Bangkok. Strawberries are being grown in disused shipping containers, mushrooms in underground carparks. Aeroponic farming, he says, is ‘virtuous’. The equipment weighs little, can be installed on almost any flat surface and is cheap to buy: roughly €100 to €150 per square metre. It is cheap to run, too, consuming a tiny fraction of the electricity used by some techniques.\n          </p>\n          <p>\n            Produce grown this way typically sells at prices that, while generally higher than those of classic intensive agriculture, are lower than soil-based organic growers. There are limits to what farmers can grow this way, of course, and much of the produce is suited to the summer months. ‘Root vegetables we cannot do, at least not yet,’ he says. ‘Radishes are OK, but carrots, potatoes, that kind of thing – the roots are simply too long. Fruit trees are obviously not an option. And beans tend to take up a lot of space for not much return.’ Nevertheless, urban farming of the kind being practised in Paris is one part of a bigger and fast-changing picture that is bringing food production closer to our lives.\n          </p>\n        </div>\n      ",
      "questionGroups": [
        {
          "id": "c18-r1-qg1",
          "type": "sentence_completion",
          "title": "Questions 1 – 3",
          "instructions": "Complete the sentences below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.",
          "summaryTitle": "Urban farming in Paris",
          "wordLimitRule": "NO MORE THAN TWO WORDS AND/OR A NUMBER",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Vertical tubes are used to grow strawberries, [ 1 ] and herbs.",
              "correctAnswer": "lettuces",
              "acceptedVariants": [
                "lettuce"
              ],
              "explanation": "Paragraph 1: \"From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs...\"",
              "passageEvidence": {
                "paragraph": "1",
                "quote": "identical vertical tubes nearby burst row upon row of lettuces"
              }
            },
            {
              "questionNumber": 2,
              "prompt": "There will eventually be a daily harvest of as much as [ 2 ] in weight of fruit and vegetables.",
              "correctAnswer": "1,000 kg",
              "acceptedVariants": [
                "1000 kg",
                "1,000kg",
                "1000kg",
                "a ton",
                "a tonne"
              ],
              "explanation": "Paragraph 2: \"...20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day.\"",
              "passageEvidence": {
                "paragraph": "2",
                "quote": "harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day"
              }
            },
            {
              "questionNumber": 3,
              "prompt": "It may be possible that the farm’s produce will account for as much as 10% of the city’s [ 3 ] overall.",
              "correctAnswer": "consumption",
              "acceptedVariants": [
                "food consumption",
                "(food) consumption"
              ],
              "explanation": "Paragraph 2: \"...there’s no reason why you shouldn’t eventually target maybe between 5% and 10% of consumption.\"",
              "passageEvidence": {
                "paragraph": "2",
                "quote": "target maybe between 5% and 10% of consumption"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg2",
          "type": "table_completion",
          "title": "Questions 4 – 7",
          "instructions": "Complete the table below. Choose ONE WORD ONLY from the passage for each answer.",
          "summaryTitle": "Intensive farming versus aeroponic urban farming",
          "wordLimitRule": "ONE WORD ONLY",
          "questions": [
            {
              "questionNumber": 4,
              "prompt": "Intensive farming: wide range of [ 4 ] used",
              "correctAnswer": "pesticides",
              "acceptedVariants": [
                "pesticide"
              ],
              "explanation": "Paragraph 3: \"...most of the fruit and vegetables we eat have been treated with something like 17 different pesticides...\"",
              "passageEvidence": {
                "paragraph": "3",
                "quote": "treated with something like 17 different pesticides"
              }
            },
            {
              "questionNumber": 5,
              "prompt": "Intensive farming: varieties of fruit and vegetables chosen that can survive long [ 5 ]",
              "correctAnswer": "journeys",
              "acceptedVariants": [
                "journey"
              ],
              "explanation": "Paragraph 3: \"...selected for their capacity to withstand such substantial journeys...\"",
              "passageEvidence": {
                "paragraph": "3",
                "quote": "withstand such substantial journeys"
              }
            },
            {
              "questionNumber": 6,
              "prompt": "Intensive farming: [ 6 ] receive very little of overall income",
              "correctAnswer": "producers",
              "acceptedVariants": [
                "producer"
              ],
              "explanation": "Paragraph 3: \"...80% of the price I pay goes to wholesalers and transport companies, not the producers.\"",
              "passageEvidence": {
                "paragraph": "3",
                "quote": "not the producers"
              }
            },
            {
              "questionNumber": 7,
              "prompt": "Aeroponic urban farming: produce chosen because of its [ 7 ]",
              "correctAnswer": "flavour",
              "acceptedVariants": [
                "flavor"
              ],
              "explanation": "Paragraph 4: \"You can select crop varieties for their flavour, not their resistance to the transport and storage chain...\"",
              "passageEvidence": {
                "paragraph": "4",
                "quote": "select crop varieties for their flavour"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg3",
          "type": "true_false_not_given",
          "title": "Questions 8 – 13",
          "instructions": "Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.",
          "questions": [
            {
              "questionNumber": 8,
              "prompt": "Urban farming can take place above or below ground.",
              "correctAnswer": "TRUE",
              "explanation": "Paragraph 5 mentions farming on rooftops (\"rooftop farm\") as well as \"mushrooms in underground carparks\", so it takes place both above and below ground.",
              "passageEvidence": {
                "paragraph": "5",
                "quote": "Strawberries are being grown in disused shipping containers, mushrooms in underground carparks."
              }
            },
            {
              "questionNumber": 9,
              "prompt": "Some of the equipment used in aeroponic farming can be made by hand.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Paragraph 5 mentions equipment weighs little and is cheap to buy, but there is no information about making it by hand.",
              "passageEvidence": {
                "paragraph": "5",
                "quote": "The equipment weighs little, can be installed on almost any flat surface and is cheap to buy"
              }
            },
            {
              "questionNumber": 10,
              "prompt": "Urban farming relies more on electricity than some other types of farming.",
              "correctAnswer": "FALSE",
              "explanation": "Paragraph 5 states aeroponic farming is \"cheap to run, too, consuming a tiny fraction of the electricity used by some techniques.\"",
              "passageEvidence": {
                "paragraph": "5",
                "quote": "consuming a tiny fraction of the electricity used by some techniques"
              }
            },
            {
              "questionNumber": 11,
              "prompt": "Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.",
              "correctAnswer": "TRUE",
              "explanation": "Paragraph 6 states produce sells at prices that \"are lower than soil-based organic growers.\"",
              "passageEvidence": {
                "paragraph": "6",
                "quote": "lower than soil-based organic growers"
              }
            },
            {
              "questionNumber": 12,
              "prompt": "Most produce can be grown on an aeroponic urban farm at any time of the year.",
              "correctAnswer": "FALSE",
              "explanation": "Paragraph 6 explicitly notes: \"...much of the produce is suited to the summer months. 'Root vegetables we cannot do, at least not yet'...\"",
              "passageEvidence": {
                "paragraph": "6",
                "quote": "much of the produce is suited to the summer months"
              }
            },
            {
              "questionNumber": 13,
              "prompt": "Beans take longer to grow on an urban farm than other vegetables.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Paragraph 6 mentions that \"beans tend to take up a lot of space for not much return\", but says nothing about how long they take to grow.",
              "passageEvidence": {
                "paragraph": "6",
                "quote": "beans tend to take up a lot of space for not much return"
              }
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Reading Passage 2",
      "subtitle": "Forest management in Pennsylvania, USA",
      "passageContent": "\n        <div class=\"space-y-5 text-slate-800 leading-relaxed font-serif\">\n          <p class=\"font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3\">\n            How managing low-quality wood (also known as low-use wood) for bioenergy can encourage sustainable forest management\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">A</span>\n            A tree’s ‘value’ depends on several factors including its species, size, form, condition, quality, function, and accessibility, and depends on the management goals for a given forest. The same tree can be valued very differently by each person who looks at it. A large, straight black cherry tree has high value as timber to be cut into logs or made into furniture, but for a landowner more interested in wildlife habitat, the real value of that stem (or trunk) may be the food it provides to animals. Likewise, if the tree suffers from black knot disease, its value for timber decreases, but to a woodworker interested in making bowls, it brings an opportunity for a unique and beautiful piece of art.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">B</span>\n            In the past, Pennsylvania landowners were solely interested in the value of their trees as high-quality timber. The norm was to remove the stems of highest quality and leave behind poorly formed trees that were not as well suited to the site where they grew. This practice, called ‘high-grading’, has left a legacy of ‘low-use wood’ in the forests. Some people even call these ‘junk trees’, and they are abundant in Pennsylvania. These trees have lower economic value for traditional timber markets, compete for growth with higher-value trees, shade out desirable regeneration and decrease the health of a stand leaving it more vulnerable to poor weather and disease. Management that specifically targets low-use wood can help landowners manage these forest health issues, and wood energy markets help promote this.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">C</span>\n            Wood energy markets can accept less expensive wood material of lower quality than would be suitable for traditional timber markets. Most wood used for energy in Pennsylvania is used to produce heat or electricity through combustion. Many schools and hospitals use wood boiler systems to heat and power their facilities, many homes are primarily heated with wood, and some coal plants incorporate wood into their coal streams to produce electricity. Wood can also be gasified for electrical generation and can even be made into liquid fuels like ethanol and gasoline for lorries and cars. All these products are made primarily from low-use wood. Several tree- and plant-cutting approaches, which could greatly improve the long-term quality of a forest, focus strongly or solely on the use of wood for those markets.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">D</span>\n            One such approach is called a Timber Stand Improvement (TSI) Cut. In a TSI Cut, really poor-quality tree and plant material is cut down to allow more space, light, and other resources to the highest-valued stems that remain. Removing invasive plants might be another primary goal of a TSI Cut. The stems that are left behind might then grow in size and develop more foliage and larger crowns or tops that produce more coverage for wildlife; they have a better chance to regenerate in a less crowded environment. TSI Cuts can be tailored to one farmer’s specific management goals for his or her land.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">E</span>\n            Another approach that might yield a high amount of low-use wood is a Salvage Cut. With the many pests and pathogens visiting forests including hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth, to name just a few, it is important to remember that those working in the forests can help ease these issues through cutting procedures. These types of cut reduce the number of sick trees and seek to manage the future spread of a pest problem. They leave vigorous trees that have stayed healthy enough to survive the outbreak.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">F</span>\n            A Shelterwood Cut, which only takes place in a mature forest that has already been thinned several times, involves removing all the mature trees when other seedlings have become established. This then allows the forester to decide which tree species are regenerated. It leaves a young forest where all trees are at a similar point in their growth. It can also be used to develop a two-tier forest so that there are two harvests and the money that comes in is spread out over a decade or more.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">G</span>\n            Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood. However, it is important to remember that some retention of what many would classify as low-use wood is very important. The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil. In addition, trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals. They help control problem insects and increase the health and resilience of the forest. It is also important to remember that not all small trees are low-use. For example, many species like hawthorn provide food for wildlife. Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity.\n          </p>\n          <p class=\"text-xs text-slate-500 font-sans border-t border-slate-200 pt-2\">\n            *Stand – An area covered with trees that have common features (e.g. size)\n          </p>\n        </div>\n      ",
      "questionGroups": [
        {
          "id": "c18-r1-qg4",
          "type": "matching_information",
          "title": "Questions 14 – 18",
          "instructions": "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          "paragraphOptions": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "questions": [
            {
              "questionNumber": 14,
              "prompt": "bad outcomes for a forest when people focus only on its financial reward",
              "correctAnswer": "B",
              "explanation": "Paragraph B explains that \"high-grading\" (removing high-quality stems and leaving poor trees behind) left a legacy of low-use \"junk trees\" that decrease the health of a stand.",
              "passageEvidence": {
                "paragraph": "B",
                "quote": "practice, called 'high-grading', has left a legacy of 'low-use wood'... decrease the health of a stand"
              }
            },
            {
              "questionNumber": 15,
              "prompt": "reference to the aspects of any tree that contribute to its worth",
              "correctAnswer": "A",
              "explanation": "Paragraph A begins: \"A tree’s ‘value’ depends on several factors including its species, size, form, condition, quality, function, and accessibility...\"",
              "passageEvidence": {
                "paragraph": "A",
                "quote": "depends on several factors including its species, size, form, condition, quality, function, and accessibility"
              }
            },
            {
              "questionNumber": 16,
              "prompt": "mention of the potential use of wood to help run vehicles",
              "correctAnswer": "C",
              "explanation": "Paragraph C states: \"Wood can also be gasified... and can even be made into liquid fuels like ethanol and gasoline for lorries and cars.\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "made into liquid fuels like ethanol and gasoline for lorries and cars"
              }
            },
            {
              "questionNumber": 17,
              "prompt": "examples of insects that attack trees",
              "correctAnswer": "E",
              "explanation": "Paragraph E lists specific pests and pathogens: \"hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth...\"",
              "passageEvidence": {
                "paragraph": "E",
                "quote": "hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth"
              }
            },
            {
              "questionNumber": 18,
              "prompt": "an alternative name for trees that produce low-use wood",
              "correctAnswer": "B",
              "explanation": "Paragraph B explains: \"Some people even call these 'junk trees', and they are abundant in Pennsylvania.\"",
              "passageEvidence": {
                "paragraph": "B",
                "quote": "Some people even call these 'junk trees'"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg5",
          "type": "multiple_choice",
          "title": "Questions 19 – 21",
          "instructions": "Look at the following purposes and the list of timber cuts below. Match each purpose with the correct timber cut, A, B or C. NB You may use any letter more than once.\n\nList of Timber Cuts:\nA. a TSI Cut\nB. a Salvage Cut\nC. a Shelterwood Cut",
          "questions": [
            {
              "questionNumber": 19,
              "prompt": "to remove trees that are diseased",
              "options": [
                "A. a TSI Cut",
                "B. a Salvage Cut",
                "C. a Shelterwood Cut"
              ],
              "correctAnswer": "B",
              "explanation": "Paragraph E states a Salvage Cut reduces the number of sick trees and manages pests/pathogens.",
              "passageEvidence": {
                "paragraph": "E",
                "quote": "reduce the number of sick trees and seek to manage the future spread of a pest problem"
              }
            },
            {
              "questionNumber": 20,
              "prompt": "to generate income across a number of years",
              "options": [
                "A. a TSI Cut",
                "B. a Salvage Cut",
                "C. a Shelterwood Cut"
              ],
              "correctAnswer": "C",
              "explanation": "Paragraph F states Shelterwood Cut can be used \"so that there are two harvests and the money that comes in is spread out over a decade or more.\"",
              "passageEvidence": {
                "paragraph": "F",
                "quote": "money that comes in is spread out over a decade or more"
              }
            },
            {
              "questionNumber": 21,
              "prompt": "to create a forest whose trees are close in age",
              "options": [
                "A. a TSI Cut",
                "B. a Salvage Cut",
                "C. a Shelterwood Cut"
              ],
              "correctAnswer": "C",
              "explanation": "Paragraph F notes Shelterwood Cut \"leaves a young forest where all trees are at a similar point in their growth.\"",
              "passageEvidence": {
                "paragraph": "F",
                "quote": "where all trees are at a similar point in their growth"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg6",
          "type": "sentence_completion",
          "title": "Questions 22 – 26",
          "instructions": "Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.",
          "wordLimitRule": "ONE WORD ONLY",
          "questions": [
            {
              "questionNumber": 22,
              "prompt": "Some dead wood is removed to avoid the possibility of [ 22 ].",
              "correctAnswer": "fire",
              "acceptedVariants": [
                "fires"
              ],
              "explanation": "Paragraph G: \"Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood.\"",
              "passageEvidence": {
                "paragraph": "G",
                "quote": "dead wood removal for fire prevention"
              }
            },
            {
              "questionNumber": 23,
              "prompt": "The [ 23 ] from the tops of cut trees can help improve soil quality.",
              "correctAnswer": "nutrients",
              "acceptedVariants": [
                "nutrient"
              ],
              "explanation": "Paragraph G: \"The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil.\"",
              "passageEvidence": {
                "paragraph": "G",
                "quote": "nutrients cycle back into the soil"
              }
            },
            {
              "questionNumber": 24,
              "prompt": "Some damaged trees should be left, as their [ 24 ] provide habitats for a range of creatures.",
              "correctAnswer": "cavities",
              "acceptedVariants": [
                "cavity"
              ],
              "explanation": "Paragraph G: \"...trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals.\"",
              "passageEvidence": {
                "paragraph": "G",
                "quote": "trees with many cavities are extremely important habitats"
              }
            },
            {
              "questionNumber": 25,
              "prompt": "Some trees that are small, such as [ 25 ], are a source of food for animals and insects.",
              "correctAnswer": "hawthorn",
              "acceptedVariants": [
                "hawthorns"
              ],
              "explanation": "Paragraph G: \"...many species like hawthorn provide food for wildlife.\"",
              "passageEvidence": {
                "paragraph": "G",
                "quote": "many species like hawthorn provide food for wildlife"
              }
            },
            {
              "questionNumber": 26,
              "prompt": "Any trees that are [ 26 ] should be left to grow, as they add to the variety of species in the forest.",
              "correctAnswer": "rare",
              "explanation": "Paragraph G: \"Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity.\"",
              "passageEvidence": {
                "paragraph": "G",
                "quote": "rare species of trees in a forest should also stay behind"
              }
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Reading Passage 3",
      "subtitle": "Conquering Earth’s space junk problem",
      "passageContent": "\n        <div class=\"space-y-5 text-slate-800 leading-relaxed font-serif\">\n          <p class=\"font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3\">\n            Satellites, rocket shards and collision debris are creating major traffic risks in orbit around the planet. Researchers are working to reduce these threats\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">A</span>\n            Last year, commercial companies, military and civil departments and amateurs sent more than 400 satellites into orbit, over four times the yearly average in the previous decade. Numbers could rise even more sharply if leading space companies follow through on plans to deploy hundreds to thousands of large constellations of satellites to space in the next few years. All that traffic can lead to disaster. Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel that now threaten other satellites in low Earth orbit – the zone stretching up to 2,000 kilometres in altitude. Altogether, there are roughly 20,000 human-made objects in orbit, from working satellites to small rocket pieces. And satellite operators can’t steer away from every potential crash, because each move consumes time and fuel that could otherwise be used for the spacecraft’s main job.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">B</span>\n            Concern about space junk goes back to the beginning of the satellite era, but the number of objects in orbit is rising so rapidly that researchers are investigating new ways of attacking the problem. Several teams are trying to improve methods for assessing what is in orbit, so that satellite operators can work more efficiently in ever-more-crowded space. Some researchers are now starting to compile a massive data set that includes the best possible information on where everything is in orbit. Others are developing taxonomies of space – working on measuring properties such as the shape and size of an object, so that satellite operators know how much to worry about what’s coming their way. The alternative, many say, is unthinkable. Just a few uncontrolled space crashes could generate enough debris to set off a runaway cascade of fragments, rendering near-Earth space unusable. ‘If we go on like this, we will reach a point of no return,’ says Carolin Frueh, an astrodynamical researcher at Purdue University in West Lafayette, Indiana.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">C</span>\n            Even as our ability to monitor space objects increases, so too does the total number of items in orbit. That means companies, governments and other players in space are collaborating in new ways to avoid a shared threat. International groups such as the Inter-Agency Space Debris Coordination Committee have developed guidelines on space sustainability. Those include inactivating satellites at the end of their useful life by venting pressurised materials or leftover fuel that might lead to explosions. The intergovernmental groups also advise lowering satellites deep enough into the atmosphere that they will burn up or disintegrate within 25 years. But so far, only about half of all missions have abided by this 25-year goal, says Holger Krag, head of the European Space Agency’s space-debris office in Darmstadt, Germany. Operators of the planned large constellations of satellites say they will be responsible stewards in their enterprises in space, but Krag worries that problems could increase, despite their best intentions. ‘What happens to those that fail or go bankrupt?’ he asks. ‘They are probably not going to spend money to remove their satellites from space.’\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">D</span>\n            In theory, given the vastness of space, satellite operators should have plenty of room for all these missions to fly safely without ever nearing another object. So some scientists are tackling the problem of space junk by trying to find out where all the debris is to a high degree of precision. That would alleviate the need for many of the unnecessary manoeuvres that are carried out to avoid potential collisions. ‘If you knew precisely where everything was, you would almost never have a problem,’ says Marlon Sorge, a space-debris specialist at the Aerospace Corporation in El Segundo, California.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">E</span>\n            The field is called space traffic management, because it’s similar to managing traffic on the roads or in the air. Think about a busy day at an airport, says Moriba Jah, an astrodynamicist at the University of Texas at Austin: planes line up in the sky, landing and taking off close to one another in a carefully choreographed routine. Air-traffic controllers know the location of the planes down to one metre in accuracy. The same can’t be said for space debris. Not all objects in orbit are known, and even those included in databases are not tracked consistently.\n          </p>\n          <p>\n            <span class=\"inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900\">F</span>\n            An additional problem is that there is no authoritative catalogue that accurately lists the orbits of all known space debris. Jah illustrates this with a web-based database that he has developed. It draws on several sources, such as catalogues maintained by the US and Russian governments, to visualise where objects are in space. When he types in an identifier for a particular space object, the database draws a purple line to designate its orbit. Only this doesn’t quite work for a number of objects, such as a Russian rocket body designated in the database as object number 32280. When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object. Jah says that it is almost impossible to tell which is correct, unless a third source of information made it possible to cross-correlate. Jah describes himself as a space environmentalist: ‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’ Until that happens, he argues, the space community will continue devolving into a tragedy in which all spaceflight operators are polluting a common resource.\n          </p>\n        </div>\n      ",
      "questionGroups": [
        {
          "id": "c18-r1-qg7",
          "type": "matching_information",
          "title": "Questions 27 – 31",
          "instructions": "Reading Passage 3 has six sections, A–F. Which section contains the following information? Write the correct letter, A–F.",
          "paragraphOptions": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F"
          ],
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "a reference to the cooperation that takes place to try and minimise risk",
              "correctAnswer": "C",
              "explanation": "Section C mentions that \"companies, governments and other players in space are collaborating in new ways to avoid a shared threat\" and mentions the Inter-Agency Space Debris Coordination Committee.",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "companies, governments and other players in space are collaborating in new ways"
              }
            },
            {
              "questionNumber": 28,
              "prompt": "an explanation of a person’s aims",
              "correctAnswer": "F",
              "explanation": "Section F concludes with Moriba Jah stating his aims: \"‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’\"",
              "passageEvidence": {
                "paragraph": "F",
                "quote": "I want to make space a place that is safe to operate, that is free and useful for generations to come"
              }
            },
            {
              "questionNumber": 29,
              "prompt": "a description of a major collision that occurred in space",
              "correctAnswer": "A",
              "explanation": "Section A describes: \"Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel...\"",
              "passageEvidence": {
                "paragraph": "A",
                "quote": "US commercial Iridium satellite smashed into an inactive Russian communications satellite"
              }
            },
            {
              "questionNumber": 30,
              "prompt": "a comparison between tracking objects in space and the efficiency of a transportation system",
              "correctAnswer": "E",
              "explanation": "Section E compares tracking space objects to airport traffic: \"Think about a busy day at an airport... Air-traffic controllers know the location of the planes down to one metre in accuracy. The same can’t be said for space debris.\"",
              "passageEvidence": {
                "paragraph": "E",
                "quote": "similar to managing traffic on the roads or in the air. Think about a busy day at an airport"
              }
            },
            {
              "questionNumber": 31,
              "prompt": "a reference to efforts to classify space junk",
              "correctAnswer": "B",
              "explanation": "Section B mentions: \"Others are developing taxonomies of space – working on measuring properties such as the shape and size of an object...\"",
              "passageEvidence": {
                "paragraph": "B",
                "quote": "developing taxonomies of space – working on measuring properties such as the shape and size of an object"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg8",
          "type": "summary_completion",
          "title": "Questions 32 – 35",
          "instructions": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.",
          "summaryTitle": "The Inter-Agency Space Debris Coordination Committee",
          "wordLimitRule": "ONE WORD ONLY",
          "questions": [
            {
              "questionNumber": 32,
              "prompt": "The committee gives advice on how the [ 32 ] of space can be achieved.",
              "correctAnswer": "sustainability",
              "explanation": "Section C: \"...have developed guidelines on space sustainability.\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "guidelines on space sustainability"
              }
            },
            {
              "questionNumber": 33,
              "prompt": "The committee advises that when satellites are no longer active, any unused [ 33 ] or pressurised material that could cause explosions should be removed.",
              "correctAnswer": "fuel",
              "explanation": "Section C: \"...by venting pressurised materials or leftover fuel that might lead to explosions.\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "venting pressurised materials or leftover fuel"
              }
            },
            {
              "questionNumber": 34,
              "prompt": "Any unused fuel or pressurised material that could cause [ 34 ] should be removed.",
              "correctAnswer": "explosions",
              "acceptedVariants": [
                "explosion"
              ],
              "explanation": "Section C: \"...leftover fuel that might lead to explosions.\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "might lead to explosions"
              }
            },
            {
              "questionNumber": 35,
              "prompt": "Although operators of large satellite constellations accept that they have obligations as stewards of space, Holger Krag points out that the operators that become [ 35 ] are unlikely to prioritise removing their satellites from space.",
              "correctAnswer": "bankrupt",
              "explanation": "Section C: \"‘What happens to those that fail or go bankrupt?’ he asks. ‘They are probably not going to spend money to remove their satellites from space.’\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "fail or go bankrupt"
              }
            }
          ]
        },
        {
          "id": "c18-r1-qg9",
          "type": "multiple_choice",
          "title": "Questions 36 – 40",
          "instructions": "Look at the following statements and the list of people below. Match each statement with the correct person, A, B, C or D. NB You may use any letter more than once.\n\nList of People:\nA. Carolin Frueh\nB. Holger Krag\nC. Marlon Sorge\nD. Moriba Jah",
          "questions": [
            {
              "questionNumber": 36,
              "prompt": "Knowing the exact location of space junk would help prevent any possible danger.",
              "options": [
                "A. Carolin Frueh",
                "B. Holger Krag",
                "C. Marlon Sorge",
                "D. Moriba Jah"
              ],
              "correctAnswer": "C",
              "explanation": "Section D: \"‘If you knew precisely where everything was, you would almost never have a problem,’ says Marlon Sorge...\"",
              "passageEvidence": {
                "paragraph": "D",
                "quote": "If you knew precisely where everything was, you would almost never have a problem"
              }
            },
            {
              "questionNumber": 37,
              "prompt": "Space should be available to everyone and should be preserved for the future.",
              "options": [
                "A. Carolin Frueh",
                "B. Holger Krag",
                "C. Marlon Sorge",
                "D. Moriba Jah"
              ],
              "correctAnswer": "D",
              "explanation": "Section F: \"Jah describes himself as a space environmentalist: ‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’\"",
              "passageEvidence": {
                "paragraph": "F",
                "quote": "free and useful for generations to come"
              }
            },
            {
              "questionNumber": 38,
              "prompt": "A recommendation regarding satellites is widely ignored.",
              "options": [
                "A. Carolin Frueh",
                "B. Holger Krag",
                "C. Marlon Sorge",
                "D. Moriba Jah"
              ],
              "correctAnswer": "B",
              "explanation": "Section C: \"But so far, only about half of all missions have abided by this 25-year goal, says Holger Krag...\"",
              "passageEvidence": {
                "paragraph": "C",
                "quote": "only about half of all missions have abided by this 25-year goal"
              }
            },
            {
              "questionNumber": 39,
              "prompt": "There is conflicting information about where some satellites are in space.",
              "options": [
                "A. Carolin Frueh",
                "B. Holger Krag",
                "C. Marlon Sorge",
                "D. Moriba Jah"
              ],
              "correctAnswer": "D",
              "explanation": "Section F: \"When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object.\"",
              "passageEvidence": {
                "paragraph": "F",
                "quote": "two completely different orbits for the same object"
              }
            },
            {
              "questionNumber": 40,
              "prompt": "There is a risk we will not be able to undo the damage that occurs in space.",
              "options": [
                "A. Carolin Frueh",
                "B. Holger Krag",
                "C. Marlon Sorge",
                "D. Moriba Jah"
              ],
              "correctAnswer": "A",
              "explanation": "Section B: \"‘If we go on like this, we will reach a point of no return,’ says Carolin Frueh...\"",
              "passageEvidence": {
                "paragraph": "B",
                "quote": "reach a point of no return"
              }
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test1Listening: IELTSMockTest = {
  "id": "cambridge-18-test-1-listening",
  "book": 18,
  "testNumber": 1,
  "module": "listening",
  "title": "Cambridge 18 Academic Listening Test 1",
  "durationMinutes": 35,
  "audioUrl": "/audio/cam18-test1-part1.mp3",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Listening Part 1",
      "subtitle": "Transport Survey (Sadie Jones)",
      "audioUrl": "/audio/cam18-test1-part1.mp3",
      "transcript": "\n        MAN: Excuse me. Would you mind if I asked you some questions? We're doing a survey on transport.\n        SADIE: Yes, that's OK.\n        MAN: First of all, can I take your name?\n        SADIE: Yes. It's Sadie Jones.\n        MAN: Thanks very much. And could I have your date of birth – just the year will do, actually. Is that all right?\n        SADIE: Yes, that's fine. It's 1991.\n        MAN: So next your postcode, please.\n        SADIE: It's DW30 7YZ.\n        MAN: Great. Thanks. Is that in Wells?\n        SADIE: No it's actually in Harborne - Wells isn't far from there, though.\n        MAN: Right, so now I want to ask you some questions about how you travelled here today. Did you use public transport?\n        SADIE: Yes. I came by bus.\n        MAN: OK. And that was today. It's the 24th of April, isn't it?\n        SADIE: Isn't it the 25th? No, actually, you're right.\n        MAN: And what was the reason for your trip today? I can see you've got some shopping with you.\n        SADIE: Yes. I did some shopping but the main reason I came here was to go to the dentist.\n        MAN: Do you normally travel by bus into the city centre?\n        SADIE: Yes. I stopped driving in ages ago because parking was so difficult to find and it costs so much.\n        MAN: So where did you start your journey?\n        SADIE: At the bus stop on Claxby Street.\n        MAN: Is that C-L-A-X-B-Y?\n        SADIE: That's right.\n        MAN: And how satisfied with the service are you? Do you have any complaints?\n        SADIE: Well, as I said, it's very convenient and quick when it's on time, but this morning it was late. Only about 10 minutes, but still.\n        MAN: And what about the timetable? Do you have any comments about that?\n        SADIE: Mmm. Any time I've been in town in the evening – for dinner or at the cinema – I've noticed you have to wait a long time for a bus – there aren't that many.\n        MAN: OK, thanks. So now I'd like to ask you about your car use.\n        SADIE: Well, I have got a car but I don't use it that often. Mainly just to go to the supermarket. My husband uses it at the weekends to go to the golf club.\n        MAN: What about the city bikes you can rent? Do you ever use those?\n        SADIE: No – I'm not keen on cycling there because of all the pollution. But I would like to get a bike – it would be good to use it to get to work.\n        MAN: So why haven't you got one now?\n        SADIE: Well, I live in a flat – on the second floor and it doesn't have any storage – so we'd have to leave it in the hall outside the flat.\n      ",
      "questionGroups": [
        {
          "id": "c18-l1-qg1",
          "type": "form_completion",
          "title": "Questions 1 – 10",
          "instructions": "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.",
          "summaryTitle": "Transport survey",
          "wordLimitRule": "ONE WORD AND/OR A NUMBER",
          "clozeTemplate": "\nTransport survey\nName: Sadie Jones\nYear of birth: 1991\n\nPostcode: {{1}}\n\nTravelling by bus\nDate of bus journey: {{2}}\n\nReason for trip: shopping and visit to the {{3}}\n\nTravelled by bus because cost of {{4}} too high\n\nGot on bus at {{5}} Street\n\nComplaints about bus service:\n– bus today was {{6}}\n– frequency of buses in the {{7}}\n\nTravelling by car\nGoes to the {{8}} by car\n\nTravelling by bicycle\nDislikes travelling by bike in the city centre because of the {{9}}\n\nDoesn't own a bike because of a lack of {{10}}\n          ",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Postcode: [ 1 ]",
              "correctAnswer": "DW30 7YZ",
              "explanation": "Sadie Jones gives her postcode as DW30 7YZ.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "It's DW30 7YZ."
              }
            },
            {
              "questionNumber": 2,
              "prompt": "Date of bus journey: [ 2 ]",
              "correctAnswer": "24th April",
              "acceptedVariants": [
                "24 April",
                "April 24",
                "April 24th",
                "24"
              ],
              "explanation": "The interviewer confirms today is the 24th of April.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "It's the 24th of April, isn't it?"
              }
            },
            {
              "questionNumber": 3,
              "prompt": "Reason for trip: shopping and visit to the [ 3 ]",
              "correctAnswer": "dentist",
              "acceptedVariants": [
                "dentist's"
              ],
              "explanation": "Sadie explains: 'the main reason I came here was to go to the dentist.'",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "main reason I came here was to go to the dentist"
              }
            },
            {
              "questionNumber": 4,
              "prompt": "Travelled by bus because cost of [ 4 ] too high",
              "correctAnswer": "parking",
              "acceptedVariants": [
                "car parking"
              ],
              "explanation": "Sadie stopped driving because parking was difficult and cost so much.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "parking was so difficult to find and it costs so much"
              }
            },
            {
              "questionNumber": 5,
              "prompt": "Got on bus at [ 5 ] Street",
              "correctAnswer": "Claxby",
              "acceptedVariants": [
                "claxby"
              ],
              "explanation": "She boarded at Claxby Street (spelled C-L-A-X-B-Y).",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "At the bus stop on Claxby Street."
              }
            },
            {
              "questionNumber": 6,
              "prompt": "Complaints about bus service: bus today was [ 6 ]",
              "correctAnswer": "late",
              "acceptedVariants": [
                "delayed"
              ],
              "explanation": "Sadie noted that this morning the bus was late by about 10 minutes.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "this morning it was late"
              }
            },
            {
              "questionNumber": 7,
              "prompt": "frequency of buses in the [ 7 ]",
              "correctAnswer": "evening",
              "acceptedVariants": [
                "evenings",
                "night"
              ],
              "explanation": "She complains about the long wait for buses in the evening.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "town in the evening – for dinner or at the cinema – I've noticed you have to wait a long time"
              }
            },
            {
              "questionNumber": 8,
              "prompt": "Travelling by car: Goes to the [ 8 ] by car",
              "correctAnswer": "supermarket",
              "acceptedVariants": [
                "super market"
              ],
              "explanation": "She uses her car mainly just to go to the supermarket.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "Mainly just to go to the supermarket."
              }
            },
            {
              "questionNumber": 9,
              "prompt": "Travelling by bicycle: Dislikes travelling by bike in the city centre because of the [ 9 ]",
              "correctAnswer": "pollution",
              "acceptedVariants": [
                "air pollution"
              ],
              "explanation": "She dislikes cycling in the city centre because of the pollution.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "not keen on cycling there because of all the pollution"
              }
            },
            {
              "questionNumber": 10,
              "prompt": "Doesn't own a bike because of a lack of [ 10 ]",
              "correctAnswer": "storage",
              "acceptedVariants": [
                "space"
              ],
              "explanation": "She lives on the second floor and the flat doesn't have any storage.",
              "passageEvidence": {
                "paragraph": "Part 1",
                "quote": "doesn't have any storage"
              }
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Listening Part 2",
      "subtitle": "Becoming a volunteer for ACE",
      "audioUrl": "/audio/cam18-test1-part2.mp3",
      "transcript": "\n        Good evening, everyone. Let me start by welcoming you all to this talk and thanking you for taking the time to consider joining ACE voluntary organisation. ACE offers support to people and services in the local area and we're now looking for more volunteers to help us do this.\n        By the way, I hope you're all comfortable – we have brought in extra seats so that no one has to stand, but it does mean that the people at the back of the room may be a bit squashed. We'll only be here for about half an hour so, hopefully, that's OK.\n        One of the first questions we're often asked is how old you need to be to volunteer. Well, you can be as young as 16 or you can be 60 or over; it all depends on what type of voluntary work you want to do. Other considerations, such as reliability, are crucial in voluntary work and age isn't related to these, in our experience.\n        Another question we get asked relates to training. Well, there's plenty of that and it's all face-to-face. What's more, training doesn't end when you start working for us – it takes place before, during and after periods of work.\n        Now, I would ask you to consider a couple of important issues before you decide to apply for voluntary work. It is critical that you have enough hours in the day for whatever role we agree is suitable for you - if being a volunteer becomes stressful then it's best not to do it at all. You may think that your income is important, but we don't ask about that. What we value is dedication. Some of our most loyal volunteers earn very little themselves but still give their full energy to the work they do with us.\n        OK, so let's take a look at some of the work areas that we need volunteers for.\n        You may wish simply to help us raise money. If you have the creativity to come up with an imaginative or novel way of fundraising, we'd be delighted.\n        One outdoor activity that we need volunteers for is litter collection and for this it's useful if you can walk for long periods, sometimes uphill. Some of our regular collectors are quite elderly, but very active and keen to protect the environment.\n        If you enjoy working with children, we have three vacancies for what are called 'playmates'. These volunteers help children learn about staying healthy. It's good if you know something about nutrition and can give clear instructions.\n        If that doesn't appeal to you, maybe you would be interested in helping out at our story club for disabled children, especially if you have done some acting. We put on three performances a year based on books they have read and we're always looking for support with the theatrical side of this.\n        The last area I'll mention today is first aid. Volunteers who join this group will initially have the priority to take in a lot of information and not forget any important steps or details.\n      ",
      "questionGroups": [
        {
          "id": "c18-l1-qg2",
          "type": "multiple_choice",
          "title": "Questions 11 – 13",
          "instructions": "Choose the correct letter, A, B or C.",
          "questions": [
            {
              "questionNumber": 11,
              "prompt": "Why does the speaker apologise about the seats?",
              "options": [
                "A. They are too small.",
                "B. There are not enough of them.",
                "C. Some of them are very close together."
              ],
              "correctAnswer": "C",
              "explanation": "The speaker mentions that extra seats were brought in, so people at the back 'may be a bit squashed' (very close together).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "people at the back of the room may be a bit squashed"
              }
            },
            {
              "questionNumber": 12,
              "prompt": "What does the speaker say about the age of volunteers?",
              "options": [
                "A. The age of volunteers is less important than other factors.",
                "B. Young volunteers are less reliable than older ones.",
                "C. Most volunteers are about 60 years old."
              ],
              "correctAnswer": "A",
              "explanation": "The speaker states: 'Other considerations, such as reliability, are crucial in voluntary work and age isn't related to these.'",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "reliability, are crucial in voluntary work and age isn't related to these"
              }
            },
            {
              "questionNumber": 13,
              "prompt": "What does the speaker say about training?",
              "options": [
                "A. It is continuous.",
                "B. It is conducted by a manager.",
                "C. It takes place online."
              ],
              "correctAnswer": "A",
              "explanation": "Training 'takes place before, during and after periods of work', which means it is continuous.",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "takes place before, during and after periods of work"
              }
            }
          ]
        },
        {
          "id": "c18-l1-qg2-multi",
          "type": "multiple_choice",
          "title": "Questions 14 – 15",
          "instructions": "Choose TWO letters, A–E. Which TWO issues does the speaker ask the audience to consider before they apply to be volunteers?",
          "questions": [
            {
              "questionNumber": 14,
              "prompt": "Which TWO issues does the speaker ask the audience to consider before they apply? (First issue)",
              "options": [
                "A. their financial situation",
                "B. their level of commitment",
                "C. their work experience",
                "D. their ambition",
                "E. their availability"
              ],
              "correctAnswer": "B",
              "acceptedVariants": [
                "E"
              ],
              "explanation": "The speaker emphasizes dedication/commitment ('What we value is dedication') and having enough hours in the day (availability).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "What we value is dedication"
              }
            },
            {
              "questionNumber": 15,
              "prompt": "Which TWO issues does the speaker ask the audience to consider before they apply? (Second issue)",
              "options": [
                "A. their financial situation",
                "B. their level of commitment",
                "C. their work experience",
                "D. their ambition",
                "E. their availability"
              ],
              "correctAnswer": "E",
              "acceptedVariants": [
                "B"
              ],
              "explanation": "The speaker states: 'it is critical that you have enough hours in the day for whatever role we agree is suitable for you' (availability).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "critical that you have enough hours in the day"
              }
            }
          ]
        },
        {
          "id": "c18-l1-qg3",
          "type": "multiple_choice",
          "title": "Questions 16 – 20",
          "instructions": "What does the speaker suggest would be helpful for each of the following areas of voluntary work? Choose FIVE answers from the box (A–G) for Questions 16–20.",
          "questions": [
            {
              "questionNumber": 16,
              "prompt": "Fundraising",
              "options": [
                "A. experience on stage",
                "B. original, new ideas",
                "C. parenting skills",
                "D. an understanding of food and diet",
                "E. retail experience",
                "F. a good memory",
                "G. a good level of fitness"
              ],
              "correctAnswer": "B",
              "explanation": "The speaker notes: 'If you have the creativity to come up with an imaginative or novel way of fundraising, we'd be delighted' (original, new ideas).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "imaginative or novel way of fundraising"
              }
            },
            {
              "questionNumber": 17,
              "prompt": "Litter collection",
              "options": [
                "A. experience on stage",
                "B. original, new ideas",
                "C. parenting skills",
                "D. an understanding of food and diet",
                "E. retail experience",
                "F. a good memory",
                "G. a good level of fitness"
              ],
              "correctAnswer": "G",
              "explanation": "Walking for long periods, sometimes uphill requires 'a good level of fitness'.",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "walk for long periods, sometimes uphill"
              }
            },
            {
              "questionNumber": 18,
              "prompt": "‘Playmates’",
              "options": [
                "A. experience on stage",
                "B. original, new ideas",
                "C. parenting skills",
                "D. an understanding of food and diet",
                "E. retail experience",
                "F. a good memory",
                "G. a good level of fitness"
              ],
              "correctAnswer": "D",
              "explanation": "The speaker says: 'it's good if you know something about nutrition' (food and diet).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "know something about nutrition"
              }
            },
            {
              "questionNumber": 19,
              "prompt": "Story club",
              "options": [
                "A. experience on stage",
                "B. original, new ideas",
                "C. parenting skills",
                "D. an understanding of food and diet",
                "E. retail experience",
                "F. a good memory",
                "G. a good level of fitness"
              ],
              "correctAnswer": "A",
              "explanation": "The speaker mentions: 'especially if you have done some acting' (experience on stage).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "especially if you have done some acting"
              }
            },
            {
              "questionNumber": 20,
              "prompt": "First aid",
              "options": [
                "A. experience on stage",
                "B. original, new ideas",
                "C. parenting skills",
                "D. an understanding of food and diet",
                "E. retail experience",
                "F. a good memory",
                "G. a good level of fitness"
              ],
              "correctAnswer": "F",
              "explanation": "Volunteers need to 'take in a lot of information and not forget any important steps or details' (a good memory).",
              "passageEvidence": {
                "paragraph": "Part 2",
                "quote": "not forget any important steps or details"
              }
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Listening Part 3",
      "subtitle": "Talk on jobs in fashion design (Chantal & Hugo)",
      "audioUrl": "/audio/cam18-test1-part3.mp3",
      "transcript": "\n        HUGO: Hi Chantal. What did you think of the talk, then?\n        CHANTAL: Hi Hugo. I thought it was good once I'd moved seats. I went early so that I'd get a seat and not have to stand, but then this guy sat right in front of me and he was so tall!\n        HUGO: It's hard to see through people's heads, isn't it?\n        CHANTAL: Impossible! Anyway, I thought it was really interesting, especially what the speaker said about the job market.\n        HUGO: Me too. We know we're going into a really competitive field, but there's a whole range of areas of work that we hadn't even thought of – like fashion journalism.\n        CHANTAL: Yeah – I wasn't expecting so many career options.\n        HUGO: Overall, she had quite a strong message, didn't she?\n        CHANTAL: She did. She kept saying 'I know you all think this, but ...' and then tell us how it really is. It was a bit harsh, though! We know it's a tough industry.\n        HUGO: Yeah – and we're only first years. Do you think our secondary-school education should have been more career-focused?\n        CHANTAL: We were told about lots of different careers, but not by the experts who really know stuff.\n        HUGO: Did today's talk influence your thoughts on what career you'd like to take up?\n        CHANTAL: I promised myself that I'd go through this course and keep an open mind till the end.\n        HUGO: But I think it's better to pick an area of the industry now and aim to get better at it.\n        CHANTAL: Well, we'll just have to differ on that issue!\n        HUGO: One thing's for certain: we'll be unpaid assistants for quite a long time. I'm prepared for that, aren't you?\n        CHANTAL: Actually, I'm not going to accept that view. That doesn't mean it has to be true for me.\n        CHANTAL: I thought the speaker's account of her first job was fascinating. He was so mean, telling her she was more interested in her own appearance than his!\n        CHANTAL: But she did realise he was right about that. And she should have hidden her negative feelings about him, but she didn't.\n        HUGO: It would be useful to know if there's a gap in the market – an item that no one's stocking but that consumers are looking for.\n        CHANTAL: Yeah. And people also take things back to the store if they aren't right.\n        HUGO: Imagine you found out garments were returned because they fell apart in the wash!\n        CHANTAL: Yeah, it would be good to know that kind of thing.\n      ",
      "questionGroups": [
        {
          "id": "c18-l1-qg4",
          "type": "multiple_choice",
          "title": "Questions 21 – 26",
          "instructions": "Choose the correct letter, A, B or C.",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "What problem did Chantal have at the start of the talk?",
              "options": [
                "A. Her view of the speaker was blocked.",
                "B. She was unable to find an empty seat.",
                "C. The students next to her were talking."
              ],
              "correctAnswer": "A",
              "explanation": "A tall guy sat right in front of her, blocking her line of sight.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "this guy sat right in front of me and he was so tall"
              }
            },
            {
              "questionNumber": 22,
              "prompt": "What were Hugo and Chantal surprised to hear about the job market?",
              "options": [
                "A. It has become more competitive than it used to be.",
                "B. There is more variety in it than they had realised.",
                "C. Some areas of it are more exciting than others."
              ],
              "correctAnswer": "B",
              "explanation": "They were surprised by the wide range of career options and unexpected areas of work.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "I wasn't expecting so many career options."
              }
            },
            {
              "questionNumber": 23,
              "prompt": "Hugo and Chantal agree that the speaker’s message was",
              "options": [
                "A. unfair to them at times.",
                "B. hard for them to follow.",
                "C. critical of the industry."
              ],
              "correctAnswer": "A",
              "explanation": "Chantal thought it was 'a bit harsh' given they are only first-year students.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "It was a bit harsh, though!"
              }
            },
            {
              "questionNumber": 24,
              "prompt": "What do Hugo and Chantal criticise about their school careers advice?",
              "options": [
                "A. when they received the advice",
                "B. how much advice was given",
                "C. who gave the advice"
              ],
              "correctAnswer": "C",
              "explanation": "They note talks were not delivered by industry experts who really know stuff.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "not by the experts who really know stuff"
              }
            },
            {
              "questionNumber": 25,
              "prompt": "When discussing their future, Hugo and Chantal disagree on",
              "options": [
                "A. which is the best career in fashion.",
                "B. when to choose a career in fashion.",
                "C. why they would like a career in fashion."
              ],
              "correctAnswer": "B",
              "explanation": "Chantal wants to keep an open mind until graduation, whereas Hugo wants to pick an area now.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "we'll just have to differ on that issue!"
              }
            },
            {
              "questionNumber": 26,
              "prompt": "How does Hugo feel about being an unpaid assistant?",
              "options": [
                "A. He is realistic about the practice.",
                "B. He feels the practice is dishonest.",
                "C. He thinks others want to change the practice."
              ],
              "correctAnswer": "A",
              "explanation": "Hugo is prepared for it and accepts it as unavoidable industry reality.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "I'm prepared for that, aren't you?"
              }
            }
          ]
        },
        {
          "id": "c18-l1-qg5",
          "type": "multiple_choice",
          "title": "Questions 27 – 28",
          "instructions": "Choose TWO letters, A–E. Which TWO mistakes did the speaker admit she made in her first job?",
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "Which TWO mistakes did the speaker admit she made in her first job? (First error)",
              "options": [
                "A. being dishonest to her employer",
                "B. paying too much attention to how she looked",
                "C. expecting to become well known",
                "D. trying to earn a lot of money",
                "E. openly disliking her client"
              ],
              "correctAnswer": "B",
              "acceptedVariants": [
                "E"
              ],
              "explanation": "The speaker admitted she focused on her own clothes instead of her client's.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "more interested in her own appearance than his"
              }
            },
            {
              "questionNumber": 28,
              "prompt": "Which TWO mistakes did the speaker admit she made in her first job? (Second error)",
              "options": [
                "A. being dishonest to her employer",
                "B. paying too much attention to how she looked",
                "C. expecting to become well known",
                "D. trying to earn a lot of money",
                "E. openly disliking her client"
              ],
              "correctAnswer": "E",
              "acceptedVariants": [
                "B"
              ],
              "explanation": "She failed to conceal her negative feelings towards her client.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "she should have hidden her negative feelings about him, but she didn't."
              }
            }
          ]
        },
        {
          "id": "c18-l1-qg6",
          "type": "multiple_choice",
          "title": "Questions 29 – 30",
          "instructions": "Choose TWO letters, A–E. Which TWO pieces of retail information do Hugo and Chantal agree would be useful?",
          "questions": [
            {
              "questionNumber": 29,
              "prompt": "Which TWO pieces of retail information do Hugo and Chantal agree would be useful? (First selection)",
              "options": [
                "A. the reasons people return fashion items",
                "B. how much time people have to shop for clothes",
                "C. fashion designs people want but can’t find",
                "D. the best time of year for fashion buying",
                "E. the most popular fashion sizes"
              ],
              "correctAnswer": "A",
              "acceptedVariants": [
                "C"
              ],
              "explanation": "They agree it is useful to know why items are returned (e.g. falling apart in the wash).",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "good to know that kind of thing"
              }
            },
            {
              "questionNumber": 30,
              "prompt": "Which TWO pieces of retail information do Hugo and Chantal agree would be useful? (Second selection)",
              "options": [
                "A. the reasons people return fashion items",
                "B. how much time people have to shop for clothes",
                "C. fashion designs people want but can’t find",
                "D. the best time of year for fashion buying",
                "E. the most popular fashion sizes"
              ],
              "correctAnswer": "C",
              "acceptedVariants": [
                "A"
              ],
              "explanation": "They agree finding a gap in the market (what customers search for but cannot find) is valuable.",
              "passageEvidence": {
                "paragraph": "Part 3",
                "quote": "item that no one is stocking but that consumers are looking for"
              }
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 4,
      "title": "Listening Part 4",
      "subtitle": "Elephant translocation in Malawi",
      "audioUrl": "/audio/cam18-test1-part4.mp3",
      "transcript": "\n        For my presentation today I want to tell you about how groups of elephants have been moved and settled in new reserves. This is known as translocation and has been carried out in Malawi in Africa in recent years. The reason this is being done is because of overpopulation of elephants in some areas.\n        In Malawi's Majete National Park the elephant population had been wiped out by poachers, who killed the elephants for their ivory. But in 2003, the park was restocked and effective law enforcement was introduced. Since then, not a single elephant has been poached. In this safe environment, the elephant population boomed.\n        This led to a number of problems. Firstly, there was more competition for food, which meant that some elephants were suffering from hunger. Elephants were routinely knocking down fences around the park, which then had to be repaired at a significant cost.\n        To solve this problem, the decision was made to move dozens of elephants from Majete National Park to Nkhotakota Wildlife Park.\n        Elephants were moved in groups of between eight and twenty, all belonging to one family. A team of vets and park rangers flew over the park in helicopters and targeted a group, which were rounded up and directed to a designated open plain.\n        The vets then used darts to immobilise the elephants. This had to be done as quickly as possible so as to minimise the stress caused.\n        To avoid the risk of suffocation, all the elephants had to be placed on their sides. It was very important to keep an eye on their breathing – if there were fewer than six breaths per minute, the elephant would need urgent medical attention. Measurements were taken of each elephant's tusks and also of their feet. The elephants were then taken to a recovery area before being loaded onto trucks.\n        The project has generally been accepted to have been a huge success. Employment prospects have improved enormously, contributing to rising living standards for the whole community. Poaching is no longer an issue, as former poachers volunteered to give up their weapons.\n        All this has been a big draw for tourism, which contributes five times more than the illegal wildlife trade to GDP.\n      ",
      "questionGroups": [
        {
          "id": "c18-l1-qg7",
          "type": "sentence_completion",
          "title": "Questions 31 – 40",
          "instructions": "Complete the notes below. Write ONE WORD ONLY for each answer.",
          "summaryTitle": "Elephant translocation",
          "wordLimitRule": "ONE WORD ONLY",
          "clozeTemplate": "\nElephant translocation\n\nProblems caused by elephant overpopulation:\n– damage to {{31}} in the park\n– more competition for food\n\nThe translocation process:\n– a suitable group of elephants from the same {{32}} was selected\n– vets and park staff made use of {{33}} to help guide the elephants into an open plain\n– this process had to be completed quickly to reduce {{34}}\n– elephants had to be turned on their {{35}} to avoid damage to their lungs\n– elephants’ {{36}} had to be monitored constantly\n– data including the size of their tusks and {{37}} was taken\n\nAdvantages of translocation at Nkhotakota Wildlife Park:\n– {{38}} opportunities for local people\n– a reduction in the number of poachers and {{39}}\n– an increase in {{40}} as a contributor to GDP\n          ",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "Problems caused by elephant overpopulation: damage to [ 31 ] in the park",
              "correctAnswer": "fences",
              "acceptedVariants": [
                "fence"
              ],
              "explanation": "Elephants were routinely knocking down fences around the park.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "knocking down fences around the park"
              }
            },
            {
              "questionNumber": 32,
              "prompt": "The translocation process: a suitable group of elephants from the same [ 32 ] was selected",
              "correctAnswer": "family",
              "acceptedVariants": [
                "families"
              ],
              "explanation": "Elephants were moved in groups belonging to one family.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "all belonging to one family"
              }
            },
            {
              "questionNumber": 33,
              "prompt": "vets and park staff made use of [ 33 ] to help guide the elephants into an open plain",
              "correctAnswer": "helicopters",
              "acceptedVariants": [
                "helicopter"
              ],
              "explanation": "Rangers and vets flew in helicopters to direct the elephants.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "flew over the park in helicopters"
              }
            },
            {
              "questionNumber": 34,
              "prompt": "this process had to be completed quickly to reduce [ 34 ]",
              "correctAnswer": "stress",
              "explanation": "Darts were administered swiftly to minimize stress.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "minimise the stress caused"
              }
            },
            {
              "questionNumber": 35,
              "prompt": "elephants had to be turned on their [ 35 ] to avoid damage to their lungs",
              "correctAnswer": "sides",
              "acceptedVariants": [
                "side"
              ],
              "explanation": "Elephants were laid on their sides to prevent their chests and lungs being crushed.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "placed on their sides"
              }
            },
            {
              "questionNumber": 36,
              "prompt": "elephants’ [ 36 ] had to be monitored constantly",
              "correctAnswer": "breathing",
              "acceptedVariants": [
                "breath"
              ],
              "explanation": "Vets kept a constant watch over their breathing rate.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "keep an eye on their breathing"
              }
            },
            {
              "questionNumber": 37,
              "prompt": "data including the size of their tusks and [ 37 ] was taken",
              "correctAnswer": "feet",
              "acceptedVariants": [
                "foot"
              ],
              "explanation": "Measurements were recorded of tusks and feet.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "and also of their feet"
              }
            },
            {
              "questionNumber": 38,
              "prompt": "Advantages of translocation at Nkhotakota Wildlife Park: [ 38 ] opportunities",
              "correctAnswer": "employment",
              "acceptedVariants": [
                "job"
              ],
              "explanation": "Employment prospects improved for the local populace.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "Employment prospects have improved enormously"
              }
            },
            {
              "questionNumber": 39,
              "prompt": "a reduction in the number of poachers and [ 39 ]",
              "correctAnswer": "weapons",
              "acceptedVariants": [
                "arms"
              ],
              "explanation": "Former poachers surrendered their weapons.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "volunteered to give up their weapons"
              }
            },
            {
              "questionNumber": 40,
              "prompt": "an increase in [ 40 ] as a contributor to GDP",
              "correctAnswer": "tourism",
              "acceptedVariants": [
                "tourists"
              ],
              "explanation": "Tourism surged and contributes heavily to GDP.",
              "passageEvidence": {
                "paragraph": "Part 4",
                "quote": "big draw for tourism"
              }
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test2Reading: IELTSMockTest = {
  "id": "cambridge-18-test-2-reading",
  "book": 18,
  "testNumber": 2,
  "module": "reading",
  "title": "Cambridge 18 Academic Reading Test 2",
  "durationMinutes": 60,
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Reading Passage 1",
      "subtitle": "Stonehenge",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">Stonehenge</h2>\n      <p>For centuries, historians and archaeologists have puzzled over the many mysteries of Stonehenge, a prehistoric monument that took an estimated 1,500 years to erect. Located on Salisbury Plain in southern England, it is comprised of roughly 100 massive upright stones placed in a circular layout.</p>\n<p>Archaeologists believe England’s most iconic prehistoric ruin was built in several stages with the earliest constructed 5,000 or more years ago. First, Neolithic* Britons used primitive tools, which may have been fashioned out of deer antlers, to dig a massive circular ditch and bank, or henge. Deep pits dating back to that era and located within the circle may have once held a ring of timber posts, according to some scholars.</p>\n<p>Several hundred years later, it is thought, Stonehenge’s builders hoisted an estimated 80 bluestones, 43 of which remain today, into standing positions and placed them in either a horseshoe or circular formation. These stones have been traced all the way to the Preseli Hills in Wales, some 300 kilometres from Stonehenge. How, then, did prehistoric builders without sophisticated tools or engineering haul these boulders, which weigh up to four tons, over such a great distance?</p>\n<p>According to one long-standing theory among archaeologists, Stonehenge’s builders fashioned sledges and rollers out of tree trunks to lug the bluestones from the Preseli Hills. They then transferred the boulders onto rafts and floated them first along the Welsh coast and then up the River Avon toward Salisbury Plain; alternatively, they may have towed each stone with a fleet of vessels. More recent archaeological hypotheses have them transporting the bluestones with supersized wicker baskets on a combination of ball bearings and long grooved planks, hauled by oxen.</p>\n<p>As early as the 1970s, geologists have been adding their voices to the debate over how Stonehenge came into being. Challenging the classic image of industrious builders pushing, carting, rolling or hauling giant stones from faraway Wales, some scientists have suggested that it was glaciers, not humans, that carried the bluestones to Salisbury Plain. Most archaeologists have remained sceptical about this theory, however, wondering how the forces of nature could possibly have delivered the exact number of stones needed to complete the circle.</p>\n<p>The third phase of construction took place around 2000 BCE. At this point, sandstone slabs – known as ‘sarsens’ – were arranged into an outer crescent or ring; some were assembled into the iconic three-pieced structures called trilithons that stand tall in the centre of Stonehenge. Some 50 of these stones are now visible on the site, which may once have contained many more. Radiocarbon dating has revealed that work continued at Stonehenge until roughly 1600 BCE, with the bluestones in particular being repositioned multiple times.</p>\n<p>But who were the builders of Stonehenge? In the 17th century, archaeologist John Aubrey made the claim that Stonehenge was the work of druids, who had important religious, judicial and political roles in Celtic** society. This theory was widely popularized by the antiquarian William Stukeley, who had unearthed primitive graves at the site. Even today, people who identify as modern druids continue to gather at Stonehenge for the summer solstice. However, in the mid-20th century, radiocarbon dating demonstrated that Stonehenge stood more than 1,000 years before the Celts inhabited the region.</p>\n<p>Many modern historians and archaeologists now agree that several distinct tribes of people contributed to Stonehenge, each undertaking a different phase of its construction. Bones, tools and other artefacts found on the site seem to support this hypothesis. The first stage was achieved by Neolithic agrarians who were likely to have been indigenous to the British Isles. Later, it is believed, groups with advanced tools and a more communal way of life left their mark on the site. Some believe that they were immigrants from the European continent, while others maintain that they were probably native Britons, descended from the original builders.</p>\n<p>If the facts surrounding the architects and construction of Stonehenge remain shadowy at best, the purpose of the striking monument is even more of a mystery. While there is consensus among the majority of modern scholars that Stonehenge once served the function of burial ground, they have yet to determine what other purposes it had.</p>\n<p>In the 1960s, the astronomer Gerald Hawkins suggested that the cluster of megalithic stones operated as a form of calendar, with different points corresponding to astrological phenomena such as solstices, equinoxes and eclipses occurring at different times of the year. While his theory has received a considerable amount of attention over the decades, critics maintain that Stonehenge’s builders probably lacked the knowledge necessary to predict such events or that England’s dense cloud cover would have obscured their view of the skies.</p>\n<p>More recently, signs of illness and injury in the human remains unearthed at Stonehenge led a group of British archaeologists to speculate that it was considered a place of healing, perhaps because bluestones were thought to have curative powers.</p>\n<p>-----</p>\n<p>* Neolithic – The era, also known as the New Stone Age, which began around 12,000 years ago and ended around 3500 BCE</p>\n<p>** Celtic – The Celts were people who lived in Britain and northwest Europe during the Iron Age from 600 BCE to 43 CE</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec1-g1-1-8",
          "type": "form_completion",
          "title": "Questions 1-8",
          "instructions": "Complete the notes below. Choose NO MORE THAN TWO WORDS from the passage for each answer. Write your answers in boxes 1-8 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Stage 1: the ditch and henge were dug, possibly using tools made from [ 1 ]",
              "correctAnswer": "(deer) antlers",
              "explanation": "Official Cambridge answer: (deer) antlers"
            },
            {
              "questionNumber": 2,
              "prompt": "Stage 1: [ 2 ] may have been arranged in deep pits inside the circle",
              "correctAnswer": "(timber) posts",
              "explanation": "Official Cambridge answer: (timber) posts"
            },
            {
              "questionNumber": 3,
              "prompt": "archaeological: builders used [ 3 ] to make sledges and rollers",
              "correctAnswer": "tree trunks",
              "explanation": "Official Cambridge answer: tree trunks"
            },
            {
              "questionNumber": 4,
              "prompt": "archaeological: [ 4 ] pulled them on giant baskets",
              "correctAnswer": "oxen",
              "explanation": "Official Cambridge answer: oxen"
            },
            {
              "questionNumber": 5,
              "prompt": "geological: they were brought from Wales by [ 5 ]",
              "correctAnswer": "glaciers",
              "explanation": "Official Cambridge answer: glaciers"
            },
            {
              "questionNumber": 6,
              "prompt": "Builders: a theory arose in the 17th century that its builders were Celtic [ 6 ]",
              "correctAnswer": "druids",
              "explanation": "Official Cambridge answer: druids"
            },
            {
              "questionNumber": 7,
              "prompt": "Purpose: many experts agree it has been used as a [ 7 ] site",
              "correctAnswer": "burial",
              "explanation": "Official Cambridge answer: burial"
            },
            {
              "questionNumber": 8,
              "prompt": "Purpose: in the 1960s, it was suggested that it worked as a kind of [ 8 ]",
              "correctAnswer": "calendar",
              "explanation": "Official Cambridge answer: calendar"
            }
          ]
        },
        {
          "id": "r-sec1-g2-9-13",
          "type": "true_false_not_given",
          "title": "Questions 9-13",
          "instructions": "Do the following statements agree with the information given in Reading Passage 1? In boxes 9-13 on your answer sheet, write TRUE               if the statement agrees with the information",
          "questions": [
            {
              "questionNumber": 9,
              "prompt": "During the third phase of construction, sandstone slabs were placed in both the outer areas and the middle of the Stonehenge site.",
              "correctAnswer": "TRUE",
              "explanation": "Official Cambridge answer: TRUE"
            },
            {
              "questionNumber": 10,
              "prompt": "There is scientific proof that the bluestones stood in the same spot until approximately 1600 BCE.",
              "correctAnswer": "FALSE",
              "explanation": "Official Cambridge answer: FALSE"
            },
            {
              "questionNumber": 11,
              "prompt": "John Aubrey’s claim about Stonehenge was supported by 20th-century findings.",
              "correctAnswer": "FALSE",
              "explanation": "Official Cambridge answer: FALSE"
            },
            {
              "questionNumber": 12,
              "prompt": "Objects discovered at Stonehenge seem to indicate that it was constructed by a number of different groups of people.",
              "correctAnswer": "TRUE",
              "explanation": "Official Cambridge answer: TRUE"
            },
            {
              "questionNumber": 13,
              "prompt": "Criticism of Gerald Hawkins’ theory about Stonehenge has come mainly from other astronomers.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Reading Passage 2",
      "subtitle": "Living with artificial intelligence",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">Living with artificial intelligence</h2>\n      <p>Powerful artificial intelligence (AI) needs to be reliably aligned with human values, butdoes this mean AI will eventually have topolice those values?</p>\n<p>This has been the decade of AI, with one astonishing feat after another. A chess-playing AI that can defeat not only all human chess players, but also all previous human-programmed chess machines, after learning the game in just four hours? That’s yesterday’s news, what’s next? True, these prodigious accomplishments are all in so-called narrow AI, where machines perform highly specialised tasks. But many experts believe this restriction is very temporary. By mid-century, we may have artificial general intelligence (AGI) - machines that can achieve human-level performance on the full range of tasks that we ourselves can tackle.</p>\n<p>If so, there’s little reason to think it will stop there. Machines will be free of many of the physical constraints on human intelligence. Our brains run at slow biochemical processing speeds on the power of a light bulb, and their size is restricted by the dimensions of the human birth canal. It is remarkable what they accomplish, given these handicaps. But they may be as far from the physical limits of thought as our eyes are from the incredibly powerful Webb Space Telescope.</p>\n<p>Once machines are better than us at designing even smarter machines, progress towards these limits could accelerate. What would this mean for us? Could we ensure a safe and worthwhile coexistence with such machines? On the plus side, AI is already useful and profitable for many things, and super AI might be expected to be super useful and super profitable. But the more powerful AI becomes, the more important it will be to specify its goals with great care. Folklore is full of tales of people who ask for the wrong thing, with disastrous consequences- King Midas, for example, might have wished that everything he touched turned to gold, but didn’t really intend this to apply to his breakfast.</p>\n<p>So we need to create powerful AI machines that are ‘human-friendly’- that have goals reliably aligned with our own values. One thing that makes this task difficult is that we are far from reliably human-friendly ourselves. We do many terrible things to each other and to many other creatures with whom we share the planet. If superintendent machines don’t do a lot better than us, we’ll be in deep trouble. We’ll have powerful new intelligence amplifying the dark sides of our own fallible natures.</p>\n<p>For safety’s sake, then, we want the machines to be ethically as well as cognitively superhuman. We want them to aim for the moral high ground, not for the troughs in which many of us spend some of our time. Luckily they’ll be smart enough for the job. If there are routes to the moral high ground, they’ll be better than us at finding them, and steering us in the right direction.</p>\n<p>However, there are two big problems with this utopian vision. One is how we get the machines started on the journey, the other is what it would mean to reach this destination. The ‘getting started’ problem is that we need to tell the machines what they’re looking for with sufficient clarity that we can be confident they will find it – whatever ‘it’ actually turns out to be. This won’t be easy, given that we are tribal creatures and conflicted about the ideals ourselves. We often ignore the suffering of strangers, and even contribute to it, at least indirectly. How then, do we point machines in the direction of something better?</p>\n<p>As for the ‘destination’ problem, we might, by putting ourselves in the hands of these moral guides and gatekeepers, be sacrificing our own autonomy – an important part of what makes us human. Machines who are better than us at sticking to the moral high ground may be expected to discourage some of the lapses we presently take for granted. We might lose our freedom to discriminate in favour of our own communities, for example.</p>\n<p>Loss of freedom to behave badly isn’t always a bad thing, of course: denying ourselves the freedom to put children to work in factories, or to smoke in restaurants are signs of progress. But are we ready for ethical silicon police limiting our options? They might be so good at doing it that we won’t notice them; but few of us are likely to welcome such a future.</p>\n<p>These issues might seem far-fetched, but they are to some extent already here. AI already has some input into how resources are used in our National Health Service (NHS) here in the UK, for example. If it was given a greater role, it might do so much more efficiently than humans can manage, and act in the interests of taxpayers and those who use the health system. However, we’d be depriving some humans (e.g. senior doctors) of the control they presently enjoy. Since we’d want to ensure that people are treated equally and that policies are fair, the goals of AI would need to be specified correctly.</p>\n<p>We have a new powerful technology to deal with- itself, literally, a new way of thinking. For our own safety, we need to point these new thinkers in the right direction, and get them to act well for us. It is not yet clear whether this is possible, but if it is, it will require a cooperative spirit, and a willingness to set aside self-interest.</p>\n<p>Both general intelligence and moral reasoning are often thought to be uniquely human capacities. But safety seems to require that we think of them as a package: if we are to give general intelligence to machines, we’ll need to give them moral authority, too. And where exactly would that leave human beings? All the more reason to think about the destination now, and to be careful about what we wish for.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec2-g1-14-19",
          "type": "multiple_choice",
          "title": "Questions 14-19",
          "instructions": "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 14-19 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 14,
              "prompt": "What point does the writer make about AI in the first paragraph?",
              "options": [
                "A   It is difficult to predict how quickly AI will progress.",
                "B   Much can be learned about the use of AI in chess machines.",
                "C   The future is unlikely to see limitations on the capabilities of AI.",
                "D   Experts disagree on which specialised tasks AI will be able to perform."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 15,
              "prompt": "What is the writer doing in the second paragraph?",
              "options": [
                "A   explaining why machines will be able to outperform humans",
                "B   describing the characteristics that humans and machines share",
                "C   giving information about the development of machine intelligence",
                "D   indicating which aspects of humans are the most advanced"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 16,
              "prompt": "Why does the writer mention the story of King Midas?",
              "options": [
                "A   to compare different visions of progress",
                "B   to illustrate that poorly defined objectives can go wrong",
                "C   to emphasise the need for cooperation",
                "D   to point out the financial advantages of a course of action"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 17,
              "prompt": "What challenge does the writer refer to in the fourth paragraph?",
              "options": [
                "A   encouraging humans to behave in a more principled way",
                "B   deciding which values we want AI to share with us",
                "C   creating a better world for all creatures on the planet",
                "D   ensuring AI is more human-friendly than we are ourselves"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 18,
              "prompt": "What does the writer suggest about the future of AI in the fifth paragraph?",
              "options": [
                "A   The safety of machines will become a key issue.",
                "B   It is hard to know what impact machines will have on the world.",
                "C   Machines will be superior to humans in certain respects.",
                "D   Many humans will oppose machines having a wider role."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 19,
              "prompt": "Which of the following best summarises the writer’s argument in the sixth paragraph?",
              "options": [
                "A   More intelligent machines will result in greater abuses of power.",
                "B   Machine learning will share very few features with human learning.",
                "C   There are a limited number of people with the knowledge to program machines.",
                "D   Human shortcomings will make creating the machines we need more difficult."
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "r-sec2-g2-20-23",
          "type": "yes_no_not_given",
          "title": "Questions 20-23",
          "instructions": "Do the following statements agree with the claims of the writer in Reading Passage 2? In boxes 20-23 on your answer sheet, write YES               if the statement agrees with the claims of the writer",
          "questions": [
            {
              "questionNumber": 20,
              "prompt": "Machines with the ability to make moral decisions may prevent us from promoting the interests of our communities.",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            },
            {
              "questionNumber": 21,
              "prompt": "Silicon police would need to exist in large numbers in order to be effective.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 22,
              "prompt": "Many people are comfortable with the prospect of their independence being restricted by machines.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            },
            {
              "questionNumber": 23,
              "prompt": "If we want to ensure that machines act in our best interests, we all need to work together.",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            }
          ]
        },
        {
          "id": "r-sec2-g3-24-26",
          "type": "summary_completion",
          "title": "Questions 24-26",
          "instructions": "Complete the summary using the list of phrases, A-F, below. Write the correct letter, A-F, in boxes 24-26 on your answer sheet. Using AI in the UK health system",
          "questions": [
            {
              "questionNumber": 24,
              "prompt": "Using AI in the UK health system: AI currently has a limited role in the way [ 24 ] are allocated in the health service.",
              "options": [
                "A. medical practitioners",
                "B. specialised tasks",
                "C. available resources",
                "D. reduced illness",
                "E. professional authority",
                "F. technology experts"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 25,
              "prompt": "Using AI in the UK health system: However, such a change would result, for example, in certain [ 25 ] not having their current level of 26………………….",
              "options": [
                "A. medical practitioners",
                "B. specialised tasks",
                "C. available resources",
                "D. reduced illness",
                "E. professional authority",
                "F. technology experts"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 26,
              "prompt": "Using AI in the UK health system: not having their current level of [ 26 ] .",
              "options": [
                "A. medical practitioners",
                "B. specialised tasks",
                "C. available resources",
                "D. reduced illness",
                "E. professional authority",
                "F. technology experts"
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Reading Passage 3",
      "subtitle": "Leonardo da Vinci's ideal city was centuries ahead of its time",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">Leonardo da Vinci's ideal city was centuries ahead of its time</h2>\n      <p>The word ‘genius’ is universally associated with the name of Leonardo da Vinci. A true Renaissance man, he embodied scientific spirit, artistic talent and humanist sensibilities. Five hundred years have passed since Leonardo died in his home at Chateau du Clos Luce, outside Tours, France. Yet far from fading into insignificance, his thinking has carried down the centuries and still surprises today.</p>\n<p>The Renaissance marked the transition from the 15th century to modernity and took place after the spread of the plague in the 14th century, which caused a global crisis resulting in some 200 million deaths across Europe and Asia. Today, the world is on the cusp of a climate crisis, which is predicted to cause widespread displacement, extinctions and death, if left unaddressed. Then, as now, radical solutions were called for to revolutionise the way people lived and safeguard humanity against catastrophe.</p>\n<p>Around 1486 – after a pestilence that killed half the population in Milan, Italy – Leonardo turned his thoughts to urban planning problems. Following a typical Renaissance trend, he began to work on an ‘ideal city’ project, which – due to its excessive costs – would remain unfulfilled. Yet given that unsustainable urban models are a key cause of global climate change today, it’s only natural to wonder how Leonardo might have changed the shape of modem cities.</p>\n<p>Although the Renaissance is renowned as an era of incredible progress in art and architecture, it is rarely noted that the 15th century also marked the birth of urbanism as a true academic discipline. The rigour and method behind the conscious conception of a city had been largely missing in Western thought until the moment when prominent Renaissance men pushed forward large-scale urban projects in Italy, such as the reconfiguration of the town of Pienza and the expansion of the city of Ferrara. These works surely inspired Leonardo’s decision to rethink the design of medieval cities, with their winding and overcrowded streets and with houses piled against one another.</p>\n<p>It is not easy to identify a coordinated vision of Leonardo’s ideal city because of his disordered way of working with notes and sketches. But from the largest collection of Leonardo’s papers ever assembled, a series of innovative thoughts can be reconstructed regarding the foundation of a new city along the Ticino River, which runs from Switzerland into Italy and is 248 kilometres long. He designed the city for the easy transport of goods and clean urban spaces, and he wanted a comfortable and spacious city, with well-ordered streets and architecture. He recommended ‘high, strong walls’, with ‘towers and battlements of all necessary and pleasant beauty’.</p>\n<p>His plans for a modem and ‘rational’ city were consistent with Renaissance ideals. But, in keeping with his personality, Leonardo included several innovations in his urban design. Leonardo wanted the city to be built on several levels, linked with vertical outdoor staircases. This design can be seen in some of today’s high-rise buildings but was unconventional at the time. Indeed, this idea of taking full advantage of the interior spaces wasn’t implemented until the 1920s and 1930s, with the birth of the Modernist movement.</p>\n<p>While in the upper layers of the city, people could walk undisturbed between elegant palaces and streets, the lower layer was the place for services, trade, transport and industry. But the true originality of Leonardo’s vision was its fusion of architecture and engineering. Leonardo designed extensive hydraulic plants to create artificial canals throughout the city. The canals, regulated by clocks and basins, were supposed to make it easier for boats to navigate inland. Leonardo also thought that the width of the streets ought to match the average height of the adjacent houses: a rule still followed in many contemporary cities across Italy, to allow access to sun and reduce the risk of damage from earthquakes.</p>\n<p>Although some of these features existed in Roman cities, before Leonardo’s drawings there had never been a multi-level, compact modem city which was thoroughly technically conceived. Indeed, it wasn’t until the 19th century that some of his ideas were applied. For example, the subdivision of the city by function- with services and infrastructures located in the lower levels and wide and well-ventilated boulevards and walkways above for residents – is an idea that can be found in Georges-Eugene Haussmann’s renovation of Paris under Emperor Napoleon III between 1853 and 1870.</p>\n<p>Today, Leonardo’s ideas are not simply valid, they actually suggest a way forward for urban planning. Many scholars think that the compact city, built upwards instead of outwards, integrated with nature (especially water systems), with efficient transport infrastructure, could help modem cities become more efficient and sustainable. This is yet another reason why Leonardo was aligned so closely with modem urban planning and centuries ahead of his time.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec3-g1-27-33",
          "type": "true_false_not_given",
          "title": "Questions 27-33",
          "instructions": "Do the following statements agree with the information given in Reading Passage 3? In boxes 27-33 on your answer sheet, write TRUE              if the statement agrees with the information",
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "People first referred to Leonardo da Vinci as a genius 500 years ago.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 28,
              "prompt": "The current climate crisis is predicted to cause more deaths than the plague.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 29,
              "prompt": "Some of the challenges we face today can be compared to those of earlier times.",
              "correctAnswer": "TRUE",
              "explanation": "Official Cambridge answer: TRUE"
            },
            {
              "questionNumber": 30,
              "prompt": "Leonardo da Vinci’s ‘ideal city’ was constructed in the 15th century.",
              "correctAnswer": "FALSE",
              "explanation": "Official Cambridge answer: FALSE"
            },
            {
              "questionNumber": 31,
              "prompt": "Poor town planning is a major contributor to climate change.",
              "correctAnswer": "TRUE",
              "explanation": "Official Cambridge answer: TRUE"
            },
            {
              "questionNumber": 32,
              "prompt": "In Renaissance times, local people fought against the changes to Pienza and Ferrara.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 33,
              "prompt": "Leonardo da Vinci kept a neat, organised record of his designs.",
              "correctAnswer": "FALSE",
              "explanation": "Official Cambridge answer: FALSE"
            }
          ]
        },
        {
          "id": "r-sec3-g2-34-40",
          "type": "summary_completion",
          "title": "Questions 34-40",
          "instructions": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 34-40 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 34,
              "prompt": "Leonardo da Vinci’s ideal city: This was to provide better [ 34 ] for trade and a less polluted environment.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "transport",
              "explanation": "Official Cambridge answer: transport"
            },
            {
              "questionNumber": 35,
              "prompt": "Leonardo da Vinci’s ideal city: They included features that can be seen in some tower blocks today, such as [ 35 ] on the exterior of a building.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "staircases",
              "explanation": "Official Cambridge answer: staircases"
            },
            {
              "questionNumber": 36,
              "prompt": "Leonardo da Vinci’s ideal city: His expertise in [ 36 ] was evident in his plans for artificial canals within his ideal city.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "engineering",
              "explanation": "Official Cambridge answer: engineering"
            },
            {
              "questionNumber": 37,
              "prompt": "Leonardo da Vinci’s ideal city: The design of many cities in Italy today follows this [ 37 ] .",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "rule",
              "explanation": "Official Cambridge answer: rule"
            },
            {
              "questionNumber": 38,
              "prompt": "Leonardo da Vinci’s ideal city: While some cities from [ 38 ] times have aspects that can also be found in Leonardo’s designs, his ideas weren’t put into practice until long after his  death.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "Roman",
              "explanation": "Official Cambridge answer: Roman"
            },
            {
              "questionNumber": 39,
              "prompt": "Leonardo da Vinci’s ideal city: [ 39 ] is one example of a city that was redesigned in the 19th century in the way that Leonardo had envisaged.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "Paris",
              "explanation": "Official Cambridge answer: Paris"
            },
            {
              "questionNumber": 40,
              "prompt": "Leonardo da Vinci’s ideal city: His ideas are also relevant to today’s world, where building [ 40 ] no longer seems to be the best approach.",
              "options": [
                "A collection of Leonardo da Vinci’s paperwork reveals his design of a new city beside the Ticino River. This was to provide better 34………………. for trade and a less polluted environment. Although Leonardo da Vinci’s city shared many of the ideals of his time, some of his innovations were considered unconventional in their design. They included features that can be seen in some tower blocks today, such as 35………………. on the exterior of a building."
              ],
              "correctAnswer": "outwards",
              "explanation": "Official Cambridge answer: outwards"
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test2Listening: IELTSMockTest = {
  "id": "cambridge-18-test-2-listening",
  "book": 18,
  "testNumber": 2,
  "module": "listening",
  "title": "Cambridge 18 Academic Listening Test 2",
  "durationMinutes": 35,
  "audioUrl": "/audio/cam18-test2-part1.mp3",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Listening Part 1",
      "subtitle": "Complete the notes below.",
      "audioUrl": "/audio/cam18-test2-part1.mp3",
      "questionGroups": [
        {
          "id": "l-part1-g1-1-5",
          "type": "form_completion",
          "title": "Questions 1-5",
          "instructions": "Complete the notes below. Write ONE WORD ONLY for each answer. Working at Milo’s Restaurants",
          "clozeTemplate": "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\nWorking at Milo’s Restaurants\nBenefits\n●   {{1}} provided for all staff\n●   {{2}} during weekdays at all Milo’s Restaurants\n●   {{3}} provided after midnight\nPerson specification\n●   must be prepared to work well in a team\n●   must care about maintaining a high standard of {{4}}\n●   must have a qualification in {{5}}\nComplete the table below.\nWrite ONE WORD AND/OR A NUMBER for each answer.\nLocation\nJob title\nResponsibilities include\nPay and conditions\n{{6}} Street\nBreakfast supervisor\nChecking portions, etc. are correct\nMaking sure {{7}} is clean\nStarting salary £{{8}} per hour\nStart work at 5.30 a.m.\nCity Road\nJunior chef\nSupporting senior chefs\nMaintaining stock and organising {{9}}\nAnnual salary £23,000\nNo work on a {{10}} once a month",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Benefits: [ 1 ] provided for all staff",
              "correctAnswer": "training",
              "explanation": "Official Cambridge answer: training"
            },
            {
              "questionNumber": 2,
              "prompt": "Benefits: [ 2 ] during weekdays at all Milo’s Restaurants",
              "correctAnswer": "discount",
              "explanation": "Official Cambridge answer: discount"
            },
            {
              "questionNumber": 3,
              "prompt": "Benefits: [ 3 ] provided after midnight",
              "correctAnswer": "taxi",
              "explanation": "Official Cambridge answer: taxi"
            },
            {
              "questionNumber": 4,
              "prompt": "must be prepared to work well in a team: must care about maintaining a high standard of [ 4 ]",
              "correctAnswer": "service",
              "explanation": "Official Cambridge answer: service"
            },
            {
              "questionNumber": 5,
              "prompt": "must be prepared to work well in a team: must have a qualification in [ 5 ]",
              "correctAnswer": "English",
              "explanation": "Official Cambridge answer: English"
            }
          ]
        },
        {
          "id": "l-part1-g2-6-10",
          "type": "table_completion",
          "title": "Questions 6-10",
          "instructions": "Complete the table below. Write ONE WORD AND/OR A NUMBER for each answer. Location",
          "questions": [
            {
              "questionNumber": 6,
              "prompt": "Pay and conditions: [ 6 ] Street",
              "correctAnswer": "Wivenhoe",
              "explanation": "Official Cambridge answer: Wivenhoe"
            },
            {
              "questionNumber": 7,
              "prompt": "Checking portions, etc. are correct: Making sure [ 7 ] is clean",
              "correctAnswer": "equipment",
              "explanation": "Official Cambridge answer: equipment"
            },
            {
              "questionNumber": 8,
              "prompt": "Checking portions, etc. are correct: Starting salary £[ 8 ] per hour",
              "correctAnswer": "9.75",
              "explanation": "Official Cambridge answer: 9.75"
            },
            {
              "questionNumber": 9,
              "prompt": "Supporting senior chefs: Maintaining stock and organising [ 9 ]",
              "correctAnswer": "deliveries",
              "explanation": "Official Cambridge answer: deliveries"
            },
            {
              "questionNumber": 10,
              "prompt": "Annual salary £23,000: No work on a [ 10 ] once a month",
              "correctAnswer": "Sunday",
              "explanation": "Official Cambridge answer: Sunday"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Listening Part 2",
      "subtitle": "Choose TWO letters, A-E.",
      "audioUrl": "/audio/cam18-test2-part2.mp3",
      "questionGroups": [
        {
          "id": "l-part2-g1-11-12",
          "type": "multiple_choice_multi",
          "title": "Questions 11 and 12",
          "instructions": "Choose TWO letters, A-E. What are the TWO main reasons why this site has been chosen for the housing development? A   It has suitable geographical features.",
          "questions": [
            {
              "questionNumber": 11,
              "prompt": "What are the TWO main reasons why this site has been chosen for the housing development? (First choice)",
              "options": [
                "A   It has suitable geographical features.",
                "B   There is easy access to local facilities.",
                "C   It has good connections with the airport.",
                "D   The land is of little agricultural value.",
                "E   It will be convenient for workers."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 12,
              "prompt": "What are the TWO main reasons why this site has been chosen for the housing development? (Second choice)",
              "options": [
                "A   It has suitable geographical features.",
                "B   There is easy access to local facilities.",
                "C   It has good connections with the airport.",
                "D   The land is of little agricultural value.",
                "E   It will be convenient for workers."
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            }
          ]
        },
        {
          "id": "l-part2-g2-13-14",
          "type": "multiple_choice_multi",
          "title": "Questions 13 and 14",
          "instructions": "Choose TWO letters, A-E. Which TWO aspects of the planned housing development have people given positive feedback about? A   the facilities for cyclists",
          "questions": [
            {
              "questionNumber": 13,
              "prompt": "Which TWO aspects of the planned housing development have people given positive feedback about? (First choice)",
              "options": [
                "A   the facilities for cyclists",
                "B   the impact on the environment",
                "C   the encouragement of good relations between residents",
                "D   the low cost of all the accommodation",
                "E   the rural location"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 14,
              "prompt": "Which TWO aspects of the planned housing development have people given positive feedback about? (Second choice)",
              "options": [
                "A   the facilities for cyclists",
                "B   the impact on the environment",
                "C   the encouragement of good relations between residents",
                "D   the low cost of all the accommodation",
                "E   the rural location"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        },
        {
          "id": "l-part2-g3-15-20",
          "type": "diagram_labelling",
          "title": "Questions 15-20",
          "instructions": "Label the map below. Write the correct letter, A-I, next to Questions 15-20.",
          "diagramTitle": "New Housing Development Plan",
          "imageUrl": "/images/maps/cam18-test2-housing-development.jpg",
          "options": [
            "A", "B", "C", "D", "E", "F", "G", "H", "I"
          ],
          "questions": [
            {
              "questionNumber": 15,
              "prompt": "School   …………….",
              "correctAnswer": "G",
              "explanation": "Official Cambridge answer: G"
            },
            {
              "questionNumber": 16,
              "prompt": "Sports centre   …………….",
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 17,
              "prompt": "Clinic   …………….",
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 18,
              "prompt": "Community centre   …………….",
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 19,
              "prompt": "Supermarket   …………….",
              "correctAnswer": "H",
              "explanation": "Official Cambridge answer: H"
            },
            {
              "questionNumber": 20,
              "prompt": "Playground   ……………. ",
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Listening Part 3",
      "subtitle": "Choose the correct letter, A, B or C.",
      "audioUrl": "/audio/cam18-test2-part3.mp3",
      "questionGroups": [
        {
          "id": "l-part3-g1-21-24",
          "type": "multiple_choice",
          "title": "Questions 21-24",
          "instructions": "Choose the correct letter, A, B or C. A   It was the most severe eruption in modern times.",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "Why do the students think the Laki eruption of 1783 is so important?",
              "options": [
                "A   It was the most severe eruption in modern times.",
                "B   It led to the formal study of volcanoes.",
                "C   It had a profound effect on society."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 22,
              "prompt": "What surprised Adam about observations made at the time?",
              "options": [
                "A   the number of places producing them",
                "B   the contradictions in them",
                "C   the lack of scientific data to support them"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 23,
              "prompt": "According to Michelle, what did the contemporary sources say about the Laki haze?",
              "options": [
                "A   People thought it was similar to ordinary fog.",
                "B   It was associated with health issues.",
                "C   It completely blocked out the sun for weeks."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 24,
              "prompt": "Adam corrects Michelle when she claims that Benjamin Franklin",
              "options": [
                "A   came to the wrong conclusion about the cause of the haze.",
                "B   was the first to identify the reason for the haze.",
                "C   supported the opinions of other observers about the haze."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            }
          ]
        },
        {
          "id": "l-part3-g2-25-26",
          "type": "multiple_choice_multi",
          "title": "Questions 25 and 26",
          "instructions": "Choose TWO letters, A-E. Which TWO issues following the Laki eruption surprised the students? A   how widespread the effects were",
          "questions": [
            {
              "questionNumber": 25,
              "prompt": "Which TWO issues following the Laki eruption surprised the students? (First choice)",
              "options": [
                "A   how widespread the effects were",
                "B   how long-lasting the effects were",
                "C   the number of deaths it caused",
                "D   the speed at which the volcanic ash cloud spread",
                "E   how people ignored the warning signs"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 26,
              "prompt": "Which TWO issues following the Laki eruption surprised the students? (Second choice)",
              "options": [
                "A   how widespread the effects were",
                "B   how long-lasting the effects were",
                "C   the number of deaths it caused",
                "D   the speed at which the volcanic ash cloud spread",
                "E   how people ignored the warning signs"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            }
          ]
        },
        {
          "id": "l-part3-g3-27-30",
          "type": "multiple_choice",
          "title": "Questions 27-30",
          "instructions": "What comment do the students make about the impact of the Laki eruption on the following countries? Choose FOUR answers from the box and write the correct letter, A-F, next to Questions 27-30. Comments",
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "Iceland   …………",
              "options": [
                "A   This country suffered the most severe loss of life.",
                "B   The impact on agriculture was predictable.",
                "C   There was a significant increase in deaths of young people.",
                "D   Animals suffered from a sickness.",
                "E   This country saw the highest rise in food prices in the world.",
                "F   It caused a particularly harsh winter."
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 28,
              "prompt": "Egypt   …………",
              "options": [
                "A   This country suffered the most severe loss of life.",
                "B   The impact on agriculture was predictable.",
                "C   There was a significant increase in deaths of young people.",
                "D   Animals suffered from a sickness.",
                "E   This country saw the highest rise in food prices in the world.",
                "F   It caused a particularly harsh winter."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 29,
              "prompt": "UK   …………",
              "options": [
                "A   This country suffered the most severe loss of life.",
                "B   The impact on agriculture was predictable.",
                "C   There was a significant increase in deaths of young people.",
                "D   Animals suffered from a sickness.",
                "E   This country saw the highest rise in food prices in the world.",
                "F   It caused a particularly harsh winter."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 30,
              "prompt": "USA   ………… ",
              "options": [
                "A   This country suffered the most severe loss of life.",
                "B   The impact on agriculture was predictable.",
                "C   There was a significant increase in deaths of young people.",
                "D   Animals suffered from a sickness.",
                "E   This country saw the highest rise in food prices in the world.",
                "F   It caused a particularly harsh winter."
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 4,
      "title": "Listening Part 4",
      "subtitle": "Complete the notes below.",
      "audioUrl": "/audio/cam18-test2-part4.mp3",
      "questionGroups": [
        {
          "id": "l-part4-g1-31-40",
          "type": "form_completion",
          "title": "Questions 31-40",
          "instructions": "Complete the notes below. Write ONE WORD ONLY for each answer. Pockets",
          "clozeTemplate": "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\nPockets\nReason for choice of subject\n●   They are {{31}} but can be overlooked by consumers and designers.\nPockets in men’s clothes\n●   Men started to wear {{32}} in the 18th century.\n●   A {{33}} sewed pockets into the lining of the garments.\n●   The wearer could use the pockets for small items.\n●   Bigger pockets might be made for men who belonged to a certain type of {{34}}\nPockets in women’s clothes\n●   Women’s pockets were less {{35}} than men’s.\n●   Women were very concerned about pickpockets.\n●   Pockets were produced in pairs using {{36}} to link them together.\n●   Pockets hung from the women’s {{37}} under skirts and petticoats.\n●   Items such as {{38}} could be reached through a gap in the material.\n●   Pockets, of various sizes, stayed inside clothing for many decades.\n●   When dresses changed shape, hidden pockets had a negative effect on the {{39}} of women.\n●   Bags called ‘pouches’ became popular, before women carried a {{40}}\nCam 18 Listening Test 01\nCam 18 Listening Test 03",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "Reason for choice of subject: They are [ 31 ] but can be overlooked by consumers and designers.",
              "correctAnswer": "convenient",
              "explanation": "Official Cambridge answer: convenient"
            },
            {
              "questionNumber": 32,
              "prompt": "Pockets in men’s clothes: Men started to wear [ 32 ] in the 18th century.",
              "correctAnswer": "suits",
              "explanation": "Official Cambridge answer: suits"
            },
            {
              "questionNumber": 33,
              "prompt": "Pockets in men’s clothes: A [ 33 ] sewed pockets into the lining of the garments.",
              "correctAnswer": "tailor",
              "explanation": "Official Cambridge answer: tailor"
            },
            {
              "questionNumber": 34,
              "prompt": "Pockets in men’s clothes: Bigger pockets might be made for men who belonged to a certain type of [ 34 ]",
              "correctAnswer": "profession",
              "explanation": "Official Cambridge answer: profession"
            },
            {
              "questionNumber": 35,
              "prompt": "Pockets in women’s clothes: Women’s pockets were less [ 35 ] than men’s.",
              "correctAnswer": "visible",
              "explanation": "Official Cambridge answer: visible"
            },
            {
              "questionNumber": 36,
              "prompt": "Women were very concerned about pickpockets.: Pockets were produced in pairs using [ 36 ] to link them together.",
              "correctAnswer": "string(s)",
              "explanation": "Official Cambridge answer: string(s)"
            },
            {
              "questionNumber": 37,
              "prompt": "Women were very concerned about pickpockets.: Pockets hung from the women’s [ 37 ] under skirts and petticoats.",
              "correctAnswer": "waist(s)",
              "explanation": "Official Cambridge answer: waist(s)"
            },
            {
              "questionNumber": 38,
              "prompt": "Women were very concerned about pickpockets.: Items such as [ 38 ] could be reached through a gap in the material.",
              "correctAnswer": "perfume",
              "explanation": "Official Cambridge answer: perfume"
            },
            {
              "questionNumber": 39,
              "prompt": "Women were very concerned about pickpockets.: When dresses changed shape, hidden pockets had a negative effect on the [ 39 ] of women.",
              "correctAnswer": "image",
              "explanation": "Official Cambridge answer: image"
            },
            {
              "questionNumber": 40,
              "prompt": "Women were very concerned about pickpockets.: Bags called ‘pouches’ became popular, before women carried a [ 40 ]",
              "correctAnswer": "handbag",
              "explanation": "Official Cambridge answer: handbag"
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test3Reading: IELTSMockTest = {
  "id": "cambridge-18-test-3-reading",
  "book": 18,
  "testNumber": 3,
  "module": "reading",
  "title": "Cambridge 18 Academic Reading Test 3",
  "durationMinutes": 60,
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Reading Passage 1",
      "subtitle": "Materials to take us beyond concrete",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">Materials to take us beyond concrete</h2>\n      <p>Concrete is everywhere, but it's bad for the planet, generating large amounts of carbon dioxide – alternatives are being developed</p>\n<p>A</p>\n<p>Concrete is the second most used substance in the global economy, after water – and one of the world’s biggest single sources of greenhouse gas emissions. The chemical process by which cement, the key ingredient of concrete, is created results in large quantities of carbon dioxide. The UN estimates that there will be 9.8 billion people living on the planet by mid-century. They will need somewhere to live. If concrete is the only answer to the construction of new cities, then carbon emissions will soar, aggravating global warming. And so scientists have started innovating with other materials, in a scramble for alternatives to a universal commodity that has underpinned our modem life for many years.</p>\n<p>B</p>\n<p>The problem with replacing concrete is that it is so very good at what it does. Chris Cheeseman, an engineering professor at Imperial College London, says the key thing to consider is the extent to which concrete is used around the world, and is likely to continue to be used. ‘Concrete is not a high-carbon product. Cement is high carbon, but concrete is not. But it is the scale on which it is used that makes it high carbon. The sheer scale of manufacture is so huge, that is the issue.’</p>\n<p>C</p>\n<p>Not only are the ingredients of concrete relatively cheap and found in abundance in most places around the globe, the stuff itself has marvellous properties: Portland cement, the vital component of concrete, is mouldable and pourable, but quickly sets hard. Cheeseman also notes another advantage: concrete and steel have similar thermal expansion properties, so steel can be used to reinforce concrete, making it far stronger and more flexible as a building material than it could be on its own. According to Cheeseman, all these factors together make concrete hard to beat. ‘Concrete is amazing stuff. Making anything with similar properties is going to be very difficult.’</p>\n<p>D</p>\n<p><span class=\"font-bold text-indigo-700 font-sans mr-2 text-base\">[A]</span>possible alternative to concrete is wood. Making buildings from wood may seem like a rather medieval idea, but climate change is driving architects to turn to treated timber as a possible resource. Recent years have seen the emergence of tall buildings constructed almost entirely from timber. Vancouver, Vienna and Brumunddal in Norway are all home to constructed tall, wooden buildings.</p>\n<p>E</p>\n<p>Using wood to construct buildings, however, is not straightforward. Wood expands as it absorbs moisture from the air and is susceptible to pests, not to mention fire. But treating wood and combining it with other materials can improve its properties. Cross-laminated timber is engineered wood. An adhesive is used to stick layers of solid-sawn timber together, crosswise, to form building blocks. This material is light but has the strength of concrete and steel. Construction experts say that wooden buildings can be constructed at a greater speed than ones of concrete and steel and the process, it seems, is quieter.</p>\n<p>F</p>\n<p>Stora Enso is Europe’s biggest supplier of cross-laminated timber, and its vice-president Markus Mannstrom reports that the company is seeing increasing demand globally for building in wood, with climate change concerns the key driver. Finland, with its large forests, where Stora Enso is based, has been leading the way, but the company is seeing a rise in demand for its timber products across the world, including in Asia. Of course, using timber in a building also locks away the carbon that it absorbed as it grew. But even treated wood has its limitations and only when a wider range of construction projects has been proven in practice will it be possible to see wood as a real alternative to concrete in constructing tall buildings.</p>\n<p>G</p>\n<p>Fly ash and slag from iron ore are possible alternatives to cement in a concrete mix. Fly ash, a byproduct of coal-burning power plants, can be incorporated into concrete mixes to make up as much as 15 to 30% of the cement, without harming the strength or durability of the resulting mix. Iron-ore slag, a byproduct of the iron-ore smelting process, can be used in a similar way. Their incorporation into concrete mixes has the potential to reduce greenhouse gas emissions.</p>\n<p>But Anna Surgenor, of the UK’s Green Building Council, notes that although these waste products can save carbon in the concrete mix, their use is not always straightforward. ‘It’s possible to replace the cement content in concrete with waste products to lower the overall carbon impact. But there are several calculations that need to be considered across the entire life cycle of the building- these include factoring in where these materials are being shipped from. If they are transported over long distances, using fossil fuels, the use of alternative materials might not make sense from an overall carbon reduction perspective.’</p>\n<p>H</p>\n<p>While these technologies are all promising ideas, they are either unproven or based on materials that are not abundant. In their overview of innovation in the concrete industry, Felix Preston and Johanna Lehne of the UK’s Royal Institute of International Affairs reached the conclusion that, ‘Some novel cements have been discussed for more than a decade within the research community, without breaking through. At present, these alternatives are rarely as cost-effective as conventional cement, and they face raw-material shortages and resistance from customers.’</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec1-g1-1-4",
          "type": "sentence_completion",
          "title": "Questions 1-4",
          "instructions": "Which section contains the following information? Write the correct letter, A-H, in boxes 1-4 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "an explanation of the industrial processes that create potential raw materials for concrete",
              "correctAnswer": "G",
              "explanation": "Official Cambridge answer: G"
            },
            {
              "questionNumber": 2,
              "prompt": "a reference to the various locations where high-rise wooden buildings can be found",
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 3,
              "prompt": "an indication of how widely available the raw materials of concrete are",
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 4,
              "prompt": "the belief that more high-rise wooden buildings are needed before wood can be regarded as a viable construction material",
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            }
          ]
        },
        {
          "id": "r-sec1-g2-5-8",
          "type": "summary_completion",
          "title": "Questions 5-8",
          "instructions": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 5-8 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 5,
              "prompt": "Making buildings with wood: Wood is a traditional building material, but current environmental concerns are encouraging [ 5 ] to use wood in modern construction projects.",
              "correctAnswer": "architects",
              "explanation": "Official Cambridge answer: architects"
            },
            {
              "questionNumber": 6,
              "prompt": "Making buildings with wood: For example, as [ 6 ] in the atmosphere enters wood, it increases in size.",
              "correctAnswer": "moisture",
              "explanation": "Official Cambridge answer: moisture"
            },
            {
              "questionNumber": 7,
              "prompt": "Making buildings with wood: In one process, [ 7 ] of solid wood are glued together to create building blocks.",
              "correctAnswer": "layers",
              "explanation": "Official Cambridge answer: layers"
            },
            {
              "questionNumber": 8,
              "prompt": "Making buildings with wood: Experts say that wooden buildings are an improvement on those made of concrete and steel in terms of the [ 8 ] with which they can be constructed and how much noise is generated by the process.",
              "correctAnswer": "speed",
              "explanation": "Official Cambridge answer: speed"
            }
          ]
        },
        {
          "id": "r-sec1-g3-9-13",
          "type": "matching_information",
          "title": "Questions 9–13",
          "instructions": "Look at the following statements (Questions 9-13) and the list of people below. Match each statement with the correct person, A, B, C or D. Write the correct letter, A, B, C or D, in boxes 9-13 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 9,
              "prompt": "The environmental advantage of cement alternatives may not be as great as initially assumed.",
              "options": [
                "A     Chris Cheeseman",
                "B     Markus Mannstrom",
                "C     Anna Surgenor",
                "D     Felix Preston and Johanna Lehne"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 10,
              "prompt": "It would be hard to create a construction alternative to concrete that offers so many comparable benefits.",
              "options": [
                "A     Chris Cheeseman",
                "B     Markus Mannstrom",
                "C     Anna Surgenor",
                "D     Felix Preston and Johanna Lehne"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 11,
              "prompt": "Worries about the environment have led to increased interest in wood as a construction material.",
              "options": [
                "A     Chris Cheeseman",
                "B     Markus Mannstrom",
                "C     Anna Surgenor",
                "D     Felix Preston and Johanna Lehne"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 12,
              "prompt": "Expense has been a factor in the negative response to the development of new cements.",
              "options": [
                "A     Chris Cheeseman",
                "B     Markus Mannstrom",
                "C     Anna Surgenor",
                "D     Felix Preston and Johanna Lehne"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 13,
              "prompt": "The environmental damage caused by concrete is due to it being produced in large quantities. List of People",
              "options": [
                "A     Chris Cheeseman",
                "B     Markus Mannstrom",
                "C     Anna Surgenor",
                "D     Felix Preston and Johanna Lehne"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Reading Passage 2",
      "subtitle": "A",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">A</h2>\n      <p>When primitive automobiles first began to appear in the 1800s, their engines were based on steam power. Steam had already enjoyed a long and successful career in the railways, so it was only natural that the technology evolved into a miniaturized version which was separate from the trains. But these early cars inherited steam’s weaknesses along with its strengths. The boilers had to be lit by hand, and they required about twenty minutes to build up pressure before they could be driven. Furthermore, their water reservoirs only lasted for about thirty miles before needing replenishment. Despite such shortcomings, these newly designed self-propelled carriages offered quick transportation, and by the early 1900s it was not uncommon to see such machines shuttling wealthy citizens around town.</p>\n<p>B</p>\n<p>But the glory days of steam cars were few. A new technology called the Internal Combustion Engine soon appeared, which offered the ability to drive down the road just moments after starting up. At first, these noisy gasoline cars were unpopular because they were more complicated to operate and they had difficult hand-crank starters, which were known to break arms when the engines backfired. But in 1912 General Motors introduced the electric starter, and over the following few years steam power was gradually phased out.</p>\n<p>C</p>\n<p>Even as the market was declining, four brothers made one last effort to rekindle the technology. Between 1906 and 1909, while still attending high school, Abner Doble and his three brothers built their first steam car in their parents’ basement. It comprised parts taken from a wrecked early steam car but reconfigured to drive an engine of their own design. Though it did not run well, the Doble brothers went on to build a second and third prototype in the following years. Though the Doble boys’ third prototype, nicknamed the Model B, still lacked the convenience of an internal combustion engine, it drew the attention of automobile trade magazines due to its numerous improvements over previous steam cars. The Model B proved to be superior to gasoline automobiles in many ways. Its high-pressure steam drove the engine pistons in virtual silence, in contrast to clattering gas engines which emitted the aroma of burned hydrocarbons. Perhaps most impressively, the Model B was amazingly swift. It could accelerate from zero to sixty miles per hour in just fifteen seconds, a feat described as ‘remarkable acceleration’ by Automobile magazine in 1914.</p>\n<p>D</p>\n<p>The following year Abner Doble drove the Model B from Massachusetts to Detroit in order to seek investment in his automobile design, which he used to open the General Engineering Company. He and his brothers immediately began working on the Model C, which was intended to expand upon the innovations of the Model B. The brothers added features such as a key-based ignition in the cabin, eliminating the need for the operator to manually ignite the boiler. With these enhancements, the Dobles' new car company promised a steam vehicle which would provide all of the convenience of a gasoline car, but with much greater speed, much simpler driving controls, and a virtually silent powerplant. By the following April, the General Engineering Company had received 5,390 deposits for Doble Detroits, which were scheduled for delivery in early 1918.</p>\n<p>E</p>\n<p>Later that year Abner Doble delivered unhappy news to those eagerly awaiting the delivery of their modem new cars. Those buyers who received the handful of completed cars complained that the vehicles were sluggish and erratic, sometimes going in reverse when they should go forward. The new engine design, though innovative, was still plagued with serious glitches.</p>\n<p>F</p>\n<p>The brothers made one final attempt to produce a viable steam automobile. In early 1924, the Doble brothers shipped a Model E to New York City to be road-tested by the Automobile Club of America. After sitting overnight in freezing temperatures, the car was pushed out into the road and left to sit for over an hour in the frosty morning air. At the turn of the key, the boiler lit and reached its operating pressure inside of forty seconds. As they drove the test vehicle further, they found that its evenly distributed weight lent it surprisingly good handling, even though it was so heavy. As the new Doble steamer was further developed and tested, its maximum speed was pushed to over a hundred miles per hour, and it achieved about fifteen miles per gallon of kerosene with negligible emissions.</p>\n<p>G</p>\n<p>Sadly, the Dobles’ brilliant steam car never was a financial success. Priced at around $18,000 in 1924, it was popular only among the very wealthy. Plus, it is said that no two Model Es were quite the same, because Abner Doble tinkered endlessly with the design. By the time the company folded in 1931, fewer than fifty of the amazing Model E steam cars had been produced. For his whole career, until his death in 1961, Abner Doble remained adamant that steam-powered automobiles were at least equal to gasoline cars, if not superior. Given the evidence, he may have been right. Many of the Model E Dobles which have survived are still in good working condition, some having been driven over half a million miles with only normal maintenance. Astonishingly, an unmodified Doble Model E runs clean enough to pass the emissions laws in California today, and they are pretty strict. It is true that the technology poses some difficult problems, but you cannot help but wonder how efficient a steam car might be with the benefit of modem materials and computers. Under the current pressure to improve automotive performance and reduce emissions, it is not unthinkable that the steam car may rise again.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec2-g1-14-20",
          "type": "matching_headings",
          "title": "Questions 14-20",
          "instructions": "Choose the correct heading for each paragraph from the list of headings below. Write the correct number, i-viii, in boxes 14-20 on your answer sheet.",
          "headingList": [
            "i. A period in cold conditions before the technology is assessed",
            "ii. Marketing issues lead to failure",
            "iii. Good and bad aspects of steam technology are passed on",
            "iv. A possible solution to the issues of today",
            "v. Further improvements lead to commercial orders",
            "vi. Positive publicity at last for this quiet, clean, fast vehicle",
            "vii. A disappointing outcome for customers",
            "viii. A better option than the steam car arises"
          ],
          "questions": [
            {
              "questionNumber": 14,
              "prompt": "Paragraph A",
              "correctAnswer": "iii",
              "explanation": "Official Cambridge answer: iii"
            },
            {
              "questionNumber": 15,
              "prompt": "Paragraph B",
              "correctAnswer": "viii",
              "explanation": "Official Cambridge answer: viii"
            },
            {
              "questionNumber": 16,
              "prompt": "Paragraph C",
              "correctAnswer": "vi",
              "explanation": "Official Cambridge answer: vi"
            },
            {
              "questionNumber": 17,
              "prompt": "Paragraph D",
              "correctAnswer": "v",
              "explanation": "Official Cambridge answer: v"
            },
            {
              "questionNumber": 18,
              "prompt": "Paragraph E",
              "correctAnswer": "vii",
              "explanation": "Official Cambridge answer: vii"
            },
            {
              "questionNumber": 19,
              "prompt": "Paragraph F",
              "correctAnswer": "i",
              "explanation": "Official Cambridge answer: i"
            },
            {
              "questionNumber": 20,
              "prompt": "Paragraph G",
              "correctAnswer": "iv",
              "explanation": "Official Cambridge answer: iv"
            }
          ]
        },
        {
          "id": "r-sec2-g2-21-23",
          "type": "multiple_choice",
          "title": "Questions 21-23",
          "instructions": "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 21-23 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "What point does the writer make about the steam car in Paragraph B?",
              "options": [
                "A   Its success was short-lived.",
                "B   Not enough cars were made.",
                "C   Car companies found them hard to sell.",
                "D   People found them hard to drive."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 22,
              "prompt": "When building their first steam car, the Doble brothers",
              "options": [
                "A   constructed all the parts themselves.",
                "B   made written notes at each stage of the construction.",
                "C   needed several attempts to achieve a competitive model.",
                "D   sought the advice of experienced people in the car industry."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 23,
              "prompt": "In order to produce the Model C, the Doble brothers",
              "options": [
                "A   moved production to a different city.",
                "B   raised financial capital.",
                "C   employed an additional worker.",
                "D   abandoned their earlier designs."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            }
          ]
        },
        {
          "id": "r-sec2-g3-24-26",
          "type": "summary_completion",
          "title": "Questions 24-26",
          "instructions": "Complete the summary below. Choose ONE WORD ANDIOR A NUMBER from the passage for each answer. Write your answers in boxes 24-26 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 24,
              "prompt": "The Model E: A later version of the Model E raised its [ 24 ], while keeping its emissions extremely low.",
              "options": [
                "E. WOR",
                "D. ANDIOR"
              ],
              "correctAnswer": "speed",
              "explanation": "Official Cambridge answer: speed"
            },
            {
              "questionNumber": 25,
              "prompt": "The Model E: Under [ 25 ] cars were produced before the company went out of business.",
              "options": [
                "E. WOR",
                "D. ANDIOR"
              ],
              "correctAnswer": "fifty / 50",
              "explanation": "Official Cambridge answer: fifty / 50"
            },
            {
              "questionNumber": 26,
              "prompt": "The Model E: They are straightforward to maintain, and they satisfy California’s [ 26 ] emissions laws.",
              "options": [
                "E. WOR",
                "D. ANDIOR"
              ],
              "correctAnswer": "strict",
              "explanation": "Official Cambridge answer: strict"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Reading Passage 3",
      "subtitle": "The case for mixed-ability classes",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">The case for mixed-ability classes</h2>\n      <p>Picture this scene. It’s an English literature lesson in a UK school, and the teacher has just read an extract from Shakespeare’s Romeo and Juliet with a class of 15-year-olds. He’s given some of the students copies of No Fear Shakespeare, a kid-friendly translation of the original. For three students, even these literacy demands are beyond them. Another girl simply can’t focus and he gives her pens and paper to draw with. The teacher can ask the No Fear group to identify the key characters and maybe provide a tentative plot summary. He can ask most of the class about character development, and five of them might be able to support their statements with textual evidence. Now two curious students are wondering whether Shakespeare advocates living a life of moderation or one of passionate engagement.</p>\n<p>As a teacher myself, I’d think my lesson would be going rather well if the discussion went as described above. But wouldn't this kind of class work better if there weren’t such a huge gap between the top and the bottom? If we put all the kids who needed literacy support into one class, and all the students who want to discuss the virtue of moderation into another?</p>\n<p>The practice of ‘streaming’, or ‘tracking’, involves separating students into classes depending on their diagnosed levels of attainment. At a macro level, it requires the establishment of academically selective schools for the brightest students, and comprehensive schools for the rest. Within schools, it means selecting students into a ‘stream’ of general ability, or ‘sets’ of subject-specific ability. The practice is intuitively appealing to almost every stakeholder.</p>\n<p>I have heard the mixed-ability model attacked by way of analogy: a group hike. The fittest in the group take the lead and set a brisk pace, only to have to stop and wait every 20 minutes. This is frustrating, and their enthusiasm wanes. Meanwhile, the slowest ones are not only embarrassed but physically struggling to keep up. What’s worse, they never get a long enough break. They honestly just want to quit. Hiking, they feel, is not for them.</p>\n<p>Mixed-ability classes bore students, frustrate parents and bum out teachers. The brightest ones will never summit Mount Qomolangma, and the stragglers won’t enjoy the lovely stroll in the park they are perhaps more suited to. Individuals suffer at the demands of the collective, mediocrity prevails. So: is learning like hiking?</p>\n<p>The current pedagogical paradigm is arguably that of constructivism, which emerged out of the work of psychologist Lev Vygotsky. In the 1930s, Vygotsky emphasised the importance of targeting a student’s specific ‘zone of proximal development’ (ZPD). This is the gap between what they can achieve only with support – teachers, textbooks, worked examples, parents and so on - and what they can achieve independently. The purpose of teaching is to provide and then gradually remove this ‘scaffolding’ until they are autonomous. If we accept this model, it follows that streaming students with similar ZPDs would be an efficient and effective solution. And that forcing everyone on the same hike – regardless of aptitude – would be madness.</p>\n<p>Despite all this, there is limited empirical evidence to suggest that streaming results in better outcomes for students. Professor John Hattie, director of the Melbourne Education Research Institute, notes that ‘tracking has minimal effects on learning outcomes’. What is more, streaming appears to significantly – and negatively – affect those students assigned to the lowest sets. These students tend to have much higher representation of low socioeconomic class. Less significant is the small benefit for those lucky clever students in the higher sets. The overall result is that the smart stay smart and the dumb get dumber, further entrenching the social divide.</p>\n<p>In the latest update of Hattie’s influential meta-analysis of factors influencing student achievement, one of the most significant factors is the teachers’ estimate of achievement. Streaming students by diagnosed achievement automatically limits what the teacher feels the student is capable of. Meanwhile, in a mixed environment, teachers’ estimates need to be more diverse and flexible.</p>\n<p>While streaming might seem to help teachers effectively target a student’s ZPD, it can underestimate the importance of peer-to-peer learning. A crucial aspect of constructivist theory is the role of the MKO – ‘more knowledgeable other’ – in knowledge construction. While teachers are traditionally the MKOs in classrooms, the value of knowledgeable student peers must not go unrecognised either.</p>\n<p>I find it amazing to watch students get over an idea to their peers in ways that I would never think of. They operate with different language tools and different social tools from teachers and, having just learnt it themselves, they possess similar cognitive structures to their struggling classmates. There is also something exciting about passing on skills and knowledge that you yourself have just mastered – a certain pride and zeal, a certain freshness to the interaction between ‘teacher’ and ‘learner’ that is often lost by the expert for whom the steps are obvious and the joy of discovery forgotten.</p>\n<p>Having a variety of different abilities in a collaborative learning environment provides valuable resources for helping students meet their learning needs, not to mention improving their communication and social skills. And today, more than ever, we need the many to flourish – not suffer at the expense of a few bright stars. Once a year, I go on a hike with my class, a mixed bunch of students. It is challenging. The fittest students realise they need to encourage the reluctant. There are lookouts who report back, and extra items to carry for others. We make it – together.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec3-g1-27-30",
          "type": "multiple_choice",
          "title": "Questions 27-30",
          "instructions": "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 27-30 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "The writer describes the Romeo and Juliet lesson in order to demonstrate",
              "options": [
                "A   how few students are interested in literature.",
                "B   how a teacher handles a range of learning needs.",
                "C   how unsuitable Shakespeare is for most teenagers.",
                "D   how weaker students can disrupt their classmates’ learning."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 28,
              "prompt": "What does the writer say about streaming in the third paragraph?",
              "options": [
                "A   It has a very broad appeal.",
                "B   It favours cleverer students.",
                "C   It is relatively simple to implement.",
                "D   It works better in some schools than others."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 29,
              "prompt": "What idea is suggested by the reference to Mount Qomolangma in the fifth paragraph?",
              "options": [
                "A   students following unsuitable paths",
                "B   students attempting interesting tasks",
                "C   students not achieving their full potential",
                "D   students not being aware of their limitations"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 30,
              "prompt": "What does the word ‘scaffolding’ in the sixth paragraph refer to?",
              "options": [
                "A   the factors which prevent a student from learning effectively",
                "B   the environment where most of a student’s learning takes place",
                "C   the assistance given to a student in their initial stages of learning",
                "D   the setting of appropriate learning targets for a student’s aptitude"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        },
        {
          "id": "r-sec3-g2-31-35",
          "type": "summary_completion",
          "title": "Questions 31-35",
          "instructions": "Complete the summary using the list of phrases, A-l, below. Write the correct letter, A-l, in boxes 31-35 on your answer sheet. Is streaming effective?",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "Is streaming effective?: According to Professor John Hattie of the Melbourne Education Research Institute there is very little indication that streaming leads to [ 31 ] .",
              "options": [
                "A. wrong classes",
                "B. lower expectations",
                "C. average learners",
                "D. bottom sets",
                "E. brightest pupils",
                "F. disadvantaged backgrounds",
                "G. weaker students",
                "H. higher achievements",
                "I    positive impressions"
              ],
              "correctAnswer": "H",
              "explanation": "Official Cambridge answer: H"
            },
            {
              "questionNumber": 32,
              "prompt": "Is streaming effective?: He points out that, in schools which use streaming, the most significant impact is on those students placed in the [ 32 ], especially where a large proportion of them have 33………………… .",
              "options": [
                "A. wrong classes",
                "B. lower expectations",
                "C. average learners",
                "D. bottom sets",
                "E. brightest pupils",
                "F. disadvantaged backgrounds",
                "G. weaker students",
                "H. higher achievements",
                "I    positive impressions"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 33,
              "prompt": "Is streaming effective?: He points out that, in schools which use streaming, the most significant impact is on those students placed in the 32…………………, especially where a large proportion of them have [ 33 ] .",
              "options": [
                "A. wrong classes",
                "B. lower expectations",
                "C. average learners",
                "D. bottom sets",
                "E. brightest pupils",
                "F. disadvantaged backgrounds",
                "G. weaker students",
                "H. higher achievements",
                "I    positive impressions"
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            },
            {
              "questionNumber": 34,
              "prompt": "Is streaming effective?: Meanwhile, for the [ 34 ], there appears to be only minimal advantage.",
              "options": [
                "A. wrong classes",
                "B. lower expectations",
                "C. average learners",
                "D. bottom sets",
                "E. brightest pupils",
                "F. disadvantaged backgrounds",
                "G. weaker students",
                "H. higher achievements",
                "I    positive impressions"
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            },
            {
              "questionNumber": 35,
              "prompt": "Is streaming effective?: A further issue is that teachers tend to have [ 35 ] of students in streamed groups.",
              "options": [
                "A. wrong classes",
                "B. lower expectations",
                "C. average learners",
                "D. bottom sets",
                "E. brightest pupils",
                "F. disadvantaged backgrounds",
                "G. weaker students",
                "H. higher achievements",
                "I    positive impressions"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            }
          ]
        },
        {
          "id": "r-sec3-g3-36-40",
          "type": "yes_no_not_given",
          "title": "Questions 36-40",
          "instructions": "Do the following statements agree with the views of the writer in Reading Passage 3? In boxes 36-40 on your answer sheet, write YES                  if the statement agrees with the views of the writer",
          "questions": [
            {
              "questionNumber": 36,
              "prompt": "The Vygotsky model of education supports the concept of a mixed-ability class.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            },
            {
              "questionNumber": 37,
              "prompt": "Some teachers are uncertain about allowing students to take on MKO roles in the classroom.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 38,
              "prompt": "It can be rewarding to teach knowledge which you have only recently acquired.",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            },
            {
              "questionNumber": 39,
              "prompt": "The priority should be to ensure that the highest-achieving students attain their goals.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            },
            {
              "questionNumber": 40,
              "prompt": "Taking part in collaborative outdoor activities with teachers and classmates can improve student outcomes in the classroom. Cam 18 ReadingTest 02 Cam 18 ReadingTest 04",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test3Listening: IELTSMockTest = {
  "id": "cambridge-18-test-3-listening",
  "book": 18,
  "testNumber": 3,
  "module": "listening",
  "title": "Cambridge 18 Academic Listening Test 3",
  "durationMinutes": 35,
  "audioUrl": "/audio/cam18-test3-part1.mp3",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Listening Part 1",
      "subtitle": "Complete the form below.",
      "audioUrl": "/audio/cam18-test3-part1.mp3",
      "questionGroups": [
        {
          "id": "l-part1-g1-1-4",
          "type": "form_completion",
          "title": "Questions 1-4",
          "instructions": "Complete the form below. Write ONE WORD AND/OR A NUMBER for each answer. Wayside Camera Clubmembership form",
          "clozeTemplate": "Complete the form below.\nWrite ONE WORD AND/OR A NUMBER for each answer.\nWayside Camera Clubmembership form\nName:   Dan Green\nEmail address:   dan1068@market.com\nHome address:   52 {{1}} Street, Peacetown\nHeard about us:   from a {{2}}\nReasons for joining:   to enter competitions to {{3}}\nType of membership:   {{4}} membership (£30)\nComplete the table below.\nWrite NO MORE THAN TWO WORDS for each answer.\nPhotography competitions\nTitle of competition\nInstructions\nFeedback to Dan\n5 ‘………………’\nA scene in the home\nThe picture’s composition was not good.\n‘Beautiful Sunsets’\nScene must show some {{6}}\nThe {{7}} was wrong.\n8 ‘………………’\nScene must show {{9}}\nThe photograph was too {{10}} .",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Email address   dan1068@market.com: Home address:   52 [ 1 ] Street, Peacetown",
              "correctAnswer": "Marrowfield",
              "explanation": "Official Cambridge answer: Marrowfield"
            },
            {
              "questionNumber": 2,
              "prompt": "Email address   dan1068@market.com: Heard about us:   from a [ 2 ]",
              "correctAnswer": "relative",
              "explanation": "Official Cambridge answer: relative"
            },
            {
              "questionNumber": 3,
              "prompt": "Email address   dan1068@market.com: Reasons for joining:   to enter competitions to [ 3 ]",
              "correctAnswer": "socialise / socialize",
              "explanation": "Official Cambridge answer: socialise / socialize"
            },
            {
              "questionNumber": 4,
              "prompt": "Email address   dan1068@market.com: Type of membership:   [ 4 ] membership (£30)",
              "correctAnswer": "full",
              "explanation": "Official Cambridge answer: full"
            }
          ]
        },
        {
          "id": "l-part1-g2-5-10",
          "type": "table_completion",
          "title": "Questions 5-10",
          "instructions": "Complete the table below. Write NO MORE THAN TWO WORDS for each answer. Photography competitions",
          "questions": [
            {
              "questionNumber": 5,
              "prompt": "‘………………’",
              "options": [
                "A scene in the home"
              ],
              "correctAnswer": "Domestic Life",
              "explanation": "Official Cambridge answer: Domestic Life"
            },
            {
              "questionNumber": 6,
              "prompt": "‘Beautiful Sunsets’: Scene must show some [ 6 ]",
              "correctAnswer": "clouds",
              "explanation": "Official Cambridge answer: clouds"
            },
            {
              "questionNumber": 7,
              "prompt": "‘Beautiful Sunsets’: The [ 7 ] was wrong.",
              "correctAnswer": "timing",
              "explanation": "Official Cambridge answer: timing"
            },
            {
              "questionNumber": 8,
              "prompt": "‘………………’",
              "correctAnswer": "Animal Magic",
              "explanation": "Official Cambridge answer: Animal Magic"
            },
            {
              "questionNumber": 9,
              "prompt": "‘Beautiful Sunsets’: Scene must show [ 9 ]",
              "correctAnswer": "(animal) movement",
              "explanation": "Official Cambridge answer: (animal) movement"
            },
            {
              "questionNumber": 10,
              "prompt": "‘Beautiful Sunsets’: The photograph was too [ 10 ] .",
              "correctAnswer": "dark",
              "explanation": "Official Cambridge answer: dark"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Listening Part 2",
      "subtitle": "Choose TWO letters, A-E.",
      "audioUrl": "/audio/cam18-test3-part2.mp3",
      "questionGroups": [
        {
          "id": "l-part2-g1-11-12",
          "type": "multiple_choice_multi",
          "title": "Questions 11 and 12",
          "instructions": "Choose TWO letters, A-E. Which TWO warnings does Dan give about picking mushrooms? A   Don’t pick more than one variety of mushroom at a time.",
          "questions": [
            {
              "questionNumber": 11,
              "prompt": "Which TWO warnings does Dan give about picking mushrooms? (First choice)",
              "options": [
                "A   Don’t pick more than one variety of mushroom at a time.",
                "B   Don’t pick mushrooms near busy roads.",
                "C   Don’t eat mushrooms given to you.",
                "D   Don’t eat mushrooms while picking them.",
                "E   Don’t pick old mushrooms."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 12,
              "prompt": "Which TWO warnings does Dan give about picking mushrooms? (Second choice)",
              "options": [
                "A   Don’t pick more than one variety of mushroom at a time.",
                "B   Don’t pick mushrooms near busy roads.",
                "C   Don’t eat mushrooms given to you.",
                "D   Don’t eat mushrooms while picking them.",
                "E   Don’t pick old mushrooms."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        },
        {
          "id": "l-part2-g2-13-14",
          "type": "multiple_choice_multi",
          "title": "Questions 13 and 14",
          "instructions": "Choose TWO letters, A-E. Which TWO ideas about wild mushrooms does Dan say are correct? A   Mushrooms should always be peeled before eating.",
          "questions": [
            {
              "questionNumber": 13,
              "prompt": "Which TWO ideas about wild mushrooms does Dan say are correct? (First choice)",
              "options": [
                "A   Mushrooms should always be peeled before eating.",
                "B   Mushrooms eaten by animals may be unsafe.",
                "C   Cooking destroys toxins in mushrooms.",
                "D   Brightly coloured mushrooms can be edible.",
                "E   All poisonous mushrooms have a bad smell."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 14,
              "prompt": "Which TWO ideas about wild mushrooms does Dan say are correct? (Second choice)",
              "options": [
                "A   Mushrooms should always be peeled before eating.",
                "B   Mushrooms eaten by animals may be unsafe.",
                "C   Cooking destroys toxins in mushrooms.",
                "D   Brightly coloured mushrooms can be edible.",
                "E   All poisonous mushrooms have a bad smell."
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "l-part2-g3-15-20",
          "type": "multiple_choice",
          "title": "Questions 15-20",
          "instructions": "Choose the correct letter, A, B or C. A   Choose wooded areas.",
          "questions": [
            {
              "questionNumber": 15,
              "prompt": "What advice does Dan give about picking mushrooms in parks?",
              "options": [
                "A   Choose wooded areas.",
                "B   Don’t disturb wildlife.",
                "C   Get there early."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 16,
              "prompt": "Dan says it is a good idea for beginners to",
              "options": [
                "A   use a mushroom app.",
                "B   join a group.",
                "C   take a reference book."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 17,
              "prompt": "What does Dan say is important for conservation?",
              "options": [
                "A   selecting only fully grown mushrooms",
                "B   picking a limited amount of mushrooms",
                "C   avoiding areas where rare mushroom species grow"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 18,
              "prompt": "According to Dan, some varieties of wild mushrooms are in decline because there is",
              "options": [
                "A   a huge demand for them from restaurants.",
                "B   a lack of rain in this part of the country.",
                "C   a rise in building developments locally."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 19,
              "prompt": "Dan says that when storing mushrooms, people should",
              "options": [
                "A   keep them in the fridge for no more than two days.",
                "B   keep them in a brown bag in a dark room.",
                "C   leave them for a period after washing them."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 20,
              "prompt": "What does Dan say about trying new varieties of mushrooms?",
              "options": [
                "A   Experiment with different recipes.",
                "B   Expect some to have a strong taste.",
                "C   Cook them for a long time."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Listening Part 3",
      "subtitle": "Choose TWO letters, A-E.",
      "audioUrl": "/audio/cam18-test3-part3.mp3",
      "questionGroups": [
        {
          "id": "l-part3-g1-21-22",
          "type": "multiple_choice_multi",
          "title": "Questions 21 and 22",
          "instructions": "Choose TWO letters, A-E. Which TWO opinions about the Luddites do the students express? A   Their actions were ineffective.",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "Which TWO opinions about the Luddites do the students express? (First choice)",
              "options": [
                "A   Their actions were ineffective.",
                "B   They are still influential today.",
                "C   They have received unfair criticism.",
                "D   They were proved right.",
                "E   Their attitude is understandable."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 22,
              "prompt": "Which TWO opinions about the Luddites do the students express? (Second choice)",
              "options": [
                "A   Their actions were ineffective.",
                "B   They are still influential today.",
                "C   They have received unfair criticism.",
                "D   They were proved right.",
                "E   Their attitude is understandable."
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            }
          ]
        },
        {
          "id": "l-part3-g2-21-22",
          "type": "multiple_choice_multi",
          "title": "Questions 21 and 22",
          "instructions": "Choose TWO letters, A-E. Which TWO predictions about the future of work are the students doubtful about? A   Work will be more rewarding.",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "Which TWO predictions about the future of work are the students doubtful about? (First choice)",
              "options": [
                "A   Work will be more rewarding.",
                "B   Unemployment will fall.",
                "C   People will want to delay retiring.",
                "D   Working hours will be shorter.",
                "E   People will change jobs more frequently."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 22,
              "prompt": "Which TWO predictions about the future of work are the students doubtful about? (Second choice)",
              "options": [
                "A   Work will be more rewarding.",
                "B   Unemployment will fall.",
                "C   People will want to delay retiring.",
                "D   Working hours will be shorter.",
                "E   People will change jobs more frequently."
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            }
          ]
        },
        {
          "id": "l-part3-g3-25-30",
          "type": "multiple_choice",
          "title": "Questions 25-30",
          "instructions": "What comment do the students make about each of the following jobs? Choose SIX answers from the box and write the correct letter, A-G, next to Questions 25-30. Comments",
          "questions": [
            {
              "questionNumber": 25,
              "prompt": "Accountants   ……………",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "G",
              "explanation": "Official Cambridge answer: G"
            },
            {
              "questionNumber": 26,
              "prompt": "Hairdressers   ……………",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            },
            {
              "questionNumber": 27,
              "prompt": "Administrative staff   ……………",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 28,
              "prompt": "Agricultural workers   ……………",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 29,
              "prompt": "Care workers   ……………",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            },
            {
              "questionNumber": 30,
              "prompt": "Bank clerks   …………… ",
              "options": [
                "A   These jobs are likely to be at risk.",
                "B   Their role has become more interesting in recent years.",
                "C   The number of people working in this sector has fallen dramatically.",
                "D   This job will require more qualifications.",
                "E   Higher disposable income has led to a huge increase in jobs.",
                "F   There is likely to be a significant rise in demand for this service.",
                "G   Both employment and productivity have risen."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 4,
      "title": "Listening Part 4",
      "subtitle": "Complete the notes below.",
      "audioUrl": "/audio/cam18-test3-part4.mp3",
      "questionGroups": [
        {
          "id": "l-part4-g1-31-40",
          "type": "form_completion",
          "title": "Questions 31-40",
          "instructions": "Complete the notes below. Write ONE WORD ONLY for each answer. Space Traffic Management",
          "clozeTemplate": "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\nSpace Traffic Management\nA Space Traffic Management system\n●   is a concept similar to Air Traffic Control, but for satellites rather than planes.\n●   would aim to set up legal and {{31}} ways of improving safety.\n●   does not actually exist at present.\nProblems in developing effective Space Traffic Management\n●   Satellites are now quite {{32}} and therefore more widespread (e.g. there are constellations made up of {{33}} of satellites).\n●   At present, satellites are not required to transmit information to help with their {{34}} .\n●   There are few systems for {{35}} satellites.\n●   Small pieces of debris may be difficult to identify.\n●   Operators may be unwilling to share details of satellites used for {{36}} or commercial reasons.\n●   It may be hard to collect details of the object’s {{37}} at a given time.\n●   Scientists can only make a {{38}} about where the satellite will go.\nSolutions\n●   Common standards should be agreed on for the presentation of information.\n●   The information should be combined in one {{39}} .\n●   A coordinated system must be designed to create {{40}} in its users.\nCam 18 Listening Test 02\nCam 18 Listening Test 04",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "Space Traffic Management: would aim to set up legal and [ 31 ] ways of improving safety.",
              "correctAnswer": "technical",
              "explanation": "Official Cambridge answer: technical"
            },
            {
              "questionNumber": 32,
              "prompt": "does not actually exist at present.: Satellites are now quite [ 32 ] and therefore more widespread (e.g.",
              "correctAnswer": "cheap",
              "explanation": "Official Cambridge answer: cheap"
            },
            {
              "questionNumber": 33,
              "prompt": "does not actually exist at present.: there are constellations made up of [ 33 ] of satellites).",
              "correctAnswer": "thousands",
              "explanation": "Official Cambridge answer: thousands"
            },
            {
              "questionNumber": 34,
              "prompt": "does not actually exist at present.: At present, satellites are not required to transmit information to help with their [ 34 ] .",
              "correctAnswer": "identification",
              "explanation": "Official Cambridge answer: identification"
            },
            {
              "questionNumber": 35,
              "prompt": "does not actually exist at present.: There are few systems for [ 35 ] satellites.",
              "correctAnswer": "tracking",
              "explanation": "Official Cambridge answer: tracking"
            },
            {
              "questionNumber": 36,
              "prompt": "does not actually exist at present.: Operators may be unwilling to share details of satellites used for [ 36 ] or commercial reasons.",
              "correctAnswer": "military",
              "explanation": "Official Cambridge answer: military"
            },
            {
              "questionNumber": 37,
              "prompt": "does not actually exist at present.: It may be hard to collect details of the object’s [ 37 ] at a given time.",
              "correctAnswer": "location",
              "explanation": "Official Cambridge answer: location"
            },
            {
              "questionNumber": 38,
              "prompt": "does not actually exist at present.: Scientists can only make a [ 38 ] about where the satellite will go.",
              "correctAnswer": "prediction",
              "explanation": "Official Cambridge answer: prediction"
            },
            {
              "questionNumber": 39,
              "prompt": "Solutions: The information should be combined in one [ 39 ] .",
              "correctAnswer": "database",
              "explanation": "Official Cambridge answer: database"
            },
            {
              "questionNumber": 40,
              "prompt": "Solutions: A coordinated system must be designed to create [ 40 ] in its users.",
              "correctAnswer": "trust",
              "explanation": "Official Cambridge answer: trust"
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test4Reading: IELTSMockTest = {
  "id": "cambridge-18-test-4-reading",
  "book": 18,
  "testNumber": 4,
  "module": "reading",
  "title": "Cambridge 18 Academic Reading Test 4",
  "durationMinutes": 60,
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Reading Passage 1",
      "subtitle": "A",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">A</h2>\n      <p>Rooftops covered with grass, vegetable gardens and lush foliage are now a common sight in many cities around the world. More and more private companies and city authorities are investing in green roofs, drawn to their wide-ranging benefits. Among the benefits are saving on energy costs, mitigating the risk of floods, making habitats for urban wildlife, tackling air pollution and even growing food. These increasingly radical urban designs can help cities adapt to the monumental problems they face, such as access to resources and a lack of green space due to development. But the involvement of city authorities, businesses and other institutions is crucial to ensuring their success – as is research investigating different options to suit the variety of rooftop spaces found in cities. The UK is relatively new to developing green roofs, and local governments and institutions are playing a major role in spreading the practice. London is home to much of the UK’s green roof market, mainly due to forward-thinking policies such as the London Plan, which has paved the way to more than doubling the area of green roofs in the capital.</p>\n<p>B</p>\n<p>Ongoing research is showcasing how green roofs in cities can integrate with ‘living walls’: environmentally friendly walls which are partially or completely covered with greenery, including a growing medium, such as soil or water. Research also indicates that green roofs can be integrated with drainage systems on the ground, such as street trees, so that the water is managed better and the built environment is made more sustainable. There is also evidence to demonstrate the social value of green roofs. Doctors are increasingly prescribing time spent gardening outdoors for patients dealing with anxiety and depression. And research has found that access to even the most basic green spaces can provide a better quality of life for dementia sufferers and help people avoid obesity.</p>\n<p>C</p>\n<p>In North America, green roofs have become mainstream, with a wide array of expansive, accessible and food-producing roofs installed in buildings. Again, city leaders and authorities have helped push the movement forward – only recently, San Francisco, USA, created a policy requiring new buildings to have green roofs. Toronto, Canada, has policies dating from the 1990s, encouraging the development of urban farms on rooftops. These countries also benefit from having newer buildings than in many parts of the world, which makes it easier to install green roofs. Being able to keep enough water at roof height and distribute it right across the rooftop is crucial to maintaining the plants on any green roof – especially on ‘edible roofs’ where fruit and vegetables are farmed. And it’s much easier to do this in newer buildings, which can typically hold greater weight, than to retro-fit old ones. Having a stronger roof also makes it easier to grow a greater variety of plants, since the soil can be deeper.</p>\n<p>D</p>\n<p>For green roofs to become the norm for new developments, there needs to be support from public authorities and private investors. Those responsible for maintaining buildings may have to acquire new skills, such as landscaping, and in some cases, volunteers may be needed to help out. Other considerations include installing drainage paths, meeting health and safety requirements and perhaps allowing access for the public, as well as planning restrictions and disruption from regular activities in and around the buildings during installation. To convince investors and developers that installing green roofs is worthwhile, economic arguments are still the most important. The term ‘natural capital’ has been developed to explain the economic value of nature; for example, measuring the money saved by installing natural solutions to protect against flood damage, adapt to climate change or help people lead healthier and happier lives.</p>\n<p>E</p>\n<p>As the expertise about green roofs grows, official standards have been developed to ensure that they are designed, constructed and maintained properly, and function well. Improvements in the science and technology underpinning green roof development have also led to new variations in the concept. For example, ‘blue roofs’ enable buildings to hold water over longer periods of time, rather than draining it away quickly - crucial in times of heavier rainfall. There are also combinations of green roofs with solar panels, and ‘brown roofs’ which are wilder in nature and maximise biodiversity. If the trend continues, it could create new jobs and a more vibrant and sustainable local food economy - alongside many other benefits. There are still barriers to overcome, but the evidence so far indicates that green roofs have the potential to transform cities and help them function sustainably long into the future. The success stories need to be studied and replicated elsewhere, to make green, blue, brown and food-producing roofs the norm in cities around the world.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec1-g1-1-5",
          "type": "matching_information",
          "title": "Questions 1-5",
          "instructions": "Which paragraph contains the following information? Write the correct letter, A-E, in boxes 1-5 on your answer sheet. NB   You may use any letter more than once.",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "mention of several challenges to be overcome before a green roof can be installed",
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 2,
              "prompt": "reference to a city where green roofs have been promoted for many years",
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 3,
              "prompt": "a belief that existing green roofs should be used as a model for new ones",
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            },
            {
              "questionNumber": 4,
              "prompt": "examples of how green roofs can work in combination with other green urban initiatives",
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 5,
              "prompt": "the need to make a persuasive argument for the financial benefits of green roofs",
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "r-sec1-g2-6-9",
          "type": "summary_completion",
          "title": "Questions 6-9",
          "instructions": "Complete the summary below. Choose ONE WORD ONLY from the passage for each answer. Write your answers in boxes 6-9 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 6,
              "prompt": "Advantages of green roofs: These include lessening the likelihood that floods will occur, reducing how much money is spent on [ 6 ] and creating environments that are suitable for wildlife.",
              "correctAnswer": "energy",
              "explanation": "Official Cambridge answer: energy"
            },
            {
              "questionNumber": 7,
              "prompt": "Advantages of green roofs: In many cases, they can also be used for producing [ 7 ] .",
              "correctAnswer": "food",
              "explanation": "Official Cambridge answer: food"
            },
            {
              "questionNumber": 8,
              "prompt": "Advantages of green roofs: For example, the medical profession recommends [ 8 ] as an activity to help people cope with mental health issues.",
              "correctAnswer": "gardening",
              "explanation": "Official Cambridge answer: gardening"
            },
            {
              "questionNumber": 9,
              "prompt": "Advantages of green roofs: Studies have also shown that the availability of green spaces can prevent physical problems such as [ 9 ] .",
              "correctAnswer": "obesity",
              "explanation": "Official Cambridge answer: obesity"
            }
          ]
        },
        {
          "id": "r-sec1-g3-10-11",
          "type": "multiple_choice_multi",
          "title": "Questions 10 and 11",
          "instructions": "Choose TWO letters, A-E. Write the correct letters in boxes 10 and 11 on your answer sheet. Which TWO advantages of using newer buildings for green roofs are mentioned in Paragraph C of the passage?",
          "questions": [
            {
              "questionNumber": 10,
              "prompt": "Which TWO advantages of using newer buildings for green roofs are mentioned in Paragraph C of the passage? (First choice)",
              "options": [
                "A   a longer growing season for edible produce",
                "B   more economical use of water",
                "C   greater water-storage capacity",
                "D   ability to cultivate more plant types",
                "E   a large surface area for growing plants"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 11,
              "prompt": "Which TWO advantages of using newer buildings for green roofs are mentioned in Paragraph C of the passage? (Second choice)",
              "options": [
                "A   a longer growing season for edible produce",
                "B   more economical use of water",
                "C   greater water-storage capacity",
                "D   ability to cultivate more plant types",
                "E   a large surface area for growing plants"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "r-sec1-g4-12-13",
          "type": "multiple_choice_multi",
          "title": "Questions 12 and 13",
          "instructions": "Choose TWO letters, A-E. Write the correct letters in boxes 12 and 13 on your answer sheet. Which TWO aims of new variations on the concept of green roofs are mentioned in Paragraph E of the passage?",
          "questions": [
            {
              "questionNumber": 12,
              "prompt": "Which TWO aims of new variations on the concept of green roofs are mentioned in Paragraph E of the passage? (First choice)",
              "options": [
                "A   to provide habitats for a wide range of species",
                "B   to grow plants successfully even in the wettest climates",
                "C   to regulate the temperature of the immediate environment",
                "D   to generate power from a sustainable source",
                "E   to collect water to supply other buildings"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 13,
              "prompt": "Which TWO aims of new variations on the concept of green roofs are mentioned in Paragraph E of the passage? (Second choice)",
              "options": [
                "A   to provide habitats for a wide range of species",
                "B   to grow plants successfully even in the wettest climates",
                "C   to regulate the temperature of the immediate environment",
                "D   to generate power from a sustainable source",
                "E   to collect water to supply other buildings"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Reading Passage 2",
      "subtitle": "The growth mindset",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">The growth mindset</h2>\n      <p>Over the past century, a powerful idea has taken root in the educational landscape. The concept of intelligence as something innate has been supplanted by the idea that intelligence is not fixed, and that, with the right training, we can be the authors of our own cognitive capabilities. Psychologist Alfred Binet, the developer of the first intelligence tests, was one of many 19th-century scientists who held that earlier view and sought to quantify cognitive ability. Then, in the early 20th century, progressive thinkers revolted against the notion that inherent ability is destiny. Instead, educators such as John Dewey argued that every child’s intelligence could be developed, given the right environment.</p>\n<p>‘Growth mindset theory’ is a relatively new – and extremely popular – version of this idea. In many schools today you will see hallways covered in motivational posters and hear speeches on the mindset of great sporting heroes who simply believed their way to the top. A major focus of the growth mindset in schools is coaxing students away from seeing failure as an indication of their ability, and towards seeing it as a chance to improve that ability. As educationalist Jeff Howard noted several decades ago: ‘Smart is not something that you just are, smart is something that you can get.’</p>\n<p>The idea of the growth mindset is based on the work of psychologist Carol Dweck in California in the 1990s. In one key experiment, Dweck divided a group of 10- to 12-year-olds into two groups. All were told that they had achieved a high score on a test but the first group were praised for their intelligence in achieving this, while the others were praised for their effort. The second group – those who had been instilled with a ‘growth mindset’ – were subsequently far more likely to put effort into future tasks. Meanwhile, the former took on only those tasks that would not risk their sense of worth. This group had inferred that success or failure is due to innate ability, and this ‘fixed mindset’ had led them to fear of failure and lack of effort. Praising ability actually made the students perform worse, while praising effort emphasised that change was possible.</p>\n<p>One of the greatest impediments to successfully implementing a growth mindset, however, is the education system itself: in many parts of the world, the school climate is obsessed with performance in the form of constant testing, analysing and ranking of students – a key characteristic of the fixed mindset. Nor is it unusual for schools to create a certain cognitive dissonance, when they applaud the benefits of a growth mindset but then hand out fixed target grades in lessons based on performance.</p>\n<p>Aside from the implementation problem, the original growth mindset research has also received harsh criticism. The statistician Andrew Gelman claims that ‘their research designs have enough degrees of freedom that they could take their data to support just about any theory at all’. Professor of Psychology Timothy Bates, who has been trying to replicate Dweck’s work, is finding that the results are repeatedly null. He notes that: ‘People with a growth mindset don’t cope any better with failure ... Kids with the growth mindset aren’t getting better grades, either before or after our intervention study.’</p>\n<p>Much of this criticism is not lost on Dweck, and she deserves great credit for responding to it and adapting her work accordingly. In fact, she argues that her work has been misunderstood and misapplied in a range of ways. She has also expressed concerns that her theories are being misappropriated in schools by being conflated with the self-esteem movement: ‘For me the growth mindset is a tool for learning and improvement. It’s not just a vehicle for making children feel good.’</p>\n<p>But there is another factor at work here. The failure to translate the growth mindset into the classroom might reflect a misunderstanding of the nature of teaching and learning itself. Growth mindset supporters David Yeager and Gregory Walton claim that interventions should be delivered in a subtle way to maximise their effectiveness. They say that if adolescents perceive a teacher’s intervention as conveying that they are in need of help, this could undo its intended effects.</p>\n<p><span class=\"font-bold text-indigo-700 font-sans mr-2 text-base\">[A]</span>lot of what drives students is their innate beliefs and how they perceive themselves. There is a strong correlation between self-perception and achievement, but there is evidence to suggest that the actual effect of achievement on self-perception is stronger than the other way round. To stand up in a classroom and successfully deliver a good speech is a genuine achievement, and that is likely to be more powerfully motivating than vague notions of ‘motivation’ itself.</p>\n<p>Recent evidence would suggest that growth mindset interventions are not the elixir of student learning that its proponents claim it to be. The growth mindset appears to be a viable construct in the lab, which, when administered in the classroom via targeted interventions, doesn’t seem to work. It is hard to dispute that having faith in the capacity to change is a good attribute for students. Paradoxically, however, that aspiration is not well served by direct interventions that try to instil it.</p>\n<p>Motivational posters and talks are often a waste of time, and might well give students a deluded notion of what success actually means. Teaching concrete skills such as how to write an effective introduction to an essay then praising students’ effort in getting there is probably a far better way of improving confidence than telling them how unique they are, or indeed how capable they are of changing their own brains. Perhaps growth mindset works best as a philosophy and not an intervention.</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec2-g1-14-16",
          "type": "multiple_choice",
          "title": "Questions 14-16",
          "instructions": "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 14-16 on your answer sheet",
          "questions": [
            {
              "questionNumber": 14,
              "prompt": "What can we learn from the first paragraph?",
              "options": [
                "A   where the notion of innate intelligence first began",
                "B   when ideas about the nature of intelligence began to shift",
                "C   how scientists have responded to changing views of intelligence",
                "D   why thinkers turned away from the idea of intelligence being fixed"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 15,
              "prompt": "The second paragraph describes how schools encourage students to",
              "options": [
                "A   identify their personal ambitions.",
                "B   help each other to realise their goals.",
                "C   have confidence in their potential to succeed.",
                "D   concentrate on where their particular strengths lie."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 16,
              "prompt": "In the third paragraph, the writer suggests that students with a fixed mindset",
              "options": [
                "A   tend to be less competitive.",
                "B   generally have a low sense of self-esteem.",
                "C   will only work hard if they are given constant encouragement.",
                "D   are afraid to push themselves beyond what they see as their limitations."
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "r-sec2-g2-17-22",
          "type": "matching_information",
          "title": "Questions 17-22",
          "instructions": "Look at the following statements (Questions 17-22) and the list of people below. Match each statement with the correct person or people, A-E. Write the correct letter, A-E, in boxes 17-22 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 17,
              "prompt": "The methodology behind the growth mindset studies was not strict enough.",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 18,
              "prompt": "The idea of the growth mindset has been incorrectly interpreted.",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 19,
              "prompt": "Intellectual ability is an unchangeable feature of each individual.",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 20,
              "prompt": "The growth mindset should be promoted without students being aware of it.",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            },
            {
              "questionNumber": 21,
              "prompt": "The growth mindset is not simply about boosting students’ morale.",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 22,
              "prompt": "Research shows that the growth mindset has no effect on academic achievement. List of People",
              "options": [
                "A   Alfred Binet",
                "B   Carol Dweck",
                "C   Andrew Gelman",
                "D   Timothy Bates",
                "E   David Yeager and Gregory Walton"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "r-sec2-g3-23-26",
          "type": "yes_no_not_given",
          "title": "Questions 23-26",
          "instructions": "Do the following statements agree with the views of the writer in Reading Passage 2? In boxes 23-26 on your answer sheet, write YES                 if the statement agrees with the views of the writer",
          "questions": [
            {
              "questionNumber": 23,
              "prompt": "Dweck has handled criticisms of her work in an admirable way.",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            },
            {
              "questionNumber": 24,
              "prompt": "Students’ self-perception is a more effective driver of self-confidence than actual achievement is.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            },
            {
              "questionNumber": 25,
              "prompt": "Recent evidence about growth mindset interventions has attracted unfair coverage in the media.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 26,
              "prompt": "Deliberate attempts to encourage students to strive for high achievement may have a negative effect. ",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Reading Passage 3",
      "subtitle": "Introduction",
      "passageContent": "\n    <div class=\"space-y-4 text-slate-800 leading-relaxed font-serif\">\n      <h2 class=\"text-xl font-bold text-slate-900 font-sans mb-4\">Introduction</h2>\n      <p>This is a book about the life and scientific work of Alfred Wegener, whose reputation today rests with his theory of continental displacements, better known as ‘continental drift’. Wegener proposed this theory in 1912 and developed it extensively for nearly 20 years. His book on the subject, The Origin of Continents and Oceans, went through four editions and was the focus of an international controversy in his lifetime and for some years after his death.</p>\n<p>Wegener’s basic idea was that many mysteries about the Earth’s history could be solved if one supposed that the continents moved laterally, rather than supposing that they remained fixed in place. Wegener showed in great detail how such continental movements were plausible and how they worked, using evidence from a large number of sciences including geology, geophysics, paleontology, and climatology. Wegener’s idea – that the continents move – is at the heart of the theory that guides Earth sciences today: namely plate tectonics. Plate tectonics is in many respects quite different from Wegener’s proposal, in the same way that modern evolutionary theory is very different from the ideas Charles Darwin proposed in the 1850s about biological evolution. Yet plate tectonics is a descendant of Alfred Wegener’s theory of continental drift, in quite the same way that modern evolutionary theory is a descendant of Darwin’s theory of natural selection.</p>\n<p>When I started writing about Wegener’s life and work, one of the most intriguing things about him for me was that, although he came up with a theory on continental drift, he was not a geologist. He trained as an astronomer and pursued a career in atmospheric physics. When he proposed the theory of continental displacements in 1912, he was a lecturer in physics and astronomy at the University of Marburg, in southern Germany. However, he was not an ‘unknown’. In 1906 he had set a world record (with his brother Kurt) for time aloft in a hot-air balloon: 52 hours. Between 1906 and 1908 he had taken part in a highly publicized and extremely dangerous expedition to the coast of northeast Greenland. He had also made a name for himself amongst a small circle of meteorologists and atmospheric physicists in Germany as the author of a textbook, Thermodynamics of the Atmosphere (1911), and of a number of interesting scientific papers.</p>\n<p>As important as Wegener’s work on continental drift has turned out to be, it was largely a sideline to his interest in atmospheric physics, geophysics, and paleoclimatology*, and thus I have been at great pains to put Wegener’s work on continental drift in the larger context of his other scientific work, and in the even larger context of atmospheric sciences in his lifetime. This is a ‘continental drift book’ only to the extent that Wegener was interested in that topic and later became famous for it. My treatment of his other scientific work is no less detailed, though I certainly have devoted more attention to the reception of his ideas on continental displacement, as they were much more controversial than his other work.</p>\n<p>Readers interested in the specific detail of Wegener’s career will see that he often stopped pursuing a given line of investigation (sometimes for years on end), only to pick it up later. I have tried to provide guideposts to his rapidly shifting interests by characterizing different phases of his life as careers in different sciences, which is reflected in the titles of the chapters. Thus, the index should be a sufficient guide for those interested in a particular aspect of Wegener’s life but perhaps not all of it. My own feeling, however, is that the parts do not make as much sense on their own as do all of his activities taken together. In this respect I urge readers to try to experience Wegener’s life as he lived it, with all the interruptions, changes of mind, and renewed efforts this entailed.</p>\n<p>Wegener left behind a few published works but, as was standard practice, these reported the results of his work - not the journey he took to reach that point. Only a few hundred of the many thousands of letters he wrote and received in his lifetime have survived and he didn’t keep notebooks or diaries that recorded his life and activities. He was not active (with a few exceptions) in scientific societies, and did not seek to find influence or advance his ideas through professional contacts and politics, spending most of his time at home in his study reading and writing, or in the field collecting observations.</p>\n<p>Some famous scientists, such as Newton, Darwin, and Einstein, left mountains of written material behind, hundreds of notebooks and letters numbering in the tens of thousands. Others, like Michael Faraday, left extensive journals of their thoughts and speculations, parallel to their scientific notebooks. The more such material a scientist leaves behind, the better chance a biographer has of forming an accurate picture of how a scientist’s ideas took shape and evolved.</p>\n<p>I am firmly of the opinion that most of us, Wegener included, are not in any real sense the authors of our own lives. We plan, think, and act, often with apparent freedom, but most of the time our lives ‘happen to us’, and we only retrospectively turn this happenstance into a coherent narrative of fulfilled intentions. This book, therefore, is a story both of the life and scientific work that Alfred Wegener planned and intended and of the life and scientific work that actually ‘happened to him’. These are, as I think you will soon see, not always the same thing.</p>\n<p>-------------</p>\n<p>* Paleoclimatology – The study of past climates</p>\n    </div>\n  ",
      "questionGroups": [
        {
          "id": "r-sec3-g1-27-30",
          "type": "yes_no_not_given",
          "title": "Questions 27-30",
          "instructions": "Do the following statements agree with the claims of the writer in Reading Passage 3? In boxes 27-30 on your answer sheet, write YES                 if the statement agrees with the claims of the writer",
          "questions": [
            {
              "questionNumber": 27,
              "prompt": "Wegener’s ideas about continental drift were widely disputed while he was alive.",
              "correctAnswer": "YES",
              "explanation": "Official Cambridge answer: YES"
            },
            {
              "questionNumber": 28,
              "prompt": "The idea that the continents remained fixed in place was defended in a number of respected scientific publications.",
              "correctAnswer": "NOT GIVEN",
              "explanation": "Official Cambridge answer: NOT GIVEN"
            },
            {
              "questionNumber": 29,
              "prompt": "Wegener relied on a limited range of scientific fields to support his theory of continental drift.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            },
            {
              "questionNumber": 30,
              "prompt": "The similarities between Wegener’s theory of continental drift and modern-day plate tectonics are enormous.",
              "correctAnswer": "NO",
              "explanation": "Official Cambridge answer: NO"
            }
          ]
        },
        {
          "id": "r-sec3-g2-31-36",
          "type": "summary_completion",
          "title": "Questions 31-36",
          "instructions": "Complete the summary using the list of phrases, A-J, below. Write the correct letter, A-J, in boxes 31-36 on your answer sheet. Wegener’s life and work",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "Wegener’s life and work: One of the remarkable things about Wegener from a [ 31 ] is that although he proposed a theory of continental drift, he was not a geologist.",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "I",
              "explanation": "Official Cambridge answer: I"
            },
            {
              "questionNumber": 32,
              "prompt": "Wegener’s life and work: His [ 32 ] were limited to atmospheric physics.",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            },
            {
              "questionNumber": 33,
              "prompt": "Wegener’s life and work: However, at the time he proposed his theory of continental drift in 1912, he was already a person of [ 33 ] .",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 34,
              "prompt": "Wegener’s life and work: Six years previously, there had been his [ 34 ] of 52 hours in a hot-air balloon, followed by his well-publicised but 35………………… of Greenland’s coast.",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 35,
              "prompt": "Wegener’s life and work: Six years previously, there had been his 34………………… of 52 hours in a hot-air balloon, followed by his well-publicised but [ 35 ] of Greenland’s coast.",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "H",
              "explanation": "Official Cambridge answer: H"
            },
            {
              "questionNumber": 36,
              "prompt": "Wegener’s life and work: With the publication of his textbook on thermodynamics, he had also come to the attention of a [ 36 ] of German scientists.",
              "options": [
                "A. modest fame",
                "B. vast range",
                "C   record-breaking achievement",
                "D. research methods",
                "E. select group",
                "F. professional interests",
                "G. scientific debate",
                "H   hazardous exploration     I    biographer’s perspective"
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            }
          ]
        },
        {
          "id": "r-sec3-g3-37-40",
          "type": "multiple_choice",
          "title": "Questions 37-40",
          "instructions": "Choose the correct letter, A, B, C or D. Write the correct letter in boxes 37-40 on your answer sheet.",
          "questions": [
            {
              "questionNumber": 37,
              "prompt": "What is Mott T Greene doing in the fifth paragraph?",
              "options": [
                "A   describing what motivated him to write the book",
                "B   explaining why it is desirable to read the whole book",
                "C   suggesting why Wegener pursued so many different careers",
                "D   indicating what aspects of Wegener’s life interested him most"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 38,
              "prompt": "What is said about Wegener in the sixth paragraph?",
              "options": [
                "A   He was not a particularly ambitious person.",
                "B   He kept a record of all his scientific observations.",
                "C   He did not adopt many of the scientific practices of the time.",
                "D   He enjoyed discussing new discoveries with other scientists."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 39,
              "prompt": "What does Greene say about some other famous scientists?",
              "options": [
                "A   Their published works had a greater impact than Wegener’s did.",
                "B   They had fewer doubts about their scientific ideas than Wegener did.",
                "C   Their scientific ideas were more controversial than Wegener’s.",
                "D   They are easier subjects to write about than Wegener."
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 40,
              "prompt": "What is Greene’s main point in the final paragraph?",
              "options": [
                "A   It is not enough in life to have good intentions.",
                "B   People need to plan carefully if they want to succeed.",
                "C   People have little control over many aspects of their lives.",
                "B   It is important that people ensure they have the freedom to act."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test4Listening: IELTSMockTest = {
  "id": "cambridge-18-test-4-listening",
  "book": 18,
  "testNumber": 4,
  "module": "listening",
  "title": "Cambridge 18 Academic Listening Test 4",
  "durationMinutes": 35,
  "audioUrl": "/audio/cam18-test4-part1.mp3",
  "sections": [
    {
      "sectionNumber": 1,
      "title": "Listening Part 1",
      "subtitle": "Complete the notes below.",
      "audioUrl": "/audio/cam18-test4-part1.mp3",
      "questionGroups": [
        {
          "id": "l-part1-g1-1-10",
          "type": "form_completion",
          "title": "Questions 1-10",
          "instructions": "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer. Job details from employment agency",
          "clozeTemplate": "Complete the notes below.\nWrite ONE WORD AND/OR A NUMBER for each answer.\nJob details from employment agency\nRole     {{1}}\nLocation     Fordham {{2}} Centre\n{{3}} Road, Fordham\nWork involves\n●   dealing with enquiries\n●   making {{4}} and reorganising them\n●   maintaining the internal {{5}}\n●   general administration\nRequirements\n●   {{6}} (essential)\n●   a calm and {{7}} manner\n●   good IT skills\nOther information\n●   a {{8}} job – further opportunities may be available\n●   hours: 7.45 a.m. to {{9}} p.m. Monday to Friday\n●   {{10}} is available onsite",
          "questions": [
            {
              "questionNumber": 1,
              "prompt": "Job details from employment agency: Role     [ 1 ]",
              "correctAnswer": "receptionist",
              "explanation": "Official Cambridge answer: receptionist"
            },
            {
              "questionNumber": 2,
              "prompt": "Job details from employment agency: Location     Fordham [ 2 ] Centre",
              "correctAnswer": "Medical",
              "explanation": "Official Cambridge answer: Medical"
            },
            {
              "questionNumber": 3,
              "prompt": "Job details from employment agency: [ 3 ] Road, Fordham",
              "correctAnswer": "Chastons",
              "explanation": "Official Cambridge answer: Chastons"
            },
            {
              "questionNumber": 4,
              "prompt": "dealing with enquiries: making [ 4 ] and reorganising them",
              "correctAnswer": "appointments",
              "explanation": "Official Cambridge answer: appointments"
            },
            {
              "questionNumber": 5,
              "prompt": "dealing with enquiries: maintaining the internal [ 5 ]",
              "correctAnswer": "database",
              "explanation": "Official Cambridge answer: database"
            },
            {
              "questionNumber": 6,
              "prompt": "Requirements: [ 6 ] (essential)",
              "correctAnswer": "experience",
              "explanation": "Official Cambridge answer: experience"
            },
            {
              "questionNumber": 7,
              "prompt": "Requirements: a calm and [ 7 ] manner",
              "correctAnswer": "confident",
              "explanation": "Official Cambridge answer: confident"
            },
            {
              "questionNumber": 8,
              "prompt": "Other information: a [ 8 ] job – further opportunities may be available",
              "correctAnswer": "temporary",
              "explanation": "Official Cambridge answer: temporary"
            },
            {
              "questionNumber": 9,
              "prompt": "Other information: to [ 9 ] p.m.",
              "correctAnswer": "1.15",
              "explanation": "Official Cambridge answer: 1.15"
            },
            {
              "questionNumber": 10,
              "prompt": "Other information: [ 10 ] is available onsite",
              "correctAnswer": "parking",
              "explanation": "Official Cambridge answer: parking"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 2,
      "title": "Listening Part 2",
      "subtitle": "Choose the correct letter, A, B or C.",
      "audioUrl": "/audio/cam18-test4-part2.mp3",
      "questionGroups": [
        {
          "id": "l-part2-g1-11-14",
          "type": "multiple_choice",
          "title": "Questions 11-14",
          "instructions": "Choose the correct letter, A, B or C. A   a factory.",
          "questions": [
            {
              "questionNumber": 11,
              "prompt": "The museum building was originally",
              "options": [
                "A   a factory.",
                "B   a private home.",
                "C   a hall of residence."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 12,
              "prompt": "The university uses part of the museum building as",
              "options": [
                "A   teaching rooms.",
                "B   a research library.",
                "C   administration offices."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 13,
              "prompt": "What does the guide say about the entrance fee?",
              "options": [
                "A   Visitors decide whether or not they wish to pay.",
                "B   Only children and students receive a discount.",
                "C   The museum charges extra for special exhibitions."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 14,
              "prompt": "What are visitors advised to leave in the cloakroom?",
              "options": [
                "A   cameras",
                "B   coats",
                "C   bags"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        },
        {
          "id": "l-part2-g2-15-20",
          "type": "multiple_choice",
          "title": "Questions 15-20",
          "instructions": "What information does the speaker give about each of the following areas of the museum? Choose SIX answers from the box and write the correct letter, A-H, next to Questions 15-20. Information",
          "questions": [
            {
              "questionNumber": 15,
              "prompt": "Four Seasons   ……………",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            },
            {
              "questionNumber": 16,
              "prompt": "Farmhouse Kitchen   ……………",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "G",
              "explanation": "Official Cambridge answer: G"
            },
            {
              "questionNumber": 17,
              "prompt": "A Year on the Farm   ……………",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "E",
              "explanation": "Official Cambridge answer: E"
            },
            {
              "questionNumber": 18,
              "prompt": "Wagon Walk   ……………",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 19,
              "prompt": "Bees are Magic   ……………",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 20,
              "prompt": "The Pond   …………… ",
              "options": [
                "A   Parents must supervise their children.",
                "B   There are new things to see.",
                "C   It is closed today.",
                "D   This is only for school groups.",
                "E   There is a quiz for visitors.",
                "F   It features something created by students.",
                "G   An expert is here today.",
                "H   There is a one-way system."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 3,
      "title": "Listening Part 3",
      "subtitle": "Choose TWO letters, A-E.",
      "audioUrl": "/audio/cam18-test4-part3.mp3",
      "questionGroups": [
        {
          "id": "l-part3-g1-21-22",
          "type": "multiple_choice_multi",
          "title": "Questions 21 and 22",
          "instructions": "Choose TWO letters, A-E. Which TWO educational skills were shown in the video of children doing origami? A   solving problems",
          "questions": [
            {
              "questionNumber": 21,
              "prompt": "Which TWO educational skills were shown in the video of children doing origami? (First choice)",
              "options": [
                "A   solving problems",
                "B   following instructions",
                "C   working cooperatively",
                "D   learning through play",
                "E   developing hand-eye coordination"
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 22,
              "prompt": "Which TWO educational skills were shown in the video of children doing origami? (Second choice)",
              "options": [
                "A   solving problems",
                "B   following instructions",
                "C   working cooperatively",
                "D   learning through play",
                "E   developing hand-eye coordination"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            }
          ]
        },
        {
          "id": "l-part3-g2-23-27",
          "type": "multiple_choice",
          "title": "Questions 23-27",
          "instructions": "Which comment do the students make about each of the following children in the video? Choose FIVE answers from the box and write the correct letter, A-G, next to Questions 23-27. Comments",
          "questions": [
            {
              "questionNumber": 23,
              "prompt": "Sid   …………",
              "options": [
                "A   demonstrated independence",
                "B   asked for teacher support",
                "C   developed a competitive attitude",
                "D   seemed to find the activity calming",
                "E   seemed pleased with the results",
                "F   seemed confused",
                "G   seemed to find the activity easy"
              ],
              "correctAnswer": "D",
              "explanation": "Official Cambridge answer: D"
            },
            {
              "questionNumber": 24,
              "prompt": "Jack   …………",
              "options": [
                "A   demonstrated independence",
                "B   asked for teacher support",
                "C   developed a competitive attitude",
                "D   seemed to find the activity calming",
                "E   seemed pleased with the results",
                "F   seemed confused",
                "G   seemed to find the activity easy"
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 25,
              "prompt": "Naomi   …………",
              "options": [
                "A   demonstrated independence",
                "B   asked for teacher support",
                "C   developed a competitive attitude",
                "D   seemed to find the activity calming",
                "E   seemed pleased with the results",
                "F   seemed confused",
                "G   seemed to find the activity easy"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            },
            {
              "questionNumber": 26,
              "prompt": "Anya   …………",
              "options": [
                "A   demonstrated independence",
                "B   asked for teacher support",
                "C   developed a competitive attitude",
                "D   seemed to find the activity calming",
                "E   seemed pleased with the results",
                "F   seemed confused",
                "G   seemed to find the activity easy"
              ],
              "correctAnswer": "G",
              "explanation": "Official Cambridge answer: G"
            },
            {
              "questionNumber": 27,
              "prompt": "Zara   …………",
              "options": [
                "A   demonstrated independence",
                "B   asked for teacher support",
                "C   developed a competitive attitude",
                "D   seemed to find the activity calming",
                "E   seemed pleased with the results",
                "F   seemed confused",
                "G   seemed to find the activity easy"
              ],
              "correctAnswer": "F",
              "explanation": "Official Cambridge answer: F"
            }
          ]
        },
        {
          "id": "l-part3-g3-28-30",
          "type": "multiple_choice",
          "title": "Questions 28-30",
          "instructions": "Choose the correct letter, A, B or C. A   make models that demonstrate the different stages.",
          "questions": [
            {
              "questionNumber": 28,
              "prompt": "Before starting an origami activity in class, the students think it is important for the teacher to",
              "options": [
                "A   make models that demonstrate the different stages.",
                "B   check children understand the terminology involved.",
                "C   tell children not to worry if they find the activity difficult."
              ],
              "correctAnswer": "A",
              "explanation": "Official Cambridge answer: A"
            },
            {
              "questionNumber": 29,
              "prompt": "The students agree that some teachers might be unwilling to use origami in class because",
              "options": [
                "A   they may not think that crafts are important.",
                "B   they may not have the necessary skills.",
                "C   they may worry that it will take up too much time."
              ],
              "correctAnswer": "B",
              "explanation": "Official Cambridge answer: B"
            },
            {
              "questionNumber": 30,
              "prompt": "Why do the students decide to use origami in their maths teaching practice?",
              "options": [
                "A   to correct a particular misunderstanding",
                "B   to set a challenge",
                "C   to introduce a new concept"
              ],
              "correctAnswer": "C",
              "explanation": "Official Cambridge answer: C"
            }
          ]
        }
      ]
    },
    {
      "sectionNumber": 4,
      "title": "Listening Part 4",
      "subtitle": "Complete the notes below.",
      "audioUrl": "/audio/cam18-test4-part4.mp3",
      "questionGroups": [
        {
          "id": "l-part4-g1-31-40",
          "type": "form_completion",
          "title": "Questions 31-40",
          "instructions": "Complete the notes below. Write ONE WORD ONLY for each answer. Victor Hugo",
          "clozeTemplate": "Complete the notes below.\nWrite ONE WORD ONLY for each answer.\nVictor Hugo\nHis novel, Les Misérables\n●   It has been adapted for theatre and cinema.\n●   We know more about its overall {{31}} than about its author.\nHis early career\n●   In Paris, his career was successful and he led the Romantic movement.\n●   He spoke publicly about social issues, such as {{32}} and education.\n●   Napoleon III disliked his views and exiled him.\nHis exile from France\n●   Victor Hugo had to live elsewhere in {{33}}\n●   He used his income from the sale of some {{34}} he had written to buy a house on Guernsey.\nHis house on Guernsey\n●   Victor Hugo lived in this house until the end of the Empire in France.\n●   The ground floor contains portraits, {{35}} and tapestries that he valued.\n●   He bought cheap {{36}} made of wood and turned this into beautiful wall carvings.\n●   The first floor consists of furnished areas with wallpaper and {{37}} that have a Chinese design.\n●   The library still contains many of his favourite books.\n●   He wrote in a room at the top of the house that had a view of the {{38}} .\n●   He entertained other writers as well as poor {{39}} in his house.\n●   Victor Hugo’s {{40}} gave ownership of the house to the city of Paris in 1927.\nCam 18 Listening Test 03\nCam 20 Listening Test 01",
          "questions": [
            {
              "questionNumber": 31,
              "prompt": "It has been adapted for theatre and cinema.: We know more about its overall [ 31 ] than about its author.",
              "correctAnswer": "plot",
              "explanation": "Official Cambridge answer: plot"
            },
            {
              "questionNumber": 32,
              "prompt": "His early career: He spoke publicly about social issues, such as [ 32 ] and education.",
              "correctAnswer": "poverty",
              "explanation": "Official Cambridge answer: poverty"
            },
            {
              "questionNumber": 33,
              "prompt": "His exile from France: Victor Hugo had to live elsewhere in [ 33 ]",
              "correctAnswer": "Europe",
              "explanation": "Official Cambridge answer: Europe"
            },
            {
              "questionNumber": 34,
              "prompt": "His exile from France: He used his income from the sale of some [ 34 ] he had written to buy a house on Guernsey.",
              "correctAnswer": "poetry",
              "explanation": "Official Cambridge answer: poetry"
            },
            {
              "questionNumber": 35,
              "prompt": "His house on Guernsey: The ground floor contains portraits, [ 35 ] and tapestries that he valued.",
              "correctAnswer": "drawings",
              "explanation": "Official Cambridge answer: drawings"
            },
            {
              "questionNumber": 36,
              "prompt": "His house on Guernsey: He bought cheap [ 36 ] made of wood and turned this into beautiful wall carvings.",
              "correctAnswer": "furniture",
              "explanation": "Official Cambridge answer: furniture"
            },
            {
              "questionNumber": 37,
              "prompt": "His house on Guernsey: The first floor consists of furnished areas with wallpaper and [ 37 ] that have a Chinese design.",
              "correctAnswer": "lamps",
              "explanation": "Official Cambridge answer: lamps"
            },
            {
              "questionNumber": 38,
              "prompt": "His house on Guernsey: He wrote in a room at the top of the house that had a view of the [ 38 ] .",
              "correctAnswer": "harbour / harbor",
              "explanation": "Official Cambridge answer: harbour / harbor"
            },
            {
              "questionNumber": 39,
              "prompt": "His house on Guernsey: He entertained other writers as well as poor [ 39 ] in his house.",
              "correctAnswer": "children",
              "explanation": "Official Cambridge answer: children"
            },
            {
              "questionNumber": 40,
              "prompt": "His house on Guernsey: Victor Hugo’s [ 40 ] gave ownership of the house to the city of Paris in 1927.",
              "correctAnswer": "relatives",
              "explanation": "Official Cambridge answer: relatives"
            }
          ]
        }
      ]
    }
  ]
};
