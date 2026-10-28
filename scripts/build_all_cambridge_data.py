import os, re, json, sys, html as html_lib

sys.stdout.reconfigure(encoding='utf-8')

# ============================================================================
# 1. OFFICIAL WRITING PROMPTS & IMAGES (CAMBRIDGE 16 - 21, TESTS 1 - 4)
# ============================================================================
WRITING_DATA = {
    (16, 1): {
        "img": "/images/writing/cam16-test1-task1.png",
        "t1_subtitle": "Electrical Appliances Ownership & Housework Hours (1920–2019)",
        "t1_prompt": "The charts below show the changes in ownership of electrical appliances and amount of time spent doing housework in households in one country between 1920 and 2019.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Researching the History of One's House or Building",
        "t2_prompt": "In some countries, more and more people are becoming interested in finding out about the history of the house or building they live in.\nWhat are the reasons for this?\nHow can people research this?"
    },
    (16, 2): {
        "img": "/images/writing/cam16-test2-task1.png",
        "t1_subtitle": "Manufacturing Process for Making Sugar from Sugar Cane",
        "t1_prompt": "The diagram below shows the manufacturing process for making sugar from sugar cane.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Advertising Emphasising That Products Are New",
        "t2_prompt": "In their advertising, businesses nowadays usually emphasise that their products are new in some way.\nWhy is this? Do you think it is a positive or negative development?"
    },
    (16, 3): {
        "img": "/images/writing/cam16-test3-task1.png",
        "t1_subtitle": "Southwest Airport Site Plan Now and Next Year",
        "t1_prompt": "The plans below show the site of an airport now and how it will look after redevelopment next year.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Making Manufactured Sugary Food and Drink More Expensive",
        "t2_prompt": "Many manufactured food and drink products contain high levels of sugar, which causes many health problems. Sugary products should be made more expensive to encourage people to consume less sugar.\nDo you agree or disagree?"
    },
    (16, 4): {
        "img": "/images/writing/cam16-test4-task1.png",
        "t1_subtitle": "Process for Recycling Plastic Bottles",
        "t1_prompt": "The diagram below shows the process for recycling plastic bottles.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Driverless Cars, Buses and Trucks in the Future",
        "t2_prompt": "In the future all cars, buses and trucks will be driverless. The only people travelling inside these vehicles will be passengers.\nDo you think the advantages of driverless vehicles outweigh the disadvantages?"
    },
    (17, 1): {
        "img": "/images/writing/cam17-test1-task1.png",
        "t1_subtitle": "Norbiton Industrial Area Now and Planned Future Development",
        "t1_prompt": "The maps below show an industrial area in the town of Norbiton, and planned future development of the site.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Taking Risks in Professional and Personal Lives",
        "t2_prompt": "It is important for people to take risks, both in their professional lives and their personal lives.\nDo you think the advantages of taking risks outweigh the disadvantages?"
    },
    (17, 2): {
        "img": "/images/writing/cam17-test2-task1.png",
        "t1_subtitle": "Police Budget for 2017 and 2018 in One Area of Britain",
        "t1_prompt": "The table and charts below give information on the police budget for 2017 and 2018 in one area of Britain. The table shows where the money came from and the charts show how it was distributed.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Children Spending Hours Every Day on Smartphones",
        "t2_prompt": "Some children spend hours every day on their smartphones.\nWhy is this the case? Do you think this is a positive or a negative development?"
    },
    (17, 3): {
        "img": "/images/writing/cam17-test3-task1.png",
        "t1_subtitle": "Weekly Family Income Expenditure in 1968 and 2018",
        "t1_prompt": "The chart below gives information about how families in one country spent their weekly income in 1968 and in 2018.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Requiring Professionals to Work in the Country Where They Trained",
        "t2_prompt": "Some people believe that professionals, such as doctors and engineers, should be required to work in the country where they did their training. Others believe they should be free to work in another country if they wish.\nDiscuss both these views and give your own opinion."
    },
    (17, 4): {
        "img": "/images/writing/cam17-test4-task1.png",
        "t1_subtitle": "Shop Closures and New Shop Openings (2011–2018)",
        "t1_prompt": "The graph below shows the number of shops that closed and the number of new shops that opened in one country between 2011 and 2018.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Alternative Medicines and Treatments vs Visiting Usual Doctor",
        "t2_prompt": "Nowadays, a growing number of people with health problems are trying alternative medicines and treatments instead of visiting their usual doctor.\nDo you think this is a positive or a negative development?"
    },
    (18, 1): {
        "img": "/images/writing/cam18-test1-task1.png",
        "t1_subtitle": "Urban Population Percentage in Four Asian Countries (1970–2040)",
        "t1_prompt": "The graph below gives information about the percentage of the population in four Asian countries living in cities from 1970 to 2020, with predictions for 2030 and 2040.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "The Most Important Aim of Science",
        "t2_prompt": "The most important aim of science should be to improve people’s lives.\nTo what extent do you agree or disagree with this statement?"
    },
    (18, 2): {
        "img": "/images/writing/cam18-test2-task1.webp",
        "t1_subtitle": "US Households by Annual Income (2007, 2011 and 2015)",
        "t1_prompt": "The chart below shows the number of households in the US by their annual income in 2007, 2011 and 2015.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "University Students Learning Other Subjects vs Main Qualification",
        "t2_prompt": "Some university students want to learn about other subjects in addition to their main subjects. Others believe it is more important to give all their time and attention to studying for a qualification.\nDiscuss both these views and give your own opinion."
    },
    (18, 3): {
        "img": "/images/writing/cam18-test3-task1.webp",
        "t1_subtitle": "Floor Plan of Central Library 20 Years Ago and Today",
        "t1_prompt": "The diagram below shows the floor plan of a public library 20 years ago and how it looks now.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Rural People Moving to Cities and Decreasing Countryside Population",
        "t2_prompt": "In many countries around the world, rural people are moving to cities, so the population in the countryside is decreasing.\nDo you think this is a positive or a negative development?"
    },
    (18, 4): {
        "img": "/images/writing/cam18-test4-task1.webp",
        "t1_subtitle": "Average Monthly Change in Prices of Three Metals During 2014",
        "t1_prompt": "The graph below shows the average monthly change in the prices of three metals during 2014.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Ageing Population: Advantages vs Disadvantages",
        "t2_prompt": "In many countries, people are now living longer than ever before. Some people say an ageing population creates problems for governments. Other people think there are benefits if society has more elderly people.\nTo what extent do the advantages of having an ageing population outweigh the disadvantages?"
    },
    (19, 1): {
        "img": "/images/writing/cam19-test1-task1.png",
        "t1_subtitle": "Participants for Different Activities at a Social Centre in Melbourne (2000–2020)",
        "t1_prompt": "The graph below gives information on the numbers of participants for different activities at one social centre in Melbourne, Australia for the period 2000 to 2020.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Competition vs Cooperation at Work, School and Daily Life",
        "t2_prompt": "Some people think that competition at work, at school and in daily life is a good thing. Others believe that we should try to cooperate more, rather than competing against each other.\nDiscuss both these views and give your own opinion."
    },
    (19, 2): {
        "img": "/images/writing/cam19-test2-task1.png",
        "t1_subtitle": "Porth Harbour Plans in 2000 and Today",
        "t1_prompt": "The plans below show a harbour in 2000 and how it looks today.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Shorter Working Week and Longer Weekend",
        "t2_prompt": "The working week should be shorter and workers should have a longer weekend.\nDo you agree or disagree?"
    },
    (19, 3): {
        "img": "/images/writing/cam19-test3-task1.png",
        "t1_subtitle": "How the Biofuel Ethanol Is Produced",
        "t1_prompt": "The diagram below shows how a biofuel called ethanol is produced.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Saving Money for the Future (Including Young People)",
        "t2_prompt": "It is important for everyone, including young people, to save money for their future.\nTo what extent do you agree or disagree with this statement?"
    },
    (19, 4): {
        "img": "/images/writing/cam19-test4-task1.png",
        "t1_subtitle": "Location and Types of Dance Classes Young People Attend in Australia",
        "t1_prompt": "The charts below give information on the location and types of dance classes young people in a town in Australia are currently attending.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Supermarkets Selling Food Produced All Over the World",
        "t2_prompt": "In many countries nowadays, consumers can go to a supermarket and buy food produced all over the world.\nDo you think this is a positive or negative development?"
    },
    (20, 1): {
        "img": "/images/writing/cam20-test1-task1.png",
        "t1_subtitle": "Population Changes in New York City and Its Five Districts (1800–2000)",
        "t1_prompt": "The first table below shows changes in the total population of New York City from 1800 to 2000. The second and third tables show changes in the population of the five districts of the city (Manhattan, Brooklyn, Bronx, Queens, Staten Island) over the same period.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Access to Clean Water as a Free Basic Human Right",
        "t2_prompt": "Access to clean water is a basic human right. Therefore, every home should have a water supply that is provided free of charge.\nDo you agree or disagree?"
    },
    (20, 2): {
        "img": "/images/writing/cam20-test2-task1.png",
        "t1_subtitle": "Beechwood Farm Site Plan in 1950 and Today",
        "t1_prompt": "The plans below show the site of a farm in 1950 and the same site today.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Long vs Shorter Summer School Holidays",
        "t2_prompt": "In many countries, primary and secondary schools close for two months or more in the summer holidays.\nWhat is the value of long school holidays?\nWhat are the arguments in favour of shorter school holidays?"
    },
    (20, 3): {
        "img": "/images/writing/cam20-test3-task1.png",
        "t1_subtitle": "Public Library in Little Chalfont",
        "t1_prompt": "The charts below give information about a public library in a town called Little Chalfont.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Reducing Air Travel or Stopping Flying Altogether",
        "t2_prompt": "Some people have decided to reduce the number of times they fly every year or to stop flying altogether.\nDo you think the environmental benefits of this development outweigh the disadvantages for individuals and businesses?"
    },
    (20, 4): {
        "img": "/images/writing/cam20-test4-task1.png",
        "t1_subtitle": "How Fabric Is Manufactured from Bamboo",
        "t1_prompt": "The diagram below shows how fabric is manufactured from bamboo.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Global Fashion Trends Influencing How People Dress",
        "t2_prompt": "Many aspects of the way people dress today are influenced by global fashion trends.\nHow has global fashion become such a strong influence on people's lives?\nDo you think this is a positive or negative development?"
    },
    (21, 1): {
        "img": "/images/writing/cam21-test1-task1.jpg",
        "t1_subtitle": "Number of Jobs in Four Sectors of the US Economy (1960–2020)",
        "t1_prompt": "The graph below gives information about the number of jobs in four sectors of the economy in the US between 1960 and 2020.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Building Tall Apartment Blocks to Provide Homes in Large Cities",
        "t2_prompt": "The best way to provide enough homes in large cities is to build tall apartment blocks.\nTo what extent do you agree or disagree with this statement?"
    },
    (21, 2): {
        "img": "/images/writing/cam21-test2-task1.jpg",
        "t1_subtitle": "College Café Floor Plan Before and After Redesign",
        "t1_prompt": "The plans below show a college café before it was redesigned and how it looks now.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Importance of Theatres and Cinemas in the Digital Age",
        "t2_prompt": "Some people say that in the digital age, theatres and cinemas are no longer important as people can watch all the entertainment they want online. Others argue that theatres and cinemas are still important both economically and culturally.\nDiscuss both these views and give your own opinion."
    },
    (21, 3): {
        "img": "/images/writing/cam21-test3-task1.jpg",
        "t1_subtitle": "How a Rain-Shadow Desert Is Formed",
        "t1_prompt": "The diagram below shows how one type of desert, known as a rain-shadow desert, is formed.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Undergraduate Study Abroad or Work Placement Requirement",
        "t2_prompt": "All university undergraduate courses should include a period of time spent studying abroad or doing a work placement.\nDo you think the advantages of this would outweigh the disadvantages?"
    },
    (21, 4): {
        "img": "/images/writing/cam21-test4-task1.jpg",
        "t1_subtitle": "Survey of Library Users at a University",
        "t1_prompt": "The chart and table below show the results of a survey of library users at a university.\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
        "t2_subtitle": "Formal Learning vs Play in Primary School Classrooms",
        "t2_prompt": "Some people argue that primary schools focus too much on formal learning.\nTo what extent do you agree with this opinion?\nHow important do you think it is for children to play as well as learn in the primary school classroom?"
    }
}

def build_writing_test(book: int, test_num: int) -> dict:
    info = WRITING_DATA[(book, test_num)]
    t1_lines = [p.strip() for p in info["t1_prompt"].split("\n") if p.strip()]
    t2_lines = [p.strip() for p in info["t2_prompt"].split("\n") if p.strip()]

    t1_html = f"""
      <div class="space-y-4">
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs font-sans text-amber-900">
          <strong>WRITING TASK 1:</strong> You should spend about 20 minutes on this task. Write at least 150 words.
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
          {''.join(f'<p class="font-semibold text-slate-900 text-sm leading-relaxed">{l}</p>' if i == 0 else f'<p class="text-sm text-slate-700 leading-relaxed">{l}</p>' for i, l in enumerate(t1_lines))}
        </div>
        <div class="bg-white border border-slate-300 rounded-xl p-4 shadow-xs text-center">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Official Cambridge {book} Test {test_num} Task 1 Visual Reference</div>
          <img src="{info['img']}" alt="{info['t1_subtitle']}" class="max-w-full h-auto mx-auto rounded-lg border border-slate-200 shadow-2xs" />
        </div>
      </div>
    """.strip()

    t2_html = f"""
      <div class="space-y-4">
        <div class="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-xs font-sans text-indigo-900">
          <strong>WRITING TASK 2:</strong> You should spend about 40 minutes on this task. Write at least 250 words.
        </div>
        <p class="text-xs uppercase font-bold tracking-wider text-slate-500">Write about the following topic:</p>
        <div class="bg-slate-50 border-l-4 border-indigo-600 p-5 rounded-r-xl space-y-3">
          {''.join(f'<p class="font-bold text-slate-900 text-base leading-relaxed">{l}</p>' for l in t2_lines)}
        </div>
        <p class="text-sm text-slate-600 italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
      </div>
    """.strip()

    return {
        "id": f"cambridge-{book}-test-{test_num}-writing",
        "book": book,
        "testNumber": test_num,
        "module": "writing",
        "title": f"Cambridge {book} Academic Writing Test {test_num}",
        "durationMinutes": 60,
        "sections": [
            {
                "sectionNumber": 1,
                "title": "Writing Task 1",
                "subtitle": info["t1_subtitle"],
                "passageContent": t1_html,
                "questionGroups": [
                    {
                        "id": f"w{book}-t{test_num}-g1",
                        "type": "writing_task_1",
                        "title": "Writing Task 1",
                        "instructions": "Summarise the information by selecting and reporting the main features, and make comparisons where relevant. Write at least 150 words.",
                        "imageUrl": info["img"],
                        "diagramTitle": info["t1_subtitle"],
                        "questions": [
                            {
                                "questionNumber": 1,
                                "prompt": info["t1_prompt"] + "\nWrite at least 150 words.",
                                "correctAnswer": "Model essay response required (minimum 150 words)."
                            }
                        ]
                    }
                ]
            },
            {
                "sectionNumber": 2,
                "title": "Writing Task 2",
                "subtitle": info["t2_subtitle"],
                "passageContent": t2_html,
                "questionGroups": [
                    {
                        "id": f"w{book}-t{test_num}-g2",
                        "type": "writing_task_2",
                        "title": "Writing Task 2",
                        "instructions": "Give reasons for your answer and include any relevant examples from your own knowledge or experience. Write at least 250 words.",
                        "questions": [
                            {
                                "questionNumber": 2,
                                "prompt": info["t2_prompt"] + "\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\nWrite at least 250 words.",
                                "correctAnswer": "Model essay response required (minimum 250 words)."
                            }
                        ]
                    }
                ]
            }
        ]
    }

print("Writing builder ready for all 24 tests.")


# ============================================================================
# 2. HTML TO CLEAN LINES & ANSWER PARSER
# ============================================================================
def html_to_lines(raw_html: str, use_main: bool = False) -> list[str]:
    if use_main:
        m = re.search(r'<main[^>]*>(.*?)</main>', raw_html, re.S | re.I)
        chunk = m.group(1) if m else raw_html
    else:
        m = re.search(r'<div[^>]*class="[^"]*entry-content[^"]*"[^>]*>(.*?)<!-- \.entry-content', raw_html, re.S | re.I)
        if not m:
            m = re.search(r'<article[^>]*>(.*?)</article>', raw_html, re.S | re.I)
        chunk = m.group(1) if m else raw_html

    chunk = re.sub(r'<script.*?</script>', '', chunk, flags=re.S | re.I)
    chunk = re.sub(r'<style.*?</style>', '', chunk, flags=re.S | re.I)
    chunk = re.sub(r'</?(?:p|div|h[1-6]|li|tr|br|hr|ul|ol|table|thead|tbody|blockquote|section)[^>]*>', '\n', chunk, flags=re.I)
    chunk = re.sub(r'</?(?:td|th)[^>]*>', ' | ', chunk, flags=re.I)
    chunk = re.sub(r'<[^>]+>', '', chunk)
    chunk = html_lib.unescape(chunk)
    chunk = chunk.replace('\xa0', ' ')
    lines = []
    for l in chunk.splitlines():
        clean = re.sub(r'\s+', ' ', l).strip()
        if clean:
            lines.append(clean)
    return lines


def parse_answers(lines: list[str], module_type: str) -> dict[int, str]:
    answers: dict[int, str] = {}
    ans_start = -1
    for i, l in enumerate(lines):
        if re.search(r'^Answers?\s+Cam\s+\d+\s+(?:Reading|Listening)', l, re.I):
            ans_start = i
            break
    if ans_start == -1:
        for i, l in enumerate(lines):
            if re.search(r'Answers?\s+Cam\s+\d+', l, re.I):
                ans_start = i
                break
    if ans_start == -1:
        return answers

    for l in lines[ans_start:]:
        if 'Audioscript' in l or 'Leave a Comment' in l:
            break
        if l.strip() == 'Advertisements' and len(answers) >= 40:
            break
        # Split inline concatenated answers e.g. "Passage 1 1. foo"
        l_clean = re.sub(r'^(?:Passage|Part|Section)\s*\d+\s*', '', l, flags=re.I).strip()
        # Multi match e.g. "11&12 B, E" or "21 and 22 A, C" or "11 & 12. B, E"
        m_multi = re.match(r'^(\d+)\s*(?:&|and)\s*(\d+)\.?\s+(.+)$', l_clean, re.I)
        if m_multi:
            q1, q2 = int(m_multi.group(1)), int(m_multi.group(2))
            raw_val = m_multi.group(3).strip()
            parts = [p.strip() for p in re.split(r'[,/]|(?:\s+and\s+)|(?:\s+or\s+)', raw_val) if p.strip()]
            if len(parts) >= 2 and all(len(p) == 1 and p.isalpha() for p in parts[:2]):
                answers[q1] = parts[0].upper()
                answers[q2] = parts[1].upper()
            elif len(parts) >= 2:
                answers[q1] = parts[0]
                answers[q2] = parts[1]
            else:
                answers[q1] = raw_val
                answers[q2] = raw_val
            continue

        m_single = re.match(r'^(\d+)\.?\s+(.+)$', l_clean)
        if m_single:
            q_num = int(m_single.group(1))
            ans_val = m_single.group(2).strip()
            if 1 <= q_num <= 40 and q_num not in answers:
                answers[q_num] = ans_val
    return answers


# Official verified answer key for Cam 17 Reading Test 3 (from engnovate HTML)
CAM17_R3_ANSWERS = {
    1: "carnivorous", 2: "scent", 3: "pouch", 4: "fossil", 5: "habitat",
    6: "TRUE", 7: "FALSE", 8: "NOT GIVEN", 9: "FALSE", 10: "NOT GIVEN",
    11: "FALSE", 12: "TRUE", 13: "NOT GIVEN",
    14: "F", 15: "G", 16: "A", 17: "H", 18: "B", 19: "E", 20: "C",
    21: "B", 22: "C", 23: "solid", 24: "orangutan", 25: "carbon stocks", 26: "biodiversity",
    27: "D", 28: "B", 29: "C", 30: "D", 31: "C",
    32: "NO", 33: "YES", 34: "NOT GIVEN", 35: "NO",
    36: "H", 37: "D", 38: "I", 39: "B", 40: "F"
}

# Official Map & Diagram Images Registry
MAP_DIAGRAM_REGISTRY = {
    (16, 1, 'listening', 15): {
        "type": "map_labelling",
        "imageUrl": "/images/cambridge16-test1-stevensons-site.png",
        "diagramTitle": "Plan of Stevenson's site",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H"]
    },
    (16, 4, 'listening', 15): {
        "type": "map_labelling",
        "imageUrl": "/images/maps/cam16-test4-listening.jpg",
        "diagramTitle": "Plan of Community Recreation Ground after proposed changes",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    },
    (16, 4, 'reading', 1): {
        "type": "diagram_labelling",
        "imageUrl": "/images/reading/cam16-test4-reading.jpg",
        "diagramTitle": "The Persian Qanat Method & Roman Vertical Shafts",
        "extraImageUrl": "/images/reading/cam16-test4-reading-2.jpg"
    },
    (18, 2, 'listening', 15): {
        "type": "map_labelling",
        "imageUrl": "/images/maps/cam18-test2-housing-development.jpg",
        "diagramTitle": "New Housing Development Plan",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    },
    (19, 1, 'listening', 15): {
        "type": "map_labelling",
        "imageUrl": "/images/maps/cam19-test1-farley-house.jpg",
        "diagramTitle": "Farley House Map",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H"]
    },
    (20, 3, 'listening', 17): {
        "type": "map_labelling",
        "imageUrl": "/images/maps/cam20-test3-listening.jpg",
        "diagramTitle": "Bidcaster Archaeological Dig",
        "options": ["A", "B", "C", "D", "E", "F", "G"]
    },
    (21, 2, 'listening', 15): {
        "type": "map_labelling",
        "imageUrl": "/images/maps/cam21-test2-melby-coal-mine.png",
        "diagramTitle": "Melby Coal Mine",
        "options": ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    }
}


def detect_question_type(title: str, lines: list[str], module: str) -> str:
    joined = (title + "\n" + "\n".join(lines[:10])).lower()
    full_joined = (title + "\n" + "\n".join(lines)).lower()

    if "list of headings" in full_joined or "correct heading for" in full_joined:
        return "matching_headings"
    if "label the map" in joined or "label the plan" in joined:
        return "map_labelling" if module == "listening" else "diagram_labelling"
    if "label the diagram" in joined or "complete the labels" in joined or "posts on the" in full_joined and "direct the tunnellers" in full_joined:
        return "diagram_labelling"
    if "complete each sentence with the correct ending" in joined:
        return "matching_sentence_endings"
    if "which paragraph contains" in joined or "which section contains" in joined:
        return "matching_information"
    if ("look at the following statements" in joined or "match each" in joined) and "which paragraph" not in joined and "which section" not in joined:
        return "matching_features"
    if module == "listening" and re.search(r'choose\s+(?:three|four|five|six|seven)\s+answers\s+from\s+the\s+box', joined):
        return "matching_features"
    if re.search(r'choose\s+(?:two|three)\s+letters', joined):
        return "multiple_choice_multi"
    if "true" in joined and "false" in joined and "not given" in joined:
        return "true_false_not_given"
    if "yes" in joined and "no" in joined and "not given" in joined:
        return "yes_no_not_given"
    if "complete the summary" in joined:
        return "summary_completion"
    if "complete the table" in joined:
        return "table_completion"
    if "complete the form" in joined:
        return "form_completion"
    if "complete the notes" in joined:
        return "form_completion" if module == "listening" else "note_completion"
    if "complete the sentences" in joined or "flow-chart" in joined or "flowchart" in joined:
        return "sentence_completion"
    if "choose the correct letter" in joined:
        return "multiple_choice"
    if "answer the questions below" in joined:
        return "short_answer"
    if any(re.match(r'^[A-D]\s+', l) for l in lines):
        return "multiple_choice"
    return "sentence_completion"


def extract_box_options(q_type: str, lines: list[str], min_q: int, max_q: int) -> list[str]:
    if q_type == "matching_headings":
        headings = []
        for l in lines:
            m = re.match(r'^([ivx]+)\s+(.+)$', l, re.I)
            if m and len(m.group(1)) <= 5 and set(m.group(1).lower()).issubset({'i', 'v', 'x'}):
                headings.append(f"{m.group(1).lower()}. {m.group(2).strip()}")
        return headings

    if q_type == "matching_information":
        # Check range like A-G or A-H
        joined = "\n".join(lines[:6])
        m = re.search(r'\bA\s*[-–]\s*([F-J])\b', joined)
        end_char = m.group(1).upper() if m else 'G'
        return [chr(c) for c in range(ord('A'), ord(end_char) + 1)]

    opts = []
    for l in lines:
        # Don't mistake question lines for options
        if re.match(r'^\d+[\.\s]', l):
            continue
        # Multi options on one line e.g. "A foo B bar C baz"
        multi = list(re.finditer(r'\b([A-J])[\.\s]+([A-Za-z0-9,\'\-\(\)\s]+?)(?=(?:\s+[A-J][\.\s]+|$))', l))
        if len(multi) >= 2 and l[0] in 'ABCDEFGHIJ':
            for m in multi:
                opts.append(f"{m.group(1)}. {m.group(2).strip()}")
        else:
            m_single = re.match(r'^([A-J])[\.\)\s]+(.+)$', l)
            if m_single and not re.match(r'^(?:TRUE|FALSE|NOT GIVEN|YES|NO)$', m_single.group(2).strip(), re.I):
                opts.append(f"{m_single.group(1)}. {m_single.group(2).strip()}")
    return opts


def extract_questions_for_group(
    q_type: str,
    group_title: str,
    lines: list[str],
    answers: dict[int, str],
    min_q: int,
    max_q: int
) -> tuple[list[dict], list[str]]:
    box_opts = extract_box_options(q_type, lines, min_q, max_q)
    questions = []

    # Check if multi-select group
    is_multi = (q_type == "multiple_choice_multi")
    multi_prompt = ""
    if is_multi:
        for l in lines:
            if len(l) > 18 and not re.match(r'^(?:Choose|Write|Questions?\s+\d+|[A-I][\.\s]|\d+\s*$)', l, re.I):
                multi_prompt = l.strip()
                break

    # Subheadings tracking for notes/tables
    curr_sub = ""
    line_contexts = []
    for l in lines:
        clean_l = l.strip()
        if not clean_l:
            continue
        is_sub = (
            (clean_l.endswith(':') or (len(clean_l) < 48 and not re.search(r'[…\.]{2,}', clean_l) and not re.match(r'^\d+', clean_l)))
            and not re.match(r'^(?:Questions?|Choose|Complete|Write|Do the following|In boxes|List of|Look at|Match|[A-J][\.\s]|[ivx]+[\.\s])', clean_l, re.I)
        )
        if is_sub and '|' not in clean_l:
            curr_sub = clean_l.rstrip(':').strip()
        line_contexts.append((clean_l, curr_sub))

    for q in range(min_q, max_q + 1):
        prompt = ""
        q_opts = None

        if is_multi and multi_prompt:
            idx = q - min_q + 1
            ord_label = "First choice" if idx == 1 else "Second choice" if idx == 2 else "Third choice"
            prompt = f"{multi_prompt} ({ord_label})"
            q_opts = box_opts if box_opts else None

        # 1. Check inline blank with question number e.g. "1…………" or "1 ......" or "| 1 ... |"
        if not prompt:
            blank_pat = re.compile(rf'(^|[^\d])({q})\s*(?:£|\$)?\s*(?:[…\._]{{2,}}|Drop answer here)', re.I)
            for text, sub in line_contexts:
                if blank_pat.search(text):
                    c = re.sub(r'^[●•–\-\*\s]+', '', text).strip()
                    c = re.sub(rf'\b{q}\s*£\s*[…\._]{{2,}}', f'£[ {q} ]', c)
                    c = re.sub(rf'\b{q}\s*\$\s*[…\._]{{2,}}', f'$[ {q} ]', c)
                    c = re.sub(rf'\b{q}\s*(?:[…\._]{{2,}}|Drop answer here)', f'[ {q} ]', c, flags=re.I)
                    if len(c) > 220 and f'[ {q} ]' in c:
                        sents = re.split(r'(?<=[.!?])\s+', c)
                        for s in sents:
                            if f'[ {q} ]' in s:
                                c = s.strip()
                                break
                    prefix = f"{sub}: " if sub and not c.startswith(sub) and q_type in ('form_completion', 'note_completion', 'table_completion') else ""
                    prompt = prefix + c
                    break

        # 2. Check standard numbered question line starting with "q " or "q."
        if not prompt:
            q_start_pat = re.compile(rf'^{q}[\.\)\s]+(.+)$')
            for i, (text, sub) in enumerate(line_contexts):
                m = q_start_pat.match(text)
                if m:
                    rem = m.group(1).strip()
                    rem = re.sub(r'[…\._]{2,}\s*$', '', rem).strip()
                    found_opts = []
                    if q_type == "multiple_choice":
                        j = i + 1
                        while j < len(line_contexts):
                            nt, _ = line_contexts[j]
                            if re.match(r'^\d+[\.\)\s]', nt) or re.match(r'^Questions?\s+\d+', nt, re.I):
                                break
                            if re.match(r'^[A-D][\.\)\s]+', nt):
                                found_opts.append(re.sub(r'^([A-D])[\.\)\s]+', r'\1. ', nt))
                            elif not found_opts and len(nt) > 3 and not nt.endswith(':'):
                                rem += " " + nt
                            j += 1
                    prompt = rem
                    if found_opts:
                        q_opts = found_opts
                    break

        # 3. Check if question number is alone or at start of table cell without dots
        if not prompt:
            for text, sub in line_contexts:
                if re.search(rf'\b{q}\b', text) and not re.match(r'^Questions?\s+\d+', text, re.I):
                    c = re.sub(rf'\b{q}\b\s*[…\._]*', f'[ {q} ] ', text, count=1)
                    prompt = c.strip()
                    break

        if not prompt:
            prompt = f"Question {q} [ {q} ]" if "completion" in q_type else f"Question {q}"

        if "completion" in q_type and f"[ {q} ]" not in prompt:
            prompt = f"{prompt} [ {q} ]"

        if not q_opts and box_opts and q_type in (
            "matching_headings", "matching_information", "matching_features",
            "matching_sentence_endings", "summary_completion", "multiple_choice",
            "multiple_choice_multi", "map_labelling", "diagram_labelling"
        ):
            q_opts = box_opts

        ans = answers.get(q, "")
        q_obj = {
            "questionNumber": q,
            "prompt": prompt,
            "correctAnswer": ans,
            "explanation": f"Official Cambridge answer: {ans}"
        }
        if q_opts:
            q_obj["options"] = q_opts
        questions.append(q_obj)

    return questions, box_opts


# ============================================================================
# 3. READING & LISTENING SECTION PARSERS
# ============================================================================
def parse_reading_section(
    book: int,
    test_num: int,
    sec_num: int,
    sec_lines: list[str],
    answers: dict[int, str],
    start_q: int,
    end_q: int
) -> dict:
    # Filter header line "READING PASSAGE X" and "You should spend about 20 minutes..."
    cleaned = []
    for l in sec_lines:
        if re.match(r'^READING PASSAGE\s+\d+\s*$', l, re.I):
            continue
        if re.match(r'^You should spend about 20 minutes', l, re.I):
            continue
        cleaned.append(l)

    # Check if a "List of Headings" question group appears BEFORE the passage!
    pre_question_lines = []
    idx = 0
    if idx < len(cleaned) and re.match(r'^Questions?\s+\d+\s*(?:[-–]|and)\s*\d+', cleaned[idx], re.I):
        # Scan until the end of the "14 Paragraph A ... 20 Paragraph G" block
        last_para_q_idx = -1
        for k in range(idx, min(idx + 35, len(cleaned))):
            if re.match(r'^\d+\s+(?:Paragraph|Section)\s+[A-J]\b', cleaned[k], re.I):
                last_para_q_idx = k
        if last_para_q_idx != -1:
            pre_question_lines = cleaned[idx:last_para_q_idx + 1]
            cleaned = cleaned[last_para_q_idx + 1:]

    # Now split remaining `cleaned` into passage_lines and post_question_lines
    passage_raw = []
    post_question_lines = []
    reached_q = False
    for l in cleaned:
        if not reached_q and re.match(r'^Questions?\s+\d+\s*(?:[-–]|and)\s*\d+', l, re.I):
            reached_q = True
        if not reached_q:
            passage_raw.append(l)
        else:
            post_question_lines.append(l)

    # Merge standalone paragraph labels "A", "B", ... with the following paragraph line
    merged_passage = []
    i = 0
    while i < len(passage_raw):
        curr = passage_raw[i]
        if re.match(r'^[A-J]$', curr) and i + 1 < len(passage_raw):
            merged_passage.append(f"{curr} {passage_raw[i + 1]}")
            i += 2
        else:
            merged_passage.append(curr)
            i += 1

    # Extract subtitle (passage title)
    subtitle = f"Reading Passage {sec_num}"
    body_paras = []
    for idx_p, p in enumerate(merged_passage):
        if idx_p == 0 and len(p) < 110 and not re.match(r'^[A-J]\s+', p):
            subtitle = p
        elif idx_p == 1 and len(p) < 120 and not p.endswith('.') and len(body_paras) == 0 and not re.match(r'^[A-J]\s+', p):
            # Optional sub-headline right under title
            body_paras.append(f'<p class="italic text-slate-600 mb-2">{p}</p>')
        else:
            body_paras.append(p)

    # Format HTML passageContent
    formatted_paras = []
    for p in body_paras:
        if p.startswith('<p'):
            formatted_paras.append(p)
            continue
        m_lbl = re.match(r'^([A-J])\s+(.+)$', p)
        if m_lbl:
            formatted_paras.append(
                f'<p><span class="font-bold text-indigo-700 font-sans mr-2 text-base">[{m_lbl.group(1)}]</span>{m_lbl.group(2)}</p>'
            )
        else:
            formatted_paras.append(f'<p>{p}</p>')

    # Check if this passage has an extra reading diagram (e.g. Cam 16 Test 4 Passage 1)
    extra_diagram_html = ""
    if (book, test_num, 'reading', start_q) in MAP_DIAGRAM_REGISTRY:
        reg = MAP_DIAGRAM_REGISTRY[(book, test_num, 'reading', start_q)]
        extra_diagram_html = f"""
        <div class="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 text-center font-sans">
          <div class="text-xs font-bold uppercase tracking-wider text-slate-500">{reg['diagramTitle']}</div>
          <img src="{reg['imageUrl']}" alt="{reg['diagramTitle']}" class="max-w-full h-auto mx-auto rounded border border-slate-200" />
          {f'<img src="{reg["extraImageUrl"]}" alt="{reg["diagramTitle"]} 2" class="max-w-full h-auto mx-auto rounded border border-slate-200" />' if reg.get("extraImageUrl") else ''}
        </div>
        """.strip()

    passage_content = f"""
    <div class="space-y-4 text-slate-800 leading-relaxed font-serif">
      <h2 class="text-xl font-bold text-slate-900 font-sans mb-4">{subtitle}</h2>
      {chr(10).join(formatted_paras)}
      {extra_diagram_html}
    </div>
    """.strip()

    all_q_lines = pre_question_lines + post_question_lines
    group_defs = []
    curr_title = ""
    curr_lines = []
    curr_min = start_q
    curr_max = end_q

    for l in all_q_lines:
        m = re.match(r'^Questions?\s+(\d+)(?:\s*(?:[-–]|and)\s*(\d+))?\s*$', l, re.I)
        if m:
            q1 = int(m.group(1))
            q2 = int(m.group(2)) if m.group(2) else q1
            # Fix known source HTML header typos on ieltstrainingonline.com
            if book == 18 and test_num == 3 and q1 == 6 and q2 == 13:
                q1, q2 = 9, 13
            # Skip overall section header like "Questions 14-26" if specific sub-groups follow
            if q1 == start_q and q2 == end_q and any(
                re.match(r'^Questions?\s+\d+(?:\s*(?:[-–]|and)\s*\d+)?\s*$', x, re.I) and x != l
                for x in all_q_lines
            ):
                continue
            if curr_title:
                group_defs.append((curr_title, curr_min, curr_max, curr_lines))
                curr_lines = []
            curr_title = f"Questions {q1}–{q2}" if q1 != q2 else f"Question {q1}"
            curr_min, curr_max = q1, q2
        elif curr_title:
            curr_lines.append(l)

    if curr_title:
        group_defs.append((curr_title, curr_min, curr_max, curr_lines))

    question_groups = []
    for g_idx, (g_title, g_min, g_max, g_lines) in enumerate(group_defs):
        q_type = detect_question_type(g_title, g_lines, "reading")
        reg = MAP_DIAGRAM_REGISTRY.get((book, test_num, 'reading', g_min))
        if reg:
            q_type = reg["type"]

        qs, box_opts = extract_questions_for_group(q_type, g_title, g_lines, answers, g_min, g_max)
        # Explicit official diagram labels for Cam 16 Test 4 Reading Q1-6 (printed inside the image)
        if book == 16 and test_num == 4 and g_min == 1 and g_max == 6:
            c16_t4_prompts = {
                1: "The Persian Qanat Method: [ 1 ] to direct the tunnellers",
                2: "The Persian Qanat Method: water runs into a [ 2 ] used by local people",
                3: "The Persian Qanat Method: vertical shafts to remove earth and for [ 3 ]",
                4: "Cross-section of a Roman Qanat Shaft: [ 4 ] made of wood or stone",
                5: "Cross-section of a Roman Qanat Shaft: [ 5 ] attached to the plumb line",
                6: "Cross-section of a Roman Qanat Shaft: handholds and footholds used for [ 6 ]"
            }
            for q_item in qs:
                q_item["prompt"] = c16_t4_prompts.get(q_item["questionNumber"], q_item["prompt"])
        instr_lines = [
            x for x in g_lines[:4]
            if not re.match(r'^\d+[\.\s]', x) and not re.match(r'^[A-J][\.\s]', x) and not re.match(r'^[ivx]+[\.\s]', x, re.I)
        ]
        instructions = " ".join(instr_lines[:3]).strip() or "Answer the questions below based on the reading passage."

        grp = {
            "id": f"r{book}-t{test_num}-s{sec_num}-g{g_idx + 1}",
            "type": q_type,
            "title": g_title,
            "instructions": instructions,
            "questions": qs
        }
        if box_opts and q_type in ("matching_headings", "matching_information", "matching_features", "matching_sentence_endings", "summary_completion"):
            grp["options"] = box_opts
        if reg:
            grp["imageUrl"] = reg["imageUrl"]
            grp["diagramTitle"] = reg["diagramTitle"]
            if reg.get("extraImageUrl"):
                grp["diagramSvg"] = f'<div class="space-y-3"><img src="{reg["imageUrl"]}" class="w-full h-auto rounded" /><img src="{reg["extraImageUrl"]}" class="w-full h-auto rounded" /></div>'
        question_groups.append(grp)

    return {
        "sectionNumber": sec_num,
        "title": f"Reading Passage {sec_num}",
        "subtitle": subtitle,
        "passageContent": passage_content,
        "questionGroups": question_groups
    }


def parse_reading_test(book: int, test_num: int) -> dict:
    if book == 17 and test_num == 3:
        return parse_cam17_r3_test()

    path = f"cache_html/cam{book}-reading-test{test_num}.html"
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        raw = f.read()
    lines = html_to_lines(raw, use_main=False)
    answers = parse_answers(lines, "reading")

    p1 = next(i for i, l in enumerate(lines) if re.match(r'^READING PASSAGE\s+1\s*$', l, re.I))
    p2 = next(i for i, l in enumerate(lines) if re.match(r'^READING PASSAGE\s+2\s*$', l, re.I))
    p3 = next(i for i, l in enumerate(lines) if re.match(r'^READING PASSAGE\s+3\s*$', l, re.I))
    ans_idx = next((i for i, l in enumerate(lines) if re.search(r'^Answers?\s+Cam\s+\d+', l, re.I)), len(lines))

    sections = [
        parse_reading_section(book, test_num, 1, lines[p1:p2], answers, 1, 13),
        parse_reading_section(book, test_num, 2, lines[p2:p3], answers, 14, 26),
        parse_reading_section(book, test_num, 3, lines[p3:ans_idx], answers, 27, 40),
    ]

    return {
        "id": f"cambridge-{book}-test-{test_num}-reading",
        "book": book,
        "testNumber": test_num,
        "module": "reading",
        "title": f"Cambridge {book} Academic Reading Test {test_num}",
        "durationMinutes": 60,
        "sections": sections
    }


def parse_cam17_r3_test() -> dict:
    with open("cache_html/cam17-reading-test3.html", 'r', encoding='utf-8', errors='ignore') as f:
        raw = f.read()
    # Extract the 3 passages and questions from engnovate HTML
    lines = html_to_lines(raw, use_main=True)
    idx_p1 = lines.index("The thylacine")
    idx_p2 = lines.index("Palm oil")
    idx_p3 = next(i for i, l in enumerate(lines) if l.startswith("Building the Skyline:"))
    idx_q1 = lines.index("Questions 1-5")
    idx_q14 = lines.index("Questions 14-20")
    idx_q27 = lines.index("Questions 27-31")
    idx_end = next(i for i, l in enumerate(lines) if l.startswith("Part 1:"))

    def clean_eng_q(q_slice):
        out = []
        i = 0
        while i < len(q_slice):
            l = q_slice[i]
            if l in ("Practice this section only", "Drag and drop an option to fill in each blank."):
                i += 1
                continue
            # Merge standalone question number with next line if next line is text
            if re.match(r'^\d+$', l) and i + 1 < len(q_slice):
                q_n = int(l)
                nxt = q_slice[i + 1]
                if nxt == "Drop answer here":
                    out.append(f"{q_n} ………")
                    i += 2
                    continue
                elif not re.match(r'^\d+$', nxt):
                    out.append(f"{q_n}. {nxt}")
                    i += 2
                    continue
            if re.match(r'^[A-J]\.?$', l) and i + 1 < len(q_slice):
                letter = l[0]
                nxt = q_slice[i + 1]
                if nxt not in ("TRUE", "FALSE", "NOT GIVEN", "YES", "NO"):
                    out.append(f"{letter}. {nxt}")
                i += 2
                continue
            out.append(l)
            i += 1
        # Also join broken inline blank lines e.g. "ate an entirely" + "1. diet" -> "ate an entirely 1 ……… diet"
        joined_out = []
        k = 0
        while k < len(out):
            cur = out[k]
            if k + 1 < len(out) and re.match(r'^\d+\.\s+', out[k + 1]) and (
                cur.endswith(("entirely", "on", "mother’s", "mother's", "3,100-year-old", "in", "stays", "The", "check", "restore", "skyscrapers", "this", "compared to", "how", "their"))
            ):
                m_n = re.match(r'^(\d+)\.\s+(.*)$', out[k + 1])
                q_n, rest = m_n.group(1), m_n.group(2)
                joined_out.append(f"{cur} {q_n} ……… {rest}")
                k += 2
            else:
                joined_out.append(cur)
                k += 1
        return joined_out

    sec1_lines = ["READING PASSAGE 1"] + lines[idx_p1:idx_p2] + clean_eng_q(lines[idx_q1:idx_q14])
    sec2_lines = ["READING PASSAGE 2"] + lines[idx_p2:idx_p3] + clean_eng_q(lines[idx_q14:idx_q27])
    sec3_lines = ["READING PASSAGE 3"] + lines[idx_p3:idx_q1] + clean_eng_q(lines[idx_q27:idx_end])

    return {
        "id": "cambridge-17-test-3-reading",
        "book": 17,
        "testNumber": 3,
        "module": "reading",
        "title": "Cambridge 17 Academic Reading Test 3",
        "durationMinutes": 60,
        "sections": [
            parse_reading_section(17, 3, 1, sec1_lines, CAM17_R3_ANSWERS, 1, 13),
            parse_reading_section(17, 3, 2, sec2_lines, CAM17_R3_ANSWERS, 14, 26),
            parse_reading_section(17, 3, 3, sec3_lines, CAM17_R3_ANSWERS, 27, 40),
        ]
    }


def parse_listening_part(
    book: int,
    test_num: int,
    part_num: int,
    part_lines: list[str],
    answers: dict[int, str],
    start_q: int,
    end_q: int,
    audio_url: str
) -> dict:
    cleaned = [l for l in part_lines if not re.match(r'^PART\s+\d+\s*$', l, re.I) and 'http' not in l]

    # Pick genuine topic subtitle (skip generic instruction lines)
    subtitle = f"Listening Part {part_num}"
    for l in cleaned[:10]:
        if re.match(r'^(?:Questions?|Complete|Write|Choose|Label|In boxes|One word|No more than|\d+[\.\s])', l, re.I):
            continue
        if 3 < len(l) < 75:
            subtitle = l.rstrip(':').strip()
            break

    group_defs = []
    curr_title = ""
    curr_lines = []
    curr_min = start_q
    curr_max = end_q

    for l in cleaned:
        m = re.match(r'^Questions?\s+(\d+)(?:\s*(?:[-–]|and)\s*(\d+))?\s*$', l, re.I)
        if m:
            q1 = int(m.group(1))
            q2 = int(m.group(2)) if m.group(2) else q1
            # Fix known source HTML header typos on ieltstrainingonline.com
            if book == 17 and test_num == 3 and q1 == 11 and q2 == 14:
                q1, q2 = 11, 12
            if book == 18 and test_num == 3 and q1 == 21 and q2 == 22 and curr_min == 21 and curr_max == 22:
                q1, q2 = 23, 24
            if book == 19 and test_num == 2 and q1 == 11 and q2 == 15:
                q1, q2 = 11, 16
            if q1 == start_q and q2 == end_q and any(
                re.match(r'^Questions?\s+\d+(?:\s*(?:[-–]|and)\s*\d+)?\s*$', x, re.I) and x != l
                for x in cleaned
            ):
                continue
            if curr_title:
                group_defs.append((curr_title, curr_min, curr_max, curr_lines))
                curr_lines = []
            curr_title = f"Questions {q1}–{q2}" if q1 != q2 else f"Question {q1}"
            curr_min, curr_max = q1, q2
        elif curr_title:
            curr_lines.append(l)

    if curr_title:
        group_defs.append((curr_title, curr_min, curr_max, curr_lines))
    if not group_defs:
        group_defs.append((f"Questions {start_q}–{end_q}", start_q, end_q, cleaned))

    is_cloze_part = (part_num in (1, 4)) and len(group_defs) == 1
    cloze_template = None
    if is_cloze_part:
        note_lines = [
            l for l in cleaned
            if not re.match(r'^(?:Questions?\s+\d+|Complete the|Write ONE|Write NO MORE)', l, re.I)
        ]
        cloze_lines = []
        for nl in note_lines:
            c = re.sub(r'(\d+)\s*£\s*[…\._]{2,}', r'£{{\1}}', nl)
            c = re.sub(r'(\d+)\s*\$\s*[…\._]{2,}', r'${{\1}}', c)
            c = re.sub(r'(\d+)\s*[…\._]{2,}', r'{{\1}}', c)
            cloze_lines.append(c)
        cloze_template = "\n".join(cloze_lines)

    question_groups = []
    for g_idx, (g_title, g_min, g_max, g_lines) in enumerate(group_defs):
        q_type = detect_question_type(g_title, g_lines, "listening")
        reg = MAP_DIAGRAM_REGISTRY.get((book, test_num, 'listening', g_min))
        if reg:
            q_type = reg["type"]

        qs, box_opts = extract_questions_for_group(q_type, g_title, g_lines, answers, g_min, g_max)
        if reg and reg.get("options"):
            box_opts = reg["options"]
            for q_item in qs:
                q_item["options"] = box_opts

        instr_lines = [
            x for x in g_lines[:4]
            if not re.match(r'^\d+[\.\s]', x) and not re.match(r'^[A-J][\.\s]', x)
        ]
        instructions = " ".join(instr_lines[:3]).strip() or (
            "Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer."
            if "completion" in q_type else "Choose the correct letter."
        )

        grp = {
            "id": f"l{book}-t{test_num}-p{part_num}-g{g_idx + 1}",
            "type": q_type,
            "title": g_title,
            "instructions": instructions,
            "questions": qs
        }
        if cloze_template and g_idx == 0 and "completion" in q_type:
            grp["clozeTemplate"] = cloze_template
        if box_opts and q_type in ("matching_features", "map_labelling", "diagram_labelling", "multiple_choice_multi"):
            grp["options"] = box_opts
        if reg:
            grp["imageUrl"] = reg["imageUrl"]
            grp["diagramTitle"] = reg["diagramTitle"]
        question_groups.append(grp)

    return {
        "sectionNumber": part_num,
        "title": f"Listening Part {part_num}",
        "subtitle": subtitle,
        "audioUrl": audio_url,
        "questionGroups": question_groups
    }


def parse_listening_test(book: int, test_num: int) -> dict:
    path = f"cache_html/cam{book}-listening-test{test_num}.html"
    with open(path, 'r', encoding='utf-8', errors='ignore') as f:
        raw = f.read()
    lines = html_to_lines(raw, use_main=False)
    answers = parse_answers(lines, "listening")

    p1 = next(i for i, l in enumerate(lines) if re.match(r'^PART\s+1\s*$', l, re.I))
    p2 = next(i for i, l in enumerate(lines) if re.match(r'^PART\s+2\s*$', l, re.I))
    p3 = next(i for i, l in enumerate(lines) if re.match(r'^PART\s+3\s*$', l, re.I))
    p4 = next(i for i, l in enumerate(lines) if re.match(r'^PART\s+4\s*$', l, re.I))
    ans_idx = next((i for i, l in enumerate(lines) if re.search(r'^Answers?\s+Cam\s+\d+', l, re.I)), len(lines))

    ext = "m4a" if book == 19 else "mp3"
    sections = [
        parse_listening_part(book, test_num, 1, lines[p1:p2], answers, 1, 10, f"/audio/cam{book}-test{test_num}-part1.{ext}"),
        parse_listening_part(book, test_num, 2, lines[p2:p3], answers, 11, 20, f"/audio/cam{book}-test{test_num}-part2.{ext}"),
        parse_listening_part(book, test_num, 3, lines[p3:p4], answers, 21, 30, f"/audio/cam{book}-test{test_num}-part3.{ext}"),
        parse_listening_part(book, test_num, 4, lines[p4:ans_idx], answers, 31, 40, f"/audio/cam{book}-test{test_num}-part4.{ext}"),
    ]

    return {
        "id": f"cambridge-{book}-test-{test_num}-listening",
        "book": book,
        "testNumber": test_num,
        "module": "listening",
        "title": f"Cambridge {book} Academic Listening Test {test_num}",
        "durationMinutes": 35,
        "audioUrl": f"/audio/cam{book}-test{test_num}-part1.{ext}",
        "sections": sections
    }


# ============================================================================
# 4. GENERATE ALL TYPESCRIPT DATA FILES & BACKEND JSON
# ============================================================================
def load_handcrafted_cam18_t1():
    with open("src/data/cambridge18.ts", "r", encoding="utf-8") as f:
        content = f.read()
    r_m = re.search(r'export const cambridge18Test1Reading:\s*IELTSMockTest\s*=\s*(\{.*?\n\});', content, re.S)
    l_m = re.search(r'export const cambridge18Test1Listening:\s*IELTSMockTest\s*=\s*(\{.*?\n\});', content, re.S)
    return json.loads(r_m.group(1)), json.loads(l_m.group(1))


def main():
    c18_t1_r, c18_t1_l = load_handcrafted_cam18_t1()
    all_tests = []

    for book in [16, 17, 18, 19, 20, 21]:
        book_tests = {}
        for t in [1, 2, 3, 4]:
            if book == 18 and t == 1:
                r_test = c18_t1_r
                l_test = c18_t1_l
            else:
                r_test = parse_reading_test(book, t)
                l_test = parse_listening_test(book, t)
            w_test = build_writing_test(book, t)

            book_tests[f"cambridge{book}Test{t}Reading"] = r_test
            book_tests[f"cambridge{book}Test{t}Listening"] = l_test
            book_tests[f"cambridge{book}Test{t}Writing"] = w_test

            all_tests.extend([r_test, l_test, w_test])

        # Write src/data/cambridge{book}.ts
        ts_lines = ["import type { IELTSMockTest } from '../types/ielts';\n"]
        for t in [1, 2, 3, 4]:
            for mod in ["Reading", "Listening"] + (["Writing"] if book in (16, 17) else []):
                key = f"cambridge{book}Test{t}{mod}"
                ts_lines.append(f"export const {key}: IELTSMockTest = {json.dumps(book_tests[key], indent=2, ensure_ascii=False)};\n")

        out_file = f"src/data/cambridge{book}.ts"
        with open(out_file, "w", encoding="utf-8") as f:
            f.write("\n".join(ts_lines))
        print(f"[OK] Wrote {out_file} ({os.path.getsize(out_file)//1024} KB)")

    # Write src/data/cambridgeWritingTests.ts (Books 17, 18, 19, 20, 21 Writing tests)
    w_lines = ["import type { IELTSMockTest } from '../types/ielts';\n"]
    for book in [17, 18, 19, 20, 21]:
        for t in [1, 2, 3, 4]:
            w_obj = build_writing_test(book, t)
            key = f"cambridge{book}Test{t}Writing"
            w_lines.append(f"export const {key}: IELTSMockTest = {json.dumps(w_obj, indent=2, ensure_ascii=False)};\n")

    with open("src/data/cambridgeWritingTests.ts", "w", encoding="utf-8") as f:
        f.write("\n".join(w_lines))
    print(f"[OK] Wrote src/data/cambridgeWritingTests.ts ({os.path.getsize('src/data/cambridgeWritingTests.ts')//1024} KB)")

    # Write src/data/mockTests.ts with all 72 tests (Books 16, 17, 18, 19, 20, 21)
    mock_tests_ts = """import type { IELTSMockTest, FullMockTest } from '../types/ielts';

import {
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,
} from './cambridge16';

import {
  cambridge17Test1Reading, cambridge17Test1Listening, cambridge17Test1Writing,
  cambridge17Test2Reading, cambridge17Test2Listening, cambridge17Test2Writing,
  cambridge17Test3Reading, cambridge17Test3Listening, cambridge17Test3Writing,
  cambridge17Test4Reading, cambridge17Test4Listening, cambridge17Test4Writing,
} from './cambridge17';

import {
  cambridge18Test1Reading, cambridge18Test1Listening,
  cambridge18Test2Reading, cambridge18Test2Listening,
  cambridge18Test3Reading, cambridge18Test3Listening,
  cambridge18Test4Reading, cambridge18Test4Listening,
} from './cambridge18';

import {
  cambridge19Test1Reading, cambridge19Test1Listening,
  cambridge19Test2Reading, cambridge19Test2Listening,
  cambridge19Test3Reading, cambridge19Test3Listening,
  cambridge19Test4Reading, cambridge19Test4Listening,
} from './cambridge19';

import {
  cambridge20Test1Reading, cambridge20Test1Listening,
  cambridge20Test2Reading, cambridge20Test2Listening,
  cambridge20Test3Reading, cambridge20Test3Listening,
  cambridge20Test4Reading, cambridge20Test4Listening,
} from './cambridge20';

import {
  cambridge21Test1Reading, cambridge21Test1Listening,
  cambridge21Test2Reading, cambridge21Test2Listening,
  cambridge21Test3Reading, cambridge21Test3Listening,
  cambridge21Test4Reading, cambridge21Test4Listening,
} from './cambridge21';

import {
  cambridge18Test1Writing, cambridge18Test2Writing, cambridge18Test3Writing, cambridge18Test4Writing,
  cambridge19Test1Writing, cambridge19Test2Writing, cambridge19Test3Writing, cambridge19Test4Writing,
  cambridge20Test1Writing, cambridge20Test2Writing, cambridge20Test3Writing, cambridge20Test4Writing,
  cambridge21Test1Writing, cambridge21Test2Writing, cambridge21Test3Writing, cambridge21Test4Writing,
} from './cambridgeWritingTests';

export {
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,
  cambridge17Test1Reading, cambridge17Test1Listening, cambridge17Test1Writing,
  cambridge17Test2Reading, cambridge17Test2Listening, cambridge17Test2Writing,
  cambridge17Test3Reading, cambridge17Test3Listening, cambridge17Test3Writing,
  cambridge17Test4Reading, cambridge17Test4Listening, cambridge17Test4Writing,
  cambridge18Test1Reading, cambridge18Test1Listening, cambridge18Test1Writing,
  cambridge18Test2Reading, cambridge18Test2Listening, cambridge18Test2Writing,
  cambridge18Test3Reading, cambridge18Test3Listening, cambridge18Test3Writing,
  cambridge18Test4Reading, cambridge18Test4Listening, cambridge18Test4Writing,
  cambridge19Test1Reading, cambridge19Test1Listening, cambridge19Test1Writing,
  cambridge19Test2Reading, cambridge19Test2Listening, cambridge19Test2Writing,
  cambridge19Test3Reading, cambridge19Test3Listening, cambridge19Test3Writing,
  cambridge19Test4Reading, cambridge19Test4Listening, cambridge19Test4Writing,
  cambridge20Test1Reading, cambridge20Test1Listening, cambridge20Test1Writing,
  cambridge20Test2Reading, cambridge20Test2Listening, cambridge20Test2Writing,
  cambridge20Test3Reading, cambridge20Test3Listening, cambridge20Test3Writing,
  cambridge20Test4Reading, cambridge20Test4Listening, cambridge20Test4Writing,
  cambridge21Test1Reading, cambridge21Test1Listening, cambridge21Test1Writing,
  cambridge21Test2Reading, cambridge21Test2Listening, cambridge21Test2Writing,
  cambridge21Test3Reading, cambridge21Test3Listening, cambridge21Test3Writing,
  cambridge21Test4Reading, cambridge21Test4Listening, cambridge21Test4Writing,
};

// All 72 authentic official Cambridge Academic tests (Books 16, 17, 18, 19, 20, 21 — Reading, Listening & Writing)
export const allMockTests: IELTSMockTest[] = [
  // Cambridge 16 (Reading, Listening, Writing)
  cambridge16Test1Reading, cambridge16Test1Listening, cambridge16Test1Writing,
  cambridge16Test2Reading, cambridge16Test2Listening, cambridge16Test2Writing,
  cambridge16Test3Reading, cambridge16Test3Listening, cambridge16Test3Writing,
  cambridge16Test4Reading, cambridge16Test4Listening, cambridge16Test4Writing,

  // Cambridge 17 (Reading, Listening, Writing)
  cambridge17Test1Reading, cambridge17Test1Listening, cambridge17Test1Writing,
  cambridge17Test2Reading, cambridge17Test2Listening, cambridge17Test2Writing,
  cambridge17Test3Reading, cambridge17Test3Listening, cambridge17Test3Writing,
  cambridge17Test4Reading, cambridge17Test4Listening, cambridge17Test4Writing,

  // Cambridge 18 (Reading, Listening, Writing)
  cambridge18Test1Reading, cambridge18Test1Listening, cambridge18Test1Writing,
  cambridge18Test2Reading, cambridge18Test2Listening, cambridge18Test2Writing,
  cambridge18Test3Reading, cambridge18Test3Listening, cambridge18Test3Writing,
  cambridge18Test4Reading, cambridge18Test4Listening, cambridge18Test4Writing,

  // Cambridge 19 (Reading, Listening, Writing)
  cambridge19Test1Reading, cambridge19Test1Listening, cambridge19Test1Writing,
  cambridge19Test2Reading, cambridge19Test2Listening, cambridge19Test2Writing,
  cambridge19Test3Reading, cambridge19Test3Listening, cambridge19Test3Writing,
  cambridge19Test4Reading, cambridge19Test4Listening, cambridge19Test4Writing,

  // Cambridge 20 (Reading, Listening, Writing)
  cambridge20Test1Reading, cambridge20Test1Listening, cambridge20Test1Writing,
  cambridge20Test2Reading, cambridge20Test2Listening, cambridge20Test2Writing,
  cambridge20Test3Reading, cambridge20Test3Listening, cambridge20Test3Writing,
  cambridge20Test4Reading, cambridge20Test4Listening, cambridge20Test4Writing,

  // Cambridge 21 (Reading, Listening, Writing)
  cambridge21Test1Reading, cambridge21Test1Listening, cambridge21Test1Writing,
  cambridge21Test2Reading, cambridge21Test2Listening, cambridge21Test2Writing,
  cambridge21Test3Reading, cambridge21Test3Listening, cambridge21Test3Writing,
  cambridge21Test4Reading, cambridge21Test4Listening, cambridge21Test4Writing,
];

export function getMockTestById(id: string): IELTSMockTest | undefined {
  return allMockTests.find((t) => t.id === id);
}

export function getTestsByBookAndModule(book: number, module?: 'reading' | 'listening' | 'writing'): IELTSMockTest[] {
  return allMockTests.filter((t) => t.book === book && (!module || t.module === module));
}

// Build full mock test bundles (reading + listening + optional writing from same book/test number)
export function buildFullMockTests(testsPool: IELTSMockTest[] = allMockTests): FullMockTest[] {
  const fullTests: FullMockTest[] = [];
  const books = [...new Set(testsPool.map((t) => t.book))].sort();

  for (const book of books) {
    const bookTests = testsPool.filter((t) => t.book === book);
    const testNumbers = [...new Set(bookTests.map((t) => t.testNumber))].sort();

    for (const testNum of testNumbers) {
      const reading = bookTests.find((t) => t.testNumber === testNum && t.module === 'reading');
      const listening = bookTests.find((t) => t.testNumber === testNum && t.module === 'listening');
      const writing = bookTests.find((t) => t.testNumber === testNum && t.module === 'writing');

      if (reading && listening) {
        fullTests.push({
          id: `cambridge-${book}-test-${testNum}-full`,
          book,
          testNumber: testNum,
          title: `Cambridge ${book} Test ${testNum} — Full Mock`,
          readingTest: reading,
          listeningTest: listening,
          writingTest: writing || undefined,
          totalDurationMinutes: reading.durationMinutes + listening.durationMinutes + (writing ? writing.durationMinutes : 0),
        });
      }
    }
  }

  return fullTests;
}

export const allFullMockTests: FullMockTest[] = buildFullMockTests();
"""
    with open("src/data/mockTests.ts", "w", encoding="utf-8") as f:
        f.write(mock_tests_ts)
    print("[OK] Wrote src/data/mockTests.ts")

    # Export backend/data/tests.json
    os.makedirs("backend/data", exist_ok=True)
    with open("backend/data/tests.json", "w", encoding="utf-8") as f:
        json.dump(all_tests, f, indent=2, ensure_ascii=False)
    print(f"[OK] Exported {len(all_tests)} tests to backend/data/tests.json ({os.path.getsize('backend/data/tests.json')//1024} KB)")

    # Quick audit of all 72 tests
    issues = []
    for t in all_tests:
        q_nums = []
        for s in t["sections"]:
            if s.get("subtitle") in ("A", "B", "Complete the notes below."):
                issues.append(f"{t['id']} S{s['sectionNumber']}: Bad subtitle '{s.get('subtitle')}'")
            for g in s["questionGroups"]:
                for q in g["questions"]:
                    q_nums.append(q["questionNumber"])
                    if not str(q.get("correctAnswer", "")).strip():
                        issues.append(f"{t['id']} Q{q['questionNumber']}: Empty correctAnswer")
                    if t["module"] != "writing" and re.match(r'^Question\s+\d+(\s*\[\s*\d+\s*\])?$', q["prompt"]):
                        issues.append(f"{t['id']} Q{q['questionNumber']} ({g['type']}): Fallback prompt '{q['prompt']}'")
        expected = [1, 2] if t["module"] == "writing" else list(range(1, 41))
        if q_nums != expected:
            issues.append(f"{t['id']}: Question numbers mismatch ({len(q_nums)} questions: {q_nums[:5]}...{q_nums[-5:]})")

    print(f"\n=== AUDIT SUMMARY ({len(all_tests)} tests) ===")
    print(f"Total issues found: {len(issues)}")
    for iss in issues[:40]:
        print("  [ISSUE]", iss)


if __name__ == "__main__":
    main()
