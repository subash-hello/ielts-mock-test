export type IELTSModule = 'reading' | 'listening';

export type IELTSQuestionType =
  | 'true_false_not_given'
  | 'yes_no_not_given'
  | 'multiple_choice'
  | 'multiple_choice_multi'
  | 'sentence_completion'
  | 'summary_completion'
  | 'matching_headings'
  | 'matching_information'
  | 'matching_features'
  | 'matching_sentence_endings'
  | 'diagram_labelling'
  | 'short_answer'
  | 'table_completion'
  | 'form_completion'
  | 'note_completion'
  | 'flow_chart_completion'
  | 'map_labelling';

export interface IELTSQuestion {
  questionNumber: number; // 1 to 40
  prompt: string;
  options?: string[]; // E.g. ["A. Increasing costs", "B. Lack of land", "C. Water scarcity"]
  correctAnswer: string | string[]; // Canonical answer e.g. "TRUE" or "decommissioned warehouses" or ["A", "C"]
  acceptedVariants?: string[]; // Accepted synonyms or formatting e.g. ["warehouses", "abandoned warehouses"]
  explanation?: string;
  passageEvidence?: {
    paragraph: string; // "A", "B", etc.
    quote: string;
  };
  diagramCoordinates?: { x: number; y: number }; // For diagram labelling pins
}

export interface IELTSQuestionGroup {
  id: string;
  type: IELTSQuestionType;
  title: string; // e.g. "Questions 1 - 5"
  instructions: string; // e.g. "Do the following statements agree with the information given in Reading Passage 1?"
  wordLimitRule?: string; // e.g. "Choose NO MORE THAN TWO WORDS from the passage for each answer."
  summaryTitle?: string;
  headingList?: string[]; // For Matching Headings tasks
  paragraphOptions?: string[]; // E.g. ['A', 'B', 'C', 'D', 'E', 'F', 'G'] for Matching Information
  clozeTemplate?: string; // Narrative text with placeholders e.g. {{5}} for authentic inline summary completion
  diagramSvg?: string; // SVG diagram markup for Diagram Labelling questions
  diagramTitle?: string;
  imageUrl?: string; // Official diagram/map image URL
  options?: string[]; // For summary completion with word lists or general question group options
  questions: IELTSQuestion[];
}

export interface IELTSSection {
  sectionNumber: number; // 1 to 3 for Reading, 1 to 4 for Listening
  title: string;
  subtitle?: string;
  passageContent?: string; // HTML or Markdown formatted passage with paragraph labels
  audioUrl?: string; // For listening section
  transcript?: string;
  questionGroups: IELTSQuestionGroup[];
}

export interface IELTSMockTest {
  id: string; // e.g. "cambridge-18-test-1-reading"
  book: number; // 18, 19, 20, 21
  testNumber: number; // 1, 2, 3, 4
  module: IELTSModule;
  title: string;
  durationMinutes: number; // 60 for Reading, 35 for Listening
  audioUrl?: string;
  sections: IELTSSection[];
}

export type CandidateAnswers = Record<number, string | string[]>;

export type ReviewStatus = Record<number, boolean>;

export interface TestResult {
  testId: string;
  book: number;
  testNumber: number;
  module: IELTSModule;
  totalQuestions: number;
  correctCount: number;
  bandScore: number;
  timeTakenSeconds: number;
  completedAt: string;
  answers: CandidateAnswers;
  candidateName?: string;
  candidateId?: string;
  consultancyId?: string;
  consultancyName?: string;
  targetBand?: number;
  isPublished?: boolean; // When false, result is pending release by consultancy admin
  publishedAt?: string; // Timestamp when consultancy admin published the result
}

export interface ExamSettings {
  fontSize: 'normal' | 'large';
  contrast: 'standard' | 'inverted' | 'yellow-on-black';
  showTimer: boolean;
}

// A full mock test bundles a reading + listening test pair from the same Cambridge book & test number
export interface FullMockTest {
  id: string; // e.g. "cambridge-19-test-1-full"
  book: number;
  testNumber: number;
  title: string; // e.g. "Cambridge 19 Test 1 — Full Mock"
  readingTest: IELTSMockTest;
  listeningTest: IELTSMockTest;
  totalDurationMinutes: number; // 60 + 35 = 95
}
