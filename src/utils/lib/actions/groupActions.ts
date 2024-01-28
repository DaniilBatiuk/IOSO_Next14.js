"use server";

import { Group } from "@prisma/client";
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

  await prisma.group.create({
    data: {
      ...group,
    },
  });
}
