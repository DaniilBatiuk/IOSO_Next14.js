"use server";

import { AnswerSelected } from "@prisma/client";

import prisma from "../prisma";

export async function createAnswerSelected(answerSelected: Omit<AnswerSelected, "id">) {
  await prisma.answerSelected.create({
    data: {
      ...answerSelected,
    },
  });
}
