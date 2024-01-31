"use server";

import prisma from "../prisma";

export async function addNewMember(groupId: string, userId: string) {
  try {
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
  } catch {
    return "Something went wrong.";
  }
}

export async function removeMember(groupId: string, userId: string | undefined) {
  try {
    const memberDelete = await prisma.membership.deleteMany({
      where: {
        groupId: groupId,
        userId: userId,
      },
    });

    return !memberDelete && "Something went wrong.";
  } catch {
    return "Something went wrong.";
  }
}
