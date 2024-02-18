"use server";

import { QuizResult } from "@prisma/client";

import { QuizPassType } from "../@types";
import { calculateScoreForOneQuestion } from "../helpers/calculateScoreForOneQuestion";
import prisma from "../prisma";

import { createAnswerResult } from "./answerSelectedActions";
import { createQuestionResult } from "./questionResultActions";

export async function createQuizResult(
  quizResult: Omit<QuizResult, "id" | "createdAt" | "updatedAt">,
) {
  const newQuizResult = await prisma.quizResult.create({
    data: {
      ...quizResult,
    },
  });

  return { newQuizResultId: newQuizResult.id };
}

export async function createAllQuestionsAnswersAndAnswerResult(
  newQuizResultId: string,
  quizResult: QuizPassType,
) {
  try {
    for (const question of quizResult) {
      const { newQuestionResultId } = await createQuestionResult({
        quizResultId: newQuizResultId,
        text: question.question,
        type: question.type,
        score: calculateScoreForOneQuestion(question),
      });

      if (newQuestionResultId) {
        for (const answer of question.answers) {
          await createAnswerResult({
            questionResultId: newQuestionResultId,
            text: answer.text,
            isCorrect: answer.isCorrect,
            isSelected: question.selected.includes(answer.id),
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    return "Something went wrong!";
  }
}
