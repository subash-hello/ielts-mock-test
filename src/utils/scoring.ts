import type { IELTSModule } from '../types/ielts';

/**
 * Official IELTS Academic Reading Raw Score to Band Score Converter
 */
export function calculateAcademicReadingBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 33) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 27) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 19) return 5.5;
  if (rawScore >= 15) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 8) return 3.5;
  if (rawScore >= 6) return 3.0;
  if (rawScore >= 4) return 2.5;
  if (rawScore >= 2) return 2.0;
  return 1.0;
}

/**
 * Official IELTS Listening Raw Score to Band Score Converter
 */
export function calculateListeningBand(rawScore: number): number {
  if (rawScore >= 39) return 9.0;
  if (rawScore >= 37) return 8.5;
  if (rawScore >= 35) return 8.0;
  if (rawScore >= 32) return 7.5;
  if (rawScore >= 30) return 7.0;
  if (rawScore >= 26) return 6.5;
  if (rawScore >= 23) return 6.0;
  if (rawScore >= 18) return 5.5;
  if (rawScore >= 16) return 5.0;
  if (rawScore >= 13) return 4.5;
  if (rawScore >= 10) return 4.0;
  if (rawScore >= 8) return 3.5;
  if (rawScore >= 6) return 3.0;
  if (rawScore >= 4) return 2.5;
  if (rawScore >= 2) return 2.0;
  return 1.0;
}

export function calculateBandScore(module: IELTSModule, rawScore: number): number {
  return module === 'reading'
    ? calculateAcademicReadingBand(rawScore)
    : calculateListeningBand(rawScore);
}

/**
 * Normalizes text for IELTS answer comparisons
 */
export function normalizeAnswer(ans: string | undefined | null): string {
  if (!ans) return '';
  return ans
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // remove punctuation
    .replace(/\s+/g, ' '); // collapse spaces
}

/**
 * Checks if a candidate's answer matches the correct answer or any accepted variants
 */
export function isAnswerCorrect(
  userAns: string | string[] | undefined,
  correctAns: string | string[],
  acceptedVariants?: string[]
): boolean {
  if (!userAns) return false;

  // Multi-choice array check
  if (Array.isArray(correctAns)) {
    if (!Array.isArray(userAns)) return false;
    if (userAns.length !== correctAns.length) return false;
    const normUser = userAns.map(normalizeAnswer).sort();
    const normCorrect = correctAns.map(normalizeAnswer).sort();
    return normUser.every((val, index) => val === normCorrect[index]);
  }

  // Single string answer
  const userStr = normalizeAnswer(Array.isArray(userAns) ? userAns.join(' ') : userAns);
  const correctStr = normalizeAnswer(correctAns);

  if (userStr === correctStr) return true;

  // Check variants if provided
  if (acceptedVariants && acceptedVariants.length > 0) {
    return acceptedVariants.some((variant) => normalizeAnswer(variant) === userStr);
  }

  return false;
}

/**
 * Holistically evaluates an entire mock test's answers, supporting multi_choice_multi pools
 * where questions in a group (e.g. Q20 & Q21) can match answers in any order without penalty.
 */
export function evaluateTestAnswers(
  test: { sections: Array<{ questionGroups: Array<{ type: string; questions: Array<{ questionNumber: number; correctAnswer: string | string[]; acceptedVariants?: string[] }> }> }> },
  answers: Record<number, string | string[]>
): {
  correctCount: number;
  questionResults: Record<number, boolean>;
} {
  let correctCount = 0;
  const questionResults: Record<number, boolean> = {};

  test.sections.forEach((section) => {
    section.questionGroups.forEach((group) => {
      if (group.type === 'multiple_choice_multi') {
        // Collect all acceptable answers across the multi-choice group
        const correctPool: string[] = [];
        group.questions.forEach((q) => {
          if (Array.isArray(q.correctAnswer)) {
            q.correctAnswer.forEach((c) => correctPool.push(normalizeAnswer(c)));
          } else if (q.correctAnswer) {
            correctPool.push(normalizeAnswer(q.correctAnswer));
          }
        });

        const usedAnswers = new Set<string>();

        group.questions.forEach((q) => {
          const userVal = answers[q.questionNumber];
          const normUser = normalizeAnswer(Array.isArray(userVal) ? userVal.join(' ') : userVal);

          if (normUser && correctPool.includes(normUser) && !usedAnswers.has(normUser)) {
            usedAnswers.add(normUser);
            questionResults[q.questionNumber] = true;
            correctCount += 1;
          } else {
            questionResults[q.questionNumber] = false;
          }
        });
      } else {
        group.questions.forEach((q) => {
          const userVal = answers[q.questionNumber];
          const isCorrect = isAnswerCorrect(userVal, q.correctAnswer, q.acceptedVariants);
          questionResults[q.questionNumber] = isCorrect;
          if (isCorrect) {
            correctCount += 1;
          }
        });
      }
    });
  });

  return { correctCount, questionResults };
}
