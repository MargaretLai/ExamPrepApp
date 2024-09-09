import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("query") || "Calculus"; // Default to "Calculus" if no query provided

    const systemRole = `
      You are a teacher that knows all subjects very well. 
      Your job is to generate 8 flashcards given a subject/topic.
      Return the flashcards in this format (array of objects), don't include any text that's not json, important! Don't include anything that's not json in your response: 
      [ 
      {
        "id": x,
        "flashcard_front": "front of flashcard",
        "flashcard_back": "back of flashcard"
      },
      ...
      ]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: systemRole,
        },
        {
          role: "user",
          content: query,
        },
      ],
    });

    return NextResponse.json(completion.choices[0].message, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve flashcards" },
      { status: 500 }
    );
  }
}
