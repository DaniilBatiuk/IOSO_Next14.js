"use server";

import { Section } from "@prisma/client";
import prisma from "../prisma";

export async function createSection(sections: Omit<Section, "id" | "createdAt" | "updatedAt">) {
  const sectionExist = await prisma.section.findFirst({
    where: {
      name: sections.name,
      groupId: sections.groupId,
    },
  });

  if (sectionExist) {
    return "Section with this name has been already exist in this group.";
  }

  await prisma.section.create({
    data: {
      name: sections.name,
      groupId: sections.groupId,
    },
  });
}
