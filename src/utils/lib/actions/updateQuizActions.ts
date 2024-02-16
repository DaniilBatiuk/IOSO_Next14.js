"use server";

import { AccessTypeForQuiz } from "@prisma/client";

import { UpdateQuiz, WrapSuccessType } from "../@types";
import { CreateQuizType } from "../validators/create-quiz-validator";

import { createAnswer, deleteAnswers } from "./answerActions";
import { createQuestion, deleteQuestions } from "./questionActions";
import { updateQuiz } from "./quizActions";

export async function updateQuizSave(
  accessType: AccessTypeForQuiz,
  data: CreateQuizType,
  id: string,
  quiz: WrapSuccessType<UpdateQuiz>,
  deadline: Date | null,
) {
  try {
    const currentDateTime = new Date();

    let duration = null;
    if (data.duration?.hours !== 0 || data.duration?.minutes !== 0) {
      duration = new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate(),
        data.duration.hours,
        data.duration.minutes,
      );
    }

    if (!quiz?.result) return;
    const error = await updateQuiz({
      id: quiz?.result.id,
      name: data.name,
      attempts: data.attempts,
      accessCode: data.accessCode,
      percentagePass: data.percentagePass,
      groupId: data.groupId || null,
      sectionId: data.sectionId,
      duration: duration,
      deadline: deadline,
      accessType: accessType,
      creatorId: id,
    });

    if (error) {
      throw new Error(error);
    } else if (quiz.result.QuizResult.length === 0) {
      for (const question of quiz.result.questions) {
        await deleteAnswers(question.id);
      }
      await deleteQuestions(quiz.result.id);
      for (const question of data.questions) {
        const { questionId } = await createQuestion({
          quizId: quiz.result.id,
          text: question.text,
          type: question.type,
        });

        if (questionId) {
          for (const answer of question.answers) {
            await createAnswer({
              questionId: questionId,
              text: answer.text,
              isCorrect: answer.isCorrect,
            });
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    return "Something went wrong!";
  }
}
