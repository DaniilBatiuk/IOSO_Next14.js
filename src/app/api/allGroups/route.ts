import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const allGroups = await prisma.group.findMany({
      select: {
        id: true,
        name: true,
        accessType: true,
        accessCode: true,
        createdAt: true,
        creator: {
          select: {
            id: true,
            fullName: true,
          },
        },
        members: {
          select: {
            userId: true,
          },
        },
      },
    });
    return NextResponse.json(wrapSuccess(allGroups));
  } catch (error) {
    console.log("Error finding groups: ", error);
    return NextResponse.json({ error: `Error finding groups: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
