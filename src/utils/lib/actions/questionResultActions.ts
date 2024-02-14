"use server";

import { QuestionResult } from "@prisma/client";

import prisma from "../prisma";

export async function createQuestionResult(questionResult: Omit<QuestionResult, "id">) {
  const newQuestionResult = await prisma.questionResult.create({
    data: {
      ...questionResult,
    },
  });

  return { newQuestionResultId: newQuestionResult.id };
}
