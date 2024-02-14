"use server";

import { Question } from "@prisma/client";

import prisma from "../prisma";

export async function createQuestion(question: Omit<Question, "id" | "createdAt" | "updatedAt">) {
  const newQuestion = await prisma.question.create({
    data: {
      ...question,
    },
  });

  return { questionId: newQuestion.id };
}

export async function deleteQuestions(id: string) {
  await prisma.question.deleteMany({
    where: {
      quizId: id,
    },
  });
}
