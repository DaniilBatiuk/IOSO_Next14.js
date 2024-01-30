"use server";

import prisma from "../prisma";

export async function addNewMember(groupId: string, userId: string) {
  const memberExist = await prisma.membership.findFirst({
    where: {
      groupId: groupId,
      userId: userId,
    },
  });

  if (memberExist) return "You are already a member of this group.";

  await prisma.membership.create({
    data: {
      groupId: groupId,
      userId: userId,
    },
  });
}

export async function removeMember(groupId: string) {
  const memberDelete = await prisma.membership.deleteMany({
    where: {
      groupId: groupId,
    },
  });

  return !memberDelete && "Something went wrong.";
}
