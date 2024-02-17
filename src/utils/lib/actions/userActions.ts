"use server";

import prisma from "../prisma";

export async function FindUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      groups: {
        select: {
          id: true,
        },
      },
      quiz: {
        select: {
          id: true,
        },
      },
      QuizResult: {
        select: {
          id: true,
        },
      },
    },
  });
}
