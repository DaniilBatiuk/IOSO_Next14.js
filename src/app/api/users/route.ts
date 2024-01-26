import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { fullName, email } = await req.json();
    console.log(fullName, email);
  } catch (error) {
    console.log("ERROR CREATING TASK: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}
