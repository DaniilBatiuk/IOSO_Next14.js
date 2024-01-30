import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const group = await prisma.group.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        sections: {
          select: {
            id: true,
            name: true,
            quizzes: {
              select: {
                id: true,
                name: true,
                attempts: true,
              },
            },
          },
        },
        members: {
          select: {
            id: true,
            status: true,
            user: {
              select: {
                id: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(group));
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}