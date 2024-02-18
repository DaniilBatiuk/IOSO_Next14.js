import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    const quizName = req.nextUrl.searchParams.get("quizName");

    if (!id) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    if (!quizName) {
      return NextResponse.json({ error: "Error no quizName exist", status: 404 });
    }

    const quizResult = await prisma.quizResult.findMany({
      where: {
        userId: id,
        quiz: {
          name: quizName,
        },
      },
      select: {
        id: true,
        durationOfAttempt: true,
        status: true,
        score: true,
        questionCount: true,
        rightAnswerCount: true,
        percentagePass: true,
        createdAt: true,
        questionResult: {
          select: {
            id: true,
            score: true,
            text: true,
            type: true,
            answerResult: {
              select: {
                id: true,
                text: true,
                isCorrect: true,
                isSelected: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(quizResult));
  } catch (error) {
    console.log("Error finding quiz result: ", error);
    return NextResponse.json({ error: `Error finding quiz result: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
