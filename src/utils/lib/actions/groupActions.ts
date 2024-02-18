"use server";

import { Group, MemberStatus } from "@prisma/client";

import prisma from "../prisma";

export async function createNewGroup(group: Omit<Group, "id" | "createdAt" | "updatedAt">) {
  const groupExist = await prisma.group.findUnique({
    where: {
      name: group.name,
    },
  });

  if (groupExist) {
    return { error: "Group with this name has been already exist." };
  }

  const newGroup = await prisma.group.create({
    data: {
      name: group.name,
      accessType: group.accessType,
      creatorId: group.creatorId,
      accessCode: group.accessCode,
    },
  });

  await prisma.membership.create({
    data: {
      groupId: newGroup.id,
      userId: newGroup.creatorId,
      status: MemberStatus.Manager,
    },
  });

  return { groupId: newGroup.id };
}

export async function removeGroup(groupId: string) {
  try {
    await prisma.membership.deleteMany({
      where: {
        groupId: groupId,
      },
    });

    await prisma.section.deleteMany({
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
  } catch (error) {
    console.log(error);
    return "Something went wrong.";
  }
}
