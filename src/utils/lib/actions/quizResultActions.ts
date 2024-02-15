"use server";

import { QuizResult } from "@prisma/client";

import { QuizPassType } from "../@types";
import { calculateScoreForOneQuestion } from "../helpers/calculateScoreForOneQuestion";
import prisma from "../prisma";

import { createAnswerSelected } from "./answerSelectedActions";
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

export async function createAllQuestionsAnswersAndAnswerSelected(
  newQuizResultId: string,
  quizResult: QuizPassType,
) {
  try {
    for (const question of quizResult) {
      const { newQuestionResultId } = await createQuestionResult({
        quizResultId: newQuizResultId,
        questionId: question.id,
        score: calculateScoreForOneQuestion(question),
      });

      if (newQuestionResultId) {
        if (Array.isArray(question.selected)) {
          for (const selectedAnswer of question.selected) {
            createAnswerSelected({
              questionResultId: newQuestionResultId,
              answerId: selectedAnswer,
            });
          }
        } else {
          createAnswerSelected({
            questionResultId: newQuestionResultId,
            answerId: question.selected,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    return "Something went wrong!";
  }
}
