"use server";

import { Group, MemberStatus } from "@prisma/client";
import prisma from "../prisma";

export async function createNewGroup(
  group: Omit<Group, "id" | "createdAt" | "updatedAt" | "accessCode">,
) {
  const groupExist = await prisma.group.findUnique({
    where: {
      name: group.name,
    },
  });

  if (groupExist) {
    return "Group with this name has been already exist.";
  }

  const newGroup = await prisma.group.create({
    data: {
      ...group,
    },
  });

  await prisma.membership.create({
    data: {
      groupId: newGroup.id,
      userId: newGroup.creatorId,
      status: MemberStatus.Manager,
    },
  });
}

export async function removeGroup(groupId: string, userId: string | undefined) {
  try {
    await prisma.membership.deleteMany({
      where: {
        groupId: groupId,
      },
    });

    const groupDelete = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });
    if (!groupDelete) {
      return "Something went wrong.";
    }
  } catch {
    return "Something went wrong.";
  }
}
