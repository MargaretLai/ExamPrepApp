import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { userInput } = body;

    if (!userInput) {
      return NextResponse.json(
        { error: "Please provide input." },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Generate quiz questions based on the following topic or text: ${userInput}. Reply with questions and answers only, no other text included`,
        },
      ],
    });

    const questions = completion.choices[0].message.content
      .trim()
      .split("\n")
      .filter(Boolean);

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error generating questions" },
      { status: 500 }
    );
  }
}
