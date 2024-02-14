import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const groupId = req.nextUrl.searchParams.get("groupId");
    if (!id) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    if (!groupId) {
      return NextResponse.json({ error: "Error no groupId exist", status: 404 });
    }

    const groupQuizResult = await prisma.quizResult.findMany({
      where: {
        userId: id,
        quiz: {
          groupId: groupId,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        status: true,
        score: true,
        createdAt: true,
        durationOfAttempt: true,
        questionCount: true,
        quiz: {
          select: {
            name: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(groupQuizResult));
  } catch (error) {
    console.log("Error finding group quiz result: ", error);
    return NextResponse.json({ error: `Error finding group quiz result: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
