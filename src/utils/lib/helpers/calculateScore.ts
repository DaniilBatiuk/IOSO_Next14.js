import { QuizPassType } from "../@types";

import { calculateScoreForOneQuestion } from "./calculateScoreForOneQuestion";

export const calculateScore = (quizResult: QuizPassType) => {
  let score = 0;

  quizResult.forEach(question => {
    let questionScore: number = 0;
    questionScore = calculateScoreForOneQuestion(question);

    if (questionScore > 0) {
      score += questionScore;
    }
  });

  const data = {
    score: parseFloat(((score / quizResult.length) * 100).toFixed(2)),
    rightAnswerCount: score,
  };

  return data;
};
