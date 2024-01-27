"use server";

import prisma from "../prisma";

export async function FindUserById(id: string) {
  return await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
}
