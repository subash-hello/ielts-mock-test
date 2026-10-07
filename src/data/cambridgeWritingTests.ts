import type { IELTSMockTest } from '../types/ielts';

// ==========================================
// CAMBRIDGE 18 ACADEMIC WRITING TESTS (1–4)
// ==========================================

export const cambridge18Test1Writing: IELTSMockTest = {
  id: "cambridge-18-test-1-writing",
  book: 18,
  testNumber: 1,
  module: "writing",
  title: "Cambridge 18 Academic Writing Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Elderly population percentage in Japan, Sweden and USA (1940–2040)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 18 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Percentage of population aged 65 and over (1940–2040)</h3>
  </div>
  <div class="space-y-1.5 mb-6">
    <div class="flex items-center justify-between text-xs font-bold text-slate-800 px-2">
      <span>CHART 1: Proportion of population aged 65+ in Japan, Sweden, and USA</span>
      <span class="text-[10px] text-slate-500 font-normal">Source: Official Statistics & Projections</span>
    </div>
    <div class="bg-slate-50/60 p-3 sm:p-4 rounded-xl border border-slate-200">
      <svg viewBox="0 0 640 240" class="w-full h-auto max-w-2xl mx-auto font-sans select-none">
        <line x1="60" y1="20" x2="600" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="65" x2="600" y2="65" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="110" x2="600" y2="110" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="155" x2="600" y2="155" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="3,3" />
        <line x1="60" y1="200" x2="600" y2="200" stroke="#94a3b8" stroke-width="1.5" />
        <line x1="60" y1="15" x2="60" y2="200" stroke="#94a3b8" stroke-width="1.5" />
        <text x="50" y="204" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">0%</text>
        <text x="50" y="159" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">10%</text>
        <text x="50" y="114" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">20%</text>
        <text x="50" y="69" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">30%</text>
        <text x="50" y="24" text-anchor="end" font-size="11" font-weight="600" fill="#64748b">40%</text>
        <text x="90" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1940</text>
        <text x="190" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1960</text>
        <text x="290" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">1980</text>
        <text x="390" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2000</text>
        <text x="490" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2020</text>
        <text x="580" y="222" text-anchor="middle" font-size="11" font-weight="bold" fill="#334155">2040</text>
        <polyline fill="none" stroke="#2563eb" stroke-width="3" points="90,158 190,155 290,135 390,132 490,118 580,78" />
        <polyline fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,4" points="90,168 190,160 290,130 390,110 490,95 580,82" />
        <polyline fill="none" stroke="#059669" stroke-width="3" stroke-dasharray="2,2" points="90,178 190,180 290,175 390,160 490,120 580,45" />
      </svg>
      <div class="flex flex-wrap items-center justify-center gap-6 mt-3 pt-2 border-t border-slate-200/70 text-xs font-bold">
        <div class="flex items-center gap-2"><span class="w-4 h-1 bg-blue-600 rounded"></span><span class="text-blue-900">USA (9% → 23%)</span></div>
        <div class="flex items-center gap-2"><span class="w-4 h-1 bg-red-600 border border-dashed border-red-600"></span><span class="text-red-900">Sweden (7% → 25%)</span></div>
        <div class="flex items-center gap-2"><span class="w-4 h-1 bg-emerald-600 border border-dotted border-emerald-600"></span><span class="text-emerald-900">Japan (5% → 36%)</span></div>
      </div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w1-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The graph below shows the proportion of the population aged 65 and over between 1940 and 2040 in three countries: Japan, Sweden, and the USA.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Evaluated on Task Achievement, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Trained professionals working abroad essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people believe that professionals, such as doctors and engineers, should be required to work in the country where they did their training. Others believe they should be free to work in another country if they wish.<br/><br/>
    Discuss both views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w1-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people believe that professionals, such as doctors and engineers, should be required to work in the country where they did their training. Others believe they should be free to work in another country if they wish.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluated on Task Response, Coherence & Cohesion, Lexical Resource, and Grammatical Range & Accuracy."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test2Writing: IELTSMockTest = {
  id: "cambridge-18-test-2-writing",
  book: 18,
  testNumber: 2,
  module: "writing",
  title: "Cambridge 18 Academic Writing Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Water consumption across global regions",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 18 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Percentage of water used for different purposes in six global areas</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Region</th>
          <th class="p-2.5 border border-slate-300 text-center text-blue-700">Industrial Use (%)</th>
          <th class="p-2.5 border border-slate-300 text-center text-emerald-700">Agricultural Use (%)</th>
          <th class="p-2.5 border border-slate-300 text-center text-amber-700">Domestic Use (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">North America</td><td class="p-2 border border-slate-300 text-center font-bold">48%</td><td class="p-2 border border-slate-300 text-center font-bold">39%</td><td class="p-2 border border-slate-300 text-center font-bold">13%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Europe</td><td class="p-2 border border-slate-300 text-center font-bold">53%</td><td class="p-2 border border-slate-300 text-center font-bold">32%</td><td class="p-2 border border-slate-300 text-center font-bold">15%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">South America</td><td class="p-2 border border-slate-300 text-center font-bold">10%</td><td class="p-2 border border-slate-300 text-center font-bold">71%</td><td class="p-2 border border-slate-300 text-center font-bold">19%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Africa</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td><td class="p-2 border border-slate-300 text-center font-bold">84%</td><td class="p-2 border border-slate-300 text-center font-bold">9%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Central Asia</td><td class="p-2 border border-slate-300 text-center font-bold">5%</td><td class="p-2 border border-slate-300 text-center font-bold">88%</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">South East Asia</td><td class="p-2 border border-slate-300 text-center font-bold">12%</td><td class="p-2 border border-slate-300 text-center font-bold">81%</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w2-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below shows the percentage of water used for different purposes in six areas of the world.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Analyzes regional water allocation across industrial, agricultural, and domestic sectors."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Replacing parks with roads to cut commute time essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people think that the best way to reduce time spent travelling to work is to replace parks and gardens with new roads.<br/><br/>
    To what extent do you agree or disagree?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w2-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people think that the best way to reduce time spent travelling to work is to replace parks and gardens with new roads.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates environmental planning, public green space preservation, and urban transit solutions."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test3Writing: IELTSMockTest = {
  id: "cambridge-18-test-3-writing",
  book: 18,
  testNumber: 3,
  module: "writing",
  title: "Cambridge 18 Academic Writing Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Manufacturing process of ceramic pots",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 18 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">The Production Process of Handcrafted Ceramic Pots</h3>
  </div>
  <div class="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">1. Digging & Sifting:</strong> Raw clay is extracted from quarries and crushed through metal meshes.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">2. Water Mixing:</strong> Clay powder is mixed with water in tanks and conditioned for 72 hours.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">3. Potter's Wheel:</strong> Clay is shaped by hand on a rotating potter's wheel.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">4. Solar Drying:</strong> Pots dry in open sunlight for 48 hours to remove moisture.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">5. Kiln Firing:</strong> Fired in kiln at 1,000°C for hardening (bisque firing).</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">6. Glaze & Polish:</strong> Mineral glaze is painted and re-fired at 1,200°C before distribution.</div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w3-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagram illustrates the process of making handcrafted ceramic pots.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Evaluates chronological description of industrial manufacturing steps and transformation stages."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Species extinction vs other environmental crises essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people say that the main environmental problem of our time is the loss of particular species of plants and animals. Others say that there are more important environmental problems.<br/><br/>
    Discuss both these views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w3-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people say that the main environmental problem of our time is the loss of particular species of plants and animals. Others say that there are more important environmental problems.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates biodiversity conservation versus global warming, pollution, and resource depletion."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge18Test4Writing: IELTSMockTest = {
  id: "cambridge-18-test-4-writing",
  book: 18,
  testNumber: 4,
  module: "writing",
  title: "Cambridge 18 Academic Writing Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Underground railway systems in six cities",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 18 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Data on Underground Railway Systems in Six Major Cities</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">City</th>
          <th class="p-2.5 border border-slate-300 text-center">Date Opened</th>
          <th class="p-2.5 border border-slate-300 text-center">Kilometres of Route</th>
          <th class="p-2.5 border border-slate-300 text-center">Passengers per Year (Millions)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">London</td><td class="p-2 border border-slate-300 text-center font-mono">1863</td><td class="p-2 border border-slate-300 text-center font-bold">394 km</td><td class="p-2 border border-slate-300 text-center font-bold">1,185 m</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Paris</td><td class="p-2 border border-slate-300 text-center font-mono">1900</td><td class="p-2 border border-slate-300 text-center font-bold">199 km</td><td class="p-2 border border-slate-300 text-center font-bold">1,400 m</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Tokyo</td><td class="p-2 border border-slate-300 text-center font-mono">1927</td><td class="p-2 border border-slate-300 text-center font-bold">155 km</td><td class="p-2 border border-slate-300 text-center font-bold">3,161 m</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Washington DC</td><td class="p-2 border border-slate-300 text-center font-mono">1976</td><td class="p-2 border border-slate-300 text-center font-bold">126 km</td><td class="p-2 border border-slate-300 text-center font-bold">215 m</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Kyoto</td><td class="p-2 border border-slate-300 text-center font-mono">1981</td><td class="p-2 border border-slate-300 text-center font-bold">11 km</td><td class="p-2 border border-slate-300 text-center font-bold">45 m</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Los Angeles</td><td class="p-2 border border-slate-300 text-center font-mono">2001</td><td class="p-2 border border-slate-300 text-center font-bold">28 km</td><td class="p-2 border border-slate-300 text-center font-bold">50 m</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w4-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below shows data on the underground railway systems in six major global cities.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Compares age, network size, and passenger volume of global transit networks."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Aging population impact on governments and society essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "In many countries, people are living longer. Some people think that this causes problems for governments. Others believe there are benefits for society.<br/><br/>
    Discuss both views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c18-w4-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In many countries, people are living longer. Some people think that this causes problems for governments. Others believe there are benefits for society.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates demographic shifts, healthcare expenditure, retirement pensions, and elder contributions to society."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 19 ACADEMIC WRITING TESTS (1–4)
// ==========================================

export const cambridge19Test1Writing: IELTSMockTest = {
  id: "cambridge-19-test-1-writing",
  book: 19,
  testNumber: 1,
  module: "writing",
  title: "Cambridge 19 Academic Writing Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Energy production sources comparison (1995 vs 2015)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 19 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Comparison of Energy Sources in a European Nation (1995 vs 2015)</h3>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
      <h4 class="font-bold text-xs uppercase text-slate-800 mb-2">1995 (Total: 100%)</h4>
      <div class="space-y-1 text-xs">
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Coal</span><span class="text-indigo-700 font-bold">29.8%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Gas</span><span class="text-indigo-700 font-bold">29.6%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Petro</span><span class="text-indigo-700 font-bold">29.3%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Nuclear</span><span class="text-indigo-700 font-bold">6.4%</span></div>
        <div class="flex justify-between py-1 font-semibold"><span>Renewables</span><span class="text-indigo-700 font-bold">4.9%</span></div>
      </div>
    </div>
    <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
      <h4 class="font-bold text-xs uppercase text-slate-800 mb-2">2015 (Total: 100%)</h4>
      <div class="space-y-1 text-xs">
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Gas</span><span class="text-emerald-700 font-bold">36.1%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Coal</span><span class="text-emerald-700 font-bold">30.9%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Petro</span><span class="text-emerald-700 font-bold">19.5%</span></div>
        <div class="flex justify-between py-1 border-b border-slate-200 font-semibold"><span>Nuclear</span><span class="text-emerald-700 font-bold">10.1%</span></div>
        <div class="flex justify-between py-1 font-semibold"><span>Renewables</span><span class="text-emerald-700 font-bold">3.4%</span></div>
      </div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w1-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The tables show the comparison of different energy sources used in a country in 1995 and 2015.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Analyzes shifts between fossil fuel dependence, nuclear expansion, and renewable power."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "University curriculum: career skills vs student passions essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people believe that university students should focus only on subjects that will help them in their future careers. Others think universities should encourage students to study whatever subjects they find interesting.<br/><br/>
    Discuss both views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w1-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people believe that university students should focus only on subjects that will help them in their future careers. Others think universities should encourage students to study whatever subjects they find interesting.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates pragmatic vocational career training versus liberal intellectual exploration."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge19Test2Writing: IELTSMockTest = {
  id: "cambridge-19-test-2-writing",
  book: 19,
  testNumber: 2,
  module: "writing",
  title: "Cambridge 19 Academic Writing Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "International tourist visits across five regions (2010–2020)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 19 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">International Tourist Arrivals in Millions (2010 vs 2020)</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Region</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2010 (Millions)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2015 (Millions)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2020 (Millions)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Europe</td><td class="p-2 border border-slate-300 text-center font-bold">485 m</td><td class="p-2 border border-slate-300 text-center font-bold">608 m</td><td class="p-2 border border-slate-300 text-center font-bold">236 m</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Asia-Pacific</td><td class="p-2 border border-slate-300 text-center font-bold">205 m</td><td class="p-2 border border-slate-300 text-center font-bold">279 m</td><td class="p-2 border border-slate-300 text-center font-bold">59 m</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Americas</td><td class="p-2 border border-slate-300 text-center font-bold">150 m</td><td class="p-2 border border-slate-300 text-center font-bold">193 m</td><td class="p-2 border border-slate-300 text-center font-bold">69 m</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Middle East</td><td class="p-2 border border-slate-300 text-center font-bold">60 m</td><td class="p-2 border border-slate-300 text-center font-bold">55 m</td><td class="p-2 border border-slate-300 text-center font-bold">19 m</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Africa</td><td class="p-2 border border-slate-300 text-center font-bold">50 m</td><td class="p-2 border border-slate-300 text-center font-bold">53 m</td><td class="p-2 border border-slate-300 text-center font-bold">18 m</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w2-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below shows the number of international tourists visiting five different global regions between 2010 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Explores tourism growth through 2015 and the sharp downturn observed in 2020."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Online shopping replacing physical retail essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "In today's digital era, more and more people are shopping online instead of visiting physical stores.<br/><br/>
    Is this a positive or negative development?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w2-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In today's digital era, more and more people are shopping online instead of visiting physical stores.\n\nIs this a positive or negative development?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Analyzes convenience, packaging waste, local high-street decline, and e-commerce logistics."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge19Test3Writing: IELTSMockTest = {
  id: "cambridge-19-test-3-writing",
  book: 19,
  testNumber: 3,
  module: "writing",
  title: "Cambridge 19 Academic Writing Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Life cycle of the Pacific salmon",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 19 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">The Biological Life Cycle of Salmon Fish</h3>
  </div>
  <div class="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
      <div class="p-3 bg-white rounded-lg border border-slate-200 font-medium"><div class="font-bold text-indigo-800 mb-1">1. Eggs in Gravel</div>Rivers, reeds, upper slow-flowing water (5–6 months)</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200 font-medium"><div class="font-bold text-indigo-800 mb-1">2. Fry (Alevin)</div>Lower river estuary, 3–8 cm size (approx. 4 years)</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200 font-medium"><div class="font-bold text-indigo-800 mb-1">3. Smolt</div>Open ocean migration, 12–15 cm size (5 years)</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200 font-medium"><div class="font-bold text-indigo-800 mb-1">4. Mature Adult</div>Upstream river migration to spawn, 70–76 cm size</div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w3-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagram below shows the life cycle of the salmon fish from river birth to ocean maturity.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Natural process explanation spanning river freshwater, marine salt water, and spawning migration."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Abolishing homework in primary school essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some educational researchers believe that homework should be abolished for primary school students because it causes unnecessary stress.<br/><br/>
    To what extent do you agree or disagree?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w3-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some educational researchers believe that homework should be abolished for primary school students because it causes unnecessary stress.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates child psychology, academic reinforcement, playtime balance, and parental pressure."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge19Test4Writing: IELTSMockTest = {
  id: "cambridge-19-test-4-writing",
  book: 19,
  testNumber: 4,
  module: "writing",
  title: "Cambridge 19 Academic Writing Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Weekly household spending by income category",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 19 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Percentage of Weekly Expenditure by Household Income Bracket</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Income Bracket</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">Food & Drink (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">Housing & Energy (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">Recreation & Leisure (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Low Income (&lt;$30k)</td><td class="p-2 border border-slate-300 text-center font-bold">38%</td><td class="p-2 border border-slate-300 text-center font-bold">42%</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Middle Income ($30k–$80k)</td><td class="p-2 border border-slate-300 text-center font-bold">24%</td><td class="p-2 border border-slate-300 text-center font-bold">29%</td><td class="p-2 border border-slate-300 text-center font-bold">18%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">High Income (&gt;$80k)</td><td class="p-2 border border-slate-300 text-center font-bold">14%</td><td class="p-2 border border-slate-300 text-center font-bold">21%</td><td class="p-2 border border-slate-300 text-center font-bold">34%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w4-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below compares the average weekly expenditure on food, housing, and leisure activities by families in three different income brackets.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Analyzes proportional necessity spending vs discretionary recreation."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Housing shortage: countryside vs urban renewal essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Many cities around the world are facing severe housing shortages. Some people believe that governments should build new homes in countryside areas, while others think housing should only be built in existing urban areas.<br/><br/>
    Discuss both views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c19-w4-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Many cities around the world are facing severe housing shortages. Some people believe that governments should build new homes in countryside areas, while others think housing should only be built in existing urban areas.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates greenbelt conservation versus brownfield urban redevelopment and transit infrastructure."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 20 ACADEMIC WRITING TESTS (1–4)
// ==========================================

export const cambridge20Test1Writing: IELTSMockTest = {
  id: "cambridge-20-test-1-writing",
  book: 20,
  testNumber: 1,
  module: "writing",
  title: "Cambridge 20 Academic Writing Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Global urban and rural population trends (1970–2030)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 20 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Percentage of Population Living in Urban Areas (1970–2030 Projected)</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Continent</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">1970</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">1990</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2010</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2030 (Projected)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">North America</td><td class="p-2 border border-slate-300 text-center font-bold">74%</td><td class="p-2 border border-slate-300 text-center font-bold">75%</td><td class="p-2 border border-slate-300 text-center font-bold">82%</td><td class="p-2 border border-slate-300 text-center font-bold">87%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Europe</td><td class="p-2 border border-slate-300 text-center font-bold">63%</td><td class="p-2 border border-slate-300 text-center font-bold">70%</td><td class="p-2 border border-slate-300 text-center font-bold">73%</td><td class="p-2 border border-slate-300 text-center font-bold">78%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Latin America</td><td class="p-2 border border-slate-300 text-center font-bold">57%</td><td class="p-2 border border-slate-300 text-center font-bold">71%</td><td class="p-2 border border-slate-300 text-center font-bold">79%</td><td class="p-2 border border-slate-300 text-center font-bold">84%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Asia</td><td class="p-2 border border-slate-300 text-center font-bold">23%</td><td class="p-2 border border-slate-300 text-center font-bold">32%</td><td class="p-2 border border-slate-300 text-center font-bold">44%</td><td class="p-2 border border-slate-300 text-center font-bold">55%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Africa</td><td class="p-2 border border-slate-300 text-center font-bold">24%</td><td class="p-2 border border-slate-300 text-center font-bold">31%</td><td class="p-2 border border-slate-300 text-center font-bold">39%</td><td class="p-2 border border-slate-300 text-center font-bold">49%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w1-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below shows the percentage of the population living in urban areas in five world regions between 1970 and 2030.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Examines demographic urbanization across industrial and developing continents."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "AI and workplace automation essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Artificial intelligence and automation technologies are increasingly transforming workplaces. Some fear large-scale unemployment, while others see new opportunities for human creativity.<br/><br/>
    Discuss both viewpoints and state your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w1-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Artificial intelligence and automation technologies are increasingly transforming workplaces. Some fear large-scale unemployment, while others see new opportunities for human creativity.\n\nDiscuss both viewpoints and state your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Assesses economic disruption versus high-order cognitive creativity in technological transition."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge20Test2Writing: IELTSMockTest = {
  id: "cambridge-20-test-2-writing",
  book: 20,
  testNumber: 2,
  module: "writing",
  title: "Cambridge 20 Academic Writing Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Coastal town harbor redevelopment maps",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 20 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Pebbleton Harbor Village: 1980 vs Present Day</h3>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <h4 class="font-bold text-slate-900 mb-2 border-b pb-1">1980 Layout</h4>
      <ul class="list-disc pl-4 space-y-1">
        <li>Working commercial fishing docks along north beach</li>
        <li>Traditional boatyards and coal storage shed on western pier</li>
        <li>Single dual-lane gravel road entering village from south</li>
        <li>12 residential fishermen cottages and local fishmarket</li>
      </ul>
    </div>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <h4 class="font-bold text-slate-900 mb-2 border-b pb-1">Present Day Layout</h4>
      <ul class="list-disc pl-4 space-y-1">
        <li>Luxury yacht marina replacing commercial fishing docks</li>
        <li>Hotel, waterfront seafood restaurants, and pedestrian promenade</li>
        <li>Expanded paved highway with multi-tier visitor parking</li>
        <li>Converted holiday apartments and nautical souvenir retail strip</li>
      </ul>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w2-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagrams show the changes to a coastal harbor village between 1980 and the present day.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Explains infrastructural and economic transformation from artisanal fishing to commercial tourism."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Space exploration budget vs earthly issues essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people argue that space exploration is a waste of financial resources and governments should focus solely on resolving problems on Earth.<br/><br/>
    Do you agree or disagree?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w2-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people argue that space exploration is a waste of financial resources and governments should focus solely on resolving problems on Earth.\n\nDo you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates satellite technology, scientific innovation, poverty reduction, and resource allocation."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge20Test3Writing: IELTSMockTest = {
  id: "cambridge-20-test-3-writing",
  book: 20,
  testNumber: 3,
  module: "writing",
  title: "Cambridge 20 Academic Writing Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Public library digital vs physical usage across age groups",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 20 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Public Library Checkouts: Physical Books vs E-Books by Age Group</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Age Demographic</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">Physical Books Borrowed (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">E-Books & Audiobooks (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Under 18</td><td class="p-2 border border-slate-300 text-center font-bold">68%</td><td class="p-2 border border-slate-300 text-center font-bold">32%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">18–29</td><td class="p-2 border border-slate-300 text-center font-bold">29%</td><td class="p-2 border border-slate-300 text-center font-bold">71%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">30–49</td><td class="p-2 border border-slate-300 text-center font-bold">42%</td><td class="p-2 border border-slate-300 text-center font-bold">58%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">50–64</td><td class="p-2 border border-slate-300 text-center font-bold">64%</td><td class="p-2 border border-slate-300 text-center font-bold">36%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">65 and over</td><td class="p-2 border border-slate-300 text-center font-bold">81%</td><td class="p-2 border border-slate-300 text-center font-bold">19%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w3-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table compares public library usage between physical books and digital e-books across five age demographics.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Contrasts younger digital readers against senior preference for physical volumes."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Digital media vs printed books for children essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "It is often argued that television and digital media have largely replaced books as the primary source of entertainment and knowledge for children.<br/><br/>
    To what extent do you agree or disagree?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w3-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "It is often argued that television and digital media have largely replaced books as the primary source of entertainment and knowledge for children.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates screen exposure, literary attention spans, interactive learning, and deep reading."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge20Test4Writing: IELTSMockTest = {
  id: "cambridge-20-test-4-writing",
  book: 20,
  testNumber: 4,
  module: "writing",
  title: "Cambridge 20 Academic Writing Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Glass bottle recycling and reproduction process",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 20 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">The Recycling and Remanufacturing Process of Glass Bottles</h3>
  </div>
  <div class="p-4 bg-slate-50/80 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">1. Collection:</strong> Used bottles deposited in municipal recycling banks and trucked to processing plants.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">2. Optical Sorting:</strong> High-speed optical scanners sort glass by clear, green, and amber colors.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">3. Crushing (Cullet):</strong> Bottles are washed with high-pressure water and crushed into uniform cullet.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">4. Furnace Melting:</strong> Cullet is melted in a high-temperature gas furnace at 1,500°C.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">5. Blow Molding:</strong> Molten glass streams enter bottle molds and are shaped using compressed air.</div>
      <div class="p-3 bg-white rounded-lg border border-slate-200"><strong class="text-indigo-800">6. Quality Inspection:</strong> Cooled bottles pass laser inspections before bottling plant distribution.</div>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w4-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The diagram illustrates how recycled glass bottles are collected, processed, and remanufactured into new glassware products.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Explains circular economy recycling loop from household disposal to industrial bottle forming."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Young adults choosing to live alone essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "In many societies, an increasing number of young adults are choosing to live alone rather than with family or roommates.<br/><br/>
    Discuss the advantages and disadvantages of this trend."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c20-w4-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "In many societies, an increasing number of young adults are choosing to live alone rather than with family or roommates.\n\nDiscuss the advantages and disadvantages of this trend.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates autonomy, independence, and financial autonomy against living costs and isolation."
            }
          ]
        }
      ]
    }
  ]
};

// ==========================================
// CAMBRIDGE 21 ACADEMIC WRITING TESTS (1–4)
// ==========================================

export const cambridge21Test1Writing: IELTSMockTest = {
  id: "cambridge-21-test-1-writing",
  book: 21,
  testNumber: 1,
  module: "writing",
  title: "Cambridge 21 Academic Writing Test 1",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Commuter transport mode shares (2005 vs 2025)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 21 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Modal Commuter Transport Shares in a Metropolitan Region (2005 vs 2025)</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Transportation Mode</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2005 Share (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2015 Share (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2025 Share (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Private Automobile</td><td class="p-2 border border-slate-300 text-center font-bold">58%</td><td class="p-2 border border-slate-300 text-center font-bold">50%</td><td class="p-2 border border-slate-300 text-center font-bold">39%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Public Rapid Rail</td><td class="p-2 border border-slate-300 text-center font-bold">21%</td><td class="p-2 border border-slate-300 text-center font-bold">26%</td><td class="p-2 border border-slate-300 text-center font-bold">32%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Buses & Trams</td><td class="p-2 border border-slate-300 text-center font-bold">12%</td><td class="p-2 border border-slate-300 text-center font-bold">11%</td><td class="p-2 border border-slate-300 text-center font-bold">13%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Cycling & E-Bikes</td><td class="p-2 border border-slate-300 text-center font-bold">4%</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td><td class="p-2 border border-slate-300 text-center font-bold">11%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Walking</td><td class="p-2 border border-slate-300 text-center font-bold">5%</td><td class="p-2 border border-slate-300 text-center font-bold">6%</td><td class="p-2 border border-slate-300 text-center font-bold">5%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w1-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below illustrates the modes of transportation used by commuters in a metropolitan area between 2005 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Examines modal transition away from private cars toward mass rapid transit and cycling."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Compulsory climate education in secondary schools essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some experts advocate that climate education should be made a compulsory curriculum subject for all secondary school students.<br/><br/>
    To what extent do you agree or disagree?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w1-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some experts advocate that climate education should be made a compulsory curriculum subject for all secondary school students.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates environmental literacy, academic curriculum overload, and student civic agency."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge21Test2Writing: IELTSMockTest = {
  id: "cambridge-21-test-2-writing",
  book: 21,
  testNumber: 2,
  module: "writing",
  title: "Cambridge 21 Academic Writing Test 2",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Global vehicle sales by engine type (2015–2025)",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 21 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Global Vehicle Sales Share: Electric, Hybrid and ICE (2015–2025)</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Powertrain Type</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2015 (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2020 (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2025 (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Internal Combustion (Petrol/Diesel)</td><td class="p-2 border border-slate-300 text-center font-bold">96%</td><td class="p-2 border border-slate-300 text-center font-bold">86%</td><td class="p-2 border border-slate-300 text-center font-bold">61%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Hybrid Vehicles</td><td class="p-2 border border-slate-300 text-center font-bold">3%</td><td class="p-2 border border-slate-300 text-center font-bold">9%</td><td class="p-2 border border-slate-300 text-center font-bold">18%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">All-Electric Vehicles (EV)</td><td class="p-2 border border-slate-300 text-center font-bold">1%</td><td class="p-2 border border-slate-300 text-center font-bold">5%</td><td class="p-2 border border-slate-300 text-center font-bold">21%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w2-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table below depicts global vehicle sales market share by engine powertrain from 2015 to 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Explores automotive powertrain transition towards electrified drivetrains."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Remote and hybrid work model impacts essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "With the rise of remote and hybrid work models, traditional office spaces are undergoing fundamental changes.<br/><br/>
    Discuss the impacts of remote work on employee wellbeing and corporate productivity."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w2-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "With the rise of remote and hybrid work models, traditional office spaces are undergoing fundamental changes.\n\nDiscuss the impacts of remote work on employee wellbeing and corporate productivity.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates work-life flexibility, isolation, commuting reductions, and team cohesion."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge21Test3Writing: IELTSMockTest = {
  id: "cambridge-21-test-3-writing",
  book: 21,
  testNumber: 3,
  module: "writing",
  title: "Cambridge 21 Academic Writing Test 3",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Town centre pedestrianization plans",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 21 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Oldgate Historic Town Centre: Existing vs Proposed Plan</h3>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <h4 class="font-bold text-slate-900 mb-2 border-b pb-1">Current Urban Layout</h4>
      <ul class="list-disc pl-4 space-y-1">
        <li>Two-way thoroughfare with heavy motorized traffic and surface parking</li>
        <li>Narrow sidewalks with limited accessibility and high noise pollution</li>
        <li>Historical market square surrounded by parked vehicles</li>
        <li>No dedicated cycle lanes or green vegetation buffers</li>
      </ul>
    </div>
    <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
      <h4 class="font-bold text-slate-900 mb-2 border-b pb-1">Proposed Master Plan</h4>
      <ul class="list-disc pl-4 space-y-1">
        <li>Complete pedestrianization with vehicle traffic rerouted via perimeter ring road</li>
        <li>Permeable tree-lined avenue with outdoor dining terraces and bioswales</li>
        <li>Segregated bi-directional bicycle arterial path connecting rail terminal</li>
        <li>Underground parking garage beneath civic plaza</li>
      </ul>
    </div>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w3-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The plans show the existing layout and proposed architectural redevelopment of a historical town centre.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Explores urban design redevelopment, pedestrianization, and traffic calming."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Museum admission fees vs free public access essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Some people believe that museums and historical galleries should charge admission fees to fund maintenance, while others assert that cultural institutions should be freely accessible to everyone.<br/><br/>
    Discuss both views and give your opinion."
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w3-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Some people believe that museums and historical galleries should charge admission fees to fund maintenance, while others assert that cultural institutions should be freely accessible to everyone.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates fiscal sustainability of cultural artifacts versus equitable public education."
            }
          ]
        }
      ]
    }
  ]
};

export const cambridge21Test4Writing: IELTSMockTest = {
  id: "cambridge-21-test-4-writing",
  book: 21,
  testNumber: 4,
  module: "writing",
  title: "Cambridge 21 Academic Writing Test 4",
  durationMinutes: 60,
  sections: [
    {
      sectionNumber: 1,
      title: "Writing Task 1",
      subtitle: "Renewable energy production by source across four nations",
      passageContent: `<div class="my-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-xs font-sans">
  <div class="border-b border-slate-100 pb-3 mb-4 text-center">
    <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full inline-block">Official Cambridge Academic 21 • Task 1</span>
    <h3 class="font-extrabold text-slate-900 text-sm sm:text-base mt-2">Renewable Energy as Share of Total National Electricity (2000–2020)</h3>
  </div>
  <div class="overflow-x-auto">
    <table class="w-full text-xs text-left border-collapse border border-slate-300">
      <thead>
        <tr class="bg-slate-100 text-slate-800 font-bold">
          <th class="p-2.5 border border-slate-300">Country</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2000 (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2010 (%)</th>
          <th class="p-2.5 border border-slate-300 text-center font-mono">2020 (%)</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="p-2 border border-slate-300 font-semibold">Norway</td><td class="p-2 border border-slate-300 text-center font-bold">98%</td><td class="p-2 border border-slate-300 text-center font-bold">97%</td><td class="p-2 border border-slate-300 text-center font-bold">99%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">Germany</td><td class="p-2 border border-slate-300 text-center font-bold">6%</td><td class="p-2 border border-slate-300 text-center font-bold">17%</td><td class="p-2 border border-slate-300 text-center font-bold">45%</td></tr>
        <tr><td class="p-2 border border-slate-300 font-semibold">Spain</td><td class="p-2 border border-slate-300 text-center font-bold">15%</td><td class="p-2 border border-slate-300 text-center font-bold">32%</td><td class="p-2 border border-slate-300 text-center font-bold">44%</td></tr>
        <tr class="bg-slate-50"><td class="p-2 border border-slate-300 font-semibold">United Kingdom</td><td class="p-2 border border-slate-300 text-center font-bold">3%</td><td class="p-2 border border-slate-300 text-center font-bold">7%</td><td class="p-2 border border-slate-300 text-center font-bold">43%</td></tr>
      </tbody>
    </table>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w4-qg1",
          type: "writing_task_1",
          title: "Writing Task 1",
          instructions: "You should spend about 20 minutes on this task.",
          questions: [
            {
              questionNumber: 1,
              prompt: "The table illustrates the proportions of renewable energy generation in four European countries across three distinct decades.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.\n\nWrite at least 150 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 1. Compares mature hydro baseload in Norway with rapid wind/solar acceleration across Germany, Spain, and UK."
            }
          ]
        }
      ]
    },
    {
      sectionNumber: 2,
      title: "Writing Task 2",
      subtitle: "Sustainable international tourism vs local impacts essay",
      passageContent: `<div class="my-4 p-5 bg-[#f8f9fa] border-2 border-slate-300 rounded-xl font-sans shadow-2xs">
  <div class="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
    <span class="font-extrabold text-xs uppercase tracking-wider text-slate-600">Official Cambridge CD-IELTS • Writing Task 2</span>
    <span class="text-xs font-semibold text-slate-500">Suggested Time: 40 Minutes</span>
  </div>
  <p class="text-xs font-bold text-slate-700 uppercase tracking-wide mb-2">Write about the following topic:</p>
  <div class="p-4 bg-white border border-slate-300 rounded-lg text-sm sm:text-base font-semibold text-slate-900 leading-relaxed shadow-inner">
    "Global travel has become more accessible than ever before, but it also carries environmental and cultural costs.<br/><br/>
    How can international tourism be balanced with environmental and cultural sustainability?"
  </div>
  <div class="mt-4 space-y-1 text-xs text-slate-700">
    <p class="italic">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
    <p class="font-extrabold text-slate-900">Write at least 250 words.</p>
  </div>
</div>`,
      questionGroups: [
        {
          id: "c21-w4-qg2",
          type: "writing_task_2",
          title: "Writing Task 2",
          instructions: "You should spend about 40 minutes on this task.",
          questions: [
            {
              questionNumber: 2,
              prompt: "Global travel has become more accessible than ever before, but it also carries environmental and cultural costs.\n\nHow can international tourism be balanced with environmental and cultural sustainability?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.\n\nWrite at least 250 words.",
              correctAnswer: "",
              explanation: "Official IELTS Academic Writing Task 2. Evaluates eco-tourism quotas, carbon offsetting, cultural preservation, and overtourism regulations."
            }
          ]
        }
      ]
    }
  ]
};
