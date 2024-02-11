import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const quizHistory = await prisma.quizResult.findMany({
      where: {
        userId: id,
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

    return NextResponse.json(wrapSuccess(quizHistory));
  } catch (error) {
    console.log("Error finding quiz history: ", error);
    return NextResponse.json({ error: `Error finding quiz history: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
