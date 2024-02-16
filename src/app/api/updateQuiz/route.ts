import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const userId = req.nextUrl.searchParams.get("userId");

    if (!id) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    if (!userId) {
      return NextResponse.json({ error: "Error no userId exist", status: 404 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        attempts: true,
        percentagePass: true,
        duration: true,
        deadline: true,
        accessType: true,
        accessCode: true,
        groupId: true,
        sectionId: true,
        questions: {
          select: {
            id: true,
            text: true,
            type: true,
            answers: {
              select: {
                id: true,
                text: true,
                isCorrect: true,
              },
            },
          },
        },
        section: {
          select: {
            id: true,
            name: true,
          },
        },
        QuizResult: {
          where: {
            userId: userId,
          },
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(quiz));
  } catch (error) {
    console.log("Error finding quiz: ", error);
    return NextResponse.json({ error: `Error finding quiz: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
