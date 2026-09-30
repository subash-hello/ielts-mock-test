import fs from 'fs';

const authenticReading = `export const cambridge18Test1Reading: IELTSMockTest = {
  id: 'cambridge-18-test-1-reading',
  book: 18,
  testNumber: 1,
  module: 'reading',
  title: 'Cambridge 18 Academic Reading Test 1',
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: 'Reading Passage 1',
      subtitle: 'Urban farming',
      passageContent: \`
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            In Paris, urban farmers are trying a soil-free approach to agriculture that uses less space and fewer resources. Could it help cities face the threats to our food supplies?
          </p>
          <p>
            On top of a striking new exhibition hall in southern Paris, the world’s largest urban rooftop farm has started to bear fruit. Strawberries that are small, intensely flavoured and resplendently red sprout abundantly from large plastic tubes. Peer inside and you see the tubes are completely hollow, the roots of dozens of strawberry plants dangling down inside them. From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs, such as basil, sage and peppermint. Opposite, in narrow, horizontal trays packed not with soil but with coconut fibre, grow cherry tomatoes, shiny aubergines and brightly coloured chards.
          </p>
          <p>
            Pascal Hardy, an engineer and sustainable development consultant, began experimenting with vertical farming and aeroponic growing towers – as the soil-free plastic tubes are known – on his Paris apartment block roof five years ago. The urban rooftop space above the exhibition hall is somewhat bigger: 14,000 square metres and almost exactly the size of a couple of football pitches. Already, the team of young urban farmers who tend it have picked, in one day, 3,000 lettuces and 150 punnets of strawberries. When the remaining two thirds of the vast open area are in production, 20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day. ‘We’re not ever, obviously, going to feed the whole city this way,’ cautions Hardy. ‘In the urban environment you’re working with very significant practical constraints, clearly, on what you can do and where. But if enough unused space can be developed like this, there’s no reason why you shouldn’t eventually target maybe between 5% and 10% of consumption.’
          </p>
          <p>
            Perhaps most significantly, however, this is a real-life showcase for the work of Hardy’s flourishing urban agriculture consultancy, Agripolis, which is currently fielding enquiries from around the world to design, build and equip a new breed of soil-free inner-city farm. ‘The method’s advantages are many,’ he says. ‘First, I don’t much like the fact that most of the fruit and vegetables we eat have been treated with something like 17 different pesticides, or that the intensive farming techniques that produced them are such huge generators of greenhouse gases. I don’t much like the fact, either, that they’ve travelled an average of 2,000 refrigerated kilometres to my plate, that their quality is so poor, because the varieties are selected for their capacity to withstand such substantial journeys, or that 80% of the price I pay goes to wholesalers and transport companies, not the producers.’
          </p>
          <p>
            Produce grown using this soil-free method, on the other hand – which relies solely on a small quantity of water, enriched with organic nutrients, pumped around a closed circuit of pipes, towers and trays – is ‘produced up here, and sold locally, just down there. It barely travels at all,’ Hardy says. ‘You can select crop varieties for their flavour, not their resistance to the transport and storage chain, and you can pick them when they’re really at their best, and not before.’ No soil is exhausted, and the water that gently showers the plants’ roots every 12 minutes is recycled, so the method uses 90% less water than a classic intensive farm for the same yield.
          </p>
          <p>
            Urban farming is not, of course, a new phenomenon. Inner-city agriculture is booming from Shanghai to Detroit and Tokyo to Bangkok. Strawberries are being grown in disused shipping containers, mushrooms in underground carparks. Aeroponic farming, he says, is ‘virtuous’. The equipment weighs little, can be installed on almost any flat surface and is cheap to buy: roughly €100 to €150 per square metre. It is cheap to run, too, consuming a tiny fraction of the electricity used by some techniques.
          </p>
          <p>
            Produce grown this way typically sells at prices that, while generally higher than those of classic intensive agriculture, are lower than soil-based organic growers. There are limits to what farmers can grow this way, of course, and much of the produce is suited to the summer months. ‘Root vegetables we cannot do, at least not yet,’ he says. ‘Radishes are OK, but carrots, potatoes, that kind of thing – the roots are simply too long. Fruit trees are obviously not an option. And beans tend to take up a lot of space for not much return.’ Nevertheless, urban farming of the kind being practised in Paris is one part of a bigger and fast-changing picture that is bringing food production closer to our lives.
          </p>
        </div>
      \`,
      questionGroups: [
        {
          id: 'c18-r1-qg1',
          type: 'sentence_completion',
          title: 'Questions 1 – 3',
          instructions: 'Complete the sentences below. Choose NO MORE THAN TWO WORDS AND/OR A NUMBER from the passage for each answer.',
          summaryTitle: 'Urban farming in Paris',
          wordLimitRule: 'NO MORE THAN TWO WORDS AND/OR A NUMBER',
          questions: [
            {
              questionNumber: 1,
              prompt: 'Vertical tubes are used to grow strawberries, [ 1 ] and herbs.',
              correctAnswer: 'lettuces',
              acceptedVariants: ['lettuce'],
              explanation: 'Paragraph 1: "From identical vertical tubes nearby burst row upon row of lettuces; near those are aromatic herbs..."',
              passageEvidence: { paragraph: '1', quote: 'identical vertical tubes nearby burst row upon row of lettuces' }
            },
            {
              questionNumber: 2,
              prompt: 'There will eventually be a daily harvest of as much as [ 2 ] in weight of fruit and vegetables.',
              correctAnswer: '1,000 kg',
              acceptedVariants: ['1000 kg', '1,000kg', '1000kg', 'a ton', 'a tonne'],
              explanation: 'Paragraph 2: "...20 staff will harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day."',
              passageEvidence: { paragraph: '2', quote: 'harvest up to 1,000 kg of perhaps 35 different varieties of fruit and vegetables, every day' }
            },
            {
              questionNumber: 3,
              prompt: 'It may be possible that the farm’s produce will account for as much as 10% of the city’s [ 3 ] overall.',
              correctAnswer: 'consumption',
              acceptedVariants: ['food consumption', '(food) consumption'],
              explanation: 'Paragraph 2: "...there’s no reason why you shouldn’t eventually target maybe between 5% and 10% of consumption."',
              passageEvidence: { paragraph: '2', quote: 'target maybe between 5% and 10% of consumption' }
            }
          ]
        },
        {
          id: 'c18-r1-qg2',
          type: 'table_completion',
          title: 'Questions 4 – 7',
          instructions: 'Complete the table below. Choose ONE WORD ONLY from the passage for each answer.',
          summaryTitle: 'Intensive farming versus aeroponic urban farming',
          wordLimitRule: 'ONE WORD ONLY',
          questions: [
            {
              questionNumber: 4,
              prompt: 'Intensive farming: wide range of [ 4 ] used',
              correctAnswer: 'pesticides',
              acceptedVariants: ['pesticide'],
              explanation: 'Paragraph 3: "...most of the fruit and vegetables we eat have been treated with something like 17 different pesticides..."',
              passageEvidence: { paragraph: '3', quote: 'treated with something like 17 different pesticides' }
            },
            {
              questionNumber: 5,
              prompt: 'Intensive farming: varieties of fruit and vegetables chosen that can survive long [ 5 ]',
              correctAnswer: 'journeys',
              acceptedVariants: ['journey'],
              explanation: 'Paragraph 3: "...selected for their capacity to withstand such substantial journeys..."',
              passageEvidence: { paragraph: '3', quote: 'withstand such substantial journeys' }
            },
            {
              questionNumber: 6,
              prompt: 'Intensive farming: [ 6 ] receive very little of overall income',
              correctAnswer: 'producers',
              acceptedVariants: ['producer'],
              explanation: 'Paragraph 3: "...80% of the price I pay goes to wholesalers and transport companies, not the producers."',
              passageEvidence: { paragraph: '3', quote: 'not the producers' }
            },
            {
              questionNumber: 7,
              prompt: 'Aeroponic urban farming: produce chosen because of its [ 7 ]',
              correctAnswer: 'flavour',
              acceptedVariants: ['flavor'],
              explanation: 'Paragraph 4: "You can select crop varieties for their flavour, not their resistance to the transport and storage chain..."',
              passageEvidence: { paragraph: '4', quote: 'select crop varieties for their flavour' }
            }
          ]
        },
        {
          id: 'c18-r1-qg3',
          type: 'true_false_not_given',
          title: 'Questions 8 – 13',
          instructions: 'Do the following statements agree with the information given in Reading Passage 1? Write TRUE, FALSE, or NOT GIVEN.',
          questions: [
            {
              questionNumber: 8,
              prompt: 'Urban farming can take place above or below ground.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph 5 mentions farming on rooftops ("rooftop farm") as well as "mushrooms in underground carparks", so it takes place both above and below ground.',
              passageEvidence: { paragraph: '5', quote: 'Strawberries are being grown in disused shipping containers, mushrooms in underground carparks.' }
            },
            {
              questionNumber: 9,
              prompt: 'Some of the equipment used in aeroponic farming can be made by hand.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Paragraph 5 mentions equipment weighs little and is cheap to buy, but there is no information about making it by hand.',
              passageEvidence: { paragraph: '5', quote: 'The equipment weighs little, can be installed on almost any flat surface and is cheap to buy' }
            },
            {
              questionNumber: 10,
              prompt: 'Urban farming relies more on electricity than some other types of farming.',
              correctAnswer: 'FALSE',
              explanation: 'Paragraph 5 states aeroponic farming is "cheap to run, too, consuming a tiny fraction of the electricity used by some techniques."',
              passageEvidence: { paragraph: '5', quote: 'consuming a tiny fraction of the electricity used by some techniques' }
            },
            {
              questionNumber: 11,
              prompt: 'Fruit and vegetables grown on an aeroponic urban farm are cheaper than traditionally grown organic produce.',
              correctAnswer: 'TRUE',
              explanation: 'Paragraph 6 states produce sells at prices that "are lower than soil-based organic growers."',
              passageEvidence: { paragraph: '6', quote: 'lower than soil-based organic growers' }
            },
            {
              questionNumber: 12,
              prompt: 'Most produce can be grown on an aeroponic urban farm at any time of the year.',
              correctAnswer: 'FALSE',
              explanation: "Paragraph 6 explicitly notes: \\"...much of the produce is suited to the summer months. 'Root vegetables we cannot do, at least not yet'...\\"",
              passageEvidence: { paragraph: '6', quote: 'much of the produce is suited to the summer months' }
            },
            {
              questionNumber: 13,
              prompt: 'Beans take longer to grow on an urban farm than other vegetables.',
              correctAnswer: 'NOT GIVEN',
              explanation: 'Paragraph 6 mentions that "beans tend to take up a lot of space for not much return", but says nothing about how long they take to grow.',
              passageEvidence: { paragraph: '6', quote: 'beans tend to take up a lot of space for not much return' }
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: 'Reading Passage 2',
      subtitle: 'Forest management in Pennsylvania, USA',
      passageContent: \`
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            How managing low-quality wood (also known as low-use wood) for bioenergy can encourage sustainable forest management
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">A</span>
            A tree’s ‘value’ depends on several factors including its species, size, form, condition, quality, function, and accessibility, and depends on the management goals for a given forest. The same tree can be valued very differently by each person who looks at it. A large, straight black cherry tree has high value as timber to be cut into logs or made into furniture, but for a landowner more interested in wildlife habitat, the real value of that stem (or trunk) may be the food it provides to animals. Likewise, if the tree suffers from black knot disease, its value for timber decreases, but to a woodworker interested in making bowls, it brings an opportunity for a unique and beautiful piece of art.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">B</span>
            In the past, Pennsylvania landowners were solely interested in the value of their trees as high-quality timber. The norm was to remove the stems of highest quality and leave behind poorly formed trees that were not as well suited to the site where they grew. This practice, called ‘high-grading’, has left a legacy of ‘low-use wood’ in the forests. Some people even call these ‘junk trees’, and they are abundant in Pennsylvania. These trees have lower economic value for traditional timber markets, compete for growth with higher-value trees, shade out desirable regeneration and decrease the health of a stand leaving it more vulnerable to poor weather and disease. Management that specifically targets low-use wood can help landowners manage these forest health issues, and wood energy markets help promote this.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">C</span>
            Wood energy markets can accept less expensive wood material of lower quality than would be suitable for traditional timber markets. Most wood used for energy in Pennsylvania is used to produce heat or electricity through combustion. Many schools and hospitals use wood boiler systems to heat and power their facilities, many homes are primarily heated with wood, and some coal plants incorporate wood into their coal streams to produce electricity. Wood can also be gasified for electrical generation and can even be made into liquid fuels like ethanol and gasoline for lorries and cars. All these products are made primarily from low-use wood. Several tree- and plant-cutting approaches, which could greatly improve the long-term quality of a forest, focus strongly or solely on the use of wood for those markets.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">D</span>
            One such approach is called a Timber Stand Improvement (TSI) Cut. In a TSI Cut, really poor-quality tree and plant material is cut down to allow more space, light, and other resources to the highest-valued stems that remain. Removing invasive plants might be another primary goal of a TSI Cut. The stems that are left behind might then grow in size and develop more foliage and larger crowns or tops that produce more coverage for wildlife; they have a better chance to regenerate in a less crowded environment. TSI Cuts can be tailored to one farmer’s specific management goals for his or her land.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">E</span>
            Another approach that might yield a high amount of low-use wood is a Salvage Cut. With the many pests and pathogens visiting forests including hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth, to name just a few, it is important to remember that those working in the forests can help ease these issues through cutting procedures. These types of cut reduce the number of sick trees and seek to manage the future spread of a pest problem. They leave vigorous trees that have stayed healthy enough to survive the outbreak.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">F</span>
            A Shelterwood Cut, which only takes place in a mature forest that has already been thinned several times, involves removing all the mature trees when other seedlings have become established. This then allows the forester to decide which tree species are regenerated. It leaves a young forest where all trees are at a similar point in their growth. It can also be used to develop a two-tier forest so that there are two harvests and the money that comes in is spread out over a decade or more.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">G</span>
            Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood. However, it is important to remember that some retention of what many would classify as low-use wood is very important. The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil. In addition, trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals. They help control problem insects and increase the health and resilience of the forest. It is also important to remember that not all small trees are low-use. For example, many species like hawthorn provide food for wildlife. Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity.
          </p>
          <p class="text-xs text-slate-500 font-sans border-t border-slate-200 pt-2">
            *Stand – An area covered with trees that have common features (e.g. size)
          </p>
        </div>
      \`,
      questionGroups: [
        {
          id: 'c18-r1-qg4',
          type: 'matching_information',
          title: 'Questions 14 – 18',
          instructions: 'Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.',
          paragraphOptions: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
          questions: [
            {
              questionNumber: 14,
              prompt: 'bad outcomes for a forest when people focus only on its financial reward',
              correctAnswer: 'B',
              explanation: 'Paragraph B explains that "high-grading" (removing high-quality stems and leaving poor trees behind) left a legacy of low-use "junk trees" that decrease the health of a stand.',
              passageEvidence: { paragraph: 'B', quote: 'practice, called \\'high-grading\\', has left a legacy of \\'low-use wood\\'... decrease the health of a stand' }
            },
            {
              questionNumber: 15,
              prompt: 'reference to the aspects of any tree that contribute to its worth',
              correctAnswer: 'A',
              explanation: 'Paragraph A begins: "A tree’s ‘value’ depends on several factors including its species, size, form, condition, quality, function, and accessibility..."',
              passageEvidence: { paragraph: 'A', quote: 'depends on several factors including its species, size, form, condition, quality, function, and accessibility' }
            },
            {
              questionNumber: 16,
              prompt: 'mention of the potential use of wood to help run vehicles',
              correctAnswer: 'C',
              explanation: 'Paragraph C states: "Wood can also be gasified... and can even be made into liquid fuels like ethanol and gasoline for lorries and cars."',
              passageEvidence: { paragraph: 'C', quote: 'made into liquid fuels like ethanol and gasoline for lorries and cars' }
            },
            {
              questionNumber: 17,
              prompt: 'examples of insects that attack trees',
              correctAnswer: 'E',
              explanation: 'Paragraph E lists specific pests and pathogens: "hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth..."',
              passageEvidence: { paragraph: 'E', quote: 'hemlock wooly adelgid, Asian longhorned beetle, emerald ash borer, and gypsy moth' }
            },
            {
              questionNumber: 18,
              prompt: 'an alternative name for trees that produce low-use wood',
              correctAnswer: 'B',
              explanation: "Paragraph B explains: \\"Some people even call these 'junk trees', and they are abundant in Pennsylvania.\\"",
              passageEvidence: { paragraph: 'B', quote: 'Some people even call these \\'junk trees\\'' }
            }
          ]
        },
        {
          id: 'c18-r1-qg5',
          type: 'multiple_choice',
          title: 'Questions 19 – 21',
          instructions: 'Look at the following purposes and the list of timber cuts below. Match each purpose with the correct timber cut, A, B or C. NB You may use any letter more than once.\\n\\nList of Timber Cuts:\\nA. a TSI Cut\\nB. a Salvage Cut\\nC. a Shelterwood Cut',
          questions: [
            {
              questionNumber: 19,
              prompt: 'to remove trees that are diseased',
              options: ['A. a TSI Cut', 'B. a Salvage Cut', 'C. a Shelterwood Cut'],
              correctAnswer: 'B',
              explanation: 'Paragraph E states a Salvage Cut reduces the number of sick trees and manages pests/pathogens.',
              passageEvidence: { paragraph: 'E', quote: 'reduce the number of sick trees and seek to manage the future spread of a pest problem' }
            },
            {
              questionNumber: 20,
              prompt: 'to generate income across a number of years',
              options: ['A. a TSI Cut', 'B. a Salvage Cut', 'C. a Shelterwood Cut'],
              correctAnswer: 'C',
              explanation: 'Paragraph F states Shelterwood Cut can be used "so that there are two harvests and the money that comes in is spread out over a decade or more."',
              passageEvidence: { paragraph: 'F', quote: 'money that comes in is spread out over a decade or more' }
            },
            {
              questionNumber: 21,
              prompt: 'to create a forest whose trees are close in age',
              options: ['A. a TSI Cut', 'B. a Salvage Cut', 'C. a Shelterwood Cut'],
              correctAnswer: 'C',
              explanation: 'Paragraph F notes Shelterwood Cut "leaves a young forest where all trees are at a similar point in their growth."',
              passageEvidence: { paragraph: 'F', quote: 'where all trees are at a similar point in their growth' }
            }
          ]
        },
        {
          id: 'c18-r1-qg6',
          type: 'sentence_completion',
          title: 'Questions 22 – 26',
          instructions: 'Complete the sentences below. Choose ONE WORD ONLY from the passage for each answer.',
          wordLimitRule: 'ONE WORD ONLY',
          questions: [
            {
              questionNumber: 22,
              prompt: 'Some dead wood is removed to avoid the possibility of [ 22 ].',
              correctAnswer: 'fire',
              acceptedVariants: ['fires'],
              explanation: 'Paragraph G: "Thinnings and dense and dead wood removal for fire prevention also center on the production of low-use wood."',
              passageEvidence: { paragraph: 'G', quote: 'dead wood removal for fire prevention' }
            },
            {
              questionNumber: 23,
              prompt: 'The [ 23 ] from the tops of cut trees can help improve soil quality.',
              correctAnswer: 'nutrients',
              acceptedVariants: ['nutrient'],
              explanation: 'Paragraph G: "The tops of trees that have been cut down should be left on the site so that their nutrients cycle back into the soil."',
              passageEvidence: { paragraph: 'G', quote: 'nutrients cycle back into the soil' }
            },
            {
              questionNumber: 24,
              prompt: 'Some damaged trees should be left, as their [ 24 ] provide habitats for a range of creatures.',
              correctAnswer: 'cavities',
              acceptedVariants: ['cavity'],
              explanation: 'Paragraph G: "...trees with many cavities are extremely important habitats for insect predators like woodpeckers, bats and small mammals."',
              passageEvidence: { paragraph: 'G', quote: 'trees with many cavities are extremely important habitats' }
            },
            {
              questionNumber: 25,
              prompt: 'Some trees that are small, such as [ 25 ], are a source of food for animals and insects.',
              correctAnswer: 'hawthorn',
              acceptedVariants: ['hawthorns'],
              explanation: 'Paragraph G: "...many species like hawthorn provide food for wildlife."',
              passageEvidence: { paragraph: 'G', quote: 'many species like hawthorn provide food for wildlife' }
            },
            {
              questionNumber: 26,
              prompt: 'Any trees that are [ 26 ] should be left to grow, as they add to the variety of species in the forest.',
              correctAnswer: 'rare',
              explanation: 'Paragraph G: "Finally, rare species of trees in a forest should also stay behind as they add to its structural diversity."',
              passageEvidence: { paragraph: 'G', quote: 'rare species of trees in a forest should also stay behind' }
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 3,
      title: 'Reading Passage 3',
      subtitle: 'Conquering Earth’s space junk problem',
      passageContent: \`
        <div class="space-y-5 text-slate-800 leading-relaxed font-serif">
          <p class="font-bold text-base text-slate-900 font-sans italic border-b border-slate-200 pb-3">
            Satellites, rocket shards and collision debris are creating major traffic risks in orbit around the planet. Researchers are working to reduce these threats
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">A</span>
            Last year, commercial companies, military and civil departments and amateurs sent more than 400 satellites into orbit, over four times the yearly average in the previous decade. Numbers could rise even more sharply if leading space companies follow through on plans to deploy hundreds to thousands of large constellations of satellites to space in the next few years. All that traffic can lead to disaster. Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel that now threaten other satellites in low Earth orbit – the zone stretching up to 2,000 kilometres in altitude. Altogether, there are roughly 20,000 human-made objects in orbit, from working satellites to small rocket pieces. And satellite operators can’t steer away from every potential crash, because each move consumes time and fuel that could otherwise be used for the spacecraft’s main job.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">B</span>
            Concern about space junk goes back to the beginning of the satellite era, but the number of objects in orbit is rising so rapidly that researchers are investigating new ways of attacking the problem. Several teams are trying to improve methods for assessing what is in orbit, so that satellite operators can work more efficiently in ever-more-crowded space. Some researchers are now starting to compile a massive data set that includes the best possible information on where everything is in orbit. Others are developing taxonomies of space – working on measuring properties such as the shape and size of an object, so that satellite operators know how much to worry about what’s coming their way. The alternative, many say, is unthinkable. Just a few uncontrolled space crashes could generate enough debris to set off a runaway cascade of fragments, rendering near-Earth space unusable. ‘If we go on like this, we will reach a point of no return,’ says Carolin Frueh, an astrodynamical researcher at Purdue University in West Lafayette, Indiana.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">C</span>
            Even as our ability to monitor space objects increases, so too does the total number of items in orbit. That means companies, governments and other players in space are collaborating in new ways to avoid a shared threat. International groups such as the Inter-Agency Space Debris Coordination Committee have developed guidelines on space sustainability. Those include inactivating satellites at the end of their useful life by venting pressurised materials or leftover fuel that might lead to explosions. The intergovernmental groups also advise lowering satellites deep enough into the atmosphere that they will burn up or disintegrate within 25 years. But so far, only about half of all missions have abided by this 25-year goal, says Holger Krag, head of the European Space Agency’s space-debris office in Darmstadt, Germany. Operators of the planned large constellations of satellites say they will be responsible stewards in their enterprises in space, but Krag worries that problems could increase, despite their best intentions. ‘What happens to those that fail or go bankrupt?’ he asks. ‘They are probably not going to spend money to remove their satellites from space.’
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">D</span>
            In theory, given the vastness of space, satellite operators should have plenty of room for all these missions to fly safely without ever nearing another object. So some scientists are tackling the problem of space junk by trying to find out where all the debris is to a high degree of precision. That would alleviate the need for many of the unnecessary manoeuvres that are carried out to avoid potential collisions. ‘If you knew precisely where everything was, you would almost never have a problem,’ says Marlon Sorge, a space-debris specialist at the Aerospace Corporation in El Segundo, California.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">E</span>
            The field is called space traffic management, because it’s similar to managing traffic on the roads or in the air. Think about a busy day at an airport, says Moriba Jah, an astrodynamicist at the University of Texas at Austin: planes line up in the sky, landing and taking off close to one another in a carefully choreographed routine. Air-traffic controllers know the location of the planes down to one metre in accuracy. The same can’t be said for space debris. Not all objects in orbit are known, and even those included in databases are not tracked consistently.
          </p>
          <p>
            <span class="inline-flex items-center justify-center font-bold text-sm bg-slate-100 border border-slate-300 rounded px-2 py-0.5 mr-2 font-sans text-slate-900">F</span>
            An additional problem is that there is no authoritative catalogue that accurately lists the orbits of all known space debris. Jah illustrates this with a web-based database that he has developed. It draws on several sources, such as catalogues maintained by the US and Russian governments, to visualise where objects are in space. When he types in an identifier for a particular space object, the database draws a purple line to designate its orbit. Only this doesn’t quite work for a number of objects, such as a Russian rocket body designated in the database as object number 32280. When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object. Jah says that it is almost impossible to tell which is correct, unless a third source of information made it possible to cross-correlate. Jah describes himself as a space environmentalist: ‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’ Until that happens, he argues, the space community will continue devolving into a tragedy in which all spaceflight operators are polluting a common resource.
          </p>
        </div>
      \`,
      questionGroups: [
        {
          id: 'c18-r1-qg7',
          type: 'matching_information',
          title: 'Questions 27 – 31',
          instructions: 'Reading Passage 3 has six sections, A–F. Which section contains the following information? Write the correct letter, A–F.',
          paragraphOptions: ['A', 'B', 'C', 'D', 'E', 'F'],
          questions: [
            {
              questionNumber: 27,
              prompt: 'a reference to the cooperation that takes place to try and minimise risk',
              correctAnswer: 'C',
              explanation: 'Section C mentions that "companies, governments and other players in space are collaborating in new ways to avoid a shared threat" and mentions the Inter-Agency Space Debris Coordination Committee.',
              passageEvidence: { paragraph: 'C', quote: 'companies, governments and other players in space are collaborating in new ways' }
            },
            {
              questionNumber: 28,
              prompt: 'an explanation of a person’s aims',
              correctAnswer: 'F',
              explanation: 'Section F concludes with Moriba Jah stating his aims: "‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’"',
              passageEvidence: { paragraph: 'F', quote: 'I want to make space a place that is safe to operate, that is free and useful for generations to come' }
            },
            {
              questionNumber: 29,
              prompt: 'a description of a major collision that occurred in space',
              correctAnswer: 'A',
              explanation: 'Section A describes: "Ten years ago, a US commercial Iridium satellite smashed into an inactive Russian communications satellite called Cosmos-2251, creating thousands of new pieces of space shrapnel..."',
              passageEvidence: { paragraph: 'A', quote: 'US commercial Iridium satellite smashed into an inactive Russian communications satellite' }
            },
            {
              questionNumber: 30,
              prompt: 'a comparison between tracking objects in space and the efficiency of a transportation system',
              correctAnswer: 'E',
              explanation: 'Section E compares tracking space objects to airport traffic: "Think about a busy day at an airport... Air-traffic controllers know the location of the planes down to one metre in accuracy. The same can’t be said for space debris."',
              passageEvidence: { paragraph: 'E', quote: 'similar to managing traffic on the roads or in the air. Think about a busy day at an airport' }
            },
            {
              questionNumber: 31,
              prompt: 'a reference to efforts to classify space junk',
              correctAnswer: 'B',
              explanation: 'Section B mentions: "Others are developing taxonomies of space – working on measuring properties such as the shape and size of an object..."',
              passageEvidence: { paragraph: 'B', quote: 'developing taxonomies of space – working on measuring properties such as the shape and size of an object' }
            }
          ]
        },
        {
          id: 'c18-r1-qg8',
          type: 'summary_completion',
          title: 'Questions 32 – 35',
          instructions: 'Complete the summary below. Choose ONE WORD ONLY from the passage for each answer.',
          summaryTitle: 'The Inter-Agency Space Debris Coordination Committee',
          wordLimitRule: 'ONE WORD ONLY',
          questions: [
            {
              questionNumber: 32,
              prompt: 'The committee gives advice on how the [ 32 ] of space can be achieved.',
              correctAnswer: 'sustainability',
              explanation: 'Section C: "...have developed guidelines on space sustainability."',
              passageEvidence: { paragraph: 'C', quote: 'guidelines on space sustainability' }
            },
            {
              questionNumber: 33,
              prompt: 'The committee advises that when satellites are no longer active, any unused [ 33 ] or pressurised material that could cause explosions should be removed.',
              correctAnswer: 'fuel',
              explanation: 'Section C: "...by venting pressurised materials or leftover fuel that might lead to explosions."',
              passageEvidence: { paragraph: 'C', quote: 'venting pressurised materials or leftover fuel' }
            },
            {
              questionNumber: 34,
              prompt: 'Any unused fuel or pressurised material that could cause [ 34 ] should be removed.',
              correctAnswer: 'explosions',
              acceptedVariants: ['explosion'],
              explanation: 'Section C: "...leftover fuel that might lead to explosions."',
              passageEvidence: { paragraph: 'C', quote: 'might lead to explosions' }
            },
            {
              questionNumber: 35,
              prompt: 'Although operators of large satellite constellations accept that they have obligations as stewards of space, Holger Krag points out that the operators that become [ 35 ] are unlikely to prioritise removing their satellites from space.',
              correctAnswer: 'bankrupt',
              explanation: 'Section C: "‘What happens to those that fail or go bankrupt?’ he asks. ‘They are probably not going to spend money to remove their satellites from space.’"',
              passageEvidence: { paragraph: 'C', quote: 'fail or go bankrupt' }
            }
          ]
        },
        {
          id: 'c18-r1-qg9',
          type: 'multiple_choice',
          title: 'Questions 36 – 40',
          instructions: 'Look at the following statements and the list of people below. Match each statement with the correct person, A, B, C or D. NB You may use any letter more than once.\\n\\nList of People:\\nA. Carolin Frueh\\nB. Holger Krag\\nC. Marlon Sorge\\nD. Moriba Jah',
          questions: [
            {
              questionNumber: 36,
              prompt: 'Knowing the exact location of space junk would help prevent any possible danger.',
              options: ['A. Carolin Frueh', 'B. Holger Krag', 'C. Marlon Sorge', 'D. Moriba Jah'],
              correctAnswer: 'C',
              explanation: 'Section D: "‘If you knew precisely where everything was, you would almost never have a problem,’ says Marlon Sorge..."',
              passageEvidence: { paragraph: 'D', quote: 'If you knew precisely where everything was, you would almost never have a problem' }
            },
            {
              questionNumber: 37,
              prompt: 'Space should be available to everyone and should be preserved for the future.',
              options: ['A. Carolin Frueh', 'B. Holger Krag', 'C. Marlon Sorge', 'D. Moriba Jah'],
              correctAnswer: 'D',
              explanation: 'Section F: "Jah describes himself as a space environmentalist: ‘I want to make space a place that is safe to operate, that is free and useful for generations to come.’"',
              passageEvidence: { paragraph: 'F', quote: 'free and useful for generations to come' }
            },
            {
              questionNumber: 38,
              prompt: 'A recommendation regarding satellites is widely ignored.',
              options: ['A. Carolin Frueh', 'B. Holger Krag', 'C. Marlon Sorge', 'D. Moriba Jah'],
              correctAnswer: 'B',
              explanation: 'Section C: "But so far, only about half of all missions have abided by this 25-year goal, says Holger Krag..."',
              passageEvidence: { paragraph: 'C', quote: 'only about half of all missions have abided by this 25-year goal' }
            },
            {
              questionNumber: 39,
              prompt: 'There is conflicting information about where some satellites are in space.',
              options: ['A. Carolin Frueh', 'B. Holger Krag', 'C. Marlon Sorge', 'D. Moriba Jah'],
              correctAnswer: 'D',
              explanation: 'Section F: "When Jah enters that number, the database draws two purple lines: the US and Russian sources contain two completely different orbits for the same object."',
              passageEvidence: { paragraph: 'F', quote: 'two completely different orbits for the same object' }
            },
            {
              questionNumber: 40,
              prompt: 'There is a risk we will not be able to undo the damage that occurs in space.',
              options: ['A. Carolin Frueh', 'B. Holger Krag', 'C. Marlon Sorge', 'D. Moriba Jah'],
              correctAnswer: 'A',
              explanation: 'Section B: "‘If we go on like this, we will reach a point of no return,’ says Carolin Frueh..."',
              passageEvidence: { paragraph: 'B', quote: 'reach a point of no return' }
            }
          ]
        }
      ]
    }
  ]
};`;

function updateFile() {
  const filePath = 'src/data/cambridge18.ts';
  const original = fs.readFileSync(filePath, 'utf-8');

  const startMarker = 'export const cambridge18Test1Reading: IELTSMockTest = {';
  const endMarker = 'export const cambridge18Test1Listening: IELTSMockTest = {';

  const startIdx = original.indexOf(startMarker);
  const endIdx = original.indexOf(endMarker);

  if (startIdx === -1 || endIdx === -1) {
    console.error('Markers not found!');
    return;
  }

  const newContent = original.slice(0, startIdx) + authenticReading + '\n\n' + original.slice(endIdx);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log('✅ Successfully updated src/data/cambridge18.ts with authentic Cambridge 18 Reading Test 1!');
}

updateFile();
