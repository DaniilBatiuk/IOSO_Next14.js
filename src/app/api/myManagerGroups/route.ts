import { MemberStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { wrapSuccess } from "@/utils/lib/helpers/wrapSuccess";

import prisma from "@/utils/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (id === null) {
      return NextResponse.json({ error: "Error no id exist", status: 404 });
    }

    const myGroups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            userId: id,
            status: MemberStatus.Manager,
          },
        },
      },
      select: {
        id: true,
        name: true,
        sections: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json(wrapSuccess(myGroups));
  } catch (error) {
    console.log("Error finding my groups: ", error);
    return NextResponse.json({ error: `Error finding my groups: ${error}`, status: 500 });
  }
}

export async function POST(req: NextRequest) {}
