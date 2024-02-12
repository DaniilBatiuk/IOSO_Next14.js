import { QuizPassQuestionType } from "../@types";

export const calculateScoreForOneQuestion = (question: QuizPassQuestionType) => {
  let score = 0;
  let wrongAnswerExist = false;

  question.answers.forEach(answer => {
    if (Array.isArray(question.selected)) {
      const countCorrectAnswers = question.answers.reduce((acc, currentValue) => {
        if (currentValue.isCorrect) {
          acc++;
        }
        return acc;
      }, 0);
      const ScoreForOneRightAnswer = parseFloat((1 / countCorrectAnswers).toFixed(2));
      if (question.selected.includes(answer.id) && answer.isCorrect) {
        score += ScoreForOneRightAnswer;
      } else if (question.selected.includes(answer.id)) {
        score -= ScoreForOneRightAnswer;
        wrongAnswerExist = true;
      } else if (!question.selected.includes(answer.id) && answer.isCorrect) {
        wrongAnswerExist = true;
      }
    } else {
      if (question.selected === answer.id && answer.isCorrect) {
        score = 1;
      }
    }
  });
  if (!wrongAnswerExist && Array.isArray(question.selected)) {
    score = 1;
  } else if (score < 0) {
    score = 0;
  }

  return parseFloat(score.toFixed(2));
};
