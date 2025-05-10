import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req) {
  const { title, category, tone } = await req.json();
  const { id } = await currentUser();

  try {
    const conversation = await prisma.conversation.create({
      data: {
        title,
        userId: id,
        tone,
        category,
      },
    });

    return NextResponse.json(conversation, { status: 200 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation");
  }
}

export async function GET() {
  const { id } = await currentUser();

  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        userId: id,
      },
    });

    return NextResponse.json(conversations, { status: 200 });
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Failed to create conversation");
  }
}
