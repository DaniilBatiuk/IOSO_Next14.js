import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const user = await prisma.user.findUnique({
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
            name: true,
          },
        },
        quiz: {
          select: {
            id: true,
            name: true,
            groupId: true,
            QuizResult: {
              select: {
                id: true,
                user: {
                  select: {
                    id: true,
                    fullName: true,
                  },
                },
                questionResult: {
                  select: {
                    id: true,
                    score: true,
                  },
                },
              },
            },
          },
        },
        QuizResult: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(user));
  } catch (error) {
    console.log("Error finding user: ", error);
    return NextResponse.json({ error: `Error finding user: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
