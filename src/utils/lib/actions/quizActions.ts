"use server";

import { Quiz, QuizStatus } from "@prisma/client";
import prisma from "../prisma";

export async function createQuiz(quiz: Omit<Quiz, "id" | "createdAt" | "updatedAt" | "status">) {
  const quizExist = await prisma.quiz.findFirst({
    where: {
      name: quiz.name,
    },
  });

  if (quizExist) {
    return { error: "Quiz with this name has been already exist." };
  }

  const newQuiz = await prisma.quiz.create({
    data: {
      ...quiz,
    },
  });

  return { newQuizId: newQuiz.id };
}

export async function updateQuiz(quizId: string, status: QuizStatus) {
  const quizExist = await prisma.quiz.findFirst({
    where: {
      id: quizId,
    },
  });

  if (!quizExist) {
    return "Quiz with this name does not exist.";
  }

  await prisma.quiz.update({
    where: {
      id: quizId,
    },
    data: {
      status: status,
    },
  });
}
