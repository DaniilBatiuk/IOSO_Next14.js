"use server";

import { Answer } from "@prisma/client";

import prisma from "../prisma";

export async function createAnswer(answer: Omit<Answer, "id" | "createdAt" | "updatedAt">) {
  const newAnswer = await prisma.answer.create({
    data: {
      ...answer,
    },
  });

  return { answerId: newAnswer.id };
}

export async function deleteAnswers(id: string) {
  await prisma.answer.deleteMany({
    where: {
      questionId: id,
    },
  });
}
