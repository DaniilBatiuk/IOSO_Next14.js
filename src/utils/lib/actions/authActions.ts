"use server";

import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import prisma from "../prisma";

export async function registerUser(user: Omit<User, "id" | "emailVerified" | "image">) {
  const userExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userExist) {
    return "User with this email has been already exist";
  }

  const result = await prisma.user.create({
    data: {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    },
  });
}
