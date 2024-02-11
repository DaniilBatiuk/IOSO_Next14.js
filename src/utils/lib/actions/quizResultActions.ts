"use server";

import { QuizResult } from "@prisma/client";
import prisma from "../prisma";

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
