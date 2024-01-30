import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";
import prisma from "@/utils/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const myGroups = await prisma.group.findMany({
      where: {
        OR: [
          {
            creatorId: id,
          },
          {
            members: {
              some: {
                userId: id,
              },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        accessType: true,
        creator: {
          select: {
            id: true,
            fullName: true,
          },
        },
        members: {
          select: {
            id: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(myGroups));
  } catch (error) {
    console.log("Error finding groups: ", error);
    return NextResponse.json({ error: "Error finding groups", status: 500 });
  }
}