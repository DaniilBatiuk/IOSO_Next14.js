import { PassQuiz } from "../@types";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function shufflePassQuiz(passQuiz: PassQuiz): PassQuiz {
  const shuffledQuestions = shuffleArray(passQuiz.questions);
  const updatedQuestions = shuffledQuestions.map(question => ({
    ...question,
    answers: shuffleArray(question.answers),
  }));
  return {
    ...passQuiz,
    questions: updatedQuestions,
  };
}
