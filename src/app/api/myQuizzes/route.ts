import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const myQuizzes = await prisma.quiz.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        creatorId: id,
      },
      select: {
        id: true,
        name: true,
        attempts: true,
        deadline: true,
        duration: true,
        accessType: true,
        status: true,
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

    return NextResponse.json(wrapSuccess(myQuizzes));
  } catch (error) {
    console.log("Error finding my quizzes: ", error);
    return NextResponse.json({ error: `Error finding my quizzes: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
