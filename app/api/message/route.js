import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { conversationId, userMessage, aiMessage } = body;

  if (!conversationId)
    return NextResponse.json("No conversationId provided", { status: 500 });

  const message = await prisma.message.create({
    data: {
      conversationId,
      messages: [
        { role: "user", text: userMessage },
        { role: "ai", text: aiMessage },
      ],
    },
  });

  return NextResponse.json(message, { status: 201 });
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const conversationId = searchParams.get("conversationId");

  if (!conversationId) {
    return new Response(JSON.stringify({ error: "Missing conversationId" }), {
      status: 400,
    });
  }

  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch messages", error);
    return new Response(JSON.stringify({ error: "Failed to fetch messages" }), {
      status: 500,
    });
  }
}
