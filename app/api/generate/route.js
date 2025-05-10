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
      `You are a creative and witty excuse generator. Your task is to create an excuse based on the user's reason. 
   The excuse should be in the tone of "${tone}" and fall under the "${category}" category.
   The excuse must be:
   - Short, clear, and to the point.
   - Funny, absurd, or dramatic based on the selected tone.
   - Original, engaging, and creative.
   - Ensure it fits the category (e.g., for "Missed Event", it should explain why the event wasn't attended, and for "Work", why work wasn't completed or attended).
   
   The user will provide the reason for the excuse, and you should craft it accordingly.
   Reason: "${prompt}"`,
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
