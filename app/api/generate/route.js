import { checkSubscription } from "@/app/libs/subscription";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req) {
  try {
    const { prompt, tone, category } = await req.json();

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return NextResponse.json("Free trial has expired!", { status: 403 });
    }

    const result = await model.generateContent([
      `You are a helpful excuse assistant. Generate an excuse in ${tone} way in ${category} category. 
       The excuse should be short and to the point. 
       The user will provide the reason why he want to make excuse.
       Reason: ${prompt}`,
    ]);

    const text = result.response.text();

    if (!isPro) {
      await incrementApiLimit();
    }

    return Response.json({ text });
  } catch (error) {
    console.error("Error generating excuse:", error);
    return Response.json(
      { error: "Failed to generate excuse" },
      { status: 500 }
    );
  }
}
