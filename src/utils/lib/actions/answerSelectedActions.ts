"use server";

import { AnswerResult } from "@prisma/client";

import prisma from "../prisma";

export async function createAnswerResult(answerResult: Omit<AnswerResult, "id">) {
  await prisma.answerResult.create({
    data: {
      ...answerResult,
    },
  });
}
