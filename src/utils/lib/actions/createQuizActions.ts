"use server";

import { AccessTypeForQuiz } from "@prisma/client";

import { CreateQuizType } from "../validators/create-quiz-validator";

import { createAnswer } from "./answerActions";
import { createQuestion } from "./questionActions";
import { createQuiz } from "./quizActions";

export async function createQuizSave(
  accessType: AccessTypeForQuiz,
  data: CreateQuizType,
  id: string,
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

    const { error, newQuizId } = await createQuiz({
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
    } else if (newQuizId) {
      for (const questions of data.questions) {
        const { questionId } = await createQuestion({
          quizId: newQuizId,
          text: questions.text,
          type: questions.type,
        });

        if (questionId) {
          for (const answer of questions.answers) {
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
