import { AccessTypeForQuiz, QuizStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET() {
  try {
    const allQuizzes = await prisma.quiz.findMany({
      where: {
        status: QuizStatus.Active,
        OR: [
          { accessType: AccessTypeForQuiz.Public },
          { accessType: AccessTypeForQuiz.Public_access_code },
        ],
      },
      select: {
        id: true,
        name: true,
        attempts: true,
        deadline: true,
        duration: true,
        accessType: true,
        accessCode: true,
        status: true,
        createdAt: true,
        creator: {
          select: {
            id: true,
            fullName: true,
          },
        },
        questions: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(allQuizzes));
  } catch (error) {
    console.log("Error finding quizzes: ", error);
    return NextResponse.json({ error: `Error finding quizzes: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
